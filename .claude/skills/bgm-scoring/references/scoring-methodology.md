# Per-Shot Scoring Methodology

## Step 1: Emotion curve construction

Before writing any music, draw two text-art charts from the shot list:

### Volume/Density curve

Maps the *thickness* of orchestration over time. Peaks = full ensemble; valleys = solo instrument or silence.

```
音量/密度
  ▲
  │         ╭─╮ [shot label]
  │    ╭──╮╭╯  ╰╮
  │ ╭─╯   ╰╯    ╰╮        ╭──╮
  │╭╯              ╰──────╯    ╰──
  ┼───────────────────────────────── 时间▶
  0   [timestamps and shot labels below]
```

### BPM curve

Maps tempo changes. Sudden spikes = rhythmic accents (stomps, impacts); gradual slopes = ritardando/accelerando.

```
BPM
  ▲
120│            ╱╲ [impact moment]
100│───────╮  ╭╯  ╰────╮
 80│       ╰──╯        ╰╮
 60│                     ╰────
  ┼──────────────────────────── 时间▶
```

## Step 2: Global parameter table

Fill in these decisions before composing:

```markdown
| 项目 | 参数 |
|------|------|
| 总时长 | ~XXs |
| 调性 | [主调]（[情绪]），[转调点]转[副调] |
| 基础BPM | [数值]（匹配[动画风格]） |
| 核心音色 | [乐器] 贯穿全片 |
| 辅助音色 | [乐器1]、[乐器2]、[乐器3]… |
| 情绪关键词 | [3-5个词] |
| 禁止 | [不适合的乐器/风格] |
```

## Step 3: Motif notation

Write motifs in simplified Chinese musical notation (简谱). Provide at minimum:

- **主旋律 A（明亮版）** — used for upbeat sections
- **主旋律 B（柔情版）** — used for emotional sections

Optional additional variants:
- **尾声旋律 C（收束版）** — extremely slow, solo instrument
- **俏皮变体 D** — comedic timing with percussive accents

Format:

```
主旋律 A（明亮版 · 用于[场景类型]）
BPM=[数值]  [拍号]  [调性]

| [音符] | [音符] | [音符] | [音符] |
| [音符] | [音符] | [音符] | [音符] |

（X小节，约Xs，[结构说明]）
```

## Step 4: Per-shot scoring table

For each shot, write a table with 4-6 layers:

```markdown
### 镜头 N — [场景名称]（[起始时间] - [结束时间]）

| 层 | 内容 |
|---|---|
| 过渡 | [从上一镜头如何衔接：渐弱/直接切入/悬停音延续…] |
| 音乐 | [使用哪个主旋律变体 + 哪些小节 + 乐器安排 + 音量动态标记] |
| 节奏 | [BPM + 节拍特征 + 与画面的同步点] |
| 音效 | [SFX名称 + 精确秒数 + 与音乐的关系(占据空隙/叠加/替代)] |
| 情绪 | [一句话情绪概括，用引号写出"观众心声"] |
| 技法 | [特殊处理：静默插入/音乐抽空/卡带效果/调性回归…] |
```

### Layer-writing rules

1. **过渡 (Transition)**: Never start a shot from zero. Describe what *carries over* from the previous shot (sustained note, fading reverb, overlapping SFX).

2. **音乐 (Music)**: Reference motif variants by name ("主旋律A前4小节"). Specify instrument entrances/exits with bar numbers. Use dynamic markings: pp (极弱), p (弱), mp (中弱), mf (中强), f (强).

3. **节奏 (Rhythm)**: Note any BPM changes with duration ("BPM从100→渐慢至80，2秒内完成"). Align rhythmic accents to visual events ("每转一面加一声'叮'").

4. **音效 (SFX)**: Use the format `[SFX名称]（[描述]）在第X秒`. Specify volume offset relative to BGM if non-default.

5. **情绪 (Emotion)**: Write in second person as if narrating the viewer's feeling. Keep to one sentence.

6. **技法 (Technique)**: This is for non-obvious compositional devices:
   - **音乐抽空**: All instruments drop out for 0.5-1s before a key moment, then re-enter. Amplifies impact.
   - **卡带效果**: Same note repeats 3x rapidly, simulating a stuck mechanism. Creates comedic tension.
   - **调性回归**: Modulating back from minor to major at an emotional resolution point.
   - **呼应手法**: Reusing a motif fragment from an earlier shot in a different context.

## Step 5: Emotion summary section

After all per-shot tables, add a summary with:

1. **配乐情绪曲线图** — the text-art volume/density curve with shot labels
2. **BPM变化图** — the text-art BPM curve
3. **情绪关键转折点列表** — table of the 3-5 most important musical moments

## Worked example: emotion pivot

The most critical compositional moment is the **emotion pivot** — where the video shifts from one emotional state to another (e.g., crying→healing, tension→comedy).

Design pattern for a pivot:

```
1. [Previous shot end]: Music thins to single instrument on unresolved note
2. [Gap: 0.5-1.0s]: Near-silence or solo heartbeat/breathing
3. [New shot start]: New motif variant enters, initially soft (pp)
4. [2-3 seconds in]: Supporting instruments join, volume builds to new level
5. [Key moment]: Full ensemble arrives at emotional peak
```

This pattern works for any genre. The silence-before-swell is the core technique.
