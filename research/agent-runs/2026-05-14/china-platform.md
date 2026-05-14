# China Platform Analyst Run

Project: Organic Cosplay Growth Intelligence Dashboard  
Workspace: `C:\Users\MinusZ\Desktop\AI2`  
Agent: `China Platform Analyst`  
Date: `2026-05-14`  
Owned output: `research/agent-runs/2026-05-14/china-platform.md`

## Scope

Review current China platform separation and propose public-safe research targets for:

- `douyin`
- `xiaohongshu`
- `bilibili`
- `weibo`

Rule lock:

- China raw metrics must not be directly compared with TikTok / Instagram / Facebook metrics.
- China rows must stay under `platform_group = china_mainland_platform`.
- Treat China data as pattern intelligence unless comparable methodology is verified.
- Always include `china_adaptation_notes`.
- Use public, non-login observation only. No private scraping, no automated engagement, no personal data collection.

## Inputs Read

- `AGENTS.md`
- `src/lib/seed.ts`
- `src/lib/types.ts`
- `research/browser-runs/agent-queue.csv`
- `research/browser-runs/source-registry.csv`
- `research/browser-runs/observations.csv`
- `research/browser-runs/market-indicators.csv`
- `research/browser-runs/2026-05-14-agent-browser-collection.md`
- `research/browser-runs/2026-05-14-real-research-batch-01.md`
- `research/browser-runs/2026-05-14-real-research-batch-02.md`

## Current China Platform Separation Review

Status: mostly separated, but still mock-heavy.

Good:

- `AGENTS.md` defines China platforms separately: `douyin`, `xiaohongshu`, `bilibili`, `weibo`.
- `src/lib/types.ts` includes China platforms in `Platform`.
- `src/lib/types.ts` includes `PlatformGroup = "global_platform" | "china_mainland_platform"`.
- `src/lib/types.ts` requires `china_adaptation_notes` on `BenchmarkCreator`.
- `src/lib/seed.ts` has China trend rows with `region = "mainland_china"`.
- `src/lib/seed.ts` has China benchmark rows with `platform_group = "china_mainland_platform"`.
- `src/lib/seed.ts` already warns in `china_adaptation_notes`: use China as pattern only; do not compare raw metrics directly with global platforms.
- Current research files do not directly compare China raw metrics with TikTok / Instagram / Facebook.

Gaps:

- `research/browser-runs/source-registry.csv` has no real China source rows yet.
- `2026-05-14-real-research-batch-01.md` says: "รอบนี้ยังไม่เพิ่มข้อมูลจีนจริง".
- `2026-05-14-real-research-batch-02.md` is Thailand market signal only.
- `viralClips` has China examples only for `douyin` and `xiaohongshu`; `bilibili` and `weibo` do not appear there yet.
- Some seed arrays contain mixed global and China mock metrics in one array. They are labeled mock, but any future import must avoid treating those raw values as comparable platform performance.
- Future China CSV imports should add explicit fields: `platform_group`, `normalized_index`, `source_quality_weight`, `region_relevance_score`, `china_adaptation_notes`.

Data QA decision:

```text
Current China data = mock pattern intelligence only
Evidence status = needs verification
Recommendation confidence = low until public/manual source rows are collected
```

## Public-Safe Research Targets

Use these as manual observation targets only. If a page requires login, app-only access, CAPTCHA bypass, private profile access, or exposes minors/private users, stop and mark `needs verification`.

