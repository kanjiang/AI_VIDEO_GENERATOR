# Episode 02 《红热工地》BGM 配乐方案

## 项目概览

本集共 18 条视频（每条约 15 秒），总时长约 270 秒（4 分 30 秒）。BGM 不进入 AI 视频生成提示词（视频提示词已硬约束"无背景音乐"），而是在后期统一生成并混音到剪辑版。

核心音乐方向：工业温暖、紧张有序、从对抗到理解的弧线。音乐像一座高效运转的建筑工地——有节奏、有压力，但不混乱。

## 情绪弧线

```
音量/密度
  ▲
  │               ╭╮P05 防御圈全景
  │         ╭─╮P03╯╰╮        ╭╮P09 深处追踪
  │    ╭P02╯  ╰╮    ╰P06╮  ╭╯╰╮       ╭────P13-15 科普
  │ P01╯       P04      ╰P07  P10╮  P12╯     ╭P16-18 角色
  │╭──╯                    ╰P08  ╰──╯       ╭╯
  │╯                          ╰P11──────────╯
  ┼──────────────────────────────────────────────────── 时间▶
  0    30    60    90   120   150   180   210   240  270s
  日常  工地  对抗  防御  发现  追踪  消退  悬念  科普  角色
```

```
BPM
  ▲
135│                                                 ╭── P16-18
125│        ╭P03────╮         ╭P09──╮          ╭P13──╯
115│   ╭P02╯       ╰P04-05──╯      ╰╮    ╭P12╯
105│╭P01╯                            ╰P10╯
 90│                   ╭P06-07──╮
 75│                            ╰P08──╮
 65│                                  ╰P11
  ┼──────────────────────────────────────────────── 时间▶
  0    30    60    90   120   150   180   210   270s
```

## 全局音乐身份

| 项目 | 参数 |
|---|---|
| 总时长 | 270 秒（18 × 15 秒） |
| 主调 | D 小调为主；P08 白小锋理解时转 D 大调；P13-18 切换到 Bb 大调（明亮科普/角色） |
| 基础 BPM | 110 BPM |
| 拍号 | 4/4 全程，P12 尾声留白段自由拍 |
| 核心音色 | 马林巴（marimba）——温暖有节奏感，像工地的心跳 |
| 辅助音色 | 低音铜管（trombone/tuba，工业厚重感）、pizzicato 弦乐（潜行发现）、celesta（理解/柔情）、长笛（闪闪主题色彩）、大提琴（悬念低频） |
| 打击乐 | 木块（工地节拍）、anvil/铁砧（血管壁膨胀重击）、snare brush（行进感）、shaker（支路安静段）、低音大鼓（悬念段） |
| 情绪关键词 | 工业、秩序、对抗、理解、发现、悬念、温暖 |
| 禁止 | 禁人声/歌词、禁 EDM/trap/808 bass、禁摇滚吉他、禁恐怖弦乐尖叫、禁过度交响史诗化、禁电子合成器主导（保持原声器乐质感） |

## 核心动机

### 主题 A — 身体小队主题（承袭全季）

BPM=110，4/4，D 小调

```
| 1 3 5 6 | 5 3 2 - |
| 1 3 5 1'| 6 5 3 - |
```

主奏马林巴，第二遍长笛跟随高八度。这是全季贯穿的主题，本集以小调色彩呈现（比 Ep1 更沉稳）。

### 主题 B — 红热工地主题（本集专属）

BPM=120，4/4，D 小调

```
| 5 5 6 1'| 6 5 3 - |
| 4 4 5 6 | 5 4 2 - |
```

低音铜管主导，马林巴在高声部做节拍型伴奏。木块提供持续的工地脉搏感。膨胀/扩张段落用铁砧重击标点。

### 主题 C — 潜行发现主题（支路/碎片段落）

BPM=88，4/4，D 小调 → 降 B 小调

```
| 5 - - 6 | b7 - 6 5 |
| 3 - - - | 2 - - - |
```

极疏的 pizzicato 弦乐，单音之间有大量静默。大提琴在低音区做持续长音垫底。每句末尾有一个极轻的低音大鼓单击——像心跳。

### 主题 D — 理解转变主题（白小锋弧线关键时刻）

BPM=95，4/4，D 大调

