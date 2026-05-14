# Data QA & Scoring Report

Date: `2026-05-14`
Owner: Data QA & Scoring Agent
Scope: `C:\Users\MinusZ\Desktop\AI2`

## Inputs Read

- `AGENTS.md`
- `src/lib/types.ts`
- `src/lib/seed.ts`
- `src/lib/scoring.ts`
- `src/lib/csv.ts`
- `src/lib/dataQa.ts`
- `research/browser-runs/agent-queue.csv`
- `research/browser-runs/market-indicators.csv`
- `research/browser-runs/observations.csv`
- `research/browser-runs/source-registry.csv`
- `research/agent-runs/2026-05-14/orchestrator-brief.md`

## Verification

`npm test` passed.

Result:

```text
Test Files  11 passed (11)
Tests       36 passed (36)
```

## Overall Status

PASS WITH QUESTION

The evidence labels are directionally correct, but CSV parse safety and schema normalization need fixes before these browser-run files are used as import-ready data. China benchmark seed data is separated correctly, but this run still has no verified China platform evidence.

## CSV Validation Findings

| File | Status | Finding |
|---|---|---|
| `research/browser-runs/source-registry.csv` | NEED REVISION | Line 5 has a Google Trends URL with unquoted commas. `Import-Csv` shifts columns: `source_type=cosplay%20photography`, `platform=cosplay%20thailand`, `verification_status=2026-05-14`, `data_label=false`. Quote URLs containing commas before consuming this file. |
| `research/browser-runs/agent-queue.csv` | NEED REVISION | Line 4 has the same unquoted Google Trends URL issue. `allowed_collection`, `next_output`, `blocked_by`, and `notes` shift columns. |
| `research/browser-runs/source-registry.csv` | NEED NORMALIZATION | Uses registry-specific values outside `src/lib/types.ts`: `source_type=local_app`, `official_event_page`, `public_event_schedule`, `search_engine_results`, `secondary_summary_report`; `verification_status=opened_in_browser`, `verified_in_browser`; `source_quality_tier=local`; `platform_group=project_local`, `thailand_event`, `thailand_market`, `public_web`, `global_platform_tool`. |
| `research/browser-runs/observations.csv` | NEED NORMALIZATION | Uses `verification_status=verified_in_browser/opened_in_browser` and `platform_group=thailand_event`, which are useful browser-run labels but not app schema enums. |
| `research/browser-runs/market-indicators.csv` | NEED CLARITY | Uses `data_label=secondary_summary`, which appears in the orchestrator brief but is not in AGENTS.md allowed data labels or `DataQaReport["data_labels"]`. |
| `research/browser-runs/agent-queue.csv` | OK AS OPS QUEUE | This is an operational queue, not evidence. Keep it out of evidence scoring unless metadata columns are added. |

Recommended normalization if browser-run CSVs feed app data:

| Browser-run value | Import-safe value |
|---|---|
| `verified_in_browser` | `verified` |
| `opened_in_browser` | `needs_verification` or `needs_update` depending on row purpose |
| `official_event_page` | `official_source` |
| `public_event_schedule` | `public_observation` |
| `secondary_summary_report` | `secondary_summary` |
| `search_engine_results` | `public_observation` with `data_label=needs verification` |
| `local_app` / `source_quality_tier=local` | exclude from research evidence, or map to separate route QA artifact |

## Label And Confidence Findings

| Area | Status | Notes |
|---|---|---|
| AFA/QSNCC event evidence | PASS | `observations.csv` labels AFA rows as `verified`, confidence `high`; source registry has Tier `S`. This is the only strong event anchor. |
| Props&Ops radar rows | PASS WITH QUESTION | `observations.csv` uses `needs_update`, confidence `medium`; this correctly prevents final claims until organizer/venue cross-check. |
| Google Trends | NEED REVISION | Orchestrator says `needs verification`, but CSV parse corruption prevents reliable machine validation. No numeric trend export exists. |
| DataReportal | NEED CLARITY | `market-indicators.csv` labels rows `secondary_summary`; `source-registry.csv` labels the same source `verified`. Keep both concepts visible: source opened/verified, but evidence use is `secondary_summary` market context only, not account analytics. |
| Mock seed data | PASS WITH QUESTION | `mockResearchFields()` marks `is_mock_data=true`, `is_estimated=true`, Tier `D`, `verification_status=needs_verification`. Labels are strong, but some stored confidence values can still look too confident. |
| Mock market indicators | NEED QA CHECK | `mockMarketIndicators` can assign `confidence_level=high` while still using `is_mock_data=true`, `is_estimated=true`, Tier `D`. Confidence display should downgrade or show a hard mock warning. |
| AFA trend score | NEED QA CHECK | `trend-afa-thailand-2026` uses verified event timing but mock trend metrics. Notes disclose this, but `confidence_level` comes from score-input completeness rather than source quality. |

