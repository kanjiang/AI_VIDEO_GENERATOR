---
name: scene-board-skill
description: Create prompt-ready cinematic scene boards for image generation. Use whenever the user asks for a scene board, scene image, environment board, location board, space anchor frame, four-wall space setup, or wants to lock a scene's layout, lighting, and spatial continuity before video generation. This skill outputs a single 16:9 scene-board prompt focused on space, lighting, and environmental consistency.
---

# Scene Board Skill

You generate **scene-board prompts**, not screenplay pages, not shotlists, not final video prompts. The output is a prompt that can be pasted into an image model to generate a **single cinematic scene reference image**.

Default output language is **Chinese-first** when the user is writing in Chinese. Keep the writing dense, spatially clear, and production-facing.

## When to use

Trigger this skill when the user asks for any of the following:
- scene board
- scene image
- environment board
- location board
- set board
- space anchor frame
- background anchor image
- four-wall space setup
- 16:9 scene setup image

Do **not** use this skill for:
- screenplay writing
- 12-panel storyboard sheets
- character identity boards
- final Seedance video prompts
- asset inventory planning

If the user explicitly asks to lock **空间 / 场景 / 灯光 / 背景连续性**, prefer this skill over forcing a storyboard-table output.

## Core output goal

Produce one **detail-rich, model-ready scene-board prompt** that describes:
- **one 16:9 cinematic environment image**
- **clear spatial structure**
- **stable perspective and scale relationship**
- **reusable lighting logic for later video generation**
- **environment readability over decorative overload**

The image must feel like a reliable production anchor for later storyboard and video generation, not a poster and not a purely atmospheric concept painting.

## Locked scene-board requirements

These requirements are mandatory unless the user explicitly overrides them:

- 16:9 scene board image
- clear foreground, midground, and background logic
- readable entrances, exits, and movement paths
- stable horizon and believable perspective
- lighting direction that can be reused in later shots
- composition that supports later camera blocking
- environment-first readability

Always preserve the following intent in substance:

"Create a cinematic 16:9 scene board that locks the layout, lighting direction, depth structure, and environmental mood for later storyboard and video generation. Prioritize spatial clarity, continuity, and production usefulness over decorative complexity."

## Visual rules

Always push the prompt toward these image qualities:

- strong spatial readability
- clean perspective logic
- clear pathways for subject movement
- controlled environmental detail
- believable scale relationship between architecture and props
- lighting that supports continuity, not randomness
- atmospheric clarity without posterization

## Negative rules

Exclude these unless the user explicitly asks otherwise:

- poster composition
- hero-character-dominant framing
- overdesigned set dressing
- abstract impossible architecture
- extreme fisheye distortion
- random multi-directional lighting
- clutter that obscures pathways
- purely painterly mood image with no production utility
- **invented population** — armored soldiers, palace guards, ritual crowds, lobby extras

## Population rule（默认空场底板）

**Default: empty of identifiable people.** Scene boards lock space and light for later video mounts. If the location plate includes people, Seedance will treat them as ground truth forever (mount-only path b).

- Default output: architecture + props + light only; no soldiers, no crowd ranks, no hero characters
- If the script needs population later: say so in annotations, and generate a **separate Crowd asset** (`议事人群` / `会议观众` / etc.) — do not bake the crowd into the empty location plate
- If the user explicitly wants a populated plate: label it clearly as a population-bearing location and list which crowd types are locked
- Lighting wording: use **场景内次级 practical（窗/灯/屏）**, not film fill / softbox / LED strip language

## Prompt construction pattern

Default to a **Chinese scene-board prompt block** with paragraph nodes, matching this structure:

1. **Title line**
2. **Scene purpose sentence**
3. **Locked scene-board block**
4. **Spatial structure block**
5. **Lighting and atmosphere block**
6. **Camera compatibility block**
7. **Optional annotations block**
8. **Final continuity requirement block**

When the user asks for a scene board, prefer this format shape:

```text
**[场景名]场景图提示：**

创建一张电影化的 16:9 场景设定图。使用参考图像作为空间与气质基调。

这张图的目标是锁定场景布局、灯光方向、空间层次和后续视频生成的环境连续性。

[明确前景、中景、后景关系，入口出口、主要通道、关键道具、墙面、窗户、地面和视觉锚点的位置。]

[说明主光方向、场景内次级 practical 辅光（窗/灯/屏，非电影补光）、亮部与暗部关系、色温倾向、空气感和环境情绪。⚠️默认无人；若需人口须在标注中声明并另出人群资产。]

[说明这张图如何支持后续故事板和视频镜头，例如稳定透视、保留摄影机朝向依据、确保角色有明确运动路径。]

[如有必要，可加入少量手写批注，标出站位区、运动线、摄影机大致朝向或关键道具位置。]

[最终要求这张图必须能作为后续镜头的空间锚点，避免背景跳变、方位混乱和打光漂移。]
```

## Four-wall variant

If the user explicitly wants to stabilize a complex space for moving characters, you may output a stronger variant that asks for:

- fixed focal length
- eye-level camera
- consistent wide shot logic
- north / south / east / west wall coverage or equivalent four-directional spatial read

Use this only when the user's real problem is space continuity rather than single-image mood.

## Response mode

When using this skill, default to one of these two output forms only:

- **Chinese paragraph-node prompt only**
- **Chinese paragraph-node prompt + short negative prompt line**

Do not output workflow commentary unless the user explicitly asks for reasoning.

## Example

If the user says:

"给我这个公寓走廊做一张场景图提示词"

You should output something shaped like:

```text
**公寓走廊场景图提示：**

创建一张电影化的 16:9 场景设定图。使用参考图像作为空间结构与气氛基调。

这张图的核心目标是锁定走廊空间、门口关系、尽头窗光方向、墙面距离和后续镜头的行进路线，让后面的故事板和视频生成都能建立在同一个空间逻辑上。

走廊必须有清晰的前中后景层次：近处门框和墙角作为前景，中段地面与墙面形成稳定透视，远端窗户或灯源作为视觉锚点。明确入口、转角、住户门、消防设施和尽头位置，让观众能一眼理解人物从哪里出现、停顿和离开。

灯光应保持单一明确的主方向：尽头冷光或顶灯作为主要环境光源，局部门缝或壁灯作为次级光源，暗部必须统一，不能随机到处发亮。整体气压偏安静、封闭、略有压迫感，但不要做成夸张恐怖海报。

画面必须适合作为后续镜头的空间底板，透视稳定、尺度可信、地平线明确，允许少量手写批注标出人物行进线、摄影机朝向和关键停留点，但不要让批注破坏画面阅读性。

最终要求：这张图必须帮助后续视频生成稳定背景、方位和光线，不要让场景在不同镜头中变成另一个地方。
```

## Final instruction hierarchy

Always prioritize in this order:

1. User's scene content
2. 16:9 scene-board format
3. spatial continuity and layout clarity
4. lighting logic and atmospheric consistency
5. Chinese paragraph-node output structure when user writes in Chinese
6. production usefulness over decorative beauty

If the user asks for a scene board and gives no additional details, output the locked scene-board scaffold immediately using the provided reference-image subject.
