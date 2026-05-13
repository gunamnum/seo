export const requiredThaiSeoKeywords = [
  "ถ่ายคอสเพลย์",
  "ช่างภาพคอสเพลย์",
  "รีทัชภาพคอส",
  "cosplay thailand",
  "cosplay photography",
  "cosplay retouch"
] as const;

export type SeoPlatform = "tiktok" | "instagram" | "facebook";
export type SeoGoal = "views" | "likes" | "comments" | "shares" | "saves" | "booking";
export type SeoLanguage = "thai" | "english" | "mixed";

export type SeoContentInput = {
  platform: SeoPlatform;
  contentType: string;
  fandom: string;
  eventName: string;
  visualStyle: string;
  retouchStyle: string;
  goal: SeoGoal;
  language: SeoLanguage;
};

export type SeoContentPackage = {
  captionTh: string;
  captionEn: string;
  onScreenText: string;
  altText: string;
  hashtags: string[];
  cta: string;
  firstComment: string;
  searchKeywords: string[];
};

const focusedHashtags = [
  "#ถ่ายคอสเพลย์",
  "#ช่างภาพคอสเพลย์",
  "#รีทัชภาพคอส",
  "#cosplaythailand",
  "#cosplayphotography",
  "#cosplayretouch"
];

function ctaForGoal(goal: SeoGoal): string {
  if (goal === "booking") return "อยากได้ภาพคอสเพลย์สไตล์นี้ ทักมาจองคิวได้เลย";
  if (goal === "comments") return "คอมเมนต์คำว่า glow ถ้าอยากดู breakdown";
  if (goal === "shares") return "แชร์ให้เพื่อนที่กำลังเตรียมชุดคอสลุคนี้";
  if (goal === "saves") return "เซฟไว้เป็น reference สำหรับถ่ายคอสครั้งหน้า";
  return "ดูจนจบเพื่อเห็น RAW to final glow";
}

export function generateSeoContentPackage(input: SeoContentInput): SeoContentPackage {
  const shortPlatform = input.platform === "tiktok" || input.platform === "instagram";
  const cta = ctaForGoal(input.goal);
  const keywordLine = requiredThaiSeoKeywords.slice(0, 3).join(" / ");
  const captionTh = shortPlatform
    ? `${input.fandom} ${input.contentType} ในสไตล์ ${input.visualStyle}. ${keywordLine}`
    : `อัลบั้ม ${input.eventName}: งานถ่าย ${input.fandom} พร้อม ${input.retouchStyle}. เหมาะกับคนที่อยากได้ภาพคอสสดใส ลงโซเชียลได้ทันที. ${cta}`;

  return {
    captionTh,
    captionEn:
      input.language === "thai"
        ? ""
        : `${input.fandom} cosplay photography with ${input.visualStyle}, ${input.retouchStyle}.`,
    onScreenText: `RAW เป็นภาพจบ ${input.fandom} glow`,
    altText: `ภาพคอสเพลย์ ${input.fandom} สไตล์ ${input.visualStyle} พร้อมรีทัช ${input.retouchStyle}`,
    hashtags: focusedHashtags,
    cta,
    firstComment: `${requiredThaiSeoKeywords.join(" · ")} · ${input.eventName}`,
    searchKeywords: [...requiredThaiSeoKeywords]
  };
}
