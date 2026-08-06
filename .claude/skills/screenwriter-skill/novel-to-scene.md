# Novel → Scene（网文视觉化入口）

把小说 / 网文章节转成**可拍场景清单**，再交给 screenwriter 写剧本或 `shotlist-builder` 做镜头表。

来源吸收：[`../docs/absorption/AIGC-漫剧课程吸收.md`](../docs/absorption/AIGC-漫剧课程吸收.md) §3.2。

---

## When to use

Trigger when the user:

- 粘贴或上传小说章节、网文片段、同人文
- 说「改编成漫剧 / 短剧 / 分镜」「哪些能拍」「帮我视觉化」
- 要求「10 分钟内从小说到分镜脚本」类任务

Do **not** skip this and dump raw novel prose into Seedance prompts.

---

## Pipeline position

```
小说章节
  → 本文件（筛选 + 去文学化）
  → 可拍 beat 列表 / 单集切分
  → manga-drama-pacing（若竖屏漫剧）
  → screenplay 场景 或直接 shotlist-builder
```

---

## Phase A — 章节筛选

通读用户提供的文本，输出一张表：

| 段落/节 | 判定 | 理由 |
|---------|------|------|
| … | **拍** | 有冲突动作、空间变化、对白交锋 |
| … | **压缩** | 信息重要但可并入前后镜头（闪回字卡/道具） |
| … | **砍** | 纯心理独白、说明文世界观、重复情绪、无画面推进 |

### 默认砍掉

- 「他觉得 / 她意识到 / 回忆涌上」且无外显动作
- 大段世界观说明（改为后文道具、对白或字幕一句）
- 同一情绪的第三次重复
- 无法被摄影机看到的隐喻散文

### 默认保留或升格为「拍」

- 权力交换、拒绝、背叛、揭露
- 空间进出、门锁、追逃、动手
- 关键道具首次出现或状态变化
- 能立住钩子的第一句对白

---

## Phase B — 去文学化（Novel → Filmable）

对每个「拍」段落，改写成三列：

| 字段 | 要求 |
|------|------|
| **可见** | 谁在哪、做什么、物的状态（动词，无形容词堆砌） |
| **可听** | 对白原文（可压缩）+ 必要音效提示 |
| **空间** | INT/EXT、日夜、关键陈设一件即可 |

❌ 「绝望如潮水淹没她，旧日温柔一一碎裂。」  
✅ 「她松开戒指。戒指落进水槽。水龙头还在滴。」

若用户要漫剧：每个可拍 beat 标注建议钩子位置（开集 / 中段反转 / 集末）。

---

## Phase C — 输出格式（固定）

```markdown
# Novel → Scene report

## Source
- Title / chapter:
- Genre lane (if known):
- Target form: [漫剧竖屏单集 / 微电影场次 / 未定]

## Cut list（砍掉）
- …

## Compress list（并入他处）
- … → 建议并入 beat #

## Shootable beats
### Beat 1 — [一句标题]
- Filmable action:
- Dialogue:
- Location:
- Dramatic function: [钩子 / 递进 / 反转 / 集末钩]
- Est. screen time:

### Beat 2 — …
…

## Suggested episode split（若漫剧）
| Ep | Beats | Hook | Cliffhanger | Est. duration |
|----|-------|------|-------------|----------------|
| 1  | 1–3   | …    | …           | 45s            |

## Next step question（只问一个）
[例如：先写 Ep1 剧本，还是直接进资产锁定？]
```

一次只问一个下一步问题。不要同时输出完整剧本 + 全部分镜。

---

## Handoff rules

| 用户下一步 | 交给 |
|------------|------|
| 写正式场景 / treatment | `screenwriter` + 可选 `manga-drama-pacing.md` |
| 已有可拍剧本、要镜头与 prompt | `shotlist-builder` |
| 先锁人设画风 | `PROJECT_LOCKS.md` + `style-extractor` / `asset-canvas` |

---

## Quality bar

- 每个 Shootable beat 必须能在不读原文的情况下被摄影师执行。
- 「Compress」项必须写明并入哪一 beat，禁止悬空。
- 若原文几乎全是心理戏：明确告诉用户「需要改写成外显冲突」，并给 2–3 个外显化方案之一，不要硬拍空镜堆情绪。
