---
name: bgm-scoring
description: Design and produce background music (BGM) and sound effects (SFX) for AI-generated short videos — including emotional arc analysis, core motif design, per-shot orchestration, AI music tool prompts, SFX sourcing, and ffmpeg-based audio mixing. Use when the user asks to create BGM/配乐 for a video project, compose music for animation, design sound effects, write Suno/Udio/可灵音乐 prompts, or mix audio onto video with ffmpeg. Covers the full audio pipeline from storyboard to final mixed output.
---

# BGM Scoring Skill

Design and produce the complete audio layer (BGM + SFX) for AI-generated short videos. This skill sits between the visual prompt pipeline (`shotlist-builder`, `video-render-quality`) and final delivery (`post-production`).

## Pipeline position

```
Script → Storyboard → Video Prompts → AI Generation → BGM SCORING → Post-Production → Final
                       ↑ shotlist-builder                ↑ THIS SKILL   ↑ post-production
```

Input: the video's shot list with timing, emotional beats, and scene descriptions.
Output: a `bgm-composition.md` plan + AI music prompts + SFX timeline + optional ffmpeg mixing script.

## Hard rules

- **Never rewrite video prompts to make Seedance emit BGM.** Generation-stage prompts must keep `无背景音乐、无配乐、无乐器声`. This skill only consumes clean dialogue/ambient footage and builds music/SFX in post.
- **Strings-first** for underscoring beds; piano/guitar are highlight accents, not default beds (see Step 0).
- Deliver stems/mix plans that `post-production` can assemble — do not invent a parallel CapCut workflow that duplicates post-production recipes.

## Step 0 — Foundational mindset: scoring ≠ songwriting

Before any compositional work, internalize this principle:

> **好配乐脱离画面单独听不是完整歌曲。** 如果音乐独立播放时旋律完整、结构自洽、听感饱满——它大概率不适合对白密集的镜头。配乐的核心职责是**为画面情绪留出表达空间**，而非替角色直白抒情。

### Pre-composition 4-question check (4 问先行法)

Before writing any prompt or notation, answer these 4 questions for each scoring segment:

| # | Question | Bad answer | Good answer |
|---|----------|-----------|-------------|
| 1 | **戏剧功能** — 这段音乐在叙事中的任务是什么？ | "悲伤" | "压抑→爆发前的克制，为下一镜头的情绪释放蓄力" |
| 2 | **旋律显露度** — 旋律应该在多大程度上被听到？ | "好听的旋律" | "旋律隐藏在弦乐织体中，仅在转折时完整出现2秒" |
| 3 | **主次配器** — 哪些乐器做底层氛围，哪些做高光点缀？ | "钢琴+吉他+弦乐" | "低音弦乐铺底(80%)，双簧管在关键转折处出现(20%)" |
| 4 | **对白留白** — 这段有无对白？音乐需要让出多少频率空间？ | 不考虑对白 | "密集对白段，音乐退至低频弦乐pad，中高频完全让出" |

### Strings-first rule (弦乐优先原则)

**新手配器建议：** 默认用弦乐（strings）构建底层氛围，避免钢琴、吉他作为基础织体。

| 乐器 | 起音特征 | 配乐风险 |
|------|---------|---------|
| 钢琴 | 起音清晰、每个音符独立可辨 | 极易抢戏，盖过人声对白，提前剧透镜头情绪 |
| 吉他 | 起音明确、和弦轮廓突出 | 与钢琴同理，且和弦进行容易暗示"歌曲"而非"配乐" |
| 弦乐 | 起音柔和、可无限延音、音色可从极弱到极强 | **最适合配乐底层**——能融入画面不抢戏，需要时可瞬间爆发 |

钢琴/吉他不是禁止使用，而是**不应作为基础织体**。它们适合作为高光点缀——在关键转折处出现 2-4 秒，然后退出。

## Core workflow

### 1. Read the shot list and extract the emotional arc

From the project's `video-prompts.md` (or equivalent), extract:

- Total duration and per-shot timing
- Emotional keyword per shot (欢快/感动/搞笑/温馨/紧张…)
- Key visual moments that need audio punctuation (impacts, reveals, transitions)

