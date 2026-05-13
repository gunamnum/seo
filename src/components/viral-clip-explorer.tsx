"use client";

import { useMemo, useState } from "react";
import { formatPercent } from "@/lib/metrics";
import { labelCgLevel, labelContentType, labelPlatform } from "@/lib/thaiLabels";
import type { ViralClip } from "@/lib/types";
import { Badge, FilterBar, SimpleTable } from "./ui";

export function ViralClipExplorer({ clips }: { clips: ViralClip[] }) {
  const [platform, setPlatform] = useState("all");
  const [contentType, setContentType] = useState("all");
  const [visualStyle, setVisualStyle] = useState("all");
  const [sortBy, setSortBy] = useState("views");
  const [selectedId, setSelectedId] = useState(clips[0]?.id);

  const platforms = useMemo(() => Array.from(new Set(clips.map((clip) => clip.platform))), [clips]);
  const contentTypes = useMemo(() => Array.from(new Set(clips.map((clip) => clip.content_type))), [clips]);
  const styles = useMemo(() => Array.from(new Set(clips.map((clip) => clip.visual_style))), [clips]);

  const filtered = useMemo(() => {
    return clips
      .filter((clip) => platform === "all" || clip.platform === platform)
      .filter((clip) => contentType === "all" || clip.content_type === contentType)
      .filter((clip) => visualStyle === "all" || clip.visual_style === visualStyle)
      .sort((a, b) => {
        if (sortBy === "engagement") return b.engagement_rate_by_view - a.engagement_rate_by_view;
        if (sortBy === "shareability") return b.shareability_score - a.shareability_score;
        if (sortBy === "saves") return b.saves - a.saves;
        return b.views - a.views;
      });
  }, [clips, contentType, platform, sortBy, visualStyle]);

  const selected = useMemo(
    () => filtered.find((clip) => clip.id === selectedId) ?? filtered[0],
    [filtered, selectedId]
  );

  const selectClass =
    "rounded-full border border-hairline bg-canvas px-4 py-2.5 text-sm font-medium text-ink outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
      <div className="rounded-[24px] border border-hairline bg-canvas p-5 shadow-none">
        <FilterBar>
          <select className={selectClass} value={platform} onChange={(event) => setPlatform(event.target.value)}>
            <option value="all">ทุกแพลตฟอร์ม</option>
            {platforms.map((item) => (
              <option key={item} value={item}>
                {labelPlatform(item)}
              </option>
            ))}
          </select>
          <select className={selectClass} value={contentType} onChange={(event) => setContentType(event.target.value)}>
            <option value="all">ทุกประเภทคอนเทนต์</option>
            {contentTypes.map((item) => (
              <option key={item} value={item}>
                {labelContentType(item)}
              </option>
            ))}
          </select>
          <select className={selectClass} value={visualStyle} onChange={(event) => setVisualStyle(event.target.value)}>
            <option value="all">ทุกสไตล์ภาพ</option>
            {styles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select className={selectClass} value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="views">เรียงตามยอดดู</option>
            <option value="engagement">เรียงตามอัตราการมีส่วนร่วม</option>
            <option value="shareability">เรียงตามคะแนนการแชร์</option>
            <option value="saves">เรียงตามยอดบันทึก</option>
          </select>
        </FilterBar>
        <SimpleTable
          columns={["คลิป", "แพลตฟอร์ม", "ยอดดู", "อัตราการมีส่วนร่วม", "คะแนนการแชร์", "Hook"]}
          rows={filtered.map((clip) => ({
            คลิป: (
              <button className="font-bold text-ink underline-offset-2 hover:underline" onClick={() => setSelectedId(clip.id)}>
                {clip.creator_display_name}
              </button>
            ),
            แพลตฟอร์ม: <Badge tone="blue">{labelPlatform(clip.platform)}</Badge>,
            ยอดดู: clip.views.toLocaleString(),
            อัตราการมีส่วนร่วม: formatPercent(clip.engagement_rate_by_view),
            คะแนนการแชร์: formatPercent(clip.shareability_score),
            Hook: clip.hook_text
          }))}
        />
      </div>
      <aside className="rounded-[24px] border border-hairline bg-canvas p-6 shadow-none">
        <h3 className="text-lg font-black">รายละเอียดคลิป</h3>
        {selected ? (
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">รูปแบบ Hook</div>
              <div className="mt-1 font-semibold">{selected.hook_text}</div>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">บทเรียนที่ได้</div>
              <p className="mt-1 text-ink">{selected.lesson_learned}</p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">ไอเดียที่ควรปรับใช้</div>
              <p className="mt-1 text-ink">{selected.idea_to_adapt}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge tone="pink">{labelContentType(selected.content_type)}</Badge>
              <Badge tone="purple">{selected.visual_style}</Badge>
              <Badge tone="amber">{labelCgLevel(selected.cg_level)}</Badge>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
