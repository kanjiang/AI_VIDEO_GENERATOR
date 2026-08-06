# AIGC LibTV 工具吸收说明

> 位置：`.claude/skills/docs/absorption/`（跨 skill）+ 配方在 shotlist-builder

来源：
1. LibTV（演语 / LiblibAI）一站式节点式平台介绍与旅游 Vlog 四玩法演示  
2. LibTV 使用教程（旅游 Vlog 创意玩法）— 五类节点、图/视频工具集、官网入口  

可选外部入口（**非本仓库依赖**）：[https://www.liblib.tv/](https://www.liblib.tv/)

---

## 总判断

| 观点 | 与仓库关系 | 决策 |
|------|------------|------|
| 无限画布 + 图链再视频 | 参考图驱动 / asset-canvas 同向 | **吸收**为通用节点逻辑 |
| 文本/图/视频/音频/脚本五节点 | screenwriter → shotlist → seedance → bgm → post | **映射**流水线，不镜像画布 UI |
| 自动分镜脚本 + 批量转图/视频 | shotlist-builder / storyboard-table | **原则**：人审分镜后再批量；拒无人值守一键成片 |
| 图像工具（扩图/多角度/打光/抠图/标注） | scene-board、构图标注路径 | **吸收**为静帧预处理清单（平台无关） |
| 视频工具（放大/提帧/分镜解析/基础剪） | post-production / delivery | **映射**已有；解析对标用 benchmark |
| 人端 + Agent Skill 双入口 | WorkBuddy 副驾：导演权在人 | **原则吸收**；拒「一句话成片」为默认承诺 |
| 可灵 / Seedance / MJ 等 | 模型可替换 | **不绑**单一平台 |
| Skill Hub 细分场景 | 本仓库已有 skills | **映射**已有，不镜像 LibTV 商城 |
| 四则 Vlog 玩法 | `VLOG_FX_RECIPES.md` | **已落地**；教程版步骤与初版同构，不重复建文件 |
| 提示词优化 / 运镜模板 UI | 平台功能 | **不绑**；改指 CAMERA_LEXICON 等 |
| 爆款拉片复刻 | benchmark-breakdown | **映射**已有 skill |
| OpenClaw 等 Agent 接口 | 外部生态 | **不建**专用 skill |

一句话：要「图锁因果 → 视频只演过渡」和四则创意配方；不要把产线绑死在 LibTV。

---

## 五节点 → 本仓库

| LibTV 节点 | 本仓库 |
|------------|--------|
| 文本 / 脚本 | `screenwriter-skill` · treatment / episode |
| 图片 | asset-canvas · scene-board · storyboard-table · 静帧预处理 |
| 视频 | `seedance-2` · shotlist PROMPT_PATTERNS · VLOG_FX_RECIPES |
| 音频 | `bgm-scoring` · post sound-design |
| 连线打组复用 | 项目内 prompt 块 + VLOG_FX 配方表 |

---

## 落地

| 文件 | 内容 |
|------|------|
| [VLOG_FX_RECIPES.md](../../shotlist-builder/reference/VLOG_FX_RECIPES.md) | 四玩法 + 节点映射 + 静帧工具链 |
| [WorkBuddy-AI视频工作流.md](../WorkBuddy-AI视频工作流.md) | 外部平台映射 |
| shotlist SKILL / README / PROMPT_PATTERNS FPV | 入口 |
| 本文 | 取舍索引 |

---

## 变更记录

| 日期 | 变更 |
|------|------|
| 2026-08-03 | 初版 |
| 2026-08-03 | 合并使用教程：五节点映射、图/视频工具集、官网链接（可选） |