```
| 1 - 3 5 | 6 5 - - |
| 1 - 3 5 | 1'- - - |
```

celesta 独奏，弦乐铺垫渐入。主题 A 的大调色彩变体，表现白小锋从对抗到理解的松动。节奏放缓，呼吸感增强。

### 主题 E — 科普欢乐主题

BPM=128，4/4，Bb 大调

```
| 1 3 5 5 | 6 5 3 1 |
| 2 2 3 5 | 3 2 1 - |
```

马林巴 + 木琴 staccato + pizzicato strings，闪闪讲解段落的活泼基调。节拍轻快弹跳，像科学课铃声。

---

## 逐镜配乐表

### Prompt 01 — 血管主干道遭遇警示区（0:00–0:15）

| 层级 | 内容 |
|---|---|
| 音乐 | 0:00-0:05 主题 A 明亮版残留（承接 Ep1 片尾的温暖余韵），马林巴 + 长笛，BPM=108，正常日常感。0:05 第一盏警示灯亮起时马林巴突然减半音符密度，长笛退出，低音铜管进入，单个低音 trombone 长音 → 主题 B 前奏暗示。0:10-0:15 木块开始规律敲击（工地脉搏建立），BPM 渐升至 112 |
| 音效 | 0:05 警示灯嗡鸣（低频 80Hz 脉冲）；0:08 路面收窄摩擦声；0:12 白小锋脚步接近声 |
| 情绪 | 日常 → 困惑 → 不安暗涌 |
| 技法 | 0:05 长笛退出制造"缺失感"；低音铜管进入是本集色彩的第一个信号 |

### Prompt 02 — 血管壁膨胀特写（0:15–0:30）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 B 全面展开，BPM=120。低音 trombone + tuba 主旋律，马林巴高音区持续八分音符节拍伴奏，木块 + anvil 做重拍标点。0:15-0:20 广角全景时铜管齐奏，壁面膨胀的"气压充填"用 tuba 上行滑音配合。0:20-0:25 增援队落地时每个落地瞬间有 pizzicato 弦乐弹拨。0:25-0:30 扩张哥喊话时音乐短暂让出中频给对白，马林巴只留节拍骨架 |
| 音效 | 0:16 血管壁膨胀气压声（低沉充填声）；0:21-0:24 增援队落地踏声（3-4 次）；0:26 调度板白光激活声 |
| 情绪 | 工业壮观、有序繁忙、不是混乱是系统 |
| 技法 | anvil 重击 = 血管壁膨胀的物理标点；增援落地的 pizzicato 制造"有序进场"节奏感 |

### Prompt 03 — 白小锋质问扩张哥（0:30–0:45）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 B 变体——拆解为对抗版。BPM=125。白小锋走近时马林巴急促上行，代表他的急切；扩张哥回应时切换到低音铜管长音，代表他的沉稳。两个音色交替出现 = 两种性格对峙。0:40-0:45 白小锋看调度板停住时——1 秒静默，只剩木块单一节拍，然后 celesta 极轻地弹一个单音（理解主题 D 的第一个音 = 种子） |
| 音效 | 0:31 白小锋脚步硬朗（金属质感）；0:37 调度板推出声；0:43 背景施工声压低 |
| 情绪 | 对抗紧张 → 短暂停顿（种子） |
| 技法 | 0:43 的 celesta 单音是全集最关键的音乐伏笔——白小锋第一次停住思考，理解主题在这里埋下第一颗种子 |

### Prompt 04 — 闪闪截停白小锋（0:45–1:00）

| 层级 | 内容 |
|---|---|
| 音乐 | BPM=118。0:45-0:50 白小锋挤入通道被卡时主题 B 节奏突然断裂——马林巴停住，只有壁面弹性挤压的低频嗡音。0:50 闪闪冲入时长笛急速上行（闪闪标志音色），警报环音效叠加。0:53-0:58 闪闪指向防御圈时音乐过渡——长笛 → 马林巴逐渐恢复，加入弦乐铺垫，暗示接下来的全景展示。0:58-1:00 白小锋退出通道，celesta 第二个单音（理解主题种子继续生长） |
| 音效 | 0:46 壁面弹性挤压声；0:48 反弹声；0:50 闪闪急停摩擦声 + 警报环橙色脉冲电流音 |
| 情绪 | 受阻 → 信息冲击 → 犹豫 |
| 技法 | 长笛＝闪闪的专属音色标记，贯穿全季；壁面弹性挤压处音乐断裂 = 白小锋行动受阻的声音表现 |

