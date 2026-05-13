import { describe, expect, it } from "vitest";
import { generateContentIdea } from "./contentIdeas";
import { events, trendItems } from "./seed";

describe("content idea generator", () => {
  it("generates required fields", () => {
    const idea = generateContentIdea({
      trend: trendItems[0],
      event: events[0],
      platform: "tiktok",
      visualStyle: "bright pastel CG",
      targetAudienceSegment: "Core Cosplayer",
      goal: "booking",
      effort: "medium"
    });

    expect(idea.title).toContain(trendItems[0].trend_name);
    expect(idea.hook).toContain("RAW");
    expect(idea.caption_th).toContain("ถ่ายคอสเพลย์");
    expect(idea.hashtags.length).toBeGreaterThan(0);
    expect(idea.shot_list).toContain("หน้าจอ RAW");
    expect(idea.retouch_notes).toContain("ผิวให้สะอาด");
  });
});
