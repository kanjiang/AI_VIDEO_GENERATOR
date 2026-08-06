---
name: content-repurpose
description: One-source multi-platform repurposing — turn a finished video script, screenplay, or口播稿 into Xiaohongshu/Douyin/WeChat image-text posts, image storyboards, and optional image prompts. Use when the user says 一源多发, 红鸦, 衍生图文, 视频转图文, 小红书文案, 复用成片文稿, or wants to extend a video's lifecycle after publish. Not a simple copy-paste; re-organize for reading platforms.
---

# Content Repurpose（一源多发）

一条视频 ≠ 只用一次。把**已定稿**的口播/剧情文稿，按图文平台阅读习惯重写，不是搬运字幕。

对应 WorkBuddy「红鸦 Skill」位。

---

## When to use

- 成片或脚本已定，要小红书 / 抖音图文 / 公众号 / 封面文案
- 「衍生图文」「一源多发」「延长生命周期」
- 漫剧集剧本 → 剧情向图文种草

Do NOT：尚未定稿的草稿当成品发；先让人定稿。  
纯电商主图详情 → `ecommerce-design`。

---

## Input

- 成片文稿 / 分场剧本 / 口播逐字稿（任给一种）
- 目标平台（可多选）
- 可选：时长、核心钩子、禁止剧透范围（漫剧）

---

## Pipeline

```
定稿文稿
  → 抽「原子信息」（钩子/要点/情绪/CTA）
  → 按平台重组
  → 输出：图文稿 +（可选）图文分镜 +（可选）配图提示词
```

---

## 平台重组要点

| 平台 | 结构习惯 | 禁忌 |
|------|----------|------|
| 小红书 | 标题情绪钩子 + 分段短句 + emoji 克制 + 标签 | 长段落、剧透无预警 |
| 抖音图文 | 更短、强第一屏、列表感 | 小说腔 |
| 公众号 | 小标题 + 论证段落 + 结尾总结 | 纯字幕粘贴 |
| 封面/标题党备选 | 3 个标题 A/B/C | 违规夸张 |

---

## Output 模板

```markdown
# Repurpose pack — [作品名]

## Source
- 类型：口播 / 漫剧 / 产品
- 核心一句话：

## 原子信息
- 钩子：
- 要点 1…n：
- 情绪：
- CTA：

## 小红书
- 标题：
- 正文：
- 标签：

## 抖音图文（若需要）
- 标题：
- 分页文案（每页≤1句）：

## 图文分镜（可选，6–9 格）
| 页 | 画面说明 | 文案 |
|----|----------|------|
| 1  |          |      |

## 配图提示词（可选）
- 风格锁定：[引用 style-extractor / 项目 lock]
- 逐页 prompt：…

## 漫剧防剧透
- 本包公开到：[集数/情节点]
- 隐藏：…
```

---

## 与漫剧产线衔接

1. `delivery-checklist` 通过后立刻跑本 skill。  
2. 对白可先经 `video-dialogue-punctuation` 再提炼金句。  
3. 配图若要电影感，用项目 `STYLE_BLOCK` / character-lock，勿另起画风。

---

## 规则

1. 重写表达，保留事实与观点；删口头禅与时间戳。  
2. 一次输出不超过用户点名的平台；未点名默认小红书 + 3 个标题备选。  
3. 结束问一句：> 要配图提示词，还是只要文案？
