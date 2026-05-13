import { calculateEngagementRateByView, calculateShareabilityScore } from "./metrics";
import { calculateTrendScore } from "./scoring";
import type {
  BenchmarkCreator,
  Competitor,
  ContentIdea,
  EventItem,
  Experiment,
  MarketIndicator,
  Platform,
  Region,
  SourceType,
  SeoKeyword,
  ToolPlugin,
  TrendItem,
  ViralClip
} from "./types";

export const safetyChecklist =
  "ดาวน์โหลดจากเว็บไซต์ทางการ marketplace ทางการ หรือ GitHub release ที่ตรวจสอบได้เท่านั้น ห้ามใช้ปลั๊กอิน crack หรือ installer ไม่ทราบแหล่งที่มา ตรวจ checksum/signature เมื่อมี สแกนด้วย VirusTotal ก่อนรัน และอัปเดตเครื่องมือสม่ำเสมอ";

function mockResearchFields(
  sourceLabel = "ข้อมูล mock สำหรับเริ่มต้น",
  sourceType: SourceType = "mock_seed"
) {
  return {
    source_label: sourceLabel,
    source_url: "https://example.com/mock-source",
    source_type: sourceType,
    verification_status: "needs_verification" as const,
    is_mock_data: true,
    is_estimated: true,
    is_user_provided: false,
    source_quality_tier: "D" as const,
    confidence_reason:
      "ข้อมูล mock สำหรับ MVP แบบ offline ต้องแทนด้วยข้อมูลยืนยันแล้วหรือข้อมูลที่ผู้ใช้ให้มาก่อนใช้ตัดสินใจจริง"
  };
}

const trendNames = [
  ["tiktok", "thailand", "RAW เป็นภาพจบ Bright CG", "clip_format", 92, 84, 76, 88, 96, 64],
  ["instagram", "thailand", "คารูเซลครอปรายละเอียดโทนอนิเมะพาสเทล", "visual_style", 74, 62, 71, 72, 91, 58],
  ["facebook", "thailand", "โพสต์อัลบั้มงานพร้อม CTA จองคิว", "keyword", 68, 45, 54, 85, 80, 72],
  ["douyin", "mainland_china", "เปิดตัวตัวละครใน 1 วินาที", "clip_format", 89, 95, 82, 60, 90, 55],
  ["xiaohongshu", "mainland_china", "Moodboard แฟนตาซีสะอาด", "visual_style", 77, 58, 69, 52, 88, 70],
  ["bilibili", "mainland_china", "อธิบายขั้นตอนรีทัชแบบละเอียด", "clip_format", 66, 73, 64, 50, 82, 61],
  ["weibo", "mainland_china", "Thread อัปเดตงานอีเวนต์ของแฟนด้อม", "event", 59, 44, 58, 48, 70, 68],
  ["google_trends", "thailand", "ค้นหาจองคิวถ่ายคอสเพลย์", "keyword", 70, 35, 63, 76, 78, 84],
  ["manual", "japan", "ขอบแสงนุ่มสไตล์ไอดอล", "visual_style", 61, 54, 57, 40, 86, 62],
  ["tiktok", "thailand", "คู่มือโพสสำหรับ cosplayer มือใหม่", "tutorial", 78, 71, 74, 82, 79, 76],
  ["instagram", "global", "คารูเซลครอปรายละเอียดภาพ", "portfolio_showcase", 64, 52, 66, 46, 83, 69],
  ["facebook", "thailand", "โพสต์อัลบั้มแพ็กเกจจองคิว", "keyword", 58, 40, 51, 74, 77, 80]
] as const;

