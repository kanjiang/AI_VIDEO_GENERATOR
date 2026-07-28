# 《超跑重生》BGM 配乐设计

## 项目定位

60 秒汽车工业大片。画面核心是“超跑从黑暗中诞生 → 精密拆解 → 机械星云巡礼 → 重组并冲向日落”。配乐不能抢过 V12 引擎声浪，应该像一台高精度机器的心跳：低频、金属、克制、昂贵。

---

## 1. 情绪曲线

### 音量 / 密度曲线

```
音量/密度
  ▲
  │                                      ╭────╮  重组/启动/弹射
  │                         ╭────╮      ╭╯    ╰╮
  │            ╭────╮      ╭╯    ╰──────╯      ╰──
  │      ╭────╯    ╰──────╯
  │  ╭───╯
  │╭─╯
  ┼────────────────────────────────────────────── 时间▶
  0s       15s          30s          45s        60s
 隧道猎影   爆炸拆解       星云巡礼       浴火重生
```

### BPM 曲线

```
BPM
  ▲
160│                                      ╱──────╲
145│                            ╭────────╯        ╲
130│        ╭────────────╮      │                  ╲
110│╭───────╯            ╰──────╯                   ╲
 80│
  ┼────────────────────────────────────────────── 时间▶
  0s       15s          30s          45s        60s
 110→132    72/半速       96→120       120→160→尾音
```

### 关键转折

| 时间点 | 画面 | 音乐处理 |
|---|---|---|
| 0:00 | 隧道黑暗中车灯出现 | 低频脉冲 + 远处金属心跳，BGM 极弱进入 |
| 0:14-0:15 | 冲出隧道白光 | 音乐抽空，只留上升噪声和弦 |
| 0:17 | 爆炸拆解启动 | 低频冲击 + 金属打击乐第一次全力落点 |
| 0:30 | FPV 穿梭零件群 | 从打击转为空灵机械音景 |
| 0:48 | 车身合体 | 全曲最大冲击点，铜管/低频/金属 hits 同步 |
| 0:52 | V12 点火 | BGM 下潜让位给引擎声 |
| 0:55-1:00 | 盐湖弹射离去 | 主题最终版出现，随后被风声和远去引擎吞没 |

---

## 2. 全局音乐身份

| 项目 | 参数 |
|------|------|
| 总时长 | 60 秒 |
| 调性 | D minor 开场（冷峻、机械），0:50 后转 F major / D minor 混合调式（释放但不甜） |
| 基础 BPM | 132 BPM；拆解段体感半速 66 BPM；星云段 96 BPM；重组段加速至 160 BPM |
| 核心音色 | 低音合成器脉冲（mechanical heartbeat） |
| 辅助音色 | 金属打击乐、低音大提琴 ostinato、颗粒化合成器、低铜管、短弦群、工业 riser |
| 情绪关键词 | 冷峻、昂贵、机械精密、压迫、重生、速度 |
| 禁止 | 禁人声、禁歌词、禁EDM drop、禁流行鼓点、禁摇滚吉他、禁欢乐旋律、禁管弦乐过度煽情 |

---

## 3. 核心动机

### 主动机 A：机械心跳（用于隧道、重组）

BPM=132，4/4，D minor

```
| 1 . 1 . | ♭3 . 2 . | 1 . 5, . | 1 . 0 . |
| 1 . 1 . | ♭6 . 5 . | 4 . ♭3 . | 2 . 0 . |
```

说明：短促、低频、像机械启动脉冲。前半句不断重复，后半句在重组段拉开。

### 主动机 B：拆解半速版（用于爆炸拆解）

BPM=66（132 半速），4/4，D minor

```
| 1 - - ♭3 | 2 - - 1 |
| 5, - - 1 | 0 - 0 - |
```

说明：留大量空拍，让金属拆解 SFX 进入。音乐像“巨大的机器在慢动作呼吸”。

### 主动机 C：星云巡礼版（用于 FPV 穿梭）

BPM=96，6/8，D minor suspended

