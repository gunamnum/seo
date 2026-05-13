import { describe, expect, it } from "vitest";
import { calculateTrendScore } from "./scoring";

describe("calculateTrendScore", () => {
  it("perfect score = 100", () => {
    expect(
      calculateTrendScore({
        hashtagKeywordVelocity: 100,
        audioFormatVelocity: 100,
        crossPlatformSignal: 100,
        eventRelevanceThailand: 100,
        visualFitBrightCgCosplay: 100,
        competitionGap: 100
      }).score
    ).toBe(100);
  });

  it("all zero = 0", () => {
    expect(
      calculateTrendScore({
        hashtagKeywordVelocity: 0,
        audioFormatVelocity: 0,
        crossPlatformSignal: 0,
        eventRelevanceThailand: 0,
        visualFitBrightCgCosplay: 0,
        competitionGap: 0
      }).score
    ).toBe(0);
  });

  it("missing values default to 0 and lower confidence", () => {
    const result = calculateTrendScore({ hashtagKeywordVelocity: 100 });
    expect(result.score).toBe(35);
    expect(result.confidence).toBe("low");
  });

  it("out-of-range values are clamped", () => {
    const result = calculateTrendScore({
      hashtagKeywordVelocity: 200,
      audioFormatVelocity: -20,
      crossPlatformSignal: 100,
      eventRelevanceThailand: 100,
      visualFitBrightCgCosplay: 100,
      competitionGap: 100
    });
    expect(result.normalized.hashtagKeywordVelocity).toBe(100);
    expect(result.normalized.audioFormatVelocity).toBe(0);
    expect(result.score).toBe(80);
  });

  it("weighted result is correct", () => {
    const result = calculateTrendScore({
      hashtagKeywordVelocity: 80,
      audioFormatVelocity: 50,
      crossPlatformSignal: 60,
      eventRelevanceThailand: 40,
      visualFitBrightCgCosplay: 90,
      competitionGap: 20
    });
    expect(result.score).toBe(63);
  });
});
