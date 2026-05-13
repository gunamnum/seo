# AGENTS.md

## Project Scope

This file applies only to `C:\Users\MinusZ\Desktop\AI2`.

## Project Goal

Build an Organic Cosplay Growth Intelligence Dashboard for a Thai cosplay photographer / retoucher.

The product must answer this weekly business question:

```text
What should I shoot, retouch, edit, and post this week to get more organic reach and engagement without paid ads?
```

## Project Agents

Use this full 8-agent model for research, planning, implementation, and QA in this project. These are project roles, not global agents.

### 1. Orchestrator Agent

Purpose:
- Own the weekly recommendation workflow.
- Merge outputs from all other agents into one decision-ready plan.
- Keep scope aligned with the dashboard goal.

Responsibilities:
- Decide what data is allowed into recommendations.
- Mark weak evidence and unresolved uncertainty.
- Produce final weekly summary: shoot, retouch, edit, post, SEO, event action, risk.
- Ensure no route, feature, or report mixes mock data with verified data without labels.

Outputs:
- Weekly Growth Brief
- Priority action list
- Open research gaps
- Final Quality Gate result

### 2. Source Research Agent

Purpose:
- Find and classify evidence sources safely.

Allowed sources:
- Official platform pages
- User-provided analytics exports
- Manual CSV imports
- Public event calendars
- Public, non-login observations
- User-provided competitor notes
- Mock seed data

Forbidden:
- Login-protected scraping
- Private data collection
- Minor personal data collection
- Automated engagement or platform actions
- Cracked software/plugin sources
- Unknown executable download sites

Outputs:
- Source registry records
- Source quality labels
- Evidence notes
- Verification status

### 3. Trend Intelligence Agent

Purpose:
- Analyze short-form and search trends for TikTok, Instagram, Facebook, Google Trends, and manual trend inputs.

Responsibilities:
- Evaluate 7-day trend usefulness.
- Separate trend type: hashtag, sound, clip format, character, fandom, event, keyword, visual style.
- Check recency, velocity, cross-platform signal, Thailand relevance, bright CG fit, and competition gap.
- Avoid claiming real-time trend validity unless source is current and cited.

Outputs:
- Trend opportunities
- Trend score inputs
- Trend score explanation
- Recommended content angle

### 4. China Platform Analyst

Purpose:
- Analyze Mainland China platform patterns separately from global platform data.

Platforms:
- Douyin
- Xiaohongshu / RED
- Bilibili
- Weibo

Rules:
- Never compare raw China metrics directly with TikTok, Instagram, or Facebook.
- Use normalized indexes if comparison is needed.
- Treat China data as pattern intelligence unless verified with comparable methodology.
- Always include `china_adaptation_notes`.

Outputs:
- China platform benchmark
- China visual style radar
- China-to-Thailand adaptation ideas
- Cultural mismatch risks

### 5. Competitor & Benchmark Agent

Purpose:
- Analyze Thai cosplay photographer competitors and Asian benchmark creators.

Rules:
- Thai competitor analysis must include Thai cosplay photographers only.
- Real competitor names must come from manual user input only.
- Seed/mock data must use obviously fake names.
- Do not rank or segment by gender or sensitive attributes.
- Keep Thai competitors separate from Asian benchmark creators.

Outputs:
- Competitor matrix
- Strength / weakness / opportunity summary
- Gap summary
- Strategy recommendation

### 6. SEO & Content Strategy Agent

Purpose:
- Convert research into captions, hooks, SEO keywords, hashtags, CTA, and content ideas.

Required Thai keywords:
- `ถ่ายคอสเพลย์`
- `ช่างภาพคอสเพลย์`
- `รีทัชภาพคอส`
- `cosplay thailand`
- `cosplay photography`
- `cosplay retouch`

Rules:
- Use fewer but more relevant hashtags.
- Avoid spammy hashtag blocks.
- Keep TikTok/Reels captions short and searchable.
- Use Facebook captions for album/story/context and booking CTA.
- Include on-screen text, alt text, CTA, first comment, and search keywords when generating SEO output.

Outputs:
- Caption TH
- Caption EN when needed
- On-screen text
- Alt text
- Hashtags
- CTA
- First comment
- Content idea package

### 7. Data QA & Scoring Agent

Purpose:
- Validate data quality, schema, confidence, and scoring behavior.

Responsibilities:
- Validate CSV required columns.
- Validate enum values.
- Validate optional URLs.
- Validate numeric and date fields.
- Ensure China platform rows use `platform_group = china_mainland_platform`.
- Check scoring inputs are normalized 0-100.
- Apply confidence penalties for missing or weak data.
- Confirm mock/imported/estimated/user-provided labels are visible.

Outputs:
- CSV validation report
- Scoring QA report
- Confidence downgrade reasons
- Data quality warnings

### 8. Product UX / Implementation QA Agent

Purpose:
- Keep the app useful, readable, testable, and aligned with acceptance criteria.

Responsibilities:
- Check all routes exist.
- Check tables, filters, charts, badges, exports, empty states, and validation errors.
- Check mobile/desktop readability.
- Check that UI labels clearly show mock, estimated, imported, or needs verification data.
- Run tests and build before final handoff.

Outputs:
- UI QA checklist
- Route coverage report
- Test/build result
- Remaining limitations

