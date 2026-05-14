# 2026-05-14 Real Research Batch 02

## Scope

เพิ่ม market signal จริงสำหรับ dashboard โดยใช้ public secondary summary ที่ไม่ต้อง login และไม่ใช้เป็นตัวแทน analytics ของบัญชีผู้ใช้

## Source

| Source | URL | Tier | Status | Use |
|---|---|---:|---|---|
| DataReportal Digital 2026: Thailand | https://datareportal.com/reports/digital-2026-thailand | C | verified | ใช้เป็น Thailand social/platform market signal |

## Added Signals

| Indicator | Value | Dashboard Use |
|---|---|---|
| Thailand social media user identities | 56.6M social media user identities; 79.1% of total population | ยืนยันว่า organic social ยังเป็นสนามหลัก แต่ต้องทำ searchable/shareable content |
| TikTok Thailand ad reach signal | 56.6M users aged 18+; 96.3% of adults 18+ | ให้ TikTok เป็น discovery channel สำหรับ reveal, BTS, retouch timelapse |
| Facebook Thailand ad reach signal | 51.5M users in Thailand | ใช้เป็น album/story/booking CTA และ event context surface |
| Instagram Thailand ad reach signal | 20.6M users; ad reach up 13.9% YoY and 2.0% QoQ | ใช้เป็น carousel, Reel reveal, save-friendly detail crop |

## Data QA

- Source type: `secondary_summary`
- Source quality tier: `C`
- Verification status: `verified`
- Data label: `secondary_summary`
- Not user analytics
- Not real-time trend velocity
- Not a guarantee of organic reach for this account

## Orchestrator Use

ใช้ market signal เพื่อปรับ platform plan:

1. TikTok = discovery / reveal / retouch timelapse
2. Instagram = portfolio detail / carousel / save
3. Facebook = album / booking CTA / event story

ยังต้องนำเข้า user-owned analytics export เพื่อคำนวณ recommendation ที่แม่นขึ้น
