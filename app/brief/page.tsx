import { Badge, PageHeader, Panel, SimpleTable } from "@/components/ui";
import {
  benchmarkCreators,
  competitors,
  contentIdeas,
  events,
  seoKeywords,
  toolsPlugins,
  trendItems
} from "@/lib/seed";
import { generateWeeklyGrowthBrief } from "@/lib/weeklyBrief";
import { labelVerification } from "@/lib/thaiLabels";

export default function BriefPage() {
  const brief = generateWeeklyGrowthBrief({
    trends: trendItems,
    ideas: contentIdeas,
    events,
    competitors,
    benchmarks: benchmarkCreators,
    seoKeywords,
    tools: toolsPlugins
  });

  const sections = [
    ["1. สัปดาห์นี้ควรถ่ายอะไร", brief.shootThisWeek],
    ["2. สไตล์รีทัช/ตัดต่อ", brief.retouchEditStyle],
    ["3. โอกาสจากอีเวนต์", brief.eventOpportunity],
    ["4. ปรับรูปแบบจีนมาใช้กับไทย", brief.chinaToThailandAdaptation],
    ["5. ช่องว่างคู่แข่งที่ควรใช้", brief.competitorGapToExploit],
    ["6. หมายเหตุความปลอดภัยเครื่องมือ", brief.toolSafetyNote]
  ];

  return (
    <>
      <PageHeader
        title="สรุปแผนเติบโตประจำสัปดาห์"
        description="สรุปหน้าเดียวจากเทรนด์ อีเวนต์ SEO ช่องว่างคู่แข่ง รูปแบบจีน และคุณภาพหลักฐาน"
      />
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="คำแนะนำสำคัญที่สุด">
          <div className="rounded-[24px] bg-block-mint p-6">
            <div className="flex flex-wrap gap-2">
              <Badge tone="pink">เทรนด์หลัก: {brief.topTrend.trend_name}</Badge>
              <Badge tone="green">คะแนน {brief.topTrend.trend_score}/100</Badge>
              <Badge tone="amber">{labelVerification(brief.topTrend.verification_status)}</Badge>
              <Badge tone="purple">Tier {brief.topTrend.source_quality_tier}</Badge>
            </div>
            <p className="mt-5 text-xl font-semibold leading-8">{brief.shootThisWeek}</p>
          </div>
        </Panel>
        <Panel title="คีย์เวิร์ด Social SEO">
          <div className="flex flex-wrap gap-2">
            {brief.socialSeoKeywords.map((keyword) => (
              <Badge key={keyword} tone="blue">
                {keyword}
              </Badge>
            ))}
          </div>
        </Panel>
        <Panel title="รายละเอียดสรุปรายสัปดาห์">
          <SimpleTable
            columns={["หัวข้อ", "คำแนะนำ"]}
            rows={sections.map(([section, recommendation]) => ({
              หัวข้อ: section,
              คำแนะนำ: recommendation
            }))}
          />
        </Panel>
        <div className="grid gap-4">
          <Panel title="รูปแบบโพสต์">
            <ul className="space-y-3 text-sm text-ink">
              {brief.postFormats.map((item) => (
                <li key={item} className="rounded-[24px] bg-surface-soft p-4">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="แผนแต่ละแพลตฟอร์ม">
            <ul className="space-y-3 text-sm text-ink">
              {brief.platformPlan.map((item) => (
                <li key={item} className="rounded-[24px] bg-surface-soft p-4">
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        <Panel title="คุณภาพหลักฐาน">
          <ul className="space-y-3 text-sm text-ink">
            {brief.evidenceQuality.map((item) => (
              <li key={item} className="rounded-[24px] bg-block-cream p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="ความเสี่ยง / ต้องตรวจสอบ">
          <ul className="space-y-3 text-sm text-ink">
            {brief.risksNeedsVerification.map((item) => (
              <li key={item} className="rounded-[24px] bg-block-pink p-4">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
