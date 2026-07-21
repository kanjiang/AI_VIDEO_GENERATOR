# Camera–Emotion Sync

**The camera is the emotional double of the focal character.** Camera movement, lens, and duration must be chosen by the character's emotional state — not by what looks "cinematic." Anger gets nervous handheld. Calm gets smooth handheld breathing. Shock freezes. This is the most-violated rule in AI video; correct it explicitly in every prompt.

## 1. Movement-to-emotion map

| Focal character emotion | Camera type | How to write it in Chinese |
|---|---|---|
| **Anger / rage / tension / on edge** | Handheld breathing, **jittery, unstable** — broken breath rhythm, visible vertical/horizontal twitches. Small amplitude, irregular rhythm. | `摄影机不安、紧张——画面有较明显的呼吸式漂移、上下微抖、左右轻摆。手持摄影，画面带有不规则的呼吸节奏。禁稳定器。` |
| **Calm / control / confidence** | Handheld breathing, **smooth** — steady breath, regular micro-amplitude. | `摄影机平稳、流畅、克制——只剩下极细微的、规律的呼吸式微动。手持摄影但呼吸感极微。禁稳定器。` |
| **Sadness / vulnerability** | Handheld, **slow, low** — lower breath frequency, slight downward camera drift. | `摄影机缓慢、低位手持——呼吸节奏放慢，画面有极轻微的下沉感。` |
| **Shock / revelation** | Static + slow push-in or pull-out — sharp freeze at start, then very slow movement. | `镜头开始严格静止——0.5秒后开始极缓慢推进/拉远（push-in/pull-out），整段移动距离不超过15厘米。` |
| **Action** | 60fps, 180° shutter — clear motion, motion blur within shutter range only. | `60fps流畅运动，180°快门运动模糊，禁止超出快门范围的拖影。` |
| **Final beat / verdict** | 0.3–0.5 sec top-shot freeze — directly from above, time stops. | `严格正上方俯拍（top-shot）。0.3-0.5秒freeze frame。所有人物位置冻结。时间静止。` |

## 2. Emotional arcs within a single shot

If emotion **changes** across one continuous take (e.g., Roko goes from rage → controlled), the camera changes synchronously. Write it explicitly in phases:

```
⚠️镜头开始（步骤①②阶段，Roko怒气）：摄影机⚠️明显手持、不安、紧张——画面有明显的呼吸式漂移、上下微抖、左右轻摆。

⚠️随Roko情绪逐步缓和（步骤③④⑤）：摄影机的不安⚠️逐渐减弱——呼吸式漂移幅度变小，左右晃动减少，画面开始稳定。

⚠️镜头结尾（步骤⑥⑦，Roko稳定）：摄影机⚠️变得平稳、流畅、克制——只剩下极细微的、规律的呼吸式微动。
```

Tie each camera phase to a numbered acting beat (① ② ③ ...) so the model knows when in the take to transition.

## 3. Lens selection

| Use | Lens | Aperture |
|---|---|---|
| Extreme tight emotional close-up (forehead-to-chin fills frame) | **85mm** or **100mm** | F1.4 |
| Mid dialogue, two-shot | **50mm** | F2.0 – F2.8 |
| Wide / establishing | **35mm** | F4 – F5.6 |
| Insert / detail of object | **50mm** or **85mm** with focus lock on object | F1.4 |
| Macro (pores, droplets, fabric) | **45mm macro** | F2.8 |

**Forbid optical distortion** in every prompt that uses a wide or fast lens:
```
禁桶形畸变、禁枕形畸变、禁鱼眼效果、禁广角变形，画面线条必须笔直，构图平整。
```

**Bokeh / shallow DOF** for tight inserts and emotional close-ups — use F1.4 and lock focus:
```
⚠️焦平面严格锁定在 [object/character] 上——绝对禁止焦点漂移、绝对禁止 rack focus、绝对禁止 autofocus 跳变。
```

## 4. Dolly / track moves

For very slow dolly (insert / device close-up), specify **exact distance and time**:
```
整个7秒内摄影机后移总距离仅约10-15厘米。速度慢到几乎察觉不到。禁zoom变焦，禁突然推拉。
```

Never write `zoom`. Always write physical camera movement (`dolly`, `track`, `crane`, `push-in`, `pull-out`).

## 5. Shot duration rules