```
| 1 . 5 . 2 . | ♭3 . 2 . 1 . |
| 5 . ♭6 . 5 . | 2 . 1 . 0 . |
```

说明：不强调旋律歌唱性，使用玻璃质感合成器和金属泛音，制造“机械星系”漂浮感。

### 主动机 D：重生终版（用于盐湖弹射）

BPM=160，4/4，F major / D minor hybrid

```
| 1 1 ♭3 5 | ♭6 5 4 ♭3 |
| 1 2 ♭3 5 | 1' - 5 - |
```

说明：同一主题抬高八度，加入铜管和短弦，但不做英雄主义大合唱，保持高级汽车广告的克制。

---

## 4. 分镜配乐表

### Shot 1 — 隧道猎影（0:00 - 0:15）

| 层 | 内容 |
|---|---|
| 过渡 | 从纯黑开始，0:00-0:01 保持近乎静默，只进入 30Hz-60Hz 极低频空气震动。 |
| 音乐 | 主动机 A 的前 4 小节，低音合成器 pp→mf；0:05 加入低音大提琴 ostinato；0:10 加入短促金属 ticking，模拟隧道灯快速掠过。 |
| 节奏 | BPM 110 起步，0:05 后加速到 132。节拍与车灯逼近、隧道灯闪烁同步。 |
| 音效 | 引擎远处低频 0:01；隧道混响 0:03；车辆掠过空气撕裂 0:08；白光 riser 0:12-0:15。 |
| 情绪 | “你听见一个怪物从黑暗深处醒来，并且它正在冲向你。” |
| 技法 | 0:14-0:15 音乐抽空，只留高频 riser + 白噪声，给 Shot 2 的爆炸拆解留空间。 |

### Shot 2 — 爆炸拆解（0:15 - 0:30）

| 层 | 内容 |
|---|---|
| 过渡 | 承接 Shot 1 的白光尾音，0:15-0:16 保持高频悬停，低频暂时消失。 |
| 音乐 | 主动机 B 半速版。低音合成器极弱持续，金属打击乐只在关键拆解点出现：0:17、0:19、0:21、0:24。0:24 后加入颗粒化合成器，模拟零件悬浮。 |
| 节奏 | 体感 66 BPM，实际底层仍可保持 132 的细分脉冲。空拍多，让金属 SFX 成为主角。 |
| 音效 | 拆解冲击 0:17；车门/覆盖件解锁 0:18；悬挂弹簧拉伸 0:20；V12 引擎分离 0:22；螺栓金属雨 0:24-0:26；微距金属共振 0:26-0:30。 |
| 情绪 | “这不是爆炸破坏，而是一台完美机器把灵魂拆给你看。” |
| 技法 | 每次金属 hit 前 0.2 秒削弱 BGM，让 SFX 像画面剪辑点一样清晰。 |

### Shot 3 — 星云巡礼（0:30 - 0:45）

| 层 | 内容 |
|---|---|
| 过渡 | Shot 2 的金属尾音拉成长混响，0:30 被 granular pad 接住。 |
| 音乐 | 主动机 C，玻璃质感合成器 + 金属泛音 + 极轻的低频脉冲。0:30-0:38 用 6/8 漂浮感配合 FPV 穿梭；0:38-0:45 加入低频脉冲，暗示零件开始内聚。 |
| 节奏 | BPM 96，弱化鼓点，不做明显鼓组；脉冲跟随“机械太阳系”的自转闪光。 |
| 音效 | FPV 穿越车架管道音 0:31；擦过引擎节气门 0:33；穿过轮毂缝隙 0:35；贴飞排气管 0:37；零件群低频磁吸 0:42-0:45。 |
| 情绪 | “你进入了这台车的内部宇宙，所有零件像星体一样有自己的轨道。” |
| 技法 | 0:42 开始逐渐收窄滤波器频段，音色从宽阔变窄，制造“万物向中心收缩”的听觉暗示。 |

### Shot 4 — 浴火重生（0:45 - 1:00）

