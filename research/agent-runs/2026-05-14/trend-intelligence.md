# Trend Intelligence Agent Run - 2026-05-14

Owner: Trend Intelligence Agent  
Workspace: `C:\Users\MinusZ\Desktop\AI2`  
Owned output: `research/agent-runs/2026-05-14/trend-intelligence.md`  
Inputs read: `AGENTS.md`, `src/lib/seed.ts`, `research/browser-runs/*`  
Rule: no real-time trend claim without exported/current evidence.

## 1. Evidence Split

| Evidence group | Current status | Use allowed | Do not use for |
|---|---|---|---|
| AFA Thailand 2026 official event evidence | verified, Tier S | event timing, shoot plan, pre/post event content | hashtag velocity, reach forecast, engagement forecast |
| QSNCC official event calendar | verified, Tier S | venue/date/event context | platform trend score |
| DataReportal Digital 2026 Thailand | verified secondary_summary, Tier C | broad Thailand platform market signal | account-level performance, 7-day trend velocity |
| Google Trends Explore URL | opened official tool, Tier S, needs verification | source target for export/manual review | trend velocity until value/export is captured |
| Props&Ops event schedule | public_observation, Tier B, needs_update | event radar only | confirmed event recommendation until organizer/venue cross-check |
| WCS official Thailand country page | official source, Tier S, needs_update | confirms Thailand WCS presence/context | exact venue/date rows without cross-check |
| `src/lib/seed.ts` trend metrics | mock_seed, Tier D | UI demo, scoring placeholder, planning hypothesis | real trend recommendation |
| `src/lib/seed.ts` viral clips/experiments/SEO priorities | mock_seed, Tier D | demo examples only | benchmark truth, competitor truth, reach claim |

### Verified / Secondary Facts Available

- `Anime Festival Asia Thailand 2026` is official and scheduled for `2026-05-30` to `2026-05-31` at QSNCC Exhibition Hall 8, Level LG.
- AFA official page confirms `Anime Festival Asia Thailand 2026` on `30 & 31 May 2026` at Queen Sirikit National Convention Center.
- DataReportal reports Thailand had `56.6M social media user identities` in October 2025 and gives platform ad-reach signals for TikTok, Facebook, and Instagram. Treat these as market context only.
- Props&Ops event rows are useful for weekly radar, but remain `needs_update` until each item is checked with organizer/venue official sources.

### Mock Trend Metrics To Keep Labeled

From `src/lib/seed.ts`:

- `trend-afa-thailand-2026` uses a real AFA event context, but its `current_metric`, `previous_metric`, `velocity`, `audio_format_velocity`, `cross_platform_signal`, `event_relevance_thailand`, `visual_fit_bright_cg_cosplay`, `competition_gap`, and `trend_score` are still mock/estimated.
- `trendNames.map(...)` produces `trend-1` onward via `mockResearchFields()`. All are `is_mock_data=true`, `is_estimated=true`, `source_quality_tier=D`.
- `viralClips`, `experiments`, most `seoKeywords`, and most `contentIdeas` are mock seed data.
- Do not present any mock `trend_score` as current market truth.

## 2. 7-Day Trend Research Plan

| Day | Platform / input | Collection method | Required fields | Output label |
|---:|---|---|---|---|
| 1 | Setup + source registry | freeze query list, confirm no login/private scraping, prepare manual sheet | `source_label`, `source_url`, `source_type`, `collected_at`, `verification_status`, `confidence_level`, `data_label` | setup_ready |
| 2 | TikTok | user analytics export or manual public observation, no automated engagement | post URL, post date, views, likes, comments, shares, saves if available, hook, sound/format, hashtags | imported/manual |
| 3 | Instagram | user Insights export or manual public observation | Reel/carousel URL, reach/views, saves, shares, comments, post date, format, keywords | imported/manual |
| 4 | Facebook | user Page Insights export or manual public page observation | post URL, reach/views if owned export, reactions, comments, shares, album/link type, CTA | imported/manual |
| 5 | Google Trends | manual export/screenshot for Thailand, 7-day and 30-day windows | keyword, geo=`TH`, timeframe, value series, related queries if visible, export timestamp | verified if exported |
| 6 | Manual inputs | event radar + user-provided competitor URLs only | event name/date/source, competitor URL if user-provided, notes, consent/visibility check | manual/needs_update |
| 7 | QA + weekly brief | normalize fields, apply penalties, reject unlabeled rows, write recommendation | normalized scores, penalties, final confidence, open gaps | recommendation_ready |

### Query Set For Week 1

- `ถ่ายคอสเพลย์`
- `ช่างภาพคอสเพลย์`
- `รีทัชภาพคอส`
- `cosplay thailand`
- `cosplay photography`
- `cosplay retouch`
- `AFA Thailand 2026`
- `AFATH26 cosplay`

## 3. Normalized Score Inputs

All inputs must be normalized `0-100`. Keep raw values separately.

