# 《Kiki, Ready Set Go!》启动吧 Kiki！

**类型：** 3-6 岁学龄前英语启蒙动画  
**形式：** 竖屏 60-90 秒短集，每季 10 集  
**世界观：** 承接 `car-adventure-the-map`（Momo/Kiki/Bruno 的车世界），山谷公路尽头的「英文小镇 English Town」  
**风格：** Pixar 级 3D + Q 版车身，暖色高饱和，表情夸张可读  
**核心方法：** 场景化 + 呼唤应答（call-and-response）+ 视觉记忆锚点

---

## 一句话卖点

> 胆大爱抢话的小摩托车 Kiki 和害羞小车 Momo 每集去英文小镇一个新地方，遇到一个用不出英文的糗事，跟着当地小车学一句话、闹一场笑，最后邀请屏幕前的小朋友一起大声说出来。

## 为什么这样设计

**3-6 岁的语言学习真正管用的不是"教语法"，而是三件事：**

1. **场景绑定** — 词汇必须和一个具体地方 / 一个具体动作 / 一个具体物体绑定，脱离场景的单词表不会被记住。
2. **可跟读的短句** — 3 岁儿童的听觉工作记忆容量约 3-4 个音节。每集只教 **1 个核心句 + 3-5 个高频词**，其他都是重复和变奏。
3. **情绪高峰后的重复** — 大笑之后的重复效率是平淡重复的 3-5 倍。所以每集必须有一个 comedic payoff（Kiki 因为说错话闯的小祸），紧接着才让小朋友跟读。

**为什么用 Kiki 当主角，而不是 Momo？**

- Momo 的害羞、慢热适合"内心戏"，但学英语最忌讳"内心戏"，必须敢开口
- Kiki 的"高声、快、句尾上扬、爱逞强"三大特征天然是"我先说，说错了再改"的语言学习者原型
- Kiki 说错 = 好笑 = 记住；Kiki 说对 = 得意 = 想再说一次
- Momo 保留为"陪跑的害羞小观众"，代表另一半小朋友——她会小声先念一遍，帮 Kiki 纠正，让屏幕前害羞的小朋友也有代入感

## 项目文件

| 文件 | 用途 |
| --- | --- |
| `screenplay/series-bible.md` | 系列 Bible：世界观、角色、集集通用结构、教学方法论 |
| `screenplay/characters.md` | 4 个固定角色小传：Kiki / Momo / Bruno / Rosie + 10 位客串 NPC 花名册 |
| `screenplay/season-01-treatment.md` | 第一季 10 集 treatment：每集地点、目标英文、故事一句话 |
| `screenplay/episode-01-screenplay.md` | Ep 01《加油站》完整双语剧本 |
| `screenplay/episode-01-shot-plan.md` | Ep 01 12 shot rows + 6 段 Seedance 提示词 |
| `screenplay/episode-02-screenplay.md` | Ep 02《洗车房》完整双语剧本 |
| `screenplay/episode-02-shot-plan.md` | Ep 02 12 shot rows + 5 段 Seedance 提示词 |
| `screenplay/identity-board-prompts.md` | 6 个身份板提示词（4 固定 + Pumpy + Bubbles） |
| `screenplay/scene-board-prompts.md` | 3 个场景板提示词（小镇入口 + 加油站 + 洗车房） |

## 已生成资产

**角色层（身份板）：**

| 资产 | 路径 | 用途 |
| --- | --- | --- |
| Kiki 身份板 | `assets/identity-boards/kiki-identity-board.png` | 全季主角 |
| Momo 身份板 | `assets/identity-boards/momo-identity-board.png` | 全季陪跑 |
| Bruno 身份板 | `assets/identity-boards/bruno-identity-board.png` | 全季长辈 |
| Rosie 身份板 | `assets/identity-boards/rosie-identity-board.png` | 全季教学者 |
| Pumpy 身份板 | `assets/identity-boards/pumpy-identity-board.png` | Ep 01 客串 |
| Bubbles 身份板 | `assets/identity-boards/bubbles-identity-board.png` | Ep 02 客串 |

**空间层（场景板）：**

| 资产 | 路径 | 用途 |
| --- | --- | --- |
| 英文小镇入口 | `assets/scenes/ep01-english-town-entrance.png` | 每集开场复用（地面 "GAAS" 小瑕疵可选修） |
| Ep 01 · 加油站 | `assets/scenes/ep01-gas-station.png` | Ep 01 主场景 |
| Ep 02 · 洗车房 | `assets/scenes/ep02-car-wash.png` | Ep 02 主场景 |

**镜头层（故事板 + shot plan）：**

| 资产 | 路径 | 状态 |
| --- | --- | --- |
| Ep 01 · 12 格故事板表 | `assets/storyboards/ep01-storyboard-sheet.png` | ✅（P12 跟读卡"WITH"→"UP"可选修） |
| Ep 01 · shot plan + Seedance 提示词 | `screenplay/episode-01-shot-plan.md` | ✅ 6 段就绪 |
| Ep 02 · 12 格故事板表 | `assets/storyboards/ep02-storyboard-sheet.png` | ✅ |
| Ep 02 · shot plan + Seedance 提示词 | `screenplay/episode-02-shot-plan.md` | ✅ 5 段就绪 |

## 每集资产要求（写给未来集数）

每一集要凑齐以下 3 类才能进入 Seedance 生成：

1. **剧本层**：`episode-NN-screenplay.md`（双语 75s，五拍结构）
2. **角色层**：客串 NPC 身份板 1 张（`<npc-name>-identity-board.png`）
3. **空间层**：主场景板 1 张（`epNN-<location-slug>.png`）
4. **（可选）镜头层**：`episode-NN-shot-plan.md` + `epNN-storyboard-sheet.png`

**Ep 01 进度：** 剧本 ✅ 客串 ✅ 场景 ✅ 分镜 ✅ Seedance ✅（可开生）  
**Ep 02 进度：** 剧本 ✅ 客串 ✅ 场景 ✅ 分镜 ✅ Seedance ✅（可开生）

## 下一步生产流程

按仓库 SOP：`screenwriter` → `shotlist-builder` → `seedance-2`

1. 本目录 = screenwriter 阶段产出（当前已完成 bible + treatment + episode 1）
2. 下一步用 `shotlist-builder` 拆 episode 1 分镜、列资产清单
3. 再用 `seedance-2` 生成每个镜头的最终 prompt

## 世界观关系图

```
car-adventure-the-map (母世界)
    │
    │  Momo + Kiki 沿地图到达阳光山谷 Sunshine Valley
    │
    └── kiki-english-adventure (本项目)
           │
           │  夏天，Kiki 和 Momo 从阳光山谷继续开，
           │  越过一座隧道，来到讲英文的「英文小镇 English Town」
           │
           └── 每集 = 小镇里一个新地点 + 一句新英文
```
