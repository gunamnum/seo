import { Badge, KpiCard, PageHeader, Panel, SimpleTable } from "@/components/ui";
import {
  benchmarkCreators,
  competitors,
  contentIdeas,
  events,
  experiments,
  marketIndicators,
  seoKeywords,
  toolsPlugins,
  trendItems,
  viralClips
} from "@/lib/seed";
import { buildResearchQualityReport } from "@/lib/researchQuality";
import { labelSourceType, labelVerification } from "@/lib/thaiLabels";

const report = buildResearchQualityReport([
  { label: "เทรนด์", records: trendItems },
  { label: "คลิปไวรัล", records: viralClips },
  { label: "คู่แข่ง", records: competitors },
  { label: "Benchmark", records: benchmarkCreators },
  { label: "อีเวนต์", records: events },
  { label: "เครื่องมือ", records: toolsPlugins },
  { label: "คีย์เวิร์ด SEO", records: seoKeywords },
  { label: "ไอเดียคอนเทนต์", records: contentIdeas },
  { label: "ตัวชี้วัดตลาด", records: marketIndicators },
  { label: "การทดลอง", records: experiments }
]);

const tierTone: Record<string, string> = {
  S: "green",
  A: "blue",
  B: "purple",
  C: "amber",
  D: "red"
};

function percent(value: number, total: number) {
  if (total === 0) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export default function QualityPage() {
  const weakRecords = report.datasetRows.reduce((total, row) => total + row.weak_records, 0);
  const decisionReadyRecords = report.totalRecords - weakRecords;

  return (
    <>
      <PageHeader
        title="ตรวจคุณภาพงานค้นคว้า"
        description="ตรวจคุณภาพหลักฐาน ระดับแหล่งข้อมูล สถานะการยืนยัน ป้ายข้อมูล mock/ประเมิน และทะเบียนแหล่งที่มา"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="ข้อมูลทั้งหมด" value={String(report.totalRecords)} detail="ข้อมูล seed/import-ready ทั้งหมด" />
        <KpiCard
          label="ยืนยันแล้ว"
          value={String(report.verifiedRecords)}
          detail={`${percent(report.verifiedRecords, report.totalRecords)} ของข้อมูลทั้งหมด`}
          accent="aqua"
        />
        <KpiCard
          label="Mock / Estimated"
          value={String(report.mockRecords + report.estimatedRecords)}
          detail="ต้องมีป้ายกำกับก่อนใช้จริง"
          accent="sun"
        />
        <KpiCard
          label="พร้อมตัดสินใจ"
          value={String(Math.max(decisionReadyRecords, 0))}
          detail="ยืนยันแล้วและไม่ใช่ข้อมูล mock"
          accent="violet"
        />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel title="ระดับแหล่งข้อมูล">
          <div className="flex flex-wrap gap-2">
            {Object.entries(report.sourceTierCounts).map(([tier, count]) => (
              <Badge key={tier} tone={tierTone[tier]}>
                Tier {tier}: {count}
              </Badge>
            ))}
          </div>
        </Panel>
        <Panel title="สถานะการยืนยัน">
          <div className="flex flex-wrap gap-2">
            {Object.entries(report.verificationStatusCounts).map(([status, count]) => (
              <Badge key={status} tone={status === "verified" ? "green" : "amber"}>
                {labelVerification(status)}: {count}
              </Badge>
            ))}
          </div>
        </Panel>
        <Panel title="คุณภาพชุดข้อมูล">
          <SimpleTable
            columns={["ชุดข้อมูล", "จำนวน", "อ่อน", "ข้อมูล Mock", "ข้อมูลประเมิน", "ยืนยันแล้ว", "ต้องตรวจ"]}
            rows={report.datasetRows.map((row) => ({
              ชุดข้อมูล: row.dataset,
              จำนวน: row.total_records,
              อ่อน: <Badge tone={row.weak_records > 0 ? "amber" : "green"}>{row.weak_records}</Badge>,
              "ข้อมูล Mock": row.mock_records,
              ข้อมูลประเมิน: row.estimated_records,
              ยืนยันแล้ว: row.verified_records,
              ต้องตรวจ: row.needs_verification_records
            }))}
          />
        </Panel>
        <Panel title="คำเตือนคุณภาพ">
          <div className="space-y-3 text-sm text-ink">
            {report.warnings.slice(0, 10).map((warning) => (
              <div key={warning} className="rounded-[24px] bg-block-cream p-4 text-ink">
                {warning}
              </div>
            ))}
            <div className="rounded-[24px] bg-surface-soft p-4 text-ink">
              ข้อมูลอ่อน: {weakRecords} รายการ ควรนำเข้า user analytics หรือใช้แหล่งทางการเพื่อลดจำนวนนี้
            </div>
          </div>
        </Panel>
        <Panel title="ทะเบียนแหล่งข้อมูล">
          <SimpleTable
            columns={["แหล่งข้อมูล", "ประเภท", "Tier", "สถานะ", "จำนวน", "ข้อมูล Mock", "ผู้ใช้"]}
            rows={report.sourceRows.slice(0, 12).map((source) => ({
              แหล่งข้อมูล: source.source_label,
              ประเภท: labelSourceType(source.source_type),
              Tier: <Badge tone={tierTone[source.source_quality_tier]}>Tier {source.source_quality_tier}</Badge>,
              สถานะ: source.verification_statuses.map(labelVerification).join(", "),
              จำนวน: source.record_count,
              "ข้อมูล Mock": source.mock_count,
              ผู้ใช้: source.user_provided_count
            }))}
          />
        </Panel>
      </div>
    </>
  );
}