### Prompt 05 — 炎症防御圈全景（1:00–1:15）

| 层级 | 内容 |
|---|---|
| 音乐 | 本集音乐密度最高段。主题 B 全编制版，BPM=120。1:00-1:04 超广角全景时铜管全奏 + 弦乐长音铺垫 + 马林巴持续节拍 = 完整的"工地交响"。1:04-1:08 增援队就位时 pizzicato 弦乐做队列节拍。1:08-1:12 从防御圈内部反拍时铜管降低一个力度层（mp → p），弦乐长音上移半音制造"包围感"。1:12-1:15 增援小兵面部近景蒙太奇时音乐简化到马林巴 + 单一大提琴持续音 |
| 音效 | 1:01 工地全景施工声合集；1:05 增援队整齐踏步声；1:13 小兵低声"三号位就位"（画内对白） |
| 情绪 | 壮观、有序、系统之美 |
| 技法 | 这是本集音乐的"高潮"，但不是情绪高潮——是展示高潮。音量大但情绪是"有序"不是"激动"，铜管要稳不要冲 |

### Prompt 06 — 板板发现深色碎片（1:15–1:30）

| 层级 | 内容 |
|---|---|
| 音乐 | 突然切入主题 C（潜行发现），BPM=88。与前一段全编制形成强烈反差。1:15-1:19 pizzicato 弦乐极疏单音，板板在壁面施工。1:19-1:23 发现碎片瞬间——所有乐器停止 0.5 秒（静默），然后大提琴极低音进入（降 B 音，不安暗示）。1:23-1:27 板板取出碎片时 celesta 弹出碎片核心标记的脉冲节奏（与画面暗红脉冲同步）。1:27-1:30 板板放入收纳袋时只剩大提琴持续长音 |
| 音效 | 1:20 嵌入物松动声（黏土拔石子）；1:24 碎片核心脉冲微弱电流声；1:28 收纳袋封口声 |
| 情绪 | 专注 → 发现 → 沉重 |
| 技法 | 0.5 秒完全静默是最有效的"发现"标点；celesta 与碎片脉冲同步 = 用音乐标记"证据" |

### Prompt 07 — 红小达绕行支路发现爬行痕迹（1:30–1:45）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 C 延续，BPM=85。1:30-1:34 红小达在支路小跑，只有 shaker 轻摇 + 单一 pizzicato 低音弦乐。1:34-1:38 发现暗紫痕迹时 shaker 停，pizzicato 停——只剩极轻的大提琴泛音。1:38-1:42 蹲下查看痕迹延伸方向时加入低音大鼓单击（每 2 秒一次 = 心跳），大提琴在痕迹消失方向做缓慢下行。1:42-1:45 红小达退后半步，低音大鼓最后一击后完全静默 |
| 音效 | 1:31 支路脚步回音；1:35 环境变安静；1:44 红小达压低声音自语"这不是炎症造成的"（画内对白） |
| 情绪 | 安静 → 不安 → 独自面对未知 |
| 技法 | 低音大鼓的心跳节奏 = 红小达内心不安的外化；结尾完全静默增强孤独感 |

### Prompt 08 — 炎症全图解说 / 白小锋理解转变（1:45–2:00）

| 层级 | 内容 |
|---|---|
| 音乐 | 本集情绪核心。1:45-1:49 主题 B 简化骨架（马林巴 + 木块），扩张哥指图时音乐作为背景节拍。1:49-1:53 调度板动画展示炎症系统时弦乐铺垫渐入，从 D 小调开始向 D 大调过渡。1:53-1:57 白小锋微表演（眼睛放大、肩落、握力松）= **主题 D 完整呈现**，celesta 主奏，弦乐温暖铺垫。BPM 从 110 减速到 95。这是 Prompt 03 里那个 celesta 单音种子的完整开花。1:57-2:00 白小锋说"分头行动"时 celesta 退出，马林巴回归，BPM 回升到 108——他理解了但不是释然，是"决定利用" |
| 音效 | 1:50 调度板白光激活声；1:54 短柄捕捉器握力松开的轻微金属声 |
| 情绪 | 信息接收 → 理解松动 → 决定行动 |
| 技法 | 主题 D 在这里完整出现是全集音乐弧线的核心——从 P03 的一个单音到 P04 的第二个单音到这里的完整旋律，像种子发芽。调性从小调到大调的过渡必须缓慢渐进，禁止突然跳变 |