| 层 | 内容 |
|---|---|
| 过渡 | Shot 3 的磁吸低频不断加速，直接进入 0:45 的重组段。 |
| 音乐 | 0:45-0:48 主动机 A 的碎片加速重复；0:48 合体瞬间全体 hit；0:49-0:52 主动机 D 进入，低铜管 + 短弦 + 低音合成器；0:52 引擎点火后 BGM 自动 duck 到 -8dB，让引擎占主导；0:55-1:00 主动机 D 尾句拉长，最后只剩一个 F/D 开放五度尾音。 |
| 节奏 | 0:45-0:48 从 120 加速到 160；0:48 hit 后短暂停顿；0:52 后节奏交给引擎声浪和轮胎声。 |
| 音效 | 零件高速汇聚 0:45-0:48；合体冲击 0:48；车灯启动 0:50；V12 起动机 0:52；点火爆燃 0:53；后轮空转 0:55；弹射起步 0:56；远去引擎 0:58-1:00。 |
| 情绪 | “它不是被修好，它是重新出生，然后立刻奔向地平线。” |
| 技法 | 最大动态点不是 1:00，而是 0:48 合体；最后 5 秒让音乐退后，保留速度和空间感。 |

---

## 5. AI 音乐生成提示词

### Suno / Udio 完整版提示词（推荐先试）

```text
[Instrumental] [Cinematic Industrial Hybrid Score] [Luxury Automotive Commercial]

A 60-second instrumental cinematic industrial score for a high-end supercar commercial: a matte black supercar races through a tunnel, explodes into precision mechanical parts, becomes a floating mechanical galaxy, then reassembles and launches across a salt flat at sunset.

Style: mechanical low synth pulse as the core motif, metallic percussion, low cello ostinato, granular synth textures, low brass swells, short string pulses, deep cinematic sub-bass. Expensive, restrained, precise, high-performance automotive advertising sound.
Inspired by modern premium car commercials, Hans Zimmer-style mechanical tension, Trent Reznor / Atticus Ross industrial minimalism, and restrained IMAX trailer sound design.
No vocals, no lyrics, no EDM drop, no pop beat, no rock guitar, no trap hi-hats, no cheerful melody, no generic orchestral hero music.

Structure:
[Intro 0:00-0:15] Dark tunnel pursuit. Start almost silent with a sub-bass mechanical heartbeat, slowly accelerating from 110 BPM to 132 BPM. Add low cello ostinato and metallic ticking as the car approaches. End with a rising white-light transition and sudden thinning.
[Deconstruction 0:15-0:30] Precision mechanical explosion in slow motion. Half-time feel around 66 BPM over a 132 BPM grid. Sparse low synth, huge gaps, metallic impacts at key moments, shimmering granular metal textures. Music leaves space for mechanical SFX.
[Mechanical Galaxy 0:30-0:45] Floating parts in black space, FPV through engine, chassis, wheels, exhaust. Shift to 96 BPM, suspended minor harmony, glassy granular synths and metallic overtones, no obvious drums, deep pulsing undertone grows after 0:42.
[Rebirth 0:45-1:00] Parts accelerate inward and reassemble. Build from 120 to 160 BPM, massive impact at 0:48, then low brass and short strings reveal the main motif. At 0:52 duck the music for V12 engine ignition. Final 5 seconds: triumphant but restrained, let the engine and wind dominate, end on an open fifth.

Mood: cold, luxurious, mechanical, precise, powerful, reborn, high-speed
```

### 可灵音乐中文提示词

