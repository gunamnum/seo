# Competitor & Benchmark Agent Audit

Date: `2026-05-14`  
Workspace: `C:\Users\MinusZ\Desktop\AI2`  
Owned output: `research/agent-runs/2026-05-14/competitor-benchmark.md`  
Scope: competitor safety audit only. No real competitor collection was performed.

## Result

PASS: no real Thai cosplay photographer competitor names were found in the inspected seed/research data without manual user input.

Current state:

- Thai competitor seed data uses 8 obvious mock names: `Mock ช่างภาพอีเวนต์ไทย A` through `Mock ช่างภาพ Reels First H`.
- All seed competitor rows inherit mock metadata from `mockResearchFields("ข้อมูล mock คู่แข่งไทย")`.
- Competitor seed URLs use `https://example.com/mock-thai-competitor-*`.
- Competitor notes say: `คู่แข่ง mock ต้องแทนด้วยข้อมูลที่ผู้ใช้กรอกเองเท่านั้น`.
- Research handoff says Competitor & Benchmark Agent is `waiting_user_input`.
- Browser research notes say no real competitor names/URLs have been collected because the user has not provided them.
- Asian benchmark creator names are generic mock labels: `Mock Creator Benchmark เอเชีย *`.
- China benchmark rows stay separated with `platform_group = china_mainland_platform`.

## Audited Files

| File | Audit point | Finding |
|---|---|---|
| `AGENTS.md` | Competitor safety rules | Real competitor names must come from manual user input only. Thai competitor matrix must be Thailand-only. |
| `src/lib/seed.ts` | `competitors` seed | All names are obvious mock names and all URLs are `example.com`. |
| `src/lib/seed.ts` | `benchmarkCreators` seed | Benchmark names are mock/generic and separated from Thai competitors. |
| `src/lib/types.ts` | schema | `Competitor.country_or_region` is restricted to `"thailand"`; no sensitive attribute fields exist in competitor/benchmark types. |
| `src/lib/competitorBenchmark.ts` | guard logic | Flags non-Thai competitors, real-not-manual competitors, and mock rows with non-obvious mock names. |
| `research/browser-runs/agent-queue.csv` | agent status | `competitor_benchmark` is blocked by `manual competitor names or URLs required`. |
| `research/browser-runs/2026-05-14-agent-browser-collection.md` | collection rule | States real competitor names are forbidden unless manually provided. |
| `research/browser-runs/2026-05-14-real-research-batch-01.md` | batch note | States no real competitor collection occurred and competitor URLs are missing. |

## Safety Checklist

| Rule | Status | Evidence |
|---|---:|---|
| Real competitor names manual-only | PASS | No real names found; queue remains blocked on user input. |
| Thai competitor matrix Thailand-only | PASS | Seed `Competitor.country_or_region = "thailand"` and type restricts it. |
| Mock names obvious | PASS | All seed competitor display names start with `Mock`. |
| No sensitive segmentation | PASS | No gender, age, ethnicity, income, body, private behavior, or minor-status fields found. |
| Public strategy only | PASS | Current competitor rows are mock; no scraping or private collection was performed. |
| Thai competitors separate from Asian benchmarks | PASS | Separate arrays: `competitors` and `benchmarkCreators`. |
| China metrics separated | PASS | China benchmark rows use `platform_group = china_mainland_platform`; notes warn not to compare raw metrics directly. |

## Current Risks

- Competitor strategy is still mock fallback, not a real market conclusion.
- `estimated_avg_views` and `estimated_engagement_rate` in mock competitor rows must not be presented as verified competitor performance.
- Asian benchmark metrics should stay pattern intelligence unless the user provides comparable methodology or analytics exports.
- China raw metrics must not be compared directly with TikTok / Instagram / Facebook metrics.

Use this label when evidence is missing:

```text
ยังไม่พบข้อมูลยืนยัน
```

## Manual Thai Competitor Input Template

Use this only when the user manually provides Thai cosplay photographer names or public URLs. Do not auto-collect names.

Required CSV columns for `/import` type `competitors`:

```csv
id,display_name,country_or_region,main_platform,source_label,source_url,source_type,verification_status,is_estimated,is_user_provided,source_quality_tier,confidence_reason
competitor-user-001,USER_PROVIDED_NAME_OR_HANDLE,thailand,instagram,User-provided competitor note,USER_PROVIDED_PUBLIC_URL,user_provided,unverified,true,true,A,Manual user input only; verify public content strategy before using in recommendations
competitor-user-002,USER_PROVIDED_NAME_OR_HANDLE,thailand,facebook,User-provided competitor note,USER_PROVIDED_PUBLIC_URL,user_provided,unverified,true,true,A,Manual user input only; do not infer sensitive attributes
competitor-user-003,USER_PROVIDED_NAME_OR_HANDLE,thailand,tiktok,User-provided competitor note,USER_PROVIDED_PUBLIC_URL,user_provided,unverified,true,true,A,Manual user input only; collect public content strategy only
```

