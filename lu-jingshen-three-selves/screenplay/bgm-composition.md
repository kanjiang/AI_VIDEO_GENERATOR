# 《三个他，只许你知道》— 全季 BGM 配乐方案

> 本方案基于 `.claude/skills/bgm-scoring/SKILL.md` 方法论；配乐服务对白，不喧宾夺主。
>
> 弦乐优先（strings-first）；钢琴/八音盒/大提琴独奏仅作高光点缀。

## 使用范围

| 项 | 数值 |
|----|------|
| 总集数 | 40（Ep01–Ep40） |
| 单集片长 | 60–90 秒 · 9:16 竖屏 |
| 总时长 | 约 50–60 分钟成片 |
| Seedance 段数 | 190 段（Ep01 6 + Act1 44 + Act2 47 + Act3 50 + Act4 43） |
| 生成端约束 | Seedance 提示词已锁"无 BGM · 无配乐 · 无乐器声"；仅保留环境音与动作音效 |
| 本文件产出 | 后期音乐 / SFX 铺法 + AI 音乐工具提示词 + ffmpeg 混音脚本 |

---

## 1. 情绪弧线（全季 4 Act 全景）

```
Act 1（Ep01–Ep10）   Act 2（Ep11–Ep20）   Act 3（Ep21–Ep30）   Act 4（Ep31–Ep40）
私域低压 · 撞破真相    公开惊悚 · 累积压力    证据追杀 · Ep30 摊台   协作回暖 · Ep40 收官

密度  ▲          Ep20 climax        Ep30 climax       Ep38 我是我们
     │                ▲                  ▲                  ▲          Ep40 阳台
     │           ┌────┘             ┌────┘             ┌────┘
     │       ────                ───                ───              ▼
     │   ┌───                ┌───                ┌───              日落最后一缕光
     └───┘         ▲──▽──   ─┘        ─▲──▽── ─┘         ▲──▽──   ─
          Ep05 露台     Ep15 私抽屉       Ep24 兔子灯         Ep34 名字回收

▲ 上升   ▽ 释放   ─ 稳定   ○ 极低/静默
```

**四段声景锁：**

| Act | 集数 | 声景关键词 | 主调 | 基础 BPM | 主要乐器铺底 |
|-----|------|-----------|------|----------|-------------|
| Act 1 | Ep01–Ep10 | 私域低压 · 呼吸 · 门缝 · 心跳 | A minor | 60–66 | 低音大提琴长弓 + 环境呼吸声 |
| Act 2 | Ep11–Ep20 | 公开惊悚 · 时钟 · 弦乐低鸣 | C minor | 66–72 | 弦乐组低音 tremolo + 时钟秒针 |
| Act 3 | Ep21–Ep30 | 证据追杀 · 大鼓 · 断续弦乐 | E minor | 72–96 | 定音鼓 + 断续小提琴急弓 |
| Act 4 | Ep31–Ep40 | 协作回暖 · Ep40 大提琴 + 城市风 | G major → C major | 60 → 48 | 大提琴独奏 + 城市夜风 + 单音钢琴 |

---

## 2. 全局音频身份

| 参数 | 决策 |
|------|------|
| **主调** | A minor（Act 1 主色，临床沉重）→ C minor（Act 2 公开压迫）→ E minor（Act 3 追杀）→ G major → **C major**（Ep40 终局） |
| **调性变化触发点** | Ep16 首用公开清账色卡 · Ep21 证据链启动 · Ep34 阳光落进旧儿童房 · Ep38 松袖扣「我有 DID」 · Ep40 阳台终章 |
| **基础 BPM** | 60–66 私域 · 72 公开 · 96 追杀 · 48 终局 |
| **核心底层（strings-first）** | 低音大提琴 + 中提琴 tremolo（Act 1–3 通铺 80%）· 大提琴独奏（Act 4 提亮 40%） |
| **高光点缀（不作铺底）** | 单音钢琴（人格切换三拍音）· 八音盒（小小/小景专属）· 单音竖琴泛音（沈星野观察者位）· 时钟秒针（Act 2 累积）· 定音鼓 hit（Act 3 证据落定） |
| **人声/环境** | 门缝换气、雨声、走廊回响、城市远景夜风；对白密集段音乐退至 -18 dB 以下 |
| **禁用** | EDM drop · 电吉他 riff · 大合唱 · 现代流行和弦进行 · 甜宠糖水弦乐 · 任何管风琴 · 任何东方仙侠竹笛/古筝 |
| **对白让位规则** | 沈星野旁白段 = 极低频弦乐 pad（60–200 Hz）；三人格对白段 = 全静默 + 环境音 + 单点 SFX |

