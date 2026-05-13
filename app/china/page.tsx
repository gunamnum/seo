import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { benchmarkCreators, chinaPlatformNotes } from "@/lib/seed";

const radarStyles = [
  "แฟนตาซีสะอาดมี glow",
  "โทนผิวสว่าง",
  "แสงอนิเมะพาสเทล",
  "portrait คอสเพลย์ cinematic",
  "polish แบบไอดอล",
  "รีทัช clean หรู",
  "particle นุ่มและเส้นแสง",
  "อธิบายก่อน/หลังรีทัช"
];

export default function ChinaPage() {
  const chinaRows = benchmarkCreators.filter((creator) => creator.platform_group === "china_mainland_platform");
  return (
    <>
      <PageHeader
        title="ตัวอย่างอ้างอิงแพลตฟอร์มจีน"
        description="พื้นที่แยกสำหรับ Douyin, Xiaohongshu / RED, Bilibili และ Weibo โดยไม่เอาตัวเลขดิบไปปนกับ TikTok / Instagram / Facebook"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {chinaPlatformNotes.map((note) => (
          <Panel key={note.platform} title={note.platform}>
            <p className="text-sm leading-6 text-ink">{note.focus}</p>
            <p className="mt-3 rounded-[24px] bg-surface-soft p-4 text-sm leading-6 text-ink">{note.adaptation}</p>
          </Panel>
        ))}
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Panel title="เรดาร์สไตล์ภาพจากจีน">
          <div className="flex flex-wrap gap-2">
            {radarStyles.map((style) => (
              <Badge key={style} tone="purple">
                {style}
              </Badge>
            ))}
          </div>
        </Panel>
        <Panel title="ตัวช่วยปรับรูปแบบจีนเป็นไทย">
          <SimpleTable
            columns={["รูปแบบ", "ต้องปรับอะไรสำหรับไทย", "ความเสี่ยง"]}
            rows={chinaRows.map((creator) => ({
              รูปแบบ: `${creator.platform} ${creator.content_type}`,
              "ต้องปรับอะไรสำหรับไทย": creator.idea_to_adapt_for_thailand,
              ความเสี่ยง: "ห้ามเทียบตัวเลขดิบโดยตรง ต้องปรับวัฒนธรรม ภาษา และ CTA ให้เข้ากับไทย"
            }))}
          />
        </Panel>
      </div>
    </>
  );
}