| Shot type | Duration |
|---|---|
| Hard cut intro / flash establishing (split-second wide) | **0.3 – 0.5 sec** (a fraction of a second, NOT 1 second) |
| One dialogue line, mid-length | **3 – 7 sec** |
| Reaction without words (with emotional arc) | **5 – 10 sec** |
| Insert / wide / freeze | **0.3 – 2 sec** |
| Emotional close-up with full arc (5–7 numbered beats) | **8 – 15 sec** |

The full prompt envelope is 15 seconds. Divide internally for multi-shot prompts using these durations.

## 6. Common patterns — copy-paste templates

### 6.1 Extreme tight close-up of dialogue (85mm, F1.4)

```
机位：⚠️85mm（或100mm）长焦，⚠️F1.4极浅景深，⚠️[Character]⚠️严格的极致大特写（strictly extreme tight close-up）——构图严格"额头到下巴填满画幅"，[Character]的脸⚠️必须占据画面绝大部分。
⚠️⚠️⚠️摄影机⚠️严格手持，全程明显的呼吸式漂移和微动——⚠️真实摄影师贴身跟拍的呼吸感、心跳感。⚠️摄影机⚠️主动跟随[Character]的脸部运动——头部任何细微的转动、抬起、下沉、目光移动，摄影机都微微跟随调整构图。
摄影机位置：[east/west/south/north of character].
背景：⚠️完全虚化为模糊色块和柔光斑——所有细节都强烈散焦。
动作：[step-by-step micro-beats].
⚠️⚠️⚠️微表演细节（actor performance micro-beats）：
- ...
```

### 6.2 Insert on prop (focus-locked)

```
机位：50mm/85mm 大光圈定焦，⚠️F1.4极浅景深，⚠️焦平面从镜头第1帧到最后1帧严格锁定在[object]上——绝对禁止焦点漂移、rack focus、autofocus跳变。
⚠️清晰度规则：画面中⚠️只有[object]绝对清晰锐利，所有其他元素强烈散焦虚化为模糊色块和柔光斑（heavy bokeh）——背景永远模糊。
摄影机[angle].⚠️⚠️⚠️dolly out运动幅度极小：整个X秒内总位移仅约10-15厘米——速度慢到几乎察觉不到。禁zoom，禁突然推拉。
```

### 6.3 Wide / establishing flash (split-second)

```
机位：35mm广角，全景/远景（wide shot / establishing shot）。⚠️持续时间⚠️严格约0.3-0.5秒（split-second flash establishing shot——只是瞬间空间定位的闪现，不是完整构图镜头）。整体空间构图——[positions of all key elements].
动作：[moment]——⚠️0.3-0.5秒后⚠️立刻硬切（hard cut）到镜头2——无过渡、无淡出、无停留。
```

### 6.4 Top-shot freeze finale

```
【镜头 N (last)】
机位：严格正上方俯拍（top-shot）。0.3-0.5秒freeze frame。
背景：严格匹配[location].
动作：所有人物位置冻结。时间静止。
```

## 7. Forbidden moves

- `禁zoom变焦` — physical camera movement only. **Exception:** dolly zoom (§8.6) deliberately combines dolly + zoom for the vertigo effect — declare the exception explicitly in the prompt.
- `禁稳定器` — applies specifically to **handheld emotional shots** (§1, §6.1). Stabilizer / gimbal is correct and expected for lateral tracking (§8.3), orbit (§8.5), and aerial shots (§8.2). Do not blindly paste `禁稳定器` into tracking or drone prompts.
- `禁抖动（除手持呼吸感）` — no shake outside of intentional handheld breathing
- `禁过度运动` — don't oversell the camera move; if the script is intimate, the camera is intimate

---

## 8. Advanced camera movement patterns (高级运镜模式)

These are **movement choreography templates** — specific camera move recipes for specific visual effects. They complement the emotion-camera sync rules in §1–§6. Each pattern includes a Chinese prompt template, key parameters, and failure modes.

### When to use advanced patterns

Use these when the scene's visual intent is driven by the **camera's own journey through space**, not just by the focal character's emotion. Typical triggers:

- The scene needs spatial scale (aerial, rush-through, orbit)
- The script calls for a specific visual device (dolly zoom, rack focus, lateral reveal)
- The scene is more about environment or movement than intimate emotional performance

For scenes where the camera's job is to mirror the character's inner state, stay in §1–§6. For scenes where the camera IS the storytelling device, use §8.

