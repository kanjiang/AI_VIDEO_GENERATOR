---
name: style-extractor
description: Extract a reusable visual style spec from a reference image and apply it across scenes. Use whenever the user uploads an image and says "match this style", "extract the look", "I want all scenes to look like this", "analyze the style", "make a style sheet from this", "画风说明书", "提取风格", "风格迁移", or wants visual consistency across multiple scenes/shots based on a reference image's aesthetic rather than its content.
---

# Style Extractor

You extract the **visual style DNA** from a reference image — color, light, material, art direction — while ignoring content (subjects, objects, composition). The output is a structured **style spec sheet (画风说明书)** that can be directly plugged into the project's `STYLE_BLOCK` or `【规格】` section for cross-scene visual consistency.

## When to use

Trigger when:
- The user uploads an image and wants to match its aesthetic across other images or videos
- The user wants a consistent "look" for a multi-scene project based on a mood image
- The user asks to "extract", "analyze", or "describe" the style/look/aesthetic of an image
- The user wants to transfer one image's style to another image while preserving the target's content
- The user is starting a new project and wants to define the visual identity from a reference

Do NOT use when:
- The user wants to describe what's IN the image (content, characters, props) — that's asset description
- The user wants a scene board — use `scene-board-skill` instead
- The user wants to fix render quality on existing prompts — use `video-render-quality` instead
- The user wants to write video prompts — use `shotlist-builder` instead

## Core rule: style ≠ content

Style extraction MUST ignore:
- Specific subjects (people, animals, objects)
- Composition and framing
- Narrative or story elements
- Specific colors of specific objects ("the red dress" is content, "warm dominant with desaturated reds" is style)
- Actions, poses, expressions

Style extraction MUST capture:
- Color relationships (palette logic, dominant/accent balance, saturation strategy, shadow color bias)
- Light behavior (direction, hardness/softness, contrast ratio, practical source types, dynamic light presence)
- Material/texture quality (grain, sharpness, surface feel, film stock character)
- Art direction signature (what visual school or cinematographic tradition this belongs to)
- **Finish intent** (精修度意图) — where on the perfection spectrum this style sits (see below)

### The perfection spectrum (精修度光谱)

AI naturally tends toward polished perfection. But many real-world styles are deliberately imperfect. Extract the **finish intent** from the reference:

```
← 刻意粗糙 (拙趣/手感)          中性           精致完美 (精修/商业) →
   手绘笔触可见                                    毫无瑕疵
   曝光不均匀                                      光线精准控制
   构图不居中                                      严格对称
   颗粒/噪点明显                                   画面纯净
   文字手写/歪斜                                    字体精排
   "活人感""松弛感"                                 "商业感""大片感"
```

When the reference sits on the **left half** (deliberately rough), the style spec MUST include explicit imperfection directives:

```
完美度：低——刻意保留手工感，禁过度精修、禁完美对称、禁AI光滑质感
```

When the reference sits on the **right half** (polished), write:

```
完美度：高——精致商业级，画面干净精修，构图严谨
```

This dimension prevents the common failure mode where AI "corrects" a deliberately rough style into something polished.

## Workflow

### Step 1 — Extract (画风提取)

When the user provides a reference image, analyze it using the **structured extraction prompt** below. Output the result as a **style spec sheet**.

#### Structured extraction prompt (internal — what you actually do)

Analyze the image along these exact dimensions, which map directly to the per-dimension style block in `STYLE_BLOCK.md`:

| Dimension | What to extract | Maps to |
|---|---|---|
| **色调策略** | Dominant/secondary/accent color proportions, saturation level, warm-cool bias | `调色：60:30:10——...` |
| **光线逻辑** | Light direction, hardness, contrast ratio, whether practicals-only or styled, shadow density | `灯光：...` |
| **动态光源** | Any temporal light variation visible or implied (flicker, sweep, dapple) | `动态光源：...` |
| **质感/胶片** | Film stock character, grain presence, sharpness level, whether clean digital or textured analog | `质感：...` + `噪点：...` + `锐化：...` |
| **动态范围** | Highlight handling (crushed or retained), shadow detail (lifted or deep black), overall contrast | `动态范围：...` |
| **材质表现** | Surface rendering style (hyperreal pores, painterly soft, graphic flat), how materials interact with light | `皮肤：...` or material description style |
| **艺术流派** | Cinematographic lineage (Lubezki naturalism, Deakins precision, Wong Kar-wai saturated, Fincher desaturated, Ghibli painterly, etc.) | `摄影：...` + `风格：...` |
| **完美度意图** | Where on the perfection spectrum — deliberately rough/handmade (拙趣) or polished/commercial (精修) | `完美度：...` |
| **氛围关键词** | 3–5 atmosphere words that capture the emotional register of the visual treatment | Used as creative direction anchor |