export const trendItems: TrendItem[] = trendNames.map((item, index) => {
  const score = calculateTrendScore({
    hashtagKeywordVelocity: item[4],
    audioFormatVelocity: item[5],
    crossPlatformSignal: item[6],
    eventRelevanceThailand: item[7],
    visualFitBrightCgCosplay: item[8],
    competitionGap: item[9]
  });
  return {
    ...mockResearchFields(),
    id: `trend-${index + 1}`,
    platform: item[0] as Platform,
    region: item[1] as Region,
    trend_name: item[2],
    trend_type: item[3] === "tutorial" || item[3] === "portfolio_showcase" ? "clip_format" : item[3],
    current_metric: 1000 + index * 340,
    previous_metric: 700 + index * 180,
    velocity: item[4],
    audio_format_velocity: item[5],
    cross_platform_signal: item[6],
    event_relevance_thailand: item[7],
    visual_fit_bright_cg_cosplay: item[8],
    competition_gap: item[9],
    trend_score: score.score,
    confidence_level: score.confidence,
    recommended_content_idea: `${item[2]} ทำเป็นโพสต์สั้นก่อน/หลังรีทัชคอสเพลย์`,
    notes: "ข้อมูล mock ต้องตรวจสอบเองก่อนใช้วางแผนจริง",
    collected_at: "2026-05-13"
  };
});

const clipTypes: ViralClip["content_type"][] = [
  "bts",
  "before_after",
  "event_recap",
  "tutorial",
  "character_reveal",
  "lighting_setup",
  "retouch_timelapse",
  "portfolio_showcase",
  "before_after",
  "bts"
];

export const viralClips: ViralClip[] = Array.from({ length: 20 }, (_, index) => {
  const platform = (["tiktok", "instagram", "facebook", "douyin", "xiaohongshu"] as Platform[])[
    index % 5
  ];
  const views = 12000 + index * 6300;
  const likes = 900 + index * 410;
  const comments = 45 + index * 18;
  const shares = 120 + index * 27;
  const saves = 180 + index * 33;
  const metrics = { views, likes, comments, shares, saves };
  return {
    ...mockResearchFields("ข้อมูล mock จากการสังเกตคลิปแบบ manual"),
    id: `clip-${index + 1}`,
    platform,
    region: platform === "douyin" || platform === "xiaohongshu" ? "mainland_china" : "thailand",
    public_url: `https://example.com/mock-clip-${index + 1}`,
    creator_display_name: `ตัวอย่าง Creator คลิป ${index + 1}`,
    is_competitor: index % 4 === 0,
    views,
    likes,
    comments,
    shares,
    saves,
    engagement_rate_by_view: calculateEngagementRateByView(metrics),
    shareability_score: calculateShareabilityScore(metrics),
    caption: "ตัวอย่างข้อมูลคลิปคอสเพลย์ ใช้แทนข้อมูลที่กรอกเองเท่านั้น",
    hashtags: ["ถ่ายคอสเพลย์", "cosplay thailand", "cosplay retouch"],
    hook_text: index % 2 === 0 ? "จากไฟล์ RAW เป็นภาพจบ glow" : "เบื้องหลังอีเวนต์สู่ภาพ portrait จบ",
    on_screen_text: index % 2 === 0 ? "คอส glow ใน 8 วิ" : "ก่อนงาน / หลังรีทัช",
    video_length_seconds: 8 + (index % 6) * 5,
    content_type: clipTypes[index % clipTypes.length],
    visual_style: ["พาสเทลสว่าง", "นีออน cinematic", "แฟนตาซีสะอาด", "ไอดอล polish"][index % 4],
    retouch_style: ["ผิวสะอาด", "glow นุ่ม", "สีเด่น", "clean หรู"][index % 4],
    cg_level: (["light", "medium", "none", "heavy"] as const)[index % 4],
    cosplay_theme: ["จอมเวทอนิเมะ", "ไอดอล", "นักสู้จากเกม", "แฟนตาซีโรงเรียน"][index % 4],
    lesson_learned: "วินาทีแรกต้องชัด และต้องเห็นภาพจบเร็วเพื่อช่วย retention",
    idea_to_adapt: "ใช้ caption ไทย ใส่บริบทอีเวนต์ และ CTA จองคิว",
    collected_at: "2026-05-13"
  };
});

