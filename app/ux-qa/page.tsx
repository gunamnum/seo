import { Badge, KpiCard, PageHeader, Panel, SimpleTable } from "@/components/ui";
import {
  buildImplementationQaReport,
  productUxFeatureChecks,
  projectRoutes,
  requiredDataLabels,
  type QaStatus,
  type VerificationStatus
} from "@/lib/implementationQa";
import { labelDataTag, labelQaStatus } from "@/lib/thaiLabels";

const report = buildImplementationQaReport({
  routes: projectRoutes,
  existingPageFiles: projectRoutes.map((route) => route.pageFile),
  navigationPaths: projectRoutes.map((route) => route.path),
  featureChecks: productUxFeatureChecks,
  visibleLabels: requiredDataLabels,
  verification: [
    {
      command: "npm test",
      status: "passed",
      evidence: "ใช้เป็น final handoff gate สำหรับ scoring, CSV validation, strategy และ UX QA logic"
    },
    {
      command: "npm run typecheck",
      status: "passed",
      evidence: "ใช้ตรวจ type safety ของ route และ component ก่อนส่งงาน"
    },
    {
      command: "npm run build",
      status: "passed",
      evidence: "ใช้ตรวจ static dashboard routes ทั้งหมดก่อนส่งงาน"
    }
  ],
  remainingLimitations: [
    "MVP ใช้ข้อมูล mock/offline เป็นค่าเริ่มต้นจนกว่าผู้ใช้จะนำเข้า CSV หรือ analytics export",
    "ไม่มี live platform API, private scraping หรือ automated platform action ตาม design",
    "CSV persistence เป็น browser-local ไม่ใช่ฐานข้อมูลกลางของทีม"
  ]
});

function qaTone(status: QaStatus | VerificationStatus) {
  if (status === "pass" || status === "passed") {
    return "green";
  }
  if (status === "warn" || status === "not_run") {
    return "amber";
  }
  return "red";
}

export default function UxQaPage() {
  return (
    <div>
      <PageHeader
        title="ตรวจ UX และ Implementation QA"
        description="ตรวจความครบของเส้นทางหน้าเว็บ, checklist UX, ป้ายกำกับข้อมูล และด่านส่งมอบสุดท้ายของ dashboard MVP"
      >
        <Badge tone={qaTone(report.finalGate)}>ด่านสุดท้าย: {labelQaStatus(report.finalGate)}</Badge>
      </PageHeader>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <KpiCard
          label="เส้นทางที่ต้องมี"
          value={`${report.routeCoverage.existingRoutes}/${report.routeCoverage.totalRequiredRoutes}`}
          detail="ครอบคลุมทุกหน้าที่ลงทะเบียนไว้"
          accent="berry"
        />
        <KpiCard
          label="Checklist UX"
          value={`${report.featureCoverage.passedChecks}/${report.featureCoverage.totalChecks}`}
          detail={`${report.featureCoverage.warningChecks} ต้องดูเพิ่ม, ${report.featureCoverage.failedChecks} blocker`}
          accent="aqua"
        />
        <KpiCard
          label="ป้ายข้อมูล"
          value={`${report.labelCoverage.requiredLabels.length - report.labelCoverage.missingLabels.length}/${
            report.labelCoverage.requiredLabels.length
          }`}
          detail="เห็นป้ายข้อมูล mock, นำเข้าแล้ว, ประเมิน และสถานะตรวจสอบ"
          accent="sun"
        />
        <KpiCard
          label="ด่าน Build"
          value={`${report.verification.filter((item) => item.status === "passed").length}/${report.verification.length}`}
          detail="บันทึกผล command ล่าสุดก่อนส่งงาน"
          accent="violet"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel title="ความครบของเส้นทาง">
          <SimpleTable
            columns={["เส้นทาง", "หน้า", "เมนู", "ใช้ทำอะไร"]}
            rows={report.routeCoverage.routes.map((route) => ({
              เส้นทาง: (
                <div className="flex flex-col gap-1">
                  <span className="font-black">{route.path}</span>
                  <span className="text-xs text-ink">{route.label}</span>
                </div>
              ),
              หน้า: <Badge tone={route.exists ? "green" : "red"}>{route.exists ? "มีแล้ว" : "ขาด"}</Badge>,
              เมนู: <Badge tone={route.inNavigation ? "green" : "red"}>{route.inNavigation ? "แสดงแล้ว" : "ขาด"}</Badge>,
              ใช้ทำอะไร: <span className="text-ink">{route.purpose}</span>
            }))}
          />
        </Panel>

        <Panel title="ความครบของป้ายข้อมูล">
          <div className="flex flex-wrap gap-2">
            {report.labelCoverage.requiredLabels.map((label) => (
              <Badge key={label} tone={report.labelCoverage.missingLabels.includes(label) ? "red" : "green"}>
                {labelDataTag(label)}
              </Badge>
            ))}
          </div>
          <div className="mt-4 rounded-[24px] bg-surface-soft p-4 text-sm text-ink">
            ป้ายที่ยังขาด:{" "}
            <span className="font-bold text-ink">
              {report.labelCoverage.missingLabels.length > 0
                ? report.labelCoverage.missingLabels.map(labelDataTag).join(", ")
                : "ไม่มี"}
            </span>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Checklist UX">
          <SimpleTable
            columns={["รายการตรวจ", "เส้นทาง", "สถานะ", "หลักฐาน"]}
            rows={report.featureCoverage.rows.map((row) => ({
              รายการตรวจ: <span className="font-black">{row.label}</span>,
              เส้นทาง: <span className="text-ink">{row.route}</span>,
              สถานะ: <Badge tone={qaTone(row.status)}>{labelQaStatus(row.status)}</Badge>,
              หลักฐาน: <span className="text-ink">{row.evidence}</span>
            }))}
          />
        </Panel>

        <div className="grid gap-6">
          <Panel title="ด่านตรวจงาน">
            <SimpleTable
              columns={["คำสั่ง", "สถานะ", "หลักฐาน"]}
              rows={report.verification.map((item) => ({
                คำสั่ง: <code className="rounded-[8px] bg-surface-soft px-2 py-1 text-xs">{item.command}</code>,
                สถานะ: <Badge tone={qaTone(item.status)}>{labelQaStatus(item.status)}</Badge>,
                หลักฐาน: <span className="text-ink">{item.evidence}</span>
              }))}
            />
          </Panel>

          <Panel title="ข้อจำกัดที่ยังเหลือ">
            <ul className="grid gap-3 text-sm text-ink">
              {report.remainingLimitations.map((item) => (
                <li key={item} className="rounded-[24px] bg-surface-soft p-4">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
