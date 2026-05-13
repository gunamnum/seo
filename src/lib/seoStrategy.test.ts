import { describe, expect, it } from "vitest";
import { generateSeoContentPackage, requiredThaiSeoKeywords } from "./seoStrategy";

const baseInput = {
  platform: "tiktok" as const,
  contentType: "before-after retouch",
  fandom: "anime mage",
  eventName: "Mock Cosplay Event",
  visualStyle: "bright pastel CG",
  retouchStyle: "clean skin + soft glow",
  goal: "booking" as const,
  language: "mixed" as const
};

describe("SEO content strategy", () => {
  it("generates all required SEO output fields", () => {
    const output = generateSeoContentPackage(baseInput);

    expect(output.captionTh).toContain("ถ่ายคอสเพลย์");
    expect(output.captionEn).toContain("cosplay photography");
    expect(output.onScreenText).toContain("RAW");
    expect(output.altText).toContain("anime mage");
    expect(output.cta).toContain("จองคิว");
    expect(output.firstComment).toContain("Mock Cosplay Event");
    expect(output.searchKeywords).toEqual(expect.arrayContaining([...requiredThaiSeoKeywords]));
  });

  it("keeps hashtags focused and avoids spam blocks", () => {
    const output = generateSeoContentPackage(baseInput);

    expect(output.hashtags.length).toBeLessThanOrEqual(6);
    expect(new Set(output.hashtags).size).toBe(output.hashtags.length);
    expect(output.hashtags.every((tag) => tag.startsWith("#"))).toBe(true);
  });

  it("uses short captions for TikTok/Reels and richer Facebook captions", () => {
    const tiktok = generateSeoContentPackage(baseInput);
    const facebook = generateSeoContentPackage({ ...baseInput, platform: "facebook" });

    expect(tiktok.captionTh.length).toBeLessThan(facebook.captionTh.length);
    expect(facebook.captionTh).toContain("Mock Cosplay Event");
    expect(facebook.captionTh).toContain("ทักมาจองคิว");
  });
});