```text
纯器乐，60秒，电影级工业汽车广告配乐。

主题：哑光黑超跑从隧道黑暗中疾驰而来，爆炸式拆解成精密机械零件，零件在黑色空间中形成机械星云，最后极速重组成完整超跑并在盐湖日落中弹射起步。

风格：高级汽车广告、冷峻工业、机械心跳低频、金属打击乐、低音大提琴持续音型、颗粒化合成器、低铜管、短弦群。整体克制、昂贵、压迫、精密，不要热血摇滚，不要EDM，不要流行鼓点，不要人声，不要歌词。

结构：
0:00-0:15 隧道猎影：几乎静默开场，30-60Hz低频机械心跳，BPM从110加速到132，加入低音大提琴和金属 ticking，结尾白光转场时音乐抽空。
0:15-0:30 爆炸拆解：半速66BPM体感，大量留白，低频合成器极弱持续，关键位置加入巨大金属冲击和精密机械解锁感，音乐给音效让位。
0:30-0:45 星云巡礼：96BPM，6/8漂浮感，玻璃质感合成器和金属泛音，像机械零件在黑色宇宙中缓慢运转，42秒后低频逐渐收紧。
0:45-1:00 浴火重生：从120加速到160BPM，48秒最大合体冲击，之后低铜管和短弦推出主题，52秒后音乐降低音量让V12引擎点火成为主角，最后5秒音乐退后，只留下速度感和开放五度尾音。

情绪关键词：冷峻、昂贵、机械精密、压迫、重生、速度。
```

### 分段生成备选方案

如果完整生成卡不准转折，按以下 4 段生成后在剪辑软件里交叉淡入淡出：

```text
Segment 1, 15 seconds. Instrumental cinematic industrial automotive score in D minor, 110 to 132 BPM. Sub-bass mechanical heartbeat, low cello ostinato, metallic ticking, tunnel chase tension, premium car commercial, no vocals, no EDM, no rock guitar.
```

```text
Segment 2, 15 seconds. Sparse half-time industrial score in D minor, 66 BPM feel. Huge silence gaps, low synth drone, metallic percussion impacts, precision machine deconstruction, slow motion luxury engineering, no drums groove, no vocals, no melody-heavy pop.
```

```text
Segment 3, 15 seconds. Floating mechanical galaxy ambience, 96 BPM, 6/8 suspended minor harmony. Glassy granular synths, metallic overtones, deep sub pulse, no obvious drums, black space, precision car parts orbiting like planets, no vocals.
```

```text
Segment 4, 15 seconds. Cinematic industrial rebirth climax, accelerate from 120 to 160 BPM. Low brass, short strings, metallic percussion, massive impact at 3 seconds, then duck for V12 engine ignition, restrained luxury supercar launch across salt flats, no vocals, no EDM drop.
```

---

## 6. SFX 时间线

| 编号 | 音效名称 | 时间点 | 混音建议 | 来源建议 |
|------|----------|--------|----------|----------|
| SFX-01 | 远处 V12 低频引擎声 | 0:01 | -4dB，隧道混响 | BBC / Pixabay 搜索 `sports car engine distant tunnel` |
| SFX-02 | 隧道车辆逼近 whoosh | 0:04 | -3dB，左右声像轻微移动 | Mixkit 搜索 `car pass by whoosh` |
| SFX-03 | 高速掠过空气撕裂 | 0:08 | 0dB，短促宽声像 | Mixkit / 自制 whoosh |
| SFX-04 | 白光 riser | 0:12 | -5dB，逐渐升高 | AI SFX 或合成器 noise riser |
| SFX-05 | 拆解低频冲击 | 0:17 | 0dB，BGM duck 0.5s | Trailer boom / impact |
| SFX-06 | 机械解锁密集声 | 0:18 | -2dB，立体声散布 | BBC 搜索 `mechanical latch metal clicks` |
| SFX-07 | 悬挂弹簧拉伸 | 0:20 | -4dB，金属弹性尾音 | Foley / spring tension |
| SFX-08 | V12 引擎分离金属重物 | 0:22 | -2dB，低频+金属摩擦 | Industrial metal movement |
| SFX-09 | 螺栓金属雨 | 0:24 | -6dB，细碎高频 | DIY：小螺丝撒在金属盘 |
| SFX-10 | FPV 穿越车架管道 | 0:31 | -4dB，管道滤波 | whoosh + tunnel EQ |
| SFX-11 | 擦过引擎节气门 | 0:33 | -5dB，短促金属气流 | whoosh + metallic ping |
| SFX-12 | 穿过轮毂缝隙 | 0:35 | -5dB，双声道快速掠过 | whoosh stereo pass |
| SFX-13 | 贴飞钛合金排气管 | 0:37 | -5dB，金属泛音 | metallic shimmer |
| SFX-14 | 零件磁吸内聚低频 | 0:42 | -3dB，持续到0:45 | synth magnetic pull |
| SFX-15 | 零件高速汇聚 | 0:45 | -2dB，节奏加速 | layered metal whooshes |
| SFX-16 | 合体重击 | 0:48 | 0dB，全频冲击，BGM duck | cinematic metal impact |
| SFX-17 | 车灯电子启动 | 0:50 | -5dB，短促清晰 | UI power on / electric click |
| SFX-18 | V12 起动机 | 0:52 | -2dB，音乐降低 | engine starter |
| SFX-19 | V12 点火爆燃 | 0:53 | 0dB，主导画面 | high quality V12 ignition |
| SFX-20 | 后轮空转盐壳碎裂 | 0:55 | -2dB，轮胎+碎裂层 | tire spin + gravel crunch |
| SFX-21 | 弹射起步引擎远去 | 0:56 | 0dB→-10dB 远去 | sports car launch pass by |
| SFX-22 | 盐湖风声尾音 | 0:58 | -10dB，保留到结束 | desert wind ambience |