Recommended optional columns for the analysis worksheet:

| Column | Use | Safety note |
|---|---|---|
| `public_url` | User-provided public profile/post URL | No login-only URLs. |
| `secondary_platforms` | Visible public channels | Do not infer hidden accounts. |
| `competitor_group` | `event_album_shooter`, `premium_cinematic`, `retouch_fantasy_cg`, `short_form_first_creator`, `hybrid` | Strategy category only. |
| `visual_style` | Public visual style summary | No body/face/sensitive scoring. |
| `content_formats` | Album, Reels, BTS, before/after, tutorial | Public content format only. |
| `strengths` | Observable public content strength | No personal/private claims. |
| `weaknesses` | Content gap only | Avoid identity-based judgment. |
| `opportunities` | Actionable gap for our dashboard | Keep as content/SEO/workflow gap. |
| `threat_level` | `low`, `medium`, `high` competitive pressure | Do not rank people by sensitive traits. |
| `updated_at` | `YYYY-MM-DD` | Keep freshness visible. |
| `notes` | User context and limits | Mark uncertainty. |

Manual intake rules:

1. User must provide the name/handle or public URL.
2. Keep `country_or_region=thailand`.
3. Keep `is_user_provided=true`.
4. Use `source_type=user_provided` or `manual_csv`.
5. Use `verification_status=unverified` until checked.
6. Use `is_estimated=true` for any manually estimated metric.
7. Do not collect private profile data, login-only content, minor personal data, or sensitive attributes.

## Safe Asian Benchmark Dimensions

Use these dimensions for Asian benchmark creators without sensitive attributes:

| Dimension | Allowed values/examples | Why safe |
|---|---|---|
| `platform_group` | `global_platform`, `china_mainland_platform` | Separates China methodology. |
| `platform` | `instagram`, `tiktok`, `facebook`, `x_twitter`, `behance`, `douyin`, `xiaohongshu`, `bilibili`, `weibo` | Public channel classification. |
| `country_or_region` | Thailand, Japan, Korea, Taiwan, Hong Kong, Singapore, Malaysia, Indonesia, Philippines, Vietnam, Mainland China | Market context, not ethnicity. |
| `content_type` | reveal, BTS, event recap, tutorial, portfolio, retouch breakdown | Content pattern only. |
| `hook_pattern` | final image first, 1-second reveal, before/after open, event context open | Creative pattern only. |
| `caption_pattern` | short searchable caption, booking CTA, story caption, first-comment keyword | SEO/content strategy. |
| `hashtag_or_keyword_pattern` | focused keywords, no spam block, fandom/event keyword | Search behavior only. |
| `visual_style` | bright fantasy, pastel anime, clean cinematic, detail crop | Style observation only. |
| `retouch_style` | clean skin, glow, color grade, CG light, crop detail | Workflow/style dimension. |
| `cg_level` | `none`, `light`, `medium`, `heavy` | Production technique. |
| `format_structure` | hero image, crop detail, RAW, retouch step, final CTA | Content anatomy. |
| `posting_context` | event week, post-event recap, portfolio refresh, tutorial series | Timing/content use case. |
| `adaptation_fit_thailand` | high/medium/low with notes | Local adaptation, not direct ranking. |
| `source_quality_tier` | `S`, `A`, `B`, `C`, `D` | Evidence quality. |
| `confidence_reason` | Why the row is usable or weak | Prevents overclaiming. |
| `normalized_index` | 0-100 only when methodology is comparable | Avoids raw cross-platform comparison. |

Do not use these dimensions:

- gender
- age
- ethnicity
- religion
- income
- body/face ranking
- private location
- private behavior
- minor status
- relationship/family status
- health/disability
- political belief
- sensitive fandom demographics

## Recommendation

Keep current competitor rows as mock/demo only. Next real competitor step should wait for a user-provided CSV or manual list of Thai cosplay photographer names/URLs, then import with `is_user_provided=true` and visible evidence labels.

## Verification

Command run:

```bash
npm test -- competitorBenchmark
```

Result:

```text
Test Files 1 passed (1)
Tests 2 passed (2)
```
