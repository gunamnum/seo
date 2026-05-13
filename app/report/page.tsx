import { Badge, KpiCard, PageHeader, Panel, SimpleTable } from "@/components/ui";
import { contentIdeas, events, seoKeywords, trendItems } from "@/lib/seed";
import { generateWeeklyGrowthBrief } from "@/lib/weeklyBrief";
import { benchmarkCreators, competitors, toolsPlugins } from "@/lib/seed";
import { labelConfidence, labelPlatform, labelVerification } from "@/lib/thaiLabels";

const afaEvent = events.find((event) => event.id === "event-afa-thailand-2026") ?? events[0];
const afaTrend = trendItems.find((trend) => trend.id === "trend-afa-thailand-2026") ?? trendItems[0];
const afaIdea = contentIdeas.find((idea) => idea.id === "idea-afa-thailand-2026") ?? contentIdeas[0];
const afaKeywords = seoKeywords.filter((keyword) => keyword.id.startsWith("seo-afa-"));

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
        description="ข้อมูลที่ค้นหาแล้วใส่เข้าเว็บ: แหล่งที่ยืนยันแล้วใช้เป็น verified ส่วนที่ยังไม่มีตัวเลขจริงใช้ mock พร้อมป้ายกำกับ"
      >
        <Badge tone="green">1 event verified</Badge>
        <Badge tone="amber">mock fallback enabled</Badge>
      </PageHeader>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <KpiCard label="อีเวนต์ยืนยันแล้ว" value="1" detail="QSNCC + AFA official" accent="aqua" />
        <KpiCard label="ช่วงจัดงาน" value="30-31 พ.ค." detail="ปี 2026" accent="sun" />
        <KpiCard label="Trend score" value={`${afaTrend.trend_score}/100`} detail="mock fallback metric" accent="berry" />
        <KpiCard label="คีย์เวิร์ด" value={String(afaKeywords.length)} detail="SEO mock fallback" accent="violet" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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

        <Panel title="ส่วนที่ใช้ mock ก่อน">
          <SimpleTable
            columns={["รายการ", "ค่า", "ความมั่นใจ"]}
            rows={[
              {
                รายการ: "เทรนด์",
                ค่า: afaTrend.trend_name,
                ความมั่นใจ: <Badge tone="amber">{labelConfidence(afaTrend.confidence_level)}</Badge>
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
              <Badge tone="pink">event: {afaEvent.event_name}</Badge>
              <Badge tone="blue">{labelPlatform(afaIdea.platform_target)}</Badge>
              <Badge tone="amber">metric mock</Badge>
            </div>
            <p className="mt-4 text-xl font-semibold leading-8">{brief.shootThisWeek}</p>
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
