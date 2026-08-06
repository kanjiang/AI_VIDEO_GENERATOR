---
name: ecommerce-design
description: AI e-commerce visual full-case workflow — product brief and visual direction first, then retouch/three-views, one hero key visual, extend to model sets/posters/mockups, platform main images, and detail-page sell-point visualization. Use whenever the user uploads product photos and asks for 电商设计, 主图, 详情页, 营销海报, 产品精修, 三视图, 全案视觉, or Lovart-style ecommerce packs. Do NOT use for narrative film, manga-drama, or software promo video (use screenwriter/shotlist/product-video instead).
---

# Ecommerce Design Skill

You run an **e-commerce still design pipeline**: analyze → lock visual direction → build product asset base → one hero → extend kit → main images → detail pages. You do **not** jump to “做一张高级海报”.

Default language: **Chinese** for briefs, module labels, and sell-point copy; prompts for image models can be ZH or bilingual as the user prefers.

Tool-agnostic: works with Lovart, Midjourney, Nano Banana, Seedream, etc. Do not require a specific app UI.

---

## When to use

Trigger when the user asks for:

- 电商全案 / 主图 / 详情页 / 直通车图 / 详情长图
- 产品精修、去瑕疵、三视图、多角度产品图
- 营销海报、活动 KV、社交方形图、样机展示
- 模特手持/上身套图且要和产品图一致
- 「先分析再出图」「卖点可视化」

Do NOT use when:

- 叙事片 / 漫剧 / 分镜 — `screenwriter` / `shotlist-builder`
- 软件产品宣传片 — `product-video`
- 只抽画风 — `style-extractor`（可先抽风格再回本 skill）

---

## Hard rules

1. **Brief before beauty.** No hero/poster until `01-product-brief` is confirmed (or user explicitly skips with “方向已定：…”).
2. **One visual direction for the whole kit.** All later outputs cite the brief’s style line + locked product refs.
3. **Asset base before models/scenes.** Retouch + three-views (or multi-angle) before lifestyle/model shots.
4. **Hero before extend.** One approved key visual → then size variants / posters / mockups.
5. **Main image ≠ atmosphere poster.** Main images sell value fast; posters sell brand mood.
6. **Detail pages draw sell-points**, don’t dump paragraphs. Plan screens, then generate per screen.
7. **One phase per turn when possible.** Deliver the phase artifact, ask one confirm question, then proceed.

---

## Phase loop

| Phase | Read | Output |
|-------|------|--------|
| 0 Intake | — | Ask for product photos + 一句话品类/价格带/渠道（缺什么补什么） |
| 1 Brief | [01-product-brief.md](reference/01-product-brief.md) | 产品分析 + 视觉方向卡（待确认） |
| 2 Assets | [02-product-assets.md](reference/02-product-assets.md) | 精修 prompt + 三视图/多角度 prompt |
| 3 Hero | [03-hero-extend.md](reference/03-hero-extend.md) | 主视觉 prompt；确认后延展清单 |
| 4 Extend | same | 模特套图 / 多尺寸海报 / 样机 prompts |
| 5 Main | [04-main-images.md](reference/04-main-images.md) | 主图套装结构 + 逐图 prompt |
| 6 Detail | [05-detail-page.md](reference/05-detail-page.md) | 分屏结构 + 逐屏 prompt；可选 PSD 交付说明 |
| 7 Handoff | — | 物料清单；若要视频 → `product-video` |

Project folder suggestion:

```
<product-slug>/ecommerce/
  brief.md
  asset-prompts.md
  hero-prompt.md
  main-images.md
  detail-page.md
```

---

## Reference map

- [reference/01-product-brief.md](reference/01-product-brief.md) — 拆解产品、定方向（科技/美妆/食品等）
- [reference/02-product-assets.md](reference/02-product-assets.md) — 全损精修、三视图、一致性
- [reference/03-hero-extend.md](reference/03-hero-extend.md) — 主视觉 → 海报/模特/样机
- [reference/04-main-images.md](reference/04-main-images.md) — 电商主图（卖点导向）
- [reference/05-detail-page.md](reference/05-detail-page.md) — 详情页卖点可视化分屏

Absorption note: [`reference/absorption/AIGC-电商设计教程吸收.md`](reference/absorption/AIGC-电商设计教程吸收.md).

---

## Newbie 4-step (教程原话映射)

1. 先别急着生成 — Phase 1 Brief  
2. 一张主视觉延展整套 — Phase 3–4  
3. 卖点画出来 — Phase 5–6  
4. 流程沉淀为 Skill — 即本 skill；新产品只换照片 + brief 字段  

---

## After a finished project (reuse)

When the user says “把这次流程收成可复用经验”:

1. Summarize their confirmed style line, category defaults, and prompt patterns into `brief.md` “House rules” section.
2. Do **not** invent a second skill file unless they ask via `skill-creator`.
3. Next product: load house rules + new photos → restart Phase 1 with fields prefilled.
