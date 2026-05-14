# 2026-05-14 Real Research Batch 01

## Scope

เริ่มเก็บข้อมูลจริงสำหรับ Organic Cosplay Growth Intelligence Dashboard โดยใช้เฉพาะ public/official sources ที่ไม่ต้อง login และไม่เก็บข้อมูลส่วนตัว

## Sources Used

| Source | URL | Tier | Status | Use |
|---|---|---:|---|---|
| AFA Thailand 2026 official page | https://animefestival.asia/afath26/ | S | verified | ยืนยันชื่ออีเวนต์และวันที่ 30-31 May 2026 |
| QSNCC official event calendar | https://www.qsncc.com/en/whats-on/event-calendar/anime-festival-asia-thailand-2026/ | S | verified | ยืนยันวันที่ เวลา สถานที่ และ official AFA URL |
| World Cosplay Summit Thailand page | https://wcc.worldcosplaysummit.jp/en/player-2026/thailand/ | S | needs_update | ยืนยัน Thailand preliminary presence; รายละเอียด venue ต้อง cross-check |
| Props&Ops cosplay event schedule | https://propsops.com/event/ | B | needs_update | ใช้เป็น event radar สาธารณะ ต้อง cross-check ทีละงาน |

## Orchestrator Summary

สัปดาห์นี้ควรใช้ event radar เป็นแกนของแผนโพสต์:

1. งานใกล้สุด: Japan Week x World Cosplay Summit Thailand 2026 - รอบคัดเลือก #3, 2026-05-16 ถึง 2026-05-17, Central Korat
2. งานหลักที่ verified แล้ว: Anime Festival Asia Thailand 2026, 2026-05-30 ถึง 2026-05-31, QSNCC Exhibition Hall 8 Level LG
3. งานที่ต้อง cross-check: MAYUCOS 7 x MAYUCARD 1, CXM Summer Spring #4, WCS final, PPAO E-Sport + Cosplay

## Agent Notes

### Source Research Agent

- เพิ่ม source registry แล้วใน `research/browser-runs/source-registry.csv`
- เพิ่ม observation rows แล้วใน `research/browser-runs/observations.csv`
- ยังไม่ใช้ login-protected scraping
- ยังไม่เก็บ competitor จริง เพราะผู้ใช้ยังไม่ได้ให้รายชื่อเอง

### Trend Intelligence Agent

- Trend score ใน dashboard ยังเป็น mock fallback
- ใช้ event signal จริงเป็น context เท่านั้น
- ยังต้องใช้ Google Trends export หรือ user analytics export ก่อนสรุป trend velocity จริง

### China Platform Analyst

- รอบนี้ยังไม่เพิ่มข้อมูลจีนจริง
- ยังคงกฎเดิม: China raw metrics ห้ามเทียบดิบกับ TikTok / Instagram / Facebook

### Competitor & Benchmark Agent

- ไม่เพิ่มชื่อคู่แข่งจริง
- ถ้าจะเริ่ม benchmark จริง ต้องให้ผู้ใช้กรอกรายชื่อหรือ URL เองก่อน

### SEO & Content Strategy Agent

ใช้ keyword หลักเดิม:

- ถ่ายคอสเพลย์
- ช่างภาพคอสเพลย์
- รีทัชภาพคอส
- cosplay thailand
- cosplay photography
- cosplay retouch

Caption/CTA ควรโยงกับ event radar แต่ต้องบอกชัดว่าตัวเลข metric ยังเป็น mock

### Data QA & Scoring Agent

- `event-afa-thailand-2026` = verified, Tier S
- Props&Ops event rows = needs_update, Tier B
- mock score/SEO priority ยังต้องแสดง label mock

### Product UX / Implementation QA Agent

- หน้า `/report` ต้องแสดง event radar จริง
- ต้องมี badge แยก verified / needs_update / mock fallback
- ต้องผ่าน `npm test` และ `npm run build`

## Open Gaps

- ยังไม่มี analytics export จริงจาก TikTok / Instagram / Facebook
- ยังไม่มี Google Trends value export
- ยังไม่มี competitor URLs จากผู้ใช้
- WCS/Props&Ops venue rows ต้อง cross-check กับ organizer/venue official source
