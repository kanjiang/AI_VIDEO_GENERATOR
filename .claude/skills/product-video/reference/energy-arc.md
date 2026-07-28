# Energy Arc — Promo Film Pacing Structure

Every product promo film follows an **energy arc** that controls audience attention. Energy is not volume or speed — it's the combined intensity of motion, visual density, information weight, and audio drive.

Source: video-shotcraft "promo-energy-arc" methodology.

## The Four-Segment Arc

```
Energy
  ▲
  │         ┌──────┐
  │    ┌────┤Feature│──┐     ┌─────┐
  │    │    │ Climb │  │     │Outro│
  │ ┌──┤Hero│      │  └─────┤ Peak│──┐
  │ │  │Spot│      │        │     │  │
  │─┤  │    │      │        │     │  └──
  │ │Brand  │      │        │     │
  │ │Open   │      │        │     │
  ──┴──┴────┴──────┴────────┴─────┴────→ Time
   2-3s  3-5s    Main body        3-5s
```

### Segment 1: Brand Open (Low → Mid)

| Parameter | Value |
|-----------|-------|
| Duration | 2–3s (60–90 frames @ 30fps) |
| Energy | Low, rising to Mid |
| Purpose | Establish identity, set visual tone |
| Recipe | `brand-press`, `logo-morph`, `wordmark-slide`, or `dark-fade` |
| SFX | Single impact/settle |
| Caption | None or tagline only |

Rules:
- Wordmark/logo must hold for **≥ 1s** after animation completes
- No product UI visible yet — brand identity only
- Texture/color sets expectation for entire film

### Segment 2: Hero Spotlight (Mid)

| Parameter | Value |
|-----------|-------|
| Duration | 3–5s (90–150 frames) |
| Energy | Mid, sustained |
| Purpose | One hero feature, full action arc |
| Recipe | One UI entrance + one interaction recipe |
| SFX | Entrance whoosh + interaction sound |
| Caption | One sentence value proposition |

Rules:
- Show exactly **one** subject completing **one** full action
- Action arc: entrance → interaction → result visible → hold
- Minimum hold at end: 0.5s (15 frames) for audience to absorb result
- This is where the audience decides whether to keep watching

### Segment 3: Feature Climb (Mid ↔ Low, oscillating)

| Parameter | Value |
|-----------|-------|
| Duration | Main body (total minus ~10s for open + outro) |
| Energy | Oscillating: Mid–High for features, Low for title cards |
| Purpose | Walk through 3–5 hero features |
| Structure | `[title card] → [feature demo] → [title card] → [feature demo] → ...` |
| SFX | Per-feature entrance + interaction sounds |
| Caption | Feature name on title card, benefit statement on demo |

Rules:
- Each feature gets a **unique** motion technique (no recipe reuse)
- Title cards (typography recipes) serve as rest beats — energy dips to Low
- Energy must oscillate: never two adjacent high-energy segments, never two adjacent low-energy segments
- The **star technique** (one signature hero motion) appears exactly once in this segment
- Information density: one feature = one concept, not three features crammed into one segment

#### Oscillation Pattern

```
Feature Climb internal pacing:

  High ──┐    ┌──┐    ┌──┐    ┌──
         │    │  │    │  │    │
  Mid  ──┤────┤  ├────┤  ├────┤
         │    │  │    │  │    │
  Low  ──┘────┘  └────┘  └────┘
        Title Feature Title Feature Title Feature
        Card  Demo   Card  Demo   Card  Demo
```

### Segment 4: Outro Peak (Highest → Low)

| Parameter | Value |
|-----------|-------|
| Duration | 3–5s (90–150 frames) |
| Energy | Peaks at highest point of the film, then resolves to Low |
| Purpose | Climax + call-to-action |
| Recipe | `element-assembly`, `cta-lock`, or `letterpress-sign` |
| SFX | Climax riser + final impact |
| Caption | CTA text (URL, "Try free", etc.) |