### 8.1 Rush Zoom Push-In (极速推进)

High-speed forward charge through a space, ending on a subject. Creates urgency, discovery, or dramatic arrival.

**When to use:** discovering a character in a large space, dramatic reveal, time-pressure scenes, opening hooks.

Template:
```
机位：[24mm/28mm/35mm]广角镜头，起始远景。
摄影机运动：⚠️极速直线推进（rush dolly-in）——摄影机从[起始位置描述]高速冲刺向前，穿过[空间通道/障碍物描述]，速度从[起步速度]逐渐[加速/减速]。
轨迹：沿[空间中线/通道/走廊]直线推进约[距离]米，⚠️允许轻微水平摇摆模拟穿行不稳定感。
终点：推进至[主体]的[景别]——从远景环境⚠️连续不切地过渡到[中景/近景/特写]。
速度曲线：[匀速冲刺 / 先慢后快加速冲刺 / 先快后慢减速落点]。
⚠️全程单镜头连续推进，禁止中途硬切、禁止跳帧、禁止瞬移。
```

Example — library rush:
```
机位：28mm广角镜头，起始远景。
摄影机运动：⚠️极速直线推进（rush dolly-in）——摄影机从图书馆入口高速冲刺向前，穿过两排木质书架形成的狭长通道，速度从中速逐渐加速。允许轻微水平摇摆模拟穿行不稳定感，书架两侧快速后退产生强烈透视拉伸。
终点：推进至窗边阅读的年轻女生的中近景——暖黄窗光从侧面打亮她翻书的手和侧脸。
速度曲线：先慢后快加速冲刺，最后1.5秒急速减速稳定落在女生面部。
⚠️全程单镜头连续推进，禁止中途硬切。
```

Key parameters:
- **起始镜头**: 广角（24–35mm），起点必须交代空间全貌
- **速度曲线**: 必须声明加减速节奏，否则 AI 默认匀速会显得机械
- **轻微摇摆**: 加入 `轻微水平摇摆` 增加真实感，但控制幅度避免晕眩
- **终点景别**: 明确最终落在什么景别，不能只说"推进到人物"

Failure modes:
- `⚠️禁止中途硬切或跳帧——全程连续推进`
- `⚠️禁止推进过程中主体消失或遮挡——通道两侧障碍物不得完全遮挡终点主体视线`
- `禁桶形畸变、禁鱼眼效果` (wide lens distortion control)

### 8.2 Aerial Continuous Dive (一镜到底航拍俯冲)

Single-take aerial shot from high altitude descending to ground level, revealing a subject. Creates epic scale, geographic context, and dramatic compression of distance.

**When to use:** opening establishing shots, location transitions, showing a character's isolation or immersion in a city/landscape, epic reveals.

Template:
```
机位：[24mm/28mm]广角航拍镜头，起始鸟瞰俯视。
摄影机运动：⚠️一镜到底航拍俯冲（continuous aerial dive）——无人机/航拍从[起始高度]开始：
阶段1（0-[X]秒）：[起始高度]高空俯视，镜头垂直向下，[城市/地形]全景铺展。
阶段2（[X]-[Y]秒）：穿越[云层/建筑群顶部]，镜头角度从垂直俯视逐渐倾斜为斜俯视45°。
阶段3（[Y]-[Z]秒）：低空掠过[建筑/街道/树冠]，接近地面高度，镜头接近水平。
阶段4（[Z]-[END]秒）：稳定在[终点高度]，锁定[主体]的[景别]。
⚠️全程单镜头连续不切，高度从[起始]米平滑下降到[终点]米，禁止空间跳变。
⚠️透视随高度连续变化——高空时地面细节小而密，低空时建筑和人物逐渐放大充满画面。
```

Example — city dive to café:
```
机位：24mm广角航拍镜头，起始鸟瞰俯视。
摄影机运动：⚠️一镜到底航拍俯冲——
阶段1（0-3秒）：500米高空垂直俯视，城市天际线和街道网格铺展，薄云层在画面边缘飘过。
阶段2（3-6秒）：穿越薄云层，镜头角度从垂直俯视倾斜为斜俯视45°，高层建筑玻璃幕墙反射日光。
阶段3（6-9秒）：低空20米掠过街道，行道树和行人快速后退，镜头锁定目标街区咖啡馆招牌。
阶段4（9-12秒）：稳定在窗外3米高度，透过落地窗看到窗边女生端着咖啡杯阅读，暖光从室内灯具投射在她脸上。
⚠️全程单镜头连续不切，高度从500米平滑下降到3米。
```

