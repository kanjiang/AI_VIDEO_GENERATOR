# PRISMA — 出道预告片 BGM & SFX 配乐方案

Input: `teaser-45s.md` (45s Hollywood-format teaser, no dialogue except 6 short native-language calls + 1 unison line)
Output pipeline: This doc → Suno/Udio prompts → generate music WAV → SFX assembly → ffmpeg mix onto silent video

---

## 特殊定位声明：music-first video（音乐驱动型）

这不是 underscoring（服务于对白的隐形铺底）。这是 **music-first teaser**——音乐是"起搏器"，画面是"起搏器上的舞蹈"。全片有 6 句极短的母语呼喊 + **1 段 5 秒集体演唱 hook**（L3 升级），所以：

- Strings-first 原则**部分适用**：底盘 = trap 808 + 弦乐 pad，民族乐器做 signature colors 而非底层
- 6 句母语呼喊需要在音乐里"凿"出 0.4-0.6s 的 duck 窗口
- 每个 signature moment 的高难度动作 = 一个 percussion hit / drum fill / bass slide 卡拍
- **L3 唱段（0:36.5-0:41.5）** 走独立 Suno 生成 + 后期分层混合，与器乐主轨叠合

---

## Step 0 — 4 问先行 check（分段）

### 段落 A：冷开场（0-6s）
| # | 问题 | 答案 |
|---|---|---|
| 1 | 戏剧功能 | 从虚无中孵化能量。心跳 → 白光 → 分光 → 五色击中地板。为下一秒的爆发蓄力 |
| 2 | 旋律显露度 | **零旋律**。只有 sub-bass 心跳 + high-drone pad + 玻璃裂响 SFX |
| 3 | 主次配器 | Sub-bass heartbeat 60Hz（80%）+ 高频 airy string drone（20%）。打破由玻璃裂响承担 |
| 4 | 对白留白 | 无对白。全部声位归属于氛围+SFX |

### 段落 B：五人 signature（6-31s）
| # | 问题 | 答案 |
|---|---|---|
| 1 | 戏剧功能 | 五次"点火"。每人一次能量注入，节奏递增，动能累积 |
| 2 | 旋律显露度 | 核心 motif 每人一次 2-bar 呈现，用**不同国别乐器**演奏——听感统一（同一 motif）但音色跨国 |
| 3 | 主次配器 | 底盘：trap kick + 808 sub + hi-hat rolls（70%）。上层：每人一件国别乐器演奏 motif（30%） |
| 4 | 对白留白 | 6 段各有 1 句 0.4-0.6s 短呼喊。音乐在呼喊瞬间 sidechain duck 3dB，让人声穿透 |

### 段落 C：集结 + drop + 唱段 hook + logo（31-45s）
| # | 问题 | 答案 |
|---|---|---|
| 1 | 戏剧功能 | 全员聚合 → 定格 → **集体演唱团名 hook** → 五色融白光 → LOGO 落。情绪从器乐累积到人声爆发，最后到视觉终结 |
| 2 | 旋律显露度 | **完整 motif 全奏 + 人声 hook 派生自 motif** —— 五国乐器齐奏 motif 是器乐爆发，人声 hook 是同一 motif 的旋律派生（Bar 1 上行走向变成 "We-are-PRIS-MA"） |
| 3 | 主次配器 | 31-36s: Trap drop + 五件民族乐器齐奏 + orchestral hit + 908 crash · **36.5-41.5s: 人声 hook 主导（五声部齐唱 + choir 和声垫底），器乐 duck 4dB 让位** · 41.5-44s: 人声 "MA" sustain 尾音 + white bloom sweep |
| 4 | 对白留白 | 5 秒人声 hook 段器乐 duck 4dB；LOGO BOOM 前 0.3s 全静音 |

---

## Step 1 — 情绪曲线与 BPM 曲线

### 音量/密度曲线

```
音量/密度
  ▲
100│                                                                 ╭───╮  [MERGE DROP + LOGO]
   │                                                              ╭─╯    ╰╮
 80│                              ╭─╮  ╭─╮  ╭─╮  ╭─╮  ╭─╮        ╱        ╰
   │                              │ │  │ │  │ │  │ │  │ │       ╱
 60│                              │ │  │ │  │ │  │ │  │ │      ╱
   │                              │ │  │ │  │ │  │ │  │ │     ╱
 40│                              │L│  │Y│  │S│  │M│  │R│    ╱
   │                       ╭──╮  │A│  │E│  │K│  │A│  │A│   ╱
 20│         ╭──╮       ╭─╯   ╰──┴─┴──┴─┴──┴─┴──┴─┴──┴─┴──╱
   │─╮  ╭──╯    ╰──╮ ╭─╯
  0│  ╰─╯          ╰─╯
   ┼─────────────────────────────────────────────────────────────────────── 时间▶
    0    3     6     11    16    21    26    31        41   44 45
    黑  光柱  分光   LAN   YEON  SKYE  MALI  RANI    MERGE   LOGO
```

### BPM 曲线