### Prompt 09 — 支路深处追踪（2:00–2:15）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 C 最完整呈现。BPM=85。2:00-2:04 三人进入支路，pizzicato 弦乐恢复，每个人的脚步对应一个弹拨音。2:04-2:08 红小达比对碎片时 celesta 弹出碎片脉冲节奏（同 P06），但这次加了一个低八度的重复——更深更重。2:08-2:11 闪闪警报环方向脉冲时长笛吹出一个极轻的下行滑音（指向更深处）。2:11-2:15 白小锋沉默站起时所有乐器退出，只剩大提琴最低音的持续震音（tremolo），渐弱到几乎无声 |
| 音效 | 2:01 支路回音脚步声；2:05 碎片对比时轻碰声；2:09 警报环极轻电流滑动声 |
| 情绪 | 追踪 → 证据确认 → 沉重沉默 |
| 技法 | 大提琴 tremolo 渐弱 = "威胁依然存在但我们还不知道它的全貌"的声音表现 |

### Prompt 10 — 炎症开始消退（2:15–2:30）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 B 退潮版。BPM=100，比工地全盛期慢 20。2:15-2:19 低音铜管做逆行（下行旋律），马林巴音符密度减半——工地在收工。木块节拍从每拍一击变为每两拍一击。2:19-2:23 警示灯逐一熄灭，每灭一盏对应一个 celesta 下行音。2:23-2:27 扩张哥说"比想象的深"时音乐只剩马林巴单音 + 大提琴持续音。2:27-2:30 板板看向支路方向时低音大鼓单击一次（悬念回响） |
| 音效 | 2:16 施工声渐低；2:20 警示灯逐个熄灭的"啪"声序列；2:27 环境回归安静 |
| 情绪 | 收尾但不轻松，任务完成的沉重平静 |
| 技法 | 铜管逆行（倒放主题 B）= 炎症在退的声音隐喻；celesta 对应灯灭 = 每一个结束点的标记 |

### Prompt 11 — 红小达重回主路（2:30–2:45）

| 层级 | 内容 |
|---|---|
| 音乐 | 2:30-2:34 主题 A 残片（日常恢复暗示），马林巴 + 长笛轻快几个音——但只弹了半句就停住。2:34 红小达踩到主干道边缘爬行痕迹时——**2 秒完全静默**。2:36-2:40 主题 C 变体，比之前所有潜行段更简——只有大提琴独奏，极慢，单音之间间隔 3 秒。BPM 降到 65（全集最低）。2:40-2:45 红小达站起来抱紧氧气包，大提琴最后一个极低音后淡出，环境完全安静 |
| 音效 | 2:31 主干道运输流声（恢复感）；2:34 脚步踩到痕迹变调声；2:44 "它出来了"（画内对白，压低） |
| 情绪 | 短暂松弛 → 最沉重的发现 → 独自承受 |
| 技法 | 主题 A 半句中断 = "日常不再安全"的声音破坏；2 秒完全静默是全集第二次大静默（第一次在 P06），每次静默都对应一次重大发现 |

### Prompt 12 — 两枚碎片并排 / 本集收束（2:45–3:00）

| 层级 | 内容 |
|---|---|
| 音乐 | 全集尾声。2:45-2:49 三人汇合，无音乐，只有极轻环境声。2:49-2:53 白小锋并排两枚碎片时 celesta 弹出碎片脉冲节奏（第三次出现，每次都更低更重），这次在低音区，加了一个不和谐的增四度——碎片变了，音乐也变了。2:53-2:57 白小锋说"它在往里走"时主题 D 的前两个音在 celesta 上极轻响起——但这次没有解决到大调，停在悬而未决的 #4 音上。2:57-3:00 摄影机拉远时全部乐器退出，最后 2 秒只有低音大鼓一次极轻的单击，然后完全静默，黑屏 |
| 音效 | 2:50 收纳袋轻碰声；2:56 支路深处极细光点移动的微弱电流声（几乎听不到） |
| 情绪 | 沉重确认 → 悬念悬停 → 留白 |
| 技法 | 主题 D 在这里故意不完成——它在 P08 完整出现过（理解），但这里只弹前两个音就悬停在不和谐音上 = 白小锋理解了炎症，但威胁的全貌还没有揭开。增四度（"魔鬼音程"）是悬念的经典音乐手法 |

