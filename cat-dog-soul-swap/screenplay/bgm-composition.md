# 《换了个毛》— BGM主题曲配乐方案

> 本方案使用 `bgm-scoring` skill 方法论生成。Skill 路径：`.claude/skills/bgm-scoring/SKILL.md`

## 总体设定

| 项目 | 参数 |
|------|------|
| 总时长 | ~135秒（约2分15秒短预告片） |
| 调性 | G大调（温暖日常），情感转折处转Em小调（心酸），终场回G大调 |
| 基础BPM | 92（中速，匹配写实电影节奏，不急不缓） |
| 核心音色 | 钢琴（温暖的立式钢琴音色，非三角钢琴——要"家"的质感） |
| 辅助音色 | 拨弦吉他(pizzicato)、大提琴独奏、木琴(marimba)、口哨、弦乐四重奏 |
| 情绪关键词 | 温暖、日常、幽默、心酸、陪伴 |
| 禁止 | 电子合成器、鼓机、EDM、摇滚吉他、交响乐全奏、管弦乐"大片感"编曲、任何魔幻/奇幻音效 |

---

## 核心主题旋律（"两个世界"钢琴主题）

### 设计理念

主题旋律由两个声部对话构成——高音区代表年糕（猫），低音区代表大福（狗）。一开始各走各的节奏，到终场合为一条线。这个结构本身就是故事的缩影。

```
主旋律 A（明亮版 · 用于日常/温暖段）
BPM=92  4/4拍  G大调  立式钢琴

高音声部（年糕·猫）：
| 5  -  3  - | 2  1  2  3 | 5  -  3  - | 2 · 1  -  - |

低音声部（大福·狗）：
| 1  1  5̣  5̣ | 1  1  5̣  5̣ | 1  1  5̣  5̣ | 1 · 5̣  -  - |

（8小节，约21秒。高音走得慢而克制——像猫走路；低音稳定重复——像狗摇尾巴的节奏。两个声部和声上互补，但节奏上各自独立。）
```

```
主旋律 B（柔情版 · 用于情感/心酸段）
BPM=72（减速）  Em小调  大提琴独奏 + 钢琴伴奏

大提琴：
| 3  -  2  1 | 7̣  -  6̣  - | 1  2  3  5 | 3 · -  -  - |
| 3  -  2  1 | 7̣  -  6̣  - | 5  3  2  1 | 1 · -  -  - |

钢琴（极简和弦铺底）：
| Em    | C     | Am    | B7    |
| Em    | C     | Am  B7| Em    |

（8小节，约27秒。大提琴走旋律——温暖但有重量，像一个人在犹豫要不要伸出手。钢琴只做和弦支撑，每小节一个和弦，留大量空间给呼吸。）
```

```
主旋律 C（俏皮版 · 用于喜剧/蒙太奇段）
BPM=112（加速）  G大调  木琴(marimba) + 拨弦吉他

木琴：
| 1 3 5 1̇ | 5 3 1 5̣ | 6 1̇ 3̇ 1̇ | 5 · 3  -  |
| 1 3 5 1̇ | 5 3 1 5̣ | 2 4 6 4 | 5 · 1  -  |

拨弦吉他节奏（"咚-哒-咚-哒"）：
| × ○ × ○ | × ○ × ○ |（×=拨低音弦，○=拍琴面）

（4小节循环，约9秒一轮。主旋律A骨干音的快速变奏，节奏翻倍，木琴颗粒感带来"笨手笨脚"的喜感。）
```

```
主旋律 D（收束版 · 用于终场）
BPM=60（极慢）  G大调  纯钢琴独奏

右手：
| 5 · -  -  - | 3 · -  -  - | 2  1  -  - | 1 · -  -  - |

左手：
| 1 · -  5̣ · - | 1 · -  5̣ · - | 1 · -  5̣ · - | 1 · -  -  - |

（4小节，约16秒。主旋律A高音声部和低音声部的骨干音终于融合在一起——猫和狗的旋律不再分离，而是交织为一条线。音符之间大量留白，像日落时分窗台上最后一缕光。）
```

