import { ExportButton } from "@/components/export-button";
import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { buildCompetitorBenchmarkReport } from "@/lib/competitorBenchmark";
import { benchmarkCreators, competitors } from "@/lib/seed";
import { labelCompetitorGroup, labelImpact, labelPlatform } from "@/lib/thaiLabels";

export default function CompetitorsPage() {
  const report = buildCompetitorBenchmarkReport({
    competitors,
    benchmarks: benchmarkCreators
  });

  return (
    <>
      <PageHeader
        title="วิเคราะห์คู่แข่งและตัวอย่างอ้างอิง"
        description="ดูช่องว่างคู่แข่งในไทยและรูปแบบจากเอเชีย โดยแยกตัวเลขจีน และชื่อคู่แข่งจริงต้องมาจากผู้ใช้กรอกเองเท่านั้น"
      >
        <ExportButton rows={competitors as unknown as Array<Record<string, unknown>>} filename="competitor-matrix.csv" />
      </PageHeader>
      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <Panel title="คู่แข่งไทย">
          <div className="text-3xl font-black">{report.thaiCompetitorCount}</div>
          <p className="mt-2 text-sm text-ink">รับเฉพาะข้อมูลคู่แข่งในไทยเข้าตารางนี้</p>
        </Panel>
        <Panel title="แยกตัวอย่างอ้างอิง">
          <div className="flex flex-wrap gap-2">
            <Badge tone="blue">ทั่วไป: {report.globalBenchmarkCount}</Badge>
            <Badge tone="purple">จีน: {report.chinaBenchmarkCount}</Badge>
          </div>
          <p className="mt-3 text-sm text-ink">ข้อมูลจีนใช้เป็น pattern intelligence เท่านั้น</p>
        </Panel>
        <Panel title="กฎความปลอดภัย">
          <div className="flex flex-wrap gap-2">
            <Badge tone={report.rules.thaiCompetitorsOnly ? "green" : "red"}>ไทยเท่านั้น</Badge>
            <Badge tone={report.rules.realCompetitorsManualOnly ? "green" : "red"}>ชื่อจริงต้องกรอกเอง</Badge>
            <Badge tone="green">แยกข้อมูลจีน</Badge>
          </div>
        </Panel>
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <Panel title="ตารางคู่แข่ง">
          <SimpleTable
            columns={["ชื่อ", "กลุ่ม", "แพลตฟอร์ม", "ช่องว่าง", "ควรทำ", "ความเสี่ยง"]}
            rows={report.competitorRows.map((competitor) => ({
              ชื่อ: competitor.display_name,
              กลุ่ม: labelCompetitorGroup(competitor.competitor_group),
              แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(competitor.main_platform)}</Badge>,
              ช่องว่าง: competitor.gap_summary,
              ควรทำ: competitor.recommended_action,
              ความเสี่ยง: <Badge tone={competitor.threat_level === "high" ? "red" : "amber"}>{labelImpact(competitor.threat_level)}</Badge>
            }))}
          />
        </Panel>
        <Panel title="การลงมือเชิงกลยุทธ์">
          <div className="grid gap-3">
            {report.strategyActions.map((action) => (
              <div key={action} className="rounded-[24px] bg-surface-soft p-4 text-sm font-semibold text-ink">
                {action}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Panel title="รูปแบบจากตัวอย่างทั่วไป">
          <SimpleTable
            columns={["แพลตฟอร์ม", "คอนเทนต์", "รูปแบบ", "ปรับใช้"]}
            rows={report.globalBenchmarkPatterns.slice(0, 6).map((pattern) => ({
              แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(pattern.platform)}</Badge>,
              คอนเทนต์: pattern.content_type,
              รูปแบบ: pattern.pattern,
              ปรับใช้: pattern.adaptation
            }))}
          />
        </Panel>
        <Panel title="กฎกันพลาดเมื่อปรับรูปแบบจีน">
          <div className="space-y-3 text-sm text-ink">
            {report.chinaAdaptationActions.slice(0, 5).map((action) => (
              <div key={action} className="rounded-[24px] bg-block-lilac p-4 text-ink">
                {action}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      {report.inputWarnings.length > 0 ? (
        <Panel title="คำเตือนข้อมูลนำเข้า">
          <div className="space-y-3 text-sm text-ink">
            {report.inputWarnings.map((warning) => (
              <div key={warning} className="rounded-[24px] bg-block-pink p-4">
                {warning}
              </div>
            ))}
          </div>
        </Panel>
      ) : null}
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {competitors.map((competitor) => (
          <div key={competitor.id} className="rounded-[24px] border border-hairline bg-canvas p-5 shadow-none">
            <Badge tone="pink">{labelCompetitorGroup(competitor.competitor_group)}</Badge>
            <h3 className="mt-3 font-black">{competitor.display_name}</h3>
            <p className="mt-2 text-sm text-ink">{competitor.visual_style}</p>
          </div>
        ))}
      </div>
    </>
  );
}
