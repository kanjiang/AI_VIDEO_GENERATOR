# Composition Library (构图词库)

**先选意图：** [COMPOSITION_CORE.md](COMPOSITION_CORE.md)（7 大技巧速查：焦点 / 三分 / 三角 / 引导线 / 负空间 / 平衡 / 框中框）。  
本文提供可粘贴句式编号；CORE 决定「为什么这样构图」。

A reusable library of framing and composition patterns for AI video/image prompts. Organized by **narrative function** — pick the function you need, then select a composition.

Works with `BATCH_MODE.md`: each entry here can be used as a composition shorthand in the variable module `⑦ 构图句式`.

**⚠️ Crowd mount gate:** Any recipe that uses 人群 / extras / soldiers / audience **requires** a mounted crowd asset (`@议事人群=` / `@会议观众=` / `@保安=` etc.) or an explicit empty-frame ban. See [PROMPT_PATTERNS.md Section 9](PROMPT_PATTERNS.md). Do not invent atmosphere people to satisfy a composition recipe.

---

## Composition Pressure System (构图压力系统)

**Before picking a composition pattern from the categories below, first answer this question: what is the spatial/relational PRESSURE in this scene?**

Traditional composition libraries organize by technique (symmetry, rule-of-thirds, diagonal...). This section organizes by the **narrative pressure** between characters and their space. The pressure determines the technique — not the other way around.

### Step 1 — Identify the pressure type

| Pressure type | When it applies | Core question |
|---|---|---|
| **CP-A 被观察** | Secrets, surveillance, late arrival, identity mismatch | 谁在偷看谁？观众拥有多少信息？ |
| **CP-B 被困住** | Institutions, fate, psychological closure, ritual | 什么空间结构在限制人物？ |
| **CP-C 关系疏离** | Family, intimacy, negotiation, farewell | 两人之间的空间在说什么？ |
| **CP-D 权力不对等** | Trial, ceremony, war, political/religious space | 谁/什么比人物更有权力？ |
| **CP-E 心理失衡** | Discovery, illusion, fear, memory fracture | 人物的位置是否"不对劲"？ |
| **CP-F 事后状态** | Event just ended, someone left, secret happened | 谁不在了？留下了什么？ |
| **CP-G 感官插入** | Decision, hesitation, danger threshold | 哪个身体局部最能传递此刻？ |

### Step 2 — Apply the pressure's composition methods

#### CP-A 被观察 (Being Watched)

场景：秘密、监视、迟到、身份错位。

```
构图方法：
- 隔着玻璃、门缝、帘幕或**已挂载人群**拍摄——观众不拥有完整信息（无挂载则改用玻璃/门缝/帘幕，禁脑补人群）
- 前景观察者只出现肩部/头部/模糊轮廓（参考 CAMERA_EMOTION §8.4 OTS）
- 关键动作在中远景发生
- ⚠️摄影机位置必须有理由——"为什么从这里偷看？"

中文 prompt 句式：
隔着[玻璃/门缝/帘幕/已挂载人群]观察，前景[观察者肩部/帘幕边缘]虚化遮挡，焦点落在中景[主体动作]上，观众视角受限。
```

#### CP-B 被困住 (Trapped / Confined)

场景：制度、命运、心理封闭、仪式压力。

```
构图方法：
- 几何边界（桌面、走廊、门洞、座椅）将人物压在画面局部
- 极端俯拍或高位观察
- 人物尺度明显小于空间
- 空间秩序完整，但人物位置出现一处偏差

中文 prompt 句式：
[空间结构]将人物限制在画面[位置]，[建筑/家具/制度空间]的几何线条包围人物，人物占画面≤1/4。
```

#### CP-C 关系疏离 (Relational Distance)

场景：家庭、亲密关系、谈判、诀别。

```
构图方法：
- 两人之间保留大面积空桌、床、走廊、地面或玻璃
- 视线不相遇
- 一人在亮区，一人在暗区（但不要戏剧化打光）
- 让空间物件成为"第三方"

中文 prompt 句式：
[角色A]在画面[左/右]侧，[角色B]在画面[另一侧]，两人之间隔着[空桌/长廊/玻璃]，视线不交汇，中间的[物件]成为无声的第三方。
```

