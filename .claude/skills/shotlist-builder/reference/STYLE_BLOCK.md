# Default Style Block

This Chinese style paragraph is appended to **every** prompt unless the user uploads a custom style override. Drop it in verbatim, then layer the scene-type-specific lighting clause on top.

## Universal lighting rules (always present)

These rules go into **every** prompt's style block, regardless of scene:

```
灯光：⚠️严格仅使用场景内实际存在的光源（practicals）——屏幕、显示器、办公舱内部灯光、窗户、实用吊灯/台灯等。
禁止一切电影补光——禁正面光、禁侧面补光、禁顶光、禁底光、禁反光板、禁柔光箱、禁LED灯带、禁霓虹、禁任何画面外光源。
摄影机始终在人物的阴影侧（shadow side）拍摄——面部自然受光但从较暗的一侧取景，practicals环境光照亮脸部轮廓和眼神光（catchlight）。
全程大气薄雾haze增加空气质感——禁止可见光束（god rays）。
```

If the scene has a screen/monitor in frame, also append:
```
⚠️禁止屏幕/显示器向环境投射可见蓝色光芒——屏幕仅作为背景元素发光，不作为主光源。
⚠️禁止蓝色色溢（blue spill）打在人物皮肤和服装上。
```

## Universal color rule (always present)

Default palette declared in every prompt:
```
色彩：60:30:10——主色/辅色/点缀色。
```

Pick the proportions to match the scene's **mood**:

| Mood | Proportion |
|---|---|
| **Cold conflict / tension** | 60% cool blue + 30% concrete grey + 10% red accent |
| **Warmth / intimacy** | 60% warm tungsten + 30% deep brown + 10% amber |
| **Danger / panic** | 60% deep red + 30% black + 10% sodium orange |
| **Sci-fi / tech** | 60% black + 30% cool grey + 10% accent (purple / cyan) |

State the proportion explicitly in the prompt, e.g.:
```
色彩：60:30:10——冷蓝/混凝土灰/红色点缀。
```

**Color card double insurance (色卡双保险):**

For multi-scene projects (≥ 3 video prompts), use **both** the text `调色：` line AND a color card reference image for maximum color consistency:

| Layer | What it controls | When it helps |
|---|---|---|
| `调色：60:30:10——...` (text) | Exact color names and proportions | Precise ratio control within a single segment |
| `@色卡=色卡` (image) | Overall tone/feel as visual anchor | Prevents color drift across 5-15+ segments |

For single-shot projects or projects with intentionally varying palettes per scene, the text `调色：` line alone is sufficient.

#### Color card generation prompt (色卡生成模板)

Use this text-to-image prompt to generate the color card. Replace the bracketed values with the project's actual palette:

```
生成一张 16:9 色卡参考图。

画面内容：纯抽象色彩构成——无人物、无物体、无文字、无场景。

色彩构成：
- 主色（占画面 60%）：[精准色名，如"暖琥珀金"] HEX:[#XXXXXX]
- 辅色（占画面 30%）：[精准色名，如"浅灰绿"] HEX:[#XXXXXX]
- 点缀色（占画面 10%）：[精准色名，如"奶白高光"] HEX:[#XXXXXX]
- 阴影色调：[精准色名，如"青蓝暗部"] HEX:[#XXXXXX]
- 整体饱和度：[低饱和/中等饱和/高饱和]
- 整体对比度：[低对比/中等对比/高对比]

色彩分布方式：柔和渐变色块，从左到右按主色→辅色→点缀色过渡，下方 20% 区域为阴影色调。
质感：轻微胶片颗粒质感。

⚠️禁止任何具象内容——纯色彩参考。
```

**From the `调色：` line:** extract color card values directly from your project's 60:30:10 declaration:

```
调色：60:30:10——隧道深黑60%/钠灯暖橙25%/车灯冷白15%
→ 主色=隧道深黑 #1A1A1A，辅色=钠灯暖橙 #C4963A，点缀色=车灯冷白 #E8E0D0
```

