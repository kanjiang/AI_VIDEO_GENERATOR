---
name: science-explainer
description: Science & educational video production skill — narrative structure, visual rhythm, concept visualization, data annotation, and scale-jumping editing for knowledge-heavy short videos. Use whenever the user is making a science explainer, industrial documentary, tech breakdown, educational series, or any video where the primary goal is to teach complex information while keeping attention. Covers both prompt-level design and post-production editing decisions.
---

# Science Explainer Skill

This skill covers the **full production design** of knowledge-heavy short videos: science explainers, industrial documentaries, tech breakdowns, educational series, and any content where the core job is **turning complex information into watchable visual storytelling**.

It bridges prompt-level skills (`shotlist-builder`, `video-render-quality`) and post-production (`post-production`) by providing the **narrative logic and visual rhythm** decisions that sit above both.

## When to use

Trigger when the user asks about:
- Making a science or educational video
- Explaining a complex process (industrial, biological, technological, historical)
- Structuring a knowledge-heavy video to hold attention
- Visualizing abstract concepts (chemical reactions, data flows, physical forces)
- Designing the pacing and information density of an explainer
- Adding on-screen data callouts, term labels, or statistic highlights
- Planning a "hook → explanation → elevation" narrative arc

Do NOT use when:
- The user is writing a character-driven story — use `screenwriter-skill`
- The user is doing pure prompt engineering without narrative planning — use `shotlist-builder`
- The user is only asking about CapCut editing mechanics — use `post-production`

## Reference files

- [reference/narrative-structure.md](reference/narrative-structure.md) — Hook-Progression-Elevation three-act structure, concept visualization patterns, the "one segment = one knowledge point" rule
- [reference/editing-rhythm.md](reference/editing-rhythm.md) — Scale jumping (micro ↔ macro), pacing rules, information density control, transition logic
- [reference/data-annotation.md](reference/data-annotation.md) — On-screen data callouts, terminology labels, statistic highlights, visual hierarchy of text overlays

## Core principles

### 1. One segment, one knowledge point

Every 15-second prompt (or every post-production cut unit) carries exactly **one** core piece of information. Not zero (filler), not three (overload). The audience should be able to answer "what did I just learn?" after each segment.

### 2. Show, don't lecture

Abstract concepts must be **visually decomposed** before they appear in narration. If the script says "electrolytic refining purifies copper to 99.98%", the visual must show the process — ions moving, crystals forming, purity climbing — not a talking head saying the words.

### 3. Scale jumping is the rhythm engine

The primary pacing tool in science video is **alternating between micro and macro scales**:
- Micro: molecular animations, material close-ups, internal mechanics
- Macro: factory aerials, city panoramas, earth-scale context

Every 2–3 segments, the camera scale should jump. This prevents visual fatigue and creates natural breathing rhythm.

### 4. Hook with contrast, close with elevation

- **Hook** (first 3–5 seconds): a strong visual or factual contrast that creates an information gap. "100 million phones contain 3 tons of gold" — the audience needs to know how.
- **Close** (last segment): elevate from the specific process to a universal theme. From "how copper gets recycled" to "a planet where nothing is wasted."

### 5. Data is visual, not verbal

Key numbers, percentages, and technical terms should appear **on screen** as designed text elements, not buried in narration alone. Dual-channel delivery (visual + audio) dramatically increases retention.

## Scope boundaries

| Task | Handled by | NOT this skill |
|---|---|---|
| Narrative arc and segment planning | **This skill** | |
| Concept visualization strategy | **This skill** | |
| Actual prompt writing (Seedance format) | `shotlist-builder` + `video-render-quality` | |
| CapCut editing mechanics (keyframes, masks) | `post-production` | |
| Data callout design spec | **This skill** | |
| Data callout CapCut execution | `post-production` / `text-effects.md` | |
| Camera emotion sync | `CAMERA_EMOTION.md` | |
| Scale-jump rhythm planning | **This skill** (provides the plan) | |
| Scale-jump prompt implementation | `shotlist-builder` (writes the prompt) | |

## Integration with the production pipeline

```
Topic Research → Narrative Structure → Segment Plan → Video Prompts → AI Generation → Post-Production → Final
                 ↑ THIS SKILL            ↑ THIS SKILL    ↑ shotlist-builder        ↑ post-production
                 (hook/progression/       (1 segment =     + video-render-quality    + data-annotation
                  elevation arc)           1 knowledge                                execution
                                           point plan)
```

## Workflow

1. **Define the knowledge chain** — list the 5–10 core knowledge points in causal order
2. **Design the hook** — find the strongest contrast/gap in the topic (see `narrative-structure.md`)
3. **Map the segment plan** — assign one knowledge point per segment, plan scale jumps between them
4. **Specify concept visualizations** — for each abstract concept, define the visual decomposition approach
5. **Mark data callouts** — identify which numbers/terms need on-screen text treatment
6. **Write the elevation close** — connect the specific topic to a universal theme
7. **Hand off to `shotlist-builder`** — the segment plan becomes the input for video prompts
8. **Hand off to `post-production`** — data callout specs become text effect tasks
