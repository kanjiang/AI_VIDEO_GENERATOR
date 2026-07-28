# Remotion Production Pipeline

Code-track production for software product promo videos using Remotion (React/TSX). This pipeline produces deterministic, frame-accurate, pixel-perfect video from real product screenshots.

Source: [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) Ink Press template system.

## Prerequisites

```bash
npm create video@latest   # or clone video-shotcraft template/
npm install
npx remotion studio src/index.ts   # preview
```

Key dependencies: `remotion 4.x`, `react 19.x`, `@remotion/cli`.

## 8-Stage Pipeline

### Stage 0 — Product Brief

Collect from the user:

| Field | Required | Example |
|-------|----------|---------|
| Product name & URL | Yes | "Aifl — aifl.app" |
| Core value proposition | Yes | "AI-powered document search" |
| Target audience | Yes | "SaaS founders, product managers" |
| 3–5 hero features | Yes | "Smart search, Auto-tagging, Weekly reports" |
| Brand tokens (colors, fonts) | Yes | Primary: #1a1a2e, Font: Inter |
| Data safety constraints | If applicable | "Blur all user emails, no real customer data" |
| Target duration | Yes | "30s / 45s / 60s" |
| Aspect ratio | Yes | "16:9 (default) / 9:16 (vertical) / 1:1 (social)" |
| Audio constraints | If applicable | "No voiceover, instrumental only" |

Output: `BRIEF.md` in project root.

### Stage 1 — Visual Direction (Styleframe)

Before any Remotion code, create a **styleframe** — a static HTML/CSS mockup of the key visual treatment:

- Background texture / color (paper, gradient, solid, dark)
- Typography stack (headings, body, mono)
- Color palette derived from brand tokens
- Border/shadow treatment
- Transition style vocabulary (slide, fade, scale, rotate)

Output: `styleframe.html` + design tokens object.

Do NOT write Remotion code yet. The styleframe is a checkpoint for visual approval.

### Stage 2 — Feature → Shot Map

Map each feature to a shot recipe from the [shot-recipes.md](shot-recipes.md) catalog:

```
Feature 1 (Smart Search) → "scroll-reveal" (ui-entrance) + "type-and-respond" (interaction)
Feature 2 (Auto-tagging) → "deck-deal-flyin" (opening) + "chip-cascade" (effects)
Feature 3 (Weekly Report) → "digit-roll" (data) + "carousel-swipe" (interaction)
```

Rules:
- Each feature gets 1–2 shot recipes maximum
- No recipe appears twice in the same film (except basic transitions)
- The "star" technique is used exactly once
- Verify recipe names against the catalog before proceeding

Output: Shot map table with `| Feature | Recipe | Duration (frames) | Energy level |`.

### Stage 3 — Storyboard (Frame Table)

Convert the shot map into a frame-accurate storyboard:

| Shot | Recipe | From | Dur | Description | SFX | Caption |
|------|--------|------|-----|-------------|-----|---------|
| 1 | brand-open | 0 | 90 | Logo press animation, hold ≥1s | impact + settle | — |
| 2 | scroll-reveal | 90 | 120 | Smart Search page scroll to feature | whoosh | "Find anything, instantly" |
| ... | | | | | | |

Rules:
- Total frames must equal composition `durationInFrames`
- FPS = 30 (default); adjust only if user specifies otherwise
- Every shot must have explicit `from` and `dur` — no gaps, no overlaps
- Hold budget: first frame of each shot holds ≥ 15 frames (0.5s) before motion

Output: `STORYBOARD.md` — this is the production go/no-go checkpoint.

### Stage 4 — Capture (Puppeteer Triad)

For every product page that appears in the video, produce three artifacts:

| Artifact | What | How |
|----------|------|-----|
| Full-page PNG | Complete page at 2× deviceScaleFactor | Puppeteer `page.screenshot({ fullPage: true })` |
| Element cutouts | Transparent PNGs of individual UI cards/sections | Puppeteer per-element screenshot or manual mask |
| Layout JSON | `{ x, y, w, h }` bounding boxes for key elements + `pageH` | Element `getBoundingClientRect()` dump |

```javascript
// Capture template (conceptual)
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle0' });

// Full page
await page.screenshot({ path: 'page-full.png', fullPage: true });

// Layout extraction
const layout = await page.evaluate(() => {
  const els = document.querySelectorAll('[data-capture]');
  return Array.from(els).map(el => {
    const r = el.getBoundingClientRect();
    return { id: el.dataset.capture, x: r.x, y: r.y, w: r.width, h: r.height };
  });
});
```

Output: `public/textures/live/` directory with PNGs + `live-layout.json`.

**Data safety:** Apply blur/redaction to any sensitive data BEFORE capture. Never capture real user data without explicit permission.

### Stage 5 — Implement (Remotion Scenes)

Build the Remotion composition following this architecture:

```
src/
├── index.ts           # registerRoot(Root)
├── Root.tsx           # <Composition id="..." .../>
└── project-name/
    ├── Main.tsx       # Timeline: SHOTS array + overlay Sequences
    ├── Scene*.tsx     # One component per storyboard shot
    ├── Caption.tsx    # Narration text overlays
    ├── FlashCut.tsx   # Warm flash between hard cuts
    └── PageCam.tsx    # 2.5D page camera (core abstraction)
```