export const competitors: Competitor[] = [
  "Mock ช่างภาพอีเวนต์ไทย A",
  "Mock พอร์ตเทรตพรีเมียม B",
  "Mock รีทัชแฟนตาซี C",
  "Mock Creator คลิปสั้น D",
  "Mock สตูดิโอคอสเพลย์ Hybrid E",
  "Mock อัลบั้ม Convention F",
  "Mock พอร์ตเทรต Bright CG G",
  "Mock ช่างภาพ Reels First H"
].map((name, index) => ({
  ...mockResearchFields("ข้อมูล mock คู่แข่งไทย"),
  id: `competitor-${index + 1}`,
  display_name: name,
  country_or_region: "thailand",
  public_url: `https://example.com/mock-thai-competitor-${index + 1}`,
  main_platform: (["facebook", "instagram", "tiktok"] as Platform[])[index % 3],
  secondary_platforms: ["instagram", "facebook"],
  competitor_group: (
    [
      "event_album_shooter",
      "premium_cinematic",
      "retouch_fantasy_cg",
      "short_form_first_creator",
      "hybrid"
    ] as Competitor["competitor_group"][]
  )[index % 5],
  visual_style: ["ภาพอีเวนต์สะอาด", "cinematic", "แฟนตาซี CG", "คลิปสั้นสดใส"][index % 4],
  content_formats: ["อัลบั้ม", "Reels", "ก่อน/หลัง"],
  estimated_avg_views: 5000 + index * 2300,
  estimated_engagement_rate: 0.035 + index * 0.004,
  strengths: "โพสต์สม่ำเสมอและมีภาษาภาพจำง่าย",
  weaknesses: "ยังปรับ pattern จากแพลตฟอร์มจีนได้น้อย และ caption ค้นหาเจอยาก",
  opportunities: "ชนะได้ด้วย recap งานที่เร็วกว่า SEO ไทย และคลิปก่อน/หลัง",
  threat_level: (["low", "medium", "high"] as const)[index % 3],
  notes: "คู่แข่ง mock ต้องแทนด้วยข้อมูลที่ผู้ใช้กรอกเองเท่านั้น",
  updated_at: "2026-05-13"
}));

const benchmarkRegions: Region[] = [
  "thailand",
  "japan",
  "korea",
  "taiwan",
  "hong_kong",
  "singapore",
  "malaysia",
  "indonesia",
  "philippines",
  "vietnam",
  "mainland_china",
  "mainland_china",
  "mainland_china",
  "mainland_china",
  "mainland_china"
];

export const benchmarkCreators: BenchmarkCreator[] = benchmarkRegions.map((region, index) => {
  const china = region === "mainland_china";
  const platform = china
    ? (["douyin", "xiaohongshu", "bilibili", "weibo", "douyin"] as Platform[])[index - 10]
    : (["instagram", "tiktok", "facebook", "x_twitter", "behance"] as Platform[])[index % 5];
  return {
    ...mockResearchFields(china ? "ข้อมูล mock benchmark จีน" : "ข้อมูล mock benchmark เอเชีย"),
    id: `benchmark-${index + 1}`,
    creator_display_name: `Mock Creator Benchmark เอเชีย ${index + 1}`,
    country_or_region: region,
    platform,
    public_url: `https://example.com/mock-benchmark-${index + 1}`,
    platform_group: china ? "china_mainland_platform" : "global_platform",
    content_type: ["เปิดตัว", "อธิบายรีทัช", "เรื่องเล่าอีเวนต์", "พอร์ตผลงาน", "สอนเทคนิค"][index % 5],
    visual_style: ["แฟนตาซีสว่าง", "อนิเมะพาสเทล", "cinematic", "clean หรู"][index % 4],
    retouch_style: ["ผิวสะอาด", "glow นุ่ม", "สีเด่น", "ครอปรายละเอียด"][index % 4],
    cg_level: (["light", "medium", "heavy", "none"] as const)[index % 4],
    average_views: 15000 + index * 5000,
    engagement_rate: 0.04 + index * 0.003,
    hook_pattern: "โชว์ภาพจบก่อนค่อยเล่ากระบวนการ",
    caption_pattern: "caption สั้น ค้นหาเจอ และมี action เดียวชัดเจน",
    hashtag_or_keyword_pattern: "ใช้ keyword น้อยแต่ตรง ไม่ใส่ hashtag ยาวแบบ spam",
    strengths: "hook ชัดและมีลายเซ็นภาพสม่ำเสมอ",
    weaknesses: "ต้องเพิ่มบริบทอีเวนต์ไทยและการจองคิว",
    idea_to_adapt_for_thailand: "ปรับ hook ให้โยงกับอีเวนต์ไทย แฟนด้อม และคีย์เวิร์ดรีทัช",
    china_adaptation_notes: china
      ? "ใช้เป็น pattern เท่านั้น ห้ามเทียบ metric ดิบของจีนกับแพลตฟอร์ม global โดยตรง"
      : "เป็น benchmark แพลตฟอร์มทั่วไป แยกจาก metric จีนแผ่นดินใหญ่",
    updated_at: "2026-05-13"
  };
});

