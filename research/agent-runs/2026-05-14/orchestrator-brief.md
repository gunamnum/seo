# Orchestrator Weekly Brief Skeleton

Date: `2026-05-14`
Project: Organic Cosplay Growth Intelligence Dashboard
Owner: Orchestrator Agent

## Weekly Decision Frame

Decision question:

```text
What should I shoot, retouch, edit, and post this week to get more organic reach and engagement without paid ads?
```

This week should be framed around event-timed organic content, not broad trend claims. Use only labeled evidence from `research/browser-runs`; keep mock, secondary summary, and unverified radar data visible.

Allowed recommendation inputs:

| Input | Decision use | Evidence label |
|---|---|---|
| `Anime Festival Asia Thailand 2026` official event evidence | Plan pre-event shoot concepts, retouch queue, captions, and album/reel timing | `verified` |
| Props&Ops public event radar | Identify nearby cosplay event windows only after cross-check | `needs_update` |
| DataReportal Digital 2026 Thailand | Platform planning context only | `secondary_summary` |
| Google Trends opened page | Keyword/trend research queue only | `needs verification` |
| User analytics export | Not available yet | `ยังไม่พบข้อมูลยืนยัน` |
| Real competitor names/URLs | Not provided by user | `ยังไม่พบข้อมูลยืนยัน` |
| Mainland China platform evidence | Not collected this run | `ยังไม่พบข้อมูลยืนยัน` |

## Evidence Snapshot

Strong evidence:

- `Anime Festival Asia Thailand 2026`: `2026-05-30` to `2026-05-31`, QSNCC Exhibition Hall 8 Level LG. Sources: QSNCC official event calendar + AFA official page. Label: `verified`, Tier `S`, confidence `high`.
- Local dashboard import/quality routes opened successfully. Label: `verified` for route readiness only, not external market evidence.

Usable but weak evidence:

- Props&Ops event schedule rows for WCS qualifier, MAYUCOS, CXM, WCS final, and PPAO cosplay: use as event radar only. Label: `needs_update`, Tier `B`, confidence `medium`.
- DataReportal Digital 2026 Thailand: use as market context for platform roles. Label: `secondary_summary`, Tier `C`, confidence `medium`.
- Google Trends page was opened, but no export/value review exists. Label: `needs verification`.

Not available:

- TikTok / Instagram / Facebook account analytics export.
- Google Trends numeric export.
- User-provided competitor names or public URLs.
- Verified China platform pattern rows with `platform_group = china_mainland_platform`.

## Weekly Growth Brief

1. Shoot this week

Prioritize event-ready cosplay concepts that can feed AFA pre-event posts and short-form reveals. AFA is verified; other nearby event opportunities remain `needs_update` until organizer/venue cross-check.

2. Retouch/edit style this week

Prepare bright CG cosplay retouch variants, detail crops, before/after edits, and fast reveal assets. Evidence basis is AFA event timing plus existing product positioning; trend velocity is still `needs verification`.

3. Post formats this week

- TikTok: reveal, BTS, retouch timelapse, event prep. Evidence: DataReportal `secondary_summary`, not account analytics.
- Instagram: carousel, Reel reveal, save-friendly detail crop. Evidence: DataReportal `secondary_summary`.
- Facebook: album/story/context post with booking CTA. Evidence: DataReportal `secondary_summary`.

4. Platform plan

Use TikTok for discovery, Instagram for portfolio/detail retention, and Facebook for album + booking intent. Do not treat DataReportal ad-reach signals as organic performance guarantees.

5. Social SEO keywords

Keep required keywords visible in captions, alt text, and first comment:

- `ถ่ายคอสเพลย์`
- `ช่างภาพคอสเพลย์`
- `รีทัชภาพคอส`
- `cosplay thailand`
- `cosplay photography`
- `cosplay retouch`

Use fewer, event-relevant hashtags. Avoid spammy hashtag blocks.

6. Event opportunity