#### Color card file naming and usage

```
文件名：色卡_[项目名].png
存放位置：与其他资产在同一 assets/ 目录
```

Attach the color card as the **first** named handle in every prompt — before scene and character handles. See `PROMPT_PATTERNS.md` → Color card handle for the exact format.

For advanced multi-zone color control (e.g., extracting from a film with different visual zones), use `style-extractor` skill → Step 1.5 (basic 3-color) or Style Pack Mode (enhanced 10-color).

### Color narration strategies (色彩叙事策略)

The `60:30:10` ratio controls color proportions. The **narration strategy** controls how colors participate in the story. Choose one strategy per project/scene:

| Strategy | Description | Best for | 中文 prompt 参考句式 |
|---|---|---|---|
| **大色块叙事** | Large blocks of color from costumes, walls, flags, floors | Ceremony, power, historical, group scenes | `调色以大色块叙事——[服装/墙体/旗帜]形成主色块` |
| **限定色谱** | Entire scene uses only 3-4 adjacent colors (e.g., cream + tobacco brown + olive green) | Modern life, family, urban, low-key suspense | `调色：限定色谱——全场仅围绕[色A/色B/色C]` |
| **互补色冲突** | Low-saturation complementary pair creates relational tension (old red vs sickly green, ochre vs dark blue) | Conflict, opposition, moral struggle | `调色：互补色冲突——[旧红与病态绿]低饱和对抗` |
| **光色分离** | Daylight and interior light have different temperatures; character stands at the boundary | Departure, waiting, memory, identity shift | `调色：光色分离——[冷日光]与[暖室内灯]交界，人物处于两种色温之间` |
| **空气综合色** | Color comes from fog, rain, sea wind, dust, glass, or water reflection — not from objects themselves | Ocean, historical, city, mythology, nature | `调色：空气综合色——色彩来自[雾气/海风/灰尘/玻璃反射]，非物体本身` |
| **高明度色彩** | High brightness ≠ sweet/advertising. Warm white, pale gray, soft blue, faded pink with real shadows | Daytime, future, hospital, airport, modern architecture | `调色：高明度——[暖白/浅灰/淡蓝]高明度，但保留真实阴影和人物状态` |
| **光学混色** | Subtle color shifts from natural light, sky, water, glass, leaves, skin interactions | Afternoon, garden, coast, summer, memory, intimate portraits | `调色：光学混色——色彩来自自然光与[水面/玻璃/树叶/皮肤]之间的微妙交互` |

**Rule:** every color in the frame must have a physical source (costume, wall, weather, practical light, reflected surface, period material). Never apply a uniform post-grading that turns all objects the same color.

**Color thesis (色彩命题):** For projects with strong narrative intent, write a one-sentence "color thesis" before choosing the 60:30:10 values:

```
色彩命题：一块褪色朱红在大面积潮湿青灰中持续存在。
→ 调色：60:30:10——潮湿青灰60%/暗灰绿30%/褪色朱红10%
→ 策略：空气综合色（整体色来自雨雾）+ 大色块叙事（朱红来自角色服装）
```

The thesis forces intentional color choices instead of defaulting to "cinematic blue-gray."

**Default forbidden:**
```
禁3D渲染，禁游戏引擎，禁游戏CG过场质感，禁霓虹，禁过饱和色，禁HDR感。
```

## The full block (canonical — compact form)

The compact form packs everything into one dense paragraph. Use this when prompt token budget is tight:

