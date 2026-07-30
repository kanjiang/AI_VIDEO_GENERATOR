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

## Step 3.5: Scene-directed variation templates (场景定向变奏模板)

Based on the same core motif, create scene-specific variations with **exact parameters** (not just mood words). Each variation adjusts 5 dimensions: tempo, mode, string technique, texture, and harmonic language.

### Template: 4 Standard Scene Variations

#### Variation A: 紧张/追逐 (Tension)

```
BPM: 108 (或更高)
调式: D小调 (或原调的平行小调)
弦乐奏法: 低音弦乐切分(syncopated)、琴码颤音(sul ponticello tremolo)
织体: 密集——多层弦乐互相追逐，低音持续涌动
和声: 不稳定——减七和弦、增和弦、半音进行
母题处理: 碎片化——仅在转折处完整出现，其余时段将母题拆解为2-3音片段穿插
Exclude: 柔和垫底音色、明亮大调和声、缓慢长弓
适配场景: 追逐、危险、对抗、倒计时
```

#### Variation B: 正能量/突破 (Uplifting)

```
BPM: 96
调式: 小调→F大调 (或原调→升高大三度的大调，制造"打开"感)
弦乐奏法: 拨弦(pizzicato)开始 → 拉弓(arco)接力
支撑配器: 圆号(French horn)柔和加入，木管点缀
织体: 中等→逐渐丰满——从独奏到齐奏的渐进展开
和声: 稳定→明亮——从小调犹豫到大调确认的解决进行
母题处理: 完整呈现，首次以大调面貌出现
Exclude: 切分节奏、不协和音、低沉音区
适配场景: 人物突破、团队前行、希望点燃
```

#### Variation C: 温柔/谈心 (Tender)

```
BPM: 64
调式: 原调小调 (保持含蓄)
弦乐奏法: 弱音中提琴(muted viola)主奏 → 大提琴(cello)接力
装饰: 高把位泛音(harmonics)点缀
织体: 极稀疏——同一时刻仅1-2件乐器发声
和声: 简单——三和弦为主，偶尔挂留(suspension)制造温暖的不解决感
母题处理: 完整但极慢地演奏，音符之间大量留白
Exclude: 打击乐、铜管、快速音型、明确节拍重音
适配场景: 谈心、重逢、告白、温情回忆
```

#### Variation D: 沉思/慢镜 (Contemplative)

```
BPM: 42 (或自由速度 rubato)
调式: 原调，和声悬置
弦乐奏法: 极长弓(molto legato)、近乎无限延音
织体: 几乎透明——母题拉长为长音，音符间隔8-12秒
和声: 悬置不解决——终止感被刻意回避，和声始终"飘在空中"
母题处理: 将4音母题拉长为绵延的长音，每个音持续2-4秒
Exclude: 任何有节奏脉冲的元素、任何明亮音色
适配场景: 空镜、悲伤落幕、沉思、时间凝固
```

### Custom variation creation

When 4 种标准变体不够用时，使用以下参数模板创建自定义变体：

```
#### Variation X: [场景名] ([English label])

BPM: [数值]
调式: [具体调性]
弦乐奏法: [具体技法]
支撑/装饰配器: [具体乐器和角色]
织体: [疏密描述]
和声: [稳定度描述]
母题处理: [完整/碎片/拉长/倒影/逆行]
Exclude: [禁止元素]
适配场景: [使用场景]
```

## Step 3.6: 6-Axis Control Method (六轴控制法)

单纯改情绪关键词无法精准控制音乐的"存在感"。用这 6 个独立轴来精细调节每段配乐在画面中的角色（前景/背景）：

| 轴 | 定义 | 前景(抢戏) → 背景(让位) |
|----|------|------------------------|
| **① 旋律完整度** | 母题呈现的完整程度 | 完整旋律线 → 碎片化音型 → 仅节奏骨架 → 长音/静止 |
| **② 音区高低** | 乐器演奏的音高范围 | 高音区(注意力强) → 中音区(中性) → 低音区(沉底隐退) |
| **③ 织体疏密** | 同时发声的乐器层数 | 全奏5+层(饱满) → 3层(标准) → 1-2层(稀疏) → 单音(极简) |
| **④ 脉冲感** | 节拍重音的清晰度 | 明确四拍重音 → 弱拍偏移 → 自由节拍(rubato) → 无脉冲(长音) |
| **⑤ 和声稳定度** | 和弦进行的解决程度 | 完美终止(稳定) → 挂留延迟 → 不解决(悬浮) → 无调性(不安) |
| **⑥ 空间动态** | 混响与声像的远近感 | 近场干声(亲密) → 中等混响(标准) → 大厅混响(宏大) → 极远混响(空灵) |

#### 使用方法

在 per-shot scoring table 的 **技法** 行中，用 6 轴坐标描述音乐状态：

```
技法: 6轴=[旋律:碎片, 音区:低, 织体:2层, 脉冲:弱, 和声:悬置, 空间:远]
     → 音乐完全退至背景，为对白让出所有空间
```

```
技法: 6轴=[旋律:完整, 音区:高, 织体:全奏, 脉冲:强, 和声:解决, 空间:近]
     → 音乐前景化，无对白的纯情绪爆发段
```

#### 典型场景的 6 轴预设

| 场景类型 | 旋律 | 音区 | 织体 | 脉冲 | 和声 | 空间 |
|---------|------|------|------|------|------|------|
| 密集对白 | 碎片/无 | 低 | 1层 | 无 | 悬置 | 远 |
| 情绪独白 | 完整 | 中 | 2层 | 弱 | 延迟解决 | 中 |
| 动作/追逐 | 碎片 | 低+高交替 | 4-5层 | 强 | 不稳定 | 近 |
| 空镜/转场 | 长音 | 中高 | 2-3层 | 无 | 悬置 | 远 |
| 情绪高潮 | 完整 | 高 | 全奏 | 强 | 完美解决 | 近→中 |
| 喜剧/搞笑 | 完整(俏皮) | 高 | 2-3层 | 强(跳跃) | 稳定 | 近 |
| 悬念/恐怖 | 碎片 | 极低 | 1-2层 | 无/不规则 | 无调性 | 极远 |

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
