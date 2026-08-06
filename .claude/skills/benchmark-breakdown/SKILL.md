---
name: benchmark-breakdown
description: Break down reference/viral videos into reusable narrative structure — questions asked, information order, hook/payoff/ending logic — without copying shots. Use when the user provides a competitor video, 对标, 爆款拆解, BibiGPT-style analysis, subtitle+chapters export, or wants to improve topic framing for口播/科普/漫剧选题. Outputs a structure card for screenwriter or content planning.
---

# Benchmark Breakdown（对标结构拆解）

你拆的是**叙事操作系统**，不是镜头清单。禁止输出「第 3 秒推镜头照搬」。

对应 WorkBuddy / BibiGPT 位：参考视频 → 字幕+章节 → 复盘框架。

---

## When to use

- 用户丢对标链接/字幕/章节时间戳
- 说爆款拆解、对标、学结构、优化选题叙事
- 口播、科普、漫剧开篇钩子不够时

Do NOT：逐镜抄袭运镜；那是 `shotlist-builder` / `style-extractor` 的活。

---

## Input

尽量要齐（缺则问一次）：

- 参考视频说明或字幕全文
- 可选：章节划分 / 时长
- 我方内容类型：口播知识 / 漫剧 / 产品 / 其他

---

## Output：结构卡（固定格式）

```markdown
# Benchmark structure card — [标题/对标名]

## 一句话引擎
[这个视频靠什么抓住人：承诺/冲突/反差/提问…]

## 开场钩子（前 3–15s）
- 提问或承诺方式：
- 信息密度：
- 可复用句式（改写，不照抄）：

## 信息排布
| 段 | 时间或顺序 | 功能 | 信息类型 | 可复用逻辑 |
|----|------------|------|----------|------------|
| 1  |            | 钩子 |          |            |
| 2  |            | 展开 |          |            |
| …  |            | 收尾 |          |            |

## 节奏与停顿
- 哪里减速/举例：
- 哪里加速/清单：

## 收尾逻辑
- 回调 / 行动号召 / 悬念：
- 可复用收尾型：

## 明确不抄
- 镜头/B-roll/口头禅/品牌梗：…

## 迁移到我方选题（只给一条改造路线）
- 原结构 → 我方主题「…」的改写大纲（5–8 条 bullet）
```

---

## 规则

1. 提炼：**提问方式、信息排布、收尾逻辑**。  
2. 每条「可复用」必须改写成中性模板，去掉对标特有金句原文（除非用户要引用评论）。  
3. 结束只问一个问题：> 按这张结构卡写口播稿 / 漫剧第一集节拍 / 还是选题标题？

下游：`screenwriter`、`manga-drama-pacing`、`science-explainer`、`content-repurpose`。
