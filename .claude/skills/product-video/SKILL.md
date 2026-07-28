---
name: product-video
description: Software product promotional video production — dual-track workflow supporting both Remotion code-rendered videos (UI demos, feature showcases) and AI-generated product promo clips (Seedance/Kling). Use whenever the user asks to create a product demo video, SaaS promo, app feature showcase, landing page hero video, product launch trailer, or any video whose primary subject is a software product's UI/UX. Covers shot recipe selection, energy-arc pacing, page capture, Remotion implementation, and AI prompt adaptation for product contexts.
---

# Product Video Skill

This skill covers the **end-to-end production of software product promotional videos** — from brief to final render. It supports two parallel production tracks that can be used independently or combined:

| Track | Tool | Best for |
|-------|------|----------|
| **Code track** | Remotion (React/TSX) | Pixel-perfect UI demos, deterministic motion, frame-accurate SFX sync, interactive elements, data visualizations |
| **AI track** | Seedance 2.0 / Kling | Atmospheric brand films, lifestyle contexts, cinematic product beauty shots, conceptual narratives around the product |

Source methodology: [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) (Apache-2.0) — 104 shot recipes, PageCam abstraction, Ink Press template system.

## When to use

Trigger when the user asks about:
- Creating a product demo video, SaaS promo, or app showcase
- Building a landing page hero video or product launch trailer
- Making a feature walkthrough or onboarding video
- Designing UI motion for a promotional context
- Capturing and animating real product screenshots
- Selecting shot types for product storytelling (fly-in, deck deal, scroll reveal, etc.)
- Planning the energy arc / pacing for a tech promo
- Converting product screenshots into animated video

Do NOT use when:
- The user is making a narrative film or short drama — use `shotlist-builder` + `screenwriter-skill`
- The user is making a science explainer — use `science-explainer`
- The user is doing general post-production editing — use `post-production`
- The user is extracting visual style from reference — use `style-extractor`

## Reference files

- [reference/remotion-pipeline.md](reference/remotion-pipeline.md) — 8-stage Remotion production pipeline, PageCam abstraction, capture triad, deterministic motion rules, CLI commands
- [reference/shot-recipes.md](reference/shot-recipes.md) — 104 shot recipe catalog in 10 categories (opening, ui-entrance, camera, interaction, data, typography, effects, rhythm, transition, outro) with selection matrix
- [reference/energy-arc.md](reference/energy-arc.md) — Promo film energy structure (brand open → hero spotlight → feature climb → outro peak), hold/rest budgets, beat sync methodology
- [reference/ai-promo-prompts.md](reference/ai-promo-prompts.md) — AI prompt adaptation rules for product promo videos using Seedance/Kling, bridging our cinematic prompt system to product contexts

## Track selection logic

```
User wants product video
  ├─ Needs pixel-perfect UI? ─── YES ──→ Code track (Remotion)
  │     ├─ Has product screenshots? → Capture triad → PageCam scenes
  │     └─ No screenshots yet? → Puppeteer capture or manual screenshots first
  │
  ├─ Needs cinematic/atmospheric? ─── YES ──→ AI track (Seedance)
  │     ├─ Product in real-world context (desk, café, outdoor) → AI lifestyle promo
  │     └─ Abstract brand film (particles, light, emotion) → AI brand film
  │
  └─ Needs both? ──→ Hybrid
        ├─ Code track for UI demo segments
        ├─ AI track for lifestyle/atmosphere segments
        └─ Combine in post-production (post-production skill)
```

## Core principles

### 1. Motion is meaning, not decoration

Every animation must communicate something: hierarchy (what matters first), relationship (how features connect), capability (what the product does). If a motion doesn't serve one of these, remove it. This applies to both Remotion keyframes and AI prompt camera movements.

### 2. One star technique per film

Each promo should have exactly one signature motion technique that appears once. A 360° orbit of the hero screen, a dramatic zoom into a data cell, a split-screen comparison. Everything else uses restrained, professional motion. Overusing "hero moments" dilutes impact.

### 3. Product is the subject, not the backdrop

In every frame, the product UI must be the visual subject. Backgrounds, atmospheric effects, and environmental context exist to elevate the product, never to compete with it. This constrains both code-track compositions and AI-track prompt writing.

### 4. Hold budgets before motion budgets

Budget still-hold time before animation time. The audience needs frames to read UI text, process a feature, and form an opinion. Rule of thumb: **hold ≥ 0.5s** after any significant UI element appears before the next motion begins. In Remotion this means explicit hold frames; in AI prompts this means slow/static camera segments.

### 5. Deterministic renders (Code track)

Remotion renders must be frame-identical across runs. Ban `Math.random()`, `Date.now()`, and any non-deterministic API. Use seeded PRNG from `helpers/rand.ts` pattern. This ensures QA screenshots match final output.

## Scope boundaries

| Task | Handled by | NOT this skill |
|------|------------|----------------|
| Shot recipe selection & energy arc | **This skill** | |
| Remotion TSX implementation | **This skill** (code track) | |
| PageCam + capture pipeline | **This skill** (code track) | |
| AI prompt for product beauty shot | **This skill** (AI track) | |
| AI prompt for narrative film | `shotlist-builder` | |
| CapCut editing after render | `post-production` | |
| BGM composition & sync | `bgm-scoring` | |
| Style extraction from brand reference | `style-extractor` | |
| Character-driven performance prompts | `shotlist-builder` + `MICRO_BEATS.md` | |

## Workflow overview

### Code track workflow

```
Product brief → Visual direction → Shot map → Storyboard → Capture → Implement → Sound → Review
     S0              S1               S2          S3          S4        S5        S6      S7
```

See [remotion-pipeline.md](reference/remotion-pipeline.md) for the full 8-stage breakdown.

### AI track workflow

```
Product brief → Style extraction → Shot plan → Asset generation → Video prompts → AI generation → Post
                 (style-extractor)   (energy-arc   (asset-canvas)   (ai-promo-       (Seedance)
                                      + recipes)                     prompts.md)
```

See [ai-promo-prompts.md](reference/ai-promo-prompts.md) for prompt adaptation rules.

### Hybrid workflow

1. Plan the full film using the energy arc
2. Tag each segment as `CODE` or `AI`
3. Produce code-track segments via Remotion
4. Produce AI-track segments via Seedance prompts
5. Assemble in post-production with unified color grade and audio

## Hard rules

- **Product screenshots at 2× resolution minimum.** All page captures must be at `deviceScaleFactor: 2` for sharpness under zoom. 4× for macro/close-up shots.
- **No stock UI.** Every screenshot in the video must be the real product. Grayscale placeholders are acceptable only during prototyping, never in final renders.
- **Brand tokens drive visual design.** Colors, fonts, border radii, and spacing come from the product's design system — not from arbitrary "cool" choices. If the product uses Inter 400 and #1a1a2e, the video uses Inter 400 and #1a1a2e.
- **SFX vocabulary is cinematic, not gamey.** Allowed: whoosh, impact, riser, sparkle, paper, mechanical click. Forbidden: 8-bit bleeps, cartoon bonks, notification chimes (unless the product literally makes those sounds).
- **Frame-accurate audio.** In code track, every SFX must be Sequence-pinned to the exact cut frame. In AI track, audio sync is handled in post-production.
- **Energy never flatlines.** If two adjacent segments have the same energy level, insert a micro-rest or adjust pacing. See [energy-arc.md](reference/energy-arc.md).
