# Editing Rhythm for Science Explainers

## Scale Jumping — the primary rhythm engine

In narrative films, rhythm comes from emotional arcs. In science explainers, rhythm comes from **scale shifts** — alternating between the very small and the very large.

### Scale levels

| Level | What the viewer sees | Example |
|---|---|---|
| **L1 — Molecular / atomic** | Particle animations, electron flow, crystal lattice | 铜离子在电解液中迁移 |
| **L2 — Material / surface** | Texture close-ups, liquid flow, material transformation | 铝液倒入模具、铜板表面结晶 |
| **L3 — Object / component** | Product close-up, part assembly, device cross-section | VC 均热板剖面、手机主板 |
| **L4 — Machine / facility** | Equipment, production line, factory floor | 偏析炉全景、电解槽排列 |
| **L5 — Landscape / urban** | Aerial, city, geographic context | 电子垃圾场全景、光伏电站、城市天际线 |
| **L6 — Planetary / cosmic** | Earth, atmosphere, space | 地球夜景、碳循环示意、星空 |

### Scale-jump rules

1. **Never stay at the same scale for more than 2 consecutive segments.** If S02 and S03 are both L2 (material close-ups), at least one of them must include an internal scale jump (start at L2, end at L4, or vice versa).

2. **Hook starts wide, then dives.** The hook segment (S01) should be L5–L6, then the first explanation segment (S02) drops to L1–L2. This "cosmic → atomic" jump is the strongest attention grab.

3. **Elevation returns to the widest scale.** The closing segment should be L5–L6, mirroring the hook. This creates a satisfying frame structure.

4. **Mark scale in the segment plan.** Every row in the segment plan table should have a scale column:

```markdown
| 段号 | 知识点 | 尺度 | 尺度跳跃 |
|---|---|---|---|
| S01 | Hook: 电子垃圾里有多少金 | L5→L3 | ↓↓ 下跳 |
| S02 | 手机拆解分类 | L3 | — 平 |
| S03 | 偏析法提纯铝 | L4→L1→L2 | ↑↓↑ 内部跳 |
| S04 | 电解精炼铜 | L1→L2 | — 平（但S03有内部跳，可以） |
| S05 | 再生材料做成零件 | L2→L4 | ↑ 上跳 |
| S06 | 碳中和无限循环 | L5→L6 | ↑↑ 上跳 |
```

### Scale-jump prompt implementation

When handing off to `shotlist-builder`, mark scale jumps explicitly in the prompt:

```
【电影化动态描述】
【镜头1】[建立]（0-5秒）
机位：25mm超广角→俯拍，电子垃圾场全景。数万台废旧手机堆积如山。[尺度L5]

【镜头2】[递进]（5-10秒）
机位：微距镜头。一块手机主板上的金色焊点在光下闪烁。[尺度L2]
⚠️尺度跳跃：L5→L2，5秒内从垃圾山到焊点特写，中间无过渡镜头，硬切。

【镜头3】[转折]（10-15秒）
机位：3D 剖面动画。焊点内部金原子结构可视化。[尺度L1]
```

---

## Information Density Control

### The "15 seconds = 1 knowledge point" rule

Each 15-second segment delivers exactly ONE of these:
- **One fact** ("3 万部手机含 167 吨黄金")
- **One process step** ("偏析法利用熔点差异分离铝和杂质")
- **One visual demonstration** (铜离子在电解液中迁移的动画)
- **One comparison** ("再生铝的能耗只有原铝的 5%")

If you find yourself writing "AND" between two knowledge points in the same segment, split them.

### Density calibration by audience

| Audience | Words per 15s | Visuals per 15s | Pacing feel |
|---|---|---|---|
| **General / casual** | 40–50 字 | 2–3 个镜头 | 从容，留出消化时间 |
| **Enthusiast / tech-savvy** | 60–80 字 | 3–4 个镜头 | 紧凑，每句都是新信息 |
| **Expert / industry** | 80–100 字 | 4–5 个镜头 | 极密，假设基础知识已有 |

Default to **enthusiast** level for Douyin/Bilibili science content.

### The "breathe" beat

Every 3–4 high-density segments, insert a **half-speed segment** — a moment of visual beauty with minimal narration. This serves as mental digestion time.

Examples:
- 铝液倒入模具的慢动作特写（只有环境声，无旁白）
- 夕阳下工厂全景的缓慢横摇
- 产品从生产线末端出来的特写，自然光

Mark these in the segment plan as `[breathe]`.

---

## Pacing Rules

### Shot duration by content type

| Content type | Average shot duration | Cut rhythm |
|---|---|---|
| **Hook / reveal** | 1.5–2.5s | Fast, punchy |
| **Process explanation** | 3–5s | Medium, allow comprehension |
| **Animation / diagram** | 4–7s | Slow, let the visual teach |
| **Breathe / beauty shot** | 5–8s | Very slow, hold |
| **Data callout** | 2–3s | Medium, must be readable |
| **Talking head / host** | 3–5s | Medium, human warmth |

### Rhythm pattern

The ideal science explainer follows a **pulse** pattern:

```
FAST — FAST — MEDIUM — MEDIUM — SLOW(breathe) — FAST — FAST — MEDIUM — SLOW(elevation)
```

Never: `FAST FAST FAST FAST FAST FAST` (exhausting)
Never: `SLOW SLOW SLOW SLOW SLOW` (boring)

### Music and SFX sync points

Even though AI video prompts don't control music, plan for post-production sync:

| Moment | Audio treatment |
|---|---|
| Hook reveal | Impact SFX (bass hit, whoosh) |
| Scale jump L5→L1 | Descending tone / zoom-in SFX |
| Scale jump L1→L5 | Ascending tone / expansion SFX |
| Key data reveal | Short stinger (ding, chime) |
| Breathe beat | Music only, narration drops out |
| Elevation close | Music swells, SFX fades |

---

## Transition Logic for Science Content

Beyond the 6 standard transition types in `PROMPT_PATTERNS.md`, science explainers use these additional patterns:

### Scale-match cut

End one segment at scale L2 (copper crystal close-up) → start next segment at scale L2 but a different material (aluminum ingot close-up). Same visual scale, different subject. Smooth and educational.

**Prompt pattern:**
```
【尾帧转场】最后2秒画面停留在铜板表面结晶纹理特写。
⚠️下一视频首帧必须从铝锭表面纹理特写开始——相同尺度，不同材料。
```

### Process-chain cut

The output of one process becomes the input of the next. Show the product leaving one machine and entering another.

**Prompt pattern:**
```
【尾帧转场】最后3秒：纯铝片从偏析炉出口滑出，沿传送带向画面右侧移动。
⚠️下一视频首帧：同一铝片从画面左侧进入电解槽区域。
```

### Diagram-to-real transition

An animation/diagram dissolves into real footage of the same thing.

**Post-production note:** This requires compositing in CapCut — animate a 3D diagram, then dissolve/wipe to real footage at the same camera angle and scale. Mark this in the segment plan so the post-production team knows to prepare matching shots.

### Data-reveal cut

A number or statistic appears on screen, then the visual "proves" it. Cut from the data callout to the visual evidence.

**Prompt pattern:**
```
【尾帧转场】最后2秒：画面中央大字"纯度 99.98%"。
⚠️下一视频首帧：电解铜板在阳光下反射出完美镜面光泽。
```
