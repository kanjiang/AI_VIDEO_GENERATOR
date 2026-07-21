# AI Music Generation Prompt Templates

## Supported platforms

| Platform | Strengths | Max length | Notes |
|---|---|---|---|
| **Suno** | Melodic, vocal-capable, style tags | ~4min | Best for full-track generation |
| **Udio** | Precise structure control, instrumental | ~4min | Better at following section timestamps |
| **可灵音乐 (Kling Music)** | Chinese-style, integrated with Kling video | ~2min | Good for 国风/古风 |

## Prompt structure

All platforms respond well to this structure:

```
[Tags]                    ← genre/instrument/mood tags
[One-line description]    ← what the music is for
[Style line]              ← instruments to use + influences + exclusions
[Structure]               ← section-by-section with timestamps
[Mood line]               ← comma-separated mood keywords
```

## Template: Full-track (single generation)

```
[Instrumental] [Core Instrument] [Genre Tags]

A [duration]-second [core instrument] theme for a [animation style] animation about [subject].

Style: [core instrument] melody + [instrument 2] + [instrument 3] + [instrument 4].
Inspired by [reference composers/studios]. [Specific aesthetic quality].
No [forbidden instrument 1], no [forbidden instrument 2], no [forbidden style], no vocals.

Structure:
[Intro Xs-Ys] [Description]. [Key]. BPM [value].
[Section A Xs-Ys] [Description]. Add [instruments]. [Mood adjective].
[Section B Xs-Ys] [Description]. [Key change if any]. BPM [value].
[Transition Xs-Ys] [Tempo/key change description].
[Section C Xs-Ys] [Description]. [Dynamic climax/resolution].
[Outro Xs-Ys] [Description]. [Ending technique].

Mood: [keyword1], [keyword2], [keyword3], [keyword4], [keyword5]
```

### Key writing rules for full-track prompts

1. **Timestamps are suggestions, not commands.** AI tools approximate section boundaries. Use round numbers.
2. **Name instruments explicitly.** "soft strings" → "soft violin + cello pad". Specific = better results.
3. **"No" list is critical.** Without it, AI tools default to adding drums, bass guitar, and synth pads.
4. **Reference real composers.** "Joe Hisaishi gentle warmth" or "Alexandre Desplat whimsy" gives strong style anchoring.
5. **Keep mood keywords to 5-8.** Too many dilute the signal.

## Template: Segmented generation (per-block)

When full-track results aren't precise enough, split into 2-4 segments by emotional block:

### Segment prompt template

```
[Instrumental] [Mood adjective] [core instrument] melody in [key], BPM [value].
[Instrument list]. [Style description]. [Reference]. No [exclusions]. [Duration] seconds.
```

### Segmentation strategy

| Block | Emotional character | Typical content |
|---|---|---|
| Block 1: 欢快段 | Bright, energetic | Opening + upbeat scenes |
| Block 2: 感动段 | Tender, emotional | Emotional pivot + climax |
| Block 3: 收束段 | Quiet → resolution | Farewell + credits |

For videos with comedic beats, add a **Block 2.5: 俏皮段** between emotional and closing blocks.

### Stitching segmented tracks

After generating segments, join them in editing software:
1. Overlap the last 1-2s of each segment with the first 1-2s of the next
2. Apply crossfade (0.5-1.0s) at each junction
3. If keys don't match at boundaries, the transition will sound jarring — regenerate with matching end/start keys

## Platform-specific tips

### Suno

- Wrap section names in `[brackets]`: `[Intro]`, `[Verse]`, `[Bridge]`, `[Outro]`
- Add `[Instrumental Break]` for purely instrumental sections
- Use "style of" references liberally — Suno responds well to artist/composer names
- For music box: use tag `[Music Box]` + mention "celesta" in the style line

### Udio

- More responsive to BPM numbers than Suno
- Use "section A (0:00-0:15)" format for timing
- Udio handles key changes better — specify "modulate to Am at 0:32"
- For sparse textures: add "minimal arrangement, lots of silence between notes"

### 可灵音乐

- Accepts Chinese-language prompts directly
- Good at: 古筝、二胡、笛子、琵琶 (traditional Chinese instruments)
- Weaker at: Western orchestral arrangements
- Prompt in Chinese for best results; use the same structure but in 中文

## Common "No" list by genre

| Video genre | Forbidden sounds |
|---|---|
| Q版黏土动画 | 电子合成器、鼓机、低音炮、说唱、摇滚吉他、EDM |
| 治愈系 | 重金属、trap beat、808 bass、dubstep、aggressive drums |
| 国风/古风 | Electric guitar、synth bass、trap hi-hat、auto-tune |
| 搞笑/沙雕 | 交响乐全奏、歌剧人声、严肃弦乐 |
| 科普/教育 | Vocal、lyrics、singing、rap |

## Iteration workflow

1. Generate with the full-track prompt first
2. Listen and identify which sections work and which don't
3. If >70% works: keep the track, fix problem sections in post (trim/replace)
4. If <70% works: switch to segmented generation for finer control
5. After 3 failed attempts at one section: simplify the prompt (fewer instruments, shorter duration)
