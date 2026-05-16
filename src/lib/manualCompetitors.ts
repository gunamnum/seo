import type { Competitor } from "./types";

const manualCompetitorSource = "User-provided Thai competitor list - 2026-05-17";

const manualCompetitorInputs = [
  {
    id: "competitor-manual-plugkhue",
    display_name: "ปลั๊กคึ",
    public_url: "https://www.facebook.com/profile.php?id=100094245080985"
  },
  {
    id: "competitor-manual-i-ja-thai",
    display_name: "ไอจะถ่าย",
    public_url: "https://www.facebook.com/idanoncamera"
  },
  {
    id: "competitor-manual-twixxpix",
    display_name: "Twixxpix",
    public_url: "https://www.facebook.com/twixxpic"
  },
  {
    id: "competitor-manual-studio-aicream",
    display_name: "Studio Aicream",
    public_url: "https://www.facebook.com/profile.php?id=100064888831930"
  },
  {
    id: "competitor-manual-butterfile-artist",
    display_name: "ButterFile Artist",
    public_url: "https://www.facebook.com/ButterfileArtist"
  }
] as const;

export const manualCompetitors: Competitor[] = manualCompetitorInputs.map((competitor) => ({
  source_label: manualCompetitorSource,
  source_url: competitor.public_url,
  source_type: "user_provided",
  verification_status: "needs_verification",
  is_mock_data: false,
  is_estimated: true,
  is_user_provided: true,
  source_quality_tier: "B",
  confidence_reason:
    "ชื่อและลิงก์มาจากผู้ใช้โดยตรง; ยังไม่ตรวจ public content strategy/metrics จาก Facebook แบบไม่ล็อกอิน จึงใช้เป็น manual competitor record เท่านั้น",
  id: competitor.id,
  display_name: competitor.display_name,
  country_or_region: "thailand",
  public_url: competitor.public_url,
  main_platform: "facebook",
  secondary_platforms: ["facebook"],
  competitor_group: "hybrid",
  visual_style: "ยังไม่พบข้อมูลยืนยันจาก public non-login check",
  content_formats: ["Facebook page", "portfolio review pending", "booking CTA review pending"],
  estimated_avg_views: 0,
  estimated_engagement_rate: 0,
  strengths: "มีชื่อและ Facebook URL ที่ผู้ใช้ระบุเอง สามารถใช้เป็นชุดเริ่มต้นสำหรับ manual competitor review",
  weaknesses: "ยังไม่มีข้อมูลยืนยันเรื่องความถี่โพสต์ สไตล์ภาพ CTA ราคา reach หรือ engagement",
  opportunities:
    "ทำ gap review แบบ public strategy เท่านั้น: album speed, before/after proof, booking CTA, SEO keyword และ event recap timing",
  threat_level: "medium",
  notes:
    "User-provided competitor. ห้าม scrape login-protected Facebook, ห้ามเดา personal/sensitive attributes, และห้ามใช้ตัวเลขจนกว่าจะมี manual/public evidence เพิ่ม",
  updated_at: "2026-05-17"
}));
