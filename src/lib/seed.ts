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

function verifiedResearchFields(sourceLabel: string, sourceUrl: string) {
  return {
    source_label: sourceLabel,
    source_url: sourceUrl,
    source_type: "official_source" as const,
    verification_status: "verified" as const,
    is_mock_data: false,
    is_estimated: false,
    is_user_provided: false,
    source_quality_tier: "S" as const,
    confidence_reason: "ตรวจผ่าน browser จาก official public source แล้ว"
  };
}

function publicObservationResearchFields(
  sourceLabel: string,
  sourceUrl: string,
  confidenceReason = "ตรวจจาก public schedule ที่เปิดอ่านได้โดยไม่ต้องล็อกอิน ต้อง cross-check กับ organizer/venue official ก่อนใช้ตัดสินใจจริง"
) {
  return {
    source_label: sourceLabel,
    source_url: sourceUrl,
    source_type: "public_observation" as const,
    verification_status: "needs_update" as const,
    is_mock_data: false,
    is_estimated: false,
    is_user_provided: false,
    source_quality_tier: "B" as const,
    confidence_reason: confidenceReason
  };
}

function secondarySummaryResearchFields(sourceLabel: string, sourceUrl: string) {
  return {
    source_label: sourceLabel,
    source_url: sourceUrl,
    source_type: "secondary_summary" as const,
    verification_status: "verified" as const,
    is_mock_data: false,
    is_estimated: false,
    is_user_provided: false,
    source_quality_tier: "C" as const,
    confidence_reason:
      "ตรวจจาก secondary summary ที่อ้างอิง platform ad resources และ Kepios/DataReportal; ใช้เป็น market signal ไม่ใช่ analytics ของบัญชีผู้ใช้"
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

const reportTrendScore = calculateTrendScore({
  hashtagKeywordVelocity: 82,
  audioFormatVelocity: 62,
  crossPlatformSignal: 74,
  eventRelevanceThailand: 96,
  visualFitBrightCgCosplay: 92,
  competitionGap: 78
});

const reportTrendItems: TrendItem[] = [
  {
    ...mockResearchFields("รายงาน mock จาก AFA Thailand 2026 ที่ตรวจพบผ่าน browser"),
    id: "trend-afa-thailand-2026",
    platform: "google_trends",
    region: "thailand",
    trend_name: "AFA Thailand 2026: คลิปก่อน/หลังรีทัชก่อนงาน",
    trend_type: "event",
    current_metric: 82,
    previous_metric: 48,
    velocity: 82,
    audio_format_velocity: 62,
    cross_platform_signal: 74,
    event_relevance_thailand: 96,
    visual_fit_bright_cg_cosplay: 92,
    competition_gap: 78,
    trend_score: reportTrendScore.score,
    confidence_level: reportTrendScore.confidence,
    recommended_content_idea:
      "ทำชุดคอนเทนต์ก่อนงาน AFA: เปิดคิวถ่าย, pose guide, BTS วันงาน, และ before/after retouch หลังงาน",
    notes:
      "อีเวนต์ยืนยันแล้วจาก official source แต่คะแนนเทรนด์/metric เป็น mock เพราะยังไม่มี analytics export หรือค่า Google Trends ที่บันทึกจริง",
    collected_at: "2026-05-14"
  }
];

export const trendItems: TrendItem[] = [
  ...reportTrendItems,
  ...trendNames.map((item, index) => {
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
  })
];

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

const verifiedAfaEvent: EventItem = {
  ...verifiedResearchFields(
    "QSNCC official event calendar - Anime Festival Asia Thailand 2026",
    "https://www.qsncc.com/en/whats-on/event-calendar/anime-festival-asia-thailand-2026/"
  ),
  id: "event-afa-thailand-2026",
  event_name: "Anime Festival Asia Thailand 2026",
  country_or_region: "thailand",
  city: "กรุงเทพฯ",
  venue: "Queen Sirikit National Convention Center - Exhibition Hall 8, Level LG",
  start_date: "2026-05-30",
  end_date: "2026-05-31",
  event_type: "japanese_pop_culture",
  fandom_relevance: "Anime, Cosplay, Gaming และ Japanese pop culture",
  expected_content_opportunity:
    "เปิดคิวถ่ายก่อนงาน, คลิป BTS วันงาน, album preview, before/after retouch และ CTA จองคิวหลังงาน",
  recommended_pre_event_content:
    "โพสต์เปิดคิว AFA, pose guide, ตัวอย่าง bright CG retouch, checklist เตรียมตัวไปงาน",
  recommended_event_day_content:
    "เก็บ BTS แนวตั้ง, story, quick portrait preview และ short reveal โดยขออนุญาต/แท็กหลังยืนยันเอง",
  recommended_post_event_content:
    "ลงอัลบั้ม preview ภายใน 1-3 วัน ตามด้วยรีทัช final และ breakdown CG glow",
  notes:
    "Cross-check กับ AFA official page: https://animefestival.asia/afath26/ ยืนยันวันที่ 30 & 31 May 2026"
};

const realEventRadar: EventItem[] = [
  {
    ...publicObservationResearchFields(
      "Props&Ops public cosplay event schedule - Japan Week x WCS Thailand Korat qualifier",
      "https://propsops.com/event/"
    ),
    id: "event-wcs-korat-qualifier-2026",
    event_name: "Japan Week x World Cosplay Summit Thailand 2026 - รอบคัดเลือก #3",
    country_or_region: "thailand",
    city: "นครราชสีมา",
    venue: "Central Korat",
    start_date: "2026-05-16",
    end_date: "2026-05-17",
    event_type: "cosplay",
    fandom_relevance: "World Cosplay Summit qualifier และ cosplay contest",
    expected_content_opportunity:
      "ทำ quick local event radar, แจ้งคิวถ่ายต่างจังหวัด, pose guide สำหรับประกวด และ recap หลังงานแบบเร็ว",
    recommended_pre_event_content:
      "โพสต์ short checklist ก่อนเดินทางและเปิดรับคิว portrait สั้นสำหรับ cosplayer ในงาน",
    recommended_event_day_content:
      "เก็บ BTS แนวตั้ง, detail costume, quick portrait preview และ note แสงในห้าง",
    recommended_post_event_content:
      "ลง recap ภายใน 24-48 ชั่วโมง พร้อมก่อน/หลังรีทัช 1 ภาพเพื่อดึง inquiry",
    notes:
      "Props&Ops ระบุรอบคัดเลือก #3 วันที่ 16-17 พ.ค. ที่ Central Korat; ยังต้อง cross-check organizer/venue official"
  },
  {
    ...publicObservationResearchFields(
      "Props&Ops public cosplay event schedule - MAYUCOS 7 x MAYUCARD 1",
      "https://propsops.com/event/"
    ),
    id: "event-mayucos7-mayucard1-2026",
    event_name: "MAYUCOS 7 x MAYUCARD 1",
    country_or_region: "thailand",
    city: "ภูเก็ต",
    venue: "Central Floresta Phuket",
    start_date: "2026-05-23",
    end_date: "2026-05-23",
    event_type: "cosplay",
    fandom_relevance: "Cosplay convention และ cosplay contest",
    expected_content_opportunity:
      "ทดสอบคอนเทนต์ regional cosplay: เปิดคิวถ่ายภูเก็ต, before/after retouch, album preview",
    recommended_pre_event_content:
      "โพสต์ availability แบบสั้นพร้อม keyword ถ่ายคอสเพลย์ภูเก็ตและตัวอย่าง bright CG",
    recommended_event_day_content:
      "ถ่าย portrait preview สีสว่าง เก็บ story และเบื้องหลัง setup แสงง่าย",
    recommended_post_event_content:
      "ลง carousel ภาพจบกับ CTA จองคิวงานถัดไป",
    notes:
      "Props&Ops ระบุวันที่ 23 พ.ค. และสถานที่ Central Floresta Phuket; ยังต้องตรวจ organizer/venue official"
  },
  {
    ...publicObservationResearchFields(
      "Props&Ops public cosplay event schedule - CXM Summer Spring #4",
      "https://propsops.com/event/"
    ),
    id: "event-cxm-summer-spring-4-2026",
    event_name: "CXM Summer Spring #4",
    country_or_region: "thailand",
    city: "กรุงเทพฯ",
    venue: "Mega Plaza สะพานเหล็ก",
    start_date: "2026-05-23",
    end_date: "2026-05-24",
    event_type: "cosplay",
    fandom_relevance: "Cosplay community event ในกรุงเทพฯ",
    expected_content_opportunity:
      "เก็บ local Bangkok recap, short portrait reveal และโพสต์จองคิวรอบถัดไป",
    recommended_pre_event_content:
      "ลงโพสต์บอกคิวถ่ายสั้นและแนวภาพที่เหมาะกับ indoor mall lighting",
    recommended_event_day_content:
      "ถ่าย quick reveal แนวตั้งและ detail crop costume",
    recommended_post_event_content:
      "โพสต์ before/after retouch พร้อม keyword ช่างภาพคอสเพลย์",
    notes:
      "Props&Ops ระบุวันที่ 23-24 พ.ค. ที่ Mega Plaza; ยังต้อง cross-check official event page"
  },
  {
    ...publicObservationResearchFields(
      "World Cosplay Summit official country page + Props&Ops public schedule - Thailand final",
      "https://wcc.worldcosplaysummit.jp/en/player-2026/thailand/",
      "WCS official confirms Thailand preliminary event name and 2026/05/31 date; venue/date range from Props&Ops still needs organizer cross-check"
    ),
    id: "event-wcs-thailand-final-2026",
    event_name: "Japan Week x World Cosplay Summit Thailand 2026 - รอบตัดสิน",
    country_or_region: "thailand",
    city: "นนทบุรี",
    venue: "Central แจ้งวัฒนะ",
    start_date: "2026-05-30",
    end_date: "2026-05-31",
    event_type: "cosplay",
    fandom_relevance: "World Cosplay Summit Thailand final และ Japan pop culture audience",
    expected_content_opportunity:
      "ทำ content คู่กับ AFA weekend: WCS final angle, costume detail, stage/catwalk prep และ booking CTA",
    recommended_pre_event_content:
      "โพสต์ compare plan ระหว่าง AFA/QSNCC และ WCS/Central แจ้งวัฒนะ โดยเน้นคิวถ่ายที่ไม่ชนกัน",
    recommended_event_day_content:
      "เก็บ detail costume และ recap แบบไม่ใช้ metric เทียบดิบกับ AFA",
    recommended_post_event_content:
      "ลง album story และ before/after retouch ที่โยง keyword cosplay thailand",
    notes:
      "WCS official ระบุ event name/date 2026/05/31; Props&Ops ระบุรอบตัดสิน 30-31 พ.ค. ที่ Central แจ้งวัฒนะ"
  },
  {
    ...publicObservationResearchFields(
      "Props&Ops public cosplay event schedule - PPAO E-Sport Championship King of The Game 2026 And Cosplay",
      "https://propsops.com/event/"
    ),
    id: "event-ppao-esport-cosplay-2026",
    event_name: "PPAO E-Sport Championship King of The Game 2026 And Cosplay",
    country_or_region: "thailand",
    city: "พิษณุโลก",
    venue: "Central Phitsanulok",
    start_date: "2026-06-06",
    end_date: "2026-06-07",
    event_type: "game",
    fandom_relevance: "E-sport + cosplay audience เหมาะกับ game character และ clip recap",
    expected_content_opportunity:
      "ทำ game-cosplay vertical clips, lighting setup สั้น และ CTA ถ่ายคอสสายเกม",
    recommended_pre_event_content:
      "โพสต์คิวถ่ายสายเกมและตัวอย่างรีทัชภาพคอสแนว action",
    recommended_event_day_content:
      "ถ่าย transition เปิดตัวตัวละครและ BTS แสงในพื้นที่ event",
    recommended_post_event_content:
      "ลง before/after action retouch พร้อม first comment รวม keyword",
    notes:
      "Props&Ops ระบุวันที่ 6-7 มิ.ย. ที่ Central Phitsanulok; ยังต้องตรวจ organizer/venue official"
  }
];

const mockEvents: EventItem[] = Array.from({ length: 8 }, (_, index) => {
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

export const events: EventItem[] = [...realEventRadar, verifiedAfaEvent, ...mockEvents];

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

const reportSeoKeywords: SeoKeyword[] = [
  "ถ่ายคอสเพลย์",
  "ช่างภาพคอสเพลย์",
  "รีทัชภาพคอส",
  "cosplay thailand",
  "cosplay photography",
  "cosplay retouch"
].map((keyword, index) => ({
  ...mockResearchFields("รายงาน mock keyword จาก AFA Thailand 2026"),
  source_url:
    "https://trends.google.com/trends/explore?geo=TH&q=%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%AA%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%A2%E0%B9%8C,cosplay%20photography,cosplay%20thailand",
  id: `seo-afa-${index + 1}`,
  platform: (["tiktok", "instagram", "facebook"] as Platform[])[index % 3],
  language: index < 3 ? "thai" : "english",
  keyword,
  search_intent: (["event", "booking", "retouch", "event", "portfolio", "retouch"] as const)[index],
  priority: 100 - index,
  recommended_caption_usage: "ใส่ในประโยคแรกหรือ on-screen text ของชุดคอนเทนต์ AFA",
  recommended_hashtags: ["ถ่ายคอสเพลย์", "cosplaythailand", "cosplayretouch"],
  recommended_on_screen_text: "AFA Thailand 2026 cosplay retouch",
  notes: "keyword เป็น mock fallback จนกว่าจะมีค่า search/export จริง"
}));

export const seoKeywords: SeoKeyword[] = [
  ...reportSeoKeywords,
  ...Array.from({ length: 30 }, (_, index) => ({
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
  }))
];

const reportContentIdeas: ContentIdea[] = [
  {
    ...mockResearchFields("รายงาน mock content plan จาก AFA Thailand 2026"),
    id: "idea-afa-thailand-2026",
    title: "AFA Thailand 2026: ยิงคอนเทนต์ก่อนงาน-วันงาน-หลังงาน",
    platform_target: "tiktok",
    related_trend_id: "trend-afa-thailand-2026",
    related_event_id: "event-afa-thailand-2026",
    content_type: "event_recap",
    hook: "AFA Thailand 2026 ต้องถ่ายอะไรให้คุ้ม reach ใน 8 วิ",
    caption_th:
      "AFA Thailand 2026 มาแล้ว เตรียมถ่ายคอสเพลย์ + รีทัชภาพคอสสไตล์ bright CG พร้อมคิวถ่ายและ recap หลังงาน",
    caption_en: "AFA Thailand 2026 cosplay photography and bright CG retouch plan.",
    hashtags: ["ถ่ายคอสเพลย์", "ช่างภาพคอสเพลย์", "cosplay thailand", "cosplay retouch"],
    shot_list: ["ประกาศเปิดคิว", "pose guide", "BTS วันงาน", "ภาพ preview", "before/after retouch"],
    retouch_notes: "Bright pastel CG, ผิวสะอาด, rim light นุ่ม, particle น้อยแต่เห็น payoff",
    cg_notes: "เติม glow และแสงขอบเฉพาะภาพ hero ไม่ทำทุกภาพจนล้น",
    posting_window: "ก่อนงาน 14 วัน ถึงหลังงาน 3 วัน",
    expected_effort: "medium",
    expected_impact: "high",
    status: "planned"
  }
];

export const contentIdeas: ContentIdea[] = [
  ...reportContentIdeas,
  ...Array.from({ length: 20 }, (_, index) => ({
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
  }))
];

const realMarketIndicators: MarketIndicator[] = [
  {
    ...secondarySummaryResearchFields(
      "DataReportal Digital 2026: Thailand",
      "https://datareportal.com/reports/digital-2026-thailand"
    ),
    id: "indicator-th-social-identities-2026",
    indicator_name: "Thailand social media user identities",
    period: "October 2025 data used for Digital 2026 Thailand",
    value: "56.6M social media user identities; 79.1% of total population",
    confidence_level: "medium",
    interpretation:
      "ฐาน social ใหญ่พอสำหรับ organic reach แต่ต้องใช้ content ที่ searchable และ share/save ได้ ไม่ใช่พึ่ง paid ads",
    forecast_1_year: "Short-form + searchable captions ยังเป็นฐานหลักของ discovery ในไทย",
    forecast_2_3_years: "บัญชีที่มี series content และ event recap เร็วจะได้เปรียบกว่าโพสต์ภาพเดี่ยวลอยๆ",
    forecast_3_5_years: "แบรนด์ช่างภาพต้องมี workflow ถ่าย + รีทัช + short clip เพื่อรักษา reach",
    risks: "ตัวเลขเป็น user identities และอาจไม่เท่ากับ unique people หรือ reach ของบัญชีเฉพาะ",
    opportunities: "ทำ weekly event radar, BTS, before/after retouch และ caption ค้นหาเจอ",
    updated_at: "2026-05-14"
  },
  {
    ...secondarySummaryResearchFields(
      "DataReportal Digital 2026: Thailand - TikTok section",
      "https://datareportal.com/reports/digital-2026-thailand"
    ),
    id: "indicator-tiktok-th-ad-reach-2026",
    indicator_name: "TikTok Thailand ad reach signal",
    period: "late 2025 ad resources",
    value: "56.6M users aged 18+; 96.3% of adults 18+",
    confidence_level: "medium",
    interpretation:
      "TikTok ควรเป็นช่องทางหลักสำหรับ reveal, BTS, retouch timelapse และ event recap แนวตั้ง",
    forecast_1_year: "TikTok ยังเหมาะกับ discovery แต่ต้องวัดด้วย analytics export ของบัญชีเอง",
    forecast_2_3_years: "Searchable short video จะสำคัญขึ้นสำหรับ niche service เช่น ถ่ายคอสเพลย์",
    forecast_3_5_years: "ต้องมี clip system ที่ผลิตซ้ำได้หลังทุกงาน",
    risks: "เป็น ad reach 18+ ไม่ใช่ monthly active users และไม่บอก performance ของ niche cosplay โดยตรง",
    opportunities: "ทำ 8-15 วินาที: ภาพจบก่อน, RAW, retouch step, CTA จองคิว",
    updated_at: "2026-05-14"
  },
  {
    ...secondarySummaryResearchFields(
      "DataReportal Digital 2026: Thailand - Facebook section",
      "https://datareportal.com/reports/digital-2026-thailand"
    ),
    id: "indicator-facebook-th-ad-reach-2026",
    indicator_name: "Facebook Thailand ad reach signal",
    period: "late 2025 ad resources",
    value: "51.5M users in Thailand",
    confidence_level: "medium",
    interpretation:
      "Facebook ยังเหมาะกับ album/story/booking CTA และโพสต์บริบทอีเวนต์ที่ยาวกว่า TikTok",
    forecast_1_year: "Facebook ใช้เป็น portfolio + inquiry surface มากกว่าไวรัลล้วน",
    forecast_2_3_years: "Album + short recap + first comment รวม keyword จะช่วย discovery และ conversion",
    forecast_3_5_years: "ควรเก็บเป็น archive ผลงานจริงและรีวิวจากลูกค้าที่ผู้ใช้ให้มาเอง",
    risks: "Meta ปรับวิธีรายงาน ad reach บ่อย จึงไม่ควรเทียบ YoY เองแบบแข็ง",
    opportunities: "ลง album preview ภายใน 1-3 วันหลังงาน พร้อม CTA จองคิว",
    updated_at: "2026-05-14"
  },
  {
    ...secondarySummaryResearchFields(
      "DataReportal Digital 2026: Thailand - Instagram section",
      "https://datareportal.com/reports/digital-2026-thailand"
    ),
    id: "indicator-instagram-th-ad-reach-2026",
    indicator_name: "Instagram Thailand ad reach signal",
    period: "late 2025 ad resources",
    value: "20.6M users; ad reach up 13.9% YoY and 2.0% QoQ",
    confidence_level: "medium",
    interpretation:
      "Instagram เหมาะกับ carousel ภาพจบ, detail crop, Reel reveal และ save-friendly caption",
    forecast_1_year: "IG ควรใช้คู่กับ TikTok ไม่ใช่โพสต์ซ้ำแบบไม่ปรับ format",
    forecast_2_3_years: "Detail carousel และ before/after จะช่วยโชว์ premium retouch",
    forecast_3_5_years: "พอร์ตที่มี style signature จะสำคัญต่อ booking",
    risks: "เป็น ad reach ไม่ใช่ engagement จริงของบัญชี",
    opportunities: "ทำ carousel: hero image, crop detail, before/after, retouch note, CTA",
    updated_at: "2026-05-14"
  }
];

const mockMarketIndicatorNames = [
  "การใช้โซเชียลในไทย",
  "Reach ของ TikTok / Instagram / Facebook",
  "จำนวนอีเวนต์คอสเพลย์",
  "ความสนใจค้นหาบน Google Trends",
  "จำนวน inquiry จองคิว",
  "การเติบโตของคู่แข่ง",
  "ผลงานคลิปสั้น",
  "การใช้เครื่องมือ AI retouch / CG"
] as const;

const mockMarketIndicators: MarketIndicator[] = mockMarketIndicatorNames.map((name, index) => ({
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

export const marketIndicators: MarketIndicator[] = [...realMarketIndicators, ...mockMarketIndicators];

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
