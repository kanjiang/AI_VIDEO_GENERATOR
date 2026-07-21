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
