# AI Prompt Adaptation for Product Promo Videos

This reference adapts our cinematic prompt system (Seedance 2.0 / Kling) for **product promotional contexts** — videos where the primary subject is a software product's interface, user experience, or brand story rather than character-driven narrative.

## When to Use AI Track vs Code Track

| Scenario | Use AI Track | Use Code Track |
|----------|-------------|----------------|
| Pixel-perfect UI demo with real screenshots | | x |
| Product in real-world context (desk, café, street) | x | |
| Abstract brand film (light, particles, emotion) | x | |
| Data visualization with exact numbers | | x |
| Lifestyle/aspirational context around the product | x | |
| Step-by-step feature walkthrough | | x |
| "Day in the life" user story | x | |
| Device mockup with camera movement | x (or hybrid) | x |
| Conceptual metaphor (speed, growth, connection) | x | |

## Prompt Structure Adaptation

Product promo prompts follow the same structural order as our cinematic prompts ([PROMPT_PATTERNS.md](../../shotlist-builder/reference/PROMPT_PATTERNS.md)) but with adjusted priorities and vocabulary:

### Handle Declaration

```
@色卡=色卡 — ⚠️色彩参考图，仅作为画面色调、氛围参考，禁将色卡内容渲染为画面元素。
@产品界面=产品界面截图 — 软件界面截图，笔记本屏幕上显示的内容。
@品牌标志=品牌Logo — 品牌标识参考，用于片头片尾。
@使用场景=使用环境参考 — 产品使用的真实环境（办公室/咖啡厅/家中）。
```

Key differences from narrative prompts:
- **Product UI screenshot** replaces character identity reference as the primary handle
- **Brand logo** is a mandatory handle for opening and closing segments
- **Usage scene** replaces location reference — it's where the product is being used, not a dramatic setting
- No character identity boards (unless the video features a user persona)

### Spec Block

```
【规格】15秒，21:9，30fps
```

Same as cinematic. Default 15s per segment, 21:9 for widescreen promos. Vertical (9:16) for social media variants.

### Dynamic Description — Product Promo Vocabulary

The `【电影化动态描述】` section uses product-specific language instead of dramatic narrative:

#### Camera Language for Products

| Cinematic term | Product equivalent | When to use |
|----------------|-------------------|-------------|
| 主角走向... | 笔记本屏幕上显示... | Establishing the product in frame |
| 角色表情变化 | 界面元素响应交互 | Showing product reactivity |
| 对话场景 | 用户操作流程 | Demonstrating a workflow |
| 追逐/打斗 | 数据流动/处理过程 | Showing product performance |
| 情感特写 | 界面细节特写 | Highlighting a specific UI element |
| 环境氛围 | 使用场景氛围 | Setting the lifestyle context |

#### Camera Movements for Products

| Movement | Product use case | Prompt language |
|----------|-----------------|-----------------|
| 缓推 (slow push) | Feature reveal, drawing attention to detail | 镜头缓慢推进至屏幕上的[功能区域]，焦点锁定[关键元素] |
| 环绕 (orbit) | Product hero shot, showcasing device from all angles | 镜头围绕桌面上的笔记本电脑缓慢环绕，屏幕始终可见 |
| 俯拍 (top-down) | Desktop workspace establishing shot | 俯视角度拍摄整洁的工作台面，笔记本电脑居中 |
| 斜角 (Dutch angle) | ⚠️ Avoid for product promos — feels unstable | — |
| 摇镜 (pan) | Showing multiple screens/devices | 镜头从左侧的手机屏幕平摇至右侧的电脑显示器 |
| 特写 (close-up) | UI detail, button hover, text readability | 微距镜头对准屏幕上的[按钮/数据/输入框]，景深极浅 |
| 升降 (crane) | Revealing the full workspace context | 镜头从桌面特写缓慢上升，揭示整个办公环境 |

### Style Block Adaptation

Product promos need a different style vocabulary from cinematic lighting:

