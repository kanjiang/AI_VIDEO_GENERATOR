# Prompt Density

How to group shot rows into 15-second prompts.

## The rule, derived from the source shotlist

Across the canonical shotlist (scenes 13–29 + 61–66), the average is **~1 prompt per 4–5 shot rows**, but this varies wildly by scene:
- Scene 21: 7 rows / 5 prompts (1:1.4) — dense, prompt-per-beat
- Scene 23: 3 rows / 1 prompt (3:1) — collapsed into one continuous emotional unit
- Scene 28: 42 rows / ~9 prompts (4.7:1) — typical action coverage

**There is no fixed ratio. Decide per scene.**

## Decision heuristic

Group shot rows into one prompt when ALL of these are true:
1. They share the same **character set** in frame
2. They share the same **location/subset of location**
3. They form a **continuous emotional/temporal unit** (no time skip, no major mood pivot)
4. They can be staged in **≤15 seconds of screen time**
5. The combined Chinese prompt won't exceed practical generation limits (~2500 chars)

Split into separate prompts when ANY of these fire:
1. **Hard cut between locations** (apartment → flashback)
2. **Major character entrance/exit** changes the handle list
3. **Aspect/lens change** that needs its own setup (wide establish → tight insert)
4. **Performance arc** that needs its own 15-second envelope (a reaction shot that builds across 7 emotional beats deserves its own prompt — don't bundle it with action)
5. **Insert / cutaway** to a prop or screen (these get their own ECU prompt)

## Within a prompt — multi-shot internal cuts

A single 15-second prompt CAN contain internal `【镜头1】 / 【镜头2】 / 【镜头3】` cuts when the cuts share location and characters. This is the "multi-shot prompt" pattern. See [PROMPT_PATTERNS.md](PROMPT_PATTERNS.md) §3 for the syntax.

Use multi-shot when:
- 2–3 fast cuts inside one continuous emotional moment (e.g., wide establish → tight reaction → low-angle finish, all in 15s)
- A montage that's tonally one unit (the polaroid scan in scene 21 — slide across photos, land on NOV 14, hand reaches in — one prompt, three internal beats)

Use one-shot when:
- A single continuous performance moment with one camera move (the dolly across the bridge in scene 18)
- Anything where the emotional weight needs to land without cuts

## Shot rhythm patterns — "两短一长" and variants

Internal cuts within a prompt (and sequences of prompts) should follow deliberate rhythm patterns. The most universal pattern is **两短一长** (two short, one long): 2 quick close-up shots tighten the rhythm, then 1 longer wide shot releases it.

### Core pattern: 两短一长

| Position | Duration | Shot size | Function |
|----------|----------|-----------|----------|
| Short 1 | 1-2s | Close-up / detail / ECU | Quick detail — tighten rhythm |
| Short 2 | 1-2s | Close-up / detail / ECU | Second detail — sustain tension |
| Long | 3-5s | Mid / wide / full | Reveal context — release rhythm |

The tempo contrast (fast → fast → slow) combined with the shot-size contrast (tight → tight → wide) creates a natural breathing rhythm. The audience's eye focuses in, focuses in, then relaxes outward.

### Within a 15-second prompt

A single multi-shot prompt maps naturally to one or two 两短一长 cycles:

**Single cycle (7-9s content):**
```
【镜头1】(2s) 85mm近景 — detail/reaction (SHORT)
【镜头2】(2s) 100mm特写 — object/hand/face (SHORT)
【镜头3】(5s) 35mm广角 — full scene establish (LONG)
```

**Double cycle (full 15s):**
```
【镜头1】(2s) 85mm — detail A (SHORT)
【镜头2】(2s) 100mm — detail B (SHORT)
【镜头3】(4s) 35mm — wide reveal (LONG)
【镜头4】(2s) 85mm — new detail C (SHORT)
【镜头5】(2s) 85mm — reaction (SHORT)
【镜头6】(3s) 50mm — mid-shot resolve (LONG)
```

### Extended variant: 多短一长

Multiple rapid-fire close-ups followed by one wide shot. Useful for montage sequences, cooking, action buildup, or stacking tension before a reveal:

```
【镜头1】(1s) ECU — hand grabs key
【镜头2】(1s) ECU — foot steps forward
【镜头3】(1.5s) CU — face determination
【镜头4】(5s) Wide — door opens, full room revealed
```

### Scene-type examples

The formula is universal across genres. The key: short shots must have **logical content flow** between them (face → hand → environment, not random jump cuts).

| Scene type | Short 1 | Short 2 | Long | Rhythm effect |
|------------|---------|---------|------|---------------|
| Travel/旅拍 | 人物近景 (figure mid-close) | 手部特写 (hand detail) | 草原全景 (wide landscape) | Intimate → grand reveal |
| Driving | 车尾漂移 (rear drift CU) | 车头近景 (front detail) | 赛道全景 (track wide) | Dynamic → scale |
| Cooking/美食 | 浇油特写 (oil pour ECU) | 夹菜特写 (chopstick grab ECU) | 整盘中景 (plated dish mid) | Appetite detail → payoff |
| Unboxing/探店 | 手撕包装 (unwrap CU) | 产品细节 (product ECU) | 桌面全景 (table wide) | Curiosity → context |

### Content logic between short shots

Short shots in sequence must have a readable spatial or causal link — avoid arbitrary pairing:

- **Body cascade:** face → hand → object they're touching → environment
- **Action chain:** cause (pour oil) → effect (sizzle) → result (finished dish)
- **Scale ladder:** detail → slightly wider detail → full context

If the two short shots feel unrelated when viewed back-to-back, either reorder or replace one.

### When NOT to use 两短一长

- **Emotional weight shots** — grief, revelation, quiet connection. These need sustained single takes with no cuts. Use one-shot instead.
- **Dialogue coverage** — speaker alternation has its own rhythm (shot/reverse-shot). Don't force 两短一长 onto conversation.
- **Continuous tracking shots** — when the camera move IS the rhythm (dolly, steadicam walk-and-talk).

### Applying across prompt sequences

The 两短一长 pattern also works at the **prompt level** — across a sequence of prompts:

| Prompt | Duration | Content type | Rhythm role |
|--------|----------|--------------|-------------|
| P1 | 10s | Fast action / detail montage | SHORT |
| P2 | 10s | Reaction / continuation | SHORT |
| P3 | 15s | Wide establishing / emotional beat | LONG |

This creates macro-level breathing rhythm across the edited sequence, not just within individual clips.

### Shot-size coverage rule

For each scene or location, ensure the prompt set covers at least **2 tight framings + 1 wide framing** so the 两短一长 rhythm is always achievable in post. If a scene only has wide shots, you cannot cut fast; if it only has close-ups, you cannot release the rhythm. Plan both in advance.

## Examples from the source

**Scene 23, 3 rows → 1 prompt (collapsed)**
- Row 11.1: Roko in apartment, dark atmosphere
- Row 11.2: Tear falls
- Row 11.3: Closes eyes, breaks into sobs

All three are one continuous emotional collapse on the kitchen floor. One prompt with `【镜头1】【镜头2】` internal beats, both same location, same character, ~15s envelope. **Don't fragment grief.**

**Scene 21, 7 rows → 5 prompts (split)**
- Prompt 1: door open + boots crossing threshold (rows 9.1 partial)
- Prompt 2: hallway walk to living room (own envelope — needs its own breath)
- Prompt 3: living room scan + window + turn toward fridge (one-er, 50mm)
- Prompt 4: fridge ECU — polaroid slide + hand reaches in
- Prompt 5: photo close-up + Roko's face + turn

Five distinct camera setups, five different focal lengths, five different emotional micro-beats. They earn their own prompts.

## Transition planning at segment boundaries

When splitting shots into separate prompts, consider how each prompt **ends** relative to the next prompt's **start**. Most boundaries are simple hard cuts handled by `【首帧衔接】` on the receiving end. But some scene transitions benefit from in-prompt tail-frame planning — see [PROMPT_PATTERNS.md §11](PROMPT_PATTERNS.md) for the `【尾帧转场】` section.

Transition tails consume 1–3 seconds from the 15-second envelope. When budgeting time for a prompt that needs a transition tail, reduce the narrative content accordingly — don't overload the prompt by adding transition time on top of a full 15 seconds of action.

Common split points that benefit from transition planning:
- **Location change** → match cut, push-in transition, or light transition
- **Time skip** → object wipe, whip pan, or light transition
- **Action handoff** → action cut (punch, door, fall)
- **Mood shift** → whip pan or push-in transition

Common split points that DON'T need transition planning (just hard cut + `【首帧衔接】`):
- Same location, same characters, continuous time
- Insert/cutaway returning to the main shot
- Dialogue coverage (over-the-shoulder alternation)

## Multi-line narrative structures (多线叙事编排)

When the screenplay uses parallel montage or cross-cutting, the prompt sequence needs special ordering rules. Each narrative line gets its own independent prompts, then the prompts are interleaved for the final timeline.

### Parallel montage (平行蒙太奇)

Two or more storylines happening **simultaneously** in different locations, edited in alternation. The audience understands both lines are happening at the same time.

**Prompt generation rule:**

1. Generate Line A prompts as a complete, independent sequence: `A1, A2, A3, A4...`
2. Generate Line B prompts as a complete, independent sequence: `B1, B2, B3, B4...`
3. Each line has its own `【首帧衔接】` chain (A2 references A1's tail, not B1's tail)
4. Mark each prompt with a line tag: `[线A]` or `[线B]` in the prompt header
5. Final assembly order is interleaved: `A1 → B1 → A2 → B2 → A3 → B3...`
6. The interleaving is done in **post-production** — AI generates each line independently

**Visual differentiation rule:**

Each line must have distinct visual identity so viewers can track which line they're watching:

| Differentiation method | Line A example | Line B example |
|---|---|---|
| Color temperature | 暖金色调 | 冰蓝色调 |
| Aspect ratio | 21:9 | 16:9 (letterbox visible) |
| Lighting style | 柔光漫射 | 硬光高对比 |
| Grain / texture | 清晰数字 | 粗颗粒胶片 |
| Location tone | 明亮室内 | 暗调室外 |

Declare the line's visual identity in the style block of each prompt. Use the same style block for all prompts within one line.

**Rhythm rule:**

| Phase | Per-segment duration | Purpose |
|---|---|---|
| Opening | 5-8秒 | Establish each line separately |
| Middle | 3-5秒 | Build parallel tension |
| Climax | 2-3秒 | Accelerate toward convergence |
| Convergence | ≥ 5秒 | Lines meet — give audience time to absorb |

The acceleration pattern (段长递减) is critical. Without it, parallel montage feels like random scene-hopping.

### Cross-cutting (交叉剪辑)

Multiple seemingly unrelated lines that ultimately converge at a collision point. Structurally similar to parallel montage but with steeper acceleration and more dramatic convergence.

**Prompt generation rule:**

Same as parallel montage (independent sequences, line tags, separate `【首帧衔接】` chains), plus:

1. The **collision prompt** — the final convergence moment — must contain visual elements from ALL lines
2. Tag the collision prompt: `[交汇点]`
3. The collision prompt's `【首帧衔接】` references the tail frame of **whichever line ended last**
4. Lines that "arrive" at the collision may need `【尾帧转场】` push-in or match cut to visually connect to the collision point

**Rhythm rule (stricter than parallel montage):**

| Phase | Per-segment duration | Ratio |
|---|---|---|
| Setup | 6-8秒 | 1× (baseline) |
| Acceleration 1 | 4-5秒 | ~0.6× |
| Acceleration 2 | 2-3秒 | ~0.4× |
| Final alternation | 1-2秒 | ~0.2× |
| Collision | ≥ 3秒 | Long hold |

The 2:1 递减比 (each round approximately half the previous duration) creates visceral urgency. The final long-hold collision gives the audience emotional payoff.

### Interleaving in the prompt document

In the final video-prompts document, list all prompts in **playback order** (interleaved), not grouped by line. Add line tags and assembly notes:

```
## P01 [线A] — 办公室，女主接到电话
...

## P02 [线B] — 停车场，男主发现车被砸
...

## P03 [线A] — 办公室，女主脸色骤变
...

## P04 [线B] — 停车场，男主追出去
...

## P05 [交汇点] — 街道十字路口，两人相遇
...
```

This interleaved order is the final playback order. Each prompt is generated independently by the AI, and assembled in this order during post-production.

## Multi-speaker dialogue splitting rules (Seedance 2.0 hard limits)

Seedance 2.0 concurrently processes face-lock, multi-voice TTS, lip-sync, and timeline sequencing. When too many speakers share one 15-second prompt, context overload causes voice crossover (串音), line misattribution, and timbre drift.

### Hard limits per 15-second prompt

| Speakers | Max lines | Risk level |
|----------|-----------|------------|
| 1 speaker | 3-4 lines | Safe |
| 2 speakers | 2-4 lines total | Safe (official recommendation) |
| 3 speakers | ANY | High risk — split required |

**Rule: never put 3+ speakers with dialogue into a single 15-second prompt.** Split the scene into multiple prompts.

### How to split a 3-speaker dialogue scene

Take a 3-way conversation and decompose into 2-speaker prompts:

```
Original scene: A, B, C all talk in one room

Prompt N  (10-15s): A and B dialogue — C is present but silent (visible in background)
Prompt N+1 (10-15s): C speaks, A responds — B is present but silent
Prompt N+2 (10-15s): Brief 2-person exchange to close — third person reacts visually only
```

Rules for splitting:
- Each prompt keeps ≤2 speaking characters
- Non-speaking characters can appear visually (background, reaction shots) but MUST NOT have dialogue in that prompt
- Use `【首帧衔接】` to maintain spatial continuity across the split
- Add `【停顿 0.5s-1s】` between speaker switches within a prompt

### Reducing compute load when dialogue is priority

When a prompt is dialogue-heavy, reduce other processing demands:
- Simplify camera moves (prefer static or slow push over complex tracking)
- Reduce background activity descriptions
- Minimize simultaneous action choreography
- Do not stack BGM + SFX + multi-voice in the same prompt — drop BGM for dialogue prompts

## When in doubt

Err toward **more prompts, shorter envelopes** rather than packing too much into 15 seconds. Seedance handles tight prompts better than overloaded ones, and the user can always run them in sequence.

## Tagging

Each prompt gets a short bracketed tag for the HTML header — describes what the prompt shows at a glance. Examples:
- `[MS-CU · door open + boots]`
- `[ECU · fridge photo slide + take photo]`
- `[CU · Roko face + turn]`
- `[Wide → MCU · spatial establish + reaction]`
- `[Multi-shot · 3 reactions + dialogue]`

Use the team's existing shot-plan abbreviations (see [PLAN_TYPES.md](PLAN_TYPES.md)).

## BGM strategy across prompt sequences

**Default:** all prompts include `无背景音乐` in `【挂载资源与音频硬约束】` — strip AI-generated BGM at the source, add a unified external BGM track in post. This eliminates all transition problems.

**If multi-track BGM is needed:** tag each prompt's BGM zone and key in the header. At transition prompts, mark the audio break point and recommend the transition SFX trio (Riser + Whoosh + Hit). Volume layers: BGM 15-25%, dialogue 80-90%.

Full strategy, techniques, and production pipeline in [PROMPT_PATTERNS.md → BGM Strategy for Segmented AI Video](PROMPT_PATTERNS.md#bgm-strategy-for-segmented-ai-video-分段视频配乐完整方案).