---

## 配乐情绪曲线图

```
音量/密度
  ▲
  │                   ╭──╮04A蒙太奇
  │              ╭──╮╭╯    ╰╮                    ╭──╮07逃亡
  │    ╭──╮02AB╭╯   ╰╯      ╰╮05破冰    ╭──╮06╭╯    ╰╮
  │╭──╯01  ╰╯                  ╰──────╯    ╰╯      ╰╮08
  │╯                                                    ╰──
  ┼────────────────────────────────────────────────────────── 时间▶
  0  15  25  35  45  55  65  75  85  95  105  115  125  135s

BPM
  ▲
120│                ╱╲ 04A蒙太奇                    ╱╲ 07逃亡
100│───╮02╭╮    ╭╯  ╰╮                          ╭╯  ╰╮
 92│    ╰╯  ╰──╯     ╰──╮05                  ╭─╯     ╰╮08
 72│                       ╰──╮06心酸    ╭──╯          ╰╮
 60│                            ╰──────╯                 ╰──
  ┼────────────────────────────────────────────────────────── 时间▶
```

---

## 逐段编曲详解

### Prompt 01 — 两个世界（0:00 - 0:15）

| 层 | 内容 |
|---|---|
| 过渡 | 无（全片开场）。前0.5秒静默，然后第一个钢琴音落下。 |
| 音乐 | **主旋律A明亮版**完整8小节。立式钢琴独奏开头4小节（高音声部·年糕），第5小节加入拨弦吉他低音（大福的节奏感出现），形成两声部对话。最后2小节木琴轻轻加入双音叠加。 |
| 节奏 | BPM=92，稳定四四拍。年糕窗台镜头节奏极缓，大福出门镜头时底鼓轻轻进入一拍一"哒"。 |
| 音效 | 年糕段：猫爪轻碰笔筒"叮"一声（与钢琴某个音重合）。大福段：牵绳绷紧"嘎"声、网球落地"咚"。 |
| 情绪 | "这是两个完全不同的世界，但同样温暖。" |
| 技法 | 两个声部在音域上形成对比但和声上和谐——暗示两只动物还不知道彼此存在，但注定相遇。 |

---

### Prompt 02A — 诊所意外·惊恐逃出（0:15 - 0:25）

| 层 | 内容 |
|---|---|
| 过渡 | 主旋律A最后一个和弦悬停不解决（G→D7挂留）。画面跳切的瞬间，音乐停顿0.5秒。 |
| 音乐 | **无旋律**。只有钢琴低音区不规则的短促和弦——像心跳加速。间距从每2秒一次缩短到每0.5秒一次。 |
| 节奏 | BPM从92逐渐推向110。不用鼓，用钢琴低音区的击弦做节奏感。 |
| 音效 | 猫爪刮塑料声渐强、航空箱沉闷碰击声×3递进、箱体砸地闷响、卡扣弹开"咔-啪"、猫嘶叫尖锐短促。 |
| 情绪 | "安静被打破了。有什么不对。" |
| 技法 | **音乐抽空**技法——环境从安静候诊室到混乱的转变，音乐不是变大而是变得不稳定（不规则间距+不协和音程）。 |

---

### Prompt 02B — 诊所意外·白雾降临（0:25 - 0:35）

