# Narrative Structure for Science Explainers

## Three-act structure: Hook → Progression → Elevation

Science explainers follow a modified three-act structure. Unlike drama (where the engine is character desire), the engine here is **information gap** — the audience wants to know something they didn't know before.

### Act I — Hook (first 3–5 seconds)

**Job:** Create an information gap so strong the viewer cannot scroll away.

**Hook patterns:**

| Pattern | Example | Why it works |
|---|---|---|
| **Impossible number** | "3 万部手机能提取 167 吨黄金" | Scale mismatch creates disbelief → curiosity |
| **Visual contrast** | 一堆电子垃圾 → 闪耀的金条 | Before/after gap demands explanation |
| **Provocative claim** | "你家里有矿！" | Challenges common sense |
| **Countdown / deadline** | "地球的铜矿还能用 40 年" | Urgency creates investment |
| **Question + denial** | "你以为废手机没用了？错。" | Breaks assumption → rebuilds it |

**Rules:**
- Hook must be **both visual and verbal** — say it AND show it
- Hook must directly relate to the main topic (no clickbait that doesn't pay off)
- Hook must complete within 3–5 seconds — if it takes longer, it's not a hook, it's an intro

### Act II — Progression (body, 80% of runtime)

**Job:** Answer the hook's implicit question through a causal chain of knowledge points.

**The causal chain rule:** Each knowledge point must **cause** or **enable** the next. The audience should feel "oh, so THAT'S why the next step works." If two adjacent points have no causal link, insert one or reorder.

**Example chain (electronic waste recycling):**

```
KP1: 电子垃圾含有多少可回收资源 → (so we need to extract them)
KP2: 如何拆解并分类不同金属     → (separated, now what?)
KP3: 偏析法提纯铝              → (aluminum done, but copper is harder)
KP4: 电解精炼铜                → (materials ready, now rebuild)
KP5: 再生材料如何做成新零件     → (loop complete, but why does it matter?)
```

**Segment planning template:**

```markdown
## 段落计划

| 段号 | 知识点（一句话） | 视觉化策略 | 尺度 | 时长 |
|---|---|---|---|---|
| S01 | [hook] | [对比/数字/反差] | 宏观 | 15s |
| S02 | [KP1] | [实拍/动画/混合] | 微观 | 15s |
| S03 | [KP2] | [流程动画] | 微观 | 15s |
| S04 | [KP3] | [微观特写] | 微观→宏观 | 15s |
| ... | ... | ... | ... | ... |
| SN  | [elevation] | [地球/星空/循环] | 宏观 | 15s |
```

### Act III — Elevation (last segment)

**Job:** Lift the specific topic into a universal theme. The audience should feel "this matters beyond just knowing how X works."

**Elevation patterns:**

| From (specific) | To (universal) | Visual |
|---|---|---|
| 电子垃圾回收流程 | 碳中和、无限循环 | 地球、城市绿化、星空 |
| 人体免疫机制 | 生命的智慧与韧性 | 细胞宇宙、光 |
| 芯片制造工艺 | 人类协作的极限 | 晶圆厂全景→夜空星系 |
| 食物消化过程 | 身体是最精密的工厂 | 微观→人体全景→日常生活 |

**Rules:**
- Elevation must **earn its weight** — don't paste on a grand theme that the body didn't support
- Pair the elevation narration with the video's most beautiful or grand visual
- End on a single strong image, not a montage

---

## Concept Visualization

The core challenge of science video: how to make invisible / abstract / complex things **visible and intuitive**.

### Visualization strategies (ordered by increasing abstraction)

| Strategy | When to use | Example |
|---|---|---|
| **Direct capture** | The process is visible at human scale | 熔炉里铝液流动、生产线机械运转 |
| **Magnified real** | The process is real but too small/fast/slow | 电子显微镜下的晶体结构、高速摄影的水滴碰撞 |
| **Schematic animation** | The process involves internal structure | 3D 剖面图展示 VC 均热板内部水蒸气循环 |
| **Metaphor animation** | The concept has no physical form | 铜离子在电解液中"游泳"到阴极板——把离子画成带电荷的小球 |
| **Scale comparison** | A number is too large/small to grasp | "如果把提取的铜排成线，可以绕地球 X 圈" |
| **Before/after split** | A transformation needs emphasis | 左半屏废旧手机 → 右半屏崭新零件 |

### Visualization spec format

For each knowledge point that requires visualization, write a spec:

```markdown
### KP3 可视化规格

**概念：** 偏析法提纯铝——利用铝和杂质熔点不同，在冷却管上凝固刮取纯铝
**难点：** "偏析"是不可见的微观过程
**策略：** 剖面动画（schematic animation）
**画面描述：**
1. 全景：偏析炉外观实拍（建立真实感）
2. 剖面切入：炉内部 3D 动画——熔融铝液中不同颜色粒子代表铝和杂质
3. 冷却管动画：温度梯度可视化（蓝→红），铝粒子先在管壁凝固，杂质粒子留在液体中
4. 刮取动画：刮刀沿管壁刮下纯铝薄片
5. 切回实拍：真实的纯铝片从炉中取出
**尺度：** 宏观（炉）→ 微观（分子）→ 宏观（产品）
**时长：** 15s
```

### The "sandwich" rule

For maximum credibility, sandwich animations between real footage:

```
实拍（建立真实感）→ 动画（解释原理）→ 实拍（证明结果）
```

The audience trusts real footage. The animation explains what they can't see. The return to real footage confirms "this really happens." Without the sandwich, animation feels hypothetical.

---

## Knowledge chain integrity check

Before writing prompts, run this self-check on your segment plan:

| Check | Pass? |
|---|---|
| Hook creates a clear information gap? | |
| Each knowledge point causally enables the next? | |
| No two adjacent segments are at the same scale (micro/macro alternation)? | |
| Every abstract concept has a visualization spec? | |
| Elevation theme was earned by the body content? | |
| Total segment count × 15s ≈ target video length? | |
| Each segment can answer "what did the viewer just learn?" in one sentence? | |
