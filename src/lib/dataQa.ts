import { type ImportType, validateCsvRows } from "./csv";
import { calculateTrendScore, type TrendScoreInput } from "./scoring";
import type { BenchmarkCreator, ResearchMetadata, TrendItem } from "./types";

type CsvSamples = Partial<Record<ImportType, Record<string, string>[]>>;

export type DataQaReport = {
  csv_validation: {
    total_import_types_checked: number;
    invalid_import_types: number;
    rows_checked: number;
    errors: string[];
  };
  scoring: {
    total_trends_checked: number;
    score_mismatch_count: number;
    confidence_mismatch_count: number;
    input_range_issues: string[];
    rows: Array<{
      trend_id: string;
      stored_score: number;
      recalculated_score: number;
      stored_confidence: TrendItem["confidence_level"];
      recalculated_confidence: TrendItem["confidence_level"];
    }>;
  };
  confidence_downgrades: string[];
  data_labels: Record<"mock" | "imported" | "manual" | "estimated" | "verified" | "needs_update" | "needs verification", number>;
  china_platform_group_errors: string[];
  warnings: string[];
};

const chinaPlatforms = new Set(["douyin", "xiaohongshu", "bilibili", "weibo"]);
const scoreFields: Array<{
  key: keyof TrendScoreInput;
  label: keyof TrendItem;
}> = [
  { key: "hashtagKeywordVelocity", label: "velocity" },
  { key: "audioFormatVelocity", label: "audio_format_velocity" },
  { key: "crossPlatformSignal", label: "cross_platform_signal" },
  { key: "eventRelevanceThailand", label: "event_relevance_thailand" },
  { key: "visualFitBrightCgCosplay", label: "visual_fit_bright_cg_cosplay" },
  { key: "competitionGap", label: "competition_gap" }
];

function scoreInputForTrend(trend: TrendItem): TrendScoreInput {
  return {
    hashtagKeywordVelocity: trend.velocity,
    audioFormatVelocity: trend.audio_format_velocity,
    crossPlatformSignal: trend.cross_platform_signal,
    eventRelevanceThailand: trend.event_relevance_thailand,
    visualFitBrightCgCosplay: trend.visual_fit_bright_cg_cosplay,
    competitionGap: trend.competition_gap
  };
}

function dataLabels(record: ResearchMetadata): Array<keyof DataQaReport["data_labels"]> {
  const labels: Array<keyof DataQaReport["data_labels"]> = [];
  if (record.is_mock_data) labels.push("mock");
  if (record.is_user_provided) labels.push("imported", "manual");
  if (record.is_estimated) labels.push("estimated");
  if (record.verification_status === "verified") labels.push("verified");
  if (record.verification_status === "needs_update") labels.push("needs_update");
  if (record.verification_status === "needs_verification" || record.verification_status === "unverified") {
    labels.push("needs verification");
  }
  return labels;
}

function confidenceDowngradeReason(record: ResearchMetadata & { id: string }): string | null {
  const reasons = [];
  if (record.is_mock_data) reasons.push("mock");
  if (record.is_estimated) reasons.push("estimated");
  if (record.source_quality_tier === "D") reasons.push("tier D");
  if (record.verification_status !== "verified") reasons.push(record.verification_status);
  if (reasons.length === 0) return null;
  return `${record.id}: ${reasons.join(", ")} ทำให้ความมั่นใจลดลง`;
}

export function buildDataQaReport({
  trends,
  benchmarks,
  csvSamples = {}
}: {
  trends: TrendItem[];
  benchmarks: BenchmarkCreator[];
  csvSamples?: CsvSamples;
}): DataQaReport {
  const csvEntries = Object.entries(csvSamples) as Array<[ImportType, Record<string, string>[]]>;
  const csvResults = csvEntries.map(([type, rows]) => ({ type, result: validateCsvRows(type, rows) }));
  const csvErrors = csvResults.flatMap(({ type, result }) =>
    result.errors.map((error) => `${type}: ${error}`)
  );

  const inputRangeIssues = trends.flatMap((trend) =>
    scoreFields.flatMap(({ label }) => {
      const value = trend[label];
      return typeof value === "number" && (value < 0 || value > 100)
        ? [`${trend.id} ${String(label).replaceAll("_", " ")} อยู่นอกช่วง 0-100`]
        : [];
    })
  );

  const scoringRows = trends.map((trend) => {
    const recalculated = calculateTrendScore(scoreInputForTrend(trend));
    return {
      trend_id: trend.id,
      stored_score: trend.trend_score,
      recalculated_score: recalculated.score,
      stored_confidence: trend.confidence_level,
      recalculated_confidence: recalculated.confidence
    };
  });

  const records = [...trends, ...benchmarks];
  const dataLabelCounts: DataQaReport["data_labels"] = {
    mock: 0,
    imported: 0,
    manual: 0,
    estimated: 0,
    verified: 0,
    needs_update: 0,
    "needs verification": 0
  };

  records.forEach((record) => {
    dataLabels(record).forEach((label) => {
      dataLabelCounts[label] += 1;
    });
  });

  const chinaPlatformGroupErrors = benchmarks.flatMap((benchmark) =>
    chinaPlatforms.has(benchmark.platform) && benchmark.platform_group !== "china_mainland_platform"
      ? [`${benchmark.id} ต้องใช้ platform_group = china_mainland_platform`]
      : []
  );

  const confidenceDowngrades = records
    .map((record) => confidenceDowngradeReason(record))
    .filter((reason): reason is string => Boolean(reason));

  const warnings = [
    dataLabelCounts.mock > 0 || dataLabelCounts.estimated > 0
      ? "ข้อมูล mock หรือ estimated ต้องมีป้ายกำกับชัดเจนก่อนใช้ทำคำแนะนำ"
      : "",
    inputRangeIssues.length > 0 ? "บางค่าคะแนนอยู่นอกช่วง normalized 0-100" : "",
    csvErrors.length > 0 ? "CSV validation มี error ที่ต้องแก้ก่อน" : "",
    chinaPlatformGroupErrors.length > 0
      ? "ข้อมูลแพลตฟอร์มจีนต้องแยกด้วย platform_group = china_mainland_platform"
      : ""
  ].filter(Boolean);

  return {
    csv_validation: {
      total_import_types_checked: csvResults.length,
      invalid_import_types: csvResults.filter(({ result }) => !result.valid).length,
      rows_checked: csvResults.reduce((sum, { result }) => sum + result.rows.length, 0),
      errors: csvErrors
    },
    scoring: {
      total_trends_checked: trends.length,
      score_mismatch_count: scoringRows.filter((row) => row.stored_score !== row.recalculated_score).length,
      confidence_mismatch_count: scoringRows.filter((row) => row.stored_confidence !== row.recalculated_confidence).length,
      input_range_issues: inputRangeIssues,
      rows: scoringRows
    },
    confidence_downgrades: confidenceDowngrades,
    data_labels: dataLabelCounts,
    china_platform_group_errors: chinaPlatformGroupErrors,
    warnings
  };
}