#### Graphic design dimensions (平面设计维度——可选)

When the reference image is a **poster, cover, thumbnail, title card, or any layout-based design** (not a cinematic frame), activate these additional dimensions:

| Dimension | What to extract | Output |
|---|---|---|
| **字体风格** | Font family vibe (hand-drawn, serif, sans-serif, mixed), weight, size hierarchy, intentional misalignment | `字体：[e.g., "手写体为主，大小混排，刻意不对齐，笔画有断续感"]` |
| **插画/装饰元素** | Illustration style if present (line drawing, sticker, doodle, none), density, placement logic | `装饰元素：[e.g., "简笔线条小人+手绘箭头，密度低，仅用于引导视线"]` |
| **版式逻辑** | Layout structure (centered, asymmetric, grid-broken), white space strategy, text-image overlap rules | `版式：[e.g., "非对称留白，主体偏左下，右上大面积留白用于文字"]` |
| **色块/背景处理** | Background treatment (photo-based, solid color, gradient, textured), color block usage | `背景处理：[e.g., "原片保留但曝光偏高+轻微褪色，无纯色背景"]` |

**Activation rule:** Only extract graphic design dimensions when the reference is a layout/design piece. For cinematic frames and video screenshots, skip these — they would produce misleading output.

When graphic design dimensions are active, the style spec sheet adds a `### 平面设计维度` section after the core dimensions:

```
### 平面设计维度（仅限海报/封面/字卡类项目）

字体：[extracted font style]
装饰元素：[extracted illustration/decoration style, or "无"]
版式：[extracted layout logic]
背景处理：[extracted background treatment]
```

#### Style spec sheet output format (画风说明书)

Output the extracted style as a structured block that can be directly copied into a prompt's style section:

```
## 画风说明书：[项目/风格名称]

**提取自：** [reference image description or filename]

### 逐维度风格声明（可直接插入提示词风格块）

风格：[resolution + overall approach, e.g., "8K IMAX，低饱和电影写实"]
摄影：[cinematographic lineage, e.g., "Emmanuel Lubezki自然主义 × 是枝裕和日常纪实"]
质感：[film stock or texture, e.g., "柯达Portra 400温暖肤色偏移，轻微过曝高光"]
光追：[ray tracing approach if applicable]
灯光：[light logic extracted from the image]
调色：60:30:10——[extracted palette, e.g., "暖棕60%/浅灰绿30%/奶白高光10%，整体低饱和，阴影偏暖棕"]
动态光源：[extracted or implied dynamic light, or "无"]
噪点：[grain character, e.g., "明显胶片颗粒，暗部颗粒更重"]
锐化：[sharpness, e.g., "中等锐化，边缘柔和无硬线条"]
动态范围：[DR handling, e.g., "高光轻微过曝保留，暗部保留细节不死黑，中等对比"]
完美度：[finish intent, e.g., "低——刻意保留手工感、拙趣" or "高——精致商业级"]

### 氛围关键词
[3-5 mood words, e.g., 温暖、私密、怀旧、柔光、日常]

### 禁止（与此风格冲突的元素）
[List of things that would break this style, e.g., "禁高饱和、禁硬边缘锐化、禁冷蓝调、禁明确光束"]
```

#### 参考结构图（可选——当文字无法充分传达风格时使用）

某些风格（如喜茶风、手绘插画风、拼贴杂志风）包含难以用文字精确描述的视觉元素——字体选择、手绘插画元素、版式留白逻辑、刻意的粗糙质感。这些情况下，画风说明书应附带**参考结构图清单**：

