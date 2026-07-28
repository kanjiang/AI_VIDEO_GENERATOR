# Shot Recipe Catalog

104 shot recipes organized in 10 categories for product promotional videos. Each recipe defines a motion pattern, timing, energy level, and common use case.

Source: [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) shot library.

## Category Overview

| Category | Count | Energy Range | Typical Position |
|----------|-------|-------------|------------------|
| Opening | 9 | Low–Mid | Film start (first 2–5s) |
| UI Entrance | 15 | Mid | Feature introduction |
| Camera | 7 | Mid–High | Hero moments, reveals |
| Interaction | 11 | Mid | Feature demonstration |
| Data | 8 | Mid | Metrics, statistics |
| Typography | 14 | Low–Mid | Title cards, labels |
| Effects | 10 | Mid–High | Visual accents |
| Rhythm | 10 | Variable | Pacing control |
| Transition | 15 | Low | Between segments |
| Outro | 5 | High→Low | Film end (last 3–5s) |

## Quick Selection Matrix

Use this matrix to find the right recipe for your shot:

| You need to... | Category | Top picks |
|----------------|----------|-----------|
| Open the film with brand identity | Opening | `brand-press`, `logo-morph`, `wordmark-slide` |
| Reveal a product page for the first time | UI Entrance | `scroll-reveal`, `deck-deal-flyin`, `browser-frame-in` |
| Show a dramatic hero moment | Camera | `orbit-360`, `crane-rise`, `dolly-zoom` |
| Demonstrate a feature interaction | Interaction | `type-and-respond`, `click-ripple`, `drag-and-drop` |
| Display metrics or data | Data | `digit-roll`, `bar-chart-grow`, `percentage-ring` |
| Add a title card between sections | Typography | `paper-title-card`, `kinetic-type`, `stagger-reveal` |
| Add visual flair to a transition | Effects | `particle-burst`, `chip-cascade`, `glow-pulse` |
| Control pacing and energy | Rhythm | `quick-cut-montage`, `slow-hold`, `pulse-beat` |
| Bridge between two segments | Transition | `flash-cut`, `morph-wipe`, `slide-push` |
| Close the film | Outro | `element-assembly`, `cta-lock`, `letterpress-sign` |

---

## Opening (9 recipes)

Establish brand identity and set the visual tone.

### brand-press
- **Energy:** Low → Mid
- **Duration:** 60–90 frames (2–3s)
- **Motion:** Logo pressed into textured surface (letterpress effect), settles with impact SFX
- **Use case:** Premium/tactile brand intro
- **SFX:** soft impact + paper settle
- **Rule:** Hold logo for ≥ 1s after animation completes

### logo-morph
- **Energy:** Mid
- **Duration:** 45–75 frames
- **Motion:** Abstract shape morphs into brand logo
- **Use case:** Tech/creative brand intro

### wordmark-slide
- **Energy:** Low
- **Duration:** 60–90 frames
- **Motion:** Brand name slides in from edge, subtle parallax with tagline
- **Use case:** Clean, minimal brand intro

### particle-form
- **Energy:** Mid
- **Duration:** 60–90 frames
- **Motion:** Floating particles coalesce into logo shape
- **Use case:** AI/data product intro

### gradient-bloom
- **Energy:** Low
- **Duration:** 45–60 frames
- **Motion:** Brand gradient expands from center, logo appears inside
- **Use case:** Design tool / creative product intro

### code-type
- **Energy:** Mid
- **Duration:** 60–90 frames
- **Motion:** Product name typed with monospace cursor, code editor aesthetic
- **Use case:** Developer tool intro

### split-reveal
- **Energy:** Mid
- **Duration:** 45–60 frames
- **Motion:** Screen splits vertically, logo revealed between panels
- **Use case:** Comparison / transformation product

### stamp-drop
- **Energy:** Mid–High
- **Duration:** 30–45 frames
- **Motion:** Logo drops from top with bounce settle
- **Use case:** Playful / startup brand intro

### dark-fade
- **Energy:** Low
- **Duration:** 60–90 frames
- **Motion:** Slow fade from black, logo at low opacity, gradual reveal
- **Use case:** Enterprise / premium product intro

---

## UI Entrance (15 recipes)

Bring product pages and features into frame for the first time.

### scroll-reveal
- **Motion:** Page scrolls up to reveal feature section; camera follows
- **Use case:** Long-page product, SaaS dashboard
- **Tip:** Combine with PageCam zoom-in at reveal point

### deck-deal-flyin
- **Motion:** Cards/panels fly in from edges like dealt playing cards
- **Use case:** Multi-card dashboard, portfolio grid
- **Tip:** Stagger entry by 3–5 frames per card