| 层 | 内容 |
|---|---|
| 过渡 | 02A结尾心跳声加速到最密时——突然全部消失。0.3秒绝对静默。 |
| 音乐 | 架子倒后：**无音乐**，纯音效。白雾弥漫开始后：单一钢琴泛音（G5极高音区，pp极弱），持续不动，像空气凝固。两只动物倒下时这个音缓慢消失。 |
| 节奏 | 无拍感。时间在这里停滞。 |
| 音效 | 金属架倒塌声（巨大→回音）、气瓶撞地金属刮擦、阀门弹开气体喷射声（先尖锐后持续嘶嘶）、苏敏喊声"年糕！！"、老陈喊声"大福！大福！！"、模糊远场男声。最后——所有声音同时消失，只剩嘶嘶声渐弱到无。 |
| 情绪 | "世界停了。" |
| 技法 | **绝对静默→单音悬浮**——这是全片唯一的超现实音效时刻。一个孤立的泛音暗示灵魂正在发生某种变化，但不做任何魔幻音效渲染。 |

---

### Prompt 03A — 醒来·苏敏公寓线（0:35 - 0:45）

| 层 | 内容 |
|---|---|
| 过渡 | 02B结尾的嘶嘶声完全消失后，0.5秒静默。然后木琴一个跳音"叮"——像闹钟。 |
| 音乐 | **主旋律C俏皮版**进入。木琴为主奏。但只用前2小节，然后故意在大福（猫身）趴平的那一刻旋律"卡住"——重复同一个音3次（卡带效果），暗示身体卡壳。 |
| 节奏 | BPM=112，轻快但有顿挫。大福想冲向苏敏但猫身急刹时，拨弦吉他有一个急停的"噗"。 |
| 音效 | 猫爪拍地板"啪"、猫身急刹四肢撑开时的轻微摩擦声、怪猫嚎（音调先高后低）。 |
| 情绪 | "哈哈哈他被困住了——等等，他好可怜。" |
| 技法 | **卡带效果**——旋律在"出错"的那一刻重复卡住，音乐本身模仿了"身体不听使唤"的感觉。怪猫嚎时配乐短暂停顿1秒让嚎叫声独占空间。 |

---

### Prompt 03B — 醒来·老陈家线（0:45 - 0:55）

| 层 | 内容 |
|---|---|
| 过渡 | 03A木琴旋律的最后一个音自然过渡，音色从木琴滑到拨弦吉他。 |
| 音乐 | **主旋律C俏皮版**后2小节，拨弦吉他主奏。年糕（狗身）踩尾巴时旋律也跟着"转圈"——同一个乐句重复但每次高半音，制造"越努力越混乱"的喜感。 |
| 节奏 | BPM=112保持，但年糕看到水中倒影"定住"那3秒，节奏突然消失，只留一个低音弦"嗡——"。 |
| 音效 | 水碗微微晃动的水声、尾巴摇摆的轻微"呼呼"风声、老陈膝盖"咔嗒"、金毛犬身体僵硬后自动坐下时的"咚"（屁股着地）。 |
| 情绪 | "他恨透了这个身体——但这个身体有自己的想法。" |
| 技法 | **乐句爬升+突然消失**——音乐跟着情绪越来越紧张，然后在"……退开"画外音时完全停止，让这两个字占满整个声场。 |

---

### Prompt 04A — 崩溃蒙太奇·上（0:55 - 1:05）

| 层 | 内容 |
|---|---|
| 过渡 | 03B结尾的安静直接切入04A第一个鼓点——零过渡，制造蒙太奇的突然感。 |
| 音乐 | **主旋律C俏皮版**循环加速。第一轮BPM=112，第二轮BPM=120，第三轮BPM=126。木琴+拨弦+轻型打击乐（木鱼、三角铁）。每个镜头切换时加一声"弹弦"音效做标点。 |
| 节奏 | 逐渐加速的循环节奏。像一台失控的跑步机。 |
| 音效 | 拖鞋"啪"掉地×2、袜子湿漉漉的"唧"、柜子被抓"吱——"、相框砸碎"哗啦"。 |
| 情绪 | "停不下来了——笑着笑着有点心疼。" |
| 技法 | **加速循环**——同一个旋律每轮提速4-8BPM，暗示生活越来越失控。相框碎裂时音乐和声突然从大调落入小调一瞬间（G→Em），像笑容僵住。 |