#### CP-D 权力不对等 (Power Imbalance)

场景：审判、仪式、战争、组织、政治与宗教空间。

```
构图方法：
- 低机位仰拍或高位俯视（必须有现实摄影机位置）
- 巨大墙面、台阶、门、屏幕或**已挂载人群**控制人物视觉比例（无挂载人群时用建筑/道具尺度，禁脑补列队）
- 权力者不一定最大——空间可以为其背书

中文 prompt 句式：
低角度仰拍，[权力象征物——巨墙/台阶/旗帜/门]占据画面上方2/3，人物在下方被空间尺度压制。
```

#### CP-E 心理失衡 (Psychological Imbalance)

场景：发现、错觉、恐惧、记忆断裂。

```
构图方法：
- 人物贴画面边缘（不居中）
- 头顶空间过多（headroom失衡）
- 轻微画面倾斜（Dutch angle 5-15°，不超过15°）
- ⚠️焦点落在背景而非人物——人物失焦，背景清晰

中文 prompt 句式：
人物偏置画面[极边缘]，头顶留有异常大的空间，画面轻微[倾斜/不稳]，⚠️焦点落在[背景元素]上而非人物面部——人物处于轻微失焦状态。
```

#### CP-F 事后状态 (Aftermath)

场景：事件刚结束、某人已经离开、秘密已发生。

```
构图方法：
- 人物缺席——空椅、湿地、开着的门、未熄灭的灯、遗留衣物或错位物件
- 镜头保持克制，不拍"解释性证据墙"
- ⚠️画面中最重要的是"不在的东西"

中文 prompt 句式：
[空间]中人物已经离开——[空椅/开着的门/未熄灭的灯/遗留的物品]暗示刚刚发生的事件。镜头静止，不解释，只展示。
```

#### CP-G 感官插入 (Sensory Insert)

场景：决定、犹豫、危险临界点。

```
构图方法：
- 嘴、手、后颈、鞋、湿发、衣料、钥匙、纸张等局部
- 隐藏人物身份与空间全貌
- ⚠️动作停在完成之前（与 CAMERA_EMOTION §0.1 前一秒美学配合）

中文 prompt 句式：
极近特写，只展示[手指/后颈/鞋尖/衣料边缘]——隐藏人物身份和空间全貌。动作停在完成之前：[手指即将触碰/嘴唇即将说出/钥匙即将转动]。
```

### Step 3 — Define Visual Traffic (视线流量)

**After selecting a pressure type and composition method, write a one-sentence "visual traffic" path before finalizing the shot.**

Visual traffic = the path the audience's eye travels through the frame. If you can't describe this path in one sentence, the composition is just element stacking.

Format:
```
视线从[A入口]进入 → 被[B减速/遮挡]放慢 → 落到[C决定性信息] → 被[D余韵]带走。
```

Examples:
```
视线从左侧明亮窗光进入 → 被前景虚化的椅背放慢 → 落到中景女人低垂的手 → 被右侧暗处未关的门带走。

视线从上方巨大的法院天花板进入 → 被中景的法官席横线阻断 → 落到下方被告席中唯一站着的人 → 被她手中攥紧的纸带走。

视线从前景快速划过的竹叶进入 → 被中景静止的剑客身影减速 → 落到剑刃上一条细窄的月光 → 被远景竹林深处的黑暗带走。
```

**Rules:**
- A (入口): Usually the brightest, largest, or most contrasty element
- B (减速): A foreground/midground element that forces the eye to slow down — this creates the "cinematic breath"
- C (落点): The narrative payload — what the audience is supposed to read/feel
- D (余韵): Where the eye exits, leaving an unanswered question or lingering mood