### browser-frame-in
- **Motion:** Browser chrome slides in, then page content loads inside
- **Use case:** Web app first impression
- **Tip:** Use real browser chrome at 2× for crisp text

### device-float
- **Motion:** Device mockup (phone/laptop) floats into frame with subtle rotation
- **Use case:** Mobile app or responsive design showcase

### split-screen-compare
- **Motion:** Two states slide in from opposite edges, meeting at center
- **Use case:** Before/after, old vs. new, competitor comparison

### unfold-panel
- **Motion:** UI panel unfolds from collapsed state, revealing content progressively
- **Use case:** Sidebar, settings panel, expandable section

### zoom-from-context
- **Motion:** Wide shot of desktop/workspace zooms into the product window
- **Use case:** "Product in context" establishing shot

### grid-populate
- **Motion:** Grid cells populate one by one with content tiles
- **Use case:** Gallery, content library, file manager

### tab-switch
- **Motion:** Tab bar click, content area crossfades to new view
- **Use case:** Multi-tab interface demonstration

### slide-stack
- **Motion:** Multiple page layers slide in stacked, top layer focuses
- **Use case:** Multi-page app, wizard/stepper interface

### perspective-tilt
- **Motion:** Page enters flat, tilts to 3D perspective for hero moment
- **Use case:** Visual impact for a single hero page

### curtain-up
- **Motion:** Dark overlay lifts upward like a curtain, revealing the UI
- **Use case:** Dramatic product reveal

### blur-to-sharp
- **Motion:** Heavily blurred background sharpens to reveal crisp UI
- **Use case:** Focus/attention metaphor

### bounce-in
- **Motion:** UI element drops in with spring bounce (overshoot + settle)
- **Use case:** Playful, startup-y aesthetic

### mask-wipe
- **Motion:** Circular or linear mask wipe reveals the product page underneath
- **Use case:** Transition from brand open to first product shot

---

## Camera (7 recipes)

Dramatic camera movements for hero moments. Use sparingly — one star technique per film.

### orbit-360
- **Motion:** Full 360° rotation around the product page/device
- **Energy:** High
- **Star candidate:** Yes — use as the single hero moment
- **Tip:** Requires 3D setup (FlatPanel or CSS perspective)

### crane-rise
- **Motion:** Camera rises vertically, revealing the full page from bottom to top
- **Energy:** Mid–High
- **Use case:** Long page with progressive complexity

### dolly-zoom
- **Motion:** Simultaneous zoom-in and pull-back (Vertigo effect) on a key UI element
- **Energy:** High
- **Star candidate:** Yes — for dramatic feature reveal

### tracking-pan
- **Motion:** Horizontal tracking across a wide dashboard/interface
- **Energy:** Mid
- **Use case:** Multi-column layouts, wide data views

### push-in
- **Motion:** Steady push from overview to detail on a specific element
- **Energy:** Mid
- **Use case:** Feature deep-dive, zooming into a data point

### pull-out
- **Motion:** Reverse of push-in: from detail to overview context
- **Energy:** Mid
- **Use case:** Closing a feature section, "stepping back"

### rack-focus
- **Motion:** Foreground element blurs while background sharpens (or vice versa)
- **Energy:** Mid
- **Tip:** Simulated with DOF gradient in PageCam

---

## Interaction (11 recipes)

Demonstrate product features through simulated user interactions.

### type-and-respond
- **Motion:** Text typed in search/input field, results appear in real-time
- **Use case:** Search, AI chat, autocomplete

### click-ripple
- **Motion:** Cursor clicks a button, ripple effect expands, action result appears
- **Use case:** Any button-triggered action

### drag-and-drop
- **Motion:** Element lifted, dragged across interface, dropped into target zone
- **Use case:** Kanban boards, file management, builders

### hover-expand
- **Motion:** Cursor hovers over element, tooltip/preview expands
- **Use case:** Data-rich interfaces, charts

### toggle-switch
- **Motion:** Toggle flipped, interface transitions between states
- **Use case:** Dark mode, feature flags, settings

### carousel-swipe
- **Motion:** Horizontal swipe gesture, content cards shift left/right
- **Use case:** Content feeds, image galleries

### form-fill
- **Motion:** Form fields populate in sequence with typed/selected values
- **Use case:** Onboarding flow, configuration wizard

### selection-highlight
- **Motion:** Multiple items selected with shift-click, batch action applied
- **Use case:** Batch operations, multi-select interfaces

### pinch-zoom
- **Motion:** Two-finger pinch gesture, canvas zooms into detail
- **Use case:** Design tools, maps, image editors

