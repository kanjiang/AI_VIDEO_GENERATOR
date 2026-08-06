# WorkBuddy AI 视频工作流｜标准化吸收

来源：WorkBuddy AI 视频工作流全文提炼。  
本文是**可复用工作流宪法** + 与本仓库 skill 的映射。不绑定必须安装 WorkBuddy / BibiGPT 等外部软件——原则可复用，工具可替换。

---

## 1. 核心思想（底层逻辑，必须遵守）

1. **定位**：AI = 不会疲惫的**视频副驾**。  
   不负责最终审美、创意、定稿；只承接机械重复、耗精力的流水线活。

2. **摒弃误区**：不追「AI 一键成片」，不堆工具。  
   **最优策略**：找到制作里最卡顿、最耗时的一环，让 AI 先接管这一环，再逐步接流水线。

3. **人机分工**

| 人 | AI |
|----|-----|
| 观点、叙事节奏、审美、最终定稿 | 素材整理、文本拆解、字幕、粗剪方案、二次改编、标准化重复任务 |

与本仓库 Seedance / 漫剧产线一致：**导演权在人，prompt/字幕/质检/衍生在 AI**。

---

## 2. 外部六模块 → 本仓库映射

| WorkBuddy 模块 | 用途 | 本仓库落点 | 是否新建 |
|----------------|------|------------|----------|
| BibiGPT 爆款结构拆解 | 对标视频 → 叙事框架（不问搬镜头） | `benchmark-breakdown` skill | ✅ 新建 |
| video-use 素材管理 | 转写、盘点、标无效段、粗剪方案 | 原则写入本文；执行用剪映+人工确认；口播向可选外部工具 | 不绑安装 |
| chengfeng-videocut | 中文口播精剪 | 同上；与 video-use **二选一**即可 | 不绑安装 |
| HyperFrames 重点动效 | 金句/数据可视化 | `post-production` 文字特效 + `science-explainer` 数据标注；栏目可沉淀模板 | 已有能力复用 |
| narrator-ai-cli | 解说全链路 | `screenwriter` → `bgm-scoring` → `shotlist`/`seedance-2` → `post-production` | 流程组合，不新建 |
| 红鸦一源多发 | 视频文稿 → 图文/分镜/提示词 | `content-repurpose` skill | ✅ 新建 |

### 2.1 其他外部平台（原则映射，不绑安装）

| 平台 | 可复用点 | 本仓库落点 |
|------|----------|------------|
| LibTV / Liblib 节点画布 | 图链锁因果再生成视频；Vlog 创意镜头；五节点/静帧工具 | `VLOG_FX_RECIPES.md`；[AIGC-LibTV工具吸收.md](absorption/AIGC-LibTV工具吸收.md)；可选 GUI https://www.liblib.tv/ |
| LibTV 爆款拉片 | 结构复盘 | `benchmark-breakdown` |
| LibTV 情绪点选 | 微表情写回 prompt | `MICRO_BEATS.md` §8（已有，不绑 UI） |

**工具选择规则**：不求全；按主力内容类型选 1～2 个核心环跑通闭环。

---

## 3. 轻量化标准流水线（可复制）

### 3A 口播 / 知识向（WorkBuddy 原版）

```
1. 对标拆解（benchmark-breakdown）→ 优化提问与信息排布
2. 口播素材整理/精剪（外部 video-use 或 chengfeng，或剪映手工）
3. 重点动效（post-production text-effects / science-explainer）
4. 一源多发（content-repurpose）→ 小红书/公众号/封面文案
```

### 3B Seedance 漫剧 / 短剧（本仓库主线）

```
1. screenwriter + manga-drama-pacing（可选 novel-to-scene）
2. PROJECT_LOCKS → asset-canvas → shotlist-builder / seedance-2
3. 生成后：video-dialogue-punctuation（台词）+ post-production（字幕时序/校对）
4. ai-footage-qa → delivery-checklist
5. 成片后立刻 content-repurpose（剧情 → 小红书/抖音图文，延长生命周期）
```

### 3C 产品宣传片

```
product-video / ecommerce-design（静帧）→ 成片后 content-repurpose
```

### 3D 旅游 Vlog / 创意空镜（可选）

```
VLOG_FX_RECIPES（抛掷生长 / 日夜延时 / FPV / 图钉转场）→ 成片后 content-repurpose
```

---

## 4. 可落地执行清单

- [ ] 先标出当前项目**最耗时卡点**（只优化这一环）
- [ ] 创意 / 审美 / 节奏 **人签字**后再进批量生成
- [ ] 不一次上齐六工具；模块按需接入
- [ ] 视频定稿当日做一源多发，提高投产比
- [ ] 漫剧：分镜定稿后，字幕与台词校对可交给副驾链路；口误/对白错乱用预处理，不定稿权交给 AI

---

## 5. 不吸收

- 「必须安装 WorkBuddy / 某 CLI 才能开工」
- 把最终剪辑审美全权交给 AI
- 与现有电影级 shotlist 抢导演权的「一键成片」话术

---

## 6. 文件索引

| 文件 | 说明 |
|------|------|
| 本文 | 工作流宪法 + 映射 |
| `.claude/skills/benchmark-breakdown/` | 对标结构拆解 |
| `.claude/skills/content-repurpose/` | 一源多发 |
| `.claude/skills/post-production/` | 字幕/动效/成片质检 |
| `shotlist-builder/reference/VLOG_FX_RECIPES.md` | 旅游/Vlog 创意镜头（LibTV 原则配方） |
| `README.md`（本 skills 目录） | 总索引 |

---

## 7. 变更记录

| 日期 | 变更 |
|------|------|
| 2026-08-03 | 迁入 `.claude/skills/docs/`，便于整包分享；增补 LibTV 原则映射 + 3D Vlog 流水线 |
| 2026-07-31 | 初版吸收 + benchmark-breakdown + content-repurpose |
