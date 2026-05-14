import { describe, expect, it } from "vitest";
import {
  benchmarkCreators,
  competitors,
  contentIdeas,
  events,
  seoKeywords,
  toolsPlugins,
  trendItems
} from "./seed";
import { generateWeeklyGrowthBrief } from "./weeklyBrief";

describe("generateWeeklyGrowthBrief", () => {
  it("returns all required weekly brief sections", () => {
    const brief = generateWeeklyGrowthBrief({
      trends: trendItems,
      ideas: contentIdeas,
      events,
      competitors,
      benchmarks: benchmarkCreators,
      seoKeywords,
      tools: toolsPlugins
    });

    expect(brief.shootThisWeek).toBeTruthy();
    expect(brief.retouchEditStyle).toBeTruthy();
    expect(brief.postFormats.length).toBeGreaterThan(0);
    expect(brief.platformPlan.length).toBeGreaterThan(0);
    expect(brief.socialSeoKeywords.length).toBeGreaterThan(0);
    const nextEvent = [...events].sort((a, b) => a.start_date.localeCompare(b.start_date))[0];

    expect(brief.eventOpportunity).toContain(nextEvent.event_name);
    expect(brief.chinaToThailandAdaptation).toBeTruthy();
    expect(brief.competitorGapToExploit).toBeTruthy();
    expect(brief.evidenceQuality.length).toBeGreaterThan(0);
    expect(brief.risksNeedsVerification.length).toBeGreaterThan(0);
  });

  it("prioritizes the highest trend score", () => {
    const brief = generateWeeklyGrowthBrief({
      trends: trendItems,
      ideas: contentIdeas,
      events,
      competitors,
      benchmarks: benchmarkCreators,
      seoKeywords,
      tools: toolsPlugins
    });
    const topTrend = [...trendItems].sort((a, b) => b.trend_score - a.trend_score)[0];

    expect(brief.topTrend.id).toBe(topTrend.id);
    expect(brief.shootThisWeek).toContain(topTrend.trend_name);
  });

  it("keeps Mainland China adaptation separate from raw global comparisons", () => {
    const brief = generateWeeklyGrowthBrief({
      trends: trendItems,
      ideas: contentIdeas,
      events,
      competitors,
      benchmarks: benchmarkCreators,
      seoKeywords,
      tools: toolsPlugins
    });

    expect(brief.chinaToThailandAdaptation).toContain("ห้ามเทียบ metric ดิบของจีน");
    expect(brief.evidenceQuality.some((item) => item.includes("ข้อมูลจีนแยกแล้ว"))).toBe(true);
  });
});