Build an **emotion curve** — a simple text-art chart mapping volume/density and BPM over time. This chart drives all subsequent decisions.

### 2. Choose global audio identity

Decide these parameters based on the video's genre and mood:

| Parameter | Decision |
|---|---|
| **Key** | Major = bright/warm; minor = emotional/tense. Plan modulations at emotional turning points |
| **Base BPM** | Match the animation style (stop-motion ~80-100; smooth 2D ~110-130; action ~140+) |
| **Core instrument** | Default bed = **strings** (see strings-first). Piano/guitar/music box = highlight accents only unless the project identity requires them as signature color |
| **Supporting palette** | 3-5 instruments for layering; specify which sections they enter/exit |
| **Forbidden sounds** | Instruments/styles that break the aesthetic (critical for AI music prompts) |

### 3. Design the core motif

Write a short melodic theme (4-8 bars) in simplified notation. Then create **variants**:

| Variant | Usage | Technique |
|---|---|---|
| Bright/原版 | Happy/energetic sections | Full instrumentation, base BPM |
| Tender/柔情版 | Emotional sections | Slower BPM, shift to relative minor, sparse texture |
| Ending/收束版 | Final farewell/credits | Extremely slow, solo core instrument, long silences between notes |
| Comedic/俏皮版 | Funny moments | Slightly faster BPM, add wood block/percussion, "stuck gear" repetitions |

Having explicit variants ensures the BGM feels unified despite emotional shifts.

### 4. Write per-shot scoring tables

For each shot, write a scoring table using the layered format. See [references/scoring-methodology.md](references/scoring-methodology.md) for the full template and a worked example.

Each table covers 4 layers:
- **音乐 (Music)**: Which motif variant, which instruments, specific notation if needed
- **音效 (SFX)**: Named effects with precise timestamps
- **情绪 (Emotion)**: One-line emotional summary for the section
- **技法 (Technique)**: Transitions (ritardando, key change), dynamic markings (pp→mp), structural devices (silence before impact)

### 5. Generate AI music prompts

Transform the scoring plan into prompts for Suno, Udio, or 可灵音乐. See [references/ai-music-prompt-templates.md](references/ai-music-prompt-templates.md) for templates and best practices.

Two strategies:
- **Full-track**: One prompt covering all sections with `[Section]` markers and timestamps
- **Segmented**: Separate prompts per emotional block for finer control; stitch in post

### 6. Build the SFX timeline and source files

Create a numbered SFX list with: name, timestamp, volume offset (dB), and source recommendation. See [references/sfx-sourcing.md](references/sfx-sourcing.md) for sourcing workflow and the ffmpeg mixing script template.

### 7. Mix audio onto video (optional)

If the user wants automated mixing, generate a Python script using `imageio-ffmpeg` that:
- Layers BGM (trimmed to video duration, with volume adjustment)
- Delays each SFX to its correct timestamp
- Mixes all audio streams with `amix`
- Copies video stream without re-encoding

The script template is in [references/sfx-sourcing.md](references/sfx-sourcing.md).

## Output file structure

```
project/
├── screenplay/
│   ├── video-prompts.md          ← input (read this)
│   └── bgm-composition.md       ← OUTPUT: full scoring plan
├── assets/
│   └── sfx/                     ← OUTPUT: downloaded SFX files
│       ├── SFX-01_xxx.wav
│       └── ...
└── edit_video.py                 ← OUTPUT: ffmpeg mixing script
```

## Key principles

1. **One core motif, many variants.** Unity through repetition; emotion through transformation.
2. **Silence is an instrument.** Strategic pauses before emotional peaks amplify impact more than adding notes.
3. **SFX complement, never compete.** Sound effects sit in frequency gaps left by the music; duck the BGM during SFX-heavy moments.
4. **Specify "forbidden" sounds.** AI music tools need explicit negative constraints or they default to generic pop/EDM instrumentation.
5. **Time-align everything.** Every SFX, key change, and dynamic shift maps to a specific frame/second in the video timeline.
