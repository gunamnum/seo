import type { BenchmarkCreator, Competitor } from "./types";

export type CompetitorGapRow = {
  competitor_id: string;
  display_name: string;
  competitor_group: Competitor["competitor_group"];
  main_platform: Competitor["main_platform"];
  threat_level: Competitor["threat_level"];
  gap_summary: string;
  recommended_action: string;
};

export type BenchmarkPatternRow = {
  benchmark_id: string;
  platform: BenchmarkCreator["platform"];
  platform_group: BenchmarkCreator["platform_group"];
  content_type: string;
  pattern: string;
  adaptation: string;
};

export type CompetitorBenchmarkReport = {
  thaiCompetitorCount: number;
  globalBenchmarkCount: number;
  chinaBenchmarkCount: number;
  rules: {
    thaiCompetitorsOnly: boolean;
    realCompetitorsManualOnly: boolean;
    chinaMetricsSeparated: boolean;
  };
  competitorRows: CompetitorGapRow[];
  globalBenchmarkPatterns: BenchmarkPatternRow[];
  chinaBenchmarkPatterns: BenchmarkPatternRow[];
  strategyActions: string[];
  chinaAdaptationActions: string[];
  inputWarnings: string[];
};

function looksLikeMockName(name: string): boolean {
  return name.toLowerCase().includes("mock");
}

function classifyAction(competitor: Competitor): string {
  const text = `${competitor.weaknesses} ${competitor.opportunities}`.toLowerCase();
  if (text.includes("caption") || text.includes("seo")) {
    return "ทำ caption ไทยที่ค้นหาเจอ ใส่ CTA จองคิว และคีย์เวิร์ดคอสเพลย์แบบเน้นๆ";
  }
  if (text.includes("event")) {
    return "ชนะด้วย recap งานที่เร็วกว่า BTS และ workflow อัลบั้ม preview";
  }
  if (text.includes("before-after") || text.includes("retouch")) {
    return "ใช้คลิปก่อน/หลังรีทัชให้เห็นคุณค่าภาพตั้งแต่วินาทีแรก";
  }
  if (text.includes("china")) {
    return "ใช้ pattern จีนเป็นแรงบันดาลใจด้านสไตล์เท่านั้น และแยก metric ดิบไว้";
  }
  return "รวมแพ็กเกจถ่าย รีทัช ตัดคลิปสั้น และแผนโพสต์เป็น offer รายสัปดาห์";
}

function benchmarkPattern(benchmark: BenchmarkCreator): BenchmarkPatternRow {
  return {
    benchmark_id: benchmark.id,
    platform: benchmark.platform,
    platform_group: benchmark.platform_group,
    content_type: benchmark.content_type,
    pattern: `${benchmark.hook_pattern} ${benchmark.caption_pattern}`,
    adaptation: benchmark.idea_to_adapt_for_thailand
  };
}

export function buildCompetitorBenchmarkReport({
  competitors,
  benchmarks
}: {
  competitors: Competitor[];
  benchmarks: BenchmarkCreator[];
}): CompetitorBenchmarkReport {
  const inputWarnings: string[] = [];
  const thaiCompetitors = competitors.filter((competitor) => {
    const isThai = competitor.country_or_region === "thailand";
    if (!isThai) {
      inputWarnings.push(`${competitor.id} ไม่ใช่ข้อมูลไทยเท่านั้น ต้องตัดออกจากตารางคู่แข่งไทย`);
    }

    const isRealButNotManual = !competitor.is_mock_data && !competitor.is_user_provided;
    if (isRealButNotManual) {
      inputWarnings.push(
        `${competitor.id} ดูเหมือนข้อมูลจริงแต่ไม่ได้มาจากผู้ใช้ ชื่อคู่แข่งจริงต้องมาจาก manual input เท่านั้น`
      );
    }

    if (competitor.is_mock_data && !looksLikeMockName(competitor.display_name)) {
      inputWarnings.push(`${competitor.id} เป็นข้อมูล mock แต่ชื่อยังไม่ชัดว่าเป็นชื่อปลอม`);
    }

    return isThai && !isRealButNotManual;
  });

  const globalBenchmarks = benchmarks.filter((benchmark) => benchmark.platform_group === "global_platform");
  const chinaBenchmarks = benchmarks.filter((benchmark) => benchmark.platform_group === "china_mainland_platform");
  const competitorRows = thaiCompetitors.map((competitor) => ({
    competitor_id: competitor.id,
    display_name: competitor.display_name,
    competitor_group: competitor.competitor_group,
    main_platform: competitor.main_platform,
    threat_level: competitor.threat_level,
    gap_summary: competitor.opportunities,
    recommended_action: classifyAction(competitor)
  }));

  const strategyActions = Array.from(new Set(competitorRows.map((row) => row.recommended_action))).slice(0, 6);
  const chinaAdaptationActions = chinaBenchmarks.map(
    (benchmark) =>
      `${benchmark.platform}: ${benchmark.idea_to_adapt_for_thailand} ห้ามเทียบ metric ดิบของจีนกับ TikTok / Instagram / Facebook โดยตรง`
  );

  return {
    thaiCompetitorCount: thaiCompetitors.length,
    globalBenchmarkCount: globalBenchmarks.length,
    chinaBenchmarkCount: chinaBenchmarks.length,
    rules: {
      thaiCompetitorsOnly: inputWarnings.every((warning) => !warning.includes("ไม่ใช่ข้อมูลไทยเท่านั้น")),
      realCompetitorsManualOnly: inputWarnings.every((warning) => !warning.includes("ดูเหมือนข้อมูลจริง")),
      chinaMetricsSeparated: true
    },
    competitorRows,
    globalBenchmarkPatterns: globalBenchmarks.map(benchmarkPattern),
    chinaBenchmarkPatterns: chinaBenchmarks.map(benchmarkPattern),
    strategyActions,
    chinaAdaptationActions,
    inputWarnings
  };
}
