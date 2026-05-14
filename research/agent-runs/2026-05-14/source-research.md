# Source Research Agent Run - 2026-05-14

Workspace: `C:\Users\MinusZ\Desktop\AI2`  
Owned output: `research/agent-runs/2026-05-14/source-research.md`  
Role: Source Research Agent  
Scope: public/official source audit for Thai cosplay/event/platform research

## Guardrails Applied

- Read `AGENTS.md` and followed project-local source rules.
- Used only public, non-login pages and existing repo-local research files.
- Did not add real competitor names.
- Did not scrape private/login-protected data.
- Did not edit existing registry, observations, market indicators, code, or seed data.
- Evidence missing label: `ยังไม่พบข้อมูลยืนยัน`.

## Inputs Read

| Input | Use |
|---|---|
| `AGENTS.md` | Source tier rules, forbidden sources, evidence fields |
| `research/browser-runs/source-registry.csv` | Current source registry audit |
| `research/browser-runs/observations.csv` | Current event observations audit |
| `research/browser-runs/market-indicators.csv` | Current market signal audit |
| `research/browser-runs/2026-05-14-agent-browser-collection.md` | Browser collection rules and first verified observation |
| `research/browser-runs/2026-05-14-real-research-batch-01.md` | Event source batch notes |
| `research/browser-runs/2026-05-14-real-research-batch-02.md` | Market source batch notes |

## Current Source Audit

| Source | URL | Tier | Status | Data label | Confidence | Audit result |
|---|---|---:|---|---|---|---|
| Local import route | `http://127.0.0.1:3000/import` | local | opened_in_browser | verified | medium | Route readiness only; not external evidence. Exclude from market/event evidence counts. |
| Local quality route | `http://127.0.0.1:3000/quality` | local | opened_in_browser | verified | medium | Route readiness only; useful for UI QA, not source research. |
| Google public discovery | `https://www.google.com/search?q=Thailand+cosplay+event+2026+official` | C | opened_in_browser | needs verification | low | Discovery only. Do not use search results as final claims. |
| Google Trends keyword explore | `https://trends.google.com/trends/explore?geo=TH&q=ถ่ายคอสเพลย์,cosplay%20photography,cosplay%20thailand` | S intended | opened_in_browser / needs verification | needs verification intended | medium intended | Official tool, but no exported values recorded. CSV row is malformed because URL commas are unquoted. |
| QSNCC official event calendar - Anime Festival Asia Thailand 2026 | `https://www.qsncc.com/en/whats-on/event-calendar/anime-festival-asia-thailand-2026/` | S | verified_in_browser | verified | high | Strong official venue source for event name, dates, venue, and official AFA URL. |
| AFA Thailand 2026 official event page | `https://animefestival.asia/afath26/` | S | verified_in_browser | verified | high | Strong official organizer/event page. Use with QSNCC as cross-check pair. |
| World Cosplay Summit official Thailand country page | `https://wcc.worldcosplaysummit.jp/en/player-2026/thailand/` | S | verified_in_browser | needs_update | medium | Confirms `Japan Week x World Cosplay Summit Thailand` and `2026/05/31`; venue and local schedule still need official organizer/venue cross-check. |
| Props&Ops public cosplay event schedule 2026 | `https://propsops.com/event/` | B | opened_in_browser | needs_update | medium | Useful event radar only. Each event must be cross-checked with official organizer or venue source. |
| DataReportal Digital 2026 Thailand | `https://datareportal.com/reports/digital-2026-thailand` | C | verified_in_browser | verified / secondary_summary | medium | Useful Thailand platform market signal. Not user analytics, not real-time trend velocity, not proof of organic reach. |

## Data Quality Notes

- `source-registry.csv` has 9 rows.
- External verified/high confidence anchors: `QSNCC`, `AFA`.
- Secondary market source: `DataReportal`, Tier C, medium confidence.
- Event radar still requiring cross-check: `Props&Ops`, WCS local schedule details.
- `observations.csv` has 2 verified event/cross-check rows and 5 `needs_update` event radar rows.
- `market-indicators.csv` has 4 `secondary_summary` rows from DataReportal.
- Schema issue found in `source-registry.csv` line with Google Trends URL: comma-separated query terms are not quoted, so CSV parsing shifts fields and shows invalid values like `verification_status=2026-05-14`, `data_label=false`, `source_quality_tier=false`.
- Local route rows use `source_quality_tier=local`, which is useful for UI QA but outside project evidence tiers `S/A/B/C/D`.

## Next Public / Official Sources To Verify

