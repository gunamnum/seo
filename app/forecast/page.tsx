import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { marketIndicators } from "@/lib/seed";
import { labelConfidence } from "@/lib/thaiLabels";

const segments = [
  ["มือใหม่สายคอส", "13-17", "อยากได้ภาพเริ่มต้นง่าย กดดันน้อย", "Pose guide, ทิปอีเวนต์, เซ็ตถ่ายมือใหม่"],
  ["คอสเพลเยอร์หลัก", "18-24", "ภาพพร้อมลงโซเชียลและตัวตนของตัวละคร", "ก่อน/หลัง, reveal, Bright CG"],
  ["คอสเพลเยอร์รับงาน", "25-34", "คุณภาพ ความเร็ว แพ็กเกจพรีเมียม", "แพ็กเกจจองคิว, private shoot, premium retouch"],
  ["Creator / Influencer", "18-34", "Reach, identity, content package", "แพ็กเกจ Reels/TikTok, โพสต์ collab"],
  ["สายสะสม / งานอดิเรก", "35+", "โปรเจกต์รักคุณภาพสูง", "อัลบั้ม cinematic, print, final set พรีเมียม"]
];

const outlook = [
  ["1 ปี", "Short-form และคอนเทนต์อีเวนต์ยังแข็งแรง", "วิดีโอสั้นกับงานคอสเพลย์ช่วยดันการมองเห็น", "ทำ Event radar + แพ็กคอนเทนต์รายสัปดาห์"],
  ["2-3 ปี", "การแข่งขันสูงขึ้น", "AI และเครื่องมือรีทัชทำให้เริ่มง่ายขึ้น", "สร้างลายเซ็น Bright CG ให้จำได้"],
  ["3-5 ปี", "ตลาดพรีเมียมยังอยู่ได้ถ้า workflow และ community แข็งแรง", "ลูกค้าให้ค่ากับคุณภาพ ความเชื่อใจ และความเร็ว", "ขายแพ็กถ่าย + รีทัช + วิดีโอสั้น"]
];

export default function ForecastPage() {
  return (
    <>
      <PageHeader
        title="คาดการณ์ตลาด 1-5 ปี"
        description="หน้านี้เป็นคาดการณ์จากข้อมูล mock/offline ยังไม่อ้างว่าเป็นตัวเลข real-time จนกว่าจะนำเข้าข้อมูลจริง"
      />
      <div className="grid gap-4">
        <Panel title="ภาพรวมคาดการณ์">
          <SimpleTable columns={["ช่วงเวลา", "แนวโน้มที่คาด", "เหตุผล", "กลยุทธ์"]} rows={outlook.map(([a, b, c, d]) => ({ ช่วงเวลา: a, แนวโน้มที่คาด: b, เหตุผล: c, กลยุทธ์: d }))} />
        </Panel>
        <Panel title="กลุ่มลูกค้า">
          <SimpleTable columns={["กลุ่ม", "อายุ", "ความต้องการ", "คอนเทนต์ที่เหมาะ"]} rows={segments.map(([a, b, c, d]) => ({ กลุ่ม: a, อายุ: b, ความต้องการ: c, คอนเทนต์ที่เหมาะ: d }))} />
        </Panel>
        <Panel title="ตัวชี้วัด">
          <SimpleTable
            columns={["ตัวชี้วัด", "ค่า", "ความมั่นใจ", "ตีความ", "โอกาส"]}
            rows={marketIndicators.map((indicator) => ({
              ตัวชี้วัด: indicator.indicator_name,
              ค่า: indicator.value,
              ความมั่นใจ: <Badge tone={indicator.confidence_level === "high" ? "green" : "amber"}>{labelConfidence(indicator.confidence_level)}</Badge>,
              ตีความ: indicator.interpretation,
              โอกาส: indicator.opportunities
            }))}
          />
        </Panel>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["ความเสี่ยง", "โพสต์เฉพาะภาพนิ่งอาจ reach ลดลง"],
            ["ความเสี่ยง", "การแข่งขันจาก AI/รีทัชเพิ่มขึ้น"],
            ["โอกาส", "Creator ต้องการแพ็กคอนเทนต์ครบชุด"],
            ["โอกาส", "Pattern จากจีนปรับให้เข้ากับไทยได้"],
            ["โอกาส", "workflow จากอีเวนต์สู่คอนเทนต์ที่เร็ว ชนะคู่แข่งที่ช้ากว่า"]
          ].map(([type, text]) => (
            <Panel key={text} title={type}>
              <p className="text-sm leading-6 text-ink">{text}</p>
            </Panel>
          ))}
        </div>
      </div>
    </>
  );
}
