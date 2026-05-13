import Link from "next/link";
import { ExportButton } from "@/components/export-button";
import { EngagementChart, TrendScoreChart } from "@/components/lazy-charts";
import { Badge, KpiCard, PageHeader, Panel, ScoreBadge, SimpleTable } from "@/components/ui";
import {
  benchmarkCreators,
  contentIdeas,
  events,
  toolsPlugins,
  trendItems,
  viralClips
} from "@/lib/seed";
import { formatPercent } from "@/lib/metrics";
import { labelConfidence, labelImpact, labelPlatform } from "@/lib/thaiLabels";

export default function HomePage() {
  const topTrend = [...trendItems].sort((a, b) => b.trend_score - a.trend_score)[0];
  const bestPlatform = viralClips.reduce<Record<string, number>>((acc, clip) => {
    acc[clip.platform] = (acc[clip.platform] ?? 0) + clip.engagement_rate_by_view;
    return acc;
  }, {});
  const bestPlatformName = Object.entries(bestPlatform).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "tiktok";
  const avgEngagement =
    viralClips.reduce((sum, clip) => sum + clip.engagement_rate_by_view, 0) / viralClips.length;
  const nextEvent = events[0];
  const gaps = benchmarkCreators.filter((creator) => creator.platform_group === "china_mainland_platform").length;
  const primaryIdea = contentIdeas[0];

  return (
    <>
      <PageHeader
        title="แดชบอร์ดวางแผนคอนเทนต์คอสเพลย์"
        description="เครื่องมือวางแผนรายสัปดาห์สำหรับเลือกว่าจะถ่าย รีทัช ตัดต่อ และโพสต์อะไร เพื่อเพิ่ม reach แบบ organic โดยไม่ซื้อโฆษณา"
      >
        <ExportButton rows={contentIdeas as unknown as Array<Record<string, unknown>>} filename="content-ideas.csv" />
      </PageHeader>

      <section className="mb-8 overflow-hidden rounded-[24px] bg-block-navy text-inverse-ink">
        <div className="grid gap-0 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-inverse-ink text-lg font-bold text-ink">
              CG
            </div>
            <h3 className="font-display max-w-3xl text-3xl font-normal leading-tight tracking-normal text-inverse-ink sm:text-4xl">
              สัปดาห์นี้ให้ถ่ายมุมคอสเพลย์ที่มีสัญญาณแรงที่สุด แล้วโพสต์ด้วย SEO และป้ายหลักฐานที่ชัดเจน
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-inverse-ink">
              เริ่มจากสรุปรายสัปดาห์ นำเข้า CSV จริงเมื่อพร้อม และใช้หน้า QA เพื่อให้เห็นชัดว่าอะไรเป็นข้อมูล mock, ประเมิน, นำเข้าแล้ว หรือยังต้องตรวจสอบ
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/brief" className="rounded-full bg-inverse-ink px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-surface-soft">
                เปิดสรุป
              </Link>
              <Link href="/import" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-inverse-ink transition hover:bg-white/10">
                นำเข้า CSV
              </Link>
              <Link href="/ux-qa" className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-inverse-ink transition hover:bg-white/10">
                ตรวจ QA
              </Link>
            </div>
          </div>

          <div className="border-t border-white/20 bg-white/10 p-5 xl:border-l xl:border-t-0">
            <div className="grid gap-3">
              {[
                ["ถ่าย", topTrend.trend_name],
                ["รีทัช", primaryIdea.retouch_notes],
                ["โพสต์", primaryIdea.posting_window],
                ["ตรวจ", "ข้อมูลที่ยังต้องตรวจสอบต้องมีป้ายกำกับชัดเจน"]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[24px] bg-canvas p-5 text-ink">
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">{label}</div>
                  <div className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="คะแนนเทรนด์สูงสุด" value={`${topTrend.trend_score}`} detail={topTrend.trend_name} accent="berry" />
        <KpiCard label="แพลตฟอร์มเด่น" value={labelPlatform(bestPlatformName)} detail="อิงอัตราการมีส่วนร่วมของข้อมูล mock" accent="aqua" />
        <KpiCard label="การมีส่วนร่วมเฉลี่ย" value={formatPercent(avgEngagement)} detail="จากคลิปไวรัล mock ทั้งหมด" accent="sun" />
        <KpiCard label="อีเวนต์ถัดไป" value={nextEvent.event_name} detail={nextEvent.start_date} accent="violet" />
        <KpiCard label="ไอเดียพร้อมใช้" value={`${contentIdeas.length}`} detail="ไอเดียคอนเทนต์ mock" accent="berry" />
        <KpiCard label="ช่องว่างคู่แข่ง" value={`${gaps}`} detail="พบ pattern จากฝั่งจีนที่ปรับใช้ได้" accent="aqua" />
        <KpiCard label="เครื่องมือที่มี checklist" value={`${toolsPlugins.length}`} detail="แนบ safety checklist แล้ว" accent="sun" />
        <KpiCard label="โหมดข้อมูล" value="ออฟไลน์" detail="mock + CSV ที่กรอกเอง" accent="violet" />
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-2">
        <Panel title="5 โอกาสเทรนด์ 7 วัน">
          <SimpleTable
            columns={["เทรนด์", "แพลตฟอร์ม", "คะแนน", "ความมั่นใจ"]}
            rows={[...trendItems]
              .sort((a, b) => b.trend_score - a.trend_score)
              .slice(0, 5)
              .map((trend) => ({
                เทรนด์: trend.trend_name,
                แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(trend.platform)}</Badge>,
                คะแนน: <ScoreBadge score={trend.trend_score} />,
                ความมั่นใจ: <Badge tone={trend.confidence_level === "high" ? "green" : "amber"}>{labelConfidence(trend.confidence_level)}</Badge>
              }))}
          />
        </Panel>
        <Panel title="กราฟคะแนนเทรนด์">
          <TrendScoreChart data={trendItems.slice(0, 8).map((trend) => ({ name: trend.id, score: trend.trend_score }))} />
        </Panel>
        <Panel title="5 ไอเดียคอนเทนต์แนะนำ">
          <SimpleTable
            columns={["ไอเดีย", "แพลตฟอร์ม", "ช่วงเวลา", "ผลกระทบ"]}
            rows={contentIdeas.slice(0, 5).map((idea) => ({
              ไอเดีย: idea.title,
              แพลตฟอร์ม: <Badge tone="pink">{labelPlatform(idea.platform_target)}</Badge>,
              ช่วงเวลา: idea.posting_window,
              ผลกระทบ: <Badge tone={idea.expected_impact === "high" ? "green" : "amber"}>{labelImpact(idea.expected_impact)}</Badge>
            }))}
          />
        </Panel>
        <Panel title="เปรียบเทียบการมีส่วนร่วม">
          <EngagementChart
            data={viralClips.slice(0, 8).map((clip) => ({
              name: clip.id,
              engagement: Number((clip.engagement_rate_by_view * 100).toFixed(2)),
              shareability: Number((clip.shareability_score * 100).toFixed(2))
            }))}
          />
        </Panel>
        <Panel title="ไอเดียปรับจากจีนมาใช้กับไทย">
          <ul className="space-y-3 text-sm text-body">
            {benchmarkCreators
              .filter((creator) => creator.platform_group === "china_mainland_platform")
              .slice(0, 5)
              .map((creator) => (
                <li key={creator.id} className="rounded-[24px] bg-surface-soft p-4">
                  <strong>{creator.platform}</strong>: {creator.idea_to_adapt_for_thailand}
                </li>
              ))}
          </ul>
        </Panel>
        <Panel title="คำเตือนความปลอดภัยของเครื่องมือ/ปลั๊กอิน">
          <ul className="space-y-3 text-sm text-body">
            {toolsPlugins.slice(0, 5).map((tool) => (
                <li key={tool.id} className="rounded-[24px] bg-block-cream p-4">
                  <strong>{tool.tool_name}</strong>: {tool.warning_notes}
                </li>
            ))}
          </ul>
        </Panel>
      </section>
    </>
  );
}