Key parameters:
- **阶段划分**: 必须按高度层划分阶段并声明秒数分配
- **镜头角度变化**: 从垂直俯视到斜俯视到接近水平，角度渐变必须声明
- **透视连续性**: 高空小、低空大的比例关系必须提示
- **终点锁定**: 最终落在什么高度、什么景别、主体是谁

Failure modes:
- `⚠️禁止空间跳变——高度下降必须连续，不能从高空直接跳到地面`
- `⚠️禁止地面细节在高空阶段过早出现——高空时只能看到城市轮廓`
- `⚠️禁止镜头角度突变——从俯视到水平的倾斜过程必须渐进`

### 8.3 Lateral Tracking (水平横移跟拍)

Smooth stabilizer/gimbal side-tracking parallel to a subject's movement path. Camera moves horizontally while maintaining consistent distance and framing.

**When to use:** walking-and-talking, gallery/corridor reveals, parallel movement, establishing a character in motion within an environment.

Template:
```
机位：[35mm/50mm]镜头，[全景/中景/中近景]。
摄影机运动：⚠️稳定器水平横移跟拍（lateral tracking）——摄影机在[主体]的[左侧/右侧]约[距离]米处，与[主体]保持平行，沿[方向]稳定横移。
移动速度：匹配[主体]的[行走/跑步/缓步]速度，⚠️保持主体在画面[中央/三分线/偏左/偏右]位置不变。
稳定性：⚠️gimbal稳定器平滑运动，无手持呼吸感，画面水平线严格水平。
前景遮挡：[描述前景元素的间歇性遮挡——柱子、窗框、展品等周期性划过画面前景]。
背景流动：[背景元素连续水平后退，提供运动感]。
```

Example — art gallery:
```
机位：50mm镜头，中景。
摄影机运动：⚠️稳定器水平横移跟拍——摄影机在女生右侧约2米处，与她保持平行，沿美术馆长廊从西向东稳定横移。
移动速度：匹配女生缓步行走速度，⚠️保持她在画面左三分线位置不变，右侧2/3画面留出长廊纵深。
稳定性：⚠️gimbal平滑运动，无手持抖动，画面水平线严格水平。
前景遮挡：白色展柱每隔3-4秒从画面左缘划入划出，形成规律的节奏感遮挡。
背景流动：墙上画作依次向左流过，暖白漫射光从天窗均匀洒下。
```

Key parameters:
- **跟拍距离**: 摄影机与主体的横向距离（影响景别和空间感）
- **主体画面位置**: 明确锁定在三分线还是居中
- **前景遮挡节奏**: 走廊柱子或展品的间歇性遮挡增加层次
- **速度匹配**: 必须声明"匹配主体速度"，否则 AI 可能让摄影机和人物脱节

Failure modes:
- `⚠️主体在画面中的位置保持固定——禁止主体在画面中前后飘移`
- `⚠️摄影机与主体距离保持恒定——禁止横移过程中距离忽近忽远`
- `⚠️画面水平线严格水平——禁止横移过程中画面倾斜`

### 8.4 Over-the-Shoulder Rack Focus (过肩跟焦)

Camera positioned behind one character's shoulder, with controlled focus pull between the foreground character and the background subject. Creates intimacy, voyeuristic perspective, and relational tension.

**When to use:** two-character scenes with power dynamics, observation/surveillance, romantic gaze, dialogue with emotional subtext.

Template:
```
机位：[50mm/85mm]镜头，⚠️F[1.4/2.0]浅景深，过肩镜头（OTS）。
摄影机位置：⚠️在[前景角色]的[左肩/右肩]后方约[距离]厘米处，[前景角色]的肩部和头部边缘占据画面[左/右]侧约[比例]。
焦点控制：
初始焦点：锁定在[前景角色/背景角色]上——[另一方]处于散焦虚化状态。
跟焦时机：在[触发动作/时间点]时，焦点从[A]⚠️缓慢/快速拉到[B]，转焦时间约[X]秒。
⚠️焦点转换期间画面保持完全静止——禁止跟焦同时推拉摄影机。
[前景角色]的肩部/后脑始终保持在画面边缘作为框架元素。
```

