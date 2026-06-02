# screenplay 目录说明

这个目录是当前仓库的生产资料中枢。和运行时代码相比，这里更接近“项目内容系统”：剧本、分镜、参考图绑定、资产提示词、视频 prompt、补图批次、流程 SOP 和生成脚本都集中在这里。

## 1. 先看哪几类文件

如果你的目标是理解《证词之外》当前状态，建议按下面顺序看：

1. zhengci-zhiwai-navigation.md
2. zhengci-zhiwai-next-steps.md
3. zhengci-zhiwai-shot-list.md
4. zhengci-zhiwai-final-generation-list.md
5. zhengci-zhiwai-seedance-reference-map.md

这 5 份文件分别回答：

- 当前入口在哪里
- 现在最该做什么
- 72 镜顺序是什么
- 生成优先级怎么排
- 每个镜头该绑定哪些参考图

## 2. 这条链里哪些是真源，哪些是派生物

### 真源

- zhengci-zhiwai-screenplay.md
- zhengci-zhiwai-shot-list.md
- zhengci-zhiwai-final-generation-list.md
- zhengci-zhiwai-seedance-reference-map.md
- zhengci-zhiwai-asset-prompts.md

这些文件描述的是“应该拍什么、先拍什么、用什么图、该补什么资产”。如果剧情或镜头结构变了，优先改这里。

### 派生物

- zhengci-zhiwai-storyboard-prompts.md
- zhengci-zhiwai-act1-video-prompts-shot-by-shot.md
- zhengci-zhiwai-act1-video-prompts.md
- zhengci-zhiwai-act2-video-prompts-shot-by-shot.md
- zhengci-zhiwai-act2-video-prompts.md
- zhengci-zhiwai-act3-video-prompts-shot-by-shot.md
- zhengci-zhiwai-act3-video-prompts.md

这些文件现在都可以通过 build_video_prompts.js 从真源重生成，不应该再长期手工维护。

### 执行辅助文件

- zhengci-zhiwai-asset-canvas.html
- zhengci-zhiwai-missing-assets.md
- zhengci-zhiwai-missing-assets-task-board.md
- zhengci-zhiwai-asset-batch-supplement-03.md
- zhengci-zhiwai-asset-batch-supplement-04.md
- zhengci-zhiwai-asset-batch-supplement-05.md
- zhengci-zhiwai-reference-driven-sop.md

这些文件不是剧情真源，而是为了让你更快执行、补图、回归和排优先级。

## 3. 当前最重要的 4 个脚本 / 配置

### build_video_prompts.js

作用：

- 读取 shot list、generation list、reference map
- 重写三幕逐镜 prompt
- 重写三幕 multi-shot prompt
- 重写 storyboard prompt 源

什么时候跑：

- shot list 改了
- generation list 改了
- reference map 改了
- 需要把 prompt 文档重新对齐到当前基准时

### build_storyboard.js

作用：

- 读取 shot list、reference map、storyboard prompt 源
- 检查资产文件是否存在
- 输出 storyboard HTML 和 JSON

什么时候跑：

- prompt 重生成以后
- 补图以后
- 想看当前整片状态时

### zhengci-zhiwai-storyboard.config.json

作用：

- 决定 storyboard 读取哪份 prompt 文件
- 保存 fallback alias 映射

当前关键点：

- 现在 storyboard 页面吃的是 zhengci-zhiwai-storyboard-prompts.md

### zhengci-zhiwai-final-generation-list.md

作用：

- 决定 12 镜测试包顺序
- 决定全片 72 镜的执行顺序和目标
- 是补图优先级和测试顺序的上层依据

## 4. 补图相关文件怎么分工

如果你只想知道“现在还缺什么图”，看：

- zhengci-zhiwai-missing-assets.md

如果你想知道“缺图应该先补哪一批”，看：

- zhengci-zhiwai-missing-assets-task-board.md

如果你想直接拿去补某一批图，分别看：

- zhengci-zhiwai-asset-batch-supplement-03.md
- zhengci-zhiwai-asset-batch-supplement-04.md
- zhengci-zhiwai-asset-batch-supplement-05.md

如果你想看当前所有资产节点和文件存在状态，开：

- zhengci-zhiwai-asset-canvas.html

## 5. 当前最稳的工作节奏

1. 修改真源文件
2. 运行 build_video_prompts.js
3. 运行 build_storyboard.js zhengci-zhiwai
4. 打开 storyboard.html 看镜头卡片
5. 对照 asset-canvas.html 看资产进度
6. 如果缺图，再回到 Batch A/B/C 补包

## 6. 不建议再怎么做

- 不建议只改 act1/act2/act3 prompt 而不重跑生成脚本
- 不建议只盯 storyboard HTML，不看 shot list / generation list
- 不建议随机补图，应该按 missing-assets-task-board.md 的 Batch A/B/C 顺序补
- 不建议把旧 alias 当真源继续沿用，当前 canonical 以 reference map 为准