```
风格：超写实真人电影摄影——禁3D渲染，禁游戏引擎，禁游戏CG过场质感。摄影：Emmanuel Lubezki × Roger Deakins。灯光：[方向]45°侧光 + [精准光色]暖金色/冰蓝等 + [软硬]漫射柔光/硬光 + [氛围层]浮尘/暗角/光晕等（最多2个），⚠️严格仅使用场景内实际存在的光源（practicals），禁止一切电影补光，摄影机始终在人物的阴影侧（shadow side）拍摄，全程大气薄雾haze——禁止可见光束（god rays）。色彩：60:30:10——主色/辅色/点缀色。镜头：物理电影镜头。180°快门运动模糊。皮肤：毛孔级写实——汗毛、不对称痣、毛细血管潮红、毛孔阴影匹配现场光源。表演：好莱坞级——反应前微停顿、精准视线、湿润活眼带眼神光、可见呼吸和胸腔起伏。物理：重力惯性真实——质量有真实重量、正确接触阴影。禁漂浮道具。构图：三分法+黄金比例。每人从第一帧开始运动。连续性：角色、道具、环境每个镜头完全一致。禁身份漂移。技术：60fps流畅运动。分辨率与细节写在【规格】（如画质：8K），正文不重复堆砌8K咒语。禁抖动（除手持呼吸感）。音频：仅环境SFX。禁音乐。禁字幕。
```

## The full block (per-dimension form)

The per-dimension form declares each visual parameter on its own labeled line. Use this when you need fine-grained control — adjusting one dimension doesn't require re-reading the entire block, and no dimension gets accidentally dropped. Preferred for projects that need render quality tuning (see `video-render-quality` skill):

```
风格：超写实真人电影摄影
摄影：Emmanuel Lubezki × Roger Deakins
质感：[胶片型号，如 柯达Vision3 500T / 富士Reala 500D / ARRI Alexa色彩科学]
光追：[光线追踪反射与光线追踪阴影 / 路径追踪]
灯光：[方向][精准光色][软硬][光影描述]，[氛围层光效×1-2]。⚠️严格仅使用场景内实际存在的光源（practicals）。禁止一切电影补光。摄影机始终在人物的阴影侧（shadow side）拍摄。全程大气薄雾haze——禁止可见光束（god rays）。参见"四维光影公式"填写
调色：60:30:10——[主色/辅色/点缀色]，[色温倾向]，[阴影偏色]，整体对比度[高/中/低]
动态光源：[窗外车灯短暂扫过 / 烛火跳动 / 树影婆娑 / 云层明暗 / 霓虹闪烁 / 无]
噪点：[轻微胶片颗粒 / 细腻胶片颗粒 / 无噪点]
锐化：[极高锐化 / 高锐化边缘增强 / 中等锐化 / 柔和无锐化]
动态范围：[高宽容度电影动态范围 / SDR]（⚠️禁「HDR感」游戏截图调色；如需高光暗部策略，用文字描述，勿写 HDR 咒语）
镜头：物理电影镜头，180°快门运动模糊
皮肤：毛孔级写实——汗毛、不对称痣、毛细血管潮红、毛孔阴影匹配现场光源
表演：好莱坞级——反应前微停顿、精准视线、湿润活眼带眼神光、可见呼吸和胸腔起伏
物理：重力惯性真实——质量有真实重量、正确接触阴影。禁漂浮道具
构图：三分法+黄金比例。每人从第一帧开始运动
连续性：角色、道具、环境每个镜头完全一致。禁身份漂移
技术：60fps流畅运动；分辨率写在【规格】（如画质：8K），此处不重复堆砌8K咒语；禁抖动（除手持呼吸感）
音频：仅环境SFX。禁音乐。禁字幕
禁止：禁3D渲染，禁游戏引擎，禁游戏CG过场质感，禁塑料质感，禁平面光，禁CG默认材质
```

Rules for per-dimension form:
- Each line starts with a bold dimension label followed by a colon
- `质感`、`光追`、`噪点`、`锐化`、`动态范围` are the new render-quality dimensions — pick values from `video-render-quality` skill's render-directives catalog
- `调色` now includes shadow color bias and contrast level, not just the 60:30:10 ratio
- The `禁止` line at the end aggregates all negative constraints that apply globally
- Either form (compact or per-dimension) is valid — use whichever matches the project's needs

