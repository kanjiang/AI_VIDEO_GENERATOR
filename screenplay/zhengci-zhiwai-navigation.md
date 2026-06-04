# 《证词之外》工作流总导航

这页只做入口索引，不重复正文。需要修改内容时，请回到对应源文件。

## 1. 真源文件

- 工程总说明：project-file-guide.md
- 主剧本：screenplay/zhengci-zhiwai-screenplay.md
- 分镜基准：screenplay/zhengci-zhiwai-shot-list.md
- 生成顺序：screenplay/zhengci-zhiwai-final-generation-list.md
- 参考图绑定：screenplay/zhengci-zhiwai-seedance-reference-map.md

## 2. Prompt 生成链

- 生成脚本：screenplay/build_video_prompts.js
- Storyboard prompt 源：screenplay/zhengci-zhiwai-storyboard-prompts.md
- 12 镜测试包 12 宫格分镜：screenplay/zhengci-zhiwai-test-pack-storyboard-prompts.md
- 第一幕逐镜：screenplay/zhengci-zhiwai-act1-video-prompts-shot-by-shot.md
- 第二幕逐镜：screenplay/zhengci-zhiwai-act2-video-prompts-shot-by-shot.md
- 第三幕逐镜：screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md
- 第一幕压缩版：screenplay/zhengci-zhiwai-act1-video-prompts.md
- 第二幕压缩版：screenplay/zhengci-zhiwai-act2-video-prompts.md
- 第三幕压缩版：screenplay/zhengci-zhiwai-act3-video-prompts.md

## 3. Storyboard 输出

- 生成脚本：screenplay/build_storyboard.js
- 配置文件：screenplay/zhengci-zhiwai-storyboard.config.json
- HTML 浏览页：outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html
- JSON 清单：outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json

## 4. 资产主入口

- 主资产提示词：screenplay/zhengci-zhiwai-asset-prompts.md
- 资产画布：screenplay/zhengci-zhiwai-asset-canvas.html
- 缺图汇总：screenplay/zhengci-zhiwai-missing-assets.md
- 缺图任务看板：screenplay/zhengci-zhiwai-missing-assets-task-board.md
- 下一步执行清单：screenplay/zhengci-zhiwai-next-steps.md

## 5. 缺图补包入口

- Batch A：screenplay/zhengci-zhiwai-asset-batch-supplement-03.md
- Batch B：screenplay/zhengci-zhiwai-asset-batch-supplement-04.md
- Batch C：screenplay/zhengci-zhiwai-asset-batch-supplement-05.md

## 6. 推荐操作顺序

1. 先看 screenplay/zhengci-zhiwai-next-steps.md
2. 需要补图时，看 screenplay/zhengci-zhiwai-missing-assets-task-board.md
3. 补完一批后，运行：
   - node screenplay/build_video_prompts.js
   - node screenplay/build_storyboard.js zhengci-zhiwai
4. 回看 outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html
5. 再看 screenplay/zhengci-zhiwai-asset-canvas.html 的进度是否变化
