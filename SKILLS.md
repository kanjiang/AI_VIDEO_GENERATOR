# Skills 一览

本项目 `.claude/skills/` 目录下所有 skill 的功能索引，按类别分组。

---

## 一、剧本 & 叙事类

| Skill | 路径 | 用途 |
|-------|------|------|
| **screenwriter-skill** | `.claude/skills/screenwriter-skill/` | 英语编剧技能。写剧本、场景、对话、节拍表、角色发展、预估时长。遵循 McKee/Campbell/Aristotle 方法论，输出好莱坞格式 `.docx` |
| **science-explainer** | `.claude/skills/science-explainer/` | 科普/教育视频叙事设计。处理知识密集型短视频的叙事结构、视觉节奏、概念可视化、信息密度控制 |

---

## 二、分镜 & 视觉开发类

| Skill | 路径 | 用途 |
|-------|------|------|
| **shotlist-builder** | `.claude/skills/shotlist-builder/` | 从剧本生成生产级镜头表（Shotlist）+ Seedance 2.0 中文 prompt，输出 HTML 生产单。4 阶段循环：读剧本 → 列资产 → 等图片 → 生成 |
| **storyboard-table-skill** | `.claude/skills/storyboard-table-skill/` | 生成 12 格分镜页 prompt 或 16:9 角色身份板 prompt，可直接粘贴到图像模型生成单页分镜 |
| **scene-board-skill** | `.claude/skills/scene-board-skill/` | 生成场景板 prompt（环境/灯光/空间连续性），用于锁定场景的空间布局和打光参考 |
| **asset-canvas** | `.claude/skills/asset-canvas/` | 管理视觉资产看板（HTML canvas）：解析 asset-prompts.md → 生成空白看板 → 跟踪已生成/未生成的资产 |

---

## 三、AI 视频 Prompt 生成类

| Skill | 路径 | 用途 |
|-------|------|------|
| **seedance-2** | `.claude/skills/seedance-2/` | Seedance 2.0 通用导演技能。将自然语言场景描述转化为结构化 JSON prompt（支持动作/对话/氛围场景），输出双语 EN+ZH |
| **video-render-quality** | `.claude/skills/video-render-quality/` | 画面质量提升。为 prompt 注入引擎级渲染指令（光追、胶片模拟、材质物理、光学效果），消除"塑料感/CG感" |
| **video-dialogue-punctuation** | `.claude/skills/video-dialogue-punctuation/` | 中文对话润色。通过标点、停顿、气口、打断等手法让 AI 语音念白更自然、更有情绪张力 |
| **style-extractor** | `.claude/skills/style-extractor/` | 从参考图提取视觉风格 DNA（色彩/光线/材质/美术方向），生成可复用的"画风说明书"用于跨场景一致性 |

---

## 四、音频 & 配乐类

| Skill | 路径 | 用途 |
|-------|------|------|
| **bgm-scoring** | `.claude/skills/bgm-scoring/` | BGM/SFX 全流程设计。情绪弧线分析、核心动机设计、逐镜编配、AI 音乐工具 prompt（Suno/Udio/可灵音乐）、ffmpeg 混音脚本 |

---

## 五、后期 & 交付类

| Skill | 路径 | 用途 |
|-------|------|------|
| **post-production** | `.claude/skills/post-production/` | AI 视频后期制作食谱（基于剪映/CapCut）。涵盖文字特效、转场、字幕修正、调色、音效放置、导出设置 |

---

## 六、产品视频类

| Skill | 路径 | 用途 |
|-------|------|------|
| **product-video** | `.claude/skills/product-video/` | 软件产品宣传片制作。双轨工作流：Remotion 代码渲染（UI 演示）+ AI 生成（品牌氛围片）。覆盖镜头选择、节奏设计、页面截图、Remotion 实现 |

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
剧本写作 → 分镜设计 → AI Prompt 生成 → 配乐设计 → 后期剪辑 → 交付
   │            │            │              │           │
screenwriter  shotlist    seedance-2      bgm-scoring  post-production
science-      storyboard  video-render-
explainer     scene-board  quality
              asset-canvas video-dialogue-
                           punctuation
                           style-extractor
```

**共 16 个 skill**，覆盖 AI 视频制作全流程。
