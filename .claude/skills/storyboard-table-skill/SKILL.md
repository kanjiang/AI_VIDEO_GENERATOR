---
name: storyboard-table-skill
description: Create prompt-ready storyboard table sheets or adjacent visual-development boards for image generation. Use whenever the user asks for a storyboard sheet, storyboard table, panel board, twelve-panel storyboard, storyboard contact sheet, shot board, a 16:9 character identity board, or wants a scene turned into a single storyboard page rather than a shotlist. This skill outputs either a locked 12-panel storyboard page prompt or a 16:9 artistic character identity board prompt.
---

# Storyboard Table Skill

You generate **storyboard sheet prompts** and **character identity board prompts**, not screenplay pages, not shotlists. The output is a prompt that can be pasted into an image model to generate a **single storyboard page** or a **single identity-board image**.

Default output language is **Chinese-first** when the user is writing in Chinese. Keep the writing dense, visual, and director-facing.

## When to use

Trigger this skill when the user asks for any of the following:
- storyboard table
- storyboard sheet
- storyboard board
- 12-panel storyboard
- cinematic panel sheet
- one-page storyboard layout
- contact-sheet style storyboard
- a scene converted into storyboard panels
- character identity board
- character presentation board
- role identity sheet
- 16:9 identity board

Do **not** use this skill for:
- full shotlists
- seedance video prompts
- screenplay writing
- asset generation
- single finished illustration prompts

If the user explicitly asks for a **角色身份板 / character identity board**, switch to the identity-board mode below instead of forcing a 12-panel storyboard layout.

## Core output goal

Produce one **detail-rich, model-ready storyboard page prompt** that describes:
- **one 16:9 storyboard table sheet**
- **12 cinematic panels** on the same page
- **black-and-white only**
- **rough pencil storyboard sketch language only**
- **minimal detail, strong silhouette readability, unfinished energy**

The page must feel like an early film director's storyboard page, not a polished comic page.

By default, prefer a **full paragraph-node structure** instead of a compressed one-line prompt.

## Locked visual style

These requirements are mandatory in every prompt unless the user explicitly overrides layout count:

- 16:9 storyboard table sheet
- 12 cinematic panels
- black and white only
- rough pencil lines only
- minimal detail
- fast hand-drawn energy
- simple structural blocking
- clear silhouette readability
- lightweight, dynamic, unfinished storyboard sketch aesthetic

Always preserve the following style intent in substance:

"16:9 storyboard table, 12 cinematic panels, actual storyboard drawing in black and white only: rough pencil lines, minimal detail, quick hand-drawn energy, simple breakdown construction, and strong outline readability. Keep the artwork light, dynamic, and unfinished, like early film storyboard roughs."

## Visual rules

Always push the prompt toward these image qualities:

- readable panel-to-panel progression
- clear camera staging
- strong foreground/background separation through line weight, not rendering
- gesture-first drawing over texture-first drawing
- framing variety across the 12 panels
- simple environmental indication only where needed for blocking
- faces suggested economically, never over-rendered
- props indicated only when narratively necessary

## Negative rules

Exclude these in every prompt unless the user explicitly asks otherwise:

- color
- watercolor
- marker rendering
- polished ink illustration
- graphic novel finish
- heavy shading
- dense crosshatching
- realistic texture rendering
- painterly lighting
- glossy concept art finish
- anime clean line art
- comic-book polish
- poster composition instead of storyboard page layout

## Prompt construction pattern

Default to a **Chinese storyboard prompt block** with paragraph nodes, matching this structure:

1. **Title line**
2. **Scene objective sentence**
3. **Locked storyboard style block**
4. **Character / subject description block**
5. **Performance and motion block**
6. **Cinematography block**
7. **Environment block**
8. **Annotation legend block**
9. **Ending pose / final panel block**

When the user asks for a storyboard table prompt, prefer this format shape:

```text
**[镜头名/场景名]故事板提示：**

为故事板创建一个[场景类型]场景，专注于[核心动作/情绪/事件]。使用参考图像作为角色和场景基调。

16:9 故事板表格，12 个电影风格面板。实际故事板绘图必须仅为黑白：粗糙的铅笔线条、最小细节、快速手绘图能量、简单的结构构建以及强烈的轮廓可读性。保持艺术作品轻量、动态且未完成，就像早期的电影分镜草图。

[主体角色/物体/空间的详细视觉描述。]

[每个面板应体现的动作动态、身体语言、情绪张力、姿态变化。]

[电影摄影语言：机位、运动、镜头压缩、俯视、侧面轮廓、特写、负空间、手持能量。]

[环境氛围和必要布景，仅保留叙事所需信息。]

标注颜色系统：红色箭头 = 身体/手部运动；蓝色箭头 = 摄影机运动；绿色标记 = 取景 / 构图笔记；橙色标记 = 灯光方向；紫色标记 = 声音 / 情感强调；黑色文本 = 简短镜头笔记和面板标签。

[以最终关键姿势或收束画面结束。]
```

The style block in paragraph 3 is mandatory unless the user explicitly changes layout count.

## If the user provides scene content

Translate the scene into 12 panels by prioritizing:
- entrance / setup
- spatial orientation
- action escalation
- reaction beats
- insert or detail beats only if truly necessary
- final payoff or exit image

Do not narrate all 12 panels one by one unless the user asks. By default, write a dense scene-level storyboard prompt that implies a full 12-panel sheet.

## Locked storyboard style block

Unless the user explicitly overrides it, preserve this wording in Chinese substance:

```text
16:9 故事板表格，12 个电影风格面板。实际故事板绘图必须仅为黑白：粗糙的铅笔线条、最小细节、快速手绘图能量、简单的结构构建以及强烈的轮廓可读性。保持艺术作品轻量、动态且未完成，就像早期的电影分镜草图。
```

