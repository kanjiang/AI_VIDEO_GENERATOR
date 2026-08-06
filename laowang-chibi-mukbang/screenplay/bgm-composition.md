# 《老王Q版吃播·火锅篇》BGM配乐方案

## 总体判断

全片 30 秒，9:16 竖屏 Q版吃播短视频。配乐目标不是写完整歌曲，而是做一个轻快、弹性、卡通化的美食短视频 underscore：前 15 秒建立“老王热情开场”，后 15 秒进入“涮肉→入口→美味升天”的递进。

```
情绪密度曲线

0:00        0:05        0:10        0:15        0:20        0:25        0:30
黑屏弹入     自我介绍     火锅展示      涮肉特写     入口咀嚼     美味升天+收尾
   ▂           ▃▅          ▅▆           ▆▇          ▇█          █▲叮
   开场弹性     热情口播     食欲铺垫      ASMR推进     满足蓄力     爆点定格
```

## 全局音频身份

| 参数 | 决策 |
|------|------|
| **主调** | C major，明亮、亲切、适合吃播 |
| **BPM** | 124 BPM，短视频节奏轻快但不压对白 |
| **基础织体** | 弦乐 pizzicato + 低音拨弦，遵循 strings-first，不用钢琴/吉他做底 |
| **卡通色彩** | 木琴、马林巴、木鱼、滑音口哨、短促 brass pop |
| **美食高光** | Glockenspiel/钟琴“叮”、竖琴短琶音、轻微 shimmer |
| **禁止** | 禁 EDM、禁重鼓、禁流行歌副歌、禁电吉他、禁煽情钢琴、禁歌词人声 |

## 核心动机

4 小节，C major，124 BPM：

```text
简谱：
| 1 3 5 3 | 1 3 6 5 | 4 4 3 2 | 1 - 0 0 |
  do mi sol mi / do mi la sol / fa fa mi re / do
```

特点：前两小节上扬，像老王招呼观众；第三小节回落，给对白留空间；第四小节停顿，方便接卡通音效“叮”。

## BGM 分段设计

### BGM-01：开场弹跳主题（0:00-0:15）

| 时间 | 画面 | 音乐 | 音效 | 技法 |
|------|------|------|------|------|
| 0:00-0:00.5 | 黑屏 | 无BGM | 极轻 room tone | 留出弹入前的空白 |
| 0:00.5-0:03 | 老王“嘭”弹入 | pizzicato 弦乐从弱到中，木琴跟随主旋律前两拍 | “boing”弹跳声、落地“pop” | 音乐跟身体 squash & stretch 做弹性重音 |
| 0:03-0:08 | 自我介绍 | BGM 降到低频 pizz + 轻木鱼拍点 | 拍胸口“咚”、wink 小闪音 | 对白频率让位，中高频减少 |
| 0:08-0:15 | 展示火锅 | pizzicato 加马林巴分解和弦，钟琴在食物高光处点“叮” | 火锅咕嘟、蒸汽嘶、搓手声 | 音乐逐渐加密，为涮肉段铺垫食欲 |

**音乐写法：**
- 主体音量控制在 -18 LUFS 左右，口播时自动 duck 到 -24 LUFS。
- 火锅展示时加一点点竖琴 glissando，但只持续 0.5 秒，不能变成梦幻恋爱感。

### BGM-02：涮肉美味冲击（0:15-0:30）

| 时间 | 画面 | 音乐 | 音效 | 技法 |
|------|------|------|------|------|
| 0:15-0:20 | 筷子夹肉入锅 | pizzicato 保持节奏，低音拨弦做 4 拍循环 | 筷子夹声、肉片入锅“刺啦”、咕嘟加强 | 音乐密度不高，把 ASMR 留在前景 |
| 0:20-0:25 | 入口咀嚼 | 音乐退到极弱，只保留马林巴轻点 | 咀嚼声、满足“嗯～～” | 美食反应靠表演和咀嚼声，不用旋律抢 |
| 0:25-0:28 | 美味升天 | 短促 brass pop + 竖琴上行 + 钟琴星星音 | 爱心星星“叮叮”、粉红蒸汽“噗” | 2 秒爆发，不做完整高潮歌曲 |
| 0:28-0:30 | 比心定格 | 主动机最后一小节 + 结束“叮——” | 卡通定格闪光、关注气泡弹出 | 收尾短、亮、干净 |

**重点：**
- “嗯～～～这个牛肉……”这句期间不要有明显旋律，只保留轻轻的节拍。
- “哇塞！太香了！”时可以让 BGM 小爆一下，但必须避开人声中频。

## AI 音乐生成提示词

### 可灵音乐 / Suno / Udio 通用 Prompt

