import type {
  ResearchMetadata,
  SourceQualityTier,
  SourceType,
  VerificationStatus
} from "./types";

export type ResearchRecord = ResearchMetadata & {
  id: string;
};

export type ResearchDataset = {
  label: string;
  records: ResearchRecord[];
};

export type DatasetQualityRow = {
  dataset: string;
  total_records: number;
  weak_records: number;
  mock_records: number;
  estimated_records: number;
  verified_records: number;
  needs_verification_records: number;
};

export type SourceRegistryRow = {
  source_label: string;
  source_type: SourceType;
  source_quality_tier: SourceQualityTier;
  verification_statuses: VerificationStatus[];
  record_count: number;
  mock_count: number;
  estimated_count: number;
  user_provided_count: number;
};

export type ResearchQualityReport = {
  totalRecords: number;
  mockRecords: number;
  estimatedRecords: number;
  userProvidedRecords: number;
  verifiedRecords: number;
  needsVerificationRecords: number;
  needsUpdateRecords: number;
  sourceTierCounts: Record<SourceQualityTier, number>;
  verificationStatusCounts: Record<VerificationStatus, number>;
  datasetRows: DatasetQualityRow[];
  sourceRows: SourceRegistryRow[];
  warnings: string[];
};

const sourceTiers: SourceQualityTier[] = ["S", "A", "B", "C", "D"];
const verificationStatuses: VerificationStatus[] = [
  "unverified",
  "verified",
  "needs_update",
  "needs_verification"
];

function isWeakEvidence(record: ResearchRecord): boolean {
  return (
    record.is_mock_data ||
    record.is_estimated ||
    record.source_quality_tier === "D" ||
    record.verification_status === "unverified" ||
    record.verification_status === "needs_update" ||
    record.verification_status === "needs_verification"
  );
}

export function buildResearchQualityReport(datasets: ResearchDataset[]): ResearchQualityReport {
  const records = datasets.flatMap((dataset) => dataset.records);
  const sourceTierCounts = Object.fromEntries(sourceTiers.map((tier) => [tier, 0])) as Record<
    SourceQualityTier,
    number
  >;
  const verificationStatusCounts = Object.fromEntries(
    verificationStatuses.map((status) => [status, 0])
  ) as Record<VerificationStatus, number>;
  const warnings: string[] = [];

  records.forEach((record) => {
    sourceTierCounts[record.source_quality_tier] += 1;
    verificationStatusCounts[record.verification_status] += 1;
  });

  const datasetRows = datasets.map((dataset) => {
    const weakRecords = dataset.records.filter(isWeakEvidence).length;
    if (weakRecords > 0) {
      warnings.push(`${dataset.label} มีข้อมูลอ่อน ${weakRecords} รายการ ต้องตรวจสอบก่อนใช้ตัดสินใจจริง`);
    }

    return {
      dataset: dataset.label,
      total_records: dataset.records.length,
      weak_records: weakRecords,
      mock_records: dataset.records.filter((record) => record.is_mock_data).length,
      estimated_records: dataset.records.filter((record) => record.is_estimated).length,
      verified_records: dataset.records.filter((record) => record.verification_status === "verified").length,
      needs_verification_records: dataset.records.filter(
        (record) => record.verification_status === "needs_verification"
      ).length
    };
  });

  const sourceRows = Array.from(
    records
      .reduce<Map<string, SourceRegistryRow>>((map, record) => {
        const existing = map.get(record.source_label);
        if (!existing) {
          map.set(record.source_label, {
            source_label: record.source_label,
            source_type: record.source_type,
            source_quality_tier: record.source_quality_tier,
            verification_statuses: [record.verification_status],
            record_count: 1,
            mock_count: record.is_mock_data ? 1 : 0,
            estimated_count: record.is_estimated ? 1 : 0,
            user_provided_count: record.is_user_provided ? 1 : 0
          });
          return map;
        }

        existing.record_count += 1;
        existing.mock_count += record.is_mock_data ? 1 : 0;
        existing.estimated_count += record.is_estimated ? 1 : 0;
        existing.user_provided_count += record.is_user_provided ? 1 : 0;
        if (!existing.verification_statuses.includes(record.verification_status)) {
          existing.verification_statuses.push(record.verification_status);
        }
        return map;
      }, new Map())
      .values()
  ).sort((a, b) => b.record_count - a.record_count || a.source_label.localeCompare(b.source_label));

  sourceRows.forEach((source) => {
    if (source.mock_count > 0 && source.user_provided_count > 0) {
      warnings.push(`${source.source_label} มีทั้งหลักฐาน mock และ user-provided ต้องแสดงป้ายกำกับในคำแนะนำให้ชัด`);
    }
  });

  return {
    totalRecords: records.length,
    mockRecords: records.filter((record) => record.is_mock_data).length,
    estimatedRecords: records.filter((record) => record.is_estimated).length,
    userProvidedRecords: records.filter((record) => record.is_user_provided).length,
    verifiedRecords: records.filter((record) => record.verification_status === "verified").length,
    needsVerificationRecords: records.filter((record) => record.verification_status === "needs_verification").length,
    needsUpdateRecords: records.filter((record) => record.verification_status === "needs_update").length,
    sourceTierCounts,
    verificationStatusCounts,
    datasetRows,
    sourceRows,
    warnings
  };
}