## Scene-type lighting variants

Layer these specific clauses into the lighting section above based on the scene:

### Night interior — natural light only (e.g., dark apartment, no lamps on)
```
灯光：窗外冰蓝色月白漫射柔光从左侧45°透入，室内全部灯光关闭，禁任何室内光源，阴影偏深藏蓝，画面边缘暗角。摄影机始终在人物的阴影侧拍摄。
```

### Underground base / sci-fi interior with practicals
```
灯光：⚠️严格仅使用场景内实际存在的光源（practicals）——屏幕、工作站显示器、玻璃办公舱内部灯光。主光来自右侧practicals暖白色漫射柔光，低对比柔和阴影，阴影偏冷灰。禁止一切电影补光。⚠️禁止屏幕/显示器向环境投射可见蓝色光芒——屏幕仅作为背景元素发光。摄影机始终在人物的阴影侧（shadow side）拍摄。⚠️禁止蓝色色溢（blue spill）打在人物皮肤和服装上。
```

### Day exterior
```
灯光：正午直射硬光从上方偏右45°照射，高对比锐利阴影，contre-jour逆光从天空方向，阴影偏青灰，全程大气haze增加空间深度。摄影机始终在人物的阴影侧（shadow side）拍摄。禁反光板、禁补光、禁柔光箱。
```

### Night exterior
```
灯光：路灯暖橙色硬光从上方照射，车头灯冰蓝短暂扫过，店铺霓虹[红/蓝]色反射在潮湿地面，高对比，阴影偏暗调藏蓝，潮湿地面反光，全程城市haze。摄影机在人物阴影侧。无任何摄影补光。
```

### Warm interior (kitchen, bedroom with lamps on)
```
灯光：右侧台灯暖金色漫射柔光，低对比柔和阴影，阴影偏温棕，空气中细微浮尘，haze轻微。摄影机始终在阴影侧。无任何外部补光。
```

## Four-dimension lighting formula (四维光影公式)

The `灯光：` line should follow a **structured four-dimension formula** for every shot. Vague descriptions like "电影感" or "暖光" produce flat, generic lighting. The four dimensions are:

```
灯光：[① 光源方向] + [② 软硬] + [③ 精准光色] + [④ 氛围层光效]
```

### Dimension 1 — Light direction (光源方向)

Direction creates three-dimensionality. Without it, faces look flat.

| Direction | Chinese prompt phrase | Effect | Best for |
|---|---|---|---|
| 45° side light | `左侧/右侧45°侧光` | Sculpts facial contours, reveals bone structure | Daily scenes, drama default |
| Backlight / rim | `人物背后逆光/轮廓光` | Separates subject from background, halo edge | Atmosphere, silhouette |
| Window front light | `窗边顺光` | Even, soft, gentle illumination | Sweet romance, warmth |
| Top light | `正上方顶光` | Deep eye sockets, dramatic shadows | Suspense, oppression (use with fill) |
| 45° side-back | `45°侧逆光` | Warm edge highlight, moody separation | Sunset, emotional/sad scenes |
| Rembrandt triangle | `伦勃朗三角侧光` | Classic triangle of light on shadow-side cheek, dramatic yet natural | Period drama, portrait, HK retro, emotional close-up |
| Under light | `下方仰光` | Unnatural, unsettling | Horror, villainy (rare) |

**Rembrandt lighting note:** 伦勃朗灯位 = 45°侧光偏高，在暗面颊骨下方形成一个倒三角形亮区。是经典电影人像灯位，适合情绪浓度高的特写。

**Catchlight (眼神光):** 甜宠、情感特写必须在灯光描述末尾加 `面部柔和眼神光`。眼神光让瞳孔有光点，角色才"活"。快速动作镜头可省略。