### Prompt 13 — 片尾科普（上）：闪闪开场（3:00–3:15）

| 层级 | 内容 |
|---|---|
| 音乐 | 完全切换情绪。主题 E 开场。BPM=128，Bb 大调。马林巴 + 木琴 staccato + pizzicato strings。3:00 闪闪登场时长笛做上行快速音阶（她的标志音色，但这次是大调=轻快版）。3:07-3:15 示意图出现时马林巴简化为伴奏骨架，木琴在高音区弹出血管扩张的"膨胀"节奏型——上行琶音 |
| 音效 | 3:01 场景过渡音效（轻快铃声）；3:08 示意图弹出声 |
| 情绪 | 从叙事沉重完全切换到轻快科普 |
| 技法 | 叙事段与科普段之间用 1 秒静默 + 场景过渡铃声做硬切分隔，不做渐变——观众需要清晰的"现在是科普时间"信号 |

### Prompt 14 — 片尾科普（中）：白细胞涌入与疼痛信号（3:15–3:30）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 E 延续，BPM=125。3:15-3:23 白细胞从壁面涌出时 pizzicato 弦乐做队列弹拨（同 P05 但轻快版），每次涌出加一层乐器 = 越来越丰满。膨胀动画时 tuba 做轻柔的上行滑音（P02 铜管膨胀的戏谑版）。3:23-3:30 闪闪讲"痛"时长笛从高音做下行短句 + 警报环橙色脉冲同步 celesta 单击 |
| 音效 | 3:16 白细胞挤出壁面的柔和弹跳声序列；3:24 警报环橙色脉冲电流音 |
| 情绪 | 好奇、有趣、"原来如此" |
| 技法 | 叙事段的严肃元素（铜管膨胀、pizzicato 队列）在这里以轻快版重现 = 音乐层面的科普回顾 |

### Prompt 15 — 片尾科普（下）：红肿热痛总结（3:15–3:45）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 E 收束版。BPM=124。3:30-3:36 四关键词弹出时每个对应一个标志音效——"红"（铜管短音）、"肿"（tuba 膨胀滑音）、"热"（马林巴快速震音 tremolo）、"痛"（长笛+celesta 叠奏）。3:36-3:41 闪闪总结台词时音乐简化到马林巴伴奏 + 弦乐温暖垫底。3:41-3:45 闪闪挥手时警报环从橙到蓝到灭 = 长笛做 3 音下行渐弱，主题 E 自然结束 |
| 音效 | 3:31-3:35 四关键词弹跳音效（每 1 秒一个轻快弹出声）；3:43 警报环柔和熄灭声 |
| 情绪 | 温暖收尾、安心、"没那么可怕" |
| 技法 | 四关键词的音色回顾是本集音乐的微型总结——把叙事段的严肃音色用一个音符浓缩 |

### Prompt 16 — 角色介绍（上）：白小锋与红小达（3:45–4:00）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 A 全力版，BPM=132，Bb 大调（最明亮最轻快）。3:45-3:53 白小锋冲入时马林巴急速上行 + snare brush 滚奏，捕捉器甩出时 anvil 单击。3:53-4:00 红小达跑入时切换到长笛+pizzicato 弦乐轻快伴奏，氧气包拍击时有木块声 |
| 音效 | 3:46 捕捉器弹出声；3:54 氧气包轻碰声 |
| 情绪 | 欢快、自信、展示 |
| 技法 | 白小锋用打击/金属音色，红小达用木管/弦乐音色——声音层面也在区分角色个性 |

### Prompt 17 — 角色介绍（中）：板板与闪闪（4:00–4:15）

