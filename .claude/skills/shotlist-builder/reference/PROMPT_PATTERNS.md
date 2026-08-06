# Prompt Patterns

Every Chinese Seedance 2.0 prompt follows the hybrid section order. Hit every section in sequence; don't skip; don't reorder. The goal is a prompt Seedance can parse: hard locks first, continuity second, cinematic action in one readable director paragraph, then sync and negative constraints.

## Structural order

1. **`【挂载资源与音频硬约束】`** — handle declarations, image/audio locks, dialogue preservation, no subtitles/title. ⚠️ **默认禁止BGM** — 背景音乐由 `bgm-scoring` skill 在后期独立制作；生成阶段只保留环境音与动作音效
2. **`【首帧衔接】`** — previous tail-frame continuity, or current-reference establishment if this is the first video
3. **`【规格】`** — duration, aspect ratio, live-action cinematic realism, practical light, shallow DOF, film grain
4. **`【电影化动态描述】`** — camera, action, lighting, performance, spatial continuity, sound, final landing
5. **`【音画同步】`** — only when dialogue, off-screen voice, phone audio, or key SFX needs timing control
6. **`【尾帧转场】`** *(optional)* — tail-frame transition setup for the next segment; only when the transition needs in-prompt planning
7. **`【负面约束】`** — concise Seedance guardrails that do not override the main action

For multi-shot prompts, keep this outer order and place internal `【镜头N】` blocks inside `【电影化动态描述】`.

## Section 1 — 资产挂载 + `【挂载资源与音频硬约束】`

Every prompt opens with two parts: **named asset handles** (独立行，在正文之前) and the **hard constraint block** (正文段落)。

### Handle format (资产挂载格式)

Use the **named handle format** `@资产名=资产名 — 参考描述。` — one handle per line, placed BEFORE `【挂载资源与音频硬约束】`:

```
@设备间全景=设备间全景 — 参考设备间全景。
@采样文件列表=采样文件列表 — 参考采样文件列表界面。
@林深=林深 — 参考林深角色定妆。
@周妍=周妍 — 参考周妍角色定妆。

【挂载资源与音频硬约束】本视频必须严格使用已挂载的设备间全景、采样文件列表界面、林深形象与周妍形象参考；...对白必须使用剧本原文语言，不翻译、不改写...无字幕，无文字标题，无屏幕文字，无背景音乐；只保留环境音与动作声，以及真实语音混响。
```

**Handle syntax:** `@[asset_name]=[asset_name] — 参考[description]。`

- `@` prefix — marks this as a reference asset
- First `[asset_name]` — the handle identifier used in the prompt body
- `=` — assignment separator
- Second `[asset_name]` — the display name (usually identical to the first)
- ` — 参考[description]。` — brief description of what this asset locks down

### Handle naming rules

| Asset type | Naming pattern | Example |
|---|---|---|
| Character | `@角色名=角色名 — 参考角色名角色定妆。` | `@林深=林深 — 参考林深角色定妆。` |
| Scene/Location | `@场景名=场景名 — 参考场景名。` | `@设备间全景=设备间全景 — 参考设备间全景。` |
| Prop | `@道具名=道具名 — 参考道具名。` | `@手绘地图=手绘地图 — 参考手绘地图道具。` |
| UI/Interface | `@界面名=界面名 — 参考界面名界面。` | `@采样文件列表=采样文件列表 — 参考采样文件列表界面。` |
| Color card | `@色卡=色卡 — ⚠️色彩参考图，仅用于锁定全片色调，非场景内容。` | (see Color card section below) |
| Pose reference | `@姿势参考=姿势参考 — ❌NOT A VIDEO FRAME❌ 仅用于提取身体姿势角度。` | (see Pose reference section below) |
| Video ref (camera only) | `@运镜参考=运镜参考 — ⚠️仅参考运镜轨迹，不参考画面人物、场景、动作。` | (see Video reference section below) |
| Video ref (camera + action) | `@动作参考=动作参考 — 参考运镜与人物动作轨迹。` | (see Video reference section below) |

### Handle ordering

Handles are listed by asset type, in this priority order:

1. **色卡** (if project uses color card — always first)
2. **运镜参考/动作参考** (if using video reference — before scene, so AI prioritizes trajectory)
3. **场景/空间** — environment establishes context first
4. **界面/道具** — objects within the scene
5. **角色** — characters placed into the scene

Each prompt only lists the handles it actually uses — different prompts within the same scene may have different handle subsets.

### Hard constraint block (硬约束正文)

After the handles, write the `【挂载资源与音频硬约束】` block. This paragraph references handles **by name** (not by number) and declares all hard locks:

**Without color card (single-shot or intentionally varying palettes):**
```
【挂载资源与音频硬约束】本视频必须严格使用已挂载的[列出所有资产名]参考；[角色/空间/道具]外貌、服装、发型、气质与身份感严格参考挂载图，不重新设计、不重新描述，只表现口型、眼神、呼吸、手指、重心、衣料受力与微表情。对白必须使用剧本原文语言，不翻译、不改写。无字幕，无文字标题，⚠️无背景音乐、无配乐、无乐器声；保留并丰富环境音（风声、雨声、虫鸣、城市底噪等）、动作音效（脚步、碰撞、衣物摩擦等）和真实语音混响。
```

**With color card (≥ 3 video prompts — recommended):**
```
【挂载资源与音频硬约束】本视频必须严格使用已挂载的色卡色调参考、[列出其他资产名]参考；全片色温与饱和度严格参考色卡；[角色/空间/道具]外貌、服装、发型、气质与身份感严格参考挂载图，不重新设计、不重新描述，只表现口型、眼神、呼吸、手指、重心、衣料受力与微表情。对白必须使用剧本原文语言，不翻译、不改写。无字幕，无文字标题，⚠️无背景音乐、无配乐、无乐器声；保留并丰富环境音（风声、雨声、虫鸣、城市底噪等）、动作音效（脚步、碰撞、衣物摩擦等）和真实语音混响。
```

The key additions when using a color card: `色卡色调参考` in the asset list, and `全片色温与饱和度严格参考色卡` as an explicit lock.

**⚠️ Audio rule: BGM is ALWAYS excluded at generation time.** Background music is produced separately by the `bgm-scoring` skill and mixed in post-production. However, **ambient sounds and action SFX are encouraged** — they add texture that's difficult to recreate in post. Examples of sounds to KEEP:

- 环境音: wind, rain, crickets, traffic hum, room tone, HVAC, water running
- 动作音效: footsteps, door close, cup on table, fabric rustle, keyboard typing
- 空间回响: room reverb on dialogue, echo in hallways, muffled sounds through walls
- 情绪音效: heartbeat in tense scenes, breathing in quiet moments

