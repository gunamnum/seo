export type ClipMetricInput = {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
};

function safeRate(numerator: number, denominator: number): number {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) {
    return 0;
  }
  return numerator / denominator;
}

export function calculateEngagementRateByView(input: ClipMetricInput): number {
  return safeRate(input.likes + input.comments + input.shares + input.saves, input.views);
}

export function calculateShareabilityScore(input: ClipMetricInput): number {
  return safeRate(input.shares, input.views);
}

export function calculateSaveRate(input: ClipMetricInput): number {
  return safeRate(input.saves, input.views);
}

export function calculateCommentRate(input: ClipMetricInput): number {
  return safeRate(input.comments, input.views);
}

export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