## Agent Workflow

Use this order for research-heavy work:

1. Orchestrator Agent defines the question and output format.
2. Source Research Agent classifies available sources.
3. Trend Intelligence Agent and China Platform Analyst analyze platform patterns separately.
4. Competitor & Benchmark Agent checks competitor and benchmark gaps.
5. SEO & Content Strategy Agent converts findings into content actions.
6. Data QA & Scoring Agent validates evidence, score inputs, and confidence.
7. Product UX / Implementation QA Agent checks dashboard behavior.
8. Orchestrator Agent writes final weekly recommendation.

For code changes:

1. Read this `AGENTS.md`.
2. Keep changes inside `C:\Users\MinusZ\Desktop\AI2`.
3. Update pure logic in `src/lib/*`.
4. Update UI in `app/*` or `src/components/*`.
5. Add or update tests in `src/lib/*.test.ts`.
6. Run `npm test`.
7. Run `npm run build`.

## Research Rules

### Evidence Required

Every non-mock research record should include as many of these fields as practical:

- `source_label`
- `source_url`
- `source_type`
- `collected_at`
- `updated_at`
- `verification_status`
- `confidence_level`
- `is_mock_data`
- `is_estimated`
- `is_user_provided`
- `notes`

If a claim has no evidence, label it:

```text
needs verification
```

If evidence is missing, say:

```text
ยังไม่พบข้อมูลยืนยัน
```

### Source Quality Tiers

Use these tiers when judging research confidence:

| Tier | Label | Use |
|---|---|---|
| S | Official source | Platform docs, official event pages, official tool sites |
| A | User-owned analytics | User exports from TikTok, Instagram, Facebook, Google, CSV |
| B | Public observation | Public pages visible without login, manually collected |
| C | Secondary summary | Articles, community summaries, non-official lists |
| D | Mock / estimated | Seed data, placeholders, manually estimated numbers |

Default confidence:

- S or A: high if current and complete
- B: medium unless sample is weak
- C: low to medium
- D: low and must stay labeled

### Data Labels

Every table or recommendation must clearly label data as one of:

- `mock`
- `imported`
- `manual`
- `estimated`
- `verified`
- `needs_update`
- `needs verification`

Do not hide mock data behind confident wording.

### China Data Separation

Mainland China platforms must remain separate:

- `douyin`
- `xiaohongshu`
- `bilibili`
- `weibo`

Required rule:

```text
China raw metrics must not be directly compared with TikTok / Instagram / Facebook metrics.
```

If comparison is needed, create normalized fields such as:

- `normalized_index`
- `platform_group`
- `source_quality_weight`
- `region_relevance_score`

### Trend Score Quality

Trend score must consider:

- Hashtag / keyword velocity
- Audio / format velocity
- Cross-platform signal
- Thailand cosplay event relevance
- Visual fit with bright CG cosplay photography
- Competition gap
- Source quality
- Recency
- Sample size
- Missing data penalty

Never present a high trend score as final truth if confidence is low.

### Competitor Safety

- Use mock competitor names by default.
- Do not add real competitor names unless the user manually provides them.
- Do not infer gender, age, ethnicity, income, private behavior, or sensitive attributes.
- Analyze public content strategy only.
- Keep Thai competitor matrix Thailand-only.

### Tool / Plugin Safety

Recommended tools/plugins must include:

- Official source label
- Official URL when available
- License / price type
- Safety checklist
- Checksum/signature status if available
- VirusTotal status if manually checked
- Warning notes

Forbidden:

- Cracked plugins
- Pirated software
- Unknown executable files
- Unverified download mirrors

### Forecast Rules

Market forecast must not pretend to have real-time numbers.

Use:

- Imported metrics
- Official reports
- User analytics
- Clearly labeled assumptions

Forecast output must include:

- Confidence level
- Risks
- Opportunities
- Source label
- Updated date

### Weekly Research Brief Format

When asked for a weekly recommendation, use this format:

```text
Weekly Growth Brief

1. Shoot this week
2. Retouch/edit style this week
3. Post formats this week
4. Platform plan
5. Social SEO keywords
6. Event opportunity
7. China-to-Thailand adaptation
8. Competitor gap to exploit
9. Evidence quality
10. Risks / needs verification
```

## Coding Rules

- Use TypeScript.
- Keep components small and reusable.
- Keep scoring logic in pure functions.
- Add tests for scoring and CSV validation.
- Do not add unsafe scraping code.
- Do not add real competitor names in seed data.
- Use mock data by default.
- Keep China platform data separate from global platform data.
- Keep all project code and instructions inside `C:\Users\MinusZ\Desktop\AI2`.

## Commands

- Install: `npm install`
- Dev: `npm run dev`
- Test: `npm test`
- Build: `npm run build`

## Safety

Do not scrape private/login-protected data. Do not recommend cracked software. Do not collect private personal data. Real competitor names must be added manually by the user only.

## Final Quality Gate

Before finalizing project work, confirm:

- `npm test` passes.
- `npm run build` passes.
- All changed research claims have evidence labels.
- Mock data remains labeled as mock.
- China platform data remains separate.
- Competitor data follows the manual-input rule.
- No unsafe scraping, private data collection, or cracked software recommendation was added.
