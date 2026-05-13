import type {
  CgLevel,
  Confidence,
  Platform,
  PlatformGroup,
  Region,
  SourceType,
  VerificationStatus,
  ViralClip
} from "./types";

const platformLabels: Partial<Record<Platform, string>> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  facebook: "Facebook",
  douyin: "Douyin",
  xiaohongshu: "Xiaohongshu / RED",
  bilibili: "Bilibili",
  weibo: "Weibo",
  google_trends: "Google Trends",
  manual: "ข้อมูลกรอกเอง",
  x_twitter: "X / Twitter",
  behance: "Behance",
  artstation: "ArtStation",
  fivehundredpx: "500px",
  website: "เว็บไซต์"
};

const regionLabels: Partial<Record<Region, string>> = {
  thailand: "ไทย",
  japan: "ญี่ปุ่น",
  korea: "เกาหลี",
  taiwan: "ไต้หวัน",
  hong_kong: "ฮ่องกง",
  singapore: "สิงคโปร์",
  malaysia: "มาเลเซีย",
  indonesia: "อินโดนีเซีย",
  philippines: "ฟิลิปปินส์",
  vietnam: "เวียดนาม",
  mainland_china: "จีนแผ่นดินใหญ่",
  global: "ทั่วโลก",
  other: "อื่นๆ"
};

const confidenceLabels: Record<Confidence, string> = {
  low: "ต่ำ",
  medium: "กลาง",
  high: "สูง"
};

const verificationLabels: Record<VerificationStatus, string> = {
  unverified: "ยังไม่ยืนยัน",
  verified: "ยืนยันแล้ว",
  needs_update: "ต้องอัปเดต",
  needs_verification: "ต้องตรวจสอบ"
};

const sourceTypeLabels: Record<SourceType, string> = {
  official_source: "แหล่งทางการ",
  user_analytics_export: "Export analytics ของผู้ใช้",
  manual_csv: "CSV กรอกเอง",
  public_observation: "สังเกตจากข้อมูลสาธารณะ",
  secondary_summary: "สรุปรอง",
  mock_seed: "ข้อมูล mock",
  user_provided: "ผู้ใช้ให้ข้อมูล",
  unknown: "ไม่ทราบแหล่งที่มา"
};

const contentTypeLabels: Record<ViralClip["content_type"], string> = {
  bts: "เบื้องหลัง",
  before_after: "ก่อน/หลังรีทัช",
  event_recap: "สรุปงานอีเวนต์",
  tutorial: "สอน/อธิบายขั้นตอน",
  character_reveal: "เปิดตัวตัวละคร",
  lighting_setup: "ตั้งไฟ",
  retouch_timelapse: "ไทม์แลปส์รีทัช",
  portfolio_showcase: "โชว์ผลงาน",
  other: "อื่นๆ"
};

const cgLevelLabels: Record<CgLevel, string> = {
  none: "ไม่มี CG",
  light: "CG เบา",
  medium: "CG กลาง",
  heavy: "CG หนัก"
};

const platformGroupLabels: Record<PlatformGroup, string> = {
  global_platform: "แพลตฟอร์มทั่วไป",
  china_mainland_platform: "แพลตฟอร์มจีนแผ่นดินใหญ่"
};

const effortLabels = {
  low: "น้อย",
  medium: "กลาง",
  high: "มาก"
} as const;

const impactLabels = {
  low: "ต่ำ",
  medium: "กลาง",
  high: "สูง"
} as const;

const statusLabels = {
  idea: "ไอเดีย",
  planned: "วางแผนแล้ว",
  shooting: "กำลังถ่าย",
  editing: "กำลังตัดต่อ",
  posted: "โพสต์แล้ว",
  measured: "วัดผลแล้ว"
} as const;

const qaStatusLabels = {
  pass: "ผ่าน",
  warn: "ต้องดูเพิ่ม",
  fail: "ไม่ผ่าน",
  passed: "ผ่าน",
  not_run: "ยังไม่รัน",
  failed: "ไม่ผ่าน"
} as const;

const priceTypeLabels = {
  free: "ฟรี",
  freemium: "ฟรีบางส่วน",
  paid: "เสียเงิน",
  open_source: "Open source",
  bundled: "มากับโปรแกรม"
} as const;

const recommendationLabels = {
  recommended: "แนะนำ",
  optional: "ใช้ได้ถ้าจำเป็น",
  avoid_until_verified: "เลี่ยงจนกว่าจะตรวจสอบ"
} as const;

const searchIntentLabels = {
  booking: "จองคิว",
  tutorial: "เรียนรู้",
  inspiration: "หาแรงบันดาลใจ",
  event: "อีเวนต์",
  portfolio: "ดูผลงาน",
  retouch: "รีทัช",
  cosplay_character: "ตัวละครคอสเพลย์",
  fandom: "แฟนด้อม"
} as const;

