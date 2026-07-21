# Data Annotation Design for Science Explainers

On-screen text in science videos serves a different function than in narrative films. In narrative, text is avoided. In science explainers, **text is a teaching tool** — it reinforces key numbers, defines unfamiliar terms, and anchors the viewer's memory.

## Annotation types

### Type 1 — Statistic Highlight (数据强化)

A key number displayed prominently to anchor the viewer's memory.

**When to use:** When a number is the core takeaway of a segment.

**Design spec:**

| Parameter | Value |
|---|---|
| Position | Center or lower-third, depending on visual composition |
| Font size | Large — 80–120pt (must be readable on mobile) |
| Font weight | Bold / Extra Bold |
| Color | White with dark shadow, or accent color matching video palette |
| Animation | Scale-up entrance (0.3s) + hold (1.5–2s) + fade-out (0.3s) |
| Duration on screen | 2–3 seconds |
| Pairing | Always paired with narration saying the same number |

**Examples:**
- `99.98%` (copper purity)
- `167 吨` (gold from 30,000 phones)
- `30%` (recycled material ratio)
- `40 年` (remaining copper reserves)

**CapCut execution:** Use the `post-production` skill's text effect recipes. The "Scan Glow" effect from `text-effects.md` works well for statistic reveals.

---

### Type 2 — Term Label (术语标注)

A technical term displayed near the relevant visual element, with a brief inline definition.

**When to use:** When a specialized term appears for the first time and the audience may not know it.

**Design spec:**

| Parameter | Value |
|---|---|
| Position | Near the relevant object/area in the frame, with a thin leader line if needed |
| Font size | Medium — 36–48pt |
| Font weight | Regular or Medium |
| Color | White or light gray, high contrast against background |
| Background | Semi-transparent dark pill/chip behind text (opacity 60–70%) |
| Format | `术语 — 一句话定义` or `术语 Term` (bilingual if audience needs it) |
| Animation | Fade-in (0.2s) + hold (3–4s) + fade-out (0.2s) |
| Duration on screen | 3–4 seconds (longer than statistics — reader needs time for the definition) |

**Examples:**
- `偏析炉 — 利用熔点差异分离金属杂质`
- `电解精炼 Electrolytic Refining — 用电流将粗铜纯化至 99.98%`
- `VC 均热板 — 手机内部散热核心组件`

---

### Type 3 — Process Step Indicator (流程步骤)

A numbered step label that shows where the viewer is in a multi-step process.

**When to use:** When explaining a sequential process with 3+ steps.

**Design spec:**

| Parameter | Value |
|---|---|
| Position | Top-left or bottom-left corner, consistent across all steps |
| Font size | Medium — 36–48pt |
| Format | `Step N / Total` or `第N步 / 共M步` or simple `① ② ③` |
| Color | Accent color, consistent throughout the sequence |
| Background | Semi-transparent pill |
| Animation | Slide-in from left (0.2s) + hold entire segment + slide transition to next number |
| Persistence | Stays on screen for the entire segment |

**Example sequence:**
- Segment 3: `① 拆解分类`
- Segment 4: `② 偏析提纯`
- Segment 5: `③ 电解精炼`
- Segment 6: `④ 零件制造`

---

### Type 4 — Comparison Callout (对比标注)

Side-by-side or before/after data displayed to highlight contrast.

**When to use:** When comparing two values to show improvement, difference, or contrast.

**Design spec:**

| Parameter | Value |
|---|---|
| Layout | Split-screen labels: left value vs. right value, or stacked with arrow |
| Font size | Large — 60–80pt for the numbers, 24–30pt for labels |
| Color | Contrasting colors for the two values (e.g., red for old, green for new) |
| Connector | Arrow (→), vs mark, or animated transition between values |
| Animation | Left value appears first (0.3s), hold 1s, then right value appears (0.3s), hold 1.5s |

**Examples:**
- `原铝能耗 100% → 再生铝能耗 5%`
- `原矿开采 CO₂ 排放 vs 回收再生 CO₂ 排放`

---

### Type 5 — Source / Credit Tag (来源标注)

A small attribution tag for data sources, footage credits, or research references.

**When to use:** When displaying specific data claims that need sourcing, or when using third-party footage.

**Design spec:**

| Parameter | Value |
|---|---|
| Position | Bottom-right corner |
| Font size | Small — 18–24pt |
| Color | Light gray or white at 60% opacity |
| Duration | Visible for the segment where the data is cited |
| Format | `数据来源：[source]` or `Source: [reference]` |

---

## Visual hierarchy

When multiple annotation types appear simultaneously, follow this stacking order (most prominent → least):

1. **Statistic Highlight** — largest, center/lower-third
2. **Comparison Callout** — large, split positioning
3. **Term Label** — medium, near the relevant object
4. **Process Step Indicator** — medium, fixed corner position
5. **Source Tag** — smallest, corner, never competes

**Maximum simultaneous annotations: 2.** Never display more than 2 text elements at the same time. If you need a statistic AND a term label in the same segment, stagger them — show the term first (fade out), then the statistic.

---

## Integration with prompt-level work

Data annotations are **post-production tasks** — they are added in CapCut after video generation. However, they should be **planned at the segment-plan stage** so the visual composition leaves space for text.

In the segment plan, mark annotation needs:

```markdown
| 段号 | 知识点 | 标注类型 | 标注内容 | 位置 |
|---|---|---|---|---|
| S01 | Hook | Statistic | "3 万部手机 = 167 吨黄金" | 画面中央 |
| S03 | 偏析法 | Term | "偏析炉 — 利用熔点差异分离杂质" | 炉体旁 |
| S03 | 偏析法 | Step | "① 偏析提纯" | 左上角 |
| S04 | 电解精炼 | Statistic | "99.98%" | 画面中央 |
| S04 | 电解精炼 | Step | "② 电解精炼" | 左上角 |
```

When writing video prompts, ensure the composition **leaves clean space** for planned annotations:

```
⚠️构图预留：画面下方1/4保持低信息密度区域，用于后期叠加数据标注文字。
```

---

## Common mistakes

| Mistake | Fix |
|---|---|
| Text too small to read on mobile | Minimum 36pt for labels, 60pt for statistics |
| Too many annotations at once (3+) | Max 2 simultaneous, stagger the rest |
| Annotations block key visual elements | Position check: does the text cover the thing it's labeling? |
| No animation — text just appears/disappears | Always use at least a 0.2s fade or scale entrance |
| Inconsistent positioning across segments | Pick a system (step indicators always top-left) and stick to it |
| Data without source on controversial claims | Add Type 5 source tag for any non-obvious statistic |
| Using annotations as a crutch for weak visuals | If the concept needs text to be understood, the visualization has failed — fix the visual first |