| Platform | Public-safe target | What to collect | Do not collect | Required label |
|---|---|---|---|---|
| `douyin` | Official Douyin public search/home surfaces such as `https://www.douyin.com/search/` | Hook pattern, first-frame style, transition/reveal format, caption keyword pattern, visible public hashtag wording | Raw view/like/follower comparisons against TikTok/IG/FB; private profiles; automated scrolling/scraping | `platform_group=china_mainland_platform`, `data_label=manual`, `source_quality_tier=B`, `confidence_level=low/medium` |
| `xiaohongshu` | Official/public RED surfaces and public learning pages such as `https://xue1.xiaohongshu.com/`; search/explore pages only if readable without login | Moodboard structure, note title style, before/after framing, portfolio carousel pattern, buyer-intent wording | App-only hidden data, login-gated notes, personal/private user details, inferred demographics | `platform_group=china_mainland_platform`, `data_label=manual`, `source_quality_tier=B`, `confidence_level=low/medium` |
| `bilibili` | Official Bilibili public search page such as `https://search.bilibili.com/all?keyword=cosplay%E6%91%84%E5%BD%B1` | Tutorial structure, title pattern, video length bucket, chapter/breakdown style, comment-theme notes without personal data | Raw play/comment/favorite comparisons against YouTube/TikTok/IG/FB; creator ranking claims without methodology | `platform_group=china_mainland_platform`, `data_label=manual`, `source_quality_tier=B`, `confidence_level=low/medium` |
| `weibo` | Weibo public search / Hot Search discovery surfaces; use public corporate description of Hot Search as feature context | Event/topic wording, public fandom hashtag style, update-thread structure, timing of public event posts | Drama-jacking, political/celebrity controversy, raw hot-search rank comparison against Thai platforms, personal account profiling | `platform_group=china_mainland_platform`, `data_label=manual`, `source_quality_tier=B/C`, `confidence_level=low` |

Suggested manual observation schema:

```csv
agent,platform,platform_group,region,source_label,source_url,source_type,collected_at,verification_status,confidence_level,data_label,source_quality_tier,trend_type,pattern_observed,normalized_index,region_relevance_score,china_adaptation_notes,cultural_mismatch_risk,notes
china_platform_analyst,douyin,china_mainland_platform,mainland_china,Douyin public search,https://www.douyin.com/search/,public_observation,2026-05-14,pending_browser_review,low,needs verification,B,clip_format,ยังไม่พบข้อมูลยืนยัน,,,,
```

## Platform Pattern Radar

### Douyin

Pattern to watch:

- 1-second character reveal
- fast before/after retouch payoff
- BTS-to-final transition
- strong first-frame costume/face/prop signal
- short caption with one visual promise

Thailand adaptation:

- Convert to TikTok/Reels short reveal: `ภาพจบ -> RAW -> 2 retouch steps -> CTA`.
- Tie hook to Thai events: `AFA Thailand 2026`, local cosplay meetups, quick portrait queue.
- Keep Thai searchable keywords: `ถ่ายคอสเพลย์`, `รีทัชภาพคอส`, `cosplay thailand`.

`china_adaptation_notes`:

```text
Use Douyin as short-form structure inspiration only. Do not use Douyin raw metrics as TikTok/Instagram performance evidence.
```

Cultural mismatch risks:

- China pacing/slang may feel too aggressive in Thai cosplay community.
- Beauty-filter norms can conflict with authentic portrait trust.
- Avoid copying viral formats tied to China-only memes or celebrity drama.

### Xiaohongshu / RED

Pattern to watch:

- moodboard-first note
- clean lifestyle framing
- carousel-like visual proof
- detail crops for makeup/costume/retouch
- soft recommendation language

Thailand adaptation:

- Convert to Instagram carousel and Facebook album story.
- Structure: `hero image -> detail crop -> before/after -> retouch note -> booking CTA`.
- Use fewer hashtags, stronger search caption, and alt text.

`china_adaptation_notes`:

```text
Use RED for portfolio packaging and buyer-intent wording. Do not infer Thai demand from RED engagement or China lifestyle norms.
```

Cultural mismatch risks:

- RED aspirational tone can feel too sales-heavy if copied directly.
- Over-polished skin/face editing may reduce trust for Thai booking.
- Avoid lifestyle claims that imply client identity, income, body type, age, or private behavior.

### Bilibili

Pattern to watch:

- retouch/tutorial breakdown
- long-form BTS
- convention field-report style
- fandom explanation and process storytelling
- title patterns that promise a clear learning payoff

Thailand adaptation:

- Convert one Bilibili-style breakdown into:
  - 1 Facebook album story
  - 1 YouTube/long-form tutorial if available
  - 3 TikTok/Reels cuts: hook, process, final result
- Use it for authority content, not only reach content.

`china_adaptation_notes`:

```text
Use Bilibili as process-depth inspiration. Normalize any signal within Bilibili only before passing to scoring.
```

Cultural mismatch risks:

- Long explainers may underperform on Thai short-form feeds if posted unchanged.
- Fandom references may need Thai context.
- Tutorial depth must not expose client/private workflow details without consent.

### Weibo

Pattern to watch:

- public event thread
- fandom hashtag wording
- fast public update cadence
- official/creator announcement style
- recap threads around public events