---

## 3. 核心动机设计（4 声部 + 1 融合主题）

三人格 + 沈星野 = **4 声部对话主题**。每个人格有独立动机；Ep38 起 4 声部融合为终章主题。

### 3.1 本尊主题（"陆景深" — 大提琴克制版）

```
调性：A minor  ·  BPM 66  ·  4/4 拍  ·  大提琴独奏
| 6̣  -  1  - | 3  -  2  1 | 6̣  -  -  - | -  -  -  - |
  la     do    mi   re do   la

4 小节，约 15 秒。第 3-4 小节留白 6 秒——本尊人格的核心是"不出声"。
用途：Ep01–Ep40 全集本尊段基调；Ep30 股东大会开场 · Ep38A 松袖扣 · Ep40F 阳台。
```

### 3.2 夜主题（"护卫人格" — 低音大提琴 + col legno）

```
调性：A minor  ·  BPM 96  ·  4/4 拍  ·  低音大提琴主奏 + 小提琴 col legno（弓杆敲弦）打节拍
| 6̣  6̣  6̣  - | 5̣  -  6̣  - | 6̣  6̣  6̣  - | 5̣  -  -  - |

4 小节，约 10 秒。前 3 小节重音急促——护卫警戒；第 4 小节骤停——刀退场。
用途：Ep03/09/13/16/17/22/25/29/33/35 夜出场段；Ep35C 挡电话时的 col legno 节拍减弱到消失（对应"防身刀退场"）。
```

### 3.3 小小/小景主题（"幼态人格" — 八音盒）

```
调性：F major  ·  BPM 60  ·  3/4 拍  ·  八音盒（music box）
| 5  3  1 | 2  -  - | 5  3  2 | 1  -  - |

4 小节，约 12 秒。3/4 圆舞曲——幼态特征；第 4 小节单音停留——"她一个人"。
用途：Ep02/04/06/10/14/18/24/28/31/34 前段小小；Ep34C 起转为 Ep34/37/38/39/40 小景变体（音色由八音盒→木琴 marimba，象征"她长大了但仍是她"）。
Ep40E 小景第一次真睡：八音盒动机走一遍完整 8 小节 + 极慢速 BPM 48 + 兔子灯的橙光滤镜。
```

### 3.4 沈星野主题（"观察者" — 单音竖琴 + 中提琴）

```
调性：D minor（Act 1–3）→ G major（Act 4）  ·  BPM 72  ·  4/4 拍
| 2  -  -  - | 1  2  3  - | 5  -  3  - | 2  -  -  - |
竖琴泛音撒点；中提琴走旋律。

4 小节，约 13 秒。旋律走 la 到 mi——观察者带着克制的接近。
用途：Ep01E "你袖扣没扣→你不是他" · Ep06 病房问诊 · Ep11 私域甜入住 · Ep25 上台作证 · Ep40B "只是沈星野·每一天的重新选择"。
```

### 3.5 融合终章主题（"我是我们" — 4 声部齐奏 · 仅 Ep38/Ep40）

