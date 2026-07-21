# Text Effects — CapCut / 剪映

5 text effects using only native CapCut features. No external assets needed. All recipes are for 9:16 vertical video unless noted.

---

## 1. Scan Glow Text (扫描流光文字)

**Suitable for:** video intros, tech-style openings, cover titles, account branding
**Difficulty:** zero-basis
**Time:** 3–5 minutes

### Steps

1. Create project, import background video, lock aspect ratio to 9:16, extend video to 4–6 seconds
2. Bottom toolbar → **Text** → **New Text**, type your title
3. Font settings:
   - Font: bold typeface (粗黑体 / 江湖体 or similar heavy weight)
   - Size: fill roughly 1/3 of screen width
4. Style settings:
   - Fill: white
   - Stroke: 2px, black
   - Shadow: blur 5, distance 3, opacity 100%
5. Extend text track to match video duration
6. Return to main timeline → **Picture-in-Picture** → **Add PiP** → search "黑场" in asset library → add solid black clip
7. Select the black PiP layer → pinch-zoom to fill entire screen → match duration to text
8. Bottom toolbar → **Layer** → **Move to Top** (black layer above text)
9. Select black PiP layer → bottom toolbar → **Mask** → **Linear Mask**
10. Set feather to **15**
11. Position the mask's white line vertically at the **far left edge** of the text (text fully visible, black covers right side)

### Keyframe sequence

12. Drag timeline to **0:00** (start) → tap the **diamond keyframe icon** (first keyframe set)
13. Drag timeline to **end of clip** → drag the mask's white line to the **far right edge** of the text

### Result

A bright glow sweeps left-to-right across the text over the full duration.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Mask type | Linear | Vertical orientation |
| Feather | 15 | Below 10 causes jagged edges |
| Font weight | Bold / Heavy | Thin fonts make the glow invisible |
| Shadow blur | 5 | Separates text from background |

### Tips

- Add a "whoosh / 流光" sound effect from the audio library, align to the sweep animation
- For a right-to-left sweep, reverse the keyframe positions
- For repeated sweeps, duplicate the black PiP layer and offset each copy

### Combinations

- Pair with Effect 4 (staggered layout) for a multi-line scan reveal
- Use as intro, then cut to Effect 5 (flash transition) for high-energy opening

---

## 2. Gradient Color Flow Text (渐变流动变色文字)

**Suitable for:** emotional captions, vlogs, lyric overlays, slow-motion sequences
**Difficulty:** zero-basis
**Time:** 2–4 minutes

### Steps