**Forbidden vague words:** `打光`、`有光`、`自然光`、`灯光好`、`电影光感`、`电影级光影`、`亮一点` — these produce nothing specific.

### Dimension 2 — Light softness (光线软硬)

Softness controls emotional contrast.

| Type | Chinese prompt keywords | Visual result | Genre fit |
|---|---|---|---|
| **Soft light** | `漫射柔光`、`磨砂窗透光`、`阴天散射光`、`阴影边缘模糊`、`低明暗对比` | Gentle gradients, soft shadow edges, flattering skin | Sweet romance, healing, emotion, family |
| **Hard light** | `正午直射硬光`、`锐利清晰阴影`、`高明暗反差`、`明暗分割面部` | Sharp shadow edges, high contrast, dramatic | Suspense, conflict, urban drama, thriller |
| **Mixed** | `主光柔和漫射 + 辅助硬光勾勒轮廓` | Soft main + hard accent, cinematic depth | High-end drama, nuanced emotion |

### Dimension 3 — Precise light color (精准光色)

Replace vague "warm/cold" with specific color words. Seedance2's PBR renderer responds to precise color terms much better.

**Forbidden vague words:** `暖色调`、`冷色调`、`暖光`、`冷光`

| Vague (禁用) | Precise warm alternatives | Precise cool alternatives |
|---|---|---|
| 暖色调 | `暖金色`、`琥珀色`、`蜜糖橘`、`烛光橙`、`日落赭红` | — |
| 冷色调 | — | `冰蓝`、`月白`、`青灰`、`暗调藏蓝`、`薄荷绿灰` |

**Pro technique — contrast color shadows (明暗撞色):**

More cinematic than single-color lighting. Declare both main light and shadow color:

```
灯光：右侧45°暖金色柔光（主光），阴影带青蓝色调（shadow fill）
```

| Main light color | Shadow color | Mood |
|---|---|---|
| 暖金色 | 青蓝 | Classic cinematic, golden hour |
| 琥珀色 | 深藏蓝 | Evening intimacy |
| 烛光橙 | 冷灰 | Period drama, candlelit tension |
| 冰蓝 | 暗紫 | Cyberpunk night, isolation |
| 月白 | 暖褐 | Moonlit romance |

### Dimension 4 — Atmosphere layer effects (氛围层光效)

The finishing layer that separates professional-feeling output from generic AI video. Add **one or two** at the end of the lighting line:

| Effect | Chinese prompt phrase | Visual result | Best for |
|---|---|---|---|
| Tyndall beams | `空气中丁达尔光束` | Visible light shafts in haze/dust | Forest, temple, dusty interior |
| Floating dust particles | `空气中漂浮尘埃反光` | Sparkling micro-particles in light | Indoor sun beam, intimate scenes |
| Background bokeh | `背景散景光斑` | Out-of-focus light circles | Night city, romantic atmosphere |
| Neon bokeh | `霓虹虚化光斑` | Colored OOF circles from signs | Urban night |
| Edge vignette | `画面边缘暗角` | Darkened corners, center focus | Moody, cinematic framing |
| Film halation | `胶片光晕（halation）` | Warm bloom around highlights | Vintage feel, dreamy |
| Blind stripe shadows | `百叶窗条纹投影` | Horizontal stripe shadows on wall/face | Noir, interrogation, day interior |
| Wall light patterns | `墙面光影纹路` | Patterned shadows from off-screen objects | Architectural, time of day |
| Wet ground reflections | `潮湿地面反光` | Mirrored light on wet surfaces | Rain, night, urban |
| Mist diffusion | `水雾朦胧柔光` | Soft overall diffusion | Bathroom, hot springs, dream |

**Rule: max 2 atmosphere effects per shot.** More than 2 causes visual overload and model confusion.

### Complete four-dimension examples

