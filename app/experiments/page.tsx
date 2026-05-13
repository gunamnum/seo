import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { experiments } from "@/lib/seed";
import { formatPercent } from "@/lib/metrics";
import { labelPlatform } from "@/lib/thaiLabels";

export default function ExperimentsPage() {
  return (
    <>
      <PageHeader
        title="ติดตามการทดลองคอนเทนต์"
        description="ตัวติดตาม A/B แบบ mock สำหรับ hook, รูปแบบ และการลงมือถัดไปของคอนเทนต์"
      />
      <Panel title="รายการทดลอง">
        <SimpleTable
          columns={["การทดลอง", "แพลตฟอร์ม", "สมมติฐาน", "A", "B", "ตัวชนะ", "บทเรียน", "ถัดไป"]}
          rows={experiments.map((experiment) => ({
            การทดลอง: experiment.experiment_name,
            แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(experiment.platform)}</Badge>,
            สมมติฐาน: experiment.hypothesis,
            A: `${experiment.views_a.toLocaleString()} / ${formatPercent(experiment.engagement_rate_a)}`,
            B: `${experiment.views_b.toLocaleString()} / ${formatPercent(experiment.engagement_rate_b)}`,
            ตัวชนะ: <Badge tone="green">{experiment.winner}</Badge>,
            บทเรียน: experiment.lesson,
            ถัดไป: experiment.next_action
          }))}
        />
      </Panel>
    </>
  );
}