```
调性：C major  ·  BPM 48  ·  4/4 拍  ·  大提琴 + 低音大提琴 + 八音盒 + 中提琴 + 单音钢琴

大提琴（本尊）：       | 1  -  3  - | 5  -  3  - | 2  -  1  - | 1  -  -  - |
低音大提琴（夜）：      | 1̣  -  -  - | 1̣  -  -  - | 5̣  -  -  - | 1̣  -  -  - |
八音盒（小景）：        | 5  -  1̇  - | 5  -  3  - | 2  -  1  - | 1  -  -  - |
中提琴（沈星野）：      | 3  -  2  - | 1  -  7̣  - | 5̣  -  1  - | 1  -  -  - |

4 小节，约 20 秒。4 声部第一次同时进入——**Ep38 首次公开合法三人格同框 + 沈星野在外圈**。
Ep40F 阳台终章：只用大提琴 + 中提琴走前两小节（"本尊 + 沈"），八音盒和低音大提琴退至泛音——"夜不在场，但在。小景睡着了，但在。"
```

---

## 4. 关键 SFX 音效清单

### 4.1 人格切换三拍音（Rule 13 视觉硬锁的音频对齐）

| 拍 | 视觉动作 | SFX 音效 | 时长 | 频率 |
|----|---------|---------|------|------|
| 拍1 · 微症状 | 呼吸变形、瞳孔骤缩 | 单声吸气（放大 3 倍） + 极低频心跳 60 Hz | 0.8s | 环境 -12dB |
| 拍2 · 道具动 | 袖扣松/发绳/火机/防身刀 | 织物摩擦 + 金属轻碰（袖扣）或橡皮筋轻响（发绳）或打火机滑轮 | 0.5s | -6dB pointed |
| 拍3 · 新人格接管 | 姿态换、语气切 | 单音钢琴 A2 单击（本尊）/ 大提琴短拨（夜）/ 八音盒起始音（小小/小景） | 0.3s | -3dB accent |

**Total switching SFX**：Act 1 5 次 · Act 2 8 次 · Act 3 12 次 · Act 4 8 次（Ep38 3 次串联切换需连续 3 次三拍音）。

### 4.2 五重证据链音效锁（Ep22–Ep30）

| 证据 | 首次亮相集 | 关键 SFX |
|------|-----------|---------|
| ① 密码卡 | Ep22 | 卡片摩擦 + 键盘"哒"1 声 + 单音大提琴拨弦 |
| ② 兔子灯 + 维修单 | Ep24 | 灯开关"咔"1 声 + 纸张翻动 + 八音盒 3 音 |
| ③ 周姨匿名证词 | Ep25 | 录音笔"叮"启动音 + 老年女声轻叹 |
| ④ 病历原件 vs 替换 | Ep27 | 双份档案落桌"啪-啪" + 静默 2s + 低音大提琴单音 |
| ⑤ 陆母亲口录音 | Ep29→Ep30 | 磁带底噪 + 录音笔金属按键 + 全场静默 4s → 陆母声出 |

### 4.3 Ep40 终局三仪式 SFX

| 仪式 | 视觉 | SFX |
|------|------|-----|
| 40D 夜刀入抽屉不锁 | 抽屉推入 → 手停 → 不落锁 | 刀入抽屉"咚" · 手离开的织物声 · **静默 4s**（"不锁"）· 长呼吸出 |
| 40E 小景第一次真睡 | 门虚掩 · 兔子灯常亮 · 沈门外 | 八音盒完整 8 小节走完 · 极弱呼吸声（睡熟）· 灯泡电流"嗡" |
| 40F 阳台终章 | 陆景深 + 沈星野并肩看夜景 | 大提琴 + 中提琴 4 小节融合主题 · 城市远景风声 · **无对白外任何点缀** · 结尾 3s 完全静默 |

---

## 5. 每 Act 声景分工详案

### Act 1（Ep01–Ep10）· 私域低压