| Priority | Source | URL | Tier target | Verify next | Why it matters |
|---:|---|---|---:|---|---|
| 1 | QSNCC event calendar | `https://www.qsncc.com/en/whats-on/event-calendar/?page=1` | S | Monitor upcoming ACG/cosplay/anime events beyond AFA. | Official venue calendar already lists AFA as Anime, Cosplay, and Gaming; good Bangkok event pipeline. |
| 2 | WCS Thailand country page | `https://wcc.worldcosplaysummit.jp/en/player-2026/thailand/` | S | Recheck selected contestant, local website link, and date changes. | Official WCS source for Thailand preliminary; currently still `needs_update` for local venue detail. |
| 3 | World Cosplay Summit 2026 official global event page | `https://worldcosplaysummit.jp/en/?p=70` | S | Confirm global final dates and Thailand representative context. | Official global schedule says World Cosplay Summit 2026 runs `Friday, July 31 - Sunday, August 2, 2026`. |
| 4 | Central Pattana event hub | `https://www.centralpattana.co.th/en/shopping/shopping-update/event` | S | Search for Japan Week / WCS / cosplay pages by branch and month. | Props&Ops lists Central venues; official Central page is needed before treating venue/date as reliable. |
| 5 | Royal Paragon Hall ANIMONIUM 2026 page | `https://www.paragonhall.com/en/events/23/ANIMONIUM-2026` | S | Capture official dates, venue, organizer links, and audience/event positioning. | Official venue page for a large anime/pop-culture event; useful benchmark even though event is past. |
| 6 | TAT Newsroom pop-culture event coverage | `https://www.tatnews.org/2026/03/tat-joins-netflix-and-bangkok-in-bringing-one-piece-to-lumpini-park-with-grand-line-in-thailand/` | S | Classify as pop-culture tourism signal, not cosplay event schedule. | Official TAT source shows Thailand using anime/IP events for tourism and younger fan audiences. |
| 7 | TikTok Creative Center | `https://ads.tiktok.com/business/creativecenter/pc/en/` | S | Record Thailand 7-day/30-day hashtag, song, and video inspiration manually; avoid creator personal profiling. | Official TikTok platform tool for trend discovery. Use only public aggregate trend signals. |
| 8 | Google Trends | `https://trends.google.com/trends/` | S | Export or manually record values for `ถ่ายคอสเพลย์`, `ช่างภาพคอสเพลย์`, `cosplay thailand`, `cosplay photography`, `cosplay retouch`. | Official search-interest tool; needed before any trend velocity claim. Quote query URLs in CSV. |

## Forbidden-Source Risks

| Risk | Do not do | Safe handling |
|---|---|---|
| Login-protected scraping | Scrape Facebook, Instagram, TikTok, Douyin, RED, Bilibili, Weibo, or private analytics pages behind login. | Use user-provided exports or public official pages only. |
| Real competitor names | Add Thai photographer names from search or social browsing. | Wait for user-provided names/URLs. Keep mock names obviously fake. |
| Minor/private data | Collect cosplayer age, school, ID, face recognition, contact info, or private profile data. | Analyze event/source metadata only. Do not profile individuals. |
| Automated engagement | Like, follow, comment, DM, post, save, or trigger platform actions. | Read public pages only; no account actions. |
| Search snippets as evidence | Treat Google/Search snippets as confirmed source facts. | Open official page and record source URL, status, date, and confidence. |
| Public event aggregators | Treat Props&Ops, ThailandExhibition, or similar calendars as final truth. | Use as Tier B/C radar; cross-check each event with organizer/venue official page. |
| China raw metric mixing | Compare Douyin/RED/Bilibili/Weibo raw metrics directly with TikTok/Instagram/Facebook. | Keep `platform_group = china_mainland_platform`; use normalized indexes only if method is documented. |
| Cracked tools / unknown executables | Recommend cracked retouch plugins, pirated software, or unknown installer mirrors. | Use official websites, official marketplaces, or verified GitHub releases only. |
| CSV corruption | Save URLs with commas unquoted. | Quote URL fields or encode commas before import. |

## Recommended Registry Updates For Next Agent

Do not import these until verified:

```csv
source_label,source_url,source_type,platform,platform_group,verification_status,confidence_level,data_label,source_quality_tier,notes
QSNCC event calendar,https://www.qsncc.com/en/whats-on/event-calendar/?page=1,official_event_calendar,qsncc,thailand_event,pending_browser_review,low,needs verification,S,Monitor for upcoming ACG/cosplay/anime events
TikTok Creative Center,https://ads.tiktok.com/business/creativecenter/pc/en/,official_platform_tool,tiktok,global_platform_tool,pending_manual_review,low,needs verification,S,Record aggregate trends only; no creator profiling
Google Trends,https://trends.google.com/trends/,official_tool,google_trends,global_platform_tool,pending_export,low,needs verification,S,Export/manual values needed before trend velocity claims
```

## Handoff

- Strongest usable event evidence now: `Anime Festival Asia Thailand 2026` via QSNCC + AFA official sources.
- Strongest usable platform-market evidence now: `DataReportal Digital 2026 Thailand`, but only as secondary summary.
- Weakest current sources: Google Search discovery, unexported Google Trends, Props&Ops event radar.
- Next best action: verify Central/WCS venue details and export Google Trends/TikTok Creative Center aggregate signals before trend scoring.