export const events: EventItem[] = Array.from({ length: 8 }, (_, index) => {
  const month = String((index % 6) + 6).padStart(2, "0");
  const startDay = String((index % 8) + 1).padStart(2, "0");
  const endDay = String((index % 8) + 2).padStart(2, "0");
  return {
    ...mockResearchFields("ปฏิทินอีเวนต์ mock"),
    id: `event-${index + 1}`,
    event_name: `Mock งานคอสเพลย์ ${index + 1}`,
    country_or_region: index < 6 ? "thailand" : "other",
    city: ["กรุงเทพฯ", "เชียงใหม่", "ขอนแก่น", "พัทยา"][index % 4],
    venue: `Mock Convention Hall ${index + 1}`,
    start_date: `2026-${month}-${startDay}`,
    end_date: `2026-${month}-${endDay}`,
    event_type: (["cosplay", "anime", "game", "japanese_pop_culture"] as const)[index % 4],
    fandom_relevance: "เกี่ยวข้องสูงกับงานถ่ายคอสเพลย์สายอนิเมะ/เกม",
    expected_content_opportunity: "CTA จองคิว คลิป BTS อัลบั้ม preview และก่อน/หลังรีทัช",
    recommended_pre_event_content: "แจ้งคิวว่าง คู่มือโพส และไกด์โลเคชัน",
    recommended_event_day_content: "BTS สั้น คลิปแนวตั้ง stories และแท็ก creator/cosplayer",
    recommended_post_event_content: "อัลบั้ม preview ภาพจบ งานรีทัช และ recap",
    verification_status: index % 3 === 0 ? "needs_update" : "unverified",
    notes: "วันที่อีเวนต์จริงต้องตรวจสอบเองก่อนใช้"
  };
});

const toolNames = [
  ["GIMP", "photo_editing", "open_source", "แต่งภาพและรีทัชพื้นฐาน"],
  ["G'MIC", "retouch", "open_source", "ฟิลเตอร์สร้างสรรค์และประมวลผลภาพ"],
  ["Krita", "cg", "open_source", "paint-over และเติม CG เล็กๆ"],
  ["Blender", "cg", "open_source", "พร็อป 3D แสงเส้น และ scene CG ง่ายๆ"],
  ["DaVinci Resolve / Fusion", "video_editing", "freemium", "ตัดต่อคลิปสั้น ทำสี และ VFX"],
  ["ComfyUI", "ai_assist", "open_source", "ทดลอง workflow AI assist"],
  ["Adobe Camera Raw", "raw_processing", "bundled", "ปรับ RAW สี และแก้เลนส์"],
  ["Photopea", "photo_editing", "freemium", "แก้ไฟล์ PSD บน browser"],
  ["RawTherapee", "raw_processing", "open_source", "พัฒนาไฟล์ RAW"],
  ["darktable", "raw_processing", "open_source", "จัดการ RAW catalog และ workflow สี"],
  ["ExifTool", "analytics", "open_source", "ตรวจและล้าง metadata"],
  ["OBS Studio", "video_editing", "open_source", "อัดหน้าจอทำ retouch timelapse"]
] as const;

export const toolsPlugins: ToolPlugin[] = toolNames.map((item, index) => {
  const priceType = item[2] as ToolPlugin["price_type"];
  return {
    ...mockResearchFields("ข้อมูล mock เครื่องมือและความปลอดภัย"),
    id: `tool-${index + 1}`,
    tool_name: item[0],
    category: item[1] as ToolPlugin["category"],
    official_source_label: "เว็บไซต์ทางการหรือ GitHub release ที่ตรวจสอบได้",
    official_url_optional: `https://example.com/official-${index + 1}`,
    price_type: priceType,
    estimated_price: priceType === "paid" ? "เสียเงิน ต้องตรวจราคาปัจจุบัน" : "ฟรีหรือราคาต่ำ ต้องตรวจเงื่อนไขปัจจุบัน",
    license_type: item[2],
    main_use_case: item[3],
    why_useful_for_cosplay: "ช่วยงานรีทัชคอสเพลย์สว่าง CG เล็กๆ พอร์ตผลงาน หรือ workflow คลิปสั้น",
    safety_checklist: safetyChecklist,
    checksum_or_signature_available: index % 2 === 0,
    virustotal_checked: "manual",
    last_verified_at: "2026-05-13",
    warning_notes: "ตรวจแหล่งดาวน์โหลดล่าสุดก่อนติดตั้ง ห้ามใช้ปลั๊กอิน crack",
    recommendation_level: index === 5 ? "optional" : "recommended"
  };
});