```
BPM
  ▲
160│                                                    ╱──╮
150│                                                   ╱   ╰──╮
140│                              ╭─────────────────╮╱        ╰─  [drop 保持 140]
130│                              │  [140 稳定]     │
120│                              │                 │
100│                             ╱│                 │
 80│─────────╮       ╭──────────╯ │                 │
 60│         ╰───────╯heartbeat 90│                 │
   ┼──────────────────────────────────────────────────────────────── 时间▶
    0        3       6              31                45
    slow    slower   [BPM jump]     [drop climb]
    open    prism    到 140          140→155 短暂拉升 → 落回 140 收
```

**BPM 时间轴要点：**
- 0-3s: 无节拍，只有 60Hz 低频律动，"BPM"感官上像 ~60（每秒 1 次心跳）
- 3-6s: 心跳加速到 ~90，pad drone 拉高
- **6s: BEAT DROP** → 立刻切到 140 BPM trap groove
- 6-31s: 稳定 140 BPM，每 5 秒切换乐器色彩（不动 BPM）
- 31-41s: 140 BPM 上加密 hi-hat + tom fills，感官加速
- 41-44s: 短暂拉到 155 BPM（drop 之后的 outro），配 orchestral crescendo
- 44-45s: 单一低音 BOOM，无 BPM

---

## Step 2 — 全局参数表

| 项目 | 参数 |
|---|---|
| 总时长 | 45s |
| 调性 | **F# 小调**（暗色 + 张力，K-pop teaser 标配）；drop 段无调性变化 |
| 基础 BPM | **140**（trap teaser 速度，匹配 BLACKPINK/ITZY 预告片） |
| 核心节奏骨架 | Trap kick + 808 sub + triplet hi-hat rolls |
| 底层氛围 | Sub-bass drone + airy string pad（100Hz 以下 + 8kHz 以上，让出人声频段） |
| **国别 signature 乐器** | 古筝(LAN) · 伽倻琴(YEON) · 808 riff synth(SKYE) · 泰式扬琴 khim(MALI) · sitar+tabla(RANI) |
| **段落 C 全奏** | 五件民族乐器 + trap drop + orchestral brass hit + choir "ahh" pad |
| 情绪关键词 | 神秘 · 点火 · 集结 · 觉醒 · 声明 |
| **禁止** | 抒情钢琴、原声吉他、EDM synth lead、auto-tune 假声主唱、迪士尼风管弦乐、任何欢快 major-key 段落 |

---

## Step 3 — Core motif（PRISMA 主题）

**4-bar phrase, F# 小调, 140 BPM, 4/4**

简谱（首调唱名法, F# = 1）：

```
| 1  3  5  7 | 5  4  3  1 | 1  3  5  7  2 | 1 - - - |
  ↓  ↓  ↓  ↓   ↓  ↓  ↓  ↓   ↓  ↓  ↓  ↓  ↓    ↓
  F# A  C# E   C# B  A  F#  F# A  C# E  G#   F#(sustain)
```