| Input | Definition | Suggested normalization |
|---|---|---|
| `hashtag_keyword_velocity` | 7-day growth for keyword/hashtag/search query | compare current 7-day value vs previous 7-day baseline; unknown = `0` + penalty |
| `audio_format_velocity` | repeated sound/template/clip format momentum | count matching samples this week vs previous week; no sample = `0` |
| `cross_platform_signal` | signal across TikTok, Instagram, Facebook, Google Trends, manual input | positive platforms / checked platforms * 100, weighted by source quality |
| `event_relevance_thailand` | fit with Thailand cosplay event timing | verified event within 14 days = high; public radar only = cap 70 |
| `visual_fit_bright_cg_cosplay` | fit with bright CG cosplay photography/retouch positioning | manual rubric: final-image payoff, color fit, retouch visibility, portfolio value |
| `competition_gap` | opportunity not saturated by known Thai cosplay photographers | cap 55 until user provides competitor URLs manually |
| `recency_score` | freshness of source | collected <=7 days = 100, 8-14 = 70, 15-30 = 40, older = 10 |
| `sample_size_score` | reliability of sample | >=30 rows = 100, 15-29 = 75, 5-14 = 45, <5 = 15 |
| `source_quality_weight` | source trust multiplier | S/A = 1.00, B = 0.75, C = 0.55, D = 0.25 |

Suggested formula for next scoring pass:

```text
base_score =
  0.18 * hashtag_keyword_velocity +
  0.14 * audio_format_velocity +
  0.16 * cross_platform_signal +
  0.18 * event_relevance_thailand +
  0.16 * visual_fit_bright_cg_cosplay +
  0.10 * competition_gap +
  0.05 * recency_score +
  0.03 * sample_size_score

final_score = clamp(round(base_score * source_quality_weight - confidence_penalties), 0, 100)
```

Current dashboard `trend_score` should remain `mock fallback` until these inputs are imported from real/exported data.

## 4. Confidence Penalties

| Condition | Penalty / cap |
|---|---|
| `is_mock_data=true` | `-35`, confidence max `low`, data label `mock` |
| `is_estimated=true` | `-15`, confidence max `medium` |
| no `source_url` | `-20` |
| source is search result only | `-20`, label `needs verification` |
| Google Trends opened but no export/value | `-25`, no velocity claim |
| no previous 7-day baseline | `-15` |
| sample size `<10` | `-20` |
| source older than 14 days | `-15` |
| Props&Ops-only event row | cap `event_relevance_thailand <=70`, label `needs_update` |
| competitor gap without user-provided competitor URLs | cap `competition_gap <=55` |
| China platform raw metric compared directly with global platforms | reject row until normalized |

Confidence rule:

```text
high = S/A source + current/exported values + sample/baseline present
medium = B/C source + partial current evidence + clear caveats
low = mock, estimated, missing export, weak sample, or needs verification
```

## 5. Recommended Content Angles

### 1. AFA Countdown: final image first, then retouch proof

- Platforms: TikTok/Reels first, then Instagram carousel and Facebook album CTA.
- Hook: `AFA Thailand 2026 ถ่ายคอสเพลย์ให้ภาพจบตั้งแต่วินาทีแรก`
- Format: 8-15 sec reveal: final image -> RAW -> retouch step -> final crop -> booking CTA.
- SEO keywords: `ถ่ายคอสเพลย์`, `รีทัชภาพคอส`, `cosplay thailand`, `cosplay retouch`.
- Evidence: AFA/QSNCC official event date and venue verified; DataReportal supports TikTok/IG/Facebook as large Thailand social surfaces.
- Confidence: medium-high for event relevance, low for trend velocity until analytics/Google Trends export exists.

### 2. IG Save-Friendly Detail Carousel

- Platforms: Instagram primary, Facebook album repost.
- Hook: `before/after รีทัชภาพคอสแบบ bright CG ที่ดูไม่ล้น`
- Format: hero image, crop detail, before/after, 3 retouch notes, CTA.
- SEO keywords: `ช่างภาพคอสเพลย์`, `cosplay photography`, `cosplay retouch`.
- Evidence: DataReportal secondary signal says Instagram has meaningful Thailand ad-reach scale; current seed visual style is mock but aligned with product positioning.
- Confidence: medium for platform fit, low for expected engagement until user-owned Insights export exists.

### 3. Event Radar Short: what to shoot this weekend

- Platforms: Facebook for event context, TikTok/Reels for quick checklist.
- Hook: `สัปดาห์นี้คอสเพลย์ควรถ่ายอะไรให้เอาไปลงต่อได้`
- Format: event checklist, pose idea, lighting note, one retouch example, no claim of official confirmation unless source is verified.
- Evidence: AFA is verified; WCS/Props&Ops rows are event radar and `needs_update`.
- Confidence: medium for AFA, low-medium for Props&Ops-only events until organizer/venue official cross-check.

## 6. Open Gaps

- ยังไม่มี TikTok / Instagram / Facebook user-owned analytics export.
- ยังไม่มี Google Trends value export สำหรับ 7-day/30-day velocity.
- ยังไม่มี user-provided competitor URLs, so `competition_gap` must stay capped.
- Props&Ops event radar needs organizer/venue cross-check before high-confidence recommendation.
- Current `src/lib/seed.ts` trend numbers are useful for UI, not business decisions.

## 7. Public Sources Used

- QSNCC official event calendar - Anime Festival Asia Thailand 2026: https://www.qsncc.com/en/whats-on/event-calendar/anime-festival-asia-thailand-2026/
- AFA Thailand 2026 official page: https://animefestival.asia/afath26/
- World Cosplay Summit Thailand page: https://wcc.worldcosplaysummit.jp/en/player-2026/thailand/
- Props&Ops public cosplay event schedule: https://propsops.com/event/
- DataReportal Digital 2026 Thailand: https://datareportal.com/reports/digital-2026-thailand
- Google Trends Explore target: https://trends.google.com/trends/explore?geo=TH&q=%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%AA%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%A2%E0%B9%8C,cosplay%20photography,cosplay%20thailand