---

### Prompt 04B — 崩溃蒙太奇·下（1:05 - 1:15）

| 层 | 内容 |
|---|---|
| 过渡 | 04A加速循环的最后一轮直接延续，但开始减速——BPM从126→110→92。 |
| 音乐 | 俏皮版旋律在减速中逐渐变形，音符拉长，从喜剧过渡到心酸。金毛犬蹲在草地那个镜头——**音乐完全停止**。只有一根大提琴拉了一个长音（Em开放弦），然后也消失。 |
| 节奏 | 减速至停。草地镜头无拍感。大福飞过肩膀时弹弦恢复一声（喜剧反应），苏敏闭眼时又停。 |
| 音效 | 猫嚎叫声（绵长低沉）、卫生间门锁"咔嗒"、风声、年糕极轻一声鼻息（这个鼻息在完全静默中格外扎心）、台灯碎裂。 |
| 情绪 | "笑不出来了。" |
| 技法 | **喜剧→心酸转折**——配乐的减速和消失本身就是情绪的转折，不需要加任何"悲伤"元素。静默=心酸。那一声鼻息放在绝对安静中，比任何配乐都有力。 |

---

### Prompt 05 — 破冰时刻（1:15 - 1:30）

| 层 | 内容 |
|---|---|
| 过渡 | 04B结尾的静默延续2秒。然后——钢琴单音（G3，中低音区），极轻，像有人在犹豫要不要弹下一个音。 |
| 音乐 | **主旋律B柔情版**。大提琴从第3秒进入走旋律，钢琴做极简和弦铺底。老陈摸金毛犬头顶那一刻大提琴旋律到达第一个长音（G4悬停）。切到苏敏家时，大提琴让位给钢琴右手接旋律——同一条旋律线，但换了音色，暗示"两个故事是一个故事"。 |
| 节奏 | BPM=72，极慢。每个音之间有呼吸。弦乐的弓法用"连弓"——一弓拉到底再换弓，制造绵长不断的线条感。 |
| 音效 | 狗鼻息极轻一声、猫呼噜声（从苏敏抚摸开始，持续到镜头结束）。 |
| 情绪 | "他在慢慢靠近了。" |
| 技法 | **音色交接**——大提琴→钢琴的接力暗示两条线的情感是同步的。苏敏说"你变了"时弦乐的一个和弦轻轻在背景落下（Am→G，从小调解决到大调），这是全片第一次"调性回归"，暗示关系在修复。 |

---

### Prompt 06 — 叼网球（1:30 - 1:45）

| 层 | 内容 |
|---|---|
| 过渡 | 05结尾的钢琴和弦（G大调）自然延续，音量渐弱到pp。进入06时不切断——让观众感觉这是同一段呼吸。 |
| 音乐 | 前半段（0-9秒）：**无旋律**。只有极轻的钢琴低音区每4秒一个音（G2→C3→D3→...），像心跳或呼吸，每个音之间大量留白。金毛犬叼起网球的那一刻（第9秒）：钢琴右手进入**主旋律D收束版**的前2小节——但只弹了2个音就停住，像这句话说到一半就哽住了。老陈摸头时：完成最后一个音。 |
| 节奏 | BPM=60，极慢。无打击乐、无节拍框架。时间由情感控制。 |
| 音效 | 网球弹墙声"咚"（略带回音）、网球滚地声（轻微摩擦）、叼起网球时极轻呼吸、网球放下一声"嗒"。全程无其他声音。 |
| 情绪 | "他不是因为喜欢才去做——他是因为看到了那个人的难过。" |
| 技法 | **极简+留白**——这场戏安静是武器。钢琴音符极少，每一个都有重量。老陈说"你是不是不认得爸爸了"时没有任何音乐，让这句话完全裸露在空气中。年糕叼起网球后才有音乐重新进入——音乐跟随行动，不跟随语言。 |