**In the prompt, translate the traffic into spatial language:**
```
⚠️视线流量：观众第一眼看[A]→ 视线被[B]放慢 → 落到[C] → 最终被[D]引向画外。
构图服务于此流量——[A]必须是画面中最亮/最大的元素，[C]必须是叙事锚点。
```

**Anti-pattern:** If three consecutive shots in a sequence all have the same traffic pattern (e.g., all enter from top-left and exit bottom-right), the sequence feels mechanical. Vary the entry/exit points across shots.

---

## Universal prompt formula

```
镜头类型 + 景别 + 构图方式 + 人物主体 + 环境光影 + 画面质感 + 风格限定
```

Example:

```
特写镜头，对角线构图，[人物描述]，[光影描述]，[风格后缀]
```

The **composition** (构图方式) is the variable slot from this library. Everything else comes from other modules (character base, style block, etc.).

---

## Category 1 — Emotion Close-ups (人物情绪特写)

For inner monologue, micro-expressions, emotional beats.

| ID | Composition | Chinese prompt phrase | Emotional register |
|---|---|---|---|
| EC-01 | Center symmetric close-up | `中心对称特写构图，人脸居中，强化情绪冲击` | Direct confrontation, intensity |
| EC-02 | Partial close-up (eyes) | `局部特写构图，聚焦眉眼，留白构图` | Subtle emotion, anticipation |
| EC-03 | Partial close-up (lips) | `局部特写构图，聚焦嘴唇，留白构图` | Desire, hesitation, unspoken words |
| EC-04 | Partial close-up (hands) | `局部特写构图，聚焦手部动作，留白构图` | Tension, tenderness, decision |
| EC-05 | Partial close-up (tears) | `局部特写构图，泪珠特写，浅景深虚化` | Grief, release, vulnerability |
| EC-06 | Diagonal close-up | `对角线特写，侧脸斜切画面，破碎伤感氛围` | Melancholy, fracture, unease |
| EC-07 | Frame-within-frame close-up | `框式特写，窗户/镜框/发丝框住面部，聚焦人物` | Isolation, introspection, trapped |
| EC-08 | Shallow DOF close-up | `浅景深虚化特写，背景模糊，突出五官神态` | Intimacy, dreamlike, focus |
| EC-09 | Extreme close-up (pores/texture) | `极近特写，皮肤纹理可见，85mm微距质感` | Raw emotion, hyperreal |
| EC-10 | Split-light close-up | `侧光分割面部，半明半暗，内心矛盾` | Moral conflict, duality |

**Reusable phrase template:**

```
特写镜头，[EC-XX构图]，聚焦人物面部微表情，背景虚化，[情绪词]氛围感
```

---

## Category 2 — Full-body Action (人物全身动作)

For combat, running, physical performance, power dynamics.

| ID | Composition | Chinese prompt phrase | Emotional register |
|---|---|---|---|
| FA-01 | Low-angle upshot | `低角度仰拍构图，拉长身形，凸显强大气场` | Power, defiance, heroism |
| FA-02 | High-angle downshot | `高角度俯拍构图，人物渺小，无助孤独感` | Vulnerability, helplessness |
| FA-03 | Diagonal dynamic | `对角线动态构图，动作斜跨画面，动感拉满` | Speed, combat, energy |
| FA-04 | Rule-of-thirds placement | `三分线人物构图，人物落在黄金分割点，画面平衡` | Balance, narrative composure |
| FA-05 | S-curve pose | `S曲线构图，人物站姿侧身曲线，温柔氛围` | Grace, femininity, calm strength |
| FA-06 | Leaning forward charge | `前倾冲锋构图，重心前移，速度线延伸` | Determination, attack, urgency |
| FA-07 | Falling/floating | `失重悬浮构图，人物下坠/漂浮，衣物头发飘散` | Loss of control, transcendence |
| FA-08 | Landing impact | `着地冲击构图，低角度仰拍，地面碎裂/尘土飞溅` | Force, arrival, dominance |
| FA-09 | Back-turned departure | `背影远行构图，人物背对镜头走向远方` | Farewell, resolve, loneliness |
| FA-10 | Spinning/twisting | `旋转动态构图，人物身体扭转，动态模糊，环绕运动线` | Combat skill, dance, chaos |