```
【风格】
画面风格：现代科技感，干净明亮，高饱和度的品牌色调
光线：柔和的自然光从窗户侧面照入，屏幕自发光是主要光源，
      环境光均匀、无强烈阴影
材质：金属笔记本外壳的细腻磨砂反光、屏幕的高清玻璃质感、
      桌面木纹或大理石肌理
色调：[品牌主色] 60% / [品牌辅色] 30% / [点缀色] 10%
```

Key differences:
- **No contre-jour / practicals-only rule** — product promos need clean, well-lit environments where the UI is clearly readable
- **Screen as light source** — the product screen itself is often the dominant light source, casting a soft glow
- **Brand color dominance** — the 60:30:10 ratio uses brand colors, not cinematic mood palettes
- **Material quality** — emphasize the physical device (aluminum, glass) and desk surface, not skin textures or fabric

### Negative Constraints for Products

```
【负面约束】
⚠️ 禁止屏幕反光遮挡界面内容
⚠️ 禁止屏幕文字模糊不可读
⚠️ 禁止品牌Logo变形或颜色偏差
⚠️ 禁止出现竞品界面或Logo
⚠️ 禁止环境光过暗导致界面细节丢失
⚠️ 禁止出现手指/手部（除非展示触摸交互）
⚠️ 禁止使用荷兰角（斜角）——产品视频需要稳定感
无背景音乐、无配乐、无乐器声
```

## Five Product Promo Shot Templates

### Template 1: Product Hero Shot (产品英雄镜头)

```
@色卡=色卡 — ⚠️色彩参考图，仅作为画面色调、氛围参考，禁将色卡内容渲染为画面元素。
@产品界面=产品界面截图 — 笔记本屏幕显示的产品主界面。
@使用场景=办公环境 — 现代简约办公桌面。

【规格】15秒，21:9，30fps

【电影化动态描述】
浅景深的桌面特写，一台银色MacBook Pro放置在整洁的浅色木质桌面上，
屏幕显示[产品名]的主界面（@产品界面），屏幕内容清晰可读。
镜头从45度侧面角度缓慢推进至正面平视，
笔记本屏幕的自发光在桌面投下柔和的蓝色光晕。
桌面上散落着一杯咖啡、一本合上的笔记本、一支钢笔——
物品摆放自然、不刻意。
窗外柔和的自然光从画面左侧照入，
在笔记本金属外壳上形成细腻的渐变高光。
⚠️ 屏幕内容必须清晰可读，禁止过度反光。

【风格】
现代科技感，干净明亮，柔和自然光，
金属设备的磨砂质感，屏幕玻璃的高清反光
色调：[品牌主色] 60% / 白色与浅灰 30% / [点缀色] 10%

【负面约束】
⚠️ 禁止屏幕反光遮挡界面内容
⚠️ 禁止屏幕文字模糊不可读
⚠️ 禁止出现其他电子设备屏幕
无背景音乐、无配乐、无乐器声
```

### Template 2: Lifestyle Context Shot (生活场景镜头)

```
@色卡=色卡 — ⚠️色彩参考图
@产品界面=产品界面截图
@使用场景=咖啡厅环境

【规格】15秒，21:9，30fps

【电影化动态描述】
阳光明媚的咖啡厅靠窗位置，一位[用户描述]坐在窗边，
面前的笔记本电脑显示[产品名]界面（@产品界面）。
镜头从窗外街景缓推进入咖啡厅，穿过玻璃窗，
最终停在用户肩后的过肩视角——屏幕内容占据画面中心60%。
阳光透过窗户在桌面上投下温暖的光斑，
咖啡杯的蒸气在逆光中隐约可见。
背景中其他顾客虚化但可辨认——
营造忙碌但舒适的工作氛围。
⚠️ 过肩视角——屏幕必须清晰可读，肩膀不遮挡关键界面。

【风格】
温暖的生活感，自然光为主，浅景深，
咖啡厅环境的暖色调与屏幕冷光的对比
```

### Template 3: Close-Up Detail Shot (界面细节特写)

