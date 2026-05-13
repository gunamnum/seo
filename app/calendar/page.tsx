import { ExportButton } from "@/components/export-button";
import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { contentIdeas, events } from "@/lib/seed";
import { labelIdeaStatus } from "@/lib/thaiLabels";

const rows = events.flatMap((event) => [
  {
    event: event.event_name,
    timing: "ก่อนงาน 14 วัน",
    date: event.start_date,
    content: "เปิดคิวจอง, ตัวอย่างงาน, เตือนแพ็กเกจ/ราคา"
  },
  {
    event: event.event_name,
    timing: "ก่อนงาน 7 วัน",
    date: event.start_date,
    content: "เทรนด์ตัวละคร, pose guide, จุดถ่าย, เตรียมตัวไปงาน"
  },
  {
    event: event.event_name,
    timing: "วันงาน",
    date: event.start_date,
    content: "BTS สั้น, คลิปสั้น, story, แท็ก creator/cosplayer หลังยืนยันเอง"
  }
]);

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="ปฏิทินโพสต์"
        description="ลำดับเวลาเชื่อมอีเวนต์ mock กับไอเดียคอนเทนต์ ส่งออก CSV เพื่อวางแผนรายสัปดาห์"
      >
        <ExportButton rows={rows} filename="posting-calendar.csv" />
      </PageHeader>
      <Panel title="ลำดับเวลาการโพสต์">
        <SimpleTable
          columns={["อีเวนต์", "จังหวะเวลา", "วันที่", "คอนเทนต์", "สถานะไอเดีย"]}
          rows={rows.map((row, index) => ({
            อีเวนต์: row.event,
            จังหวะเวลา: <Badge tone="purple">{row.timing}</Badge>,
            วันที่: row.date,
            คอนเทนต์: row.content,
            สถานะไอเดีย: <Badge tone="blue">{labelIdeaStatus(contentIdeas[index % contentIdeas.length].status)}</Badge>
          }))}
        />
      </Panel>
    </>
  );
}
