# AI 视频制作工作流

这份文档用于说明本仓库中 3 个视频生产相关 skill 的职责边界、适用时机，以及完成一个视频项目时的标准调用顺序。

## 三个 Skill 分别做什么

### 1. `screenwriter`

对应文件：`.claude/skills/screenwriter-skill/SKILL.md`

这个 skill 用在项目还处于 **故事和剧本阶段** 的时候。

典型使用场景：

- 只有一个概念、题材、logline，想把它发展成故事
- 需要写 synopsis、treatment、beat sheet
- 需要搭角色设定和世界观规则
- 需要写场景、对白，或修改已有剧本
- 需要估算时长，或者对剧本做删减

输入通常是：

- 故事想法
- synopsis 或 treatment
- 角色设定
- 现有剧本片段
- 修改意见

输出通常是：

- screenplay
- treatment
- 角色小传
- 世界观设定
- 修订后的场景和对白

不适合拿它做的事：

- 分镜拆解
- 资产清单整理
- 最终 Seedance 生成 prompt

### 2. `shotlist-builder`

对应文件：`.claude/skills/shotlist-builder/SKILL.md`

这个 skill 用在 screenplay 已经基本稳定，准备进入 **视觉规划和制作拆解阶段** 的时候。

典型使用场景：

- 把剧本拆成 shot list
- 列出角色、场景、道具所需资产
- 确认哪些内容需要先生成参考图
- 把场景转成提示词规划
- 产出最终用于制作的 HTML shotlist

输入通常是：

- 完整剧本或指定场次
- 可选的风格参考或旧 shotlist
- 后续补充上传的人物图、场景图、道具图

输出通常是：

- 资产请求清单
- 场次范围确认
- 多角色场景的空间站位确认
- 生产用 HTML shotlist

不适合拿它做的事：

- 从零开发故事
- 修剧本结构
- 只做一个短镜头的一次性 Seedance prompt

### 3. `seedance-2`

对应文件：`.claude/skills/seedance-2/Seedance-2-Skill.md`

这个 skill 用在你已经明确要生成 **单个场景、单个片段或单条 prompt** 的时候。

典型使用场景：

- 根据一个场景描述直接生成短视频 prompt
- 在 shotlist 已经存在的前提下，细化某一个镜头或某一段动作
- 为某个片段补做替换 prompt
- 在完整 shotlist 之前，快速试生成一个场景

输入通常是：

- 纯文本场景描述
- 可选参考图
- 可选镜头要求和时长要求

输出通常是：

- EN + ZH 的结构化 Seedance JSON prompt

不适合拿它做的事：

- 开发整部剧本
- 规划整部片子的完整镜头结构
- 代替整套 shotlist 生产流程

## 标准调用顺序

如果目标是完成一个完整的叙事视频，标准顺序是：

`screenwriter` -> `shotlist-builder` -> `seedance-2`

原因很简单：每一步都在给下一步交付更干净、更稳定的中间产物。

### 第一步：故事变剧本

先调用 `screenwriter`。

目标：

- 把故事定下来
- 把场次顺序定下来
- 把角色目标和冲突定下来
- 把文本写成可拍的 screenplay

交付给下一步的内容：

- 稳定的 screenplay 或 treatment

### 第二步：剧本变视觉方案

再调用 `shotlist-builder`。

目标：

- 从导演和摄影的角度重读剧本
- 列出要准备的角色、场景、道具资产
- 决定一个场景如何拆成镜头和 prompt 组
- 对多角色场景和关键道具场景确认空间调度

交付给下一步的内容：

- HTML shotlist
- 资产映射关系
- 每场戏的视觉执行方案

### 第三步：视觉方案变生成 Prompt

最后调用 `seedance-2`。

目标：

- 把某个具体镜头、某段动作或某个场景转成 Seedance 真正需要的 prompt
- 细化镜头运动、节奏、语言表达和中英双语输出

最终交付：

- 可直接用于 Seedance 2.0 的 JSON prompt

## 结合当前项目的实际例子

这个仓库里已经有一个项目：`打烊以后`。

相关文件：

- `screenplay/tayang-yihou-screenplay.md`
- `screenplay/tayang-yihou-shot-list.md`

### 如果你从零开始

应该先用 `screenwriter`，把：

- 故事概念
- 人物关系
- 题材方向

逐步发展成：

- `打烊以后` 的完整剧本

### 如果剧本已经存在

那就可以跳过第一阶段，直接进入 `shotlist-builder`。

在这个仓库里，`screenplay/tayang-yihou-screenplay.md` 已经存在，因此当你要做下面这些事时，正确的下一个 skill 是 `shotlist-builder`：

- 把现有剧本转成更正式的制作版 shotlist
- 生成资产清单
- 做 production HTML
- 对夜间玩偶群戏这种多角色场景确认空间站位

### 如果 shot plan 已经存在

那就可以进一步用 `seedance-2` 处理选定场景或镜头段。

在这个仓库里，`screenplay/tayang-yihou-shot-list.md` 也已经存在，因此你在下面这些场景下应该优先用 `seedance-2`：

- 只生成 016 到 020 这些镜头段
- 单独细化第 3 场玩偶苏醒 montage
- 为某个情绪时刻做替换 prompt
- 不改整套 shotlist，只测试另一种镜头语言

## 快速判断规则

当核心问题是下面这些时，用 `screenwriter`：

- 这个故事到底怎么讲？
- 这场戏应该发生什么？
- 对白和结构要怎么改？

当核心问题是下面这些时，用 `shotlist-builder`：

- 这个剧本要怎么拍？
- 需要准备哪些资产？
- 这一场戏怎么拆成制作级镜头？

当核心问题是下面这些时，用 `seedance-2`：

- 这个片段喂给 Seedance 的准确 prompt 是什么？
- 我现在怎么生成这个单独场景或片段？

## 推荐 SOP

### 完整短片流程

1. 用 `screenwriter` 写或修改故事。
2. 锁定 screenplay。
3. 用 `shotlist-builder` 生成资产清单和 shot plan。
4. 生成或上传角色、场景、道具参考图。
5. 对多角色场景确认空间 blocking。
6. 导出最终 HTML shotlist。
7. 对具体场景或 prompt 组使用 `seedance-2` 做最终生成。
8. 后续修改时，只迭代受影响的 shot block，不回滚整套剧本。

### 单个短片段流程

如果你要的不是完整项目，而只是一个短片段：

1. 可以跳过 `screenwriter` 和 `shotlist-builder`。
2. 直接用 `seedance-2` 输入场景描述和参考图。

## 不推荐的做法

- 不要用 `seedance-2` 代替剧本开发。
- 不要在故事还没稳定时就过早进入 `shotlist-builder`，除非你明确是在做原型验证。
- 不要在 blocking 和 shot plan 已经确认后还反复重写剧本，除非故事本身真的变了。
- 不要在已经进入 Seedance 生成阶段时，还让 `screenwriter` 负责逐镜头 prompt 语言。

## 当前仓库最合理的下一步

基于当前项目里已经存在的文件，最实际的路径是：

1. 把 `screenplay/tayang-yihou-screenplay.md` 当作已锁定的剧本基础版本。
2. 用 `shotlist-builder` 去补齐正式 production HTML 和资产收集流程。
3. 再用 `seedance-2` 对选中的场次或镜头组生成最终 prompt。

也就是说，这个仓库当前已经基本过了纯故事开发阶段，最接近的是 **视觉规划 -> prompt 生成** 这两个阶段。
