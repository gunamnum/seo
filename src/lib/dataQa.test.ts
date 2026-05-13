import { describe, expect, it } from "vitest";
import { benchmarkCreators, trendItems } from "./seed";
import { buildDataQaReport } from "./dataQa";
import type { BenchmarkCreator, TrendItem } from "./types";

describe("Data QA report", () => {
  it("checks scoring, confidence downgrades, and visible data labels", () => {
    const report = buildDataQaReport({
      trends: trendItems,
      benchmarks: benchmarkCreators,
      csvSamples: {
        trend_items: [
          {
            id: "trend-import-1",
            platform: "tiktok",
            region: "thailand",
            trend_name: "Imported trend",
            trend_type: "keyword",
            collected_at: "2026-05-13",
            source_label: "User CSV",
            source_url: "https://example.com/source",
            source_type: "manual_csv",
            verification_status: "needs_verification",
            is_estimated: "false",
            is_user_provided: "true",
            source_quality_tier: "A",
            confidence_reason: "Manual CSV import."
          }
        ]
      }
    });

    expect(report.scoring.total_trends_checked).toBe(trendItems.length);
    expect(report.scoring.score_mismatch_count).toBe(0);
    expect(report.csv_validation.total_import_types_checked).toBe(1);
    expect(report.csv_validation.invalid_import_types).toBe(0);
    expect(report.data_labels.mock).toBeGreaterThan(0);
    expect(report.confidence_downgrades.length).toBeGreaterThan(0);
    expect(report.warnings).toContain("ข้อมูล mock หรือ estimated ต้องมีป้ายกำกับชัดเจนก่อนใช้ทำคำแนะนำ");
  });

  it("flags score mismatches, out-of-range score inputs, and China platform group errors", () => {
    const badTrend: TrendItem = {
      ...trendItems[0],
      id: "trend-bad",
      trend_score: 99,
      velocity: 140
    };
    const badBenchmark: BenchmarkCreator = {
      ...benchmarkCreators.find((item) => item.platform === "douyin")!,
      id: "benchmark-bad",
      platform_group: "global_platform"
    };

    const report = buildDataQaReport({
      trends: [badTrend],
      benchmarks: [badBenchmark],
      csvSamples: {
        benchmark_creators: [
          {
            id: "benchmark-import-1",
            creator_display_name: "Imported China Creator",
            platform: "douyin",
            platform_group: "global_platform",
            source_label: "User CSV",
            source_url: "https://example.com/source",
            source_type: "manual_csv",
            verification_status: "needs_verification",
            is_estimated: "false",
            is_user_provided: "true",
            source_quality_tier: "A",
            confidence_reason: "Manual CSV import."
          }
        ]
      }
    });

    expect(report.scoring.score_mismatch_count).toBe(1);
    expect(report.scoring.input_range_issues).toContain("trend-bad velocity อยู่นอกช่วง 0-100");
    expect(report.china_platform_group_errors).toContain(
      "benchmark-bad ต้องใช้ platform_group = china_mainland_platform"
    );
    expect(report.csv_validation.invalid_import_types).toBe(1);
  });
});
