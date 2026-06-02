# 《证词之外》下一步执行清单

当前状态：

- 72 镜 shot list、storyboard prompt、act1/act2/act3 video-prompts 已同步到同一生成链。
- storyboard 输出已重建，72 / 72 镜都有 prompt。
- asset canvas 已确认覆盖当前 storyboard 缺图 alias。
- 缺图已拆成 Batch A / B / C，并配好对应直投包。

## 现在最该先做的 3 件事

1. 先补 Batch A 图像资产。
   入口：screenplay/zhengci-zhiwai-asset-batch-supplement-03.md
   目标：让 UnknownCallerPhone、Room307Entry、Room307Reverse 先落地，打通第一幕权限链与 307 停摆空间。

2. 补完 Batch A 后立刻回归 storyboard。
   命令：
   - node screenplay/build_video_prompts.js
   - node screenplay/build_storyboard.js zhengci-zhiwai
   检查：outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json

3. 再决定是继续 Batch B，还是先跑 12 镜测试包。
   判断标准：
   - 如果 005、015、017、022、023、031 还因缺图读不清，继续补 Batch A
   - 如果第一幕已顺，再转 Batch B

## 如果继续补图，顺序固定为

1. Batch A：screenplay/zhengci-zhiwai-asset-batch-supplement-03.md
2. Batch B：screenplay/zhengci-zhiwai-asset-batch-supplement-04.md
3. Batch C：screenplay/zhengci-zhiwai-asset-batch-supplement-05.md

## 如果需要总览，优先看这 4 份文件

1. screenplay/zhengci-zhiwai-missing-assets-task-board.md
2. screenplay/zhengci-zhiwai-missing-assets.md
3. outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html
4. screenplay/zhengci-zhiwai-asset-canvas.html