---

### Prompt 07 — 各自逃亡（1:45 - 2:00）

| 层 | 内容 |
|---|---|
| 过渡 | 06结尾那个钢琴单音延续回音中——突然被一声低音鼓"咚"切断。零距离跳入紧张节奏。 |
| 音乐 | **主旋律A的节奏骨架**（只保留节拍型，不走旋律），改用大提琴快速拨弦(pizzicato)演奏低音线。上方是弦乐四重奏的长音紧张铺底（Em持续，制造不安）。金毛犬穿过车流时加入急促的钢琴高音区断奏。布偶猫跳下高墙的那1秒——所有音乐停止，只有风声。落地后重新进入。 |
| 节奏 | BPM=130，快速。低音大提琴拨弦做"咚-咚-咚-咚"等速节奏，像奔跑的心跳。每3秒加速一级。最后一秒鼓点停。 |
| 音效 | 狗爪跑步声（笃笃笃笃，频率快）、门被撞开声、猫爪抓墙声、风吹白色长毛的轻微呼呼声、车流声、出租车急刹喇叭声。 |
| 情绪 | "快！来不及了！" |
| 技法 | **跳下高墙的静默**——大福画外音说"跳"的那一刻，所有音乐和环境声同时消失0.8秒（像世界屏住了呼吸），然后落地声+音乐同时爆发回来。这个"真空"是全片最紧张的一秒。 |

---

### Prompt 08 — 重逢 + 终场画面（2:00 - 2:15）

| 层 | 内容 |
|---|---|
| 过渡 | 07结尾鼓点停后——0.5秒静默——两只动物鼻子碰鼻子的画面配合一声极轻的钢琴泛音"叮"（与Prompt 01的第一个音相同，G5）。首尾呼应。 |
| 音乐 | 鼻子碰后：**无音乐**，2秒静默+呼吸声。白雾跳切：所有声音消失。灵魂回归后大福那声"汪！"——钢琴正式进入**主旋律D收束版**完整4小节。老陈说"回来了"时大提琴加入和钢琴同走旋律（终于合奏）。窗台终场画面：**主旋律A明亮版**的最后2小节极慢回放（BPM从92减至60），纯钢琴独奏。最后一个音（G3）持续4秒自然衰减到无。 |
| 节奏 | BPM=60极慢。灵魂回归后短暂加速到80（大福兴奋冲向老陈），然后迅速回落到60。终场窗台无拍感。 |
| 音效 | 两只动物呼吸声、"汪！"声（短促有力）、老陈粗哑笑声、猫身轻微扭动、网球纤维在光线中的"无声"（此处环境声也极低）。钢琴最后一个音落下后——2秒绝对静默——黑屏。 |
| 情绪 | "回来了。一切都回来了。但有些东西永远不一样了。" |
| 技法 | **首尾呼应**——开场第一个钢琴音（G5泛音）在这里重现，闭合整个情绪圆环。主旋律D收束版中，高音声部（年糕）和低音声部（大福）终于不再各走各的，而是交织在一起——这是音乐层面的"灵魂互换后的理解"。最后2秒绝对静默是留给观众消化情绪的空间。 |

---

## 情绪关键转折点

| 时间点 | 事件 | 音乐处理 |
|--------|------|----------|
| 0:25 | 白雾弥漫 | 所有音乐消失→单泛音悬浮→渐灭 |
| 0:55 | 蒙太奇开始 | 零过渡突入快节奏 |
| 1:08 | 年糕蹲在草地 | 配乐完全停止，只有鼻息 |
| 1:42 | 年糕叼起网球 | 极简钢琴2音重新进入 |
| 1:47 | 大福跳下高墙 | 0.8秒真空后爆发回来 |
| 2:02 | 灵魂回归 | 收束版主旋律完整呈现 |

---