1. **Text** → **New Text**, type your caption, adjust font/size/position, extend text track
2. Select text → bottom toolbar → **Style**
3. Set initial fill color (e.g., light blue #A8D8EA)

### Keyframe sequence (basic 3-color flow)

4. Timeline at **start of text** → tap **diamond keyframe icon** (color A locked)
5. Timeline to **midpoint** → change fill color to second color (e.g., pink-purple #D4A5E5) → keyframe auto-created
6. Timeline to **end** → change fill color to third color (e.g., warm orange #F5C27A) → keyframe auto-created

### Result

Text color smoothly transitions through 3 colors over its duration.

### Advanced: gradient fill flow

7. In Style → enable **Gradient Fill** → select linear gradient
8. Set left end to color A, right end to color B
9. Set keyframe at start with gradient at current angle
10. Move timeline forward → adjust gradient angle or swap endpoint colors → keyframe auto-created
11. Optional: add **Breathe (呼吸)** loop animation, duration 1.5s, for subtle brightness pulsing

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Keyframe count | 3–5 | More = smoother transition, but diminishing returns past 5 |
| Color spacing | Analogous or complementary | Avoid jarring hue jumps unless intentional |
| Breathe animation | 1.5s | Adds organic feel; optional |
| Gradient angle change | 30–60° per keyframe | Subtle rotation reads as "flowing" |

### Tips

- Keep colors within the same saturation family for elegant results
- Works best on longer text tracks (3+ seconds) — too short and the transition isn't visible
- Combine with glow effect in Style for soft luminance

### Combinations

- Layer under Effect 1 (scan glow) for glow + color shift simultaneously
- Use for emotional subtitle overlays in lyric/poetry segments

---

## 3. Glitch Color Text (故障闪色文字)

**Suitable for:** streetwear/hypebeast content, suspense/thriller, beat-sync videos, tech/digital content
**Difficulty:** zero-basis
**Time:** 3–5 minutes

### Steps

1. **Text** → **New Text**, type your text, set base style (fill: white), extend track
2. Long-press the text track → **Copy** from the popup menu → creates a second identical text layer
3. Select the **upper (copy) layer** → **Edit** → **Style** → change fill to a high-contrast neon color (fluorescent red #FF3B3B / cyan blue #00E5FF)
4. Select the upper layer → bottom toolbar → **Animation** → switch to **Loop** tab
5. Find **Glitch Flash (故障闪动)** → set duration to **0.25s** (shorter = more aggressive tearing)

### Result

The two overlapping text layers create a rapid color-tearing glitch effect — the neon layer flickers on/off over the white base layer.

### Advanced: offset for stronger tearing

6. Select the upper neon layer → nudge position 1–2 pixels right and 1 pixel down (slight misalignment)
7. Optional: add light shadow to upper layer for depth separation

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Glitch animation duration | 0.25s | 0.1s = extreme; 0.5s = subtle |
| Upper layer color | High-contrast neon | Must contrast strongly with base layer |
| Position offset | 1–2px | More than 3px looks broken rather than intentional |
| Base layer color | White or light grey | Dark base + dark glitch = invisible |

### Tips

- Sync each glitch flash peak to a drum hit in the audio track for maximum impact
- For horror/suspense, use red glitch on white base; for tech/cyber, use cyan on white
- Keep the effect to 1–3 seconds — extended glitch loses impact

### Combinations

- Precede Effect 5 (flash transition) for a glitch → blackout → scene change sequence
- Layer over Effect 4 (staggered layout) for a glitching title card

---

## 4. Staggered Layout Title (错落分层创意排版标题)

**Suitable for:** video covers/thumbnails, main titles, image-text montage, drama title cards
**Difficulty:** zero-basis
**Time:** 5–8 minutes

### Steps

1. **Text** → **New Text**, type full title (e.g., "五种文字创意效果")
2. Bottom toolbar → **Arrange (排列)** → switch to vertical/staggered layout
3. Set character spacing to **10**
4. Pinch-drag the text box to split lines, offset each line vertically for staggered rhythm

### Emphasis hierarchy

5. Long-press text track → **Copy** multiple times, one copy per text segment
6. Select each segment individually:
   - **Primary keyword**: font size ×1.8, fill with accent color (high-contrast), bold weight
   - **Secondary text**: reduce font size, fill with grey (#999999)

### Unified styling

7. Select all text layers → **Style**:
   - Stroke: 4px, black
   - Shadow: blur 8, black, moderate distance
8. Fine-tune each line's horizontal position — do NOT center-align; intentional misalignment creates editorial tension
9. Position all text in the **upper 1/3** of the frame; leave lower 2/3 for subject/product image

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Character spacing | 10 | Prevents cramped stacking |
| Primary keyword scale | 1.8× base size | Must be visually dominant |
| Stroke width | 4px | Ensures text reads over any background |
| Shadow blur | 8 | Lifts text off background plane |
| Vertical position | Upper 1/3 | Standard cover composition |

### Tips

- Use no more than 2 colors — one accent, one neutral
- Maximum 3 text size tiers (large / medium / small) — more tiers look chaotic
- Test readability at thumbnail size (small preview) before committing

### Combinations

- Animate with Effect 1 (scan glow) for a reveal effect on the title card
- Add Effect 2 (gradient color) to the primary keyword for dynamic emphasis

---

## 5. Full-Screen Flash Transition (全屏频闪文字闪屏转场)

**Suitable for:** clip transitions, beat drops, highlight moments, high-energy segment cuts
**Difficulty:** zero-basis
**Time:** 1–2 minutes per instance

### Steps

1. Position timeline cursor at the **exact cut point** between two video clips
2. **Text** → **New Text** → type a single solid circle symbol: **●** (find in symbol keyboard)
3. Pinch-zoom the circle to fill the entire 9:16 screen
4. Bottom toolbar → **Style**:
   - Fill: pure black (#000000)
   - Opacity: **15%**
   - Stroke: off
   - Shadow: off
5. Select the text track → bottom toolbar → **Animation** → **Loop** tab
6. Select **Glitch Flash (故障闪动)** or **Flicker (闪烁)** → set duration to **0.1s** (minimum)
7. **Trim** the text track to **0.3–0.5 seconds** total — just long enough for 1–2 flash cycles

### Result

A rapid semi-transparent black flash hits the screen for a split second, creating an impact-cut transition effect.

### Batch application

8. Copy the trimmed flash text element
9. Paste at every beat-drop point in the timeline
10. Align each copy's center to the drum hit in the audio waveform

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Symbol | ● (solid circle) | Must fill screen edge-to-edge |
| Fill opacity | 15% | Higher = harder flash; 10–20% range is sweet spot |
| Animation duration | 0.1s | Minimum value; creates fastest flash |
| Total clip length | 0.3–0.5s | Longer = strobe; shorter = single impact |
| Fill color | Black | White for "whiteout" variant |

### Tips

- Always align to an audio beat — unsynced flashes feel like errors, not effects
- For a stronger hit, duplicate the flash element and offset by 0.1s for a double-flash
- White fill (#FFFFFF) at 15% creates a "whiteout flash" variant for brighter scenes
- Combine with a bass-heavy SFX hit for maximum impact

### Combinations

- Place immediately after Effect 3 (glitch text) for a glitch → blackout → new scene sequence
- Use between two clips that were planned with `【尾帧转场】` push-in or light transitions in the prompt — the flash covers the seam

---

## General rules for all text effects

### Font selection
- Always use **bold / heavy weight** fonts — thin fonts lose visibility with glow, glitch, and shadow effects
- Safe defaults: 粗黑体, 思源黑体 Heavy, 站酷快乐体, 江湖体

### Feathering
- Any mask-based effect (Effect 1) requires feather **≥ 10** — below 10 produces hard pixel edges that look amateur

### Keyframe precision
- Pinch-zoom the timeline (spread two fingers on the track area) to magnify the time scale before placing keyframes
- Align keyframes to audio waveform peaks for beat-synced effects

### Shadow as separator
- Enable shadow on ALL text effects before export — text without shadow merges into backgrounds, especially on AI-generated footage which often has complex textures

### Stacking effects
- Effects can combine on the same text element or across layers:

| Combination | Result |
|---|---|
| Effect 4 (layout) + Effect 2 (gradient) | Animated cover title |
| Effect 1 (scan glow) + Effect 4 (layout) | Multi-line reveal |
| Effect 3 (glitch) + Effect 5 (flash) | Glitch → blackout transition |
| Effect 2 (gradient) + breathe animation | Ambient emotional subtitle |
