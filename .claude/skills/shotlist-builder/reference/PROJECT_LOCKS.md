# Project Locks（角色 / 场景 / 节奏锁定卡）

对应课程「角色智能体 / 场景智能体 / 分镜智能体」的产品表述。本仓库不用聊天机器人套壳，而用**项目级锁定文件**防止跨镜漂移。

来源吸收：[`../../docs/absorption/AIGC-漫剧课程吸收.md`](../../docs/absorption/AIGC-漫剧课程吸收.md) §3.3。

---

## When to create

在 `shotlist-builder` Phase 1 读完剧本后、Phase 2 大规模要资产前，若项目满足任一条件则创建锁定卡：

- ≥ 3 个视频 prompt / 多场戏
- 用户明确要求漫剧连载或角色一致性
- 已有 `characters.md` / `asset-prompts.md` 但尚未有 lock 文件

单场试验片可跳过，但一旦进入多集必须补齐。

建议路径（每个项目）：

```
<project>/screenplay/character-lock.md
<project>/screenplay/scene-lock.md
<project>/screenplay/pacing-lock.md
```

---

## 1. Character lock

固定：人设要点、服饰、发型、疤痕/配饰、表情系统、禁止项。

```markdown
# Character lock — [项目名]

## [角色中文名] / [English]
- Identity one-liner:
- Age appearance / body:
- Hair / face marks:
- Default costume (full-body):
- Alternate costumes: [场景条件 → 服装]
- Expression system: [克制 / 爆发时的肌肉与眼神规则]
- Voice / speech texture: [可选，对接 video-dialogue-punctuation]
- Must match assets: [文件名列表]
- Drift bans: 禁换发色、禁换瞳色、禁半身参考替代全身、禁……

## [角色] — 双形态（若适用：人/鬼、正装/便装、人格 A/B）
- 形态 A 挂载名 / 可变项 / 不变项（骨相）：
- 形态 B 挂载名 / 相对 A 的差异：
- 切换触发：
- 详见 [SHORTFORM_SCENE_CRAFT.md](SHORTFORM_SCENE_CRAFT.md) §4
```

规则：

- 全身参考强制（与 shotlist-builder 一致）。
- 锁文件优先级高于临时口头改戏；要改外观先改 lock，再改资产。
- **双形态必须两套身份板分挂**，禁止单图靠提示词「变成鬼」。
---

## 2. Scene lock

固定：主场景的色调、主光、风格块引用、空间锚点。

```markdown
# Scene lock — [项目名]

## Global
- Aspect: [9:16 / 21:9 / 16:9]
- Style source: [STYLE_BLOCK 变体 / style-extractor 说明书路径]
- Color card asset: [filename]

## Location — [地点名]
- Time of day / weather:
- Key practical lights: [窗 / 灯笼 / 屏幕…]
- **Light state machine（可选）：** 礼貌上门=暖黄 → 不安=偏冷/频闪 → 异态=骤暗；见 [SHORTFORM_SCENE_CRAFT.md](SHORTFORM_SCENE_CRAFT.md) §5
- Spatial anchors: [门在画左、长桌轴向…]
- Palette notes:
- Atmosphere bans: 禁霓虹乱入、禁……
- Matching assets: [location png 列表]
```

规则：

- 环境须能随剧情改光/物状态，禁止全程静态贴图背景。
- 光影以场景实用光为准（仓库默认 practicals-only）；不要在 lock 里塞「伦勃朗光」口号除非用户明确要求该美学且写入 style pack。
- 与 `asset-canvas`：地点资产未标注空间锚点前，不进入 shotlist Phase 3。

---

## 3. Pacing lock

固定：单集/场次时长、钩子位置、情绪弧、竖横屏。

```markdown
# Pacing lock — [项目名]

- Form: [漫剧竖屏 / 微电影横屏 / 其他]
- Unit length: [e.g. 45–60s per episode / per prompt 15s]
- Hook window: [0–3s 必须出现 …]
- Mid beat cadence: [每 8–15s …]
- Cliffhanger: [required / optional]
- Genre lane: [霸总 / 玄幻 / 悬疑 / …]
- Emotion arc (one line):
- Reference: manga-drama-pacing.md [on / off]
- Vertical rules: VERTICAL_SHORT.md [on / off]
```

规则：

- 写 prompt 时对照本文件检查开集是否有钩子、集末是否留钩。
- 院线项目：`manga-drama-pacing` 与 `VERTICAL_SHORT` 设为 off。

---

## Phase integration

| Phase | 动作 |
|-------|------|
| shotlist Phase 1 | 若缺 lock，起草三份草稿给用户确认 |
| shotlist Phase 2 | 资产列表必须能映射到 character/scene lock |
| asset-canvas | 完整性检查时对照 lock：缺全身角、缺空间锚点 → missing |
| prompt 写作 | 每个 prompt 的角色/场景描述不得与 lock 冲突 |
| 改戏 | 先更新 lock，再改 HTML prompt |

---

## Minimal one-pager（极简合并版）

小项目可将三卡合并为 `screenplay/project-lock.md`，但三个标题章节必须齐全：`## Characters` / `## Scenes` / `## Pacing`。
