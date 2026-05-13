import { describe, expect, it } from "vitest";
import { buildResearchQualityReport } from "./researchQuality";
import type { ResearchMetadata } from "./types";

function record(overrides: Partial<ResearchMetadata> = {}): ResearchMetadata & { id: string } {
  return {
    id: overrides.source_label?.toLowerCase().replaceAll(" ", "-") ?? "record",
    source_label: "Mock seed data",
    source_url: "https://example.com/source",
    source_type: "mock_seed",
    verification_status: "needs_verification",
    is_mock_data: true,
    is_estimated: true,
    is_user_provided: false,
    source_quality_tier: "D",
    confidence_reason: "Mock seed record.",
    ...overrides
  };
}

describe("research quality report", () => {
  it("summarizes evidence quality across datasets", () => {
    const report = buildResearchQualityReport([
      {
        label: "Trends",
        records: [
          record(),
          record({
            source_label: "User analytics CSV",
            source_type: "user_analytics_export",
            verification_status: "verified",
            is_mock_data: false,
            is_estimated: false,
            is_user_provided: true,
            source_quality_tier: "A",
            confidence_reason: "User-owned export."
          })
        ]
      },
      {
        label: "Tools",
        records: [
          record({
            source_label: "Official tool page",
            source_type: "official_source",
            verification_status: "verified",
            is_mock_data: false,
            is_estimated: false,
            source_quality_tier: "S",
            confidence_reason: "Official source."
          })
        ]
      }
    ]);

    expect(report.totalRecords).toBe(3);
    expect(report.mockRecords).toBe(1);
    expect(report.estimatedRecords).toBe(1);
    expect(report.userProvidedRecords).toBe(1);
    expect(report.verifiedRecords).toBe(2);
    expect(report.needsVerificationRecords).toBe(1);
    expect(report.sourceTierCounts).toEqual({ S: 1, A: 1, B: 0, C: 0, D: 1 });
    expect(report.datasetRows[0]).toMatchObject({
      dataset: "Trends",
      total_records: 2,
      weak_records: 1
    });
  });

  it("aggregates source registry rows and warning messages", () => {
    const report = buildResearchQualityReport([
      {
        label: "Competitors",
        records: [
          record({ source_label: "Manual notes", source_type: "user_provided", source_quality_tier: "B" }),
          record({
            source_label: "Manual notes",
            source_type: "user_provided",
            source_quality_tier: "B",
            is_mock_data: false,
            is_estimated: false,
            is_user_provided: true,
            verification_status: "needs_update"
          })
        ]
      }
    ]);

    expect(report.sourceRows).toHaveLength(1);
    expect(report.sourceRows[0]).toMatchObject({
      source_label: "Manual notes",
      record_count: 2,
      mock_count: 1,
      estimated_count: 1
    });
    expect(report.warnings).toContain("Competitors มีข้อมูลอ่อน 2 รายการ ต้องตรวจสอบก่อนใช้ตัดสินใจจริง");
    expect(report.warnings).toContain("Manual notes มีทั้งหลักฐาน mock และ user-provided ต้องแสดงป้ายกำกับในคำแนะนำให้ชัด");
  });
});
