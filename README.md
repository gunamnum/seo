# Organic Cosplay Growth Intelligence Dashboard

Offline MVP dashboard for a Thai cosplay photographer / retoucher planning weekly organic content across TikTok, Instagram, Facebook, and selected Mainland China platforms.

Core question:

> What should I shoot, retouch, edit, and post this week to get more organic reach and engagement without paid ads?

## Features

- Dashboard home with KPI cards and summary panels
- Weekly Growth Brief page with shoot, retouch, post, SEO, event, China adaptation, competitor gap, evidence, and risk sections
- Research QA page with source tier counts, verification status, dataset warnings, and source registry
- Data QA & Scoring Agent page for CSV validation, trend score recalculation, confidence downgrade reasons, and data-label checks
- Product UX / Implementation QA page for route coverage, UI checklist, data-label visibility, and final handoff gates
- 7-day trend radar with weighted trend score
- Viral clip analyzer with engagement/shareability metrics
- SEO & Content Strategy Agent view for captions, hooks, focused hashtags, CTA, first comment, alt text, and on-screen text
- Competitor & Benchmark Agent view with Thailand-only competitor gaps, strategy actions, and separated China benchmark guardrails
- Asian benchmark page with Mainland China data separated
- Dedicated China platform benchmark and adaptation notes
- Cosplay event radar and posting calendar
- Bright CG / retouch style system
- Tools/plugin safety checklist table
- 1-5 year market forecast
- CSV import center with validation
- Browser-local CSV import persistence with saved import history
- Content experiment tracker
- CSV export buttons for ideas, competitors, tools, and calendar

## Tech Stack

- Next.js + TypeScript
- Tailwind CSS
- Recharts
- PapaParse
- Vitest
- Local mock seed data

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed by Next.js.

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Deploy

This project is ready for Vercel deployment from GitHub.

Recommended production settings:

- Repository: `gunamnum/seo`
- Framework preset: `Next.js`
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: Vercel default for Next.js

Local verification before deploy:

```bash
npm test
npm run typecheck
npm run build
```

No production environment variables are required for the current MVP.

## CSV Import

Go to `/import`, choose an import type, and upload a CSV.

Supported import types:

- `trend_items`
- `viral_clips`
- `competitors`
- `benchmark_creators`
- `events`
- `tools_plugins`
- `seo_keywords`
- `market_indicators`
- `experiments`

Validation includes:

- Required columns
- Platform enum values
- Optional URL format
- Numeric fields
- Date fields
- Mainland China platform rows must use `platform_group = china_mainland_platform`

Valid imported records can be saved in browser `localStorage` under:

```text
cosplay-growth.import-store.v1
```

Imported records are treated as user/manual data, not mock data. This is browser-local persistence only, not a server database. Use `Clear Local Store` in `/import` to remove saved imports from the current browser.

## Research Schema

Every import type now includes research metadata columns so recommendations can show evidence quality instead of treating all rows as equally reliable.

Required metadata columns:

- `source_label`
- `source_url`
- `source_type`
- `verification_status`
- `is_estimated`
- `is_user_provided`
- `source_quality_tier`
- `confidence_reason`

Allowed `source_type` values:

- `official_source`
- `user_analytics_export`
- `manual_csv`
- `public_observation`
- `secondary_summary`
- `mock_seed`
- `user_provided`
- `unknown`

Allowed `verification_status` values:

- `unverified`
- `verified`
- `needs_update`
- `needs_verification`

Allowed `source_quality_tier` values:

- `S` official source
- `A` user-owned analytics / CSV
- `B` public observation
- `C` secondary summary
- `D` mock / estimated

## Data Safety Rules

- Do not scrape login-protected pages.
- Do not collect private data.
- Do not collect personal data from minors.
- Do not automate platform actions that violate terms.
- Do not recommend cracked software, pirated plugins, unknown executables, or unsafe download sources.
- Use official sources, manual CSV import, or user-provided analytics files first.
- Real competitor names must only be added by manual user input.
- Keep Mainland China platform metrics separate from TikTok / Instagram / Facebook unless normalized.

## Add Real Competitor Data

Use `/import` with `competitors`.

Rules:

- Use Thai cosplay photographers only.
- Do not use gender or sensitive attributes.
- Mark source as manual/user-provided.
- Keep seed/mock competitor names separate from real entries.

## Add China Benchmark Data

Use `/import` with `benchmark_creators`.

Rules:

- For Douyin, Xiaohongshu / RED, Bilibili, or Weibo, set `platform_group = china_mainland_platform`.
- Do not compare raw China metrics directly with TikTok / Instagram / Facebook.
- Add `china_adaptation_notes` for how the pattern changes for Thai TikTok, Instagram, or Facebook.

## Trend Scoring

Trend Score uses normalized 0-100 inputs:

```text
35% Hashtag / Keyword Velocity
20% Audio / Format Velocity
15% Cross-platform Signal
15% Thailand Cosplay Event Relevance
10% Visual Fit with Bright CG Cosplay Photography
5% Competition Gap
```

Behavior:

- Values clamp to 0-100
- Missing values default to 0
- Missing values lower confidence
- Final score rounds to nearest integer

## Known Limitations

- MVP uses mock/offline data only.
- No live APIs or scraping.
- No persistent database yet; CSV imports persist only in browser `localStorage`.
- China benchmarks are pattern analysis only, not direct raw metric comparison.
- Tool/plugin versions are not hardcoded as latest unless manually verified.