**Sweet romance — indoor daytime:**
```
灯光：右侧45°暖金色漫射柔光，窗边透入，低对比柔和阴影，空气中细微浮尘，画面轻微琥珀光晕
```

**Suspense — rainy night:**
```
灯光：人物左侧冰蓝色硬侧光，高对比锐利阴影，阴影偏暗调藏蓝，窗外霓虹虚化光斑，潮湿地面反光，画面边缘暗角
```

**Emotional — sunset farewell:**
```
灯光：人物背后琥珀色逆光轮廓光，柔和漫射，阴影带青灰色调，空气中丁达尔光束
```

**Period drama — candlelit:**
```
灯光：右侧烛光橙漫射柔光，低对比，阴影偏冷灰，火光轻微跳动，空气中浮尘反光
```

**Urban thriller — interrogation:**
```
灯光：正上方冷月白硬顶光（搭配左下方微弱暖补光避免纯黑），高对比明暗分割面部，百叶窗条纹投影在墙面
```

### Integration with per-dimension style block

When using the per-dimension form, the `灯光：` line now follows the four-dimension formula:

```
灯光：[方向] [精准光色] [软硬] [光影对比描述]，[氛围层光效1]，[氛围层光效2（可选）]
```

Example integration:
```
风格：电影写实（分辨率写在【规格】，此处不堆砌8K）
摄影：Emmanuel Lubezki × Roger Deakins
灯光：左侧45°暖金色漫射柔光，窗边透入，低对比柔和阴影，阴影偏青蓝，空气中细微浮尘
动态光源：窗外树叶婆娑，斑驳树影在墙面缓慢晃动
调色：60:30:10——暖金60%/浅灰绿30%/琥珀高光10%
...
```

### Lighting detail vs. camera speed (光影细致度 × 运镜速度)

光影描述的详细程度必须匹配运镜速度。写太细的灯光给快速运动镜头，AI 会产生矛盾（光源方向与运动轨迹冲突）；写太粗给固定镜头，画面就会平淡。

| Camera speed | Lighting detail level | Example |
|---|---|---|
| **Fixed / slow push** (固定机位、缓推) | **Maximum detail** — 四维全写，氛围层光效写满2个，可加动态光源 | `右侧45°暖金色漫射柔光，窗边透入，低对比柔和阴影，阴影偏青蓝，空气中细微浮尘，画面轻微琥珀光晕` |
| **Slow pan / tilt** (慢摇、慢俯仰) | **High detail** — 四维全写，氛围层1-2个，光源方向标注"随摇镜缓慢位移" | `左侧45°暖金色柔光（随摇镜方向光影缓慢过渡），阴影偏青灰，背景散景光斑` |
| **Medium tracking** (中速跟拍、横移) | **Medium detail** — 写方向+光色+软硬，氛围层最多1个，省略精确角度 | `侧光暖金色柔光，低对比，背景虚化光斑` |
| **Fast movement** (快速甩镜、奔跑跟拍、追车) | **Minimal** — 只写大致色温方向，不写精确角度和氛围层 | `整体暖金色调，侧光为主` |
| **Whip pan / flash cut** (甩镜、闪切) | **None** — 不写灯光细节，仅靠全局风格块的默认灯光 | （依赖风格块） |

**原理：** 快速运动中光影会随摄影机位移自然变化，过于精确的灯光指令会与运动轨迹产生矛盾，导致画面闪烁或光源跳跃。

### Seedance2 placement priority

In Seedance2 prompts, lighting instructions placed **earlier in the prompt** receive higher weight. Best practice:

1. `灯光：` line goes in the style block / `【规格】` (early in prompt = high weight)
2. Shot-specific lighting details go in `【电影化动态描述】` per-shot sections
3. Atmosphere effects go at the end of lighting descriptions, not scattered in action text
4. `【负面约束】` reinforces lighting bans (禁正面平光、禁无方向光源)