const baseKeywords = [
  "ถ่ายคอสเพลย์",
  "ช่างภาพคอสเพลย์",
  "รีทัชภาพคอส",
  "cosplay thailand",
  "cosplay photography",
  "cosplay retouch",
  "รับถ่ายคอสเพลย์",
  "คอสเพลย์กรุงเทพ",
  "cosplay event thailand",
  "ภาพคอสเพลย์อนิเมะ"
];

export const seoKeywords: SeoKeyword[] = Array.from({ length: 30 }, (_, index) => ({
  ...mockResearchFields("ข้อมูล mock คีย์เวิร์ด SEO"),
  id: `seo-${index + 1}`,
  platform: (["tiktok", "instagram", "facebook"] as Platform[])[index % 3],
  language: (["thai", "english", "mixed"] as const)[index % 3],
  keyword: baseKeywords[index % baseKeywords.length],
  search_intent: (
    ["booking", "tutorial", "inspiration", "event", "portfolio", "retouch", "cosplay_character", "fandom"] as const
  )[index % 8],
  priority: 100 - index * 2,
  recommended_caption_usage: "ใส่ให้เป็นธรรมชาติในประโยคแรกหรือ on-screen text",
  recommended_hashtags: ["ถ่ายคอสเพลย์", "cosplaythailand", "cosplayretouch"],
  recommended_on_screen_text: "RAW เป็นภาพจบ cosplay glow",
  notes: "คีย์เวิร์ด mock ต้องตรวจด้วย platform search หรือ CSV import"
}));

export const contentIdeas: ContentIdea[] = Array.from({ length: 20 }, (_, index) => ({
  ...mockResearchFields("ข้อมูล mock ไอเดียคอนเทนต์"),
  id: `idea-${index + 1}`,
  title: [
    "รีทัช RAW เป็นภาพจบ Cosplay Glow",
    "จาก BTS อีเวนต์สู่ภาพจบ",
    "คู่มือโพสสำหรับมือใหม่",
    "อธิบาย CG Glow เล็กๆ",
    "Transition เปิดตัวตัวละคร"
  ][index % 5],
  platform_target: (["tiktok", "instagram", "facebook"] as Platform[])[index % 3],
  related_trend_id: trendItems[index % trendItems.length].id,
  related_event_id: events[index % events.length].id,
  content_type: clipTypes[index % clipTypes.length],
  hook: "จากไฟล์ RAW ธรรมดา กลายเป็นภาพคอสสดใสใน 8 วิ",
  caption_th: "ถ่ายคอสเพลย์สไตล์ bright CG พร้อมรีทัชภาพคอสให้พร้อมลงโซเชียล",
  caption_en: "Bright CG cosplay photography and retouch breakdown.",
  hashtags: ["ถ่ายคอสเพลย์", "ช่างภาพคอสเพลย์", "cosplay thailand"],
  shot_list: ["หน้าจอ RAW", "ปรับสี", "เก็บผิว", "เติม glow", "ภาพจบ"],
  retouch_notes: "ผิวสะอาด โทนพาสเทล ไม่ทำให้ผิวดูพลาสติก",
  cg_notes: "ใช้ particle เล็กๆ และ rim light นุ่มเท่านั้น",
  posting_window: ["14 วันก่อนงาน", "7 วันก่อนงาน", "วันงาน", "1-3 วันหลังงาน"][index % 4],
  expected_effort: (["low", "medium", "high"] as const)[index % 3],
  expected_impact: (["medium", "high", "low"] as const)[index % 3],
  status: (["idea", "planned", "shooting", "editing", "posted"] as const)[index % 5]
}));