**Reusable phrase template:**

```
全身镜头，[FA-XX构图]，人物动态姿势，肢体舒展，动态模糊，强运动张力
```

---

## Category 3 — Two-person Interaction (双人互动)

For dialogue, romance, confrontation, relationships.

| ID | Composition | Chinese prompt phrase | Emotional register |
|---|---|---|---|
| TP-01 | Symmetric split | `对称对分构图，左右各一人，对峙/平等对话` | Confrontation, equality, stalemate |
| TP-02 | Foreground/background layers | `前后层次构图，一人前景清晰，一人后景虚化，主次区分` | Power imbalance, observation |
| TP-03 | Embrace frame | `环抱框构图，一人身形环绕另一人，亲密感` | Romance, protection, tenderness |
| TP-04 | Offset triangle | `错位三角构图，两人+环境物体形成三角，稳定叙事` | Stable dialogue, narrative depth |
| TP-05 | Mirror/reflection | `镜像构图，水面/玻璃倒影双人，宿命感` | Fate, duality, connection |
| TP-06 | Over-the-shoulder | `过肩镜头，前景虚化肩膀轮廓，焦点对方面部` | Dialogue, intimacy, POV |
| TP-07 | Reaching/distance | `伸手未触构图，两人之间留有间距，手指将触未触` | Longing, almost-connection |
| TP-08 | Back-to-back | `背靠背构图，两人背向而立，各看不同方向` | Alliance with tension, divergence |
| TP-09 | Height difference | `身高差构图，一人仰视一人俯视，自然产生关系张力` | Dominance, protection, vulnerability |
| TP-10 | Overlapping silhouettes | `重叠剪影构图，两人轮廓叠在一起，逆光` | Merging, loss of boundaries |

**Reusable phrase template:**

```
双人镜头，[TP-XX构图]，两人肢体互动，人物眼神交汇，故事氛围感
```

---

## Category 4 — Scene Establishing & Transitions (大场景叙事)

For opening shots, transitions, environmental storytelling, mood.

| ID | Composition | Chinese prompt phrase | Emotional register |
|---|---|---|---|
| SE-01 | Deep perspective | `大全景纵深构图，道路/街道延伸线，纵深感` | Journey, departure, distance |
| SE-02 | Environmental frame | `框架环境构图，门洞/屋檐/树丛框住远处人物` | Discovery, framing within world |
| SE-03 | Negative space | `留白空镜构图，大面积天空/海面，少量人物` | Solitude, healing, contemplation |
| SE-04 | Leading lines | `引导线构图，铁轨/台阶/小路视线引向主角` | Destiny, direction, pull |
| SE-05 | Split plane | `分割画面构图，栏杆/墙体切割画面，隔阂分离` | Separation, barrier, two worlds |
| SE-06 | Bird's eye overview | `正上方俯瞰构图，场景全貌，人物极小` | Insignificance, pattern, fate |
| SE-07 | Horizon emphasis | `地平线构图，人物站在天地分界线，大面积天空` | Freedom, new beginning, vastness |
| SE-08 | Layered depth | `多层景深构图，前景道具+中景人物+后景环境` | Rich world, lived-in space |
| SE-09 | Doorway/threshold | `门口构图，人物站在门槛，一边旧世界一边新世界` | Choice, transition, crossing |
| SE-10 | Vanishing point | `消失点构图，所有线条汇聚画面深处一点` | Inevitable destination, tunnel |

**Reusable phrase template:**

```
全景镜头，[SE-XX构图]，开阔环境，远景人物，环境烘托情绪，转场镜头
```

---

## Category 5 — Creative / Atmosphere (氛围感特殊创意)

For flashbacks, dreams, psychological states, stylistic moments.