Example — lakeside pavilion:
```
机位：85mm镜头，⚠️F1.4极浅景深，过肩镜头（OTS）。
摄影机位置：⚠️在男性角色的右肩后方约30厘米处，他的肩膀和后脑右侧占据画面左1/4，前景虚化为暗色轮廓。
焦点控制：
初始焦点：锁定在对面3米处的女生——她临水而坐，古风裙摆自然垂落水面边缘，柔和自然光从水面反射打亮她的下颌和颈部。
（4秒处）女生抬头微笑，焦点⚠️缓慢从女生拉向前景男性角色的后脑侧面轮廓，转焦时间约1.5秒，女生逐渐散焦为柔和光斑。
（6秒处）焦点⚠️再次拉回女生——她已经低头继续看书，焦点稳定锁定。
⚠️全程摄影机位置固定不动——只有焦点在前后景之间转换。
```

Key parameters:
- **前景占比**: 前景角色在画面中占多少（通常1/4–1/3），虚化程度
- **焦点转换触发**: 什么动作或时间点触发 rack focus
- **转焦速度**: 缓慢（1–2秒）制造悬念，快速（0.3–0.5秒）制造惊讶
- **摄影机运动**: 过肩跟焦通常搭配固定机位，声明 `⚠️摄影机位置固定不动`

Failure modes:
- `⚠️禁止跟焦同时移动摄影机——摄影机位置固定，只有焦点移动`
- `⚠️前景角色轮廓必须始终在画面边缘——禁止前景角色消失或完全移出画面`
- `⚠️焦点转换必须平滑渐变——禁止焦点瞬间跳变`

### 8.5 360° Orbit (360° 环绕)

Camera orbits around a subject in a complete or partial circle, maintaining consistent distance and height. Creates visual spectacle, emphasizes the subject as center, and reveals the surrounding environment progressively.

**When to use:** hero moments, dramatic emphasis, revealing environment around a character, dance/performance sequences, climactic scenes.

Template:
```
机位：[35mm/50mm]镜头，[中景/中近景]。
摄影机运动：⚠️无人机/稳定器360°环绕跟拍（orbit shot）——摄影机以[主体]为圆心，在半径约[距离]米处，从[起始方位]开始，沿[顺时针/逆时针]方向环绕[角度]°。
环绕高度：摄影机位于[主体]的[平视/略高于/略低于]高度，[高度差]。
环绕速度：[匀速/渐快/渐慢]，完成[角度]°环绕用时约[X]秒。
主体锁定：⚠️主体始终位于画面中心——摄影机在环绕过程中持续朝向圆心。
背景旋转：环境背景随环绕连续旋转流过——[描述不同方位看到的背景变化]。
```

Example — lotus pond pavilion:
```
机位：50mm镜头，中近景。
摄影机运动：⚠️无人机360°环绕跟拍——摄影机以持荷花的女生为圆心，在半径约3米处，从她正面（南侧）开始，沿顺时针方向环绕360°。
环绕高度：摄影机略高于女生头顶约0.5米，轻微俯视角度。
环绕速度：匀速，完成360°环绕用时约10秒，最后2秒减速落在起始正面方位。
主体锁定：⚠️女生始终位于画面中心——手持荷花的姿势贯穿全程，裙摆随微风轻摆。
背景旋转：
0°-90°（南→西）：荷塘水面，睡莲叶铺展，金橙夕光在水面闪烁。
90°-180°（西→北）：亭台木质廊柱划入画面，暖光从廊灯投射。
180°-270°（北→东）：远山轮廓和柳树剪影。
270°-360°（东→南）：回到荷塘水面开阔视野，回到起始构图。
⚠️全程连续环绕不切，禁止跳帧或方位跳变。
```

Key parameters:
- **环绕圆心**: 明确圆心是谁/什么
- **环绕半径**: 距离影响景别，2–3米紧密，5–10米开阔
- **环绕角度**: 完整360°还是部分弧度（90°/180°/270°）
- **环绕高度**: 平视、俯视、仰视——影响视觉权力关系
- **背景分段描述**: 按方位角描述不同方向看到的背景，这是 AI 容易丢失的信息

