# Batch Production Mode

How to generate video prompts at scale without rewriting everything from scratch each time.

## Core idea: fixed modules + variable modules

Split every prompt into **fixed** parts (set once per project) and **variable** parts (swapped per shot). Batch production = assembling prompts from pre-built modules, not writing from zero.

```
┌─────────────────────────────────────────────┐
│  FIXED MODULES (set once, never rewrite)    │
│                                             │
│  ① 全局风格块 (STYLE_BLOCK)                 │
│  ② 角色基底描述 (named handle descriptions) │
│  ③ 技术参数 (【规格】: 分辨率/帧率/画幅)     │
│  ④ 挂载硬约束 (【挂载资源与音频硬约束】)      │
│  ⑤ 通用负面约束 (项目级禁止项)               │
└─────────────────────────────────────────────┘
                    +
┌─────────────────────────────────────────────┐
│  VARIABLE MODULES (swap per shot)           │
│                                             │
│  ⑥ 首帧衔接 (上一段尾帧描述)                │
│  ⑦ 构图句式 (从构图词库选)                   │
│  ⑧ 动作描述 (当前镜头具体动作)               │
│  ⑨ 场景关键词 (当前环境描述)                 │
│  ⑩ 镜头专属约束 (本镜头特有禁止项)           │
│  ⑪ 音画同步 (本镜头台词/音效)                │
└─────────────────────────────────────────────┘
```

## Setup phase (per project, done once)

### Step 1 — Lock fixed modules

Before writing any shot prompt, prepare these project-level files:

| Module | Content | Source |
|---|---|---|
| ① 全局风格块 | Per-dimension style declaration | `STYLE_BLOCK.md` or `style-extractor` output |
| ② 角色基底 | Each named handle's description (`@角色名=角色名`, identity, voice, expression system) | Character identity boards |
| ③ 技术参数 | Resolution, frame rate, aspect ratio, duration | Project spec |
| ④ 挂载硬约束 | "Strictly use mounted named references..." boilerplate | `PROMPT_PATTERNS.md` §1 |
| ⑤ 通用负面约束 | Project-level bans (e.g., 禁身份漂移、禁字幕、禁真人实拍质感) | Project bible |

**Once locked, these modules are copy-pasted verbatim into every prompt.** Do not rewrite, rephrase, or "improve" them per shot — consistency is the point.

### Step 2 — Build the composition library

Start from the comprehensive **[COMPOSITION_LIBRARY.md](COMPOSITION_LIBRARY.md)** which contains 50+ compositions organized by narrative function:

| Category | ID prefix | Count | Use case |
|---|---|---|---|
| Emotion close-ups | `EC-01` to `EC-10` | 10 | Inner monologue, micro-expressions |
| Full-body action | `FA-01` to `FA-10` | 10 | Combat, running, physical performance |
| Two-person interaction | `TP-01` to `TP-10` | 10 | Dialogue, romance, confrontation |
| Scene establishing | `SE-01` to `SE-10` | 10 | Transitions, environmental storytelling |
| Creative atmosphere | `CA-01` to `CA-10` | 10 | Flashbacks, dreams, stylistic moments |

Plus modular word banks for framing (景别), camera angle (镜头角度), and emotion keywords (情绪适配词).

For quick reference during production, here are the 10 most common compositions:

| Shorthand | Full prompt phrase | Use case |
|---|---|---|
| `EC-01` | `中心对称特写构图，人脸居中，强化情绪冲击` | Emotion beat |
| `EC-04` | `局部特写构图，聚焦手部动作，留白构图` | Detail / prop interaction |
| `TP-06` | `过肩镜头，前景虚化肩膀轮廓，焦点对方面部` | Dialogue coverage |
| `SE-01` | `大全景纵深构图，道路延伸线，纵深感` | Scene opening / journey |
| `FA-02` | `高角度俯拍构图，人物渺小，无助孤独感` | Scale / isolation |
| `FA-01` | `低角度仰拍构图，拉长身形，凸显强大气场` | Authority / power |
| `TP-01` | `对称对分构图，左右各一人，对峙/平等对话` | Confrontation |
| `SE-04` | `引导线构图，视线引向主角` | Direction / pull |
| `CA-03` | `逆光剪影构图，人物只剩轮廓，朦胧氛围` | Mystery / beauty |
| `SE-09` | `门口构图，人物站在门槛，一边旧世界一边新世界` | Choice / threshold |