| 集 | 情绪任务 | 主动机 | 铺底 | 高光 |
|----|---------|--------|------|------|
| Ep01 | 撞破切换 · 观察者接近 | 本尊 → 夜 → 沈 三主题 15s 内依次登场 | 环境呼吸 + 门缝雨声 + 60Hz 心跳 | 01E 沈主题 4 小节完整（首次） |
| Ep02 | 病房问诊 | 沈主题 + 本尊主题穿插 | 极低频弦乐 pad | 单音竖琴泛音（沈观察时） |
| Ep03 | 夜首次亮相 | 夜主题 col legno 首用 | 低音大提琴长弓 | 打火机滑轮 SFX |
| Ep04 | 小小首出 | 小小主题 3/4 圆舞曲 | 八音盒单音撒点 | 发绳 SFX（拍2）+ 八音盒起始（拍3）|
| Ep05 | 露台夜 | 本尊主题 + 沈主题对位 | 城市远景风声 | 全静默 3s（对望时）|
| Ep06 | 病房再次问诊 | 沈主题 + 小小主题穿插 | 医院环境音（脚步、推车） | 八音盒 3 音 |
| Ep07 | 书房独处 | 本尊主题独奏 | 大提琴长弓 | — |
| Ep08 | 陆母首出 · 家族族亲 | 陆母主题 = **弱化半音下行**（无独立主题——她压抑他人的动机） | 弦乐低音持续音 | 时钟秒针 SFX 埋伏 |
| Ep09 | 夜再次警戒 | 夜主题 col legno 加密 | 低音大提琴 tremolo | 打火机 SFX |
| Ep10 | 三人格同集协作首次（非同框）| 本尊+夜+小小主题**依次接力**（不同时） | 低音弦乐持续音 | 三段各 5s 单主题 |

### Act 2（Ep11–Ep20）· 公开惊悚

- Ep11–Ep15：私域日常甜 + 时钟秒针 SFX 逐集加密（Ep11=每分钟一响，Ep15=每 15 秒一响）
- Ep16 首次进入董事会：**C minor 调性切换**；弦乐组低音 tremolo 全面接管
- Ep17 董事会答辩：定音鼓每 4 拍一击（心跳外化）
- Ep18 家族逼婚：陆母的半音下行主题首次完整出现（12s）
- Ep19 后花园：沈主题短暂回 D minor 私域调
- **Ep20 climax**（Act 2 高潮 6 段）：
  - 20A：董事会开场 —— 弦乐 tremolo + 定音鼓 60 Hz
  - 20B：小小误现场 —— 八音盒突然扎入公开场（音色错位感）
  - 20C：夜切换 —— col legno 全爆
  - 20D：**三人格公开危机** —— 4 声部主题**不融合**，而是**冲突**（不同调、不同 BPM）
  - 20E：沈救场 —— 沈主题独奏
  - 20F：cliffhanger 6 小时倒计时 —— 时钟秒针 SFX 拉满 + 静默

### Act 3（Ep21–Ep30）· 证据追杀

- Ep21–Ep25：五重证据链前 3 证 —— 每证亮相时 **专属 SFX + 单音大提琴 low F 落定**
- Ep22 密码卡：磁性拉门 SFX + 单音大提琴 F2
- Ep24 兔子灯 + 维修单：色卡切 `创伤回潮`；BGM 用 **八音盒 + 极低频弦乐 pad** 交替（幼态记忆 vs 成年调查）
- Ep25 周姨证词：录音笔叮 + 老年女声轻叹 SFX
- Ep27 病历双证：档案落桌"啪-啪"+ 静默 2s + 大提琴单音
- Ep29 陆母录音获得：磁带底噪首次出现
- **Ep30 climax**（Act 3 高潮 6 段股东大会）：
  - 30A：主厅开场 —— 定音鼓 + 弦乐组齐奏
  - 30B：本尊自证"我是 DID 患者" —— **全静默 4s** + 单音钢琴 A2
  - 30C：五证顺序开 —— 每证一个专属 SFX（依 Ep22/24/25/27/29 SFX 顺序）
  - 30D：周姨实名 —— 老年女声轻叹 + 弦乐低音持续
  - 30E：陆母录音全场 —— **全场静默 6s** → 录音出 → 定音鼓收
  - 30F：陆母"我 20 年错了" —— 陆母半音下行主题**首次崩塌**（下行到底后静默）

