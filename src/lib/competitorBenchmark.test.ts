import { describe, expect, it } from "vitest";
import { benchmarkCreators, competitors } from "./seed";
import { buildCompetitorBenchmarkReport } from "./competitorBenchmark";
import type { Competitor } from "./types";

describe("competitor benchmark report", () => {
  it("separates Thai competitors from global and China benchmarks", () => {
    const report = buildCompetitorBenchmarkReport({
      competitors,
      benchmarks: benchmarkCreators
    });

    expect(report.thaiCompetitorCount).toBe(competitors.length);
    expect(report.globalBenchmarkCount).toBe(10);
    expect(report.chinaBenchmarkCount).toBe(5);
    expect(report.rules.chinaMetricsSeparated).toBe(true);
    expect(report.rules.realCompetitorsManualOnly).toBe(true);
    expect(competitors.filter((competitor) => competitor.is_user_provided)).toHaveLength(5);
    expect(report.competitorRows.filter((competitor) => competitor.is_user_provided)).toHaveLength(5);
    expect(report.competitorRows.some((competitor) => competitor.display_name === "Twixxpix")).toBe(true);
    expect(report.strategyActions.length).toBeGreaterThan(0);
    expect(report.chinaAdaptationActions.every((action) => action.includes("ห้ามเทียบ metric ดิบของจีน"))).toBe(true);
  });

  it("flags non-Thai competitors and non-manual real competitor records", () => {
    const invalidCompetitor = {
      ...competitors[0],
      id: "competitor-invalid",
      display_name: "Real Looking Studio",
      country_or_region: "japan",
      is_mock_data: false,
      is_user_provided: false
    } as unknown as Competitor;

    const report = buildCompetitorBenchmarkReport({
      competitors: [invalidCompetitor],
      benchmarks: benchmarkCreators
    });

    expect(report.thaiCompetitorCount).toBe(0);
    expect(report.inputWarnings).toContain("competitor-invalid ไม่ใช่ข้อมูลไทยเท่านั้น ต้องตัดออกจากตารางคู่แข่งไทย");
    expect(report.inputWarnings).toContain("competitor-invalid ดูเหมือนข้อมูลจริงแต่ไม่ได้มาจากผู้ใช้ ชื่อคู่แข่งจริงต้องมาจาก manual input เท่านั้น");
  });
});
