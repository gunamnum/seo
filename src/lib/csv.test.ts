import { describe, expect, it } from "vitest";
import {
  researchMetadataColumns,
  validateCsvRows,
  validatePlatform,
  validateSafetyChecklist
} from "./csv";
import { safetyChecklist } from "./seed";

describe("CSV validation", () => {
  it("adds research metadata columns to every import type", () => {
    const rows = Object.values(researchMetadataColumns);
    expect(rows).toContain("source_url");
    expect(rows).toContain("source_type");
    expect(rows).toContain("verification_status");
    expect(rows).toContain("is_estimated");
    expect(rows).toContain("is_user_provided");
    expect(rows).toContain("source_quality_tier");
    expect(rows).toContain("confidence_reason");
  });

  it("validates required columns", () => {
    const result = validateCsvRows("trend_items", [
      { id: "1", platform: "tiktok", region: "thailand", trend_name: "x" }
    ]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes("trend_type"))).toBe(true);
  });

  it("validates platform enum", () => {
    expect(validatePlatform("tiktok")).toBe(true);
    expect(validatePlatform("myspace")).toBe(false);
  });

  it("validates research metadata enum and boolean fields", () => {
    const result = validateCsvRows("trend_items", [
      {
        id: "1",
        platform: "tiktok",
        region: "thailand",
        trend_name: "x",
        trend_type: "keyword",
        collected_at: "2026-05-13",
        source_label: "manual",
        source_url: "https://example.com/source",
        source_type: "bad_source",
        verification_status: "done",
        is_estimated: "sometimes",
        is_user_provided: "maybe",
        source_quality_tier: "Z",
        confidence_reason: ""
      }
    ]);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('บรรทัด 2: source_type ไม่ถูกต้อง "bad_source"');
    expect(result.errors).toContain('บรรทัด 2: verification_status ไม่ถูกต้อง "done"');
    expect(result.errors).toContain("บรรทัด 2: ค่า boolean ใน is_estimated ไม่ถูกต้อง");
    expect(result.errors).toContain("บรรทัด 2: ค่า boolean ใน is_user_provided ไม่ถูกต้อง");
    expect(result.errors).toContain('บรรทัด 2: source_quality_tier ไม่ถูกต้อง "Z"');
  });

  it("accepts a complete research metadata row", () => {
    const result = validateCsvRows("trend_items", [
      {
        id: "1",
        platform: "tiktok",
        region: "thailand",
        trend_name: "x",
        trend_type: "keyword",
        collected_at: "2026-05-13",
        source_label: "manual",
        source_url: "https://example.com/source",
        source_type: "manual_csv",
        verification_status: "needs_verification",
        is_estimated: "false",
        is_user_provided: "true",
        source_quality_tier: "A",
        confidence_reason: "User-owned analytics export."
      }
    ]);

    expect(result.valid).toBe(true);
  });

  it("validates China platform group", () => {
    const result = validateCsvRows("benchmark_creators", [
      {
        id: "1",
        creator_display_name: "Mock China Creator",
        platform: "douyin",
        platform_group: "global_platform",
        source_label: "manual",
        source_url: "https://example.com/source",
        source_type: "manual_csv",
        verification_status: "needs_verification",
        is_estimated: "false",
        is_user_provided: "true",
        source_quality_tier: "A",
        confidence_reason: "User-owned analytics export."
      }
    ]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((error) => error.includes("china_mainland_platform"))).toBe(true);
  });

  it("validates numbers, dates, and optional URLs", () => {
    const result = validateCsvRows("viral_clips", [
      {
        id: "1",
        platform: "tiktok",
        region: "thailand",
        views: "bad",
        likes: "1",
        comments: "1",
        shares: "1",
        saves: "1",
        public_url: "not-url",
        collected_at: "not-date"
      }
    ]);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(3);
  });

  it("rejects invalid calendar dates instead of relying on Date.parse normalization", () => {
    const result = validateCsvRows("events", [
      {
        id: "event-1",
        event_name: "Mock Event",
        start_date: "2026-02-31",
        end_date: "2026-03-01",
        source_label: "manual",
        source_url: "https://example.com/source",
        source_type: "manual_csv",
        verification_status: "needs_verification",
        is_estimated: "false",
        is_user_provided: "true",
        source_quality_tier: "A",
        confidence_reason: "Manual event check."
      }
    ]);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("บรรทัด 2: วันที่ใน start_date ไม่ถูกต้อง");
  });

  it("validates tool/plugin safety checklist", () => {
    expect(validateSafetyChecklist(safetyChecklist)).toBe(true);
    expect(validateSafetyChecklist("download anything")).toBe(false);
  });
});