### Act 4（Ep31–Ep40）· 协作回暖

- Ep31–Ep33：三人格协作首集 · 夜出击 —— 4 主题**开始交替接力**（不冲突）
- Ep34 名字回收：34A/34B `创伤回潮` 色卡 + 八音盒变奏调压；34C 阳光落进后 —— **调性转 G major**，八音盒 → 木琴（marimba）音色切换（"小小 → 小景"的听觉标签）
- Ep35 夜先收刀：Ep35C 挡电话时 col legno 节拍**逐渐减弱到消失**（防身刀退场的音频对齐）
- Ep36 继承战打脸 · 后花园手心相扣：本尊 + 沈两主题**首次对位融合**（不齐奏，但和声上互补）
- Ep37 陆母三层作证 + 小小让陆母重复"让他怕一次"：陆母主题**彻底崩塌**（半音下行走到极低频）
- **Ep38 climax**（Act 4 高潮 4 段）：
  - 38A：松袖扣"我有 DID" —— **本尊主题回归 C major** + 大提琴单奏
  - 38B：夜收刀宣言 —— 夜主题**从 col legno 转为 arco**（弓毛正常拉奏，象征"从威胁到守护"）
  - 38C：小景"不是我的错" —— 八音盒完整 8 小节 + 全场静默
  - 38D：**融合终章主题首次登场**（4 声部齐奏 4 小节）
- Ep39 灯没有再灭：小景主题（现为木琴）+ 兔子灯环境音（灯泡"嗡"）
- **Ep40 finale**（终局 6 段）：
  - 40A：发布会承认沈星野 —— 沈主题 G major 完整版
  - 40B：只是沈星野·每一天的重新选择 —— 沈主题 + 大提琴对位
  - 40C：新家族委员会·我们都有灯 —— 大提琴 + 中提琴宽松和声
  - 40D：夜收刀不锁 —— **静默 4s** + 长呼吸
  - 40E：小景第一次真睡 —— 八音盒完整 8 小节 · BPM 48
  - 40F：阳台"带着他们活/每一天的重新选择" —— 融合终章主题**只取前两小节**（本尊 + 沈）· 城市风 · 最后 3s **完全静默**

---

## 6. AI 音乐工具提示词（Suno / Udio / 可灵音乐）

⚠️ AI 生成器倾向"完整歌曲"；本剧 BGM 必须**结构松散、留白多、可被对白覆盖**。所有提示词均需要加 `no vocals, sparse, film score, ambient bed` 类抑制词。

### 6.1 本尊主题 · 大提琴克制版（Act 1–Ep38A）
```
Prompt: Solo cello, A minor, 66 BPM, sparse film score, single sustained notes with 4-6 seconds of silence between phrases, no vocals, no drums, no piano, no strings ensemble. Emotional keyword: restraint, unspoken duty. Structure: 4-bar theme then 6 seconds silence. Length: 30 seconds loop-friendly. Instrument texture: warm cello, no vibrato in low register, minimal vibrato in mid register.
Negative: pop chord progression, EDM, vocals, drums, orchestral swell, catchy melody.
```

### 6.2 夜主题 · 低音大提琴 + col legno（Act 1 出场→Ep35C 收刀）
```
Prompt: Double bass with staccato col legno violin percussion, A minor, 96 BPM, tense film score bed, no melody in traditional sense—rhythmic ostinato only, no vocals, no drums (col legno replaces drums), no piano. Emotional keyword: guarded threat, protective violence contained. Structure: 3-bar ostinato + 1-bar sudden stop. Length: 20 seconds. Fade out variant needed for Ep35C where col legno gradually thins to silence.
Negative: melody, chord progression, warm strings, uplifting, resolved cadence.
```