Thailand adaptation:

- Convert to Facebook post/thread and Instagram story sequence.
- Use event radar format: `before event -> event day -> 24h recap -> final retouch showcase`.
- Keep tone informative, not drama-driven.

`china_adaptation_notes`:

```text
Use Weibo for public event/fandom timing patterns only. Do not map Weibo Hot Search rank or raw topic heat to Thai platform priority.
```

Cultural mismatch risks:

- Weibo Hot Search is a China-specific discovery system and not equivalent to Thai TikTok/IG/FB trends.
- Celebrity/fandom conflict cycles should not become content hooks.
- Avoid political, sensitive, or controversy-led topics.

## China-to-Thailand Adaptation Ideas

1. `Character reveal in 1 second`
   - Source pattern: Douyin-style quick reveal.
   - Thai output: TikTok/Reels `ภาพจบก่อน`, then RAW and 2 edit steps.
   - Risk: if too fast, viewers may not see craft value. Add one readable Thai on-screen phrase.

2. `Moodboard to booking carousel`
   - Source pattern: Xiaohongshu-style note packaging.
   - Thai output: Instagram carousel with moodboard, crop detail, retouch note, CTA.
   - Risk: avoid copying China lifestyle tone. Make it practical for Thai cosplayers preparing for events.

3. `Retouch breakdown as authority content`
   - Source pattern: Bilibili process/tutorial.
   - Thai output: Facebook album story plus short-form cuts.
   - Risk: protect client consent and do not reveal private RAW files unless user owns/approves them.

4. `Event thread rhythm`
   - Source pattern: Weibo event/fandom update cadence.
   - Thai output: Facebook event radar, Story updates, post-event recap within 24-48 hours.
   - Risk: avoid drama-driven hashtags; focus on public event value and booking readiness.

5. `China visual style radar`
   - Source pattern: bright fantasy, clean skin, strong costume detail, fast payoff.
   - Thai output: bright CG cosplay signature with softer Thai caption and clear booking CTA.
   - Risk: do not over-retouch until identity/costume detail looks artificial.

## Data Handling Rules For Next Import

Required for every China row:

```text
platform_group = china_mainland_platform
region = mainland_china
verification_status = pending_browser_review | opened_in_browser | needs_update | verified
data_label = manual | imported | estimated | needs verification
source_quality_tier = S | B | C | D
china_adaptation_notes = required
cultural_mismatch_risk = required
```

Allowed comparison:

```text
Compare China pattern types, normalized_index, source_quality_weight, region_relevance_score
```

Forbidden comparison:

```text
Do not compare Douyin/Xiaohongshu/Bilibili/Weibo raw views, likes, comments, saves, shares, followers, or Hot Search ranks directly with TikTok/Instagram/Facebook raw metrics.
```

## Handoff To Other Agents

Trend Intelligence Agent:

- Use China inputs as `pattern intelligence`.
- If scoring, use `normalized_index` 0-100 within each China platform only.
- Apply confidence penalty until source rows are manually collected and labeled.

SEO & Content Strategy Agent:

- Convert only pattern-level insights into Thai captions/hooks.
- Keep required Thai keywords.
- Do not translate China slang directly unless manually verified with Thai audience context.

Data QA & Scoring Agent:

- Reject China rows without `platform_group = china_mainland_platform`.
- Reject China rows missing `china_adaptation_notes`.
- Warn if raw China metrics appear in global platform comparison tables.

Orchestrator Agent:

- Treat current China output as `needs verification`.
- Use for idea generation this week, not for final performance ranking.

## Public Sources Used

- Douyin public search surface: https://www.douyin.com/search/
- Xiaohongshu public learning surface: https://xue1.xiaohongshu.com/
- Bilibili public search result target: https://search.bilibili.com/all?keyword=cosplay%E6%91%84%E5%BD%B1
- Weibo public company report context for Hot Search / topic discovery: https://weibocorporation.gcs-web.com/static-files/56f4daf4-e1fc-4036-a79f-387f8b40c0c7

## Final Analyst Note

No real China metrics were imported in this run. Current China value is directional creative intelligence only:

```text
Douyin = short reveal structure
Xiaohongshu / RED = portfolio and buyer-intent packaging
Bilibili = retouch/tutorial depth
Weibo = public event and fandom thread timing
```

Evidence quality:

```text
low until manual public observations are collected
```
