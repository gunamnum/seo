import type {
  BenchmarkCreator,
  Competitor,
  ContentIdea,
  EventItem,
  SeoKeyword,
  ToolPlugin,
  TrendItem
} from "./types";

export type WeeklyGrowthBriefInput = {
  trends: TrendItem[];
  ideas: ContentIdea[];
  events: EventItem[];
  competitors: Competitor[];
  benchmarks: BenchmarkCreator[];
  seoKeywords: SeoKeyword[];
  tools: ToolPlugin[];
};

export type WeeklyGrowthBrief = {
  topTrend: TrendItem;
  shootThisWeek: string;
  retouchEditStyle: string;
  postFormats: string[];
  platformPlan: string[];
  socialSeoKeywords: string[];
  eventOpportunity: string;
  chinaToThailandAdaptation: string;
  competitorGapToExploit: string;
  evidenceQuality: string[];
  risksNeedsVerification: string[];
  toolSafetyNote: string;
};

export function generateWeeklyGrowthBrief(input: WeeklyGrowthBriefInput): WeeklyGrowthBrief {
  const topTrend = [...input.trends].sort((a, b) => b.trend_score - a.trend_score)[0];
  const topIdea = input.ideas.find((idea) => idea.related_trend_id === topTrend.id) ?? input.ideas[0];
  const nextEvent = [...input.events].sort((a, b) => a.start_date.localeCompare(b.start_date))[0];
  const chinaBenchmark =
    input.benchmarks.find((benchmark) => benchmark.platform_group === "china_mainland_platform") ??
    input.benchmarks[0];
  const competitorGap = input.competitors[0]?.opportunities ?? "ใช้ caption ที่ค้นหาเจอและ recap งานให้เร็วกว่า";
  const highPriorityKeywords = [...input.seoKeywords]
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 8)
    .map((keyword) => keyword.keyword);
  const weakEvidenceCount = [
    ...input.trends,
    ...input.events,
    ...input.benchmarks,
    ...input.tools
  ].filter(
    (item) =>
      item.is_mock_data ||
      item.is_estimated ||
      item.verification_status === "needs_verification" ||
      item.source_quality_tier === "D"
  ).length;

  return {
    topTrend,
    shootThisWeek: `${topTrend.trend_name}: ถ่ายเป็นชุดคอนเทนต์ ${topIdea.content_type} เริ่มจากหน้าจอ RAW ต่อด้วยปรับสี เติม CG glow เล็กๆ และปิดด้วยภาพจบ`,
    retouchEditStyle:
      "ใช้โทน Bright pastel CG ผิวสะอาด ขอบแสงนุ่ม glow พอดี particle เล็กๆ และเกรดสีให้เข้ากับตัวละคร",
    postFormats: [
      `TikTok/Reels: ${topIdea.hook}`,
      "Instagram carousel: ภาพจบหลัก crop รายละเอียด ก่อน/หลัง และ note รีทัช",
      "Facebook album/story: เล่าบริบทอีเวนต์ ใส่ CTA จองคิว และแท็ก cosplayer หลังยืนยันเอง"
    ],
    platformPlan: [
      "TikTok: คลิป reveal สั้น ค้นหาเจอ ใส่คีย์เวิร์ดไทยใน caption และ on-screen text",
      "Instagram: ลง Reel คู่กับ carousel รายละเอียดเพื่อเพิ่ม save",
      "Facebook: ลง album/story พร้อม CTA จองคิวและ recap อีเวนต์"
    ],
    socialSeoKeywords: highPriorityKeywords,
    eventOpportunity: `${nextEvent.event_name} (${nextEvent.start_date}): ${nextEvent.expected_content_opportunity}`,
    chinaToThailandAdaptation: `${chinaBenchmark.platform}: ${chinaBenchmark.idea_to_adapt_for_thailand} ห้ามเทียบ metric ดิบของจีนกับ TikTok / Instagram / Facebook โดยตรง`,
    competitorGapToExploit: competitorGap,
    evidenceQuality: [
      `${weakEvidenceCount} รายการเป็น mock, estimated, tier ต่ำ หรือยังต้องตรวจสอบ`,
      "ข้อมูลจีนแยกแล้ว: ใช้ pattern จีนเพื่อปรับไอเดีย ไม่ใช้เทียบ performance ดิบ",
      `เทรนด์หลักอยู่ tier ${topTrend.source_quality_tier}; สถานะ ${topTrend.verification_status}`
    ],
    risksNeedsVerification: [
      "ตรวจเทรนด์ล่าสุดด้วย CSV ที่กรอกเอง หรือ export analytics จาก official/user source",
      "ตรวจวันที่และสถานที่อีเวนต์เองก่อนใช้ตัดสินใจเรื่องจองคิวหรือปฏิทินโพสต์",
      "แทนข้อมูลคู่แข่ง mock เฉพาะด้วยข้อมูลคู่แข่งจริงที่ผู้ใช้ให้มาเอง"
    ],
    toolSafetyNote:
      input.tools.find((tool) => tool.recommendation_level !== "avoid_until_verified")?.safety_checklist ??
      "ดาวน์โหลดจากแหล่งทางการเท่านั้น และห้ามใช้ปลั๊กอิน crack"
  };
}
