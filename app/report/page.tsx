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
const reportDate = "2026-05-15";
const upcomingRealEvents = realEvents.filter((event) => event.start_date >= reportDate);
const verifiedEvents = realEvents.filter((event) => event.verification_status === "verified");
const needsUpdateEvents = realEvents.filter((event) => event.verification_status !== "verified");
const nextRealEvent = upcomingRealEvents[0] ?? realEvents[0] ?? afaEvent;
const realMarketSignals = marketIndicators.filter((indicator) => !indicator.is_mock_data);
const urgentEvents = upcomingRealEvents.slice(0, 10);
const laterEvents = upcomingRealEvents.slice(10);
const officialUpcomingEvents = upcomingRealEvents.filter((event) => event.verification_status === "verified");
const radarOnlyEvents = upcomingRealEvents.filter((event) => event.verification_status !== "verified");
const manualCompetitors = competitors.filter((competitor) => competitor.is_user_provided);
const agentRunSummaries = [
  ["Orchestrator", "orchestrator-brief.md", "Weekly Growth Brief skeleton + quality gate", "completed"],
  ["Source Research", "source-research.md", "source audit + next public/official sources", "completed"],
  ["Trend Intelligence", "trend-intelligence.md", "7-day trend plan + confidence penalties", "completed"],
  ["China Platform", "china-platform.md", "China separation + adaptation risks", "completed"],
  ["Competitor & Benchmark", "competitor-manual-intake.md", "5 user-provided Facebook competitor records; no login scraping", "completed"],
  ["SEO & Content Strategy", "seo-content-strategy.md", "caption hooks + CTA + required keywords", "completed"],
  ["Data QA & Scoring", "data-qa-scoring.md", "CSV/schema/confidence QA; CSV URL quoting fixed after QA", "completed"],
  ["Product UX / Implementation QA", "product-ux-implementation-qa.md", "route/readability/label QA; heading and mock badge fixed", "completed"]
] as const;
const verifiedReferenceSignals = [
  {
    name: "ANIMONIUM 2026",
    date: "2026-02-06 ถึง 2026-02-08",
    venue: "Paragon Hall, 5th Floor, Siam Paragon",
    source: "Royal Paragon Hall official event page",
    url: "https://www.paragonhall.com/en/events/23/ANIMONIUM-2026",
    use: "benchmark งาน anime/pop-culture Bangkok สำหรับ style, audience, และ event recap pattern"
  },
  {
    name: "World Cosplay Summit 2026",
    date: "2026-07-31 ถึง 2026-08-02",
    venue: "Oasis 21, Aichi Arts Center, Sakae, Nagoya",
    source: "World Cosplay Summit 2026 official site",
    url: "https://worldcosplaysummit.jp/en/?p=70",
    use: "global cosplay benchmark สำหรับ competition story, costume detail, และ China-to-Thailand/global adaptation"
  }
] as const;

function verificationTone(status: string) {
  if (status === "verified") return "green";
  if (status === "needs_update") return "amber";
  return "red";
}

function eventAction(event: (typeof realEvents)[number]) {
  if (event.verification_status === "verified") return "ใช้วางแผนหลักได้ พร้อมติด source";
  if (event.start_date <= "2026-05-31") return "รีบ cross-check แล้วทำ pre-event post";
  return "ใส่ watchlist และตรวจ organizer/venue official";
}

