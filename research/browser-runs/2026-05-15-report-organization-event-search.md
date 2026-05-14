# 2026-05-15 Report Organization And Event Search

## Goal

จัด `/report` ให้อ่านง่ายขึ้นและเพิ่มงานที่ค้นเจอใหม่ โดยยังคงแยก:

- `verified` = official source ใช้วางแผนหลักได้
- `needs_update` = public radar ต้อง cross-check ก่อนใช้ล็อกคิวจริง
- `mock fallback` = คะแนน/metric ที่ยังไม่มี analytics export จริง

## Official Sources Added

| Event | Date | Venue | Source | Status |
|---|---|---|---|---|
| Nippon Haku Bangkok 2026 | 2026-08-28 to 2026-08-30 | QSNCC | https://nipponhaku.com/exhibition/ | verified / Tier S |
| gamescom asia x Thailand Game Show 2026 | 2026-10-29 to 2026-11-01 | QSNCC | https://gamescom.asia/about/gamescom-asia/date-time | verified / Tier S |

## Public Radar Added From Props&Ops

Source: https://propsops.com/event/  
Latest update shown by source: `14th May 2026 - 14:17`

Added to pipeline as `needs_update`:

- Sakon Nakhon Cosplay Contest 2026
- Mukdahan Cosplay Contest 2026
- HATYAI OPEN WORLD Cosplay Contest
- AKEMICOS DENSETSU ANIME 90
- CosSeason #1 - Summer of Love
- VERZO
- VocaUnity - Vocaloid Only Event
- Maruya #46
- KOKORO cos #12 - Megane
- HoloSpace
- Anime Event Thailand 7 Idol Stage
- CosQuest 3
- DokiDoki Matsuri 2 : Racing
- Movies Carnival 2026
- แดดส่องฟ้า #2 [Unofficial] : One Piece Only Event
- KOKORO cos #13 - Cupid's Tear
- Maruya #47
- Anime Event Thailand 8 Christmas Time!

## Website Organization Changes

`/report` now separates:

1. อ่านก่อนใช้ข้อมูล
2. Priority Plan สัปดาห์นี้
3. Upcoming Event Pipeline
4. Watchlist ระยะกลาง-ปลายปี
5. Official Anchors ที่ยืนยันแล้ว
6. สัญญาณตลาดรองจาก Digital 2026 Thailand
7. แหล่งอ้างอิงทางการที่อัปเดตเพิ่ม
8. สถานะ Full 8-Agent Run
9. ส่วนที่ใช้ mock ก่อน
10. คำแนะนำสัปดาห์นี้
11. แผนคอนเทนต์ AFA
12. SEO Package
13. ข้อจำกัด

## Guardrails

- No private/login-protected scraping.
- No real competitor names.
- No automated engagement.
- Props&Ops rows remain `needs_update`.
- Nippon Haku and gamescom are official anchors but still need practical shoot logistics before booking.
