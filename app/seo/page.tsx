import { SeoPlanner } from "@/components/seo-planner";
import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { generateSeoContentPackage, requiredThaiSeoKeywords, type SeoPlatform } from "@/lib/seoStrategy";
import { contentIdeas, events, seoKeywords } from "@/lib/seed";
import { labelPlatform, labelSearchIntent } from "@/lib/thaiLabels";

export default function SeoPage() {
  const idea = contentIdeas[0];
  const event = events[0];
  const platformPackages = (["tiktok", "instagram", "facebook"] as SeoPlatform[]).map((platform) => ({
    platform,
    package: generateSeoContentPackage({
      platform,
      contentType: idea.content_type,
      fandom: idea.title,
      eventName: event.event_name,
      visualStyle: "bright pastel CG",
      retouchStyle: idea.retouch_notes,
      goal: "booking",
      language: "mixed"
    })
  }));

  return (
    <>
      <PageHeader
        title="SEO และกลยุทธ์คอนเทนต์"
        description="เปลี่ยนงานค้นคว้าเป็น caption, hook, hashtag, CTA, first comment, alt text, on-screen text และชุดคอนเทนต์ที่ค้นหาเจอ"
      />
      <SeoPlanner />
      <div className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="ชุดคอนเทนต์รายแพลตฟอร์ม">
          <SimpleTable
            columns={["แพลตฟอร์ม", "Caption ไทย", "ข้อความบนจอ", "CTA", "Hashtag"]}
            rows={platformPackages.map((item) => ({
              แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(item.platform)}</Badge>,
              "Caption ไทย": item.package.captionTh,
              ข้อความบนจอ: item.package.onScreenText,
              CTA: item.package.cta,
              Hashtag: item.package.hashtags.join(" ")
            }))}
          />
        </Panel>
        <Panel title="คีย์เวิร์ดที่ต้องครอบคลุม">
          <div className="flex flex-wrap gap-2">
            {requiredThaiSeoKeywords.map((keyword) => (
              <Badge key={keyword} tone="green">
                {keyword}
              </Badge>
            ))}
          </div>
          <p className="mt-4 rounded-[24px] bg-surface-soft p-4 text-sm leading-6 text-ink">
            Hashtag ต้องน้อยแต่ตรง: สูงสุด 6 tag ไม่ใส่เป็น spam block. Caption ของ TikTok/Reels ต้องสั้น ส่วน Facebook ใช้เล่าบริบทอีเวนต์และ CTA จองคิว
          </p>
        </Panel>
        <Panel title="คลังคีย์เวิร์ด">
          <SimpleTable
            columns={["คีย์เวิร์ด", "แพลตฟอร์ม", "เจตนาค้นหา", "ลำดับสำคัญ", "วิธีใช้"]}
            rows={seoKeywords.slice(0, 12).map((keyword) => ({
              คีย์เวิร์ด: keyword.keyword,
              แพลตฟอร์ม: labelPlatform(keyword.platform),
              เจตนาค้นหา: labelSearchIntent(keyword.search_intent),
              ลำดับสำคัญ: keyword.priority,
              วิธีใช้: keyword.recommended_caption_usage
            }))}
          />
        </Panel>
      </div>
    </>
  );
}
