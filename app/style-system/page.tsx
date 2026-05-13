import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";

const styleTags = [
  "สว่าง",
  "สดใส",
  "สีชัดแต่ไม่แข็ง",
  "ผิวสะอาดยังมี texture",
  "แสง pastel anime",
  "rim light นุ่ม",
  "glow พอดี",
  "CG รายละเอียดเล็ก",
  "particle / sparkles",
  "เกรดสีเข้ากับตัวละคร"
];

const templates = [
  "RAW ถึงภาพจบใน 8 วินาที",
  "Timelapse ก่อน/หลังรีทัช",
  "วิธีเติม CG glow เล็กๆ",
  "Breakdown การตั้งไฟ",
  "BTS จากงานถึงภาพ final",
  "Transition เปิดตัวละคร",
  "Pose guide สำหรับคอสเพลเยอร์มือใหม่",
  "Breakdown การเกรดสี",
  "Carousel crop รายละเอียด",
  "Hero shot final พร้อม note รีทัช"
];

export default function StyleSystemPage() {
  return (
    <>
      <PageHeader
        title="ระบบสไตล์ Bright CG / Retouch"
        description="ลายเซ็นภาพและ template คอนเทนต์ที่ทำซ้ำได้ สำหรับงานคอสเพลย์ที่สว่าง สด และสีสวย"
      />
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
        <Panel title="แท็กสไตล์">
          <div className="flex flex-wrap gap-2">
            {styleTags.map((tag) => (
              <Badge key={tag} tone="pink">
                {tag}
              </Badge>
            ))}
          </div>
        </Panel>
        <Panel title="รายการตรวจการถ่าย">
          <SimpleTable
            columns={["ขั้นตอน", "รายการตรวจ"]}
            rows={[
              { ขั้นตอน: "ก่อนถ่าย", รายการตรวจ: "วางสีตัวละคร, reference pose, ข้อจำกัดแสงในงาน" },
              { ขั้นตอน: "ตอนถ่าย", รายการตรวจ: "เก็บ RAW ให้ปลอดภัย, highlight สะอาด, rim light, คลิป BTS แนวตั้ง" },
              { ขั้นตอน: "รีทัช", รายการตรวจ: "รักษา texture ผิว, เกรด pastel, mask glow, crop สำหรับหลายแพลตฟอร์ม" },
              { ขั้นตอน: "CG", รายการตรวจ: "particle เล็ก, streak แสง, ไม่รกทับหน้า/ชุด" },
              { ขั้นตอน: "เผยแพร่", รายการตรวจ: "Hook ก่อน, SEO ไทย, hashtag น้อยแต่ตรง, CTA จองคิว" }
            ]}
          />
        </Panel>
        <Panel title="แบบคอนเทนต์">
          <div className="grid gap-2 md:grid-cols-2">
            {templates.map((template) => (
              <div key={template} className="rounded-[24px] bg-surface-soft p-4 text-sm font-semibold text-ink">
                {template}
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="หมายเหตุโทนแต่งภาพ">
          <p className="text-sm leading-6 text-ink">
            รักษาหน้าให้สว่างแต่ไม่ดูพลาสติก ดันสีชุดอย่างนุ่ม ใช้ rim light โทน pastel
            เก็บ crop รายละเอียด และใช้ CG เป็น accent เล็กๆ ไม่ใช่ composite แฟนตาซีเต็มภาพทุกครั้ง
          </p>
        </Panel>
      </div>
    </>
  );
}
