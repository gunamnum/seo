import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { events } from "@/lib/seed";
import { labelVerification } from "@/lib/thaiLabels";

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="เรดาร์อีเวนต์คอสเพลย์"
        description="ติดตามอีเวนต์แบบ mock วันที่และรายละเอียดจริงต้องตรวจเองก่อนใช้ตัดสินใจโพสต์หรือเปิดจอง"
      />
      <Panel title="รายการอีเวนต์">
        <SimpleTable
          columns={["อีเวนต์", "วันที่", "สถานที่", "เมือง", "โอกาสคอนเทนต์", "สถานะ"]}
          rows={events.map((event) => ({
            อีเวนต์: event.event_name,
            วันที่: `${event.start_date} ถึง ${event.end_date}`,
            สถานที่: event.venue,
            เมือง: event.city,
            โอกาสคอนเทนต์: event.expected_content_opportunity,
            สถานะ: <Badge tone={event.verification_status === "needs_update" ? "amber" : "slate"}>{labelVerification(event.verification_status)}</Badge>
          }))}
        />
      </Panel>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["ก่อนงาน 14 วัน", "เปิดคิวจอง, ตัวอย่างงาน, เตือนแพ็กเกจ/ราคา"],
          ["ก่อนงาน 7 วัน", "เทรนด์ตัวละคร, pose guide, จุดถ่าย, เตรียมตัวไปงาน"],
          ["ก่อนงาน 1 วัน", "Checklist อุปกรณ์, เตรียม BTS, countdown ใน story"],
          ["วันงาน", "BTS สั้น, คลิปสั้น, story, แท็ก creator/cosplayer หลังยืนยันเอง"],
          ["หลังงาน 1-3 วัน", "อัลบั้ม preview, ก่อน/หลังรีทัช, แท็ก cosplayer"],
          ["หลังงาน 4-10 วัน", "ภาพรีทัช final, breakdown CG, tutorial, recap"]
        ].map(([timing, content]) => (
          <Panel key={timing} title={timing}>
            <p className="text-sm leading-6 text-ink">{content}</p>
          </Panel>
        ))}
      </div>
    </>
  );
}