```
@产品界面=功能区域截图

【规格】15秒，21:9，30fps

【电影化动态描述】
极浅景深微距镜头，屏幕上[功能名]区域占据画面80%。
镜头从整体界面的中景缓慢推至[具体按钮/数据/输入框]的特写，
屏幕像素在极近距离下清晰可见。
[描述界面元素的动态：鼠标悬停按钮时的颜色变化/
数据数字实时跳动/输入光标闪烁]。
屏幕玻璃的微反光在镜头推进过程中流动，
营造真实的屏幕观看感。
⚠️⚠️⚠️ 界面文字必须100%可读——这是本镜头的核心目的。

【风格】
极简，暗色背景衬托屏幕发光，
景深仅覆盖屏幕表面——前后全部虚化
```

### Template 4: Multi-Device Shot (多设备展示)

```
@手机界面=手机App截图
@电脑界面=桌面端截图

【规格】15秒，21:9，30fps

【电影化动态描述】
整洁桌面的俯拍视角，画面左侧是打开的笔记本电脑显示[产品名]桌面端，
右下方是一部手机显示[产品名]App——两个界面内容呼应。
镜头从正上方俯视缓慢下降至45度角，
揭示设备之间的空间关系。
[描述跨设备的同步效果：电脑端操作后，
手机端数据实时同步更新]。
两个屏幕的自发光在桌面上交汇，
形成柔和的冷暖色彩交界线。

【风格】
极简科技感，俯视角度的几何构图，
双屏幕自发光作为主光源
```

### Template 5: Abstract Brand Film Shot (抽象品牌片段)

```
@品牌标志=品牌Logo
@色卡=色卡 — ⚠️色彩参考图

【规格】15秒，21:9，30fps

【电影化动态描述】
纯黑背景中，[品牌色]的光粒子缓慢汇聚，
从画面四周向中心流动，形成一个抽象的[品牌概念]形态——
（例如：连接→光线编织成网络；速度→粒子加速形成光尾迹；
智能→粒子自组织成神经网络结构）。
粒子汇聚完成后，形态凝固1秒，
然后轻柔地变形为品牌Logo的轮廓。
Logo周围的光粒子继续缓慢漂浮，
营造活力与精确的双重感受。

【风格】
极简暗调，纯黑背景，品牌色光粒子，
无环境光——所有光线来自粒子本身
高级感、科技感、未来感
```

## Bridging to Code Track

When a segment needs pixel-perfect UI but is surrounded by AI-generated footage:

1. **Render the code-track segment** via Remotion at matching specs (resolution, FPS, aspect ratio)
2. **Design the AI prompt's last frame** to visually match the Remotion segment's first frame (color, camera angle, brightness)
3. **Use a transition** (flash-cut or cross-dissolve) at the boundary in post-production
4. **Color-grade both** to match in post-production using the shared color card

The `【尾帧转场】` section in AI prompts should explicitly note the handoff:

```
【尾帧转场】
⚠️ 本段尾帧需与代码渲染的UI演示段首帧视觉匹配。
尾帧定格：笔记本屏幕正面平视，界面清晰，
与下一段Remotion渲染的UI特写镜头衔接。
过渡方式：闪白过渡（10帧）。
```

## Product Promo vs Cinematic: Key Differences Summary

| Dimension | Cinematic (shotlist-builder) | Product Promo (this skill) |
|-----------|---------------------------|---------------------------|
| Primary subject | Characters, emotions, narrative | Product UI, features, brand |
| Lighting philosophy | Practicals-only, contre-jour | Clean, well-lit, screen as light source |
| Camera emotion | Synced to character psychology | Synced to product energy arc |
| Performance | Micro-beats, muscles, breath | Interface responsiveness, interaction flow |
| Color palette | Mood-driven (warm = safety, cold = tension) | Brand-driven (60:30:10 brand colors) |
| Negative constraints | Identity drift, light spill, prop misplacement | Screen glare, text illegibility, brand distortion |
| Spatial blocking | Character positions, eyelines | Device placement, screen angles, workspace layout |
| Hold budget | Emotional absorption (0.3–0.5s) | Information reading (0.5–2.0s) |
| SFX vocabulary | Environmental, foley, ambient | Cinematic (whoosh, impact, riser, sparkle) |
| BGM | Suppressed in generation, designed in post | Same approach |