Failure modes:
- `⚠️主体始终位于画面中心——禁止主体在环绕过程中偏移画面边缘`
- `⚠️环绕半径保持恒定——禁止忽近忽远`
- `⚠️背景连续旋转——禁止背景在不同方位出现相同内容（空间不重复）`
- `⚠️禁止环绕过程中主体身份漂移——面部、服装、道具全程一致`

### 8.6 Dolly Zoom / Vertigo Effect (希区柯克推拉变焦)

Simultaneous physical camera dolly + optical zoom in opposite directions, creating the signature "background stretches while subject stays the same size" vertigo effect. Subject maintains consistent frame size while the spatial relationship between subject and background compresses or expands.

**When to use:** psychological unease, sudden realization, horror/dread, disorientation, dramatic revelation, power shifts.

**⚠️ Exception to `禁zoom变焦` rule:** this is the ONE pattern where zoom is deliberately combined with dolly — declare the exception explicitly.

Template:
```
机位：[35mm→70mm / 70mm→35mm]变焦镜头。
摄影机运动：⚠️希区柯克推拉变焦（dolly zoom / vertigo shot）——
⚠️例外规则：本镜头有意使用dolly+zoom组合制造眩晕效果，不适用常规「禁zoom变焦」规则。
方向：[dolly-in + zoom-out（背景膨胀） / dolly-out + zoom-in（背景压缩）]。
执行：摄影机从[起始位置]向[前/后]物理移动约[距离]米，同时镜头焦距从[起始mm]连续变化到[终点mm]。
⚠️主体画面大小保持恒定——[主体]在画面中的占比从第一帧到最后一帧⚠️不变，但背景空间感发生剧烈变化。
速度：[缓慢渐进（心理压迫） / 中速（不安感） / 快速（惊吓）]，用时约[X]秒。
```

Example — mirror hall masquerade:
```
机位：35mm→85mm变焦镜头。
摄影机运动：⚠️希区柯克推拉变焦——
⚠️例外规则：本镜头有意使用dolly+zoom组合制造眩晕效果。
方向：dolly-in + zoom-out——摄影机向假面女性物理推进约4米，同时镜头从35mm连续变焦到85mm。
⚠️女性在画面中的大小保持恒定（始终中景半身），但背景镜厅空间⚠️剧烈膨胀——镜面走廊在她身后像被拉伸一样无限延伸，吊灯光点散开变大。
速度：缓慢渐进，用时6秒，制造持续的心理不安。
终点：焦距到达85mm时停止——女性面部假面纹理清晰，背景镜厅已膨胀至超现实纵深。
```

Key parameters:
- **方向**: dolly-in + zoom-out = 背景膨胀（经典恐惧感）；dolly-out + zoom-in = 背景压缩（隧道感）
- **焦距范围**: 起止焦距必须声明（如 35mm→85mm），幅度越大效果越剧烈
- **主体尺寸恒定**: 这是 vertigo 效果的核心——主体大小不变，背景变形
- **速度**: 慢速=心理压迫，快速=惊吓冲击

Failure modes:
- `⚠️主体在画面中的大小必须保持恒定——这是dolly zoom的核心效果，禁止主体忽大忽小`
- `⚠️背景空间感必须发生可见变化——如果背景不变形，效果失败`
- `⚠️禁止简单推拉代替dolly zoom——必须是物理移动+光学变焦同时反向执行`

## 9. Selecting the right pattern

Quick decision guide — match scene intent to camera pattern:

| Scene intent | Primary pattern | Section |
|---|---|---|
| Mirror character's emotion | Emotion-camera sync | §1–§2 |
| Intimate dialogue performance | Tight close-up 85mm | §6.1 |
| Prop detail / insert | Focus-locked insert | §6.2 |
| Flash spatial context | Establishing flash | §6.3 |
| Dramatic arrival / discovery | Rush zoom push-in | §8.1 |
| Epic scale / location reveal | Aerial continuous dive | §8.2 |
| Character in motion through space | Lateral tracking | §8.3 |
| Two-character gaze / power dynamic | OTS rack focus | §8.4 |
| Hero moment / spectacle emphasis | 360° orbit | §8.5 |
| Psychological unease / revelation | Dolly zoom vertigo | §8.6 |
| Time-stop verdict | Top-shot freeze | §6.4 |

These patterns can combine: an aerial dive (§8.2) can end with a lateral track (§8.3) if the camera descends then transitions to a ground-level follow. Declare the transition point explicitly with phase labels.