## Character identity board mode

If the user asks for a **角色身份板**, output a **single artistic 16:9 identity board prompt** instead of a 12-panel sheet.

Core requirements for this mode:

- one artistic 16:9 character identity board
- use the reference image as the primary subject source
- emphasize identity, silhouette, costume logic, props, and emotional aura
- cinematic layout, but not a storyboard grid
- allow a more polished presentation than the rough storyboard mode unless the user asks for sketch treatment

Preferred Chinese output shape:

```text
**[角色名]角色身份板提示：**

创建一张艺术性的 16:9 角色身份板。

[主体]：使用参考图像。

[身份定位]：明确角色的职业、阶层、处境、气质与核心矛盾。

[造型要求]：强调服装层次、轮廓特征、材质关系、道具识别点、姿态控制与面部神情。

[画面设计]：以电影化方式组织主体、留白、局部特写、小型辅助元素、版面节奏与视觉焦点，使整张身份板既有展示感，也有角色叙事含义。

[氛围与灯光]：说明色调倾向、光线方向、空间气压、情绪温度与视觉质感。

[附加信息]：可加入关键词标签、简短批注、材质说明、身份标签或世界观提示，但不要把画面做成信息过载的海报排版。
```

Default identity-board guidance:

- the main figure should dominate the composition
- supporting insets may show hands, props, profile, footwear, or facial tension
- keep the board cinematic and curated rather than commercial-poster-like
- preserve the subject's reference-image identity markers
- prioritize role readability over decorative complexity

If the user gives only a bare identity-board request, do not ask follow-up questions first. Output the locked identity-board scaffold using the supplied subject reference.

## If the user asks for a stronger direct-use prompt

Return a richer multi-paragraph variant, not a compressed single sentence.

Preferred fuller variant:

```text
为故事板创建一个[场景功能]场景，专注于[动作核心 / 情绪核心 / 表演核心]。使用参考图像作为角色和场景基调。

16:9 故事板表格，12 个电影风格面板。实际故事板绘图必须仅为黑白：粗糙的铅笔线条、最小细节、快速手绘图能量、简单的结构构建以及强烈的轮廓可读性。保持艺术作品轻量、动态且未完成，就像早期的电影分镜草图。

[主体、服装、道具、空间、动作与姿势描述。]

[强调每个面板都必须可见动作动势、摄像机变化和轮廓清晰度。]

[电影风格摄影技巧与环境气氛。]

标注颜色系统：红色箭头 = 身体/手部运动；蓝色箭头 = 摄影机运动；绿色标记 = 取景 / 构图笔记；橙色标记 = 灯光方向；紫色标记 = 声音 / 情感强调；黑色文本 = 简短镜头笔记和面板标签。

[最终张力姿势 / 结尾收束面板。]
```

## Response mode

When using this skill, default to one of these two output forms only:

- **Chinese paragraph-node prompt only**
- **Chinese paragraph-node prompt + short negative prompt line**

Do not output workflow commentary unless the user explicitly asks for reasoning.

## Example

If the user says:

"把这场追逐做成故事板表格提示词"

You should output something shaped like:

```text
**追逐场景故事板提示：**

为故事板创建一个高压夜间追逐场景，专注于人物从巷口冲刺、转向、失衡、回望到最终逼近边缘对峙的全过程。使用参考图像作为角色和场景基调。

16:9 故事板表格，12 个电影风格面板。实际故事板绘图必须仅为黑白：粗糙的铅笔线条、最小细节、快速手绘图能量、简单的结构构建以及强烈的轮廓可读性。保持艺术作品轻量、动态且未完成，就像早期的电影分镜草图。

主角与追逐者都必须保持强烈轮廓区分：冲刺时前倾、转角时扭胯、失衡时摆臂、回头时颈线紧张、逼近边缘时身体重心被明显拉向画框一侧。每个面板都应保留清晰的身体方向和动作势能，避免静止站姿。

使用电影化摄影语言：宽景建立空间关系，中景推进速度感，近景捕捉回望与呼吸变化，俯视强化空间压迫，长焦压缩追逐距离，快速平移和手持晃动增强现场感，最终在边缘对峙时切入强负空间构图。

环境只保留巷道、墙面、出口、屋顶边缘等叙事必须元素，不要复杂材质，不要精细背景，不要把画面做成完成插画。

标注颜色系统：红色箭头 = 身体/手部运动；蓝色箭头 = 摄影机运动；绿色标记 = 取景 / 构图笔记；橙色标记 = 灯光方向；紫色标记 = 声音 / 情感强调；黑色文本 = 简短镜头笔记和面板标签。

以最终临边急停的张力姿势结束：人物半转身、胸口起伏、手臂仍带冲势，身体在画面边缘形成强烈悬置感。
```

## Reference-style fidelity

If the user provides a reference example with rich paragraph nodes, preserve:

- the same node order
- the same detail density
- the same Chinese descriptive cadence
- the same explicit annotation legend style
- the same ending-pose paragraph logic

Do not "helpfully" compress a rich example into a short prompt unless the user asks for compression.

## Final instruction hierarchy

Always prioritize in this order:

1. User's scene content
2. 16:9 sheet format
3. requested output mode: 12-panel storyboard page or character identity board
4. 12-panel board structure when the request is for storyboard
5. black-and-white rough pencil storyboard aesthetic when the request is for storyboard
6. Chinese paragraph-node output structure when user writes in Chinese
7. minimal-detail unfinished film-sketch energy when the request is for storyboard

If the user asks for a storyboard table prompt and gives no scene details, output the locked style prompt first and ask for scene content only after that.

If the user asks for a character identity board and gives no additional details, output the identity-board scaffold immediately using the provided reference-image subject.