- Bar 1: 上行小三和弦 + 七音 → 立即建立"暗色小调"身份
- Bar 2: 下行走线 → 悬念
- Bar 3: 上冲到升二音 (G# passing tone) → 张力峰
- Bar 4: 落回主音持续 → 呼吸口，为下一小节留白

**这条 motif 的关键性质：** 五个音在五声音阶范围内（F# A C# E + 加音 B/G#），所以**古筝、伽倻琴、sitar 都能不做半音修改直接弹奏**——这就是让"五国乐器演同一段旋律但都听着自然"的技术基础。

---

## Step 3.5 — 五国 signature 变奏（同一 motif × 五种音色）

| 变奏 | 使用于 | 乐器演绎 motif | 装饰 | 6 轴 |
|---|---|---|---|---|
| **A · LAN 版** | 6-11s | 古筝 (guzheng)，Bar 1-2，配一记大 pipa 拨弦 | 结尾一次 pitch bend (泛音大滑) | 旋律:完整 / 音区:中 / 织体:3层 / 脉冲:强 / 和声:稳 / 空间:中 |
| **B · YEON 版** | 11-16s | 伽倻琴 (gayageum) 快速拨奏 Bar 1-2 | 韩式 janggu 鼓（长鼓）双击开场，配韩式吟唱 "hup!" 短呼吸 | 旋律:完整 / 音区:中高 / 织体:4层 / 脉冲:强 / 和声:稳 / 空间:中 |
| **C · SKYE 版** | 16-21s | 变形失真 808 synth lead 演奏 Bar 1-2（不用民族乐器——她是唯一 rap 定位，用美国街头声） | Trap snare roll 收尾 + air-horn 半秒 | 旋律:碎片 / 音区:低+高 / 织体:5层 / 脉冲:极强 / 和声:悬 / 空间:近 |
| **D · MALI 版** | 21-26s | 泰式 khim (扬琴) 演奏 Bar 1-2, 加 microtonal bend | 泰式 ching 铙钹小击 (卡在动作定格点) + tom fill | 旋律:完整(带滑音) / 音区:中高 / 织体:3层 / 脉冲:强 / 和声:稳 / 空间:中 |
| **E · RANI 版** | 26-31s | Sitar 弹 Bar 1-2, 每音带 meend（长滑音） | Tabla groove 打底 + ankle bells "chham" 卡在双跺脚 + 一声长 "aa" 女声 | 旋律:完整(meend) / 音区:中 / 织体:4层 / 脉冲:强 / 和声:稳 / 空间:近 |

**核心统一性验证：** 5 个变奏都在 F# 小调 140 BPM 上、都演奏同一条 4-bar motif、都建立在同一 trap 底盘上。**变化只在色彩层。** 观众听完不会觉得"5 首不同的歌拼在一起"，而是"同一首歌换了 5 种口音"。

---

## Step 3.7 — 人声 HOOK 设计（L3）

**5 秒集体演唱，位置 0:36.5-0:41.5**

### 词
> **"We are —— PRIS —— MA!"**（3 词 4 音节 + 尾音 sustain）

### 旋律形态（派生自 core motif）

Core motif Bar 1 是 F# → A → C# → E（1-3-5-7），hook 的音高走向复用这个上行框架：

```
| We   are  |  PRIS  MA — — — |
  ↓    ↓      ↓     ↓
  A    C#     E     F#(sustain 3s, 8度到高音F#)
  3rd  5th    7th   Root(高八度)
```

简谱（首调 F# 小调）：

```
| 3   5  |  7   1̇ — — — |
  We  are   PRIS MA -
```

- Bar 1 (140 BPM, 0.85s): "We" (3rd) → "are" (5th) — 1 拍/词，扎实台阶
- Bar 2 (140 BPM, 3.4s): "PRIS" (7th) → "MA" 高八度主音 → sustain 3 秒
- 尾音 3 秒 sustain 里可加**女声长音颤音 (vibrato)** + 一次微微下滑到 F# 主音（heroic 归位）

### 声部编排

| 层 | 内容 | 音色/参考 |
|---|---|---|
| **Lead 1 (unison)** | 五人齐唱主旋律（无谐音） | K-pop girl group unison，参考 aespa Karina 力量声线 |
| **Choir doubling** | 同一旋律，低八度和声垫底 | 女声合唱团 "aah" 音色，10-12 人厚度 |
| **Adlib（可选）** | "MA" sustain 尾段一个 run（高音下行 melisma 3 音） | 一人 solo，参考 Rosé adlib 风格 |
| **禁止** | 男声、rap、说话、autotune 明显、任何抒情颤音过多的抒情腔 |

### 演唱指示

- **气口**："We" 前有一个 0.15s 的集体吸气声（增强"她们要开口了"的期待）
- **收音**：干声近场（zero reverb 起唱）→ "MA" sustain 段 reverb tail 逐渐拉长到大厅混响
- **能量曲线**：起唱 mp → "PRIS" 冲到 f → "MA" sustain 保持 f 全程

---

## Step 4 — 逐段配器表

### 段落 A · 冷开场（0:00 – 0:06）

| 层 | 内容 |
|---|---|
| 过渡 | 无——纯静音 fade-in |
| 音乐 | 无 motif。60Hz sub-bass 心跳（每 0.7s 一次）+ 8kHz 以上 airy string pad（pp 起, 3s 内 crescendo 到 mp）|
| 节奏 | 无 BPM。心跳 → 90 BPM 感觉 |
| 音效 | **SFX-01** 深呼吸（0:00 淡入）· **SFX-02** 光束高频"嗡"响（0:03 fade in）· **SFX-03** 玻璃裂响（0:05.5，硬切，为下一秒 beat drop 打门）|
| 情绪 | "有什么在酝酿。" |
| 技法 | 6 轴=[旋律:无, 音区:极低+极高, 织体:2层, 脉冲:心跳弱脉, 和声:悬, 空间:极远] · 音乐抽空 0:05-0:06 1秒静默，只有玻璃裂响 → 制造"炸开"感 |

### 段落 B1 · LAN blue pool（0:06 – 0:11）

| 层 | 内容 |
|---|---|
| 过渡 | 玻璃裂响余音 → BEAT DROP：140 BPM trap kick 立即进入 |
| 音乐 | Trap底盘 (kick+808+hi-hat) + **Variation A · LAN**：古筝 Bar 1-2, mf |
| 节奏 | 140 BPM 稳定 4/4。古筝落点卡在 0:07.3（LAN 折扇开）、0:09.0（旋转起点）、0:10.5（面对镜头） |
| 音效 | **SFX-04** 折扇 SNAP（0:07.3, +2dB）· **SFX-05** 布料/头发甩风声（0:09.0-0:09.7 旋转全程）· **SFX-06** 深低音 sub-hit（0:10.5 面镜头瞬间）|
| 情绪 | "第一把火点着了。" |
| 技法 | 6 轴=[旋律:完整, 音区:中, 织体:3层, 脉冲:强, 和声:稳, 空间:中] · Sidechain duck 0:10.7-0:11.1 让位给 "Zài zhèlǐ" 台词 |

### 段落 B2 · YEON pink pool（0:11 – 0:16）

| 层 | 内容 |
|---|---|
| 过渡 | 古筝尾音 pitch-bend 下滑接入 → 伽倻琴同调进入 |
| 音乐 | Trap 底盘持续 + **Variation B · YEON**：伽倻琴 fast plucking Bar 1-2, mf；janggu 双击在 0:11.5 |
| 节奏 | 140 BPM。伽倻琴音符密度 ×2 提速感 |
| 音效 | **SFX-07** 韩服丝绸袖甩风声（0:12.2）· **SFX-08** 后弯落地闷响（0:13.5）· **SFX-09** SNAP 弹起打点（0:14.3）|
| 情绪 | "第二把，更快。" |
| 技法 | 6 轴=[旋律:完整, 音区:中高, 织体:4层, 脉冲:强, 和声:稳, 空间:中] · Duck 0:15.5-0:15.9 让 "Naya" |

### 段落 B3 · SKYE white pool（0:16 – 0:21）

| 层 | 内容 |
|---|---|
| 过渡 | 伽倻琴突然截断（stinger）→ 静默 0.3s → 808 riff 硬切进入 |
| 音乐 | Trap 底盘 + **Variation C · SKYE**：失真 808 synth 演奏 motif riff, f；trap snare roll 从 0:19.5 加密 |
| 节奏 | 140 BPM。snare rolls 感觉 ×2 加速 |
| 音效 | **SFX-10** 帽子抛空布风声（0:17.5）· **SFX-11** 单手 freeze 落地手掌拍地 heavy (0:18.5, -2dB 混人 kick)· **SFX-12** air-horn 短 0.4s（0:20.0）|
| 情绪 | "美国腔的挑衅。" |
| 技法 | 6 轴=[旋律:碎片, 音区:低+高, 织体:5层, 脉冲:极强, 和声:悬, 空间:近] · **音乐抽空 0.3s** 段前，制造 SKYE 出场的"劈开"感 · Duck 0:20.3-0:20.7 让 "Right here" |

### 段落 B4 · MALI gold pool（0:21 – 0:26）

| 层 | 内容 |
|---|---|
| 过渡 | Air-horn 尾 →khim 一声柔滑铃响进入 |
| 音乐 | Trap 底盘 + **Variation D · MALI**：khim 演奏 motif Bar 1-2, mf；microtonal bend 在 0:23.5 空中转体 |
| 节奏 | 140 BPM。tom fill 从 0:24.5 加密到 0:25 pop-lock 头 snap |
| 音效 | **SFX-13** 泰式古典 ching 铙钹小击（0:21.5, 卡手势展开）· **SFX-14** 空中转体金属布料 whoosh（0:23.5）· **SFX-15** 落地 lunge 沉响（0:24.3）· **SFX-16** ching-ching 双击 pop-lock（0:25.0）|
| 情绪 | "东南亚金属的旋。" |
| 技法 | 6 轴=[旋律:完整(带滑音), 音区:中高, 织体:3层, 脉冲:强, 和声:稳, 空间:中] · Duck 0:25.5-0:25.9 让 "Nêe chǎn" |

### 段落 B5 · RANI orange pool（0:26 – 0:31）

| 层 | 内容 |
|---|---|
| 过渡 | Khim 尾音持续 → sitar drone 覆盖上层，无缝叠入 |
| 音乐 | Trap 底盘 + **Variation E · RANI**：sitar 演奏 motif with meend, mf；tabla groove 加入（每小节 dha-dhin-dhin-dha）|
| 节奏 | 140 BPM。tabla 感觉在 4 拍上加了 8 分附加 = 更 groovy |
| 音效 | **SFX-17** 面纱丝绸滑动（0:26.5）· **SFX-18** 极近 kohl 眼特写 breath 吸气（0:27.5）· **SFX-19** Araimandi 蹲落地闷响（0:28.5）· **SFX-20** 脚铃 chham 双击（0:29.0-0:29.4，卡双跺）· **SFX-21** 女声长 "aa" 一秒（0:30.0-0:31.0，衔接 drop）|
| 情绪 | "第五把，最缓最沉，也最深。" |
| 技法 | 6 轴=[旋律:完整(meend), 音区:中, 织体:4层, 脉冲:强, 和声:稳, 空间:近] · Duck 0:30.5-0:30.9 让 "Main aayi" |

### 段落 C1 · MERGE + DROP（0:31 – 0:36）

| 层 | 内容 |
|---|---|
| 过渡 | RANI 段女声 "aa" 拉长 → 交给 choir 接管 → 全乐器进入 |
| 音乐 | **FULL DROP**：Trap 底盘 + **五国乐器全奏 motif**（古筝+伽倻琴+808+khim+sitar 同时演奏 Bar 1-4 完整版）+ orchestral brass hit（0:36）+ choir "ahh" pad 铺底 + 908 crash（0:36 集体定格瞬间）|
| 节奏 | 140 BPM 稳定 → 0:36 集体定格 = 全乐器 impact hit |
| 音效 | **SFX-22** 五道光束合流"呜"声（0:31-0:36 crescendo）· **SFX-23** 集体定格 impact hit（0:36.0，重合 908 crash）|
| 情绪 | "五束光聚拢，砸在一起。" |
| 技法 | 6 轴=[旋律:完整, 音区:全, 织体:全奏6层+, 脉冲:极强, 和声:F# 小调完全终止, 空间:近→大厅] · 0:36.0 后**器乐立即 tail-off**（1-beat 快衰减），给 hook 让位 |

### 段落 C2 · SUNG HOOK "We are PRIS-MA"（0:36.5 – 0:41.5）

| 层 | 内容 |
|---|---|
| 过渡 | 0:36.0-0:36.5 **micro-silence 0.5s**（器乐残响 + 全静默 0.2s）→ 人声凭空浮起 |
| 人声 | **五声部集体演唱** hook（详见 Step 3.7）：F#m 上行走向，最后落在主音 F#，"MA" 长 sustain 3 秒 · 一层 choir "aah" 和声垫低八度 |
| 音乐 | 器乐层持续但**duck 4dB**：sub bass + 808 kick 保持脉冲、hi-hat 转 open cymbal 泛响、民族乐器保持长音 pad（不再演奏 motif，因为人声在演 motif） |
| 节奏 | 140 → 155 BPM 加速（vocal 尾段 crescendo 感）|
| 音效 | **SFX-24** hook 首拍 vocal-in 前 0.2s 一声 "shimmer" 高频铃响（0:36.7，标记人声入点）|
| 情绪 | "她们开口了。这是宣言。" |
| 技法 | 6 轴=[旋律:完整(vocal), 音区:高, 织体:6层(人声主导), 脉冲:强, 和声:主音归位, 空间:近] · **人声独立 Suno 生成 + 器乐主轨分层混合**（详见 Step 5.5）· 器乐 sidechain compress by vocal（vocal 一响器乐 duck 4dB） |

### 段落 C3 · WHITE BLOOM + LOGO（0:41.5 – 0:45）

| 层 | 内容 |
|---|---|
| 过渡 | Hook 尾音 "MA" sustain 从 0:41.5 开始持续到 0:44 → 白光 bloom 视觉同步扩张 |
| 音乐 | 人声 sustain "MA" + choir sustain + 器乐 pad 汇合 → 全部渐弱到 0:44 · 0:44-0:44.5 **全静音 0.5s** |
| 节奏 | 无 BPM，只有渐弱曲线 |
| 音效 | **SFX-25** 五色融白光"耀"声（0:41.5）· **SFX-26** 白光 bloom 高频扫过（0:42-0:44）· **SFX-27** LOGO SLAM 单音低 BOOM（0:44.5，-1dB）|
| 情绪 | "结束。留下 logo，留下五张脸。" |
| 技法 | 6 轴=[旋律:长音, 音区:全消散, 织体:pad only, 脉冲:无, 和声:主音, 空间:大厅→无限混响] · **44.0-44.5 完全静音 0.5s**（比之前更长），让 LOGO BOOM 更炸 |

---

## Step 5 — Suno / Udio AI 音乐 Prompts（双轨方案：器乐主轨 + 独立唱段）

**为什么双轨？** L3 唱段是 5 秒集体演唱，Suno 单次生成里让 vocals 只在特定 5s 出现基本不可能——它会漏音、错拍、假声跑到其他段。所以我们分开生成：

- **Track A**（器乐主轨 45s）：完全 instrumental，与之前一致，但在 0:36.5-0:41.5 段留出 "vocal window"（低密度器乐让位）
- **Track B**（人声 hook 5s）：只有五女声齐唱 hook，独立生成
- 后期把 Track B 混到 Track A 的 0:36.5 起始点，做 sidechain duck

### 策略 A · Track A · 器乐主轨全轨 prompt（45s, 无人声）

```
[Instrumental] [K-pop Trap Teaser] [World Fusion] [Ethnic Instruments]

A 45-second cinematic debut teaser instrumental for a five-nation K-pop 
girl group named PRISMA. F# minor. BPM 140. Trap production spine 
+ five national ethnic instruments taking turns on the same 4-bar motif.

Style: 808 sub bass + trap kick + triplet hi-hat rolls as the beat 
spine. Five ethnic solo instruments enter one by one, each playing 
the same core melody: guzheng (Chinese zither), gayageum (Korean 
zither), distorted 808 synth lead (US trap), khim (Thai hammered 
dulcimer with microtonal bend), sitar with tabla (Indian). Final drop: 
all five instruments play the motif in unison with orchestral brass 
hit and choir "ahh" pad. Cinematic K-pop teaser production. Inspired 
by BLACKPINK "Kill This Love" intro, ITZY "Cheshire" teaser, 
aespa "Savage" intro.

Exclude: lead vocals, singing lyrics, rap, spoken words, auto-tuned voice, 
generic pop chorus, EDM synth lead, big-room drop, acoustic piano, 
acoustic guitar, dubstep wobble, house four-on-floor, happy major key.

Structure:
[Intro 0-6s] Sub bass heartbeat 60Hz. Airy string drone. Glass crack 
at 5s. Silent 0.5s before beat drops. No BPM until drop.

[Section A · Guzheng 6-11s] BEAT DROP to 140 BPM trap. Guzheng plays 
descending F# minor motif over 808 sub. Ends with pitch bend.

[Section B · Gayageum 11-16s] Continue trap. Gayageum fast plucking 
of same motif. Janggu drum double-strike at start. Ends with sharp cutoff.

[Section C · 808 Lead 16-21s] 0.3s silence. Distorted 808 synth blasts 
riff version of motif. Trap snare rolls building. Air horn at 20s.

[Section D · Khim 21-26s] Thai khim plays motif with microtonal 
quarter-tone bend. Ching cymbals as accents. Tom fills at 25s.

[Section E · Sitar+Tabla 26-31s] Sitar plays motif with heavy meend 
slides. Tabla groove dha-dhin-dhin-dha. Long wordless "aah" sustain 
starts at 30s (choir texture, no lyrics).

[DROP 31-36s] All five ethnic instruments play the complete 4-bar 
motif in unison over trap drop. Orchestral brass hit at 36s. 
Choir "aah" pad underneath. 908 crash impact at 36s.

[Vocal Window 36.5-41.5s] MUSIC DUCKS 4dB and PULLS BACK. Only sub 
bass pulse, open cymbal wash, and long instrumental pad remain. 
No motif played by instruments during this window — leaving space for 
a separate vocal hook that will be layered in post. Zero foreground 
melody.

[Outro 41.5-44s] Instrumental pad sustains. White noise sweep rises. 
No new instruments enter. Fade to silence at 44s.

[Silence 44-44.5s] Absolute silence.

[Logo 44.5-45s] Single low sub bass BOOM. Long reverb tail. Cut.

Mood: mysterious, ignition, cultural fusion, cinematic, powerful, 
K-pop teaser, dark energy, instrumental only
```

### 策略 A · Track B · 人声 HOOK 独立 prompt（5s, 集体演唱）

```
[Vocal Only] [K-pop Girl Group Hook] [Cinematic Trailer Vocal]

A 5-second group vocal hook. Five female voices in unison singing 
the words "We are PRISMA". F# minor key. Tempo 140 BPM. Ascending 
heroic melodic shape, resolves on high F# with a 3-second sustain 
and a subtle vibrato tail.

Style: K-pop girl group unison lead (5 voices layered, chest voice, 
strong). One octave lower choir doubling adds weight. Zero backing 
instruments. Zero reverb at the vocal entry (dry, close-mic feel) 
building to hall reverb on the sustained final syllable. Group 
takes a sharp inhale 0.15 seconds before the first word — audible.

Melody: A (3rd) on "We", C# (5th) on "are", E (7th) on "PRIS", 
high F# (root, octave up) on "MA" sustained 3 seconds with slight 
vibrato and a downward slide back to mid F# at the very end.

Inspired by aespa "Savage" chorus power vocals, BLACKPINK "Kill This 
Love" group hook, girl group cinematic trailer vocals.

Exclude: male voices, rap, spoken word, auto-tune wobble, whispered 
vocals, ballad-style long vibrato, backing instruments, drums, bass, 
piano, guitar, orchestral arrangement, wordless "aah" only (we need 
the actual words "We are PRISMA"), soloist lead only (must be group 
unison).

Duration: 5 seconds exactly.
Mood: heroic, unified, declaration, arrival, powerful
```

### 策略 B · 分段生成（若策略 A Track A 不精准，切分段）

**Segment 1 — Intro (0-6s)：**（同前，无改动）

```
[Instrumental] [Cinematic] [Ambient Tension]

A 6-second cinematic intro. F# minor drone. 60Hz sub-bass heartbeat 
pulse. Airy high string pad. Zero rhythm. Glass shatter SFX at 5.5s. 
0.3s silence at end. Suspenseful buildup, no melody.

Exclude: drums, percussion, melody, chords, vocals, bright instruments, 
any pop production
```

**Segment 2 — Five Signatures (6-31s)：**（同前，无改动）

```
[Instrumental] [K-pop Trap] [World Fusion]

A 25-second K-pop trap teaser instrumental. F# minor. BPM 140. 
Trap production (808 + kick + hi-hat rolls) throughout. On top: 
guzheng plays melody for 5s, then gayageum for 5s, then distorted 
808 synth lead for 5s, then Thai khim for 5s, then sitar+tabla for 5s. 
Each 5-second segment plays the same 4-bar descending F# minor motif 
in a different instrument color. Ends on long wordless "aah" sustain.

Style: BLACKPINK Kill This Love intro meets aespa Savage. World-fusion 
K-pop teaser production.

Exclude: lead vocals, rap lyrics, singing words, western pop chorus, 
EDM drop, happy major sections, acoustic instruments, dubstep wobble
```

**Segment 3 — DROP + Vocal Window (31-41.5s)：**（改：不含人声，为 Track B 让位）

```
[Instrumental] [K-pop Drop] [Vocal Window]

A 10.5-second K-pop teaser drop with a vocal-space window. 
F# minor. BPM 140.

0-5s: Full trap drop — 808 + kick + hi-hat + all five ethnic 
instruments (guzheng, gayageum, khim, sitar, distorted 808 synth) 
playing the same F# minor motif in unison + orchestral brass hit 
at 5s + choir "aah" pad + 908 crash impact at 5s.

5-10.5s: MUSIC PULLS BACK 4dB. Only sub bass pulse + open cymbal 
wash + sustained instrumental pad. No motif played. No new melody. 
This 5.5-second window is intentionally sparse — a separate vocal 
hook will be layered on top in post.

Exclude: lead vocals, singing, lyrics, rap, motif played during the 
pullback window
```

**Segment 4 — Outro + Logo (41.5-45s)：**

```
[Instrumental] [Cinematic Outro]

A 3.5-second cinematic outro. F# minor. Sustained instrumental pad 
+ white noise sweep rising from 0.5s to 2.5s. Full silence at 2.5s-3s. 
Single low sub bass BOOM at 3s with long reverb tail. Cut.

Exclude: vocals, drums, melody, motif return, bright instruments
```

**Segment 5 — Vocal HOOK Only (5s, 独立):** 使用上面「Track B」的 prompt。

### 策略 B · 分段生成（更精细控制，共 3 段拼接）

**Segment 1 — Intro (0-6s)：**

```
[Instrumental] [Cinematic] [Ambient Tension]

A 6-second cinematic intro. F# minor drone. 60Hz sub-bass heartbeat 
pulse. Airy high string pad. Zero rhythm. Glass shatter SFX at 5.5s. 
0.3s silence at end. Suspenseful buildup, no melody.

Exclude: drums, percussion, melody, chords, vocals, bright instruments, 
any pop production
```

**Segment 2 — Five Signatures (6-31s)：**

```
[Instrumental] [K-pop Trap] [World Fusion]

A 25-second K-pop trap teaser instrumental. F# minor. BPM 140. 
Trap production (808 + kick + hi-hat rolls) throughout. On top: 
guzheng plays melody for 5s, then gayageum for 5s, then distorted 
808 synth lead for 5s, then Thai khim for 5s, then sitar+tabla for 5s. 
Each 5-second segment plays the same 4-bar descending F# minor motif 
in a different instrument color. Ends on long female "aah" sustain.

Style: BLACKPINK Kill This Love intro meets aespa Savage. World-fusion 
K-pop teaser production.

Exclude: vocals, rap, singing, western pop chorus, EDM drop, 
happy major sections, acoustic instruments, dubstep wobble
```

**Segment 3 — Drop + Logo (31-45s)：**

```
[Instrumental] [K-pop Drop] [Orchestral Hit]

A 14-second K-pop teaser drop finale. F# minor. BPM 140 rising 
to 155. Full trap drop: 808 + kick + hi-hat + orchestral brass 
stab + choir "ahh" pad + all five ethnic instruments (guzheng, 
gayageum, khim, sitar with tabla, distorted 808 synth) playing 
same 4-bar F# minor motif in unison. Big crescendo. Then 0.5s 
silence. Single low sub-bass BOOM impact at 12.5s of this segment. 
Instant fade to black. Powerful, cinematic, teaser climax.

Exclude: vocals, singing lyrics, happy resolution, major key 
modulation, gentle outro
```

**拼接方式：** Segment 1 尾 0.5s 静默 + Segment 2 开头（beat drop）自然衔接；Segment 2 尾女声 "aah" 与 Segment 3 首乐器齐进有 1s overlap，用 crossfade 0.5s 混合。

### 策略 C · 可灵音乐（中文 prompt）

```
[纯音乐] [K-pop 预告曲] [世界融合]

45秒五国女团出道预告片配乐。升F小调，BPM 140。Trap 底盘 
(808+军鼓+三连音踩镲) 贯穿。上层五国民族乐器依次演奏同一段主题：
中国古筝 6-11秒 → 韩国伽倻琴 11-16秒 → 美式失真 808 合成器 lead 
16-21秒 → 泰国扬琴 khim 带微分音 21-26秒 → 印度 sitar 配 tabla 
26-31秒。最后 31-38 秒 drop 段，五件乐器齐奏同一主题，加管乐 hit 
和 choir 铺底。44.5 秒单音低音 BOOM 结束。

风格参考：BLACKPINK "Kill This Love" intro、ITZY "Cheshire" 预告、
aespa "Savage" intro。

禁止：人声、歌词、说唱、EDM synth lead、原声钢琴、原声吉他、 
大调段落、迪士尼式管弦、autotune、普通流行副歌。

情绪：神秘 · 点火 · 集结 · 觉醒 · 声明
```

---

## Step 6 — SFX 时间轴总表

| # | 时间 | SFX 名称 | 描述 | 音量 | 建议来源 |
|---|---|---|---|---|---|
| 01 | 00:00 | Deep breath in | 深吸气（女声） | -6dB | Freesound: `female breath inhale` |
| 02 | 00:03 | Light beam hum | 高频光束嗡声 | -8dB | Splice: `sci-fi beam drone` |
| 03 | 00:05.5 | Glass shatter | 玻璃裂响（棱镜分光） | 0dB | Freesound: `glass crystal shatter` |
| 04 | 00:07.3 | Fan snap | 折扇张开脆响 | +2dB | Freesound: `folding fan snap` |
| 05 | 00:09.0-09.7 | Fabric+hair whoosh | 旋转时布料+发丝风声 | -2dB | Splice: `costume swoosh` |
| 06 | 00:10.5 | Sub-bass hit | 面镜头瞬间低频击 | 0dB | Splice: `cinematic sub impact` |
| 07 | 00:12.2 | Silk sleeve whip | 韩服丝绸袖甩 | +1dB | Freesound: `silk sleeve whoosh` |
| 08 | 00:13.5 | Back-bend land thud | 后弯膝盖落地闷响 | -3dB | Freesound: `body drop soft` |
| 09 | 00:14.3 | Snap-up hit | 弹起定格打点 | +1dB | Splice: `body movement hit` |
| 10 | 00:17.5 | Cap toss whoosh | 帽子抛空风声 | -1dB | Freesound: `cap throw` |
| 11 | 00:18.5 | Hand slap floor | Freeze 单手拍地重响 | 0dB | Freesound: `hand slap floor hard` |
| 12 | 00:20.0 | Air horn short | Trap air horn 0.4s | +2dB | Splice: `air horn short` |
| 13 | 00:21.5 | Thai ching hit | 泰式铙钹小击 | 0dB | Splice: `thai gamelan ching` |
| 14 | 00:23.5 | Aerial whoosh gold | 空中转体金属布料 | +1dB | Splice: `aerial spin whoosh` |
| 15 | 00:24.3 | Lunge land thud | 落地弓步沉响 | -2dB | Freesound: `foot stomp soft` |
| 16 | 00:25.0 | Double ching pop | pop-lock 双 ching | +1dB | Splice: `percussion ching double` |
| 17 | 00:26.5 | Veil silk slide | 面纱丝绸滑动 | -6dB | Freesound: `silk fabric slide` |
| 18 | 00:27.5 | Close breath | 极近吸气（kohl 眼特写） | -4dB | Freesound: `close breath inhale` |
| 19 | 00:28.5 | Araimandi land | 蹲姿落地闷响 | -1dB | Freesound: `crouch land` |
| 20 | 00:29.0-29.4 | Ankle bells chham | 脚铃双击（卡双跺） | +2dB | Freesound: `ghungroo ankle bells` |
| 21 | 00:30.0-31.0 | Female "aa" sustain | 女声长 aa 1秒 | -2dB | 可让 Suno 生成 vocal-only sample 或用 Freesound `vocal aah female` |
| 22 | 00:31-36 | Beams converge whoosh | 五道光合流"呜"渐强 | -4dB crescendo → 0dB | Splice: `cinematic build up whoosh` |
| 23 | 00:36.0 | Impact hit | 集体定格 908 crash + impact | +2dB | Splice: `orchestral hit + crash` |
| 24 | 00:36.7 | Vocal-in shimmer | 人声 hook 入点前 0.2s 铃响标记 | -3dB | Splice: `bright shimmer pre-drop` |
| 25 | 00:41.5 | White light "yao" | 五色融白光"耀"声（hook 尾声重合）| 0dB | Splice: `bright magical shimmer` |
| 26 | 00:42-44 | Sweep high | 高频扫过 white bloom | -2dB | Splice: `white noise sweep up` |
| 27 | 00:44.5 | Logo SLAM boom | 单音低 BOOM + 尾混响 | -1dB (peak) | Splice: `cinematic sub boom trailer` |

---

## Step 7 — 情绪关键转折点表

| # | 时间 | 事件 | 音乐动作 |
|---|---|---|---|
| 1 | 0:06.0 | Beat drop | 从心跳 → 140 BPM trap 硬切，无预告 |
| 2 | 0:16.0 | SKYE 出场 | 0.3s 音乐抽空 → 808 riff 硬切进入（唯一的 mid-piece 抽空） |
| 3 | 0:31.0 | Merge 开始 | 女声 "aa" 拉长 → choir 接管 → 全乐器汇入 |
| 4 | 0:36.0 | 集体定格 | 908 crash + orchestral hit，器乐能量峰 |
| 5 | 0:36.0-36.5 | Micro-silence | 0.5s 静默 → 为 hook 让位 |
| 6 | 0:36.5-41.5 | **SUNG HOOK** | 五女声齐唱 "We are PRIS-MA"，器乐 duck 4dB，人声接管前景 |
| 7 | 0:44.5 | LOGO SLAM | 单音 BOOM + 长尾混响，全片终结 |

---

## Step 8 — 交付说明

**给下一步（post-production）—— 双轨混合工作流：**

1. **Track A 器乐主轨**：用 Track A prompt 在 Suno 生成 3-5 版，挑一版 motif 清晰、drop 干净、0:36.5-0:41.5 vocal window 干净（无器乐 melody）的作为 mother
2. **Track B 人声 hook**：用 Track B prompt 独立生成 3-5 版，挑一版 5 秒长度准确、"We are PRISMA" 咬字清晰、齐唱够厚、"MA" sustain 稳定的
3. **拼装**（CapCut / Premiere / Reaper）：
   - Track A 铺在时间线 0:00-0:45
   - Track B 精准落在 0:36.5，crossfade in 0.1s，crossfade out 由 sustain 自然延展
   - Track A 在 0:36.5-0:41.5 段挂 sidechain compressor，被 Track B 触发 duck 4dB
4. **6 句母语呼喊层**：另外录制或 AI 生成 6 段独立音频（详见剧本），每句挂 0.4-0.6s duck window
5. SFX 用上表 27 条按时间码手动挂在时间线上
6. Mixing bus 顺序：Track A BGM (-6dB headroom) → Track B 人声 hook (-3dB peak) → SFX (variable) → Vocal calls (peak -3dB, sidechain BGM duck 3dB per line)
7. Final loudness target: **-14 LUFS**（YouTube/抖音上传标准）

**如果 Track B hook 生成不理想的备选方案：**
- 备选 1: 用 ElevenLabs 或 Suno Cover Song 功能，上传自己哼唱的 hook 作为 melody 引导
- 备选 2: 找真人配音（Fiverr K-pop 女声，通常 $20-50 per hook）
- 备选 3: 降到 L2 —— 改成"P-R-I-S-M-A"喊读团名 chant，喊读比唱好生成

**给下一步（shotlist-builder）：**
本 BGM 时间轴已经把所有关键卡点标出来了。分镜时**每一个 SFX 时间点 = 一个必卡的镜头动作时间点**——不要错开，否则声画错位。

**给下一步（seedance-2 视频 prompt）：**
生成阶段 prompt 里必须写 `无背景音乐、无配乐、无乐器声`，Seedance 只出干净视频，音频层在这里全部完成。