### scroll-snap
- **Motion:** Smooth scroll snaps to section boundaries
- **Use case:** Vertical scroll apps, presentation mode

### context-menu
- **Motion:** Right-click, context menu appears, action selected
- **Use case:** Power user features, editor tools

---

## Data (8 recipes)

Animate metrics, charts, and quantitative information.

### digit-roll
- **Motion:** Numbers roll/count up to target value
- **Use case:** KPIs, revenue figures, user counts
- **Tip:** DigitRoll component; use tabular-nums font

### bar-chart-grow
- **Motion:** Bar chart bars grow from zero to value, staggered
- **Use case:** Performance metrics, comparisons

### percentage-ring
- **Motion:** Circular progress ring fills to percentage
- **Use case:** Completion rates, scores, quotas

### line-chart-draw
- **Motion:** Line drawn left-to-right with trailing dot
- **Use case:** Trends over time, growth curves

### stat-card-flip
- **Motion:** Card flips to reveal a statistic on the back
- **Use case:** Key metric highlights

### data-table-scan
- **Motion:** Rows in a data table highlight sequentially, cursor follows
- **Use case:** Data analysis features, log viewers

### pie-chart-spin
- **Motion:** Pie chart segments spin in and settle
- **Use case:** Distribution breakdowns

### counter-cascade
- **Motion:** Multiple counter values cascade-update in sequence
- **Use case:** Dashboard with multiple live metrics

---

## Typography (14 recipes)

Title cards, labels, and text-driven motion between content sections.

### paper-title-card
- **Motion:** Text pressed into paper/textured background, subtle shadow
- **Use case:** Section divider between features

### kinetic-type
- **Motion:** Words appear with individual letter animation (scale, rotate, or fade)
- **Use case:** Tagline, key message emphasis

### stagger-reveal
- **Motion:** Lines of text appear one by one with staggered timing
- **Use case:** Feature list, bullet points

### typewriter
- **Motion:** Text typed character by character with cursor
- **Use case:** Code output, terminal-style messaging

### blur-unblur-text
- **Motion:** Blurred text sharpens into focus
- **Use case:** Reveal moments, "clarity" metaphor

### text-mask-video
- **Motion:** Video/animation visible through text letterforms
- **Use case:** Hero headlines, artistic titles

### split-line
- **Motion:** Text line splits in half, revealing content between
- **Use case:** Before/after labels, comparison headers

### weight-shift
- **Motion:** Font weight animates from light to bold (or vice versa)
- **Use case:** Emphasis without position change

### color-wipe-text
- **Motion:** Color fills text from left to right
- **Use case:** Progress indication, highlighting

### vertical-ticker
- **Motion:** Text scrolls vertically in a ticker loop
- **Use case:** Feature lists, social proof, testimonials

### scramble-resolve
- **Motion:** Random characters scramble, then resolve to final text
- **Use case:** Tech/hacker aesthetic, encoding/decoding

### handwrite
- **Motion:** Text appears as if being handwritten (stroke animation)
- **Use case:** Personal touch, annotations

### counter-label
- **Motion:** Label + number appear together, number animates up
- **Use case:** Stat callout with context label

### caption-bar
- **Motion:** Bottom-third narration bar slides in/out
- **Use case:** Voiceover text, contextual narration

---

## Effects (10 recipes)

Visual accents that add energy and polish without being the main subject.

### particle-burst
- **Motion:** Particles explode outward from a point, fade
- **Use case:** Click impact, achievement moment

### chip-cascade
- **Motion:** Small UI chips/tags cascade downward like confetti
- **Use case:** Category reveal, tag generation

### glow-pulse
- **Motion:** Soft glow pulse on a key element
- **Use case:** Highlighting active/selected state

### light-ray
- **Motion:** Animated light rays sweep across the frame
- **Use case:** Transition accent, premium feel

### noise-grain
- **Motion:** Subtle film grain overlay fades in/out
- **Use case:** Vintage/premium aesthetic layer

### scan-line
- **Motion:** Horizontal scan line moves across UI elements
- **Use case:** Data scanning, AI processing visualization

### shimmer
- **Motion:** Specular shimmer across metallic/glass UI elements
- **Use case:** Premium material simulation

### blur-bokeh
- **Motion:** Background bokeh circles float and drift
- **Use case:** Depth atmosphere, focus contrast

### color-shift
- **Motion:** Subtle hue rotation on background elements
- **Use case:** Dynamic branding, mood progression

### edge-glow
- **Motion:** Edges of UI elements glow with brand color
- **Use case:** Selection state, feature highlight

---

## Rhythm (10 recipes)