#### PageCam — Core Abstraction

PageCam wraps a full-page screenshot and animates a virtual camera over it:

```typescript
type CamKey = {
  frame: number;
  cx: number;      // center X in page pixels
  cy: number;      // center Y in page pixels
  zoom: number;    // 1 = fit width, >1 = zoom in
  rotX?: number;   // optional 2.5D tilt (degrees)
  rotY?: number;
  rotZ?: number;
  persp?: number;  // perspective distance (px)
};
```

- Interpolates between keys using `interpolate()` + `Easing.bezier()`
- Uses CSS `zoom` (not `transform: scale`) so text stays sharp at high zoom
- Optional depth-of-field gradient band for macro shots
- Children positioned in **page CSS pixels** using layout.json bounding boxes

#### Shot Array Pattern

```typescript
const SHOTS = {
  brandOpen:    { from: 0,   duration: 90 },
  heroSearch:   { from: 90,  duration: 120 },
  featureTag:   { from: 210, duration: 105 },
  // ... sum must equal durationInFrames
} as const;
```

#### Overlay Layers

After scene Sequences, add overlay Sequences for:
- **Captions**: absolute-frame narration strips
- **SFX**: `<Audio src={staticFile('audio/whoosh.mp3')} />` pinned via Sequence
- **FlashCut**: warm white flash bridging hard cuts (~10 frames, centered on cut point)

#### QA Loop

After each scene:
```bash
npx remotion still src/index.ts CompositionId out/qa/shot1-f0.png --frame=0
npx remotion still src/index.ts CompositionId out/qa/shot1-f45.png --frame=45
```

Verify:
- Text is readable (not blurred, not clipped)
- UI elements are correctly positioned (match layout.json)
- Motion direction matches storyboard intent
- No visual artifacts at cut boundaries

Full render after all scenes pass:
```bash
npx remotion render src/index.ts CompositionId out/promo.mp4
```

### Stage 6 — Sound Design

After picture lock (no more motion changes), add audio:

| Type | Source | Placement |
|------|--------|-----------|
| SFX | Mixkit or custom (whoosh, impact, riser, sparkle, mechanical) | Sequence-pinned to exact cut frames |
| BGM | Licensed track or AI-composed | Laid under full timeline, ducked during SFX hits |
| Voiceover | Optional | Separate Audio track, aligned to captions |

SFX declaration pattern:
```typescript
const SFX_TABLE = [
  { from: 0,   src: 'audio/impact-soft.mp3',   volume: 0.6 },
  { from: 88,  src: 'audio/whoosh-fast.mp3',    volume: 0.4 },
  { from: 90,  src: 'audio/paper-slide.mp3',    volume: 0.3 },
  // ...
];
```

For beat-synced films: analyze BPM with librosa before storyboard; post-render verify cut-to-beat error ≤ 3 frames.

### Stage 7 — Final Review

Spawn a clean-context review pass checking:

- [ ] Every shot matches storyboard description
- [ ] Text is legible at 1080p playback
- [ ] No UI elements are clipped at frame edges
- [ ] Brand colors match product design system
- [ ] Hold budgets respected (≥ 0.5s after each new element)
- [ ] SFX hit on correct frames (±1 frame tolerance)
- [ ] Total duration matches brief target
- [ ] No non-deterministic artifacts (re-render and diff frames)
- [ ] Data safety: no real user data visible

## Deterministic Motion Rules

These rules ensure frame-identical output across renders:

| Banned | Alternative |
|--------|-------------|
| `Math.random()` | Seeded PRNG: `mulberry32(seed)` |
| `Date.now()` | `useCurrentFrame()` |
| `setTimeout` / `requestAnimationFrame` | Remotion's frame-based lifecycle |
| Fetch / async data in render | Pre-compute and pass as props or static data |
| CSS `transition` / `animation` | `interpolate()` + `Easing` |
| `opacity: 0` without `absoluteOpacity` consideration | Use Remotion's `<Sequence>` to control visibility |

## Motion Helpers

Reusable patterns extracted from video-shotcraft `assets/lib/helpers/`:

| Helper | Purpose |
|--------|---------|
| `rand.ts` | Seeded PRNG for deterministic randomness |
| `motion.ts` | `velocityAt()` — instantaneous velocity; `lagged()` — follow-through delay; `dampedSettle()` — spring settle |
| `shake.ts` | Camera shake patterns (impact, handheld, subtle) |
| `camera.tsx` | Camera path interpolation utilities |

## Reusable Components

| Component | Purpose |
|-----------|---------|
| `PageCam` | 2.5D page camera over full-page screenshot |
| `Caption` | Narration text strip with enter/exit animations |
| `DigitRoll` | Animated counter (for metrics, percentages) |
| `FlashCut` | Warm flash between hard cuts |
| `FlatPanel` | 3D floating panel (requires @react-three/fiber) |
| `VerticalTicker` | Scrolling text ticker |
