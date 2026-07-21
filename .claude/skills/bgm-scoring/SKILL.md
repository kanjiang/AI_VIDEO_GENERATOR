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
| **Core instrument** | One signature timbre that runs through the entire piece (music box, piano, marimba, erhu…) |
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