Rules:
- Character handles — reference by name in the constraint block, no need to repeat full wardrobe description (that's in the asset image itself)
- Location handles — reference by name, spatial layout is in the asset image
- Prop handles — reference by name, visual details are in the asset image
- If dialogue exists, add `对白必须使用剧本原文语言，不翻译、不改写。` — Chinese-dialogue projects use Chinese lines; English-dialogue projects (e.g. US theatrical scripts) use English lines inside the Chinese prompt body. Never invent a third language.
- For wet/dry/blood/dust state changes between scenes, note the state in the constraint block (`湿发贴额`, `溅血渍`)
- The constraint block references assets **by Chinese name**, not by numbered index

### Body reference rule (正文引用规则)

After handles are declared, all later sections use the **plain asset name only**. Do not repeat the `@` prefix in `【电影化动态描述】`, `【音画同步】`, `【尾帧转场】`, or `【负面约束】`.

Correct:
```
@林深=林深 — 参考林深角色定妆。

【电影化动态描述】林深从C点操作台前抬头，看向周妍。
```

Wrong:
```
【电影化动态描述】@林深从C点操作台前抬头，看向@周妍。
```

Reason: `@资产名=资产名` already binds the asset at the top. Repeating `@` in the body adds noise and makes prompts harder to read.

### Color card handle (色卡 handle)

When the project uses a color card for cross-segment color consistency (see `style-extractor` skill → Step 1.5), the color card is always the **first** handle:

```
@色卡=色卡 — ⚠️色彩参考图——本图仅用于锁定全片色调（主色[X]/辅色[Y]/点缀色[Z]），非场景内容。所有画面的色温、饱和度、明暗对比必须与本色卡一致。禁将色卡内容渲染为画面元素。
@场景A=场景A — 参考场景A。
@角色A=角色A — 参考角色A角色定妆。
```

Rules:
- Color card is **global** — it appears in EVERY prompt of the project, always as the first handle
- The handle description must contain `⚠️色彩参考图` and `禁将色卡内容渲染为画面元素`
- Color card works alongside the text `调色：` line (double insurance — see `STYLE_BLOCK.md`)
- If the project does not use a color card, skip this handle

### Pose reference handle (姿势参考 handle)

For static-pose-reference handles (used for body posing only, not full image generation):

```
@姿势参考=姿势参考 — ❌NOT A VIDEO FRAME❌ 此图仅用于提取身体姿势角度数据。⚠️静态姿势参考——禁止将此图渲染/复制/再现为视频的任何一帧。
```

### Video reference for camera movement (运镜参考视频)

Instead of describing complex camera movement entirely in text, upload a **reference video clip** and let Seedance copy its camera trajectory. Text prompt then only handles content (characters, scene, lighting) — not camera choreography.

**When to use video reference:**
- Complex movements that are hard to describe in text (multi-axis crane + dolly, one-shot long takes, intricate orbit paths)
- When text-described movements keep producing distorted/shaky results
- When a specific film's camera work is the target and you have the clip
- Batch production where you want uniform camera language across all segments

**When to stay with text-only:**
- Simple movements (static, push-in, pull-out, basic lateral track)
- When the movement is tied to character emotion and needs phase labels (§1–§2 in `CAMERA_EMOTION.md`)
- When no suitable reference clip exists

#### Two reference modes

**Mode 1: Camera trajectory only (最常用)**

```
@运镜参考=运镜参考 — ⚠️仅参考运镜轨迹，不参考画面人物、场景、动作。优先保证镜头运动丝滑不变形。
@场景A=场景A — 参考场景。
@角色A=角色A — 参考角色定妆。

【挂载资源与音频硬约束】本视频运镜轨迹严格跟随运镜参考视频；画面内容、人物、场景、动作以本提示词文字描述和图片参考为准，⚠️不复制参考视频中的任何画面内容。...
```

Use this for: most scenes. Camera movement comes from the reference video; everything else comes from your text + image assets.

**Mode 2: Camera + character action**

```
@动作参考=动作参考 — 参考运镜与人物动作轨迹。
@角色A=角色A — 参考角色定妆。

【挂载资源与音频硬约束】本视频运镜轨迹与人物动作节奏参考动作参考视频；人物外观以角色A参考图为准，⚠️不复制参考视频中的人物形象。...
```

Use this for: martial arts, dance, synchronized movement — scenes where the body choreography is as important as the camera path. **Caution:** character appearance may drift toward the reference video's actors; strengthen identity locks in `【负面约束】`.

#### Reference video preparation rules

| Rule | Value | Why |
|---|---|---|
| Duration | 5–15 sec, matching target generation length | Duration mismatch causes trajectory distortion |
| Stability | Use stabilized / gimbal footage | Handheld shake transfers to the generated video |
| Head/tail trim | Remove first and last 0.5–1 sec | Reference clips often have unstable start/end frames |
| Content | Irrelevant if using Mode 1 | AI copies trajectory, not content |
| Complexity | One movement type per clip | Don't combine orbit + push-in + crane in one reference |

#### Weight balancing

The text prompt and video reference can conflict. Follow these rules:

| Goal | Strategy |
|---|---|
| High trajectory fidelity | Add `运镜轨迹严格跟随参考视频` + `优先保证镜头运动丝滑不变形` |
| Creative freedom on content | Add `仅复用镜头运动，不参考画面构图、色调、人物` |
| ⚠️ Avoid conflicts | Do NOT describe camera movement in text when using a video reference — text says "环绕" but reference does "推入" = chaos |

**Critical rule:** When using video reference, **remove all text-based camera movement descriptions** from `【电影化动态描述】`. The `机位` line should only specify focal length and shot size, not movement:

```
❌ 错误：机位：35mm广角，⚠️极速推进（rush dolly-in）——从入口冲向角色...
           （文字运镜与参考视频运镜冲突）

✅ 正确：机位：35mm广角，中景。⚠️运镜轨迹严格跟随运镜参考视频。
```

#### Reference video library convention (运镜素材库)

For series production, maintain a categorized library of camera movement reference clips:

```
assets/camera-refs/
├── push-in/          # 推入镜头
├── pull-out/         # 拉远镜头
├── orbit/            # 环绕镜头
├── lateral-track/    # 水平横移
├── aerial-dive/      # 航拍俯冲
├── crane/            # 摇臂升降
├── dolly-zoom/       # 希区柯克推拉变焦
├── intrusion/        # 闯入镜头
├── long-take/        # 一镜到底
└── static/           # 固定机位（对话场景用）
```

At shotlist phase, match each shot to a reference clip from the library instead of writing movement text from scratch.

#### Troubleshooting

| Problem | Fix |
|---|---|
| 运镜扭曲、轨迹跑偏 | 缩短参考视频时长；加 `镜头运动匀速丝滑，无加速突变` |
| 人物跟着参考视频里的人动 | 改用 Mode 1（仅运镜）；加 `不参考人物动作` |
| 画面持续抖动 | 换用稳定器拍摄的参考素材；加 `画面稳定，无多余抖动` |
| 多角色对话运镜混乱 | 对话镜头优先用固定机位参考视频 |
| 人物形象漂移（Mode 2） | 强化 `角色外观严格参考角色定妆图，禁止参考视频人物形象侵入` |

#### Integration with CAMERA_EMOTION.md

Video reference and text-based camera patterns are **two alternative methods** for the same goal:

| Method | Best for | Defined in |
|---|---|---|
| Text patterns (§1–§11) | Simple-to-moderate movements, emotion-synced camera, symbolic shots | `CAMERA_EMOTION.md` |
| Video reference | Complex trajectories, film-specific reproduction, batch consistency | This section |

You can combine them: use video reference for the base trajectory, then add text-based **emotion phases** (§2) on top — e.g., "运镜轨迹跟随参考视频，但前半段手持呼吸感强（角色紧张），后半段逐渐稳定（角色平静）."

---

## Section 2 — `【首帧衔接】`

Always declare how the first frame starts. If there is a previous video, the new video must start from its tail frame:

```
【首帧衔接】以上一视频（镜头 003）尾帧作为本视频首帧。第一帧必须延续上一尾帧的站位、视线轴、光源方向、焦点、构图、道具状态和环境明暗，再进入本镜动作。
```

For the first video in a sequence:

```
【首帧衔接】本镜头是全片第一个视频，首帧从本镜头参考图建立，锁定主角、光源、空间方向和关键道具。
```

## Section 3 — `【规格】`

Always include duration, aspect ratio, and render quality anchors here, not as a loose footer.

### Basic format

```
【规格】15秒，21:9，真人实拍电影质感，真实场景光，浅景深，轻微胶片颗粒。
```

### Render quality anchors (recommended)

When stronger visual fidelity is needed, append render quality anchors after the basic specs. Pick a render profile from `video-render-quality` skill or select directives manually. Each dimension is declared independently so it can be adjusted without disrupting other parameters:

```
【规格】15秒，21:9。
画质：8K
质感：真人实拍电影质感，柯达Vision3 500T胶片颗粒
光追：光线追踪反射与光线追踪阴影
色彩科学：ARRI Alexa色彩科学
噪点：轻微胶片颗粒
动态范围：HDR，10-bit色深
锐化：高锐化，边缘增强
```

For lighter prompts (simple inserts, wide establishing shots), the one-line basic format is still fine. Use the per-dimension format when the scene demands visual fidelity control — close-ups, material-heavy shots, atmospheric interiors, or any scene where "plastic look" is a risk.

### Time allocation for multi-shot prompts

For multi-shot prompts, declare the time budget for each shot inside `【规格】`. This gives the model a precise expectation of pacing and prevents one shot from eating the entire duration:

```
【规格】15秒，21:9，真人实拍电影质感。时间分配：镜头1（0-2秒，建立）、镜头2（2-6秒，递进）、镜头3（6-12秒，情感核心）、镜头4（12-15秒，收束）。
```

Rules:
- Time codes use absolute seconds from video start: `(0-2秒)`, `(2-6秒)`, etc.
- Each shot's narrative function is labeled in parentheses after the time range: `建立`, `递进`, `核心`, `收束`, `钩子`, `转折`, `情感高点`, `尾声`
- Total time must equal the declared duration
- For single-shot prompts, time allocation is not needed

Add user-required fps, shutter angle, lens constraints, or generator-specific quality requirements in this section.

### Director style decomposition (导演风格拆解)

When the user requests a specific director's visual style, do NOT paste the director's name as a keyword ("王家卫风格", "诺兰风格"). Instead, decompose the style into four quantifiable dimensions and distribute them across the prompt sections where they actually take effect.

#### The four dimensions

| Dimension | What it controls | Where it goes in the prompt |
|---|---|---|
| **HEX 色彩占比** — dominant, secondary, accent colors with ratios | Overall color palette and mood | `【规格】` color science block |
| **光线逻辑** — source type, direction, hardness, color temperature | Lighting design and shadow character | `【电影化动态描述】` lighting paragraph |
| **肤色锚定** — skin tone baseline and forbidden drift | Prevents grading from corrupting skin | `【负面约束】` forbidden items |
| **空间语法** — depth of field tendency, foreground-background layering, aspect ratio, lens compression | Spatial feel and compositional habit | `【规格】` aspect ratio + Section 5 spatial blocking + Section 6 lens choice |

#### Standard decomposition block

When a director style is requested, generate a `【风格拆解】` block during pre-production (before writing the prompt). This block is a working reference — it does NOT appear verbatim in the final Seedance prompt; its values are distributed into the correct sections.

```
【风格拆解】（工作参考，不直接进入提示词）
导演/风格来源：[名称或参考影片]
色彩占比：主色 #XXXXXX (XX%) / 辅色 #XXXXXX (XX%) / 点缀 #XXXXXX (XX%)
光线逻辑：[光源类型（自然光/钨丝灯/霓虹/混合）] + [方向（顶光/侧光/逆光/环境散射）] + [硬软（硬光锐影/柔光包裹）] + [色温（暖黄2700K/冷蓝6500K/混合）]
肤色锚定：[肤色基准（暖象牙/冷瓷白/古铜/橄榄）] + 禁止项（禁肤色偏绿/禁肤色过度饱和/禁蜡像质感）
空间语法：[景深倾向（极浅F1.2/中等F2.8/深景深F8）] + [前后景关系（前景遮挡物/背景虚化程度/纵深引导线）] + [画幅（21:9宽银幕/16:9/4:3）] + [镜头压缩感（广角畸变/长焦压缩/标准透视）]
```

#### Distribution rules

After filling the decomposition block, distribute each value:

1. **色彩占比** → append to `【规格】` render quality anchors:
```
色彩科学：ARRI Alexa色彩科学
主色调：冷青蓝 #2B4C6F (45%)，辅色：沙金 #C4A35A (30%)，点缀：暗橙 #8B4513 (10%)，阴影填充：深灰蓝 #1A2A3A (15%)
```

2. **光线逻辑** → write into `【电影化动态描述】` lighting sentences:
```
光线来自画面右侧45度高位钨丝台灯，硬光在面部形成明暗分界线，阴影侧不补光保持深黑，色温偏暖2800K，背景墙面只有微弱环境散射光。
```

3. **肤色锚定** → add to `【负面约束】`:
```
禁肤色偏绿、禁肤色饱和度超过画面整体饱和度、禁蜡像质感——肤色锚定为暖象牙基底，面部高光允许轻微偏暖但禁止偏冷偏蓝。
```

4. **空间语法** → inform `【规格】` aspect ratio, Section 5 blocking distances, and Section 6 lens choice:
```
【规格】15秒，21:9宽银幕。
机位：85mm长焦 F2.0，长焦压缩前后景距离感。
```

#### Example: Interstellar-era Nolan decomposition

```
【风格拆解】（工作参考）
导演/风格来源：《星际穿越》时期视觉风格
色彩占比：主色 冷灰蓝 #3A4F5C (40%) / 辅色 沙漠土黄 #B8956A (30%) / 点缀 冰白 #D4E4EC (15%) / 阴影 深墨蓝 #0D1B2A (15%)
光线逻辑：自然光为主 + 侧光或逆光 + 硬光（沙漠段）与柔光包裹（室内段）交替 + 色温偏冷5500-6500K，暖色只来自实际光源（台灯、仪表盘）
肤色锚定：冷调环境下肤色保持自然偏暖，禁肤色发灰、禁肤色偏蓝、禁蜡像光滑——保留毛孔和皮肤纹理
空间语法：IMAX 21:9超宽画幅 + 深景深F5.6-F8（大全景段）与浅景深F2.0（情感特写段）交替 + 大量纵深引导线（公路、走廊、飞船舱道）+ 广角略有畸变（环境交代）与长焦压缩（人物孤独感）交替使用
```

#### When NOT to decompose

- The user only wants a vague mood reference, not a precise style match — just pick 1-2 relevant traits, don't build the full block
- Animation projects (Disney/Pixar style) — color and light still apply, but lens simulation and skin tone anchoring are less critical
- The user provides their own HEX palette or LUT reference — skip the color dimension and use their values directly

#### External reference resources for style decomposition

Before filling the decomposition block, find real film stills to extract color ratios, lighting setups, and spatial patterns. These three professional databases are the primary sources:

| Site | URL | Use for |
|---|---|---|
| **ShotDeck** | https://shotdeck.com | Search by shot size, lighting, composition, mood, color; database of millions of HD film stills curated by Oscar-nominated cinematographer Lawrence Sher |
| **Flim** | https://flim.ai | AI visual search — type an emotion keyword (孤独, 雨夜, 压迫) and get matching film frames; supports Chinese search; free tier: 3 HD downloads/day |
| **Frameset** | https://frameset.app | Commercial visual reference — ads, MVs, fashion films; best for mood boards and storyboards when the target style is commercial rather than narrative cinema |

Workflow: search by mood/color/director → screenshot 3–5 representative frames → extract HEX palette with a color picker → note the light source direction and quality → fill the four-dimension decomposition block.

## Section 4 — `【电影化动态描述】`

For a single-shot prompt, write one continuous director paragraph. It must include:
- Initial state from `【首帧衔接】`
- Camera move and shot size
- Core action
- Practical lighting and material texture
- Performance micro-beats
- Spatial continuity
- Sound that belongs inside the visible action
- Final landing frame

Single-shot skeleton:

```
【电影化动态描述】初始画面承接首帧衔接状态，摄影机按[镜头运动]执行，景别为[景别]。[镜头意图]画面核心是：[画面动作]。[光线与质感]。[材质在当前光线下的具体表现]。[表演控制]。[空间连续]。[声音设计]。[质量门槛]。最后落点：[备注/最终落幅]。
```

### Material-under-light descriptions

Don't just say what an object is — describe how it **looks under the current lighting condition**. This bridges the gap between static material definitions (in handles) and the live visual reality of the shot. The plastic look often comes from materials being described as nouns ("wooden table") instead of as light-interaction events ("warm light catches the wood grain, casting micro-shadows in the grooves").

Examples:

| Static (weak) | Material-under-light (strong) |
|---|---|
| 年糕趴在窗台上 | 年糕趴在窗台垫子上，暖阳从窗外落入，白色毛发边缘产生柔和轮廓光，耳朵薄处半透光呈粉红色 |
| 枯树在沙漠中 | 树皮龟裂纹理在硬光下如焦炭般清晰，枯枝向天空伸展 |
| 金属架子倒了 | 金属架子翻倒，不锈钢管面在头顶荧光灯下闪过一道冷白反光 |
| 她拿着玻璃杯 | 她握住玻璃杯，杯壁焦散光斑在桌面上缓慢滑动 |

Rules:
- Material-under-light descriptions go inside `【电影化动态描述】`, not in the handle or style block — they are dynamic, not static
- Only add them for **visually prominent objects and close-up subjects**, not every prop in the background
- Each description must reference the **current scene's light source** (window light, overhead fluorescent, practical lamp, etc.) — don't write generic "beautiful light"
- For skin/organic surfaces in close-ups, describe subsurface effects: translucency in ears, pore shadows matching light direction, vein visibility under thin skin

### Multi-shot prompts

When a prompt contains multiple internal cuts, each one is a `【镜头N】` block with its own internal structure. Each shot header includes a **narrative function label** that declares why this shot exists in the sequence — this helps the model understand pacing and emotional weight:

```
【电影化动态描述】
【镜头1】[建立]（0-2秒）
机位：35mm广角，全景wide shot。⚠️持续时间⚠️严格约0.3-0.5秒（split-second flash establishing shot）。
背景：[location detail].
动作：[step-by-step].
⚠️0.3-0.5秒后⚠️立刻硬切（hard cut）到镜头2——无过渡、无淡出、无停留。

【镜头2】[递进]（2-6秒）（紧接镜头1硬切而来）
机位：⚠️85mm长焦，⚠️F1.4极浅景深，⚠️角色A侧面紧凑特写。
摄影机运动：[handheld / dolly / static + camera-emotion sync clause from CAMERA_EMOTION.md].
背景：[detail].
动作：[step-by-step].
⚠️⚠️⚠️微表演细节（actor performance micro-beats）：
- ① ...
- ② ...
- ③ ...
```

### Narrative function labels

Every `【镜头N】` header should include one function label from this set:

| Label | Purpose | Typical duration |
|-------|---------|-----------------|
| `[钩子]` | Opening hook — grab attention immediately | 0.5–2s |
| `[建立]` | Establish space, characters, or mood | 1–3s |
| `[递进]` | Escalate action, tension, or information | 2–5s |
| `[核心]` / `[情感核心]` | The shot this prompt exists for — emotional or narrative peak | 3–6s |
| `[转折]` | Reversal, surprise, or shift in direction | 1–3s |
| `[反应]` | Character reaction beat | 1–3s |
| `[收束]` | Landing frame, emotional resolution, or transition out | 1–3s |
| `[尾声]` | Final image, thematic echo, or fade | 1–2s |

Format: `【镜头N】[label]（Xs-Ys）`

The time code is the absolute second range from video start, matching the time allocation declared in `【规格】`. The label is mandatory for multi-shot prompts, optional for single-shot prompts.

### Shot block required fields

Each shot block always has, **in this order**:

```
【镜头N】[label]（Xs-Ys）
机位：[焦距] [景别] [static/handheld/dolly…]
动作：…
```

- **机位** — **mandatory next line after `【镜头N】`.** Lens (35/50/85mm…) + shot type (wide / mid / close / ECU) + handheld/static/dolly. Incomplete without it.
- **摄影机运动** (when relevant) — camera move synchronized to emotion (can live on the `机位` line)
- **摄影机位置** (when relevant) — east/west/south/north of the character
- **背景** — what's in the background (or "blurred to soft color blocks" for tight close-ups); population still mount-gated
- **动作** — step-by-step action with numbered beats (① ② ③ ...) when there's an arc; lock **≤3 timed action beats** per 15s fight/escape prompt
- **微表演细节** — performance micro-beats, see MICRO_BEATS.md (optional if action+dialogue already dense)

**Reject before delivery:** any `【镜头N】` whose next non-empty line is `动作：` with no `机位：` above it.

For a single-shot prompt (one continuous take, no internal cuts), skip the `【镜头N】` headers and write the same structure as a single block. Prepend with `单镜头（one-shot，无剪辑）。`

### Genre scene vocabulary (题材场景词库)

Some genres require specialized material, lighting, and environment descriptors that don't exist in everyday scenes. These vocabularies are NOT standalone templates — they are ingredient lists to be plugged into the standard `【电影化动态描述】` structure. Pick the relevant terms and write them into the correct fields (机位, 背景, 动作, material-under-light).

#### 4.G1 — Space / starship (太空·星舰)

**Environment descriptors** (for 背景 field):
- 深空星云背景、蓝色/紫色星云带、陨石带残骸漂浮、星际战场碎片场、黑洞边缘吸积盘
- 恒星光芒从画面[方向]射入、太空尘埃颗粒在逆光中呈金色半透明
- 太空港停泊区、轨道船坞、行星低轨道大气层边缘

**Subject descriptors** (for 动作/主体 field):
- 星舰类型：重型巡洋舰、隐形战舰、星际航母、单人战斗机、运输飞船、探索舰
- 外观材质：流线型钛合金外壳、装甲接缝焊线、武器阵列（能量炮管/导弹舱盖）、舷窗内透出暖黄灯光、引擎喷口内等离子蓝光
- 状态：低速巡航（引擎微光脉冲）、高速机动（尾焰拉伸为光锥）、开火攻击（武器充能光效从暗到亮）、紧急规避（姿态推进器喷射短脉冲）、停靠太空港（磁力锁定臂缓慢合拢）

**Material-under-light** (for Section 4 material rules):
- 钛合金外壳在恒星侧光下形成硬边高光带，阴影面仅靠舷窗内光和引擎余辉提供微弱轮廓
- 装甲接缝在强侧光下产生细线阴影，焊接痕迹可见
- 引擎等离子推进尾焰从喷口到末端颜色渐变：白蓝核心 → 浅蓝扩散 → 橙红尾端消散
- 太空尘埃颗粒在舰体表面滑过时产生微小反光点

**Camera recommendations** (for Section 6):
- 大远景（展示星舰全貌与太空环境关系）：18-24mm，深景深 F8+
- 中景（突出星舰结构和舰体细节）：35-50mm，舰体占画面40-60%
- 特写（引擎喷口/武器充能/舷窗内人影）：85-135mm，浅景深 F2.8
- 运镜：缓慢环绕（突出舰体体量）、匀速推进（接近或离开）、跟随机动（战斗段）、固定机位（停泊/出港仪式感）

**Style anchors** (for Section 3 `【规格】`):
```
画质：8K
质感：真人实拍电影质感，ARRI ALEXA 65色彩科学
画幅：21:9 IMAX宽银幕
噪点：轻微胶片颗粒
动态范围：HDR，暗部细节丰富
金属反光：物理准确的菲涅尔反射，禁止全身均匀高光
粒子特效：太空尘埃、引擎粒子、爆炸碎片——物理自然飘散，禁止均匀分布
```

**Negative constraints** (for Section 12):
```
禁卡通化星舰造型、禁均匀环境光（太空中无大气散射，阴影面应接近纯黑）、禁星舰表面过于干净光滑（需要使用痕迹和装甲接缝）、禁引擎尾焰单色（必须有核心到边缘的颜色渐变）、禁太空背景纯黑无星尘（至少有微弱星云或尘埃层次）。
```

#### Adding more genre vocabularies

Follow the same structure for other specialized genres: underwater (深海), ancient battlefield (古战场), cyberpunk city (赛博城市), microscopic world (微观世界), etc. Each vocabulary provides ingredients for the standard sections — it never replaces the section structure itself.

## Section 5 — Spatial blocking

For any prompt with 2+ characters in frame, declare the spatial relationship explicitly using the approved top-down schema (see [SPATIAL_BLOCKING.md](SPATIAL_BLOCKING.md)):

```
⚠️空间布局（MAIN VIEW=从天桥入口看向巨型屏幕）：
位置A：反派站在中央通道最前方靠近屏幕，面朝三人。
位置B：角色A和角色B在通道中间并肩站立，距反派约3米，面朝反派方向。
角色C站在角色A和角色B正后方1.5米处——不在他们旁边，严格在他们背后，被他们的身体部分遮挡——也面朝反派方向。
```

Use precise distances in meters. Use cardinal directions or "north/south/east/west" relative to the main view axis. Note who occludes whom, who faces which direction, and any heights/eyelines the model might get wrong.

## Section 6 — Camera/move direction

Every shot block declares lens + camera move + emotion sync. See [CAMERA_EMOTION.md](CAMERA_EMOTION.md) for the full mapping.

Always specify:
- Lens (in mm)
- Aperture if shallow DOF matters (`F1.4极浅景深`)
- Camera move (handheld呼吸 / dolly / crane / static / push-in / pull-out)
- For handheld, specify the breathing rhythm based on the focal character's emotion
- For multi-shot, name the cut type (`hard cut` / `dissolve`) and forbid the others
- For advanced movement patterns (rush zoom, aerial dive, lateral tracking, OTS rack focus, 360° orbit, dolly zoom), use the templates in [CAMERA_EMOTION.md §8](CAMERA_EMOTION.md)

Forbidden moves are explicit:
- `禁zoom变焦` (no zoom — physical movement only). **Exception:** dolly zoom / vertigo (CAMERA_EMOTION.md §8.6) deliberately combines dolly + zoom — declare the exception explicitly.
- `禁稳定器` (no stabilizer — handheld means handheld). **Exception:** stabilizer/gimbal is correct for lateral tracking (§8.3), orbit (§8.5), and aerial shots (§8.2). Do not paste `禁稳定器` into these prompts.
- `禁焦点漂移` (no focus drift on locked inserts). **Exception:** OTS rack focus (§8.4) deliberately pulls focus between foreground and background — declare the exception explicitly.

### Advanced one-shot movement templates (电影级一镜到底模板)

Use these as compact camera-language modules inside `【电影化动态描述】`. Prefer descriptive film language over direct living-director imitation. If a user names a director style, translate it into the technical traits below.

#### 6.1 Time-folding one-shot

Use for sci-fi dreams, time distortion, spatial loops, mirror worlds, and impossible architecture.

```
单镜头（one-shot，无剪辑）。FPV主观高速穿梭视角，摄影机从[起点空间]贴地/贴墙滑入，在接近[角色/物体]时完成一次极端视角翻转：地面像折纸一样向上卷起，建筑立面缓慢翻转成头顶天空，空间边缘出现镜面反射循环。镜头不中断地从街道穿入室内露台，再从露台边缘坠入高空视角，背景粒子和空气尘埃被拉成长线，最后落入镜面世界循环画面。视觉风格：90年代好莱坞胶片美学，高速穿梭，流体变形，粒子质感，强空间错觉；⚠️不是随机变形，所有空间变化都围绕[叙事目标]服务。
```

#### 6.2 Hero arrival low-angle orbit

Use for superhero arrival, leader reveal, power entrance, or a character becoming the emotional center of the scene.

```
单镜头（one-shot，无剪辑）。低角度35mm仰拍从角色脚边开始，摄影机沿角色半径约1.5米执行180度环绕，先拍到脚步落地和衣摆/披风受风扬起，再绕到逆光剪影位置形成强轮廓光，最后推至胸像特写。背景冷蓝调色，背后强光制造英雄压迫感，人物保持稳定站姿，镜头运动制造力量感。最后落点：角色占据画面中央，背光边缘清晰，身后队友/城市远景虚化。
```

#### 6.3 Restrained suspense progression

Use for quiet suspense, investigation, basement/door/key beats, and controlled emotional escalation.

```
单镜头（one-shot，无剪辑）。昏暗冷蓝环境，摄影机从过肩跟拍开始，贴在[角色]右后方约60cm处，跟随角色缓慢走向[门/柜/地下室入口]。浅景深锁定手中钥匙，钥匙插入锁孔时轻微移焦到门缝暗处；门打开后摄影机绕角色180度来到正面，焦点从门内黑暗拉回角色眼睛。角色瞳孔微微放大，呼吸停顿半拍，情绪从克制疑惑递进到确认危险。全程慢推，不靠突然惊吓，靠焦点、呼吸和空间深处的未知推进。
```

#### 6.4 Epic desert opening

Use for epic opening, desert road, lonely hero, end-of-world mood, and large-scale first reveal.

```
单镜头（one-shot，无剪辑）。Arri Alexa 65质感，35mm宽银幕，青橙色调。摄影机从贴近黄沙颗粒的超低机位高速向前穿越，沙粒和尘埃被气流卷起形成粒子拖尾，镜头沿沙漠公路中线掠过龟裂路面，远处孤独角色从热浪中缓慢起身。摄影机减速绕到角色侧后方，太阳在地平线附近爆亮形成强逆光，黄沙像爆炸云一样从角色身后升起。最后落点：角色小小站在巨大沙漠和太阳之间，形成英雄绝境孤独感。
```

#### 6.5 Vertigo revelation

Use when truth is revealed, a character's psychological ground collapses, or a location suddenly feels impossible.

```
单镜头（one-shot，无剪辑）。⚠️例外：允许dolly zoom / vertigo effect（轨道车后退+镜头变焦同时发生）。人物站在画面中心几乎静止，摄影机沿轨道缓慢后退，同时长焦压缩背景使街道/走廊/楼梯向后拉伸，人物大小保持近似不变，背景空间被心理性扭曲。HDR高动态范围，宽银幕构图，焦点始终锁定人物眼睛。角色只做极小反应：喉结吞咽、眼神失焦、下颌收紧。最后落点：人物仍在原地，但背景像被真相拉远。
```

### 1970s crime-cinema signature shot templates (70年代黑色犯罪片式招牌镜头)

Use these when the user requests high-contrast 1970s crime cinema, theatrical tension, absurd contrast, POV pressure, rapid crash zooms, fixed overhead surveillance, or low-angle detail shots. Avoid direct living-director phrasing in final prompts; use the traits here instead.

Core traits:
- 色调：1970年代电影色调，高对比度，高饱和度，冷暖交替，暖黄色钨丝灯
- 质感：35mm胶片颗粒，几何对称，硬边阴影，略脏的日常空间
- 镜头：POV主观视角，固定俯拍，快速变焦，低角度仰拍，局部细节放大
- 叙事：戏剧化反差，荒诞情节，压迫感，威胁关系通过站位和道具暗示

#### 6.6 POV from a pit / low enclosed space

Use for extreme pressure, characters looming above camera, and subjective helplessness.

```
第一人称主观视角（POV），从[坑底/后备箱/地面低处]45度仰拍，画面边缘被[泥土/金属/木箱]包围形成封闭感。坑边/车尾/桌边站着两个穿深色西装的人物俯视镜头，一人手持[工具/证物/武器类道具]压向镜头方向，另一人从侧后方悄悄改变站位形成反转威胁。逆光阴天天空/车库灯从人物身后打出轮廓光，衣领和领带被风轻微吹动，材质呈1970年代高对比胶片颗粒。最后落点：主观镜头轻微震动，像角色受到惊吓或撞击，但不展示血腥结果。
```

#### 6.7 POV from inside a refrigerator / container

Use for enclosed-space POV, cold-warm contrast, object retrieval, and secret hiding.

```
极致封闭空间主观视角（POV），摄影机固定在[冰箱/柜子/箱子]内部。门被迅速拉开，冷白光从内部照亮一个穿西装的人脸，身后厨房/房间是暖黄色背光，形成强烈冷暖交替。人物伸手取出一层保鲜袋/纸包包裹的[关键道具/证物]，凑近检查，表情从享受/得意变成警觉；听到画外细响后，他迅速把道具放回原位并关上门。门缝光线逐渐变窄，画面在关门后进入黑暗死寂。
```

#### 6.8 Fixed overhead surveillance

Use for convenience-store/room-table staging, irony, and dramatic contrast without camera motion.

```
固定镜头，垂直俯拍上帝之眼视角，像监控一样默默记录一切，全程没有任何镜头运动。俯视[便利店收银台/餐桌/办公室]区域，画面保持几何对称。两个看似日常或喜庆的人物从入口走入，先做亲昵/礼貌/轻松动作，空间中的第三人产生放松反应；随后两人同时露出真实意图，站位从轻松社交变成三角压迫构图。顶灯白色日光/暖黄钨丝灯直打，地面有零星水渍、烟头或生活杂物，35mm胶片颗粒，高对比度。⚠️固定俯拍不移动，不推拉，不摇镜。
```

#### 6.9 Rapid crash zoom to face

Use for stylized intimidation, sudden realization, or absurd emphasis.

```
1970年代高对比犯罪片式快速变焦镜头。角色在[雨夜街道/宠物店/酒吧]中以全身景别出现，背景是模糊灯笼/钨丝灯/货架色块。前3秒保持全景，让服装、姿态、手中道具和地面反光完整建立；第3秒镜头瞬间猛推到面部极端大特写，眼睛占据画面核心，雨水/汗水/灯光反射沿颧骨或瞳孔滑动。角色嘴角微微上扬，但眼睛没有笑意。1970年代电影色调，35mm胶片颗粒，快速变焦带轻微机械感。
```

#### 6.10 Rapid crash zoom to animal/object

Use for absurd comedy tension, non-human focal points, and stylized object emphasis.

```
1970年代高对比犯罪片式快速变焦镜头。[动物/道具]端坐/摆放在画面正中央，姿态像占据王座，周围人物低头忙碌或刻意回避视线。镜头从全景瞬间猛推到[动物面部/道具细节]极端大特写，瞳孔/金属边缘/玻璃反光在暖黄钨丝灯下形成冷幽默的压迫感。背景是彩色货架、木质柜台或旧式室内陈设，构图荒诞但严肃。
```

#### 6.11 Low-angle foot/detail shot under a bar or table

Use for character relationships shown through feet, props, and geometric blocking.

```
1970年代美国酒吧/餐厅吧台底部低角度视角，画面被吧台/桌面下沿水平分割。上方只见两个角色的裤腿和皮鞋，下方一双红色高跟鞋/特殊鞋履从画面左侧走入，停在两双皮鞋之间，三双脚形成三角形构图。鞋跟在木地板上敲出节奏，地面有积水、烟灰或掉落纸巾，暖黄色光线从吧台上方漏下。通过脚的距离、朝向和停顿暗示人物关系和冲突，不需要露脸。
```

#### 6.12 Passenger-seat foot foreground

Use for relaxed absurdity, road-movie mood, and foreground-background contrast. Avoid fetish framing; treat feet as blocking and composition, not erotic focus.

```
1970年代美国轿车内部视角，从驾驶座侧拍副驾。副驾人物坐姿放松，正在吃汉堡/喝可乐/翻看地图，表情放肆满足或漫不经心。双脚伸向镜头占据画面前景，因距离极近呈现前景虚化，脚只是构图遮挡和荒诞氛围元素；阳光从挡风玻璃射入穿过前景轮廓，斑驳落在人物脸上。棕色真皮座椅，仪表台上有快餐纸袋和可乐杯，暖黄胶片颗粒，轻松但带一点危险气味。
```

### Camera perspective type templates (镜头视角类型模板)

These are fundamental camera-perspective modules, independent of visual style. Combine them with any style template (director decomposition, 1970s crime-cinema, Disney animation, etc.) by replacing the style-specific lines while keeping the camera logic.

Adapted from Seedance 2.5 tested patterns. Each template has a generic skeleton (replace `[bracketed]` placeholders) and usage notes.

#### 6.13 POV first-person subjective

Use when the audience IS the character — hands visible from below frame, objects approach/recede from camera, emotional immediacy through physical interaction with the environment.

```
第一人称主观视角（POV），镜头就是[角色]的眼睛，[角色]在[场景]中[动作目标]。
[角色]的双手从画面下方伸出，[具体手部动作序列：第一个动作 → 第二个动作 → 第三个动作]。画面随头部转动自然晃动，视线焦点跟随手部动作转移。
环境音从第一人称空间位置发出：[正前方/左侧/右侧/头顶]的[具体声音]。
```

Rules:
- Hands must enter from bottom of frame — they are the character's own hands
- Head-turn camera sway must feel organic, not mechanical pan
- Objects the character interacts with should have material-under-light detail (Section 4 rules apply)
- If the character speaks, voice comes from "inside the head" — no spatial reverb, dry and close-mic feel
- Combine with any render style by prepending the style block before the POV description

#### 6.14 ACT combat tracking (game-style follow cam)

Use for fight sequences, chase scenes, and high-energy action where the camera tracks behind the protagonist like a third-person action game. The camera is slightly low-angle, follows from behind, and moves WITH the character's attacks.

```
ACT游戏格斗跟拍视角，镜头微仰，从[角色]背部跟拍，镜头随[角色]的出拳/出招移动，打击瞬间带0.1秒停顿感（hit-stop）。
全景展示整个格斗过程：[角色]在[场景]中[战斗内容]。动作丝滑连贯，打击带冲击波纹/尘土飞溅/衣物震动等物理反馈，动作模糊自然，无穿模。
节奏：[快速连击段X秒] → [重击停顿0.1秒] → [对手反应X秒] → [终结动作X秒]。
```

Rules:
- Camera always stays behind and slightly below the protagonist — never crosses the 180-degree line to the front during combat
- Hit-stop (打击停顿) is the signature feel: 0.05–0.15 second freeze on impact, then resume at full speed
- Motion blur only on fast swings, not on the whole frame
- Environmental destruction (dust, debris, fabric ripple) sells the impact — always include at least one physical feedback element per strike
- For multi-opponent fights, camera follows the protagonist's target-switching with smooth snap-pans

#### 6.15 FPV speed-through (drone/flight perspective)

Use for architectural reveals, landscape traversals, chase-the-subject shots, and any sequence where the camera flies through space at high speed without cuts. The signature is continuous forward momentum through complex spatial structures.

静帧扩图 + 路径标注的完整节点链见 [VLOG_FX_RECIPES.md](VLOG_FX_RECIPES.md) §3。

```
低空穿梭视角（FPV），极限低空跟拍，从[起点]极速穿行到[终点]，全程在[空间结构]中飞行。
无断点一镜到底，无剪辑，无转场，画面丝滑连贯一气呵成。
飞行路径：[第一段空间] → 紧贴[墙面/地面/天花板]急转弯 → 穿过[狭窄通道/拱门/窗口] → [第二段空间] → 拉升/俯冲进入[终点空间]。
⚠️不从建筑上方飞过——钻入内部结构，沿走廊、穿过通道、紧贴墙面拐弯，用近距离建筑细节展现空间纵深。
```

Rules:
- Forward momentum never stops — speed can vary (slow through tight spaces, accelerate in open areas) but direction is always forward
- The camera must go THROUGH structures, not over them — this is the key difference from a regular aerial shot
- Include at least 2 tight turns or narrow passages to demonstrate spatial complexity
- Trailing elements (leaves, dust, water droplets, fabric) streaming past the lens sell the speed
- Can follow a subject (bird, butterfly, drone, vehicle) or be camera-only
- Combine with any visual style; for live-action realism, add `FPV无人机拍摄质感，轻微鱼眼畸变，螺旋桨微振`

#### 6.16 Bug's-eye extreme low angle (虫视视角)

Use for extreme power shots, vehicle launches, giant-scale reveals, and any moment where the subject should feel massive and overwhelming. Camera is at ground level or below, looking almost straight up.

```
虫视镜头，贴地仰拍，摄影机几乎贴在地面（高度约5-10cm），镜头向上45-80度仰角。
[主体]在画面中从地面向上占据大部分画幅，产生强烈的体量压迫感。地面材质（[沙土/水泥/积水/草地]）占据画面底部前景，[主体]的[底部细节：轮胎/鞋底/建筑底座]距镜头极近，因距离近产生轻微广角畸变和前景虚化。
[主体动作]时，地面产生物理反馈：[震动/尘土飞溅/积水波纹/碎石弹起]。
```

Rules:
- Camera height is 5–15cm above ground, never higher — this is what makes it "bug's eye" not just "low angle"
- Ground texture must be visible and detailed in the foreground — it anchors the extreme perspective
- Physical feedback from the ground (vibration, dust, water ripples) is mandatory for dynamic subjects
- Works for both static reveals (building, statue, character standing) and dynamic moments (vehicle launch, character landing)
- For character power shots, combine with 6.2 Hero arrival low-angle orbit for a hybrid template

#### 6.17 Bird's-eye aerial overview (鸟瞰视角)

Use for establishing grand scale, architectural reveals, army/crowd overviews, landscape transitions, and any moment where the audience needs to understand spatial layout from above.

```
高空鸟瞰俯视视角，以[飞行主体：鹰/无人机/飞行器]的第一人称视角拍摄，镜头即[飞行主体]的眼睛。
从[起始高度]俯瞰[场景]，[飞行主体]沿[飞行路径描述]移动，画面展示[场景]的宏大空间结构和[关键地标/人群/建筑群]的布局关系。
飞行轨迹：从[A点]出发 → 掠过[B区域] → 在[C位置]上方盘旋/俯冲 → 最终落点在[D位置]上方建立全景。
```

Rules:
- Height determines the feel: 50–100m = neighborhood scale, 200–500m = city district, 1000m+ = landscape/epic
- If using a living creature (eagle, dragon) as the viewpoint, add organic flight motion: wing-tip sway, thermal-riding circles, occasional speed bursts during dives
- If using a drone/mechanical viewpoint, add smooth gimbal stability with slight mechanical precision
- The flight path should reveal spatial information progressively — don't show everything at once; start narrow, widen, or start wide and dive into a specific point
- For architectural subjects, the flight path should trace the building's geometry (follow rooflines, circle towers, sweep along courtyards)
- ⚠️ Forbid any overlay graphics, arrows, circles, or text markers in the generated video — these are planning tools only

### Perspective + style combination guide

These 5 perspective types (6.13–6.17) are **camera logic modules**. They define HOW the camera moves and WHERE it sits. They do NOT define visual style. To create a complete prompt, combine one perspective template with:

| Layer | Source |
|---|---|
| Visual style | Director decomposition (Section 3) or render quality anchors |
| Camera perspective | One of 6.13–6.17 above |
| Director signature shots | 6.1–6.12 templates (optional, for specific stylistic moments) |
| Performance | Section 7 micro-beats |
| Audio | Section 8 `【音画同步】` |

Example combination — FPV speed-through + epic desert style:
```
【规格】15秒，21:9。
色彩科学：ARRI Alexa色彩科学
主色调：冷灰蓝 #3A4F5C (40%)，辅色：沙漠土黄 #B8956A (35%)，点缀：冰白 #D4E4EC (25%)

【电影化动态描述】低空穿梭视角（FPV），极限低空跟拍，从沙漠公路起点极速穿行到远处孤城废墟。无断点一镜到底，无剪辑。飞行路径：贴近龟裂路面掠过 → 紧贴风蚀岩柱急转弯 → 穿过倒塌城门的拱洞 → 进入废墟内街，沿断壁残垣低空蛇行。沙粒和尘埃被气流卷起形成粒子拖尾，阳光从画面右上方打入，逆光下沙尘呈金色半透明。
```

### Special visual technique templates (特殊视觉技法模板)

These are rendering/motion-treatment techniques that modify HOW the image looks, independent of camera position or movement. They layer on top of any perspective (6.13–6.17) and any style (director decomposition). Each technique has a specific visual signature that requires explicit prompt language to trigger — AI models won't produce these effects from vague descriptions.

#### 6.18 Step-printing / frame-skip slow shutter (抽帧慢门)

Use for: alienation, loneliness in a crowd, time-frozen protagonist, dreamlike urban atmosphere, Wong Kar-wai style step-printing where the subject is sharp but the world streaks around them.

Core visual principle: static subject remains tack-sharp while all moving elements (crowd, traffic, neon reflections) produce stuttery, discontinuous motion trails — NOT smooth motion blur, but choppy ghosting as if frames were skipped and reprinted.

```
抽帧慢门效果：[角色]是画面中唯一清晰静止的存在——锐利、不模糊、每一根发丝可辨。所有运动元素（行人/车流/雨滴/霓虹反射）产生抽帧残影：不是流畅的运动模糊，而是断续的、帧与帧之间跳跃的鬼影拖尾，像低帧率拍摄后抽掉部分画格再重复印放。动静反差极端——[角色]仿佛被从时间流中抽离，背景世界在她/他身边以碎片化的速度流过。
```

**Performance direction** (must accompany this technique):
```
角色神情：放空出神、克制疏离、不看镜头、不做夸张表情。眼神穿过人群但不注视任何人，仿佛与整个世界隔绝。身体几乎不动——如果有动作，只有极缓慢的转头或手指微微触碰[道具]。
```

**Day scene style anchors**:
```
色彩占比：暖黄主调 #D4A843 (35%) / 青蓝 #2E7D8C (25%) / 橙红 #C45A3C (20%) / 阴影冷灰 #3A3A3A (20%)
光线：暖黄自然光 + 玻璃幕墙/招牌反射的流动光斑，空气有潮湿水汽，地面反光
质感：90年代胶片色调，手持广角轻微畸变，高饱和，胶片颗粒明显
```

**Night scene style anchors**:
```
色彩占比：冷绿 #2A6B5C (30%) / 暖黄 #C9A84C (25%) / 霓虹粉 #D94F8C (15%) / 深灰蓝 #1A2A3A (30%)
光线：暖黄与冷绿灯光交杂，霓虹招牌在潮湿空气中晕开形成大面积柔化光斑，雨湿路面反射霓虹色带
质感：90年代胶片色调，手持广角轻微畸变，高对比度，胶片颗粒明显，玻璃窗上有水珠
```

**Negative constraints**:
```
禁运动模糊均匀化——残影必须是断续跳帧式鬼影，不是平滑的motion blur；禁角色与背景同等模糊——角色必须是全画面最锐利的元素；禁角色夸张表情——克制、放空、疏离；禁背景完全静止——必须有流动的运动残影制造动静对比。
```

#### 6.19 Bullet Time freeze + 360° orbit（子弹时间冻结环绕）

Peak-impact **time freeze**: subject locked, debris/rain/cards suspended in natural scatter; camera does a smooth stabilizer/array-style **360° orbit** around the subject. Distinct from §8.5 live orbit and from combat 1–2s slow-mo insert in [SPATIAL_BLOCKING.md](SPATIAL_BLOCKING.md).

Full fill-in template, swap table, and examples (magician cards / drifting car): **[BULLET_TIME.md](BULLET_TIME.md)**.

Core skeleton:
```
【主体】正在【峰值动作】，冲击最强瞬间进入子弹时间，时间冻结。
摄影机以主体为中心平滑稳定360°环绕，阵列感，主体始终清晰。
主体定格；【悬浮元素】全部悬停，保持真实飞散形态。
【可选：解冻后后续动作】。场景【环境】，电影灯光，体积光，自然调色。
```

#### Adding more visual techniques

Follow the same structure for other special visual effects: speed ramping (变速), tilt-shift miniature (移轴微缩), double exposure (双重曝光), infrared film (红外胶片), etc. Each entry provides the core visual principle, a prompt skeleton, style anchors, and negative constraints.

## Section 7 — Performance direction

This is the cinematographer's main creative output. Direct emotion as physical micro-events. See [MICRO_BEATS.md](MICRO_BEATS.md) for the full catalog by emotion.

Tactics (quick reference):
- Eyeline shifts ("目光从反派方向微微移开向下")
- Breath ("胸腔深深起伏——一次漫长的吸气，然后缓慢呼出")
- Throat/jaw micro-tells ("一次喉结上下吞咽", "颧骨处咬肌慢慢收缩")
- Suppressed emotion as physical resistance ("他在试图忍住——每一块面部肌肉都在对抗涌上来的情绪")
- Eye state ("眼睛逐渐湿润，眼眶积聚泪水使眼球开始泛光")
- Posture/weight ("肩膀低沉下塌", "双臂无力挂在身侧")
- Staged emotional arcs with numbered beats (① ② ③ ④ ⑤ ⑥ ⑦) for complex reaction shots

Every dialogue line gets a pre-line beat, mid-line emphasis cues, and a post-line beat (see MICRO_BEATS.md §4).

### Structured micro-expression decomposition (结构化微表情拆解)

For complex emotion shots — especially close-ups where the character's face IS the entire scene — use the 6-module decomposition below instead of ad-hoc tactics. This forces you to cover every layer of physical performance systematically, preventing "expression jump" (表情跳变) where AI snaps between emotions instead of transitioning.

When to use: any shot where the character's emotional arc spans more than one state within a single prompt (e.g., "from collapse to calm", "from anger to realization", "from joy to doubt").

When NOT to use: simple single-emotion beats (a character smiles, a character frowns) — the quick-reference tactics above are sufficient.

#### The 6 modules

Fill these in order. Each module describes a DIFFERENT physical layer — do not repeat the same description across modules.

| # | Module | What it controls | Key descriptors |
|---|---|---|---|
| 1 | **情绪内核** (Emotional State) | The psychological starting point and destination | Origin of the emotion, context, core feeling, what the character is trying to do internally |
| 2 | **眼神表演** (Eye Performance) | Eyes as the primary emotion carrier | Pupil dilation/contraction, tear film, gaze direction shifts, focus/defocus, eyelid tension, blink rate |
| 3 | **面部肌肉** (Facial Muscles) | Involuntary micro-movements of the face | Mouth corner twitch, nostril flare, cheek tremble, jaw clench/release, brow compression, lip press |
| 4 | **呼吸节奏** (Breathing) | Chest and throat as life-sign anchors | Breath depth, speed, pauses, gasps, throat tightness, chest heave amplitude, exhale quality |
| 5 | **肢体反应** (Body Reaction) | Emotion-driven body language below the neck | Hand tremor, shoulder drop/hunch, spine curl/straighten, finger grip, weight shift, self-touch gestures |
| 6 | **情绪递进** (Emotion Transition) | The timeline of emotional change within the shot | Start state → turning point → end state, with approximate second markers |

#### Template

```
⚠️⚠️⚠️微表演细节（6层拆解）：

①情绪内核：[情绪的来源和背景]——角色正在从[起始状态]走向[目标状态]，内心在[内心动作：抵抗/接受/寻找/放弃]。

②眼神表演：[眼神起始状态，如涣散/锐利/空洞] → [中间变化，如瞳孔收缩/泪光积聚/焦点重新锁定] → [最终眼神状态，如重新有光/彻底失焦/冷静注视]。睫毛[状态]，眼尾[状态]，眨眼频率[变化]。

③面部肌肉：嘴角[动作]，鼻翼[动作]，颧骨处咬肌[动作]，眉心[动作]，下颌[动作]。所有肌肉微动必须是不对称的——左右脸不完全同步，制造真人感。

④呼吸节奏：[起始呼吸状态，如急促抽泣/屏息] → [转折呼吸，如一次深长吸气/喉咙哽咽] → [收束呼吸，如缓慢呼出/轻叹]。胸腔起伏幅度从[大/小]变为[小/大]。

⑤肢体反应：[与情绪对应的身体动作，如手指收紧/肩膀从颤抖到松弛/身体从蜷缩慢慢展开]。至少一个自触动作（擦泪/抚脸/握拳/抱臂）锚定情绪的物理出口。

⑥情绪递进（时间线）：0-[X]秒[起始情绪状态] → [X]-[Y]秒[转折点，触发变化的瞬间] → [Y]-15秒[收束情绪状态]。情绪变化是渐进的，禁止跳变。
```

#### Anti-patterns

- **跨模块重复**：每个模块描述不同的物理层。如果"手轻轻拂过脸颊"出现在眼神、呼吸、肢体三个模块里，AI 会混淆优先级。每个动作只写在它所属的物理层。
- **情绪标签代替生理描述**：写"悲伤"不如写"嘴角左侧向下牵拉，下唇微微前翻"。AI 不懂情绪标签，但懂肌肉方向。
- **对称面部**：真人微表情永远是不对称的。强制声明"左右脸不完全同步"。
- **忽略呼吸**：呼吸是最容易被跳过但最影响真实感的层。没有呼吸描述的特写看起来像蜡像。

#### Example: "从崩溃到平静" — 15秒特写

```
⚠️⚠️⚠️微表演细节（6层拆解）：

①情绪内核：情绪风暴刚刚过去，女子正在从崩溃中慢慢把自己拼回来。她不是突然平静的——是用意志力一点一点把碎片捡起来。

②眼神表演：眼神从涣散失焦开始 → 5秒时瞳孔微微收缩、焦点开始重新锁定前方 → 12秒时眼睛里重新出现光点。眼尾泛红，睫毛上挂着残余泪水，泪膜在灯光下形成薄反光层。前8秒眨眼频率低（失神状态），8秒后恢复正常眨眼。

③面部肌肉：嘴角左侧微微抽动（不对称），鼻翼随呼吸轻微翕动，颧骨处咬肌在3秒和7秒各收紧一次（忍住不哭），眉心从紧皱逐渐松开，下唇在10秒时轻微前翻后收回。

④呼吸节奏：0-4秒急促浅抽泣，胸腔快频小幅起伏 → 5秒一次深长吸气，喉咙发紧产生轻微哽咽声，胸腔剧烈上提 → 6-12秒呼吸逐渐变深变慢 → 13秒缓慢呼出最后一口气，像把肺里残余的压力全部释放。

⑤肢体反应：肩膀从微微颤抖到8秒时停止震颤。13秒右手缓慢抬起，指尖轻拂右脸颊上干涸的泪痕，手指停顿一瞬后把手背轻贴嘴唇（自我安慰动作）。身体从轻微蜷缩逐渐展开，脊柱在12秒后缓慢挺直。

⑥情绪递进：0-4秒「崩溃余波」→ 5-8秒「意志力介入，开始拼凑」→ 9-13秒「情绪着陆，重新获得控制」→ 14-15秒「平静，眼神有了光，嘴角几乎不可见地微微上扬」。全程渐进，禁止跳变。
```

### Integration with prompt structure

The 6-module decomposition goes inside `【电影化动态描述】` as the `⚠️⚠️⚠️微表演细节` block. It replaces the simpler numbered-beat format (① ② ③) for complex emotion shots. The rest of the prompt structure (`【规格】`, `【首帧衔接】`, `【音画同步】`, `【负面约束】`) remains unchanged.

For shots that combine dialogue WITH complex emotion, write the 6-module block first, then add dialogue timing in `【音画同步】` — the dialogue becomes one more physical event layered on top of the performance, not the driver of it.

## Section 8 — `【音画同步】` and dialogue rules

Use `【音画同步】` whenever the prompt includes dialogue, voiceover, phone audio, off-screen speech, a cut-off line, or a key SFX cue. Preserve the original spoken language. Add mouth timing for visible speakers, off-screen continuity for unseen voices, breath/pause rhythm, room or device reverb, and causal sound effects.

### Speaker locking (说话者锁定)

Every `【音画同步】` section with dialogue MUST open with a **说话者锁定** block. This block declares each speaking character's voice type, spatial position, and speaking action for the current prompt. It prevents the generator from confusing who says what and anchors each voice to a physical location and behavior.

Format:
```
说话者锁定：[角色名]=[画内/画外][远场/近场][男声/女声]，[空间位置与说话时的动作描述]；[角色名]=[画内/画外][远场/近场][男声/女声]，[空间位置与说话时的动作描述]。对白使用剧本原文语言、不翻译不改写，与口型严格同步。
```

Examples:

Live-action film (2 visible speakers with spatial anchoring):
```
说话者锁定：林深=画内近场男声，从A点进入后压低声音指向C点操作台亮屏；周妍=画内近场女声，走到C点操作台后震惊低声说话。对白使用剧本原文语言、不翻译不改写，与口型严格同步。
```

Animation (2 visible speakers + 1 arriving):
```
说话者锁定：白小锋=画内近场男声，站在凝血网前方短促下达命令；红小达=画内近场男声，从画面后方冲入时急促汇报。对白使用剧本原文语言、不翻译不改写，与口型严格同步。
```

Animal film with inner monologue (visible animal + off-screen voiceover):
```
说话者锁定：年糕=画外近场男声（内心独白），猫身体低头看爪子时冷淡画外音；苏敏=画内近场女声，蹲下靠近猫时轻声说话。对白使用剧本原文语言、不翻译不改写，与口型严格同步。
```

Rules:
- 画内 = on-screen speaker (mouth visible, requires lip-sync)
- 画外 = off-screen or inner monologue (no lip-sync needed, but spatial direction still matters)
- 近场 = close to camera, clear and present voice
- 远场 = far from camera, with distance attenuation or reverb
- The spatial description must match the character's position in `【电影化动态描述】`
- If a character shouts from off-screen, note the direction: `画外远场男声，从画面右侧走廊方向传来`
- For voiceover/inner monologue, note explicitly: `画外近场男声（内心独白）`

### Base rule
```
⚠️对白规则：一句台词=一个镜头——每个角色的台词严格只出现在该角色的特写镜头内。
```

### Interruption (one character cuts another off)
If character A interrupts character B mid-word:
```
⚠️例外（对白打断）：第N镜头中[A]说"[start of A's line]——[word at break]"⚠️被第N+1镜头中[B]的台词强行打断——硬切发生在[A]说"[word]"中间，[A]的声音被[B]的台词覆盖切断。⚠️这是有意的对白打断（interruption），制造紧张冲突感。
```

Then in shot N+1's description: `镜头第一帧时[B]通过鼻孔大幅度急吸气（sharp inhale）——抓取空气准备打断。`

### Seedance 2.0 punctuation controls for dialogue

When writing dialogue lines inside Chinese prompts, use these Seedance-specific marks to control AI voice delivery:

- `（内容）` — whisper/breathy: Seedance reads this at lowered volume with near-whisper quality. Use for asides, inner thoughts leaking out, or weakened speech. Example: `"我当然相信你。（骗子。）"`
- `*内容*` — emphasis/weighted: Seedance reads this slower and heavier. Use for the one word that carries emotional weight. Example: `"这不是*你的*决定。"` One per sentence max.
- `【指令】` — silent action: Seedance does NOT read this aloud — it executes as performance direction. Available: `【停顿】` (pause), `【长停顿】` (long pause), `【呼吸】` (breath intake), `【叹气】` (sigh). Example: `"我知道。【停顿】但我还是来了。"`

These combine with standard punctuation (`……` for trailing hesitation, `——` for interruption, `，` for breath turns). See `video-dialogue-punctuation` skill for the full pattern library.

Lip-sync requirements for 画内 speakers:
- Mouth must be visible — mid-shot (50mm) and close-up (85mm+) work best
- Normal speaking speed — add `语速偏慢` or `语速较快` in delivery notes when needed
- Keep per-prompt dialogue under 15 seconds for stable lip alignment

### Dialogue text wrapping with `{}`

Wrap each character's spoken text in curly braces `{}` so Seedance precisely identifies what to read aloud vs. what is stage direction:

```
角色A（清冷少女音）开口说道{你怎么来了？}【停顿 0.5s】
角色B（浑厚中年男声）看向A回应{我刚好路过这边。}【停顿 0.8s】
```

Rules:
- `{}` contains ONLY the words to be spoken — no action, no description
- Action/gesture goes OUTSIDE the braces
- Add `【停顿 Xs】` between different speakers to reduce voice crossover
- Single sentence inside `{}` should be ≤15 Chinese characters; split longer lines

### Multi-speaker hard limit (Seedance 2.0)

**A single 15-second prompt must have at most 2 speaking characters and 2-4 lines of dialogue total.** Three or more speakers in one prompt causes voice crossover (串音), line misattribution, and timbre drift. See [PROMPT_DENSITY.md](PROMPT_DENSITY.md) for splitting rules.

**Tighten further when the prompt also has action, fight, chase, or multi-location cross-cut:**
- Prefer **≤3 spoken lines** (or one gold sentence + reactions)
- **Action + V.O./PA:** keep **one** broadcast/voiceover line max; let motion cover the rest
- Cut TED / briefing / resume Q&A to **key lines**; put the rest on screens, props, gestures, or silence
- English dialogue burns lip-sync budget faster — count spoken seconds, not just line count

When dialogue is the primary content of a prompt, reduce competing processing load:
- Simplify camera moves (static or slow push)
- Minimize background activity descriptions
- BGM is already excluded by default (handled by `bgm-scoring` skill in post) — no need to add any music specification

### Line addressing
Every line must explicitly state **whom it's directed at**:
```
严格朝向 [character X] 说（视线、声音方向都明确指向 [X]，不是对其他人说的）。
```

### Lines from bokeh
If a character in bokeh speaks — sound is allowed, but the silhouette must match: head angled toward the speech direction, breath before words readable even through blur.

### Polyphonic character pronunciation control (多音字发音控制)

Chinese dialogue with polyphonic characters (多音字) frequently causes Seedance to misread. The model picks the wrong reading based on its own context inference, which is often wrong for specialized vocabulary, names, and dramatic dialogue.

#### Method 1: Pinyin annotation (preferred — no post-production needed)

Add the correct pinyin + tone directly after the polyphonic character inside parentheses. This forces the model to override its own pronunciation guess.

Format: `字(pinyin+tone)`

```
林深："你藏这行(háng)里的证据，不要再行(xíng)侥幸。"
周妍："我长(cháng)时间待在这里，只是长(zhǎng)辈托我看守。"
```

Rules:
- Only annotate polyphonic characters that the model is likely to misread — don't annotate every character
- Use standard pinyin with tone marks (háng, zhòng, lè) or tone numbers (hang2, zhong4, le4)
- Add the enforcement clause to `【音画同步】`:

```
⚠️多音字发音约束：所有带括号拼音标注的汉字，严格按照标注拼音朗读，禁止自动识别语境改读音。
```

#### Method 2: Homophone substitution (fallback — requires subtitle fix in post)

Replace the polyphonic character with an unambiguous single-reading homophone. Fix subtitles in editing software after generation.

| Original | Problem | Substitution | Post-production fix |
|---|---|---|---|
| 银行 (háng) | Model reads as xíng | 银航 | Replace "航" → "行" in subtitle |
| 音乐 (yuè) | Model reads as lè | 音越 | Replace "越" → "乐" in subtitle |
| 重要 (zhòng) | Model reads as chóng | 众要 | Replace "众" → "重" in subtitle |

Use this method when:
- Pinyin annotation doesn't work for a specific model/platform
- The line is very short and the annotation disrupts readability
- You're batch-generating and want zero annotation clutter in prompts

For the post-production subtitle replacement workflow in CapCut/剪映, see `post-production` skill.

#### Method 3: Reference audio (for long scripts with many polyphonic words)

Record a clean human voice reading the full dialogue with correct pronunciation. Upload as a reference audio handle:

```
@audio1 — 台词参考音频，成年男性标准普通话朗读。⚠️复刻音频中每个字的发音、声调和断句节奏，多音字读音严格跟随参考音频。
```

Use this when:
- The script has many polyphonic characters, specialized terms, or uncommon proper nouns
- Pinyin annotation would make the dialogue unreadable
- The project needs precise tonal control beyond individual character pronunciation

#### High-frequency polyphonic characters in drama dialogue

Quick reference — these are the most common mispronunciations in AI-generated Chinese dialogue:

| Character | Reading A | Reading B | Reading C |
|---|---|---|---|
| 行 | háng (行业, 银行, 行情) | xíng (行走, 行为, 执行) | |
| 重 | zhòng (重要, 重量, 严重) | chóng (重复, 重新, 重叠) | |
| 长 | zhǎng (长辈, 成长, 长官) | cháng (长短, 长久, 长度) | |
| 乐 | yuè (音乐, 乐器, 乐章) | lè (快乐, 乐趣, 乐观) | |
| 处 | chǔ (处理, 处分, 处置) | chù (处所, 到处, 用处) | |
| 着 | zhuó (着手, 着装, 着力) | zhe (看着, 走着, 听着) | zháo (着火, 着急, 着凉) |
| 了 | le (好了, 走了) | liǎo (了解, 了不起) | |
| 得 | de (跑得快) | dé (得到, 得分) | děi (得亏, 你得去) |
| 还 | hái (还是, 还有) | huán (还钱, 归还) | |
| 干 | gàn (干活, 干部) | gān (干燥, 干净) | |
| 传 | chuán (传说, 传递) | zhuàn (传记, 自传) | |
| 藏 | cáng (藏起来, 隐藏) | zàng (西藏, 宝藏) | |
| 数 | shù (数字, 数量) | shǔ (数数, 数一数) | shuò (数见不鲜) |
| 恶 | è (恶人, 罪恶) | wù (厌恶, 可恶) | ě (恶心) |
| 差 | chā (差别, 差距) | chà (差劲, 差不多) | chāi (出差, 差事) |

When writing dialogue for a scene, scan for these characters and annotate any whose reading is ambiguous in context.

## Section 8.5 — Causality & resistance gate（因果/阻力门）

Seedance and rushed prompting both favor **instant success**: net pops → catch; elbow → both guards down; hero appears at the door; "Sure" with no pause. That reads fake. Every high-stakes beat needs **prior cause** and **visible resistance**.

### Ban list (write into `【负面约束】` when relevant)

| Failure mode | Instead write |
|---|---|
| Instant catch / one-frame snare | Scan lock → deploy → wrap → cinch / second pass → hatch close |
| One-hit KO / clean dual take-down | Missed arc, stumble, recharge chirp, half-beat trip, then escape |
| Teleport rescue / coincidence open door | Prefixed **rendezvous** ("if alarms → wait at X"); arrival via that path |
| Instant consent ("Sure" / "OK" with no beat) | Delay: look down, silence 1–2s, then reluctant agree |
| Badge / key from nowhere | Establish steal / borrow / process hole in an earlier prompt; remount that prop |
| Alert / villain arrives from nowhere | Phone alert, PA, unauthorized terminal flag — show the trigger |
| Unlocked terminal by luck | Duty tablet left logged in / shift hole / stolen badge — **process vulnerability** |
| Confirm off-screen success | Inference only ("should make the ocean") unless the camera sees it |

### Prefixed chain rule

If Prompt N needs a person, card, door, or alert to exist, Prompt **N−k** must have already stated:

1. **Who agreed / stole / triggered it**
2. **Where they wait / go**
3. **What object changes hands**

Then Prompt N's `【首帧衔接】` restates that chain in one line (not a new invention).

### Action beat budget

Inside one 15s fight/escape prompt: lock **3 timed beats** max (e.g. rush door → graze + stumble → badge + exit). Extra flourishes belong in the next prompt or get cut.

### Process vulnerability > coincidence

Prefer institutional failure over luck:

- ✅ maintenance tablet still unlocked on shift change  
- ❌ "she happens to find an unlocked PC"  
- ✅ stolen guard badge from Prompt 22  
- ❌ "uses Jonas's badge" with no handoff  

## Section 9 — Background activity（挂载门控）

Background population is **not automatic**. Seedance will invent armored soldiers, palace guards, and ritual crowds to "fill" grand locations unless the prompt forbids it. Treat extras like characters: **no mount → no on-screen body**.

### Gate before writing background people

Ask, in order:

1. Does this prompt declare a crowd/extra handle (e.g. `@议事人群=…`, `@会议观众=…`, `@保安=…`)?
2. Does the **location reference image itself** already show that exact population, and does the prompt say to preserve it?
3. Does the screenplay beat actually need background bodies right now?
4. Is this prompt a **same-scene continuation** of a previous prompt that already established population? If yes → remount that crowd/location handle; do not drop it.

If answers 1–3 are all no, and answer 4 is also no → write **absence**, not atmosphere people.

Also cover intentional empty-after-evac: if Prompt N clears a space (guards leave, crowd exits), Prompt N+1 must remount the location and write `已清空/无人`, not silently omit the previous crowd mount without stating the world state.
### Same-scene continuation（同场分段）

When the script is one continuous scene split into two 15s prompts (council → Maren watches and leaves; meeting → reaction cutaway):

```
【首帧衔接】接上一视频同场：[事件]仍在进行。首帧切到[新焦点角色]；景深后方保留已挂载[人群/环境]虚化延续——人口构成与上一视频一致，不消失、不换装成士兵。
```

```
@议事人群=议事人群 — ⚠️同场延续：与上一视频同一批人群仍在；焦点切换时退为景深虚化，但不抹掉。
```

Focus change ≠ emptying the world. Dropping the crowd mount is what causes Seedance to invent wrong soldiers or wipe the hall.

### When extras ARE required (and mounted)

Call out what they are doing — species, wardrobe, density, and what they are **not**:

```
环境活动（已挂载议事人群）：⚠️背景仅允许已挂载的同族人鱼议员虚化剪影——稀疏、低声、无队形。禁人类甲胄士兵、禁宫廷卫队列队、禁满殿站立武装人群。
```

```
环境活动（匹配实验室背景，已挂载职员群）：⚠️背景使用已挂载职员形象——多名白衬衫分析员在工作站旁快速打字、站起交接文件。禁额外军装、禁无挂载路人填满画面。
```

### When the beat is alone / exit / empty（必须显式空场）

Write emptiness into both the shot action and `【负面约束】` (dual-insurance):

```
背景：空荡通道 / 大殿后部虚化空间。⚠️画面内除已挂载角色外无其他人——无列队、无卫兵、无剪影人群。
```

```
【负面约束】…禁甲胄士兵、禁宫廷守卫列队、禁满殿人群、禁把空场脑补成阅兵/仪式阵列…
```

### Anti-patterns（禁止）

- ❌ `禁止空旷背景` as a default for every grand hall / throne room / lobby
- ❌ Inventing "atmosphere soldiers" because the location looks ceremonial
- ❌ **Dropping** a crowd mount on Prompt N+1 when the scene is still the same ongoing event (focus shifted, world should not reset)
- ❌ Assuming `【首帧衔接】` alone will carry population without remounting the crowd/location assets
- ❌ Describing `拥挤议事人群` without either a crowd mount or an explicit non-military merfolk description + soldier ban
- ❌ Treating "character leaves the room" as "the room was always empty" — leave-through-crowd vs arrive-into-empty-corridor are different beats; write both explicitly

Quiet/empty scenes still call out the *absence* for sound:

```
完全寂静——禁背景音乐、禁画外人声。仅环境SFX：远处城市低频嗡鸣、暖气管道轻响、湿靴踩在拼花地板上的回响。
```

## Section 10 — Lighting overrides per shot

The default style block forbids fill light, but each scene may need additional lighting overrides specific to that location. See [STYLE_BLOCK.md](STYLE_BLOCK.md) for variants.

Be specific about:
- What lights are ON (windows, screens, practicals)
- What lights are OFF (with explicit `禁` for each forbidden source)
- Direction of key light
- Whether contre-jour or side-lit
- Spill rules ("禁止蓝色色溢打在人物皮肤上")

## Section 11 — `【尾帧转场】` (tail-frame transition planning)

**Optional section.** Only include when the transition to the next video segment requires in-prompt planning — i.e., the ending of THIS video must be specifically choreographed to enable the transition. Skip for simple hard cuts where `【首帧衔接】` on the receiving end is sufficient.

### When to include `【尾帧转场】`

Include when the planned transition IS:
- **Match cut (匹配剪辑)** — final frame element visually matches the first frame of the next segment (shape, color, motion, composition)
- **Action cut (动作剪辑)** — a physical action starts in this video and completes in the next (punch lands → impact reaction, door swings shut → door opens in new location)
- **Whip pan (甩镜转场)** — fast horizontal/vertical pan creating motion blur at tail, next segment opens from matching blur
- **Object wipe (物体遮挡转场)** — an object crosses the entire frame creating a natural wipe to black/color, next segment opens from the reverse
- **Push-in transition (推进转场)** — camera rushes into a dark area, texture, or detail; next segment opens emerging from darkness
- **Light transition (光线转场)** — camera moves into overexposed bright light (window, sun, explosion); next segment fades in from white

Skip (handle in post-production) when the transition IS:
- Simple hard cut (default — just use `【首帧衔接】` on the next segment)
- Cross-dissolve / fade-to-black / fade-from-black (editing software effect, no prompt planning needed)
- Title card or graphic overlay between segments
- Flash/flicker transition (see `post-production` skill → text-effects.md Effect 5)

### Format

```
【尾帧转场】本视频最后[X]秒为转场预备段。
转场类型：[类型名]。
尾帧设计：[具体描述最后N秒/帧的画面状态——摄影机运动、主体状态、光线变化、画面最终落在什么视觉元素上]。
⚠️下一视频首帧必须从[描述下一段的开场画面状态]开始，与本视频尾帧形成[匹配/延续/对比]关系。
```

### Transition type catalog

#### 11.1 Match cut (匹配剪辑)

The tail frame and the next segment's first frame share a visual element — same shape, same screen position, same motion direction — creating a seamless visual bridge across the cut.

```
【尾帧转场】本视频最后1秒为匹配剪辑预备。
转场类型：匹配剪辑（match cut）。
尾帧设计：最后落幅画面中，[元素A]位于画面[位置]，形状/轮廓为[描述]，[运动方向/静止状态]。
⚠️下一视频首帧中的[元素B]必须出现在画面相同位置，轮廓与[元素A]高度近似，实现视觉形状匹配。
```

Example — clock face → moon:
```
【尾帧转场】匹配剪辑预备。
尾帧设计：摄影机缓慢推近墙上圆形时钟，最后1秒时钟表盘占据画面中央60%，白色表盘+深色边框形成圆形轮廓。
⚠️下一视频首帧：满月在夜空中占据画面相同位置和相同大小比例——白色月面+暗色天空边缘匹配时钟轮廓。
```

#### 11.2 Action cut (动作剪辑)

A physical action begins in this video's tail and completes in the next video's head. The cut happens mid-action, creating kinetic continuity.

```
【尾帧转场】本视频最后[X]秒为动作剪辑预备。
转场类型：动作剪辑（action cut）。
尾帧设计：[角色]开始执行[动作]——动作在[具体哪个阶段/位置]时视频结束，⚠️动作未完成，身体处于[中间姿态描述]。
⚠️下一视频首帧必须从该动作的[继续/完成阶段]开始——[角色]的身体姿态、运动方向、速度与本视频尾帧严格连续。
```

Example — punch:
```
【尾帧转场】动作剪辑预备。
尾帧设计：角色A的右拳全速挥出——最后一帧拳头距角色B面部约10厘米，⚠️拳头尚未接触，动作未完成。
⚠️下一视频首帧：角色A的右拳从相同角度、相同速度继续前进并击中角色B——首帧拳头位置与上一尾帧严格匹配。
```

#### 11.3 Whip pan (甩镜转场)

Fast camera pan in the tail creates motion blur; next segment opens from matching motion blur in the opposite direction or the same direction decelerating.

```
【尾帧转场】本视频最后[1-1.5]秒为甩镜转场。
转场类型：甩镜转场（whip pan transition）。
尾帧设计：摄影机在最后[X]秒突然向[左/右/上/下]高速甩镜，速度极快以至画面在最后[0.3-0.5]秒完全变为[水平/垂直]方向的运动模糊条纹，⚠️最终帧为纯运动模糊——无可辨识内容。
⚠️下一视频首帧：从相同方向的运动模糊条纹开始，摄影机向[反向/同向]减速，0.5秒内从模糊中显现新场景。
```

#### 11.4 Object wipe (物体遮挡转场)

A foreground object (person walking past, door closing, hand covering lens) crosses the entire frame, creating a momentary blackout or color block that becomes the transition.

```
【尾帧转场】本视频最后[X]秒为物体遮挡转场。
转场类型：物体遮挡转场（object wipe）。
尾帧设计：[遮挡物]从画面[方向]移入，在最后[0.5-1]秒完全遮挡画面——⚠️最终帧画面被[遮挡物颜色/质感]完全覆盖，无可见背景。
⚠️下一视频首帧：画面被[相同或对应的遮挡物/颜色]覆盖，[遮挡物]向[方向]移出，0.5-1秒内揭示新场景。
```

Example — character walking past camera:
```
【尾帧转场】物体遮挡转场。
尾帧设计：已挂载角色（或非人物遮挡物：门扇/车辆/黑布）从画面右侧走过摄影机前方，在最后0.5秒完全遮挡画面——最终帧为布料/门板纹理填满整个画面。⚠️禁未挂载路人脑补遮挡。
⚠️下一视频首帧：黑色布料纹理向左移出，揭示新场景——地铁站台。
```

#### 11.5 Push-in transition (推进转场)

Camera rushes into a dark cavity, shadow, texture detail, or narrow space; the video ends in darkness or close-up texture. Next segment opens emerging from darkness into the new location.

```
【尾帧转场】本视频最后[X]秒为推进转场。
转场类型：推进转场（push-in transition）。
尾帧设计：摄影机加速推进向[暗区/细节/窄缝]，最后[1-2]秒画面逐渐被[黑暗/纹理/色彩]填满——⚠️最终帧为[全黑/全纹理/单色]。
⚠️下一视频首帧：从[全黑/全纹理]开始，摄影机反向拉出或新光源渐亮，揭示新场景。
```

#### 11.6 Light transition (光线转场)

Camera moves toward an intense light source (window, sun, explosion, headlight); overexposure whites out the frame. Next segment fades in from white.

```
【尾帧转场】本视频最后[X]秒为光线转场。
转场类型：光线转场（light transition）。
尾帧设计：摄影机朝向[强光源描述]移动/[强光源]亮度急剧增加，最后[1-2]秒画面逐渐过曝——⚠️最终帧为纯白过曝（whiteout）。
⚠️下一视频首帧：从纯白/强光开始，曝光逐渐恢复正常，揭示新场景[环境描述]。
```

#### 11.7 Interrupted cut (离切 / Smash cut)

A physical action or emotional moment is deliberately cut short — the video ends BEFORE the action completes, BEFORE the question is answered, BEFORE the emotion resolves. Creates suspense and viewer engagement.

Unlike action cut (§11.2) where the action continues in the next segment, interrupted cut leaves the action **permanently unresolved** in this segment. The next segment starts something entirely different.

```
【尾帧转场】本视频最后帧为离切。
转场类型：离切（interrupted cut / smash cut）。
尾帧设计：[角色]正在执行[动作]——动作进行到[最高张力点描述]时视频突然结束。⚠️动作未完成，画面定格在[中间姿态/悬念瞬间]。⚠️下一视频不延续此动作。
⚠️下一视频首帧必须是完全不同的场景——[新场景描述]，与本视频尾帧形成断裂对比。
```

Example — door about to open (suspense):
```
【尾帧转场】离切。
尾帧设计：角色A的手握住门把，缓慢转动——把手转到一半时视频突然结束。⚠️门未打开，观众不知道门后是什么。
⚠️下一视频首帧：完全不同的场景——另一个城市的街道白天，与本视频的暗室内形成断裂对比。
```

Example — falling object (impact withheld):
```
【尾帧转场】离切。
尾帧设计：花瓶从桌缘滑落，自由下落中——距地面约20cm时视频突然结束。⚠️花瓶未着地，碎裂未发生。
⚠️下一视频首帧：次日清晨，地板已清扫干净，仅残留一小片碎片（暗示结果但不直接展示过程）。
```

When to use interrupted cut vs. action cut:
| | Action cut (§11.2) | Interrupted cut (§11.7) |
|---|---|---|
| Action continues? | Yes, in the next segment | No, permanently unresolved |
| Next segment | Same action, different angle | Completely different scene |
| Purpose | Kinetic continuity | Suspense, imagination space |
| Best for | Action sequences | Thriller, trailer, cliffhanger |

### Transition planning and time budget

Transition tails consume **real seconds** from the 15-second prompt envelope. Account for them in `【规格】` time allocation:

```
【规格】15秒，21:9。时间分配：镜头1（0-3秒，建立）、镜头2（3-12秒，情感核心）、转场预备（12-15秒，甩镜转场）。
```

Rules:
- Transition tails typically use **1–3 seconds** — never more than 3 seconds
- The transition tail is the LAST time segment, after all narrative content
- For very short prompts (8 seconds), use at most 1 second for transition
- If the transition type requires a specific camera move (whip pan, push-in), that move replaces whatever camera move was in the last shot — don't stack them

### `【首帧衔接】` ↔ `【尾帧转场】` pairing

When two consecutive prompts use in-prompt transitions, they form a **sending/receiving pair**:

| Prompt N (sending) | Prompt N+1 (receiving) |
|---|---|
| `【尾帧转场】...最终帧为运动模糊...` | `【首帧衔接】以上一视频尾帧运动模糊作为首帧，摄影机减速揭示新场景...` |
| `【尾帧转场】...最终帧为纯白过曝...` | `【首帧衔接】以上一视频尾帧白色过曝作为首帧，曝光逐渐恢复...` |
| `【尾帧转场】...拳头距面部10cm...` | `【首帧衔接】以上一视频尾帧拳头位置作为首帧，继续完成击打...` |

When the transition is a simple hard cut (no `【尾帧转场】`), the receiving prompt uses the standard `【首帧衔接】` that matches spatial/lighting/composition continuity.

## Section 12 — `【负面约束】` and failure-mode warnings (`⚠️` markers)

End every prompt with a concise negative block:

```
【负面约束】禁身份漂移、禁字幕、禁额外切镜、禁CG/游戏质感、禁手脸畸变、禁漂浮道具、禁失控焦点漂移、禁表演过度；不要让硬约束覆盖本镜头的主要动作和情绪落点。
```

Always add mount-gated population bans when the shot is alone/exit/empty, or when a grand location would tempt Seedance to invent armies:

```
【负面约束】…禁未挂载角色出镜、禁甲胄士兵、禁宫廷守卫列队、禁满殿人群、禁把空场脑补成阅兵阵列…
```

Anticipate what Seedance will get wrong. Add ⚠️-marked rules to prevent it. Use single `⚠️` for important, triple `⚠️⚠️⚠️` for critical-critical.

What to mark with `⚠️`:
- Any distance ("距G约2米")
- Position of any object ("放在BL桌边正中央")
- Forbiddens ("禁止", "不允许")
- Key blocking (where each character stands)
- Eyeline lock ("目光始终锁定在 X 上")
- Timing of any line or action
- Any exception to a general rule

### Inline critical constraints (dual-insurance pattern)

For the highest-risk failure points, use **dual-insurance**: place the constraint both inline (inside the shot's action description where the AI reads it in context) AND in the final `【负面约束】` summary block.

The inline version is more effective because the model reads it at the exact moment it's rendering the relevant action. The summary version is a safety net.

Example — preventing barefoot in a shoe-focused shot:

Inline (inside `【电影化动态描述】` / `【镜头N】`):
```
tracking推进至地面，一双脚完整包裹在绿色布鞋内立于白色盐碱地边缘——⚠️双脚完整包裹绿色布鞋内，鞋面清晰可见，禁止出现赤脚/光脚/脚踝露出。
```

Summary (inside `【负面约束】`):
```
【负面约束】...禁赤脚、禁光脚、禁脚踝露出——布鞋必须完整包裹双脚...
```

When to use dual-insurance:
- The constraint is about something the AI frequently gets wrong (identity drift, missing props, body parts, clothing state)
- The constraint is the scene's make-or-break detail (the whole shot fails if this is wrong)
- The constraint contradicts what the AI might "prefer" to generate (e.g., AI tends to remove shoes, add extra characters, change hair color)

When NOT to use it:
- Generic quality rules (like "禁字幕") that apply to every prompt — these stay in the summary only
- Low-stakes details that won't ruin the shot if slightly off

### Standard forbid block (drop into every prompt)
```
禁3D渲染。
禁游戏引擎、禁游戏CG过场质感。
禁正面光、禁侧面补光、禁反光板、禁柔光箱。
禁LED灯带、禁霓虹。
禁屏幕蓝光溢出。
禁可见光束（god rays）。
禁光学畸变、禁桶形畸变、禁鱼眼。
禁漂浮道具。
禁身份漂移。
禁抖动（除手持呼吸感外）。
⚠️禁背景音乐、禁配乐、禁乐器声（环境音与动作音效保留）。禁字幕。
```

When a scheduling diagram is used as reference input, also append:
```
禁止调度图标注线条、圆圈标记、箭头、文字标签出现在成片画面中——调度图仅作空间参考。
```

### CG-look banned words (禁用词——避免AI塑料感)

These words/phrases push AI models toward CG poster aesthetics instead of cinematic photography. **Never use them in positive prompt text.** If they appear in user requests, translate them into specific cinematic parameters instead.

| 禁用词 | 为什么禁 | 替代写法 |
|---|---|---|
| `8K`, `4K`, `ultra HD` as body-text spells | 推向锐化过度的数码感 | **允许**只在 `【规格】` 写一次分辨率（如 `画质：8K`）；正文风格段落禁止重复堆砌 `8K/4K/ultra HD` |
| `masterpiece`, `best quality` | MJ/SD 遗留咒语，对视频模型无意义 | 删除——质量由具体参数控制 |
| `ultra detailed`, `hyper detailed`, `insane detail` | 让 AI 在每个表面堆砌纹理，失去主次 | 只在需要细节的局部写 `材质清晰可见` |
| `HDR` | 推向高对比/高饱和的游戏截图风格 | 用 `动态范围` 行精确声明高光/暗部策略 |
| `epic`, `stunning`, `breathtaking`, `amazing` | 情绪形容词，模型无法执行 | 用具体的构图/灯光/运镜实现"史诗感" |
| `award winning`, `trending on artstation` | 推向概念艺术/CG插画风格 | 删除——用 `摄影` 行声明摄影师血统 |
| `sharp focus` | 全局锐化，消灭景深和空气感 | 用 `焦平面锁定在[X]上` 精确控制 |
| `perfect face`, `flawless skin` | 推向美颜/滤镜/塑料人感 | 用 `完美度` 声明（见 `style-extractor`） |
| `cinematic lighting` | 太笼统，模型解读为"布光台灯" | 用4维度灯光公式（方向+软硬+色温+氛围） |

在 `【负面约束】` 中，可选追加这条总括禁令：
```
禁塑料廉价AI质感、禁CG渲染感、禁游戏概念艺术风格、禁美颜滤镜、禁全局过度锐化。
```

### Common failure modes to counter

- **Handle contamination** — model uses one character's wardrobe on another. Counter: re-state each character's exact wardrobe in the handle.
- **Identity drift across cuts** — counter: `连续性：角色、道具、环境每个镜头完全一致。禁身份漂移。`
- **Pose-reference contamination** — counter: explicit `❌NOT A VIDEO FRAME❌` rules
- **Light spill on skin** — counter: `禁止蓝色色溢打在人物皮肤和服装上`
- **Wide-angle distortion** — counter: `禁光学畸变——禁桶形畸变、禁枕形畸变、禁鱼眼效果、禁广角变形`
- **Floating props** — counter: `禁漂浮道具`
- **God rays / volumetric beams** — counter: `禁止可见光束（god rays）`
- **Empty / grand-hall background** — counter: follow Section 9 mount gate. If the beat is empty/evac → write absence in both action + `【负面约束】` (`禁甲胄士兵、禁守卫列队、禁脑补人群`). If population is required → mount a crowd asset first, then describe activity. Never "fill empty backgrounds" by inventing extras.
- **Hand chaos** — for shots with hand close-ups, specify finger count and exact action
- **Scale mismatch** — for shots with multiple characters, restate heights
- **Camera pass-through** — for handheld, note "禁稳定器" but also "画面带有机呼吸感微晃" so it doesn't go wild
- **Spurious cuts** — counter: `⚠️本视频严格只有N个镜头——禁止添加额外镜头`
- **Focus drift on inserts** — counter: `⚠️焦平面严格锁定在 [object]——绝对禁止焦点漂移、绝对禁止 rack focus、绝对禁止 autofocus 跳变`
- **Scheduling diagram annotation bleed** — colored lines, circles, arrows, or text labels from the uploaded scheduling diagram leak into the rendered video. Counter: declare the diagram handle with `⚠️渲染时自动隐藏所有标注线条` and add `禁止调度图标注出现在成片画面中` to negative constraints. See [SPATIAL_BLOCKING.md §8](SPATIAL_BLOCKING.md).

### Rule-replacement hierarchy

If a new rule contradicts an earlier one — **the new rule replaces the old**. Don't silently delete the old one; write the replacement explicitly:
```
⚠️替换规则：原规则[X]替换为新规则[Y]——[reason if non-obvious]。
```

Do not add a separate closing footer. Duration and aspect ratio belong in `【规格】`.

## Prompt discipline — four anti-patterns (避坑四原则)

These four rules address the most common reasons AI video generation fails or produces unnatural results. Apply them as a final checklist before finalizing any prompt.

### 1. Specificity principle (具体性原则)

Convert abstract concepts into concrete physical descriptions. The model generates pixels, not feelings — give it observable actions and visible details.

| Bad (abstract) | Good (concrete) |
|-----------------|------------------|
| 他想到很多难过的过往 | 他的脑海中闪过一段模糊的记忆，破碎的家园、逝去的亲人在他眼前浮现 |
| 她很开心 | 她嘴角上扬露出牙齿，眼角出现细微鱼尾纹，双手不自觉地轻轻拍了一下大腿 |
| 气氛很紧张 | 走廊尽头的日光灯管闪烁不定，他的呼吸加速，胸口起伏幅度加大 |

### 2. Non-contradiction principle (非矛盾性原则)

Never include conflicting instructions in the same prompt. The model resolves conflicts by picking the easiest instruction to satisfy, which is usually the wrong one.

Common contradiction patterns to watch for:
- Motion vs stillness: "角色快速奔跑" + "镜头保持完全静止在角色面部特写" (the model may freeze the character to satisfy the static frame)
- Color conflicts: "刀划出红色弧线" + "刀保持银色原样"
- Scale conflicts: "特写脸部" + "展示全身动作"

**Fix:** choose one directive. If both are needed, split into separate prompts.

### 3. Positive description principle (正面描述原则)

Tell the model what you WANT, not what you DON'T want. Negation in the main body confuses the model — it may generate exactly the thing you tried to forbid.

| Bad (negative) | Good (positive) |
|-----------------|------------------|
| 不要让小球进红框 | 小球直接滚入蓝色框 |
| 角色不要笑 | 角色表情凝重，嘴唇紧闭 |
| 背景不要太亮 | 背景处于阴影中，仅有一束侧光 |

**Exception:** the `【负面约束】` section exists specifically for negative constraints. Use positive language in all other sections; save negations for `【负面约束】`.

**Exception to the exception (dual-insurance):** empty halls, post-evacuation corridors, and bans on invented armored soldiers / unmounted crowds **must** appear both inline in `【电影化动态描述】` and again in `【负面约束】` — see Section 9. These failure modes ignore single-location bans.

### 4. Avoid over-specification principle (避免过度指定原则)

Do not specify more simultaneous details than the model can coherently render. Overloaded prompts produce unnatural, "AI-generated-looking" results.

**Overloaded example:**
> 蛋壳裂开，蛋黄流出，蛋清在碗中散开，碗是陶瓷的带蓝边，桌面是橡木有年轮纹理，灯光是暖黄色LED筒灯，背景有一盆绿萝……

**Fix:** Keep only the visually essential details. Secondary details (table material, lamp type, background plants) can be handled by reference images or omitted entirely.

**Rule of thumb:** for a single 15-second prompt, the core action description should focus on **1 main subject doing 1-2 actions**. Environmental and material details support the action but should not compete with it for the model's attention budget.

## Incremental realization (逐次实现思维)

For complex visual effects that cannot be achieved in a single generation pass, break the prompt into incremental layers and generate step-by-step:

**Example:** "沉入水底的战士被战甲状光线附着全身"

| Step | Prompt focus | Builds on |
|------|-------------|-----------|
| Step 1 | Generate the warrior sinking underwater — body, water, bubbles, lighting | — |
| Step 2 | Add armor-shaped energy/light forming around the warrior | Step 1 output as reference image |
| Step 3 | Add the light-attachment animation — energy lines wrapping and locking onto limbs | Step 2 output as reference image |

**When to use incremental realization:**
- Layered VFX: base scene → effect layer → interaction layer
- Character transformation: base state → mid-transition → final form
- Complex environment build-up: empty space → structure → population → atmosphere

**Integration with the prompt system:** when planning an incremental sequence, mark it explicitly in the prompt header:

```
# Prompt 09 — [逐次实现 Step 2/3 · armor energy overlay]
# 依赖：Prompt 08 输出作为 @参考帧
```

## Style asset workflow (风格资产生成)

To lock a consistent visual style across all prompts, generate a **style reference image** before writing video prompts:

1. **Base generation** — create a still image with the correct subject, framing, action, and scene using text-to-image
2. **Style transfer** — feed the base image into an image-to-image model (e.g., Image-2) and specify the target art style (Pixar, Ghibli, 水墨武侠, Art Deco, pixel art, etc.) while preserving content
3. **Video generation** — use the styled image as a reference asset (`@风格参考`) and write the video prompt describing only the motion and action that follows

This prevents style drift across prompts. The styled image becomes a handle:

```
@风格参考=风格参考 — ⚠️风格锁定参考图，仅用于统一全片视觉风格（[style name]），非场景内容。禁将风格参考内容渲染为画面元素。
```

## Length

Don't be precious about prompt length. Prompts in production range from ~150 Chinese characters (simple inserts) to ~2000+ characters (complex reaction shots with 7-step emotional arcs). The complex reaction shots ARE that long because they need to be — micromanaging the performance is what makes them work. Don't truncate to be neat.

## Tone

You are a cinematographer who has worked with Lubezki and Deakins. You think in shadows, lenses, and controlled physical reality. You direct actors with the precision of a stage director and write camera direction with the muscularity of someone who has actually held a steadicam. Don't write generic AI-video prose ("a beautiful shot of..."). Write blocking notes ("Roko 2m from the fridge, back to camera, weight on left foot, right hand still holding the polaroid at thigh height").

## Pre-prompt judgment order (写 prompt 前的判断顺序)

Before writing any prompt, consciously evaluate the shot along **5 dimensions in strict order**. Skipping ahead to lens or texture before deciding WHO is doing WHAT produces "technically pretty but lifeless" video — the most common failure mode in AI generation.

```
① 人物 → ② 事件 → ③ 镜头 → ④ 光线 → ⑤ 质感
```

| 顺序 | 判断维度 | 问自己的问题 | 对应 prompt 区域 |
|---|---|---|---|
| ① | **人物** | 是谁？多大年龄？什么身份？此刻什么状态（疲惫/兴奋/紧张）？ | 角色描述 + `@资产名` 身份板 |
| ② | **事件** | 此刻发生了什么？是"客观记录事件"还是"编造一个动作"？ | `【电影化动态描述】` 动作设计 |
| ③ | **镜头** | 基于这个人物+事件，应该从多远/什么角度/什么焦距看？ | `机位` + `CAMERA_EMOTION` 选择 |
| ④ | **光线** | 光从哪里来？什么颜色？软还是硬？ | `STYLE_BLOCK` 灯光4维度 |
| ⑤ | **质感** | 最后才考虑：胶片感、颗粒、色散、调色、动态范围 | `STYLE_BLOCK` + `video-render-quality` |

**关键规则：**
- ⚠️ **禁止跳过前面的步骤直接写质感** — 先确定人物和事件，再选镜头，最后才碰质感。直接从"好看的色调"开始写 prompt 是最常见的错误。
- **每个 prompt 只重点调整 1–2 个维度** — 试图在一个 prompt 里同时极致化所有维度会让画面过度修饰、失去自然感。
- **保留"缺点"** — 轻微的不完美（微微过曝、不完美对称、自然的肤色不均）比"没有情绪的完美"更有生命感。这条与 `style-extractor` 的"完美度光谱"一致——当风格偏写实/纪实时，不要用渲染指令把画面磨平。

---

## Iteration maintenance (迭代维护)

Prompts are living documents. After AI generates video from a batch of prompts, review the results and maintain the prompt system:

### When to update

After every generation batch, scan results for **recurring** issues (appearing in 2+ shots). One-off glitches are noise; patterns are signal.

### What to update and where

| Issue pattern | Update target | Example |
|---|---|---|
| AI adds unwanted elements across multiple shots | `【负面约束】` in the project's fixed modules | "AI keeps adding earrings" → add `禁额外配饰` to project-level bans |
| AI invents unmounted crowds / armored soldiers in grand halls | Mount-only casting + dual-insurance bans (Section 9) | "Throne hall fills with armor guards" → mount `@议事人群` with non-military merfolk look + `禁甲胄士兵、禁守卫列队` |
| Same-scene split drops population / resets the hall | Same-scene continuation remount (Section 9) | "02B empties the council that 02A established" → remount `@议事人群` + `@王座大殿` on 02B; write `同场延续：议事仍在进行` |
| A composition type consistently fails | Composition shorthand in `BATCH_MODE.md` | "OTS shots always distort the foreground shoulder" → add `前景肩膀禁畸变` to OTS template |
| Style drifts between shots | `STYLE_BLOCK` global declaration | "Later shots keep shifting warmer" → add explicit color temperature lock |
| Specific `⚠️` constraint is being ignored | Escalate: duplicate constraint in both `【电影化动态描述】` AND `【负面约束】` | Dual-insurance pattern from §6 |
| Character identity drifts | Named handle description (`@角色名=角色名`) | Add more specific identity anchors to the character base description |

### Escalation levels for persistent issues

1. **First occurrence:** Add to `【负面约束】` as regular text
2. **Second occurrence:** Promote to `⚠️` critical constraint with emphasis
3. **Third occurrence:** Apply dual-insurance — state the constraint both inline in `【电影化动态描述】` AND in `【负面约束】`
4. **Still failing:** The constraint may be beyond the model's capability at prompt level — flag for post-production fix instead

---

## BGM Strategy for Segmented AI Video (分段视频配乐方案)

### ⚠️ Core rule: BGM is NEVER generated by Seedance

All prompts **默认禁止 BGM**. Background music is produced separately by the **`bgm-scoring` skill** (`.claude/skills/bgm-scoring/SKILL.md`) and mixed onto the video in post-production. This is non-negotiable for two reasons:

1. Seedance generates each prompt as an independent clip. Each clip gets its own AI-generated BGM fragment, creating jarring music transitions when assembled.
2. A unified BGM designed around the video's emotional arc (motif, key changes, BPM shifts) is always superior to per-clip AI fragments.

### Prompt-level implementation (already in the standard template)

Every prompt's `【挂载资源与音频硬约束】` includes:

```
⚠️无背景音乐、无配乐、无乐器声；保留并丰富环境音（…）、动作音效（…）和真实语音混响。
```

If the model still generates music despite this constraint, escalate in `【负面约束】`:

```
⚠️禁止生成任何背景音乐、配乐、乐器声——仅保留人声对白与环境音效。
```

### What IS allowed (and encouraged) in prompts

| Category | Examples | Why keep it |
|----------|----------|-------------|
| **环境音 (Ambient)** | 风声、雨声、虫鸣、城市底噪、空调嗡鸣、水流 | Hard to recreate authentically in post |
| **动作音效 (Foley)** | 脚步、关门、杯子放桌、键盘敲击、衣物摩擦 | Synced to on-screen action; post-added Foley often misaligns |
| **空间回响 (Room tone)** | 对白混响、走廊回声、隔墙闷声 | Defines the acoustic space; nearly impossible to fake |
| **情绪音效 (Emotive SFX)** | 心跳声、呼吸声、耳鸣嗡声 | Tied to character performance timing |

### BGM production pipeline (complete workflow)

| Step | Action | Handled by |
|------|--------|------------|
| 1. Generate video | All prompts include `无背景音乐` → Seedance outputs clean video with ambient sound + dialogue only | `shotlist-builder` (this skill) |
| 2. Design BGM | Analyze emotional arc → design motifs → write per-shot scoring tables → generate AI music prompts → source SFX | **`bgm-scoring` skill** |
| 3. Mix audio | Layer BGM + SFX onto video via ffmpeg or 剪映 | `bgm-scoring` script or `post-production` skill |
| 4. Final delivery | Color grade, subtitles, export | `post-production` skill |

### BGM zone tagging in prompt headers (optional)

When writing a sequence of prompts, tag the intended BGM zones in prompt headers for the `bgm-scoring` skill to reference later:

```
# Prompt 05 — [BGM-A: warm piano, C major]
# Prompt 06 — [BGM-A: warm piano, C major]
# Prompt 07 — [BGM-B: tense strings, A minor] ← transition here
```

These tags do NOT add music to the generated video — they are metadata for the scoring phase.

### Post-production audio levels (reference)

| Layer | Volume | Notes |
|-------|--------|-------|
| Dialogue | 80-90% | Always dominates |
| SFX | 40-60% | Present but non-competing |
| BGM | 15-25% | Bed layer, ducks under dialogue |

### Key identification tools

For non-musicians selecting or verifying BGM key: use 曲多多 (qududuo.com) → AI 找音乐 → 识别调 to upload any music file and get its key.