### Light-time matching (光影与场景时间匹配)

光色必须与场景内的时间段一致，否则画面会产生违和感：

| Time of day | Mandatory light color | Forbidden |
|---|---|---|
| 清晨 | 柔和淡金色、浅粉橘 | 禁冰蓝、禁深夜色调 |
| 白天 | 自然白光偏暖、柔和漫射 | 禁霓虹、禁深暗色调 |
| 黄昏 / 金色时段 | 暖金色 + 蓝调天空（撞色） | 禁纯白光 |
| 深夜 | 冷蓝、月白、青灰 | 禁暖金、禁蜜糖色 |
| 室内（不可见外景） | 按光源类型自由选择 | — |

### Shot duration and light stability (镜头时长与光影稳定性)

Seedance2 在长时长镜头中容易出现光影跳动（明暗忽亮忽暗）。实用安全阈值：

| Duration | Light stability | Recommendation |
|---|---|---|
| 1-3 秒 | 稳定 | 自由 |
| 3-5 秒 | 安全 | 最佳平衡区间 |
| 5-10 秒 | 可能跳动 | `【负面约束】` 加光影稳定负面词 |
| 10-15 秒 | 高风险 | 必须加光影负面词 + 降低氛围层复杂度 |

超过 5 秒的镜头，必须在 `【负面约束】` 中追加光影稳定负面词（见下方清单）。

### Lighting negative prompts (光影负面词清单)

固定追加到 `【负面约束】` 中，防止光影崩坏：

**基础（所有项目必加）：**
```
禁曝光过亮、禁死黑阴影、禁面部明暗断层、禁灰蒙蒙无层次
```

**中长镜头追加（≥5秒）：**
```
禁光影闪烁、禁画面忽明忽暗、禁光影跳动
```

**夜景 / 复杂光源追加：**
```
禁杂乱多光源、禁色彩溢出、禁刺眼强光、禁过饱和
```

### Lighting self-check

Before finalizing any prompt, verify:

| Check | Pass? |
|---|---|
| Direction specified? (not just "有光") | |
| Soft/hard declared? | |
| Light color is precise? (not "暖色调") | |
| Atmosphere effects ≤ 2? | |
| Shadow color declared for contrast? | |
| Night scenes have rim/backlight for subject separation? | |
| Close-ups have catchlight? (眼神光) | |
| Close-ups use side light + soft light? (not top or frontal) | |
| Light color matches scene time of day? | |
| Fast-moving shots use minimal lighting detail? | |
| Shots ≥5s include light stability negatives? | |
| Multi-shot series uses consistent color temperature? | |

---

## Dynamic light sources (动态光源)

The lighting rules above define **what lights exist** and **where they are**. This section addresses **light that changes during the shot** — the difference between a correctly lit scene and a scene that feels alive.

Static lighting (even perfectly placed practicals) produces "correct but dead" frames. Dynamic light injects temporal variation — the eye reads it as real because real light is never perfectly constant.

### When to add dynamic light

Add a dynamic light clause when:
- The scene is dark or cold-toned and risks feeling flat or static
- The shot duration is 5+ seconds (enough time for the change to register)
- The scene has no character movement to carry visual interest (static dialogue, waiting, observing)
- The scene needs subtle mood shifts within a single continuous take

Skip when:
- The shot is under 2 seconds (flash establishing, insert)
- The scene already has strong movement (chase, fight, walking)
- Adding light variation would contradict the scene's emotional stillness (deliberate frozen dread)

### Dynamic light catalog

Pick one or two per scene. Do not stack all of them — one subtle dynamic light source is more effective than three competing ones.