## AI音乐生成提示词（Suno格式）

### 全曲主题版（完整生成）

```
[Instrumental] [Piano] [Cinematic] [Warm] [Gentle Comedy]

A 135-second piano theme for a realistic live-action film about a cat and dog who swap souls. The music tells the story of two creatures learning to understand each other.

Style: Upright piano melody + pizzicato guitar + solo cello + marimba + string quartet.
Inspired by Alexandre Desplat whimsy, Joe Hisaishi warmth, Thomas Newman gentle humor.
No synth, no drums, no electric guitar, no EDM, no orchestral bombast, no fantasy sounds, no vocals.

Structure:
[Intro 0:00-0:15] Gentle piano melody in G major, two voices (high=cat, low=dog) playing independently but harmonically. Pizzicato guitar enters bar 5. BPM 92. Warm morning light feeling.
[Tension 0:15-0:35] Piano low register irregular chords, heartbeat-like. Accelerating. Then sudden silence 0.5s. Single high piano harmonic (G5) hangs alone, fading slowly. Mysterious, still.
[Comedy 0:35-1:05] Marimba takes lead, playful fast melody in G major. BPM 112 accelerating to 126. Pizzicato guitar rhythmic base. Wood block accents. Stuck-gear repetitions. Getting faster and more chaotic.
[Transition 1:05-1:15] Deceleration from 126 to 92. Music thins. Then complete silence. One cello open string fades. Wind.
[Emotional 1:15-1:45] Solo cello melody in E minor, extremely slow BPM 72. Piano simple chord support. Sparse, breathing between every note. Piano takes over melody at 1:30. BPM drops to 60.
[Chase 1:45-2:00] Cello pizzicato fast bass line, BPM 130. String quartet sustained tension. Brief silence at 1:53 (0.8s vacuum). Then explosive return.
[Resolution 2:00-2:15] Piano returns to opening theme, extremely slow BPM 60. The two voices (cat and dog) finally merge into one line. Last note rings and fades to silence.

Mood: warm, daily-life, gentle-humor, bittersweet, companionship, home, understanding
```

### 分段生成版

#### 段落1：温暖日常+惊变（0:00-0:35）

```
[Instrumental] Gentle upright piano in G major, BPM 92. Two melodic voices playing independently — high register slow and deliberate, low register steady repetition. Pizzicato guitar joins at 0:05. At 0:15 mood shifts: low piano irregular chords accelerating like heartbeat. At 0:25 sudden silence then single high harmonic fading. Alexandre Desplat warmth into Thomas Newman tension. No synth, no drums, no vocals. 35 seconds.
```

#### 段落2：喜剧蒙太奇（0:35-1:15）

```
[Instrumental] Playful marimba melody in G major, BPM 112 accelerating to 126. Pizzicato guitar rhythm, wood block accents. Comedic stuck-note repetitions. After 30 seconds: gradual deceleration, music thins to single cello note then complete silence. Joe Hisaishi playful → Alexandre Desplat melancholy transition. No synth, no drums, no vocals. 40 seconds.
```

#### 段落3：情感核心（1:15-1:45）

```
[Instrumental] Solo cello melody in E minor, extremely slow BPM 72. Sparse upright piano chord support (one chord per bar). Breathing space between every note. At 0:15 piano right hand takes over melody. Modulates gently from Em back to G major at the end. Thomas Newman intimate cello, minimal arrangement, lots of silence between notes. No synth, no drums, no vocals. 30 seconds.
```

#### 段落4：追逐+收束（1:45-2:15）

```
[Instrumental] Starts with fast cello pizzicato bass BPM 130, string quartet sustained tension in E minor. Brief 0.8s total silence at 0:08 then explosive return. At 0:15 transitions to extremely slow piano solo BPM 60 in G major. Two melodic voices merge into single line. Final note sustains and fades to silence. Alexandre Desplat chase energy into Joe Hisaishi resolution warmth. No synth, no drums, no vocals. 30 seconds.
```