| 层级 | 内容 |
|---|---|
| 音乐 | 主题 A 延续。4:00-4:08 板板弹跳登场时木琴 staccato + 木块轻快节拍（工程感），修补钉举高时 celesta 清脆一击。4:08-4:15 闪闪光轨冲入时长笛急速上行 + 全乐队短暂 tutti accent，急停后警报环橙色光 = celesta 单击 + 弦乐泛音 |
| 音效 | 4:01 板板落地弹跳声；4:04 修补钉清脆声；4:09 闪闪急停摩擦声 + 警报环脉冲声 |
| 情绪 | 活泼、可爱、个性鲜明 |
| 技法 | 板板 = 木琴/木块（工程），闪闪 = 长笛/celesta（信号）——每个角色的专属音色在角色介绍段集中展示 |

### Prompt 18 — 角色介绍（下）：扩张哥登场与合影（4:15–4:30）

| 层级 | 内容 |
|---|---|
| 音乐 | 4:15-4:21 扩张哥登场时切换到主题 B 简化版（他的标志工地主题），低音铜管 + 马林巴，BPM=115，比叙事段轻松。调度板翻页声 = tuba 短音。4:21-4:27 五人并排时全编制 tutti——主题 A Bb 大调全力版，所有乐器同时演奏，BPM=135（全集最高），齐声"我们是——身体小队！"的节拍与全乐队 accent 同步。4:27-4:30 定格合影时 ritardando 减速，最后一拍是全乐队齐奏大和弦 + celesta 最高音闪烁 → 渐暗 |
| 音效 | 4:16 扩张哥稳重脚步声；4:17 调度板翻页厚重声；4:23 齐声对白；4:28 定格画面声 |
| 情绪 | 集结、团队、明亮结束 |
| 技法 | 全集最后一个大和弦必须包含 D 音（本集主调音）——即使已经转到 Bb 大调，也要在和弦里保留这个音作为与叙事段的隐性连接 |

---

## AI 音乐生成提示词

### 策略

采用分段生成（segmented）策略，分 3 个音频块分别生成后在后期拼接：

1. **叙事段 BGM**（P01–P12，0:00–3:00）
2. **科普段 BGM**（P13–P15，3:00–3:45）
3. **角色介绍段 BGM**（P16–P18，3:45–4:30）

### Prompt 1 — 叙事段（3 分钟）

```
[Style] Orchestral animation score, Disney Pixar adventure, warm industrial atmosphere, marimba-led with brass and strings

[Instruments] Lead marimba, trombone, tuba, pizzicato strings, celesta, cello, flute, wood block, anvil hits, bass drum, shaker

[Structure]
[Intro 0:00-0:15] D minor, 108 BPM, marimba and flute gentle melody, flute drops out at 0:05, low trombone enters, wood block starts steady pulse
[Build 0:15-1:00] D minor, 120 BPM, full brass section with marimba ostinato, industrial construction rhythm, anvil accents on downbeats, pizzicato strings for marching sequences, brief 1-second silence at 0:43 then single celesta note
[Discovery 1:00-1:30] D minor, 88 BPM, sudden shift to sparse pizzicato only, deep cello sustained notes, half-second total silence at 1:20, celesta pulse pattern synced to heartbeat
[Tracking 1:30-2:00] D minor shifting to D major at 1:53, 85 BPM slowing to 95, solo cello with bass drum heartbeat every 2 seconds, celesta melody emerges at 1:53 in major key — warm understanding moment, then returns to minor
[Retreat 2:00-2:30] D minor, 100 BPM, brass in retrograde descending, marimba thinning out, celesta descending notes marking individual moments, ends with single bass drum hit
[Finale 2:30-3:00] D minor, 65 BPM, solo cello, 2-second total silence at 2:34, celesta augmented fourth interval at 2:53, final bass drum single hit then complete silence

[Mood] Warm industrial adventure turning to suspenseful discovery, not horror — organized tension, like a well-run construction site facing an unknown threat

[Negative] No vocals, no lyrics, no EDM, no trap, no electric guitar, no horror strings screech, no epic choir, no synthesizer leads, no generic pop progression
```

### Prompt 2 — 科普段（45 秒）