Primary verified event: `Anime Festival Asia Thailand 2026`, `2026-05-30` to `2026-05-31`, QSNCC Exhibition Hall 8 Level LG.

Radar events requiring cross-check:

- `Japan Week x World Cosplay Summit Thailand 2026 - รอบคัดเลือก #3`, `2026-05-16` to `2026-05-17`, Central Korat.
- `MAYUCOS 7 x MAYUCARD 1`, `2026-05-23`, Central Floresta Phuket.
- `CXM Summer Spring #4`, `2026-05-23` to `2026-05-24`, Mega Plaza สะพานเหล็ก.
- `Japan Week x World Cosplay Summit Thailand 2026 - รอบตัดสิน`, `2026-05-30` to `2026-05-31`, Central แจ้งวัฒนะ.
- `PPAO E-Sport Championship King of The Game 2026 And Cosplay`, `2026-06-06` to `2026-06-07`, Central Phitsanulok.

7. China-to-Thailand adaptation

ยังไม่พบข้อมูลยืนยัน. Do not compare China raw metrics with TikTok / Instagram / Facebook. Next China rows must include `platform_group = china_mainland_platform` and `china_adaptation_notes`.

8. Competitor gap to exploit

ยังไม่พบข้อมูลยืนยัน for real competitor names. Do not add real competitors until the user provides names or URLs. Temporary strategic gap: make event-timed, bright CG retouch proof more searchable and bookable than generic cosplay posts.

9. Evidence quality

Use AFA/QSNCC as high-confidence anchor. Treat Props&Ops as radar, DataReportal as secondary market context, Google Trends as pending, and all dashboard mock scores as mock fallback.

10. Risks / needs verification

- Trend score still lacks real velocity data.
- No user-owned analytics export.
- No manual competitor list.
- China platform research not ready.
- Props&Ops event rows need organizer/venue cross-check.
- Mock/estimated dashboard data must remain visibly labeled.

## Priority Action List

1. Build AFA pre-event content queue from verified event timing.
2. Cross-check `2026-05-16` to `2026-06-07` radar events against organizer/venue official pages.
3. Import user analytics exports for TikTok, Instagram, Facebook.
4. Export or manually record Google Trends values for required keywords.
5. Ask user for competitor names/URLs before any competitor matrix.
6. Add China pattern rows only when public, non-login evidence is available and separated.

## Open Research Gaps

| Gap | Owner agent | Current status | Required next evidence |
|---|---|---|---|
| Account performance | Trend Intelligence / Data QA | `ยังไม่พบข้อมูลยืนยัน` | TikTok / Instagram / Facebook analytics export |
| Trend velocity | Trend Intelligence | `needs verification` | Google Trends values/export and public platform observations |
| Event radar verification | Source Research | `needs_update` | Organizer or venue official pages |
| Competitor benchmark | Competitor & Benchmark | blocked | User-provided names or URLs only |
| China platform patterns | China Platform Analyst | `ยังไม่พบข้อมูลยืนยัน` | Public non-login evidence with China separation fields |
| Scoring confidence | Data QA & Scoring | partial | Normalized 0-100 inputs with source quality weights |

## Final Quality Gate Criteria

Before this brief becomes a decision-ready weekly recommendation:

- `npm test` passes if dashboard data/logic changes are made.
- `npm run build` passes if app files change.
- Every recommendation row has one visible label: `mock`, `imported`, `manual`, `estimated`, `verified`, `needs_update`, or `needs verification`.
- Mock data remains labeled as mock.
- DataReportal remains labeled `secondary_summary`, not user analytics.
- China platform rows stay separate and never compare raw China metrics with TikTok / Instagram / Facebook.
- No real competitor names are added unless manually provided by the user.
- No private/login scraping, automated engagement, minor personal data collection, cracked software, or unknown executable source is used.
- AFA/QSNCC evidence remains the only high-confidence event anchor until more official pages are checked.
