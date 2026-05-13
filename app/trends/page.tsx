import { TrendScoreChart } from "@/components/lazy-charts";
import { Badge, PageHeader, Panel, ScoreBadge, SimpleTable } from "@/components/ui";
import { trendItems } from "@/lib/seed";
import { labelPlatform, labelRegion, labelTrendType } from "@/lib/thaiLabels";

export default function TrendsPage() {
  return (
    <>
      <PageHeader
        title="เรดาร์เทรนด์ 7 วัน"
        description="โอกาสเทรนด์จากข้อมูล mock พร้อมคะแนนถ่วงน้ำหนัก ความมั่นใจ แหล่งข้อมูล และป้ายข้อมูลประเมินที่เห็นชัด"
      />
      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="คะแนนเทรนด์">
          <TrendScoreChart data={trendItems.map((trend) => ({ name: trend.id, score: trend.trend_score }))} />
        </Panel>
        <Panel title="ตารางโอกาสเทรนด์">
          <SimpleTable
            columns={["เทรนด์", "แพลตฟอร์ม", "ภูมิภาค", "ประเภท", "คะแนน", "ข้อมูล"]}
            rows={trendItems.map((trend) => ({
              เทรนด์: trend.trend_name,
              แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(trend.platform)}</Badge>,
              ภูมิภาค: <Badge tone={trend.region === "mainland_china" ? "purple" : "slate"}>{labelRegion(trend.region)}</Badge>,
              ประเภท: labelTrendType(trend.trend_type),
              คะแนน: <ScoreBadge score={trend.trend_score} />,
              ข้อมูล: trend.is_mock_data ? <Badge tone="amber">ข้อมูล mock</Badge> : <Badge tone="green">นำเข้าแล้ว</Badge>
            }))}
          />
        </Panel>
      </div>
    </>
  );
}
