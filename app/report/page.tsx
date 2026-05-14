import { Badge, KpiCard, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { contentIdeas, events, marketIndicators, seoKeywords, trendItems } from "@/lib/seed";
import { generateWeeklyGrowthBrief } from "@/lib/weeklyBrief";
import { benchmarkCreators, competitors, toolsPlugins } from "@/lib/seed";
import { labelConfidence, labelPlatform, labelSourceType, labelVerification } from "@/lib/thaiLabels";

const afaEvent = events.find((event) => event.id === "event-afa-thailand-2026") ?? events[0];
const afaTrend = trendItems.find((trend) => trend.id === "trend-afa-thailand-2026") ?? trendItems[0];
const afaIdea = contentIdeas.find((idea) => idea.id === "idea-afa-thailand-2026") ?? contentIdeas[0];
const afaKeywords = seoKeywords.filter((keyword) => keyword.id.startsWith("seo-afa-"));
const realEvents = events
  .filter((event) => !event.is_mock_data)
  .sort((a, b) => a.start_date.localeCompare(b.start_date));
const verifiedEvents = realEvents.filter((event) => event.verification_status === "verified");
const needsUpdateEvents = realEvents.filter((event) => event.verification_status !== "verified");
const nextRealEvent = realEvents[0] ?? afaEvent;
const realMarketSignals = marketIndicators.filter((indicator) => !indicator.is_mock_data);
const agentRunSummaries = [
  ["Orchestrator", "orchestrator-brief.md", "Weekly Growth Brief skeleton + quality gate", "completed"],
  ["Source Research", "source-research.md", "source audit + next public/official sources", "completed"],
  ["Trend Intelligence", "trend-intelligence.md", "7-day trend plan + confidence penalties", "completed"],
  ["China Platform", "china-platform.md", "China separation + adaptation risks", "completed"],
  ["Competitor & Benchmark", "competitor-benchmark.md", "manual-input template; no real competitor names", "completed"],
  ["SEO & Content Strategy", "seo-content-strategy.md", "caption hooks + CTA + required keywords", "completed"],
  ["Data QA & Scoring", "data-qa-scoring.md", "CSV/schema/confidence QA; CSV URL quoting fixed after QA", "completed"],
  ["Product UX / Implementation QA", "product-ux-implementation-qa.md", "route/readability/label QA; heading and mock badge fixed", "completed"]
] as const;

function verificationTone(status: string) {
  if (status === "verified") return "green";
  if (status === "needs_update") return "amber";
  return "red";
}

const brief = generateWeeklyGrowthBrief({
  trends: trendItems,
  ideas: contentIdeas,
  events,
  competitors,
  benchmarks: benchmarkCreators,
  seoKeywords,
  tools: toolsPlugins
});

export default function ReportPage() {
  return (
    <>
      <PageHeader
        title="รายงานจาก Browser Research"
        description="เริ่มเก็บข้อมูลจริงจากแหล่ง public/official แล้ว: อีเวนต์ที่ยืนยันครบเป็น verified ส่วนตาราง public schedule ที่ยังต้อง cross-check จะติด needs_update ชัดเจน"
      >
        <Badge tone="green">{verifiedEvents.length} event verified</Badge>
        <Badge tone="amber">{needsUpdateEvents.length} needs_update</Badge>
        <Badge tone="amber">mock fallback enabled</Badge>
      </PageHeader>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <KpiCard label="อีเวนต์จริงที่เริ่มเก็บ" value={String(realEvents.length)} detail="official + public schedule" accent="aqua" />
        <KpiCard label="งานถัดไป" value={nextRealEvent.start_date.slice(5)} detail={nextRealEvent.event_name} accent="sun" />
        <KpiCard label="Market signals" value={String(realMarketSignals.length)} detail="Digital 2026 Thailand" accent="berry" />
        <KpiCard label="คีย์เวิร์ด" value={String(afaKeywords.length)} detail="SEO mock fallback" accent="violet" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="เรดาร์อีเวนต์จริงที่เริ่มเก็บแล้ว">
          <SimpleTable
            columns={["งาน", "วันที่", "สถานที่", "แหล่ง", "สถานะ"]}
            rows={realEvents.map((event) => ({
              งาน: event.event_name,
              วันที่: `${event.start_date} ถึง ${event.end_date}`,
              สถานที่: event.venue,
              แหล่ง: (
                <span>
                  {labelSourceType(event.source_type)} · Tier {event.source_quality_tier}
                </span>
              ),
              สถานะ: (
                <Badge tone={verificationTone(event.verification_status)}>
                  {labelVerification(event.verification_status)}
                </Badge>
              )
            }))}
          />
        </Panel>

        <Panel title="โฟกัสงานถัดไป">
          <div className="rounded-[24px] bg-block-lime p-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone={verificationTone(nextRealEvent.verification_status)}>
                {labelVerification(nextRealEvent.verification_status)}
              </Badge>
              <Badge tone="purple">Tier {nextRealEvent.source_quality_tier}</Badge>
              <Badge tone="amber">{nextRealEvent.source_type === "public_observation" ? "รอ cross-check" : "official"}</Badge>
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-8">{nextRealEvent.event_name}</h3>
            <p className="mt-3 text-base leading-7">{nextRealEvent.expected_content_opportunity}</p>
            <p className="mt-4 text-sm leading-6">{nextRealEvent.notes}</p>
          </div>
        </Panel>

        <Panel title="ข้อมูลที่ยืนยันแล้ว">
          <SimpleTable
            columns={["หัวข้อ", "ค่า", "สถานะ"]}
            rows={[
              {
                หัวข้อ: "อีเวนต์",
                ค่า: afaEvent.event_name,
                สถานะ: <Badge tone="green">{labelVerification(afaEvent.verification_status)}</Badge>
              },
              {
                หัวข้อ: "วันที่",
                ค่า: `${afaEvent.start_date} ถึง ${afaEvent.end_date}`,
                สถานะ: <Badge tone="green">official</Badge>
              },
              {
                หัวข้อ: "สถานที่",
                ค่า: afaEvent.venue,
                สถานะ: <Badge tone="green">official</Badge>
              },
              {
                หัวข้อ: "แหล่งข้อมูล",
                ค่า: afaEvent.source_label,
                สถานะ: <Badge tone="purple">Tier {afaEvent.source_quality_tier}</Badge>
              }
            ]}
          />
        </Panel>

        <Panel title="สัญญาณตลาดรองจาก Digital 2026 Thailand">
          <SimpleTable
            columns={["สัญญาณ", "ค่า", "ใช้กับงานคอสเพลย์", "คุณภาพ"]}
            rows={realMarketSignals.map((indicator) => ({
              สัญญาณ: indicator.indicator_name,
              ค่า: indicator.value,
              ใช้กับงานคอสเพลย์: indicator.interpretation,
              คุณภาพ: (
                <Badge tone="amber">
                  {labelSourceType(indicator.source_type)} · Tier {indicator.source_quality_tier}
                </Badge>
              )
            }))}
          />
        </Panel>

        <Panel title="สถานะ Full 8-Agent Run">
          <SimpleTable
            columns={["Agent", "Output", "ผลลัพธ์", "สถานะ"]}
            rows={agentRunSummaries.map((agent) => ({
              Agent: agent[0],
              Output: agent[1],
              ผลลัพธ์: agent[2],
              สถานะ: <Badge tone="green">{agent[3]}</Badge>
            }))}
          />
        </Panel>

        <Panel title="ส่วนที่ใช้ mock ก่อน">
          <SimpleTable
            columns={["รายการ", "ค่า", "ความมั่นใจ"]}
            rows={[
              {
                รายการ: "เทรนด์",
                ค่า: afaTrend.trend_name,
                ความมั่นใจ: (
                  <span className="flex flex-wrap gap-2">
                    <Badge tone="amber">mock fallback</Badge>
                    <Badge tone="amber">{labelConfidence(afaTrend.confidence_level)}</Badge>
                  </span>
                )
              },
              {
                รายการ: "คอนเทนต์หลัก",
                ค่า: afaIdea.title,
                ความมั่นใจ: <Badge tone="amber">mock</Badge>
              },
              {
                รายการ: "SEO keyword",
                ค่า: afaKeywords.map((keyword) => keyword.keyword).join(", "),
                ความมั่นใจ: <Badge tone="amber">needs verification</Badge>
              }
            ]}
          />
        </Panel>

        <Panel title="คำแนะนำสัปดาห์นี้">
          <div className="rounded-[24px] bg-block-mint p-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone="pink">event: {nextRealEvent.event_name}</Badge>
              <Badge tone="blue">{labelPlatform(afaIdea.platform_target)}</Badge>
              <Badge tone="amber">metric mock</Badge>
            </div>
            <p className="mt-4 text-xl font-semibold leading-8">{brief.shootThisWeek}</p>
            <p className="mt-4 text-base leading-7">{brief.eventOpportunity}</p>
          </div>
        </Panel>

        <Panel title="แผนคอนเทนต์ AFA">
          <SimpleTable
            columns={["ช่วง", "ทำอะไร"]}
            rows={[
              { ช่วง: "ก่อนงาน 14 วัน", ทำอะไร: afaEvent.recommended_pre_event_content },
              { ช่วง: "วันงาน", ทำอะไร: afaEvent.recommended_event_day_content },
              { ช่วง: "หลังงาน 1-3 วัน", ทำอะไร: afaEvent.recommended_post_event_content },
              { ช่วง: "Retouch", ทำอะไร: afaIdea.retouch_notes }
            ]}
          />
        </Panel>

        <Panel title="SEO Package ที่เติมเข้าเว็บ">
          <SimpleTable
            columns={["Keyword", "Platform", "Intent", "วิธีใช้"]}
            rows={afaKeywords.map((keyword) => ({
              Keyword: keyword.keyword,
              Platform: labelPlatform(keyword.platform),
              Intent: keyword.search_intent,
              วิธีใช้: keyword.recommended_caption_usage
            }))}
          />
        </Panel>

        <Panel title="ข้อจำกัด">
          <ul className="grid gap-3 text-sm text-ink">
            <li className="rounded-[24px] bg-block-cream p-4">
              ยังไม่มี analytics export จริง จึงใช้ mock score และ mock SEO priority ก่อน
            </li>
            <li className="rounded-[24px] bg-block-cream p-4">
              Market signals จาก DataReportal เป็น secondary summary ไม่ใช่ analytics export ของบัญชีนี้
            </li>
            <li className="rounded-[24px] bg-block-cream p-4">
              งานจาก Props&Ops เป็น public observation ต้อง cross-check กับ organizer/venue official ก่อนใช้ล็อกคิวถ่ายจริง
            </li>
            <li className="rounded-[24px] bg-block-cream p-4">
              ยังไม่มีรายชื่อคู่แข่งจริงจากผู้ใช้ จึงไม่เพิ่ม competitor จริงตามกฎโปรเจกต์
            </li>
            <li className="rounded-[24px] bg-block-cream p-4">
              ห้ามใช้ตัวเลข mock เป็นข้อสรุปสุดท้ายจนกว่าจะนำเข้า CSV หรือ source ที่ยืนยันแล้ว
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}