function eventLabel(event: (typeof realEvents)[number]) {
  return event.verification_status === "verified" ? "official anchor" : "public radar";
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
        description="จัดข้อมูลใหม่เป็น research dashboard: แยกงานที่ใช้วางแผนได้, งานที่เป็น public radar ต้องตรวจเพิ่ม, สัญญาณตลาดรอง, source reference และข้อจำกัด เพื่อให้ตัดสินใจได้โดยไม่ปน mock กับ verified"
      >
        <Badge tone="green">{verifiedEvents.length} event verified</Badge>
        <Badge tone="amber">{needsUpdateEvents.length} needs_update</Badge>
        <Badge tone="green">{manualCompetitors.length} manual competitors</Badge>
        <Badge tone="amber">mock fallback enabled</Badge>
      </PageHeader>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <KpiCard label="Upcoming pipeline" value={String(upcomingRealEvents.length)} detail="ตั้งแต่ 2026-05-15" accent="aqua" />
        <KpiCard label="งานถัดไป" value={nextRealEvent.start_date.slice(5)} detail={nextRealEvent.event_name} accent="sun" />
        <KpiCard label="Official anchors" value={String(officialUpcomingEvents.length)} detail="ใช้วางแผนหลักได้" accent="berry" />
        <KpiCard label="Public radar" value={String(radarOnlyEvents.length)} detail="ต้อง cross-check" accent="violet" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="อ่านก่อนใช้ข้อมูล">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-block-mint p-5">
              <Badge tone="green">verified</Badge>
              <h3 className="mt-4 text-xl font-semibold">ใช้วางแผนหลักได้</h3>
              <p className="mt-2 text-base leading-7">
                อีเวนต์ที่มี official source เช่น AFA, Nippon Haku, gamescom ใช้ทำ calendar, caption, CTA และ production plan ได้
              </p>
            </div>
            <div className="rounded-[24px] bg-block-cream p-5">
              <Badge tone="amber">needs_update</Badge>
              <h3 className="mt-4 text-xl font-semibold">ใช้เป็น radar ก่อน</h3>
              <p className="mt-2 text-base leading-7">
                Props&Ops ช่วยเห็น pipeline งานคอสเพลย์เร็ว แต่ต้อง cross-check กับ organizer/venue official ก่อนล็อกคิวถ่ายจริง
              </p>
            </div>
            <div className="rounded-[24px] bg-block-pink p-5">
              <Badge tone="amber">mock fallback</Badge>
              <h3 className="mt-4 text-xl font-semibold">ยังไม่ใช่ metric จริง</h3>
              <p className="mt-2 text-base leading-7">
                Trend score, SEO priority และ content impact ยังรอ Google Trends export หรือ analytics export ของบัญชีคุณ
              </p>
            </div>
          </div>
        </Panel>

        <Panel title="Priority Plan สัปดาห์นี้">
          <div className="rounded-[24px] bg-block-lime p-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone={verificationTone(nextRealEvent.verification_status)}>
                {labelVerification(nextRealEvent.verification_status)}
              </Badge>
              <Badge tone="purple">Tier {nextRealEvent.source_quality_tier}</Badge>
              <Badge tone="amber">{eventLabel(nextRealEvent)}</Badge>
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-8">{nextRealEvent.event_name}</h3>
            <p className="mt-3 text-base leading-7">{nextRealEvent.expected_content_opportunity}</p>
            <p className="mt-4 text-base leading-7">
              Action: {eventAction(nextRealEvent)} · โพสต์แรกควรเป็นคิวว่าง/pose guide แล้วตามด้วย BTS และ before/after retouch
            </p>
          </div>
        </Panel>

        <Panel title="Upcoming Event Pipeline">
          <SimpleTable
            columns={["งาน", "วันที่", "สถานที่", "สถานะ", "ใช้ทำอะไรต่อ"]}
            rows={urgentEvents.map((event) => ({
              งาน: event.event_name,
              วันที่: `${event.start_date} ถึง ${event.end_date}`,
              สถานที่: event.venue,
              สถานะ: (
                <Badge tone={verificationTone(event.verification_status)}>
                  {eventLabel(event)} · {labelVerification(event.verification_status)}
                </Badge>
              ),
              "ใช้ทำอะไรต่อ": eventAction(event)
            }))}
          />
        </Panel>

        <Panel title="Watchlist ระยะกลาง-ปลายปี">
          <SimpleTable
            columns={["งาน", "วันที่", "สถานที่", "สถานะ"]}
            rows={laterEvents.map((event) => ({
              งาน: event.event_name,
              วันที่: `${event.start_date} ถึง ${event.end_date}`,
              สถานที่: event.venue,
              สถานะ: (
                <Badge tone={verificationTone(event.verification_status)}>
                  {eventLabel(event)}
                </Badge>
              )
            }))}
          />
        </Panel>

        <Panel title="Official Anchors ที่ยืนยันแล้ว">
          <SimpleTable
            columns={["งาน", "วันที่", "สถานที่", "แหล่ง", "ใช้กับแผน"]}
            rows={officialUpcomingEvents.map((event) => ({
              งาน: event.event_name,
              วันที่: `${event.start_date} ถึง ${event.end_date}`,
              สถานที่: event.venue,
              แหล่ง: event.source_label,
              ใช้กับแผน: event.expected_content_opportunity
            }))}
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

        <Panel title="แหล่งอ้างอิงทางการที่อัปเดตเพิ่ม">
          <SimpleTable
            columns={["รายการ", "วันที่", "สถานที่", "ใช้กับแผน", "แหล่ง"]}
            rows={verifiedReferenceSignals.map((item) => ({
              รายการ: item.name,
              วันที่: item.date,
              สถานที่: item.venue,
              ใช้กับแผน: item.use,
              แหล่ง: (
                <a className="font-semibold underline" href={item.url} target="_blank" rel="noreferrer">
                  {item.source}
                </a>
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

        <Panel title="คู่แข่งที่ผู้ใช้ให้มา">
          <SimpleTable
            columns={["ชื่อ", "แพลตฟอร์ม", "หลักฐาน", "ใช้ทำอะไรต่อ"]}
            rows={manualCompetitors.map((competitor) => ({
              ชื่อ: (
                <a className="font-semibold underline" href={competitor.public_url} target="_blank" rel="noreferrer">
                  {competitor.display_name}
                </a>
              ),
              แพลตฟอร์ม: labelPlatform(competitor.main_platform),
              หลักฐาน: (
                <span className="flex flex-wrap gap-2">
                  <Badge tone="green">manual</Badge>
                  <Badge tone="amber">{labelVerification(competitor.verification_status)}</Badge>
                </span>
              ),
              "ใช้ทำอะไรต่อ": competitor.opportunities
            }))}
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
              มีรายชื่อคู่แข่งจริงจากผู้ใช้แล้ว {manualCompetitors.length} รายการ แต่ยังต้องตรวจ public content strategy แบบไม่ล็อกอินก่อนใช้เป็นข้อสรุป
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