Rules:
- Energy peak must be the **highest** in the entire film
- CTA (if present) holds for **≥ 2s** (60 frames)
- If opening used `brand-press`, consider closing with `letterpress-sign` for bookend
- Final frame must be clean, readable, and contain the most important information (URL, brand, CTA)

## Hold & Rest Budget

Before allocating any motion frames, budget the **holds** and **rests** first:

| Hold type | Minimum duration | When |
|-----------|-----------------|------|
| Post-brand hold | 1.0s (30f) | After brand logo animation settles |
| Post-entrance hold | 0.5s (15f) | After any UI element enters frame |
| Post-interaction hold | 0.5s (15f) | After an interaction result is visible |
| Title card hold | 0.8s (24f) | Title text must be readable before next motion |
| CTA hold | 2.0s (60f) | Call-to-action at film end |
| Rest beat | 0.3s (9f) | Between any two adjacent motions |

**Budget method:**
1. Sum all mandatory holds → `total_hold_frames`
2. `total_frames - total_hold_frames = motion_budget`
3. Allocate motion_budget across shots
4. If motion_budget is tight, cut features, not holds

## Beat Sync Methodology

For music-driven promos:

### Pre-production (before storyboard)

1. Select or compose BGM track
2. Analyze BPM using librosa or manual tap:
   ```python
   import librosa
   y, sr = librosa.load('bgm.mp3')
   tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
   beat_frames = librosa.frames_to_time(beats, sr=sr) * 30  # convert to video frames at 30fps
   ```
3. Map beat positions to the energy arc:
   - Strong beats → cut points
   - Beat groups (4-bar or 8-bar phrases) → segment boundaries
   - Drops → star technique / energy peaks

### Post-render verification

| Check | Tolerance |
|-------|-----------|
| Cut-to-beat alignment | ≤ 3 frames (100ms) |
| SFX-to-beat alignment | ≤ 1 frame (33ms) |
| Segment boundary-to-phrase | ≤ 0.5 bars |

## Duration Templates

Pre-built energy arc timing for common durations:

### 15-second promo (450 frames)

| Segment | Frames | Seconds |
|---------|--------|---------|
| Brand open | 45 | 1.5s |
| Hero spotlight | 120 | 4s |
| Feature × 2 | 195 | 6.5s |
| Outro | 90 | 3s |

### 30-second promo (900 frames)

| Segment | Frames | Seconds |
|---------|--------|---------|
| Brand open | 75 | 2.5s |
| Hero spotlight | 150 | 5s |
| Feature × 3 (with title cards) | 525 | 17.5s |
| Outro | 150 | 5s |

### 45-second promo (1350 frames)

| Segment | Frames | Seconds |
|---------|--------|---------|
| Brand open | 90 | 3s |
| Hero spotlight | 150 | 5s |
| Feature × 4–5 (with title cards) | 960 | 32s |
| Outro | 150 | 5s |

### 60-second promo (1800 frames)

| Segment | Frames | Seconds |
|---------|--------|---------|
| Brand open | 90 | 3s |
| Hero spotlight | 180 | 6s |
| Feature × 5–6 (with title cards) | 1350 | 45s |
| Outro | 180 | 6s |

## Energy Flatline Detection

Adjacent segments with the same energy level create audience fatigue. Check for and fix:

| Problem | Fix |
|---------|-----|
| Two adjacent Mid features | Insert a Low title card between them |
| Two adjacent Low rests | Merge into one or elevate one to Mid |
| Feature Climb stuck at Mid | Introduce one High star technique moment |
| Outro lower than Feature Climb peak | Increase outro energy (add riser SFX, faster motion) |
| Brand open too energetic | Reduce motion complexity, extend hold |

## Micro-Energy Within Shots

Each individual shot also has an internal energy curve:

```
Entry (rising) → Peak (action) → Settle (falling) → Hold (flat)
   ~20%              ~30%            ~20%              ~30%
```

Budget:
- **Entry:** Element appears, camera moves to position
- **Peak:** The main action/interaction happens
- **Settle:** Motion eases out, elements lock into position
- **Hold:** Static or near-static for audience comprehension

Never cut during the Hold phase — it feels rushed. Always cut during or just after Settle.