```
### 参考结构图

| 维度 | 参考图描述 | 用途 |
|---|---|---|
| 字体风格 | [截图/示例：手写体、歪斜排列、大小混排] | 锁定文字视觉身份 |
| 插画元素 | [截图/示例：线条小人、手绘箭头、涂鸦装饰] | 锁定装饰元素的手感和密度 |
| 构图骨架 | [截图/示例：非对称留白、主体偏置、文字叠压区域] | 锁定版式逻辑 |
| 质感样本 | [截图/示例：纸质纹理、扫描颗粒、打印机噪点] | 锁定不可用文字描述的物理质感 |
```

**使用规则：**
- 参考结构图仅用于**锁定结构元素**，不得包含需要保护版权的完整作品
- 每个维度只需1-2张结构参考，不要堆积
- 在 Step 2（风格迁移）时，参考结构图可以和文字画风说明书一起作为输入——这是"参考结构图"和"原始参考图"的区别：参考结构图只展示单一维度的元素（比如只有字体样式），不含完整画面内容
- 当风格偏精修/商业类型且各维度可用文字精准描述时，不需要参考结构图

### Step 1.5 — Generate color card (色卡生成——可选)

A **color card (色卡图)** is a dedicated reference image that contains ONLY the project's color/tone identity — no content, no characters, no scene. It serves as a **visual anchor** that gets attached as the named `@色卡=色卡` handle in every video prompt, ensuring AI maintains consistent color across all generated segments.

**When to generate a color card:**
- Multi-scene projects (≥ 3 video prompts) where color consistency is critical
- Projects based on a specific color aesthetic (vintage warm, noir cold, pastel sweet)
- When text-only color declarations in `调色：` are producing inconsistent results across segments

**When NOT needed:**
- Single-shot projects
- Projects where each scene intentionally has a different color palette
- Projects already using a strong reference image that doubles as a color anchor

#### Color card generation prompt

Use this prompt to generate the color card image:

```
生成一张 16:9 色卡参考图。

画面内容：纯抽象色彩构成——无人物、无物体、无文字、无场景。

色彩构成：
- 主色（占画面 60%）：[精准色名，如"暖琥珀金"]
- 辅色（占画面 30%）：[精准色名，如"浅灰绿"]
- 点缀色（占画面 10%）：[精准色名，如"奶白高光"]
- 阴影色调：[精准色名，如"青蓝暗部"]
- 整体饱和度：[低饱和/中等饱和/高饱和]
- 整体对比度：[低对比/中等对比/高对比]

色彩分布方式：柔和渐变色块，从左到右按主色→辅色→点缀色过渡，下方 20% 区域为阴影色调。
质感：轻微胶片颗粒质感，[柔和/锐利]边缘。

⚠️禁止任何具象内容——纯色彩参考。
```

**From style spec sheet:** If you already have a style spec (Step 1), extract color card values directly from the `调色：` line:

```
调色：60:30:10——暖棕60%/浅灰绿30%/奶白高光10%，整体低饱和，阴影偏暖棕
→ 主色=暖棕，辅色=浅灰绿，点缀色=奶白，阴影=暖棕，低饱和，中等对比
```

**From reference image:** If you have a reference image but no style spec yet, first run Step 1 (extract), then generate color card from the extracted palette.

#### Color card file naming and storage

```
文件名：色卡_[项目名].png
存放位置：与其他资产图在同一 assets 目录
```

#### Color card usage in prompts

The color card is attached as the **first** named handle in every prompt, before character and scene handles:

```
@色卡=色卡 — ⚠️色彩参考图——本图仅用于锁定全片色调，非场景内容。所有画面的色温、饱和度、明暗对比必须与本色卡一致。禁将色卡内容渲染为画面元素。
@场景A=场景A — 参考场景A。
@角色A=角色A — 参考角色A角色定妆。

【挂载资源与音频硬约束】本视频必须严格使用已挂载的色卡、场景A、角色A参考...
```

**Critical rule:** The color card handle description must explicitly state `⚠️色彩参考图` and `禁将色卡内容渲染为画面元素`, otherwise the AI may try to render the color blocks as part of the scene.

#### Double insurance: text + image

Color card does NOT replace the text-based `调色：` line in the style block. Both work together:

