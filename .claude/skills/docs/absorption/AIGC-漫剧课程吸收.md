# AIGC 漫剧课程吸收说明

> 位置：`.claude/skills/docs/absorption/`（随 skills 整包分享，不放仓库根目录）

来源：`AIGC 影视新物种实战营：从 0 到 1 打造爆款 AI 漫剧 / 微电影`（张金慧 / 郑毓媛，2026.05）

本文档记录对该课程的取舍判断，以及**已落到本仓库具体 skill 的改动**。目标：补「漫剧产品化 / 完播 / 交付」，不重复课程里已弱于本仓库的入门光影运镜。

---

## 1. 总判断

| 维度 | 课程强项 | 本仓库现状 | 决策 |
|------|----------|------------|------|
| 制作工艺（光影/运镜/表演/一致性） | 入门公式 | `shotlist-builder` / `video-render-quality` / `style-extractor` 更深 | **不照搬** |
| 漫剧完播节奏 / 题材爽点 | 明确（霸总/玄幻/悬疑） | 缺产品层约束 | **吸收** → `screenwriter` |
| 网文 → 可拍场景入口 | 核心实操 | 入口偏「已有剧本」 | **吸收** → `screenwriter` |
| 角色/场景/节奏锁定 | 「智能体」产品表述 | 资产已有，缺固定锁定卡 | **吸收** → `shotlist-builder` + `asset-canvas` |
| 上线交付 QA | 30–60s、要素齐全清单 | 有 AI 素材质检，缺上线交付表 | **吸收** → `post-production` |
| 商业路径 / OPC | 平台分账、接单 | 非制作核心 | **仅记原则**，不建 skill |

一句话：课程教「快速做出可发可变现的 AI 漫剧」；本仓库建「可控的电影级 AI 视频」。补产品层，不降级工艺层。

---

## 2. 不吸收清单

- 「一人即好莱坞」极简工具栈（豆包/DeepSeek 通用模板）— 本仓库链路更专
- 伦勃朗光 / 赛博霓虹 / 丁达尔等光影公式照搬 — 已有 `STYLE_BLOCK` + `video-render-quality`
- 推拉摇移入门表 — 已有 `CAMERA_EMOTION.md`
- 「一键生成成片」承诺 — 与分阶段可控生产冲突
- OPC 一人公司注册流程 — 与制作无关

---

## 3. 已落地到 skill（文件映射）

### 3.1 漫剧完播节奏 / 题材爽点

| 项 | 路径 |
|----|------|
| 参考文档 | `.claude/skills/screenwriter-skill/manga-drama-pacing.md` |
| 入口 | `screenwriter`：`SKILL.md` REQUIRED READING + `workflow.md` 新章节 |
| 触发 | 用户说漫剧、短剧、竖屏、完播、霸总/玄幻/悬疑、钩子密度 |

**吸收要点**

- 前 3 秒视觉/冲突钩子
- 每 8–15 秒信息增量或小反转
- 题材模板：霸总 / 玄幻 / 悬疑
- treatment 阶段可选填：目标平台、竖/横屏、单集时长、钩子类型

### 3.2 网文 → 可拍场景

| 项 | 路径 |
|----|------|
| 参考文档 | `.claude/skills/screenwriter-skill/novel-to-scene.md` |
| 入口 | `screenwriter`：`SKILL.md` + `workflow.md` |
| 下游 | 产出可拍 beat 后交给 `shotlist-builder` |

**吸收要点**

- 章节筛选：拍什么 / 砍什么（旁白、心理独白、流水账）
- 小说描写 → 可见可听的动作、对话、空间
- 输出：可拍场景列表 + 砍掉清单 + 建议单集切分

### 3.3 项目锁定卡（角色 / 场景 / 节奏）

| 项 | 路径 |
|----|------|
| 参考文档 | `.claude/skills/shotlist-builder/reference/PROJECT_LOCKS.md` |
| 竖屏规则 | `.claude/skills/shotlist-builder/reference/VERTICAL_SHORT.md` |
| 入口 | `shotlist-builder` Phase 1/2；`asset-canvas` 完整性检查引用锁定卡 |
| 项目产物建议 | `screenplay/character-lock.md`、`scene-lock.md`、`pacing-lock.md` |

**吸收要点（对应课程「角色/场景/分镜智能体」）**

- Character lock：人设、服饰、表情系统、禁止漂移项
- Scene lock：色调、主光、风格块、空间锚点
- Pacing lock：单集时长、钩子秒数、情绪弧、竖/横屏

### 3.4 上线交付 QA

| 项 | 路径 |
|----|------|
| 参考文档 | `.claude/skills/post-production/reference/delivery-checklist.md` |
| 入口 | `post-production`：`SKILL.md` Reference files |
| 与现有关系 | 生成后先跑 `ai-footage-qa.md`（越轴/跳切/音效），上线前再跑 delivery checklist |

**吸收要点**

- 竖屏漫剧：30–60s（可按项目放宽到单集约定）
- 要素：字幕 / 对白 / SFX / BGM
- 画质：无崩脸、无穿帮、平台导出预设
- 合规与可发布勾选

### 3.5 商业原则（不落独立 skill）

在 `manga-drama-pacing.md` 末尾保留简表即可：

- 平台分账（红果 / 番茄 / 抖音等）
- 广告 / 定制 / IP 授权 / 企业订单
- treatment 可选字段：目标平台 + 变现意图

---

## 4. 流水线插入位置

```
网文/创意
   │  novelist-to-scene（screenwriter）
   ▼
剧本 / treatment（screenwriter + manga-drama-pacing）
   │
   ▼
PROJECT LOCKS：character / scene / pacing
   │  shotlist-builder Phase 1–2 + asset-canvas
   ▼
资产生成 → shotlist / Seedance prompts
   │
   ▼
BGM（bgm-scoring）→ 后期（post-production）
   │
   ▼
ai-footage-qa → delivery-checklist → 发布
```

---

## 5. 维护约定

- 课程营销话术、OPC、通用聊天模板：**不进 skill**。
- 新增漫剧相关规则：优先改上述四个文件，再改对应 `SKILL.md` 入口。
- 若某项目明确是「院线微电影 / 横屏长片」，`VERTICAL_SHORT` 与 30–60s 交付标准**默认关闭**，以 `pacing-lock.md` 为准。

---

## 6. 变更记录

| 日期 | 变更 |
|------|------|
| 2026-08-02 | 迁入 `.claude/skills/docs/absorption/`，随 skills 整包分享 |
| 2026-07-30 | 初版：吸收文档 + 四个 skill 落地文件 |
| 2026-07-31 | 另线：VibePaper INS/Notion 手账拼贴并入 `style-extractor/reference/preset-styles.md` Recipe 2（非漫剧课程，宣发/Vlog 物料） |
