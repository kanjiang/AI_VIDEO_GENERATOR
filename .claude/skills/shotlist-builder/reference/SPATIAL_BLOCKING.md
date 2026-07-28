# Spatial Blocking — Top-Down Schema

**Rule:** before writing any prompt with 2+ characters, key props on a specific surface, or complex camera geometry — produce a top-down (bird's-eye) SVG schema and get user approval. AI video models hallucinate spatial relationships unless they're declared in absolute terms; the schema is how you lock blocking before the prompt is written.

## 1. When to draw a schema

Draw it for:
- Any scene with 2+ characters in the same location
- Any scene with a key prop on a specific surface (device, artifact, weapon, photo)
- Any scene where camera geometry matters (which shot from where)
- Any time the user requests a position change — redraw immediately

Skip it for:
- Single-character close-ups in a generic location
- Inserts/cutaways with no character relationship
- Pure environmental shots

## 2. What goes on the schema

- **Room/location outline** with labeled walls, tables, screens, bridges, etc.
- **Each character** as a colored circle with their initial (G, R, J, Re, etc.)
- **Eyeline arrow** from each character (where they're looking)
- **Props** as distinct icons (e.g., 📡 for the device, 📷 for camera-in-scene, 📄 for paper)
- **Distances** between key objects (~Xm)
- **Surface labels** (FL/FR/BL/BR — front-left, front-right, back-left, back-right, relative to a stated main view)
- **Main axis** (e.g., "north–south = entrance to screen") for orientation
- **Camera position(s)** for each shot in the scene — separate icon, labeled

## 3. How to render

Use `visualize:show_widget` with module `diagram`. Default viewBox: 900×720 (desktop). Use the dark theme tokens. Show character circles in the production palette (Roko = red, Gandelfina = gold, etc. — pick consistent colors and stick to them across scenes).

After rendering, ask: **"Positions correct? Edits?"** Iterate until approved before writing any prompt.

## 4. After approval — translating the schema into the prompt

Every prompt for that scene includes a `⚠️空间布局` block that mirrors the approved schema:

```
⚠️空间布局（MAIN VIEW=从 [direction]，俯视图布局）：
位置A：[Character1]靠/站在 [exact location]——[detail, e.g. height, angle]
位置B：[Character2]站在 [exact location]——[detail]
位置C：[Prop]放置在 [exact location]——[detail]
⚠️[Critical alignment rules: distances, axes, mirroring, occlusion]
```

Example:
```
⚠️空间布局（MAIN VIEW=从天桥入口看向巨型屏幕）：
位置A：反派站在中央通道最前方靠近屏幕，面朝三人。
位置B：角色A和角色B在通道中间并肩站立，距反派约3米，面朝反派方向。
位置C：角色C站在角色A和角色B正后方1.5米处——不在他们旁边，严格在他们背后，被他们的身体部分遮挡——也面朝反派方向。
⚠️角色A左肩与角色B右肩间距约40厘米。角色C的头顶高度严格低于角色A和角色B的肩部连线（站位较远造成的视觉缩小）。
```

Always include in the prompt:
- Distances in meters
- Cardinal directions or "north/south/east/west" relative to the declared main view
- Who occludes whom
- Which direction each character faces
- Any heights or eyelines that the model might get wrong

## 5. Position changes

If the user revises a position after approval — **redraw the schema first**, get re-approval, then update the prompt. Do not edit the prompt's `空间布局` block from memory; always work from the latest approved schema.

---

## 6. Dynamic movement trajectories (动线标注)

Sections 1–5 handle **static blocking** — who stands where at a given moment. This section handles **dynamic blocking** — who moves where along what path, and how the camera follows.

### When to draw trajectories

Draw movement trajectories whenever the scene includes:
- A character walking, running, or repositioning during a shot
- A chase, pursuit, or flight sequence
- A fight, sparring, or physical confrontation
- Characters crossing paths or converging on a point
- A camera move that tracks, circles, or follows a subject through space

Skip trajectories for:
- Static dialogue scenes where characters don't move from their positions
- Pure reaction shots / close-ups
- Insert or cutaway shots

### Color-coded line standard

Use a fixed color convention across all diagrams in a project. The standard palette:

| Line color | Meaning |
|---|---|
| **Black (solid)** | Character A movement path |
| **Red (solid)** | Character B movement path |
| **Green (solid)** | Character C movement path (if needed) |
| **Blue (dashed)** | Camera movement path |

Rules:
- Character-to-color assignment is locked for the entire project — Character A is always black, never switches to red in a later diagram
- Each path has **directional arrows** at regular intervals showing travel direction
- Arrows point from start → end of movement
- If a character reverses direction, use a **U-turn arrow** at the reversal point
- Camera path is always **dashed** to distinguish it from character paths visually

### Trajectory annotation points

Mark these critical points on every trajectory:

| Symbol | Meaning | When to mark |
|---|---|---|
| **● (filled circle)** | Start position | Beginning of movement |
| **■ (filled square)** | Stop / pause point | Character pauses during movement |
| **✕ (cross)** | Interaction zone | Characters cross paths, collide, or physically interact |
| **◎ (double circle)** | End position | Final resting position after movement |
| **▲ (triangle)** | Camera station | Camera starts, stops, or transitions between move types |

For intersection points, annotate what happens: `✕打斗区域`, `✕交汇点——B拦截A`, `✕道具交接`.

### Translating trajectories into the prompt

Dynamic trajectories are written into `【电影化动态描述】` as sequenced spatial instructions, not into the `⚠️空间布局` block (which remains for static start positions):

```
⚠️空间布局（静态起始位）：
位置A：角色A站在走廊入口（北端），面朝南。
位置B：角色B站在走廊中段（南端约8米处），面朝北。
摄影机：走廊东墙外侧，35mm广角，朝西拍摄。

⚠️动线（本镜头内运动轨迹）：
角色A：从北端入口→沿走廊中线向南跑→在中段✕交汇点与角色B相遇→停顿■→向西侧房间转向→进入西侧房间◎终点。
角色B：从南端位置→向北慢走→在✕交汇点伸手拦住角色A→停顿■→原地不动。
摄影机：从东墙固定位▲起→沿走廊向南tracking跟随角色A→到达✕交汇点后环绕180°→从角色B背后拍摄两人对峙◎终点。
```

Rules:
- Start with the static `⚠️空间布局` for frame 1 positions
- Then declare `⚠️动线` with one line per character + one line for camera
- Use `→` to chain waypoints
- Mark interaction points with `✕` and pause points with `■`
- Bind the camera line to a character when it's tracking: `跟随角色A`
- Specify distances at key points: `向南跑约5米`, `环绕180°半径2米`

## 7. Complex scene decomposition (一图一动线规则)

**Core rule: one scheduling diagram carries only ONE set of character movements + ONE camera path.**

When a scene has multiple movement phases (e.g., a chase that transitions into a fight), split it into separate diagrams — one per phase. This prevents the AI from confusing overlapping or sequential trajectories.

### When to decompose

| Complexity | Diagram count | Example |
|---|---|---|
| Static dialogue, no movement | 1 diagram (static only, no trajectories) | Two people at a table |
| One character moves, camera follows | 1 diagram | Character walks across room |
| Two characters move simultaneously | 1 diagram (if paths don't cross) | Two people walking side by side |
| Chase → stop → confrontation | 2 diagrams: chase phase + confrontation phase | Hallway chase into room standoff |
| Multi-phase fight (approach → clash → retreat) | 2–3 diagrams, one per phase | Combat sequence |
| Long take with repositioning | 1 diagram per camera setup / movement phase | Oner with 3 distinct blocking beats |

### Decomposition rules

1. Each diagram has a **phase label**: `阶段1：追逐`, `阶段2：对峙`, `阶段3：打斗`
2. The **end positions** of diagram N become the **start positions** of diagram N+1 — continuity is mandatory
3. Each diagram maps to one or more `【镜头N】` blocks in the prompt
4. If the camera changes move type (tracking → static → crane), that's a natural split point
5. Never put more than 3 character paths on a single diagram — if there are 4+ moving characters, split by character subgroups

### Linking diagrams in the prompt

When a scene uses multiple phase diagrams, declare the phase transitions in `【电影化动态描述】`:

```
⚠️本场景分2阶段调度：
阶段1（镜头1-2，0-7秒）：追逐——参见调度图A。
阶段2（镜头3-4，7-15秒）：对峙——参见调度图B。
⚠️阶段1终点位=阶段2起始位，空间连续不跳变。
```

## 8. Generating scheduling diagram images (俯视调度图生成)

When a scene requires complex blocking — movement trajectories, multi-character choreography, or precise camera paths — generate a top-down scheduling diagram image as a reference asset. This diagram is uploaded alongside the scene image and character refs to spatially anchor the AI video generator.

### When to generate a scheduling diagram image

Generate one when:
- The scene has 2+ characters moving simultaneously
- The scene involves a chase, fight, or complex choreography
- The camera path is non-trivial (tracking, orbiting, crane with repositioning)
- Static position blocking alone cannot describe the spatial relationships needed
- The user explicitly requests a scheduling diagram

Do NOT generate one for:
- Static dialogue with no movement
- Single-character shots
- Simple camera moves (push-in, pull-out) with no character relocation

### Base floor plan prompt (场景底图)

Generate the spatial base map first, without characters or trajectories. This floor plan can be reused across multiple shots in the same location.

Template (Chinese, for image generation model):

```
俯视图，平面布局图，线条简约清晰。完整还原[场景名称]的空间结构：[墙体/道路/地形描述]、[家具/障碍物/固定道具描述]。无人物，二维平面视角，白色或浅灰色背景，黑色细线条勾勒空间边界和物体轮廓。标注主要区域名称。清晰空间坐标关系，比例合理。
```

Example — apartment living room:
```
俯视图，平面布局图，线条简约清晰。完整还原小公寓客厅的空间结构：四面墙体（北墙有窗户、东墙有入户门、南墙有卧室门、西墙完整无开口）、客厅中央布艺沙发面朝北墙电视、沙发左侧茶几、东南角鞋柜、西北角落地灯。无人物，二维平面视角，白色背景，黑色细线条勾勒空间边界和物体轮廓。标注主要区域名称（客厅、走廊、厨房方向）。清晰空间坐标关系，比例合理。
```

Example — alley:
```
俯视图，平面布局图，线条简约清晰。完整还原城市窄巷的空间结构：南北走向长约30米巷道、两侧砖墙高约3米、巷道宽约2米、北端丁字路口连接横向马路、南端死胡同有垃圾桶和堆叠纸箱、中段东墙有一扇铁门、西墙有消防梯。无人物，二维平面视角，白色背景，黑色细线条。标注巷道南北方向和关键物体位置。清晰空间坐标关系，比例合理。
```

### Character position overlay prompt (站位标注图)

After the base floor plan is ready, add character positions on top:

```
基于已有的[场景名称]俯视平面图，在以下位置标注角色站位：[角色A]用[颜色]圆圈标记在[位置描述]、[角色B]用[颜色]圆圈标记在[位置描述]。每个圆圈内标注角色首字母或编号。用短箭头标注每个角色的面朝方向。保持原始场景布局不变，标注清晰简洁，线条图风格。
```

### Movement trajectory overlay prompt (动线标注图)

For scenes with movement, add trajectory lines on top of the position-marked floor plan:

```
基于已有的[场景名称]带站位标注的俯视图，添加运动轨迹标注：
- 黑色实线+箭头：[角色A]从[起点]沿[路径描述]移动到[终点]，[中途停顿/交汇点描述]
- 红色实线+箭头：[角色B]从[起点]沿[路径描述]移动到[终点]
- 蓝色虚线+箭头：摄影机从[起始机位]沿[运镜路线]移动到[终点机位]，[跟随/环绕/固定推拉描述]
在路径交汇处用✕标记交互区域，在停顿处用■标记暂停点。保持底图清晰，轨迹线条粗细适中不遮挡空间结构。
```

### Reusable diagram library convention (图纸库复用)

For series projects (multi-episode, recurring locations), maintain a library of base floor plans:

- Save each location's base floor plan as a reusable asset: `assets/floor-plans/[location-name]-floor-plan.png`
- For a new scene in the same location, reuse the base floor plan and only regenerate the position + trajectory overlay
- Character color assignments are locked project-wide (not per-diagram)
- Floor plan naming matches the location name used in the screenplay

### Annotation cleanup rule (标注清除约束)

**Critical:** scheduling diagram annotations (colored lines, circles, text labels, arrows) are reference-only. They must NOT appear in the generated video.

When a scheduling diagram is used as a reference input alongside the video prompt, always add this constraint:

In `【挂载资源与音频硬约束】`:
```
@俯视调度图=俯视调度图 — 仅作空间坐标与运动轨迹参考，⚠️渲染时自动隐藏所有标注线条、圆圈、箭头和文字标签，不得出现在成片画面中。
```

In `【负面约束】`:
```
禁止调度图标注线条、圆圈标记、箭头、文字标签出现在成片画面中——调度图仅作空间参考。
```

## 9. Multi-reference input priority order (素材输入优先级)

When using scheduling diagrams, the reference image input order affects the AI's spatial vs. identity recognition priority. Use this fixed sequence to minimize spatial drift:

| Priority | Image | Purpose |
|---|---|---|
| 1 (first) | Scene image (场景图) | Locks environment, lighting, spatial structure |
| 2 | Scheduling diagram (俯视调度图) | Locks positions, trajectories, camera path |
| 3 | Character reference (角色参考图) | Locks identity, wardrobe, physical traits |

Rationale: the AI processes earlier images with higher spatial weight. Putting the scene and spatial diagram before character refs ensures the environment is established first, then character identity fills in — matching the "先空间再人物" principle.

In handle declarations, reflect this order:
```
@场景图=场景图 — [场景描述]
@俯视调度图=俯视调度图 — 仅作空间坐标参考，⚠️渲染时隐藏所有标注
@角色A=角色A — [角色描述]
@角色B=角色B — [角色描述]
```

---

## 10. Combat / physical contact scenes (格斗/肢体接触场景)

Sections 1–9 handle spatial positioning and movement. This section handles the specific problem of **two characters physically interacting at close range** — fighting, grappling, pushing, dancing — where the AI's most common failure is body interpenetration (肢体穿模).

### Why combat scenes fail

AI models cannot reliably maintain two independent body volumes when characters are close. Without explicit constraints:
- Limbs pass through each other's bodies
- Characters merge into a single mass
- Left/right positions randomly swap mid-shot
- Actions become an undefined "fighting blob" instead of clear attack/defense
- The second half of a 15-second clip degrades as the model loses track of who is who

### Core solution: 3-layer combat constraint

Every combat prompt must include these three layers:

| Layer | Purpose | Prompt pattern |
|---|---|---|
| **Position lock (站位锁定)** | Fix left/right assignment | `左侧角色：[A]；右侧角色：[B]。严格固定左右站位，位置不交换。` |
| **Skeleton isolation (骨骼隔离)** | Prevent body interpenetration | `两套独立人体骨骼，身体禁止互相穿透穿插。` |
| **Attack-defense sequence (攻防时序)** | Decompose "fight" into ordered beats | `左侧[A]蓄力挥拳→右侧[B]抬臂格挡→[B]受冲击后仰→衣物惯性摆动` |

### Combat prompt template

```
⚠️空间布局：
左侧角色：[角色A描述]，站位画面左侧。
右侧角色：[角色B描述]，站位画面右侧。
⚠️严格固定左右站位，位置不交换。两套独立人体骨骼，身体⚠️禁止互相穿透穿插。

⚠️动作时序（攻防拆分）：
①[攻击者]：[具体攻击动作——蓄力方式+出击方向+接触部位]
②[防御者]：[具体防御/闪避动作——格挡方式+受力方向]
③受力反馈：[防御者身体反应——后仰/后撤/衣物摆动/表情变化]
④[可选]反击：[防御者转攻——反击动作]

动作流畅连贯，受力反应真实，布料随惯性自然摆动。
```

### Attack-defense decomposition guide

Never write vague combat descriptions. Always decompose into these 4 beats:

| Beat | Content | Bad example | Good example |
|---|---|---|---|
| ① 蓄力 | How the attacker prepares | "开始打斗" | "左侧男子右拳后拉至肩侧蓄力" |
| ② 出击 | The attack motion + direction | "攻击对方" | "右直拳向前击出，瞄准对方面部" |
| ③ 防御/闪避 | Defender's response | "另一个人躲开" | "右侧男子迅速抬左臂格挡，肩膀承受冲击力" |
| ④ 受力反馈 | Physical consequence | — | "上半身向后晃动0.3秒，表情紧绷，衣料因惯性向前摆动" |

### Combat-specific negative constraints

Add these to `【负面约束】` for all combat scenes:

```
禁肢体互相穿插融合、禁身体穿模、禁人物左右位置互换、禁动作卡顿跳变、禁多余肢体、禁肢体扭曲变形、禁角色融合成一团
```

### Duration rules for combat

| Duration | Recommendation |
|---|---|
| ≤ 7 sec | Single attack-defense exchange — safe for one prompt |
| 8–15 sec | Maximum 2 exchanges in one prompt — the second exchange should be simpler |
| > 15 sec | ⚠️ Split into 2 separate prompts — the model loses spatial tracking in the second half of long combat shots |

**15-second split rule:** For extended fight sequences, generate as two 7–8 second clips. The second clip's `【首帧衔接】` locks the end positions of clip 1 as start positions for clip 2.

### Physical gap rule

For close-range combat (especially grappling), maintain a visible gap between bodies in the prompt description:

```
⚠️两人之间保持可见间隙——即使近身格斗，躯干之间也需有约10-20厘米的空间，降低穿模概率。
```

Exception: deliberate contact (pushing against wall, grabbing collar) — describe the specific contact point and keep the rest of the bodies separated:
```
左侧男子右手抓住右侧男子衣领，将其推向墙面压制——⚠️仅右手与衣领接触，两人躯干之间仍有间隙，其余肢体不接触。
```

### Bullet time insert (子弹时间)

For combat climax moments, insert a slow-motion beat at the impact point:

```
⚠️[击打/碰撞]瞬间进入短暂子弹时间慢动作（约1-2秒），其余时段正常速度。慢动作过渡自然，无画面撕裂。
```

Place this instruction immediately after the impact beat (③ 受力反馈), not at the beginning of the action sequence.

### Integration with other sections

| Section | How combat integrates |
|---|---|
| §6 Dynamic trajectories | For chase→fight transitions: chase phase in one diagram, fight phase in another (§7 decomposition rule) |
| §8 Scheduling diagrams | Generate a fight-specific diagram showing left/right positions + attack lines |
| `CAMERA_EMOTION.md` §8.3 Lateral tracking | Best camera for fight scenes — stable side tracking maintains spatial clarity |
| `CAMERA_EMOTION.md` §10.5 Turning-point close-up | Cut to close-up at the impact moment for maximum effect |
| Video reference (`PROMPT_PATTERNS.md`) | Use `@运镜参考` Mode 1 to copy film fight camera work; Mode 2 for full choreography |

---

## 11. Eye-line Protocol (视线锁定协议)

AI video models frequently produce characters who look in wrong directions during dialogue — staring at the camera instead of their conversation partner, looking past someone while speaking, or having mismatched gaze angles for their height difference. This section provides a systematic method to lock eye-lines.

### Why eye-lines fail

Three root causes:
1. **No height-angle declaration.** Two characters at different heights (standing vs sitting, tall vs short) need explicit 俯视/仰视 tags — without them the model defaults to level eye contact regardless of physical position.
2. **No gaze-target per beat.** When a character's attention shifts between objects, people, and locations within one shot, the model picks randomly unless each shift is explicitly sequenced.
3. **No gaze-dialogue sync.** Speakers should look at their listener; listeners should look at the speaker. Without explicit linking, characters may speak while looking at unrelated objects.

### Core rule: every action beat declares a gaze target

For every numbered action beat (①②③④) in `【电影化动态描述】`, if a character is visible and active, specify their gaze target inline:

```
⚠️视线方向：[角色名]看向[目标]
```

Target types:
| Gaze target | Example |
|---|---|
| Another character's face | `⚠️视线方向：墨渊俯视苏小鱼面部` |
| A specific object | `⚠️视线方向：苏小鱼盯着粥碗观察温度` |
| A direction/distance | `⚠️视线方向：苏小鱼平视前方走廊（不看任何人）` |
| Following an object trajectory | `⚠️视线方向：墨渊视线从她脸移向纸面` |
| Avoidance (deliberately not looking) | `⚠️视线方向：墨渊别过脸去避开视线（眼神飘向右下方）` |

### Height-angle rules

When two characters have different physical heights or positions:

| Position relationship | Gaze angle tag |
|---|---|
| Taller/standing → shorter/sitting | `俯视` (looking down) |
| Shorter/sitting → taller/standing | `仰视` (looking up) |
| Same height, same level | `平视` (level gaze) |
| Behind someone | `看向[人物]背影/后脑` |
| Across distance >5m | `远眺/遥望[人物]方向` |

Include the angle in the gaze declaration:

```
⚠️视线方向：墨渊俯视苏小鱼（190cm站立 vs 160cm坐姿，俯角约30°）
⚠️视线方向：苏小鱼仰头看墨渊面部（仰角大，他站她坐高度差70cm）
```

### Dialogue gaze synchronization

In `【音画同步】` section, after declaring speaker positions, add a gaze protocol:

```
⚠️对话视线规则：
- [说话者A]说话时看向[听者B]面部
- [听者B]听话时看向[说话者A]面部
- 如有视线转移（如看向道具后再说话），标注转移时机
```

For dialogue where one character deliberately avoids eye contact (character trait):
```
⚠️对话视线规则：
- 墨渊说话时俯视苏小鱼面部
- 苏小鱼回应时⚠️不看他脸——视线停留在手中物品上（人设：对人无感，只关注食物）
```

### Over-shoulder shot gaze

For 过肩镜头 (over-shoulder shots), specify both characters' gaze:

```
机位：50mm中景，过肩镜头——过[角色A]肩拍[角色B]（仰角/俯角X°）。
⚠️视线方向：[角色B]看向镜头前方的[角色A]面部方向（不看镜头）；[角色A]后脑勺对镜头。
```

### Gaze transition notation

When gaze shifts within a single beat, use `→` to chain:

```
⚠️视线方向：苏小鱼视线从粥碗→移向墨渊手中的纸→回到粥碗
⚠️视线方向：墨渊视线从她脸→下移到纸面→瞳孔放大→回到她脸
```

### Negative constraint addition

For ANY prompt with dialogue (2+ characters speaking), add to `【负面约束】`:

```
⚠️禁对话时视线对不上（俯仰关系必须正确、说话时必须看向对方或指定目标）
```

### Quick checklist before writing any prompt

Before finalizing a multi-character prompt, verify:
- [ ] Every speaking character has a declared gaze target during their line
- [ ] Height/position differences are reflected in 俯视/仰视 angles
- [ ] Gaze shifts are sequenced (character doesn't look at two things simultaneously)
- [ ] Over-shoulder shots specify both characters' facing direction
- [ ] Characters who deliberately avoid eye contact have this explicitly noted (with reason)
- [ ] `【负面约束】` includes `禁对话时视线对不上` for dialogue prompts
