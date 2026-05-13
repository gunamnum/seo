"use client";

import dynamic from "next/dynamic";

function ChartSkeleton() {
  return <div className="h-72 w-full rounded-[24px] bg-surface-soft" aria-label="กำลังโหลดกราฟ" />;
}

export const TrendScoreChart = dynamic(
  () => import("./charts").then((module) => module.TrendScoreChart),
  {
    ssr: false,
    loading: ChartSkeleton
  }
);

export const EngagementChart = dynamic(
  () => import("./charts").then((module) => module.EngagementChart),
  {
    ssr: false,
    loading: ChartSkeleton
  }
);