```text
[Style]
Playful chibi cartoon food vlog underscore, bright Chinese short-video comedy, Pixar-style 3D animation energy, cute mukbang background score.

[Tempo]
124 BPM, C major, bouncy but not too busy.

[Instruments]
String pizzicato as the main bed, upright bass pizzicato, marimba, xylophone, light woodblock, tiny glockenspiel sparkle hits, short harp glissando for food shine, very short brass pop only at the final delicious reaction.

[Structure]
0:00-0:00.5 no music, tiny room tone only.
0:00.5-0:03 bouncy intro, pizzicato strings and xylophone follow a cute rising motif, cartoon boing feel.
0:03-0:08 reduce to low pizzicato and soft woodblock so Chinese voiceover/dialogue stays clear.
0:08-0:15 add marimba and glockenspiel sparkles as the hotpot table is revealed, warm and appetizing.
0:15-0:20 keep steady pizzicato groove under hotpot bubbling and meat-sizzling ASMR.
0:20-0:25 drop music very low, almost only marimba ticks, leave space for chewing and satisfied vocal reaction.
0:25-0:28 short delicious impact: tiny brass pop, harp upward glissando, glockenspiel sparkles, joyful but not loud.
0:28-0:30 final cute cadence, one clean “ding” ending.

[Mood]
Cute, funny, warm, hungry, energetic, bouncy, family-friendly, food looks delicious.

[Negative]
No vocals, no lyrics, no EDM, no trap beat, no rock drums, no electric guitar, no piano ballad, no sad emotion, no cinematic horror, no heavy orchestra, no busy melody during dialogue.
```

### 分段生成版本

#### Segment A — 开场招呼 15秒

```text
15-second playful chibi cartoon mukbang intro underscore, C major, 124 BPM. String pizzicato bed, xylophone melody, marimba bounce, light woodblock. Start with 0.5 seconds silence, then cute boing-like musical pickup as a chibi host pops into frame. Reduce high frequencies during dialogue from 0:03-0:08, then add food sparkle glockenspiel and light harp glissando as a hotpot table is revealed. No vocals, no EDM, no piano, no guitar, no heavy drums.
```

#### Segment B — 涮肉吃播高潮 15秒

```text
15-second cute cartoon food reaction underscore, C major, 124 BPM. Light pizzicato strings and marimba under hotpot sizzling. Leave lots of space for ASMR chewing from 0:05-0:10, music very soft. At 0:10 make a short delicious impact burst with tiny brass pop, glockenspiel sparkles, harp upward glissando, then final clean cartoon ding at the end. Bright, funny, delicious, chibi animation energy. No vocals, no lyrics, no EDM, no rock, no piano ballad.
```

## SFX 时间轴

| # | 名称 | 时间 | 音量 | 说明 |
|---|------|------|------|------|
| SFX-01 | 黑屏入场 whoosh | 0:00.4 | -8dB | 老王弹入前的小吸气感 |
| SFX-02 | 弹入 boing | 0:00.5 | -4dB | Q弹身体落点 |
| SFX-03 | 落地 pop | 0:00.8 | -6dB | 身体回弹 |
| SFX-04 | 招手 swish | 0:01.2 | -12dB | 小手挥动 |
| SFX-05 | 拍胸口咚 | 0:03.6 | -8dB | 卡通低频轻拍 |
| SFX-06 | wink 闪光 | 0:07.8 | -10dB | 短钟琴叮 |
| SFX-07 | 火锅咕嘟 | 0:08-0:30 | -16dB | 全程底层环境，Shot2加大 |
| SFX-08 | 蒸汽嘶 | 0:10.5 | -14dB | 火锅展示时变响 |
| SFX-09 | 搓手声 | 0:12.0 | -12dB | 布料+手掌摩擦 |
| SFX-10 | 筷子夹肉 | 0:15.5 | -7dB | 清脆“夹” |
| SFX-11 | 肉片Q弹晃动 | 0:16.2 | -12dB | 软弹轻声 |
| SFX-12 | 入锅刺啦 | 0:17.8 | -4dB | 食欲重点音 |
| SFX-13 | 金色星星叮 | 0:19.5 | -8dB | 肉熟瞬间 |
| SFX-14 | 一口吞入 | 0:21.0 | -9dB | 卡通“pop” |
| SFX-15 | 咀嚼ASMR | 0:21-0:25 | -14dB | 可爱不恶心，左右轻微摆动 |
| SFX-16 | 满足气息“嗯”空间尾巴 | 0:22.5 | -10dB | 人声自带，可加轻混响 |
| SFX-17 | 美味冲击波 | 0:25.2 | -6dB | 短上升 whoosh |
| SFX-18 | 爱心星星叮叮 | 0:26.0 | -8dB | 高频但短 |
| SFX-19 | 比心 pop | 0:28.2 | -7dB | 定格前 |
| SFX-20 | 结束叮 | 0:29.6 | -5dB | 非音乐单音效，干净收尾 |

## 混音建议

- BGM 主体控制在对白下方：对白期间 BGM duck 到 -24 LUFS，非对白可回到 -18 LUFS。
- 火锅咕嘟声是环境底噪，不要太响；涮肉入锅“刺啦”是 Shot2 的食欲重点，可以短暂顶到 -4dB。
- 咀嚼声必须“可爱 ASMR”，不要湿黏，不要真实咀嚼过度。
- 0:25 美味升天段允许音乐和 SFX 同时抬升，但持续不超过 2 秒，避免盖掉最后一句“太香了”。

## 交付拆分建议

最稳妥做法是生成两个 15 秒 BGM stem：

1. `BGM_Laowang_Intro_15s.wav`
2. `BGM_Laowang_Hotpot_Climax_15s.wav`

再用后期把火锅、涮肉、咀嚼、星星等 SFX 单独贴点。这样比生成一整首 30 秒完整音乐更容易控制对白留白和食物 ASMR。