## Schema Findings

- `ResearchMetadata` includes `is_mock_data`, but `researchMetadataColumns` in `src/lib/csv.ts` does not require `is_mock_data`.
- `researchMetadataColumns` also does not require `data_label`, `confidence_level`, `collected_at`, `updated_at`, or `notes`, even though AGENTS.md treats these as practical evidence fields.
- `VerificationStatus` uses `needs_verification`, while AGENTS.md display label uses `needs verification`. Keep machine enum and human label mapped explicitly.
- Browser-run CSVs use richer operational labels than TypeScript enums. That is fine for audit logs, but unsafe for direct import without a normalizer.

## China Data Separation

Status: PASS FOR SEED, NO VERIFIED RUN DATA

- `src/lib/seed.ts` sets China benchmark rows with `platform_group = "china_mainland_platform"`.
- China benchmark rows include `china_adaptation_notes` and warn not to compare raw China metrics with TikTok / Instagram / Facebook.
- `app/benchmarks/page.tsx`, `app/china/page.tsx`, and `src/lib/competitorBenchmark.ts` filter China benchmark rows separately.
- `research/browser-runs/*.csv` has no verified China platform evidence rows. This matches the orchestrator brief: `ยังไม่พบข้อมูลยืนยัน`.
- `TrendItem` and `ViralClip` can contain China platforms/regions but do not carry `platform_group`; QA cannot enforce China separation for those record types yet.
- If China trend/clip rows are compared with global rows, use `normalized_index`, `platform_group`, `source_quality_weight`, and `region_relevance_score`; never compare raw views/likes/current metrics directly.

## Scoring QA Checks To Add

1. CSV parse integrity: every data row must have the same column count as the header. Add a fixture with a Google Trends URL containing commas and require proper quoting.
2. Browser-run normalization: map `verified_in_browser/opened_in_browser` and source registry values to app-safe enums before import.
3. Metadata completeness: require `is_mock_data`, `is_estimated`, `is_user_provided`, `data_label`, `source_quality_tier`, `confidence_reason`, and at least one date field for non-ops evidence rows.
4. Mock confidence cap: if `is_mock_data=true`, `is_estimated=true`, or `source_quality_tier=D`, final confidence should not display as `high`.
5. Secondary summary cap: if `source_type=secondary_summary`, data can be verified as a source but must remain market context, not account performance evidence.
6. Trend score recompute: keep current check that stored `trend_score` equals `calculateTrendScore()` output.
7. Score input range: keep current 0-100 normalized check for `velocity`, `audio_format_velocity`, `cross_platform_signal`, `event_relevance_thailand`, `visual_fit_bright_cg_cosplay`, and `competition_gap`.
8. Source quality weighting: add a scoring layer after `calculateTrendScore()` that applies confidence penalties for Tier `C/D`, mock, estimated, missing sample size, and `needs_verification`.
9. China platform gate: any row with `platform in douyin/xiaohongshu/bilibili/weibo` must have `platform_group=china_mainland_platform` when the schema supports it.
10. Raw metric comparison gate: block cross-region charts/tables that compare China raw metrics directly with TikTok / Instagram / Facebook raw metrics.
11. DataReportal guard: require label text such as `secondary_summary` or `market context only`; do not present as user analytics.
12. UI label smoke: every recommendation/table row must show one visible label from the allowed data-label taxonomy plus source quality when available.

## Decision Use

Allowed now:

- Use AFA/QSNCC official evidence for event-timed planning.
- Use Props&Ops rows only as `needs_update` event radar.
- Use DataReportal only as `secondary_summary` market context.
- Use seed trends/competitors/benchmarks/content ideas only as mock fallback with visible labels.

Blocked until more evidence:

- Real trend velocity claims.
- User account performance claims.
- Real competitor matrix.
- Verified China platform pattern claims.
- Any recommendation that treats mock score confidence as high-confidence market truth.