---

## SFX清单（按时间线）

| 编号 | 名称 | 时间 | 音量偏移 | 来源建议 |
|------|------|------|----------|----------|
| SFX-01 | 猫爪碰笔筒"叮" | 0:12 | +0dB | Freesound: ceramic tap |
| SFX-02 | 牵绳绷紧"嘎" | 0:05 | -3dB | Freesound: rope strain |
| SFX-03 | 网球落地"咚" | 0:09 | -2dB | Freesound: tennis ball bounce |
| SFX-04 | 猫爪刮塑料 | 0:17 | +2dB | Foley录制 |
| SFX-05 | 航空箱碰击声×3 | 0:18-0:20 | +3dB | Foley: 塑料箱撞击 |
| SFX-06 | 箱体砸地闷响 | 0:21 | +4dB | Freesound: heavy plastic drop |
| SFX-07 | 卡扣弹开"咔-啪" | 0:21.5 | +3dB | Foley录制 |
| SFX-08 | 猫嘶叫 | 0:22 | +2dB | Freesound: cat hiss short |
| SFX-09 | 金属架倒塌 | 0:26 | +5dB | Freesound: metal shelf crash |
| SFX-10 | 气瓶撞地+喷射 | 0:27 | +4dB→渐弱 | Freesound: gas release hiss |
| SFX-11 | 猫爪拍地板"啪" | 0:39 | +0dB | Freesound: small paw slap |
| SFX-12 | 怪猫嚎 | 0:42 | +3dB | Freesound: strange cat yowl |
| SFX-13 | 水碗晃动 | 0:47 | -2dB | Freesound: water bowl |
| SFX-14 | 拖鞋掉地×2 | 0:58-0:59 | +0dB | Foley录制 |
| SFX-15 | 相框砸碎 | 1:04 | +3dB | Freesound: glass frame break |
| SFX-16 | 卫生间门锁"咔嗒" | 1:07 | +2dB | Freesound: door lock click |
| SFX-17 | 年糕鼻息 | 1:09 | +5dB (静默中) | Freesound: dog sniff quiet |
| SFX-18 | 台灯碎裂 | 1:13 | +2dB | Freesound: lamp shade break |
| SFX-19 | 猫呼噜声 | 1:25-1:30 | -2dB | Freesound: cat purring |
| SFX-20 | 网球弹墙 | 1:31 | +0dB | 同SFX-03 |
| SFX-21 | 网球滚地 | 1:32 | -3dB | Freesound: ball rolling floor |
| SFX-22 | 网球放下"嗒" | 1:41 | -2dB | Freesound: soft ball place |
| SFX-23 | 门被撞开 | 1:46 | +3dB | Freesound: door slam open |
| SFX-24 | 出租车急刹+喇叭 | 1:56 | +4dB | Freesound: car brake horn |
| SFX-25 | "汪！"声 | 2:03 | +3dB | Freesound: golden retriever bark |
| SFX-26 | 钢琴最后一音衰减 | 2:13-2:15 | -∞渐弱 | BGM自身 |

---

## 生成建议

1. 优先用**全曲主题版**Suno提示词生成一版完整的。如果70%以上段落合适，保留并在后期裁剪/替换不满意的部分。
2. 如果全曲版的喜剧段和情感段衔接不好，改用**分段生成版**分别生成4个段落，再用0.5-1秒crossfade拼接。
3. 段落3（情感核心）是最难的——大提琴独奏需要呼吸感。如果AI生成的大提琴太"满"，在提示词中加强"minimal arrangement, lots of silence between notes, breathing space"。
4. 主旋律D收束版（终场）极度依赖留白——如果生成版音符太密，宁可手动删音符，也不要让它变成"满"的状态。
5. SFX全部在配乐混缩后单独叠加，不要让SFX影响BGM的生成。