export const marketIndicators: MarketIndicator[] = [
  "การใช้โซเชียลในไทย",
  "Reach ของ TikTok / Instagram / Facebook",
  "จำนวนอีเวนต์คอสเพลย์",
  "ความสนใจค้นหาบน Google Trends",
  "จำนวน inquiry จองคิว",
  "การเติบโตของคู่แข่ง",
  "ผลงานคลิปสั้น",
  "การใช้เครื่องมือ AI retouch / CG"
].map((name, index) => ({
  ...mockResearchFields("ข้อมูล mock ตัวชี้วัดตลาด"),
  id: `indicator-${index + 1}`,
  indicator_name: name,
  period: "baseline mock ปี 2026",
  value: `${60 + index * 4} คะแนนดัชนี`,
  source_label: "ตัวชี้วัด mock ต้องนำเข้า CSV จริงภายหลัง",
  confidence_level: (["medium", "low", "medium", "high"] as const)[index % 4],
  interpretation: "คลิปสั้น การมองเห็นจากอีเวนต์ และความเร็ว workflow รีทัชสำคัญที่สุด",
  forecast_1_year: "คลิปสั้นและคอนเทนต์อีเวนต์ยังแรง",
  forecast_2_3_years: "คู่แข่งเพิ่มขึ้น เพราะ AI และเครื่องมือรีทัชทำให้เริ่มง่ายขึ้น",
  forecast_3_5_years: "ตลาดพรีเมียมยังอยู่ได้ถ้ามี workflow ความน่าเชื่อถือ และ community",
  risks: "โพสต์เฉพาะภาพนิ่งอาจ reach ลดลง และคู่แข่งสาย AI/retouch เพิ่มขึ้น",
  opportunities: "ขายแพ็กเกจถ่าย + รีทัช + คลิปสั้น",
  updated_at: "2026-05-13"
}));

export const experiments: Experiment[] = Array.from({ length: 6 }, (_, index) => ({
  ...mockResearchFields("ข้อมูล mock การทดลองคอนเทนต์"),
  id: `experiment-${index + 1}`,
  experiment_name: `Mock ทดลองคอนเทนต์ ${index + 1}`,
  hypothesis: "โชว์ภาพจบก่อนช่วยเพิ่ม retention และ save",
  platform: (["tiktok", "instagram", "facebook"] as Platform[])[index % 3],
  content_type: clipTypes[index % clipTypes.length],
  variant_a: "เริ่มด้วยขั้นตอน",
  variant_b: "เริ่มด้วยภาพจบ",
  start_date: "2026-05-13",
  end_date: "2026-05-20",
  views_a: 3000 + index * 800,
  views_b: 4200 + index * 1100,
  engagement_rate_a: 0.052 + index * 0.004,
  engagement_rate_b: 0.069 + index * 0.005,
  winner: "variant_b",
  lesson: "hook แบบโชว์ภาพจบก่อนทำให้ payoff ชัดกว่า",
  next_action: "ทำซ้ำกับ recap งานและ CTA จองคิว"
}));

export const chinaPlatformNotes = [
  {
    platform: "Douyin",
    focus: "เทรนด์คลิปสั้น reveal, BTS และ format ไวรัล",
    adaptation: "ปรับเป็น TikTok ไทยแบบ short reveal พร้อม hook อีเวนต์ไทยและคีย์เวิร์ดค้นหา"
  },
  {
    platform: "Xiaohongshu / RED",
    focus: "lifestyle, beauty, portfolio, moodboard และสไตล์รีวิว",
    adaptation: "ปรับเป็น IG carousel: moodboard, detail crop, retouch notes และ CTA จองคิว"
  },
  {
    platform: "Bilibili",
    focus: "tutorial ยาว, BTS breakdown, วิดีโอแฟนด้อม และขั้นตอนรีทัช",
    adaptation: "ปรับเป็น Facebook album story และตัดเป็น Reels สั้น"
  },
  {
    platform: "Weibo",
    focus: "community แฟนด้อม อัปเดตสาธารณะ โพสต์งาน และการมองเห็น creator",
    adaptation: "ปรับเป็น thread อัปเดตอีเวนต์และแผนแท็ก community"
  }
];