```
[Style] Bright educational animation score, playful science explainer, Disney channel interstitial

[Instruments] Marimba, xylophone staccato, pizzicato strings, flute, celesta, light wood block, soft triangle

[Structure]
[Intro 0:00-0:07] Bb major, 128 BPM, bright flute ascending scale, marimba and xylophone staccato accompaniment, playful and bouncy
[Explain 0:07-0:30] Bb major, 125 BPM, pizzicato strings doing rhythmic plucking pattern, tuba doing gentle comedic slide (one occurrence), flute descending short phrase with celesta accent
[Wrap 0:30-0:45] Bb major, 124 BPM, four distinct musical punctuations (brass short note, tuba slide, marimba tremolo, flute+celesta), warm strings pad underneath, flute 3-note descending fade out

[Mood] Cheerful, curious, safe, "science is fun" energy, like a friendly teacher explaining something cool

[Negative] No vocals, no lyrics, no EDM, no dark tones, no minor key, no heavy percussion, no suspense, no horror
```

### Prompt 3 — 角色介绍段（45 秒）

```
[Style] Upbeat character introduction fanfare, Disney animated series end credits, team celebration

[Instruments] Full marimba, flute, xylophone, pizzicato strings, trombone, tuba, celesta, snare brush, wood block, anvil accent

[Structure]
[Hero1 0:00-0:08] Bb major, 132 BPM, marimba rapid ascending run with snare brush roll, anvil single hit accent, energetic and heroic
[Hero2 0:08-0:15] Bb major, 132 BPM, flute and pizzicato strings light accompaniment, wood block rhythmic pattern
[Hero3 0:15-0:23] Bb major, 132 BPM, xylophone staccato with celesta sparkle accent, then flute rapid ascending scale with full orchestra brief accent
[Hero4 0:23-0:30] Transition to low brass (trombone+tuba) steady walk theme at 115 BPM, then immediately back to 135 BPM
[Finale 0:30-0:45] Bb major, 135 BPM, full ensemble tutti, all instruments playing together in triumphant major chord, ritardando in final 3 seconds, ending on big sustained chord with celesta highest note sparkling, gentle fade

[Mood] Joyful, triumphant, team spirit, "meet the heroes" energy

[Negative] No vocals, no lyrics, no EDM, no minor key, no dark tones, no slow ballad, no synthesizer
```

---

## 音效清单（SFX Timeline）