### 6.3 小小/小景主题 · 八音盒 → 木琴切换（Act 1–Ep34C 切换）
```
Prompt A (小小 · 八音盒版): Music box solo, F major, 60 BPM, 3/4 waltz time, single voice melody with wide pauses, no percussion, no strings, no vocals. Emotional keyword: fragile childhood, alone. Length: 24 seconds.
Prompt B (小景 · 木琴 marimba 版, Ep34C 阳光落进后): Solo marimba, F major → G major modulation at bar 5, 60 BPM, 3/4 waltz time, same melodic contour as music box version but warmer wooden timbre, no percussion, no strings, no vocals. Emotional keyword: reclaimed name, gentle strength. Length: 24 seconds.
Negative: strings ensemble, piano bed, EDM, chorus, drums.
```

### 6.4 沈星野主题 · 单音竖琴 + 中提琴（Act 1 观察者→Act 4 回暖）
```
Prompt: Solo viola + sparse harp harmonics, D minor (Act 1-3) or G major (Act 4), 72 BPM, film score bed for dialogue-heavy scenes, viola plays 4-bar melody, harp adds single harmonic notes every 2 seconds, no vocals, no drums, no piano bed. Emotional keyword: careful approach, professional restraint. Length: 26 seconds loop-friendly.
Negative: strings ensemble, orchestral swell, resolved major chord ending, uplifting.
```

### 6.5 融合终章 · 4 声部齐奏（Ep38D + Ep40F）
```
Prompt: 4-voice ensemble - cello + double bass + music box + viola, C major, 48 BPM, 4/4 time, sparse film score climax, all 4 voices enter simultaneously for the first time and play a 4-bar chorale, no drums, no piano, no vocals, deliberate silence between phrases. Emotional keyword: not fusion but recognition - "I am us". Length: 20 seconds. End on unresolved suspension → 3 seconds silence.
Negative: symphonic full orchestra, EDM, chorus, drums, resolved cadence, uplifting climax.
```

### 6.6 陆母主题 · 半音下行（Act 1 埋伏→Ep37 崩塌）
```
Prompt: Solo bass clarinet OR muted low strings, A minor, chromatic descending line, 60 BPM, dark film score bed, single voice melody descending by semitones every 2 bars, no percussion, no drums, no vocals. Emotional keyword: control disguised as protection. Length: 30 seconds. Ep37 version: extend chromatic descent to the lowest register then break off into silence (total collapse of the motif).
Negative: warm strings, uplifting, resolved, major key, catchy melody, EDM.
```

---

## 7. ffmpeg 混音示例脚本

假设已生成 4 层音频：`dialogue.wav`（对白 · Seedance 输出的环境音+对白）· `bgm.wav`（BGM 层） · `sfx.wav`（SFX 层） · `ambient.wav`（额外环境层，如城市风/雨声）。

### 7.1 单集混音（Ep01 示例）
```bash
ffmpeg -i ep01_dialogue.wav -i ep01_bgm.wav -i ep01_sfx.wav -i ep01_ambient.wav \
  -filter_complex "\
    [0:a]volume=0dB,acompressor=threshold=-18dB:ratio=3:attack=5:release=200[dial]; \
    [1:a]volume=-18dB,sidechaincompress=threshold=-24dB:ratio=6:attack=10:release=300:makeup=0[bgm]; \
    [2:a]volume=-6dB[sfx]; \
    [3:a]volume=-24dB[amb]; \
    [dial][bgm]sidechaincompress=threshold=-24dB:ratio=6:attack=10:release=300:makeup=0[bgm_ducked]; \
    [dial][bgm_ducked][sfx][amb]amix=inputs=4:duration=first:dropout_transition=0:normalize=0[out]" \
  -map "[out]" -c:a aac -b:a 192k ep01_final.wav
```

**关键：** `sidechaincompress` 让 BGM 在对白出现时自动 duck 到 -24dB 以下，对白清晰。

