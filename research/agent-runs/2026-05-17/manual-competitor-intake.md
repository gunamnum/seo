# Manual Competitor Intake

Date: 2026-05-17  
Scope: Thai cosplay photographer / retoucher competitor list provided by user.

## User-Provided Competitors

| Name | URL | Status |
|---|---|---|
| ปลั๊กคึ | https://www.facebook.com/profile.php?id=100094245080985 | needs_verification |
| ไอจะถ่าย | https://www.facebook.com/idanoncamera | needs_verification |
| Twixxpix | https://www.facebook.com/twixxpic | needs_verification |
| Studio Aicream | https://www.facebook.com/profile.php?id=100064888831930 | needs_verification |
| ButterFile Artist | https://www.facebook.com/ButterfileArtist | needs_verification |

## Agent Outputs

### 1. Orchestrator Agent

Allowed into dashboard:

- Names and Facebook URLs manually provided by user.
- Data label: `manual`.
- Source type: `user_provided`.
- Verification status: `needs_verification`.

Not allowed yet:

- Reach, engagement, price, posting frequency, content quality, audience size, or strategy claims not backed by public evidence.

### 2. Source Research Agent

Source classification:

- Tier: `B`
- Confidence: `medium`
- Reason: user gave explicit names and URLs, but Facebook content was not verified through public non-login access in this run.

Safety:

- No login-protected scraping.
- No private data collection.
- No sensitive attributes inferred.

### 3. Trend Intelligence Agent

Competitor list can now support future `competition_gap` review, but current trend score should remain capped until public content pattern evidence exists.

Current status:

- ยังไม่พบข้อมูลยืนยัน for competitor posting velocity, hashtag usage, format velocity, or engagement pattern.

### 4. China Platform Analyst

No China metric comparison is added from these Facebook competitor records.

Rule preserved:

```text
China raw metrics must not be directly compared with TikTok / Instagram / Facebook metrics.
```

### 5. Competitor & Benchmark Agent

Matrix action:

- Add 5 manual competitor rows.
- Keep mock competitor rows as fallback/demo only.
- Keep Thai competitors separate from Asian and China benchmarks.

Review checklist for next manual pass:

- Album speed after event.
- Before/after retouch proof.
- Booking CTA clarity.
- Thai SEO keywords in captions.
- Event recap timing.
- Portfolio style consistency.

### 6. SEO & Content Strategy Agent

Recommended content angle after intake:

- Build a comparison-safe content checklist, not a public ranking.
- Use searchable positioning:
  - `ถ่ายคอสเพลย์`
  - `ช่างภาพคอสเพลย์`
  - `รีทัชภาพคอส`
  - `cosplay thailand`
  - `cosplay photography`
  - `cosplay retouch`

### 7. Data QA & Scoring Agent

QA result:

- Real names are allowed because they are user-provided.
- Rows must stay labeled `manual`, `user_provided`, `needs_verification`.
- Metrics are set to zero/estimated placeholders and must not be used as actual competitor performance.

### 8. Product UX / Implementation QA Agent

Expected UI changes:

- `/competitors` shows manual count and manual badges.
- `/report` no longer says competitor names are missing.
- `/quality` source registry includes user-provided competitor rows.

Final verification required:

```bash
npm test
npm run typecheck
npm run build
```
