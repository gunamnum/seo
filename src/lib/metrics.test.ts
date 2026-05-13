import { describe, expect, it } from "vitest";
import {
  calculateCommentRate,
  calculateEngagementRateByView,
  calculateSaveRate,
  calculateShareabilityScore
} from "./metrics";

describe("viral clip metrics", () => {
  const clip = { views: 1000, likes: 100, comments: 20, shares: 30, saves: 50 };

  it("calculates engagement rate", () => {
    expect(calculateEngagementRateByView(clip)).toBe(0.2);
  });

  it("calculates shareability score", () => {
    expect(calculateShareabilityScore(clip)).toBe(0.03);
  });

  it("calculates save and comment rates safely", () => {
    expect(calculateSaveRate(clip)).toBe(0.05);
    expect(calculateCommentRate(clip)).toBe(0.02);
    expect(calculateShareabilityScore({ ...clip, views: 0 })).toBe(0);
  });
});
