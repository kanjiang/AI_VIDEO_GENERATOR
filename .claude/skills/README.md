# Skills 一览

本目录（`.claude/skills/`）下所有 skill 的功能索引——整包可直接分享；各 skill 子目录也可单独打包，按类别分组。

---

## 一、剧本 & 叙事类

| Skill | 路径 | 用途 |
|-------|------|------|
| **screenwriter-skill** | `.claude/skills/screenwriter-skill/` | 英语编剧技能。写剧本、场景、对话、节拍表、角色发展、预估时长；含网文→可拍场景（`novel-to-scene`）与漫剧完播节奏（`manga-drama-pacing`）。遵循 McKee/Campbell/Aristotle 方法论，输出好莱坞格式 `.docx` |
| **science-explainer** | `.claude/skills/science-explainer/` | 科普/教育视频叙事设计。处理知识密集型短视频的叙事结构、视觉节奏、概念可视化、信息密度控制 |
| **benchmark-breakdown** | `.claude/skills/benchmark-breakdown/` | 对标/爆款视频结构拆解：提炼提问方式、信息排布、收尾逻辑（不抄镜头），输出可迁移结构卡 |

---

## 二、分镜 & 视觉开发类

| Skill | 路径 | 用途 |
|-------|------|------|
| **shotlist-builder** | `.claude/skills/shotlist-builder/` | Shotlist + Seedance；占位/分镜规范/运镜/**视听六维**/构图七技巧/漫剧50镜方/面部三段/导演三步/竖屏/Vlog配方 |
| **storyboard-table-skill** | `.claude/skills/storyboard-table-skill/` | 生成 12 格分镜页 prompt 或 16:9 角色身份板 prompt，可直接粘贴到图像模型生成单页分镜 |
| **scene-board-skill** | `.claude/skills/scene-board-skill/` | 生成场景板 prompt（环境/灯光/空间连续性），用于锁定场景的空间布局和打光参考 |
| **asset-canvas** | `.claude/skills/asset-canvas/` | 管理视觉资产看板（HTML canvas）：解析 asset-prompts.md → 生成空白看板 → 跟踪已生成/未生成的资产 |

---

## 三、AI 视频 Prompt 生成类

| Skill | 路径 | 用途 |
|-------|------|------|
| **seedance-2** | `.claude/skills/seedance-2/` | Seedance 导演技能：自然语言→结构化双语 prompt；含**八维表演公式**、AU/FACS、长对白情绪时间轴（2.5/30s 可用） |
| **video-render-quality** | `.claude/skills/video-render-quality/` | 画面质量提升。为 prompt 注入引擎级渲染指令（光追、胶片模拟、材质物理、光学效果），消除"塑料感/CG感" |
| **video-dialogue-punctuation** | `.claude/skills/video-dialogue-punctuation/` | 中文对话润色。通过标点、停顿、气口、打断等手法让 AI 语音念白更自然、更有情绪张力 |
| **style-extractor** | `.claude/skills/style-extractor/` | 从参考图提取视觉风格 DNA（色彩/光线/材质/美术方向），生成可复用的"画风说明书"；含预置配方 Vox 拼贴、INS/Notion 手账贴纸、杂志级祛塑料感艺术海报等 |

---

## 四、音频 & 配乐类

| Skill | 路径 | 用途 |
|-------|------|------|
| **bgm-scoring** | `.claude/skills/bgm-scoring/` | BGM/SFX 全流程设计。情绪弧线分析、核心动机设计、逐镜编配、AI 音乐工具 prompt（Suno/Udio/可灵音乐）、ffmpeg 混音脚本 |

---

## 五、后期 & 交付类

| Skill | 路径 | 用途 |
|-------|------|------|
| **post-production** | `.claude/skills/post-production/` | AI 视频后期（剪映）：特效/转场/字幕/调色/音效/导出；交付清单；镜头组接；**蓄力静默爆发**情绪弧 |
| **content-repurpose** | `.claude/skills/content-repurpose/` | 一源多发：成片/定稿文稿 → 小红书/抖音图文/分镜/配图提示词，按平台阅读习惯重组 |

---

## 六、产品视频类

| Skill | 路径 | 用途 |
|-------|------|------|
| **product-video** | `.claude/skills/product-video/` | 软件产品宣传片制作。双轨工作流：Remotion 代码渲染（UI 演示）+ AI 生成（品牌氛围片）。覆盖镜头选择、节奏设计、页面截图、Remotion 实现 |
| **ecommerce-design** | `.claude/skills/ecommerce-design/` | AI 电商静帧全案：产品拆解→精修/三视图→主视觉延展→主图→详情页卖点可视化（与宣传片分流） |

---

## 七、工具 & UI 类

| Skill | 路径 | 用途 |
|-------|------|------|
| **dark-studio-ui** | `.claude/skills/dark-studio-ui/` | 构建暗色主题工具页面（毛玻璃风格），用于此 Next.js 项目的内部工具界面开发 |
| **dashiai-ppt** | `.claude/skills/dashiai-ppt/` | 生成 HTML 横向翻页 PPT/演示文稿，支持导出 PPTX / PDF |

---

## 八、元技能

| Skill | 路径 | 用途 |
|-------|------|------|
| **skill-creator** | `.claude/skills/skill-creator/` | 创建新 skill 的指导手册。当需要创建或更新一个 skill 时使用 |

---

## 流水线全景

```
剧本写作 → 分镜设计 → AI Prompt 生成 → 配乐设计 → 后期剪辑 → 交付 → 一源多发
   │            │            │              │           │         │
screenwriter  shotlist    seedance-2      bgm-scoring  post-     content-
benchmark-    storyboard  video-render-                production repurpose
breakdown     scene-board  quality
              asset-canvas video-dialogue-
                           punctuation
                           style-extractor
```