**Extend the library** with any project-specific composition that appears 3+ times. Each row is a reusable module — in the variable section of your prompt, just reference the ID and add shot-specific details.

### Step 3 — Prepare the variable template

Create a blank prompt template with fixed modules pre-filled and variable slots marked:

```
@角色A=角色A — 参考角色A角色定妆。[← ② paste verbatim]
@场景A=场景A — 参考场景A。[← ② paste verbatim]

【挂载资源与音频硬约束】[← ④ paste verbatim]

【首帧衔接】[← ⑥ FILL: previous shot's end frame]

【规格】[← ③ paste verbatim]
[← ① paste style block verbatim]

时间分配：[← ⑦ FILL: shot count and timing]

【电影化动态描述】
[← ⑦⑧⑨ FILL: composition + action + scene]

【音画同步】(if needed)
[← ⑪ FILL: dialogue/SFX]

【负面约束】[← ⑤ paste verbatim] + [← ⑩ FILL: shot-specific bans]
```

## Production phase (per shot)

For each new shot, the work is:

1. **Copy the template** (fixed modules already in place)
2. **Fill `⑥ 首帧衔接`** from the previous shot's ending
3. **Pick a composition** from the shorthand table → expand into `⑦`
4. **Write the action** → `⑧` (this is the only truly creative writing per shot)
5. **Set the scene keywords** → `⑨`
6. **Add shot-specific bans** → `⑩` (if any beyond the project defaults)
7. **Add dialogue/SFX** → `⑪` (if applicable)

**Typical time per shot in batch mode:** 3–5 minutes (vs. 15–20 minutes writing from scratch).

## Batch efficiency rules

### Rule 1 — Never rewrite fixed modules

If you find yourself editing the style block or character descriptions for a specific shot, STOP. Either:
- The fixed module needs a global update (do it in the project file, propagate to all shots)
- You're adding a shot-specific override (put it in the variable section, clearly marked as override)

### Rule 2 — Grow the composition library as you go

Every time you write a new composition that doesn't fit existing shorthands, add it to the table. By the end of a project, your library covers 90%+ of shots without thinking.

### Rule 3 — Batch similar shots together

Group shots by composition type (all ECU-face shots, then all WS-establish shots, etc.). Writing 5 similar compositions in a row is faster than alternating between types.

### Rule 4 — Copy forward, not backward

When moving to the next shot, copy the PREVIOUS shot's prompt as the starting point (the fixed modules are already there). Then only change the variable parts. This is faster than copying the blank template every time.

## Iteration feedback loop

After each batch of prompts is generated and reviewed, maintain a **revision log**:

```markdown
## 迭代修改记录

| 日期 | 高频问题 | 出现次数 | 修复方式 | 已更新到 |
|---|---|---|---|---|
| 2026-07-20 | AI 给角色加了不存在的配饰 | 4/10 | 在通用负面约束增加"禁额外配饰" | ⑤ 通用负面约束 |
| 2026-07-20 | 特写镜头焦点漂移 | 3/10 | 在 ECU 构图句式中增加焦点锁定 | 构图词库 |
| 2026-07-21 | 背景建筑风格不一致 | 5/12 | 在风格块增加建筑风格约束 | ① 全局风格块 |
```

**Rules:**
- Record every revision that was needed on 2+ shots (patterns, not one-offs)
- After recording, immediately update the relevant fixed module or composition shorthand
- Review the log weekly — if the same issue keeps appearing, the fix isn't working and needs escalation (e.g., add to `⚠️` critical constraints, not just regular text)
- The log stays with the project files, not inside the skill — it's project-specific learning
