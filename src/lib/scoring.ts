export type TrendScoreInput = {
  hashtagKeywordVelocity?: number | null;
  audioFormatVelocity?: number | null;
  crossPlatformSignal?: number | null;
  eventRelevanceThailand?: number | null;
  visualFitBrightCgCosplay?: number | null;
  competitionGap?: number | null;
};

export type TrendScoreResult = {
  score: number;
  confidence: "low" | "medium" | "high";
  explanation: string[];
  normalized: Required<Record<keyof TrendScoreInput, number>>;
};

const weights: Record<keyof TrendScoreInput, number> = {
  hashtagKeywordVelocity: 0.35,
  audioFormatVelocity: 0.2,
  crossPlatformSignal: 0.15,
  eventRelevanceThailand: 0.15,
  visualFitBrightCgCosplay: 0.1,
  competitionGap: 0.05
};

export function clampScore(value: number | null | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

export function calculateTrendScore(input: TrendScoreInput): TrendScoreResult {
  const normalized = Object.fromEntries(
    (Object.keys(weights) as Array<keyof TrendScoreInput>).map((key) => [
      key,
      clampScore(input[key])
    ])
  ) as TrendScoreResult["normalized"];

  const missingCount = (Object.keys(weights) as Array<keyof TrendScoreInput>).filter(
    (key) => input[key] === undefined || input[key] === null || Number.isNaN(input[key])
  ).length;

  const rawScore = (Object.keys(weights) as Array<keyof TrendScoreInput>).reduce(
    (sum, key) => sum + normalized[key] * weights[key],
    0
  );

  const confidence =
    missingCount >= 3 ? "low" : missingCount > 0 ? "medium" : "high";

  const explanation = [
    `Hashtag / keyword velocity contributes ${Math.round(normalized.hashtagKeywordVelocity * weights.hashtagKeywordVelocity)} points.`,
    `Audio / format velocity contributes ${Math.round(normalized.audioFormatVelocity * weights.audioFormatVelocity)} points.`,
    `Cross-platform signal contributes ${Math.round(normalized.crossPlatformSignal * weights.crossPlatformSignal)} points.`,
    `Thailand event relevance contributes ${Math.round(normalized.eventRelevanceThailand * weights.eventRelevanceThailand)} points.`,
    `Bright CG visual fit contributes ${Math.round(normalized.visualFitBrightCgCosplay * weights.visualFitBrightCgCosplay)} points.`,
    `Competition gap contributes ${Math.round(normalized.competitionGap * weights.competitionGap)} points.`,
    missingCount > 0
      ? `${missingCount} missing value(s) defaulted to 0, lowering confidence.`
      : "All inputs present."
  ];

  return {
    score: Math.round(rawScore),
    confidence,
    explanation,
    normalized
  };
}
