import { Badge, KpiCard, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { buildDataQaReport } from "@/lib/dataQa";
import { benchmarkCreators, trendItems } from "@/lib/seed";
import { labelConfidence, labelDataTag } from "@/lib/thaiLabels";

const chinaBenchmark = benchmarkCreators.find((item) => item.platform_group === "china_mainland_platform") ?? benchmarkCreators[0];

const report = buildDataQaReport({
  trends: trendItems,
  benchmarks: benchmarkCreators,
  csvSamples: {
    trend_items: [
      {
        id: "sample-trend",
        platform: "tiktok",
        region: "thailand",
        trend_name: "ตัวอย่างเทรนด์นำเข้า",
        trend_type: "keyword",
        collected_at: "2026-05-13",
        source_label: "ตัวอย่าง CSV ผู้ใช้",
        source_url: "https://example.com/source",
        source_type: "manual_csv",
        verification_status: "needs_verification",
        is_estimated: "false",
        is_user_provided: "true",
        source_quality_tier: "A",
        confidence_reason: "ตัวอย่างแถว CSV สำหรับ QA"
      }
    ],
    benchmark_creators: [
      {
        id: "sample-china-benchmark",
        creator_display_name: "ตัวอย่าง Creator จีน",
        platform: chinaBenchmark.platform,
        platform_group: chinaBenchmark.platform_group,
        source_label: "ตัวอย่าง CSV ผู้ใช้",
        source_url: "https://example.com/source",
        source_type: "manual_csv",
        verification_status: "needs_verification",
        is_estimated: "false",
        is_user_provided: "true",
        source_quality_tier: "A",
        confidence_reason: "ตัวอย่างแถว CSV สำหรับ QA"
      }
    ]
  }
});

export default function DataQaPage() {
  return (
    <>
      <PageHeader
        title="ตรวจข้อมูลและคะแนน"
        description="ตรวจ schema, CSV, คะแนน, confidence, การแยกแพลตฟอร์มจีน และป้ายกำกับข้อมูล"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="ประเภท CSV ที่ตรวจ"
          value={String(report.csv_validation.total_import_types_checked)}
          detail={`${report.csv_validation.rows_checked} แถวตัวอย่าง`}
        />
        <KpiCard
          label="คะแนนไม่ตรง"
          value={String(report.scoring.score_mismatch_count)}
          detail={`คำนวณคะแนนเทรนด์ใหม่ ${report.scoring.total_trends_checked} รายการ`}
          accent="aqua"
        />
        <KpiCard
          label="ค่านอกช่วง"
          value={String(report.scoring.input_range_issues.length)}
          detail="ค่าคะแนนต้องอยู่ในช่วง 0-100"
          accent="sun"
        />
        <KpiCard
          label="Error ฝั่งจีน"
          value={String(report.china_platform_group_errors.length)}
          detail="แพลตฟอร์มจีนต้องใช้ china_mainland_platform"
          accent="violet"
        />
      </div>
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Panel title="รายงานตรวจ CSV">
          {report.csv_validation.errors.length === 0 ? (
            <div className="rounded-[24px] bg-block-mint p-4 text-sm font-semibold text-ink">
              แถวตัวอย่าง CSV ผ่านการตรวจ required columns, enum, URL, number, date, boolean และ platform_group ของจีน
            </div>
          ) : (
            <div className="space-y-2 text-sm text-ink">
              {report.csv_validation.errors.map((error) => (
                <div key={error} className="rounded-[24px] bg-block-pink p-4">
                  {error}
                </div>
              ))}
            </div>
          )}
        </Panel>
        <Panel title="ป้ายกำกับข้อมูล">
          <div className="flex flex-wrap gap-2">
            {Object.entries(report.data_labels).map(([label, count]) => (
              <Badge key={label} tone={count > 0 ? "amber" : "slate"}>
                {labelDataTag(label)}: {count}
              </Badge>
            ))}
          </div>
        </Panel>
        <Panel title="ตรวจคะแนน">
          <SimpleTable
            columns={["เทรนด์", "คะแนนเดิม", "คำนวณใหม่", "ความมั่นใจ"]}
            rows={report.scoring.rows.slice(0, 8).map((row) => ({
              เทรนด์: row.trend_id,
              คะแนนเดิม: row.stored_score,
              คำนวณใหม่: (
                <Badge tone={row.stored_score === row.recalculated_score ? "green" : "red"}>
                  {row.recalculated_score}
                </Badge>
              ),
              ความมั่นใจ:
                row.stored_confidence === row.recalculated_confidence
                  ? labelConfidence(row.stored_confidence)
                  : `${labelConfidence(row.stored_confidence)} -> ${labelConfidence(row.recalculated_confidence)}`
            }))}
          />
        </Panel>
        <Panel title="เหตุผลที่ลดความมั่นใจ">
          <div className="space-y-2 text-sm text-ink">
            {report.confidence_downgrades.slice(0, 10).map((reason) => (
              <div key={reason} className="rounded-[24px] bg-block-cream p-4">
                {reason}
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="คำเตือน">
          <div className="space-y-2 text-sm text-ink">
            {report.warnings.map((warning) => (
              <div key={warning} className="rounded-[24px] bg-surface-soft p-4">
                {warning}
              </div>
            ))}
            {report.warnings.length === 0 ? (
              <div className="rounded-[24px] bg-block-mint p-4 text-ink">ไม่มีคำเตือน Data QA ที่บล็อกงาน</div>
            ) : null}
          </div>
        </Panel>
      </div>
    </>
  );
}
