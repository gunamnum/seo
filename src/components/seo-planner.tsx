"use client";

import { useMemo, useState } from "react";
import {
  generateSeoContentPackage,
  type SeoGoal,
  type SeoLanguage,
  type SeoPlatform
} from "@/lib/seoStrategy";
import { labelLanguage, labelPlatform, labelSeoGoal } from "@/lib/thaiLabels";
import { Badge, Panel } from "./ui";

export function SeoPlanner() {
  const [platform, setPlatform] = useState<SeoPlatform>("tiktok");
  const [contentType, setContentType] = useState("ก่อน/หลังรีทัช");
  const [fandom, setFandom] = useState("จอมเวทอนิเมะ");
  const [eventName, setEventName] = useState("Mock งานคอสเพลย์");
  const [visualStyle, setVisualStyle] = useState("Bright pastel CG");
  const [retouchStyle, setRetouchStyle] = useState("ผิวสะอาด + glow นุ่ม");
  const [goal, setGoal] = useState<SeoGoal>("booking");
  const [language, setLanguage] = useState<SeoLanguage>("mixed");

  const output = useMemo(
    () =>
      generateSeoContentPackage({
        platform,
        contentType,
        fandom,
        eventName,
        visualStyle,
        retouchStyle,
        goal,
        language
      }),
    [contentType, eventName, fandom, goal, language, platform, retouchStyle, visualStyle]
  );

  const inputClass =
    "rounded-[8px] border border-hairline bg-canvas px-4 py-3 text-base text-ink outline-none focus:ring-2 focus:ring-primary/20";
  const selectGroups = [
    { label: "แพลตฟอร์ม", value: platform, setter: setPlatform, options: ["tiktok", "instagram", "facebook"], display: labelPlatform },
    { label: "เป้าหมาย", value: goal, setter: setGoal, options: ["views", "likes", "comments", "shares", "saves", "booking"], display: labelSeoGoal },
    { label: "ภาษา", value: language, setter: setLanguage, options: ["thai", "english", "mixed"], display: labelLanguage }
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
      <Panel title="ข้อมูลสำหรับสร้าง SEO">
        <div className="grid gap-3">
          {selectGroups.map((group) => (
            <label key={group.label} className="grid gap-2 text-sm font-bold">
              {group.label}
              <select className={inputClass} value={group.value} onChange={(event) => (group.setter as (value: string) => void)(event.target.value)}>
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {group.display(option)}
                  </option>
                ))}
              </select>
            </label>
          ))}
          {[
            ["ประเภทคอนเทนต์", contentType, setContentType],
            ["ตัวละคร / fandom", fandom, setFandom],
            ["ชื่องาน", eventName, setEventName],
            ["สไตล์ภาพ", visualStyle, setVisualStyle],
            ["สไตล์รีทัช", retouchStyle, setRetouchStyle]
          ].map(([label, value, setter]) => (
            <label key={label as string} className="grid gap-2 text-sm font-bold">
              {label as string}
              <input className={inputClass} value={value as string} onChange={(event) => (setter as (value: string) => void)(event.target.value)} />
            </label>
          ))}
        </div>
      </Panel>
      <Panel title="ผลลัพธ์ SEO">
        <div className="space-y-4 text-sm">
          <Output label="Caption ไทย" value={output.captionTh} />
          {output.captionEn ? <Output label="Caption อังกฤษ" value={output.captionEn} /> : null}
          <Output label="ข้อความบนจอ" value={output.onScreenText} />
          <Output label="Alt text" value={output.altText} />
          <Output label="CTA" value={output.cta} />
          <Output label="First comment แนะนำ" value={output.firstComment} />
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">Hashtags</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {output.hashtags.map((tag) => (
                <Badge key={tag} tone="pink">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Output({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">{label}</div>
      <p className="mt-2 rounded-[24px] bg-surface-soft p-4 leading-7 text-ink">{value}</p>
    </div>
  );
}