| # | 名称 | 时间点 | 音量偏移 | 来源建议 |
|---|---|---|---|---|
| SFX-01 | 警示灯低频嗡鸣 | P01 0:05 | -6dB | 合成：80Hz 正弦脉冲，0.5s 周期 |
| SFX-02 | 路面收窄摩擦声 | P01 0:08 | -8dB | Freesound: concrete scrape soft |
| SFX-03 | 血管壁气压充填声 | P02 0:16 | -4dB | 合成：低频上升 sweep 60→120Hz，2s |
| SFX-04 | 增援队落地踏声 | P02 0:21–0:24 | -6dB | Foley: 3-4 次柔软踏地声 |
| SFX-05 | 调度板白光激活声 | P02 0:26 | -8dB | 合成：高频 shimmer 0.3s |
| SFX-06 | 金属脚步声 | P03 0:31 | -6dB | Foley: 硬底鞋踏金属板 |
| SFX-07 | 壁面弹性挤压声 | P04 0:46 | -4dB | 合成：橡胶挤压+低频嗡声 |
| SFX-08 | 壁面弹性反弹声 | P04 0:48 | -5dB | 合成：弹簧回弹+空气释放 |
| SFX-09 | 闪闪急停摩擦声 | P04 0:50 | -6dB | Foley: 运动鞋急停 |
| SFX-10 | 警报环橙色脉冲声 | P04 0:50 | -7dB | 合成：中频电流脉冲 0.2s |
| SFX-11 | 整齐踏步声序列 | P05 1:05 | -5dB | Foley: 多人齐步踏声 loop |
| SFX-12 | 嵌入物松动声 | P06 1:20 | -4dB | Foley: 黏土拔石子 |
| SFX-13 | 碎片核心脉冲声 | P06 1:24 | -8dB | 合成：微弱电流脉动 0.5s 周期 |
| SFX-14 | 收纳袋封口声 | P06 1:28 | -10dB | Foley: 塑料袋轻封 |
| SFX-15 | 支路脚步回音 | P07 1:31 | -6dB | Foley: 走廊回音脚步 |
| SFX-16 | 低音大鼓心跳 | P07 1:38–1:42 | -8dB | 采样：大鼓单击，每 2s |
| SFX-17 | 调度板激活声 | P08 1:50 | -8dB | 同 SFX-05 |
| SFX-18 | 捕捉器握力松声 | P08 1:54 | -10dB | Foley: 金属卡扣松开 |
| SFX-19 | 碎片对比碰声 | P09 2:05 | -8dB | Foley: 塑料袋并排轻碰 |
| SFX-20 | 警报环方向脉冲滑动声 | P09 2:09 | -9dB | 合成：电流缓慢滑动 1s |
| SFX-21 | 警示灯逐个熄灭声 | P10 2:20 | -6dB | 合成：继电器断开"啪"声序列 |
| SFX-22 | 主干道运输流声 | P11 2:31 | -5dB | 合成：稳定中频流动白噪声 |
| SFX-23 | 脚步踩痕迹变调声 | P11 2:34 | -6dB | Foley: 踩到湿表面变调 |
| SFX-24 | 收纳袋碰声 | P12 2:50 | -8dB | 同 SFX-19 |
| SFX-25 | 极细光点移动声 | P12 2:56 | -14dB | 合成：极微弱高频电流 |
| SFX-26 | 科普过渡铃声 | P13 3:01 | -6dB | 合成：音乐盒式轻快两音铃 |
| SFX-27 | 示意图弹出声 | P13 3:08 | -8dB | 合成：卡通弹出 pop |
| SFX-28 | 白细胞弹跳挤出声序列 | P14 3:16 | -6dB | 合成：柔软弹跳声 ×4-5 |
| SFX-29 | 四关键词弹跳音效 | P15 3:31–3:35 | -5dB | 合成：卡通弹出 pop ×4 |
| SFX-30 | 警报环柔和熄灭声 | P15 3:43 | -8dB | 合成：电子渐弱关机声 |
| SFX-31 | 捕捉器弹出声 | P16 3:46 | -5dB | Foley: 弹簧金属弹出 |
| SFX-32 | 氧气包轻碰声 | P16 3:54 | -7dB | Foley: 圆形容器轻拍 |
| SFX-33 | 板板落地弹跳声 | P17 4:01 | -6dB | Foley: 小体型柔软着地 |
| SFX-34 | 修补钉清脆声 | P17 4:04 | -7dB | Foley: 金属钉轻敲 |
| SFX-35 | 闪闪急停+警报环脉冲 | P17 4:09 | -6dB | SFX-09 + SFX-10 叠加 |
| SFX-36 | 调度板翻页厚重声 | P18 4:17 | -6dB | Foley: 厚重金属板翻转 |
| SFX-37 | 定格画面声 | P18 4:28 | -8dB | 合成：快门式定格+余音 |

---

## 音乐关键设计备注

### 角色专属音色

| 角色 | 专属乐器 | 原因 |
|---|---|---|
| 白小锋 | 马林巴急速上行 + anvil | 行动力 + 冲击 |
| 红小达 | pizzicato 弦乐 + shaker | 轻快路线感 + 配送节奏 |
| 板板 | 木琴 staccato + 木块 | 工程精密感 |
| 闪闪 | 长笛 + 警报环 celesta | 速度 + 信号 |
| 扩张哥 | 低音铜管（trombone/tuba）| 工业厚重 + 老师傅稳重 |

### 三次静默设计

| 位置 | 时长 | 对应事件 | 效果 |
|---|---|---|---|
| P06 1:20 | 0.5 秒 | 板板发现碎片 | 发现标点 |
| P11 2:34 | 2 秒 | 红小达踩到主干道痕迹 | 全集最重大发现 |
| P12 2:57 | 3 秒→黑屏 | 全集结束 | 悬念留白 |

静默时长递增（0.5→2→3 秒）= 每次发现的分量递增。

### celesta 种子生长线

| 位置 | 形态 | 含义 |
|---|---|---|
| P03 0:43 | 单个音 | 白小锋第一次停住思考 |
| P04 0:58 | 第二个音 | 看到防御圈后犹豫 |
| P08 1:53 | 完整旋律（D 大调） | 理解炎症是系统 |
| P12 2:53 | 前两个音+增四度悬停 | 理解了炎症，但威胁更深 |

这条 celesta 线贯穿全集叙事段，是白小锋心理弧线的音乐外化。