| ID | Composition | Chinese prompt phrase | Emotional register |
|---|---|---|---|
| CA-01 | Fragmented panel | `破碎分镜拼接构图，多格碎片画面，回忆闪回` | Memory, trauma, shattered |
| CA-02 | Fisheye distortion | `鱼眼畸变构图，扭曲画面，恐慌眩晕情绪` | Paranoia, disorientation |
| CA-03 | Backlit silhouette | `逆光剪影构图，人物只剩轮廓，朦胧氛围` | Mystery, anonymity, beauty |
| CA-04 | Repeated reflections | `重复镜像构图，多重倒影，内心挣扎` | Identity crisis, echo, recursion |
| CA-05 | Ceiling crush | `压顶构图，上方重物/云层挤压画面，压抑窒息` | Oppression, anxiety, weight |
| CA-06 | Dutch angle / tilt | `荷兰角倾斜构图，画面歪斜15-30°，不安失衡` | Unease, wrongness, instability |
| CA-07 | Double exposure | `双重曝光构图，两个画面叠透，内外世界交融` | Dream, subconscious, overlap |
| CA-08 | Vignette darkness | `暗角构图，画面四周暗化，中心人物发光` | Spotlight, isolation in darkness |
| CA-09 | Kaleidoscope / radial | `万花筒放射构图，画面从中心向外放射重复` | Psychedelic, overwhelm, euphoria |
| CA-10 | Blank / whiteout | `全白留白构图，人物在纯白空间中，极简` | Void, purity, loss, transition |

**Reusable phrase template:**

```
创意氛围感镜头，[CA-XX构图]，逆光剪影/碎片分镜，朦胧柔光，[情绪词]画面
```

---

## Modular word banks (自由组合组件)

These word banks can be freely combined with any composition above.

### Framing (景别)

| Chinese | English | Use |
|---|---|---|
| 极近特写 | Extreme close-up | Pores, texture, single eye |
| 特写 | Close-up | Face fills frame |
| 近景 | Medium close-up | Head and shoulders |
| 中近景 | Medium shot (tight) | Waist up |
| 中景 | Medium shot | Knees up |
| 半身 | Half body | Waist up, environment visible |
| 全身 | Full body | Head to toe |
| 远景 | Long shot | Full body + environment |
| 大全景 | Extreme long shot | Landscape dominant |
| 空镜 | Empty shot | Environment only, no character |

### Camera angle (镜头角度)

| Chinese | English | Emotional default |
|---|---|---|
| 平视 | Eye level | Neutral, equal |
| 低角度仰拍 | Low angle | Power, awe |
| 高角度俯拍 | High angle | Vulnerability, overview |
| 侧拍 | Side shot | Profile, movement |
| 侧逆光 | Side backlit | Mood, rim light |
| 正面 | Frontal | Confrontation, directness |
| 斜45°视角 | 3/4 angle | Natural, cinematic default |
| 背面视角 | Rear view | Mystery, departure |
| 正上方俯拍 | Top-down / bird's eye | Pattern, fate |

### Emotion keywords (情绪适配词)

| Chinese | Use case |
|---|---|
| 伤感 | Loss, farewell, grief |
| 治愈 | Recovery, warmth, comfort |
| 热血 | Combat, determination, triumph |
| 暧昧 | Romantic tension, unspoken attraction |
| 压抑 | Oppression, suffocation, repression |
| 温柔 | Tenderness, care, gentleness |
| 紧张 | Suspense, anxiety, danger |
| 孤独 | Isolation, solitude, longing |
| 宿命 | Destiny, inevitability, fate |
| 青春日常 | Slice of life, casual, youthful |

---

## Batch production shortcut

When producing a sequence of shots:

1. **Fix the style suffix** — set once, paste to all shots
2. **Pick compositions by scene type:**
   - Inner monologue → EC series (emotion close-ups)
   - Combat / action → FA series (full-body action)
   - Dialogue / romance → TP series (two-person)
   - Scene transitions → SE series (establishing)
   - Dreams / flashback → CA series (creative atmosphere)
3. **Only swap:** composition ID + character action + scene keywords
4. **Everything else stays fixed**

This reduces per-shot writing to ~1 minute for routine compositions.