const importTypeLabels: Record<string, string> = {
  trend_items: "เทรนด์",
  viral_clips: "คลิปไวรัล",
  competitors: "คู่แข่ง",
  benchmark_creators: "Benchmark creator",
  events: "อีเวนต์",
  tools_plugins: "เครื่องมือ/ปลั๊กอิน",
  seo_keywords: "คีย์เวิร์ด SEO",
  market_indicators: "ตัวชี้วัดตลาด",
  experiments: "การทดลองคอนเทนต์"
};

const seoGoalLabels: Record<string, string> = {
  views: "เพิ่มยอดดู",
  likes: "เพิ่มไลก์",
  comments: "เพิ่มคอมเมนต์",
  shares: "เพิ่มแชร์",
  saves: "เพิ่มบันทึก",
  booking: "เพิ่มการจองคิว"
};

const languageLabels: Record<string, string> = {
  thai: "ไทย",
  english: "อังกฤษ",
  chinese: "จีน",
  japanese: "ญี่ปุ่น",
  korean: "เกาหลี",
  mixed: "ไทย + อังกฤษ"
};

const competitorGroupLabels: Record<string, string> = {
  event_album_shooter: "ช่างภาพอัลบั้มอีเวนต์",
  premium_cinematic: "สาย Cinematic พรีเมียม",
  retouch_fantasy_cg: "สายรีทัช Fantasy/CG",
  short_form_first_creator: "สาย Short-form ก่อน",
  hybrid: "Hybrid"
};

const toolCategoryLabels: Record<string, string> = {
  photo_editing: "แต่งภาพ",
  raw_processing: "จัดการไฟล์ RAW",
  retouch: "รีทัช",
  video_editing: "ตัดต่อวิดีโอ",
  ai_assist: "AI ช่วยงาน",
  portfolio: "พอร์ตโฟลิโอ",
  analytics: "วิเคราะห์ข้อมูล"
};

const trendTypeLabels: Record<string, string> = {
  hashtag: "Hashtag",
  sound: "เสียง/เพลง",
  clip_format: "ฟอร์แมตคลิป",
  character: "ตัวละคร",
  fandom: "แฟนด้อม",
  event: "อีเวนต์",
  keyword: "คีย์เวิร์ด",
  visual_style: "สไตล์ภาพ"
};

export function labelPlatform(value: Platform | string) {
  return platformLabels[value as Platform] ?? value;
}

export function labelRegion(value: Region | string) {
  return regionLabels[value as Region] ?? value;
}

export function labelConfidence(value: Confidence | string) {
  return confidenceLabels[value as Confidence] ?? value;
}

export function labelVerification(value: VerificationStatus | string) {
  return verificationLabels[value as VerificationStatus] ?? value;
}

export function labelSourceType(value: SourceType | string) {
  return sourceTypeLabels[value as SourceType] ?? value;
}

export function labelContentType(value: ViralClip["content_type"] | string) {
  return contentTypeLabels[value as ViralClip["content_type"]] ?? value;
}

export function labelCgLevel(value: CgLevel | string) {
  return cgLevelLabels[value as CgLevel] ?? value;
}

export function labelPlatformGroup(value: PlatformGroup | string) {
  return platformGroupLabels[value as PlatformGroup] ?? value;
}

export function labelEffort(value: keyof typeof effortLabels | string) {
  return effortLabels[value as keyof typeof effortLabels] ?? value;
}

export function labelImpact(value: keyof typeof impactLabels | string) {
  return impactLabels[value as keyof typeof impactLabels] ?? value;
}

export function labelIdeaStatus(value: keyof typeof statusLabels | string) {
  return statusLabels[value as keyof typeof statusLabels] ?? value;
}

export function labelQaStatus(value: keyof typeof qaStatusLabels | string) {
  return qaStatusLabels[value as keyof typeof qaStatusLabels] ?? value;
}

export function labelPriceType(value: keyof typeof priceTypeLabels | string) {
  return priceTypeLabels[value as keyof typeof priceTypeLabels] ?? value;
}

export function labelRecommendation(value: keyof typeof recommendationLabels | string) {
  return recommendationLabels[value as keyof typeof recommendationLabels] ?? value;
}

export function labelSearchIntent(value: keyof typeof searchIntentLabels | string) {
  return searchIntentLabels[value as keyof typeof searchIntentLabels] ?? value;
}

export function labelImportType(value: string) {
  return importTypeLabels[value] ?? value;
}

export function labelSeoGoal(value: string) {
  return seoGoalLabels[value] ?? value;
}

export function labelLanguage(value: string) {
  return languageLabels[value] ?? value;
}

export function labelCompetitorGroup(value: string) {
  return competitorGroupLabels[value] ?? value;
}

export function labelToolCategory(value: string) {
  return toolCategoryLabels[value] ?? value;
}

export function labelTrendType(value: string) {
  return trendTypeLabels[value] ?? value;
}

export function labelDataTag(value: string) {
  const labels: Record<string, string> = {
    mock: "ข้อมูล mock",
    imported: "นำเข้าแล้ว",
    manual: "กรอกเอง",
    estimated: "ข้อมูลประเมิน",
    verified: "ยืนยันแล้ว",
    needs_update: "ต้องอัปเดต",
    "needs verification": "ต้องตรวจสอบ"
  };
  return labels[value] ?? value;
}