### 7.2 Ep38D + Ep40F 融合终章特殊处理
```bash
# Ep38D: 4 声部融合首次 - BGM 抬高到 -12dB (关键情绪时刻，允许压过对白)
# Ep40F: 只用大提琴+中提琴前两小节 + 结尾 3s 完全静默
ffmpeg -i ep40f_dialogue.wav -i ep40f_bgm_finale.wav -i ep40f_wind.wav \
  -filter_complex "\
    [1:a]volume=-12dB,afade=t=out:st=17:d=3[bgm_end]; \
    [2:a]volume=-30dB[wind_bed]; \
    [0:a][bgm_end][wind_bed]amix=inputs=3:duration=first[out]" \
  -map "[out]" -c:a aac -b:a 192k ep40f_final.wav
```

---

## 8. 交付清单

| 交付物 | 格式 | 数量 | 说明 |
|--------|------|------|------|
| 主动机 stem 库 | .wav 48kHz 24bit | 5 个（本尊/夜/小小/小景/沈/融合） | AI 音乐生成 + 后期剪裁 |
| Act 分层 BGM bed | .wav | 4 个（Act1/2/3/4） | 每 Act 长约 6–8 分钟 loop-friendly |
| 关键集专属配乐 | .wav | 5 集（Ep01/Ep20/Ep30/Ep38/Ep40） | 与视频段严格帧对齐 |
| 人格切换三拍 SFX | .wav | 3 层（吸气+织物+单音） | 复用 33 次 |
| 五重证据链 SFX | .wav | 5 组 | Ep22/24/25/27/29-30 |
| Ep40 终局三仪式 SFX | .wav | 3 组 | 40D/40E/40F |
| 全季 ffmpeg 混音脚本 | .sh / .bat | 40 集 | 单集一份 |
| 交付母带 | .wav 48kHz 24bit + .mp3 320kbps | 40 集成片音轨 | -14 LUFS 归一化 |

---

## 9. QA 音频验收硬门（与 production-schedule §10 QA Gates 对齐）

| Gate | 音频验收项 |
|------|-----------|
| G1 · Week 1 | Ep01 6 段：本尊/夜/沈 3 主题 stem 通过；01E 沈主题首次完整 4 小节情感落地 |
| G2 · Act1 出片 Week 3 | 三人格切换三拍 SFX 稳定；八音盒/大提琴/低音大提琴音色识别度 ≥ 90% |
| G3 · Ep20 climax | 20D 4 声部**冲突**（非融合）能被听感区分 |
| G4 · Ep30 climax | 五证 SFX 顺序无错位；陆母半音下行主题在 30F 崩塌情感落地 |
| G5 · Ep38 同框 | 38D 融合终章 4 声部首次齐奏"我是我们"情感落地 |
| G6 · Ep40 finale | 40D 静默 4s（不锁）· 40E 八音盒完整 8 小节 · 40F 结尾 3s 完全静默 三处硬锁通过 |
| G7 · 全季交付 | 40 集成片 -14 LUFS 归一化通过；对白清晰度 ≥ 4/5 主观打分 |

---

## 10. 依赖 / 阻塞项

- ✅ 输入依赖：190 段 Seedance 视频（已完成）· `production-schedule.md`（10 周档期，已完成）
- ✅ 生成端约束已锁：Seedance 提示词已包含"无 BGM · 无配乐 · 无乐器声"
- ⏳ 待启动：AI 音乐工具（Suno v4.5+ / Udio v1.5+ / 可灵音乐）批次生成
- ⏳ 待启动：ffmpeg 混音管线本地化配置（假设跨平台 macOS/Windows）
- ⚠️ 关键风险：
  - **AI 音乐"完整歌曲"倾向** — 每条 prompt 都需要显式 `sparse, no vocals, film score bed` 抑制
  - **八音盒 → 木琴音色切换（Ep34C）** — 需在 AI 生成 2 条独立 stem 后手动剪辑对齐"我叫小景"落地帧
  - **Ep38D 融合终章 4 声部齐奏** — 建议手工在 DAW 中分层录制而非依赖 AI 单条生成
  - **Ep40F 结尾 3s 完全静默** — ffmpeg 需精确控制 fade-out 到 -60dB，不留任何残响