import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { benchmarkCreators } from "@/lib/seed";
import { labelPlatform, labelRegion } from "@/lib/thaiLabels";

export default function BenchmarksPage() {
  const global = benchmarkCreators.filter((creator) => creator.platform_group === "global_platform");
  const china = benchmarkCreators.filter((creator) => creator.platform_group === "china_mainland_platform");
  return (
    <>
      <PageHeader
        title="ตัวอย่างอ้างอิงช่างภาพ/Creator เอเชีย"
        description="วิเคราะห์รูปแบบจากเอเชีย โดยแยกตัวเลขจีนแผ่นดินใหญ่ออกจากแพลตฟอร์มทั่วไป"
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="แพลตฟอร์มทั่วไป / ภูมิภาค">
          <BenchmarkTable rows={global} />
        </Panel>
        <Panel title="แพลตฟอร์มจีนแผ่นดินใหญ่">
          <BenchmarkTable rows={china} />
        </Panel>
        <Panel title="กลยุทธ์ช่องทาง">
          <p className="text-sm leading-6 text-ink">
            ใช้แพลตฟอร์มทั่วไปเพื่อ reach ที่ค้นหาเจอและ CTA จองคิว ใช้ pattern จากจีนเป็นแรงบันดาลใจเท่านั้น:
            จังหวะ reveal, การเล่าแบบ moodboard, tutorial ละเอียด และ cadence อัปเดตแฟนด้อม
          </p>
        </Panel>
        <Panel title="ปรับรูปแบบจีนมาใช้กับไทย">
          <ul className="space-y-3 text-sm text-ink">
            {china.map((creator) => (
              <li key={creator.id} className="rounded-[24px] bg-surface-soft p-4">
                <strong>{creator.platform}</strong>: {creator.china_adaptation_notes} {creator.idea_to_adapt_for_thailand}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function BenchmarkTable({ rows }: { rows: typeof benchmarkCreators }) {
  return (
    <SimpleTable
      columns={["ผู้สร้าง", "ภูมิภาค", "แพลตฟอร์ม", "สไตล์", "Hook", "ปรับใช้"]}
      rows={rows.map((creator) => ({
        ผู้สร้าง: creator.creator_display_name,
        ภูมิภาค: <Badge tone={creator.country_or_region === "mainland_china" ? "purple" : "slate"}>{labelRegion(creator.country_or_region)}</Badge>,
        แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(creator.platform)}</Badge>,
        สไตล์: creator.visual_style,
        Hook: creator.hook_pattern,
        ปรับใช้: creator.idea_to_adapt_for_thailand
      }))}
    />
  );
}