**共 19 个 skill**，覆盖 AI 视频制作、电商静帧、对标拆解与内容复用。

相关文档（均在本 skills 目录内，分享时可一并带走）：

- 流水线说明 → [`docs/video-production-workflow.md`](docs/video-production-workflow.md)
- WorkBuddy 副驾工作流 → [`docs/WorkBuddy-AI视频工作流.md`](docs/WorkBuddy-AI视频工作流.md)
- 漫剧课程吸收（跨 skill）→ [`docs/absorption/AIGC-漫剧课程吸收.md`](docs/absorption/AIGC-漫剧课程吸收.md)
- 电商设计教程吸收 → [`ecommerce-design/reference/absorption/AIGC-电商设计教程吸收.md`](ecommerce-design/reference/absorption/AIGC-电商设计教程吸收.md)
- 杂志级祛塑料感 → [`style-extractor/reference/absorption/AIGC-杂志级祛塑料感吸收.md`](style-extractor/reference/absorption/AIGC-杂志级祛塑料感吸收.md)
- 漫剧固定人物站位 → [`shotlist-builder/reference/absorption/AIGC-漫剧固定人物站位吸收.md`](shotlist-builder/reference/absorption/AIGC-漫剧固定人物站位吸收.md)
- 导演级分镜三步法 → [`shotlist-builder/reference/absorption/AIGC-导演级分镜三步法吸收.md`](shotlist-builder/reference/absorption/AIGC-导演级分镜三步法吸收.md)
- 镜头组接逻辑 → [`post-production/reference/absorption/AIGC-镜头组接逻辑吸收.md`](post-production/reference/absorption/AIGC-镜头组接逻辑吸收.md)（含 [分镜规范.md](shotlist-builder/reference/分镜规范.md)）
- 蓄力静默爆发剪辑 → [`post-production/reference/absorption/AIGC-蓄力静默爆发剪辑吸收.md`](post-production/reference/absorption/AIGC-蓄力静默爆发剪辑吸收.md)
- 面部情绪三段递进 → [`shotlist-builder/reference/absorption/AIGC-面部情绪三段递进吸收.md`](shotlist-builder/reference/absorption/AIGC-面部情绪三段递进吸收.md)
- 导演级运镜术语 → [`shotlist-builder/reference/absorption/AIGC-导演级运镜术语吸收.md`](shotlist-builder/reference/absorption/AIGC-导演级运镜术语吸收.md)（词库 [CAMERA_LEXICON.md](shotlist-builder/reference/CAMERA_LEXICON.md)）
- 微表情提示词库（上篇）→ [`shotlist-builder/reference/absorption/AIGC-微表情提示词库吸收.md`](shotlist-builder/reference/absorption/AIGC-微表情提示词库吸收.md)（[MICRO_EXPRESSION_LIBRARY.md](shotlist-builder/reference/MICRO_EXPRESSION_LIBRARY.md)）
- 漫剧生产素材包（50运镜+50表情）→ [`shotlist-builder/reference/absorption/AIGC-漫剧生产素材包吸收.md`](shotlist-builder/reference/absorption/AIGC-漫剧生产素材包吸收.md)（[MANGA_SHOT_PACK.md](shotlist-builder/reference/MANGA_SHOT_PACK.md)）
- 双人正反打 → [`shotlist-builder/reference/absorption/AIGC-双人正反打吸收.md`](shotlist-builder/reference/absorption/AIGC-双人正反打吸收.md)（[SHOT_REVERSE_SHOT.md](shotlist-builder/reference/SHOT_REVERSE_SHOT.md)）
- 八维表演提示词（长对白/AU）→ [`seedance-2/references/absorption/AIGC-八维表演提示词吸收.md`](seedance-2/references/absorption/AIGC-八维表演提示词吸收.md)（[PERFORMANCE_EIGHT_DIM.md](seedance-2/references/PERFORMANCE_EIGHT_DIM.md) · [AU_FACS.md](seedance-2/references/AU_FACS.md)）
- 电影构图七技巧 → [`shotlist-builder/reference/absorption/AIGC-电影构图七技巧吸收.md`](shotlist-builder/reference/absorption/AIGC-电影构图七技巧吸收.md)（速查 [COMPOSITION_CORE.md](shotlist-builder/reference/COMPOSITION_CORE.md)）
- LibTV 节点工作流（原则）→ [`docs/absorption/AIGC-LibTV工具吸收.md`](docs/absorption/AIGC-LibTV工具吸收.md)（配方 [VLOG_FX_RECIPES.md](shotlist-builder/reference/VLOG_FX_RECIPES.md)）
- 视听语言六维（玩3开场结构）→ [`shotlist-builder/reference/absorption/AIGC-玩具总动员3开场拉片吸收.md`](shotlist-builder/reference/absorption/AIGC-玩具总动员3开场拉片吸收.md)（[VISUAL_LANGUAGE_SIX.md](shotlist-builder/reference/VISUAL_LANGUAGE_SIX.md)）
- 短片场景五技 → [`shotlist-builder/reference/absorption/AIGC-短片场景五技吸收.md`](shotlist-builder/reference/absorption/AIGC-短片场景五技吸收.md)（[SHORTFORM_SCENE_CRAFT.md](shotlist-builder/reference/SHORTFORM_SCENE_CRAFT.md)）
- 子弹时间模板 → [`shotlist-builder/reference/absorption/AIGC-子弹时间模板吸收.md`](shotlist-builder/reference/absorption/AIGC-子弹时间模板吸收.md)（[BULLET_TIME.md](shotlist-builder/reference/BULLET_TIME.md)）