### 混音用 SFX_TIMELINE

```python
SFX_TIMELINE = [
    ("SFX-01_v12_engine_distant_tunnel.wav", 1.0, -4),
    ("SFX-02_car_approach_whoosh.wav", 4.0, -3),
    ("SFX-03_high_speed_passby.wav", 8.0, 0),
    ("SFX-04_white_light_riser.wav", 12.0, -5),
    ("SFX-05_deconstruction_sub_impact.wav", 17.0, 0),
    ("SFX-06_mechanical_unlock_clicks.wav", 18.0, -2),
    ("SFX-07_suspension_spring_stretch.wav", 20.0, -4),
    ("SFX-08_heavy_engine_separation.wav", 22.0, -2),
    ("SFX-09_bolt_metal_rain.wav", 24.0, -6),
    ("SFX-10_fpv_chassis_tunnel.wav", 31.0, -4),
    ("SFX-11_engine_intake_whoosh.wav", 33.0, -5),
    ("SFX-12_wheel_gap_whoosh.wav", 35.0, -5),
    ("SFX-13_titanium_exhaust_shimmer.wav", 37.0, -5),
    ("SFX-14_magnetic_pull_low.wav", 42.0, -3),
    ("SFX-15_parts_converge_whoosh.wav", 45.0, -2),
    ("SFX-16_reassembly_metal_hit.wav", 48.0, 0),
    ("SFX-17_headlight_power_on.wav", 50.0, -5),
    ("SFX-18_v12_starter.wav", 52.0, -2),
    ("SFX-19_v12_ignition_roar.wav", 53.0, 0),
    ("SFX-20_tire_spin_salt_crack.wav", 55.0, -2),
    ("SFX-21_supercar_launch_passby.wav", 56.0, 0),
    ("SFX-22_salt_flat_wind_tail.wav", 58.0, -10),
]
```

---

## 7. 混音建议

| 层 | 音量 |
|---|---|
| BGM 主体 | -8dB 到 -5dB |
| 引擎声浪 | -3dB 到 0dB，永远优先 |
| 金属冲击 | 0dB，但每次不超过 0.5 秒 |
| 细碎机械 Foley | -8dB 到 -4dB |
| 风声 / 空间氛围 | -14dB 到 -10dB |

关键规则：

- 0:17、0:48、0:53 三个点必须做 BGM ducking。
- Shot 2 的音乐不能太满，拆解的金属 SFX 才是主角。
- Shot 4 的 0:52 之后，V12 引擎应该压过音乐，形成汽车广告的“真实力量感”。
- 最后一秒不要硬切音乐，保留远去引擎 + 风声，让画面有余味。
