import type { ContentIdea, EventItem, Platform, TrendItem } from "./types";

type GenerateIdeaInput = {
  trend: TrendItem;
  event?: EventItem;
  platform: Platform;
  visualStyle: string;
  targetAudienceSegment: string;
  goal: "views" | "likes" | "comments" | "shares" | "saves" | "booking";
  effort: "low" | "medium" | "high";
};

export function generateContentIdea(input: GenerateIdeaInput): ContentIdea {
  const eventText = input.event ? `ที่ ${input.event.event_name}` : "สัปดาห์นี้";
  const bookingCta =
    input.goal === "booking"
      ? "ทักมาจองคิวถ่ายคอสเพลย์รอบหน้าได้เลย"
      : "คอมเมนต์คำว่า glow ถ้าอยากดู breakdown";

  return {
    source_label: "สร้างจากเทรนด์/อีเวนต์ที่เลือก",
    source_url: input.trend.source_url,
    source_type: input.trend.source_type,
    verification_status: input.trend.verification_status,
    is_mock_data: input.trend.is_mock_data,
    is_estimated: true,
    is_user_provided: false,
    source_quality_tier: input.trend.source_quality_tier,
    confidence_reason: `สร้างจากความมั่นใจของเทรนด์: ${input.trend.confidence_reason}`,
    id: `generated-${input.trend.id}-${input.platform}`,
    title: `${input.trend.trend_name} Sprint คอนเทนต์ Bright CG Cosplay`,
    platform_target: input.platform,
    related_trend_id: input.trend.id,
    related_event_id: input.event?.id,
    content_type: "before_after",
    hook: `จากไฟล์ RAW ธรรมดา กลายเป็นภาพคอสสดใสใน 8 วิ ${eventText}`,
    caption_th: `ถ่ายคอสเพลย์ + รีทัชภาพคอสด้วยสไตล์ ${input.visualStyle}. ${bookingCta}`,
    caption_en: `Cosplay photography glow edit for ${input.targetAudienceSegment}.`,
    hashtags: [
      "ถ่ายคอสเพลย์",
      "ช่างภาพคอสเพลย์",
      "รีทัชภาพคอส",
      "cosplay thailand",
      "cosplay photography",
      "cosplay retouch"
    ],
    shot_list: ["หน้าจอ RAW", "ปรับสี", "เก็บผิว", "CG glow เล็กๆ", "ภาพจบ"],
    retouch_notes: "คุมผิวให้สะอาด โทนสว่าง และเกรดสีให้เข้ากับตัวละคร",
    cg_notes: "ใช้ glow นุ่ม particle เล็กๆ และเส้นแสงเฉพาะจุดที่ช่วยเสริมตัวละคร",
    posting_window: input.event ? "14 ถึง 1 วันก่อนงาน แล้ว recap หลังงาน" : "7 วันถัดไป",
    expected_effort: input.effort,
    expected_impact: input.trend.trend_score >= 80 ? "high" : "medium",
    status: "idea"
  };
}
