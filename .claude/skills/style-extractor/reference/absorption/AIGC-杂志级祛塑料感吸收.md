# AIGC 杂志级祛塑料感吸收说明

来源：独立杂志封面 / 美术指导向提示词分享（85mm·f/1.8·定向漫射光·光学微瑕）。

---

## 总判断

| 观点 | 决策 |
|------|------|
| AI 图过干净 = 塑料；高级感来自微小光学瑕疵 | **吸收** → 静帧 Recipe + 与 `video-render-quality` 互通 |
| 写清 85mm / f/1.8 / ISO 200 模拟镜头边缘虚化 | **吸收**入杂志海报框架 |
| 禁大平光；必须规定光源位置与衰减 | **吸收**；与仓库电影管线「禁正面平光」同向 |
| 高级美术指导通用 Prompt + 主题/语境/尺寸 | **吸收**为 `style-extractor` Recipe 3 |
| 飞书水印 `Feishu ｜ AIGC` | 框架内**可选**，客户项目可删或换品牌 |
| 省棚拍预算叙事 | 不进 skill，仅作使用场景说明 |

---

## 落地

| 项 | 路径 |
|----|------|
| 预设配方 | `.claude/skills/style-extractor/reference/preset-styles.md` → **Recipe 3 Magazine Art Director** |
| 视频侧塑料感 | 继续用 `video-render-quality`（动态）；静帧 KV 用 Recipe 3 |
| 电商白底主图 | **不要**默认套 Recipe 3 → `ecommerce-design` |

---

## 触发语

`杂志封面`、`祛塑料感`、`艺术海报`、`85mm`、`美术指导提示词`、时装大片静帧。

---

## 变更记录

| 日期 | 变更 |
|------|------|
| 2026-07-31 | 初版：吸收文档 + Recipe 3 |