| Layer | Function | Strength |
|---|---|---|
| `调色：60:30:10——...` (text) | Declares exact color proportions and names | Precise ratio control |
| `@色卡=色卡` (image) | Visual reference for overall tone/feel | Prevents color drift across segments |

Text handles the numbers. Image handles the feel. Together they produce consistent color across 10+ video segments.

### Step 2 — Apply (风格迁移)

When the user wants to apply the extracted style to a target image or to video prompts:

#### For image style transfer

Use this prompt structure (provide to user for their image generation tool):

```
请根据以下画风说明书，对目标图片进行风格迁移。严格遵循以下规则：
1. ⚠️完全保留目标图片的主体、构图、动作、镜头视角和所有内容细节——不得改变任何内容元素。
2. 仅修改以下视觉维度，使其符合画风说明书：
   - 色调：[从画风说明书粘贴调色行]
   - 光影：[从画风说明书粘贴灯光行]
   - 质感：[从画风说明书粘贴质感+噪点+锐化行]
   - 动态范围：[从画风说明书粘贴动态范围行]
3. ⚠️不得添加参考图中的任何内容元素（人物、物体、场景），不得改变目标图片的构图和主体。
4. ⚠️禁止：[从画风说明书粘贴禁止行]
```

#### For video prompt integration

Insert the extracted style spec directly into the project's style block:

- **If using per-dimension form** → replace each line with the extracted values
- **If using compact form** → rewrite the compact paragraph using the extracted dimensions
- **If using `reference-driven-video-prompt-template.md`** → replace the `【规格】` render dimensions with the extracted values

The style spec overrides the default Lubezki × Deakins style block when the user explicitly wants a different look. Declare the override:

```
⚠️本项目使用自定义画风说明书，覆盖默认风格块。画风提取自[reference]。
```

## Integration with other skills

| Skill | How style spec integrates |
|---|---|
| `shotlist-builder` | Replace the default `STYLE_BLOCK.md` values with extracted spec; declare override in Phase 1 |
| `scene-board-skill` | Use extracted palette and lighting logic in the scene board prompt's lighting and atmosphere block |
| `video-render-quality` | Use extracted `质感/噪点/锐化/动态范围` to select or customize a render profile. When `完美度` is "低(拙趣)", **do NOT layer on hyperreal render directives** — they would fight the intentional roughness |
| `storyboard-table-skill` | Use `氛围关键词` as the style anchor for storyboard panel descriptions |
| `post-production` | When graphic design dimensions are active, use `字体/装饰元素/版式` specs to guide text effect and title card design in CapCut |

## Copyright safety

The two-step design (extract text spec → apply text spec without the reference image) is deliberate: Step 2 never receives the reference image. The AI only works from the text-based style spec. This prevents:
- Reference image content (characters, compositions, specific objects) from leaking into generated results
- Direct style copying that could trigger copyright concerns
- The AI treating reference image content as style features (e.g., interpreting a red background as "style = red dominant" when it's just the scene's content)

When providing the style transfer prompt to users, explicitly note: **do NOT upload the original reference image alongside the style spec — the text spec is the only input for Step 2.**

## Hard rules

- Never describe the content of the reference image in the style spec — no subjects, no objects, no narrative
- Always output in the per-dimension format so it's directly copy-pasteable into prompts
- If the reference image has multiple competing styles (e.g., warm foreground, cold background), extract the DOMINANT style and note the secondary as a variant
- If the user provides multiple reference images, extract a UNIFIED style spec that captures the shared aesthetic, noting which image contributed which dimension
- The `禁止` section is mandatory — every style implies things that would break it
- When the extracted style conflicts with an existing project style (e.g., extracted style uses fill light but the project has practicals-only), flag the conflict and ask the user which takes priority
- **`完美度` is mandatory** — every style has a position on the perfection spectrum. When the reference is deliberately rough, the `禁止` section MUST include `禁AI光滑感、禁过度精修、禁完美对称`
- **Graphic design dimensions are opt-in** — only activate when the reference is a layout/design piece, not a cinematic frame
- **参考结构图 supplements text, never replaces it** — always write the text spec first; structure references are additional anchors for dimensions that text cannot fully capture