Control pacing and energy flow within the film.

### quick-cut-montage
- **Motion:** Rapid cuts (8–12 frames each) between multiple views
- **Energy:** High
- **Use case:** Feature overview, "everything you can do"

### slow-hold
- **Motion:** Extended static shot, minimal motion
- **Energy:** Low
- **Use case:** Rest beat, letting audience absorb

### pulse-beat
- **Motion:** Subtle scale pulse synced to music beat
- **Energy:** Mid
- **Use case:** Beat-synced segments

### speed-ramp
- **Motion:** Motion accelerates then decelerates
- **Energy:** Variable
- **Use case:** Workflow demonstrations, process compression

### freeze-frame
- **Motion:** Motion freezes, label/annotation appears, motion resumes
- **Energy:** Mid (with rest)
- **Use case:** Calling out a specific detail mid-motion

### loop-cycle
- **Motion:** Short animation loops 2–3 times
- **Energy:** Mid
- **Use case:** Loading states, continuous processes

### stutter-step
- **Motion:** Motion stutters (hold-move-hold) in rhythmic pattern
- **Energy:** Mid
- **Use case:** Step-by-step process visualization

### rack-and-return
- **Motion:** Focus shifts away then returns to main subject
- **Energy:** Mid
- **Use case:** Showing context then returning to product

### bounce-settle
- **Motion:** Element overshoots position then settles with spring physics
- **Energy:** Mid
- **Use case:** Energetic but controlled element entrances

### time-lapse
- **Motion:** Extended process compressed into a few seconds
- **Energy:** Mid–High
- **Use case:** Setup/configuration process, data population

---

## Transition (15 recipes)

Bridge between segments without becoming the focus.

### flash-cut
- **Motion:** Warm white flash bridging a hard cut
- **Duration:** ~10 frames centered on cut point
- **Use case:** Default for high-energy cuts

### morph-wipe
- **Motion:** Element from shot A morphs into element from shot B
- **Use case:** Feature-to-feature connection

### slide-push
- **Motion:** Shot A pushes off-screen as shot B pushes in
- **Use case:** Sequential feature walkthrough

### fade-through-black
- **Motion:** Fade to black, hold 5–10 frames, fade up
- **Use case:** Section changes, tonal shifts

### fade-through-white
- **Motion:** Fade to white, hold 5–10 frames, fade up
- **Use case:** Clean/premium section changes

### zoom-through
- **Motion:** Camera pushes into an element that becomes the next shot's background
- **Use case:** Drilling from overview to detail

### cross-dissolve
- **Motion:** Simultaneous fade of shot A and shot B
- **Duration:** 15–20 frames
- **Use case:** Gentle time/location change

### iris-wipe
- **Motion:** Circular mask expands/contracts to reveal next shot
- **Use case:** Playful/retro transitions

### page-flip
- **Motion:** Current view flips like a page, revealing next
- **Use case:** Document/book-themed products

### glitch-cut
- **Motion:** Digital glitch effect on cut, resolves to next shot
- **Use case:** Tech/hacker aesthetic

### split-slide
- **Motion:** Current shot splits into panels that slide away
- **Use case:** Multi-panel to single view

### blur-transition
- **Motion:** Shot A blurs, cross-dissolve, shot B unblurs
- **Use case:** Focus-based scene change

### scale-pop
- **Motion:** Shot A scales up rapidly until off-screen, shot B appears
- **Use case:** Energetic transition

### color-block-wipe
- **Motion:** Solid color block sweeps across, revealing next shot
- **Use case:** Bold, branded transitions

### match-cut
- **Motion:** Element shape/position in shot A matches shot B's starting composition
- **Use case:** Sophisticated visual storytelling

---

## Outro (5 recipes)

Close the film with energy resolution and call-to-action.

### element-assembly
- **Motion:** UI elements from throughout the film assemble into final composition
- **Energy:** Highest → settling
- **Use case:** "Everything together" finale
- **Star candidate:** Yes

### cta-lock
- **Motion:** Call-to-action button/URL locks into center frame, holds
- **Energy:** Mid → Low
- **Use case:** Direct response promo
- **Rule:** CTA must hold for ≥ 2s

### letterpress-sign
- **Motion:** Product name pressed into textured surface, matching opening brand-press
- **Energy:** Mid → Low
- **Use case:** Bookend with brand-press opening

### fade-to-logo
- **Motion:** Content fades, logo remains, gentle settle
- **Energy:** Low
- **Use case:** Clean brand close

### split-to-cta
- **Motion:** Final product view splits to reveal CTA underneath
- **Energy:** Mid
- **Use case:** Conversion-focused ending
