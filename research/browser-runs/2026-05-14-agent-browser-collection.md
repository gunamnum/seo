# Agent Browser Collection Run

Project: Organic Cosplay Growth Intelligence Dashboard
Scope: `C:\Users\MinusZ\Desktop\AI2`
Started at: `2026-05-14`
Operator surface: in-app browser
Status: `started`

## Safety Mode

This run follows `AGENTS.md` and uses only:

- official platform pages
- public non-login pages
- public event calendars
- user-provided analytics exports
- manual CSV imports
- user-provided competitor notes
- mock seed data clearly labeled as mock

Forbidden during this run:

- login-protected scraping
- private data collection
- minor personal data collection
- automated engagement or platform actions
- cracked software/plugin sources
- unknown executable download sites
- real competitor names unless manually provided by the user

## 8-Agent Browser Commands

### 1. Orchestrator Agent

Status: `started`

Task:
- Keep all browser collection aligned to the weekly question.
- Merge agent outputs into a Weekly Growth Brief after sources are collected.
- Reject any record without visible evidence labels.

Current output target:
- `research/browser-runs/source-registry.csv`
- later dashboard import CSV if data becomes usable

### 2. Source Research Agent

Status: `started`

Task:
- Open public/official pages only.
- Classify source quality tier.
- Record source metadata before any recommendation is made.

Start pages:
- local import UI: `http://127.0.0.1:3000/import`
- official/search source discovery: `https://www.google.com/search?q=Thailand+cosplay+event+2026+official`

### 3. Trend Intelligence Agent

Status: `started_limited`

Task:
- Collect only public trend signals.
- Do not claim real-time trend validity without current source evidence.
- Separate hashtag, sound, clip format, character, fandom, event, keyword, and visual style.

Start pages:
- `https://trends.google.com/trends/explore?geo=TH&q=%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%AA%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%A2%E0%B9%8C,cosplay%20photography,cosplay%20thailand`

### 4. China Platform Analyst

Status: `started_limited`

Task:
- Collect China platform pattern intelligence separately.
- Do not compare raw China metrics against TikTok, Instagram, or Facebook.
- Every China row must include `platform_group = china_mainland_platform`.

Start pages:
- public search/discovery only unless user provides verified public pages

### 5. Competitor & Benchmark Agent

Status: `waiting_user_input`

Task:
- Analyze Thai cosplay photographers only when the user manually provides names or URLs.
- Use mock names only for seed/demo data.
- Keep Thai competitors separate from Asian benchmark creators.

Needed from user:
- manual list of competitor names or public URLs

### 6. SEO & Content Strategy Agent

Status: `started`

Task:
- Convert verified or labeled evidence into captions, hooks, keywords, hashtags, CTA, alt text, first comment, and content ideas.
- Required keywords must remain in the strategy:
  - `ถ่ายคอสเพลย์`
  - `ช่างภาพคอสเพลย์`
  - `รีทัชภาพคอส`
  - `cosplay thailand`
  - `cosplay photography`
  - `cosplay retouch`

### 7. Data QA & Scoring Agent

Status: `started`

Task:
- Validate records before import.
- Reject weak/missing source labels.
- Apply confidence downgrades for missing, stale, estimated, or low-tier evidence.

Current checks:
- source fields present
- mock/imported/manual/estimated/verified/needs_update labels visible
- China platform data separated
- score inputs normalized 0-100

### 8. Product UX / Implementation QA Agent

Status: `started`

Task:
- Keep the dashboard usable for the collected records.
- Verify browser route readiness before importing data.

Start pages:
- `http://127.0.0.1:3000/`
- `http://127.0.0.1:3000/import`
- `http://127.0.0.1:3000/quality`

## Current Collection Rule

If evidence is missing, use:

```text
ยังไม่พบข้อมูลยืนยัน
```

If a source has not been checked in the browser yet, set:

```text
verification_status=pending_browser_review
confidence_level=low
data_label=needs verification
```

## Browser Start Result

Checked at: `2026-05-14`

Opened successfully:

- `http://127.0.0.1:3000/import`
  - title: `แดชบอร์ดเติบโตคอสเพลย์`
  - visible checks: `CSV=8`, `นำเข้า=5`, `Import=1`, `คอลัมน์=1`
- `http://127.0.0.1:3000/quality`
  - title: `แดชบอร์ดเติบโตคอสเพลย์`
  - visible checks: `คุณภาพ=5`, `mock=28`
- `https://www.google.com/search?q=Thailand+cosplay+event+2026+official`
  - title: `Thailand cosplay event 2026 official - ค้นหาด้วย Google`
  - visible checks: `Thailand=50`, `cosplay=48`, `event=16`
- `https://trends.google.com/trends/explore?geo=TH&q=%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%84%E0%B8%AD%E0%B8%AA%E0%B9%80%E0%B8%9E%E0%B8%A5%E0%B8%A2%E0%B9%8C,cosplay%20photography,cosplay%20thailand`
  - title: `ถ่ายคอสเพลย์, cosplay photography, cosplay thailand - Explore - Google Trends`
  - visible checks: `cosplay=4`, `ถ่ายคอสเพลย์=2`

No login, private scraping, automated engagement, or personal data collection was started.

## First Verified Observation

Event:
- `Anime Festival Asia Thailand 2026`

Verified public sources:
- QSNCC official event calendar: `https://www.qsncc.com/en/whats-on/event-calendar/anime-festival-asia-thailand-2026/`
- AFA official event page: `https://animefestival.asia/afath26/`

Current verified fields:
- `start_date=2026-05-30`
- `end_date=2026-05-31`
- `venue=Queen Sirikit National Convention Center - Exhibition Hall 8, Level LG`
- `platform_group=thailand_event`
- `confidence_level=high`
- `data_label=verified`

Dashboard use:
- Treat as an event opportunity for shoot planning, retouch queue timing, short-form content, album post, and SEO captions.

## Browser Handoff

Current browser page:

```text
http://127.0.0.1:3000/import
```

Use this page when importing the verified CSV output into the dashboard.