| Dynamic light type | Chinese prompt phrase | Best for |
|---|---|---|
| **Vehicle headlights sweep** | `窗外车灯短暂扫过墙面和天花板，人物脸上出现轻微明暗变化，光束划过后恢复原始暗部` | Night interiors, urban scenes, roadside |
| **Flickering candle / fire** | `[蜡烛/壁炉/火盆]火光轻微跳动，人物面部高光区随火焰节奏微微明灭，阴影边缘柔和摆动` | Period pieces, intimate scenes, warmth |
| **Dappled tree shadows** | `窗外树叶婆娑，斑驳树影在墙面和地板上缓慢晃动，光斑随风轻微位移` | Day interiors, peaceful/nostalgic mood |
| **Passing clouds** | `云层缓慢移过太阳，室内自然光在3-5秒内从明亮渐暗再渐亮，人物面部光影随之微调` | Day interiors/exteriors, contemplative |
| **Neon sign flicker** | `远处霓虹灯牌不规则闪烁，[红色/蓝色/绿色]色光在墙面和人物轮廓上间歇性出现又消失` | Urban night, noir, cyberpunk-adjacent |
| **Screen content change** | `屏幕/显示器画面切换，投射在人物面部的光色随屏幕内容从[色A]缓慢变为[色B]` | Tech scenes, late-night work, surveillance |
| **Rotating beacon / emergency light** | `[警灯/信号灯]旋转，[红色/橙色]光束每隔[X]秒扫过空间一次，在墙面和人物身上形成规律性明暗交替` | Emergency, tension, industrial |
| **Blinds / shutter shadow movement** | `百叶窗投射的水平条纹阴影随[风/光角度]在墙面和人物身上缓慢移位，条纹间距和角度微微变化` | Day interiors, noir, interrogation |

### Placement in the prompt

Dynamic light clauses go inside `【电影化动态描述】`, placed after the static lighting setup and before performance micro-beats:

```
...灯光来自窗外城市夜景冷蓝光。⚠️动态光源：窗外车灯短暂扫过墙面，3秒处一道暖黄光束从左向右划过人物背景墙和侧脸，划过后恢复冷蓝暗调。...
```

Rules:
- Specify **timing** — when in the shot the light change happens (`3秒处`, `镜头中段`, `持续全程`)
- Specify **direction** — which direction the light sweeps or changes from (`从左向右`, `从上方`, `从窗户方向`)
- Specify **recovery** — light returns to baseline after the event (`划过后恢复原始暗部`), unless it's a permanent change (clouds blocking sun)
- Dynamic light must come from a **source that exists in the scene** — if there's no window, there are no car headlight sweeps. This rule is consistent with the practicals-only principle.

### Per-dimension form integration

When using the per-dimension style block, add a `动态光源` line:

```
灯光：⚠️严格仅使用场景内实际存在的光源（practicals）...
动态光源：[窗外车灯短暂扫过 / 烛火跳动 / 树影婆娑 / 无]
```

The `无` option is valid — explicitly declaring no dynamic light in scenes where stillness is the point.

## Specs block (always)

Every prompt declares duration and aspect ratio inside `【规格】`:
```
【规格】15秒，21:9，真人实拍电影质感，真实场景光，浅景深，轻微胶片颗粒。
```

For multi-shot prompts (one prompt with internal `【镜头1】【镜头2】【镜头3】` cuts), still 15 seconds total — divide internally per shot duration rules in CAMERA_EMOTION.md.

## Aspect ratio override

If user specifies a different aspect ratio (e.g., 9:16 for shorts, 4:3 for retro), swap `21:9` inside `【规格】`.

## Camera/composition rule (append for wide shots)

For wide shots and any shot using a lens 35mm or wider, append:
```
禁光学畸变——禁桶形畸变、禁枕形畸变、禁鱼眼效果、禁广角变形，画面线条必须笔直，构图平整。
```

## Multi-shot prompt header

When a prompt contains internal cuts (`【镜头1】【镜头2】` etc.), prepend:
```
多机位剪辑（multi-shot）。
```

When a prompt is a continuous one-er, prepend:
```
单镜头（one-shot，无剪辑）。
```
