# 项目文件说明书

这份文档用于说明当前工程中主要目录和文件各自负责什么，方便快速定位真源、生成脚本、页面入口和产出物。

## 1. 根目录文件

| 路径 | 用途 |
| --- | --- |
| next-env.d.ts | Next.js 自动生成的类型声明桥接文件 |
| next.config.ts | Next.js 工程配置 |
| package.json | Node/Next 项目的依赖、脚本和元信息 |
| README.md | 工程级使用说明，现已补充 storyboard CLI 和 video prompt CLI 入口 |
| tsconfig.json | TypeScript 编译配置 |
| video-production-workflow.md | 项目的视频生产流程说明文档 |
| project-file-guide.md | 当前这份总说明书，用于解释工程内各文件用途 |

## 2. app 目录

| 路径 | 用途 |
| --- | --- |
| app/layout.tsx | Next.js 根布局 |
| app/page.tsx | 应用首页 |
| app/globals.css | 全局样式 |
| app/api/health/ | 健康检查接口目录 |
| app/api/projects/ | 项目相关 API 目录，按 slug 提供资产、prompts、storyboard、tasks 等数据入口 |
| app/projects/ | 前端项目页目录，按 slug 展示单个项目页面 |

### app/api 已知子路径

| 路径 | 用途 |
| --- | --- |
| app/api/health/route.ts | 健康检查接口实现 |
| app/api/projects/[slug]/assets/ | 项目资产相关接口 |
| app/api/projects/[slug]/prompts/ | 项目 prompt 相关接口 |
| app/api/projects/[slug]/storyboard/ | 项目 storyboard 相关接口 |
| app/api/projects/[slug]/tasks/ | 项目任务相关接口 |
| app/api/projects/demo/ | demo 项目接口样例 |
| app/api/projects/import/ | 项目导入相关接口 |

## 3. src 目录

| 路径 | 用途 |
| --- | --- |
| src/components/provider-config-panel.tsx | 提供方配置面板组件 |
| src/components/screenplay-input-workbench.tsx | 剧本输入和工作台界面组件 |
| src/components/task-queue-panel.tsx | 任务队列面板组件 |
| src/server/importers/ | 服务端导入逻辑，如 markdown / project 导入 |
| src/server/prompts/ | 服务端 prompt 组装逻辑 |
| src/server/providers/ | 视频或其他 provider 抽象层 |
| src/server/storage/ | 存储层，如 sqlite 与任务结果存储 |
| src/server/storyboard/ | storyboard 加载与处理逻辑 |
| src/server/tasks/ | 任务队列实现 |

## 4. assets 目录

| 路径 | 用途 |
| --- | --- |
| assets/dayang_yihou/ | 另一个项目的静态资产目录 |
| assets/zhengci-zhiwai/ | 《证词之外》项目的静态资产目录，storyboard、asset canvas、video prompt 均依赖这里的图像文件存在性 |

## 5. outputs 目录

| 路径 | 用途 |
| --- | --- |
| outputs/projects/zhengci-zhiwai/preview/ | 预览类输出目录 |
| outputs/projects/zhengci-zhiwai/shots/ | 分镜或镜头级输出目录 |
| outputs/projects/zhengci-zhiwai/storyboard/ | storyboard 构建结果目录 |
| outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html | 可直接打开浏览的 storyboard 页面 |
| outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json | 结构化 storyboard 数据清单 |

## 6. screenplay 目录总览

screenplay 是当前仓库里最重要的生产资料目录，既包含模板工具，也包含《证词之外》的真源、派生 prompt、补图批次和流程文档。

### 6.1 构建脚本与通用模板

| 路径 | 用途 |
| --- | --- |
| screenplay/build_screenplay.js | 生成或处理剧本文档的脚本 |
| screenplay/build_storyboard.js | 从 shot list、reference map、prompt 等文件生成 storyboard HTML/JSON |
| screenplay/build_video_prompts.js | 从 shot list、generation list、reference map 自动生成 act1/2/3 prompt 与 storyboard prompt 源 |
| screenplay/character-identity-board-prompt-example.md | 角色身份板提示词示例 |
| screenplay/scene-board-prompt-example.md | 场景板提示词示例 |
| screenplay/reference-driven-video-prompt-template.md | 参考图驱动的视频提示词模板 |
| screenplay/file-relationship-map.md | screenplay 目录内部文件关系说明 |
| screenplay/seedance-emotion-micro-skill.md | Seedance 情绪表达微技能备忘 |
| screenplay/seedance-master-one-page-cheatsheet.md | Seedance 一页速查表 |
| screenplay/seedance-master-one-page-cheatsheet-bilingual.md | Seedance 双语速查表 |
| screenplay/seedance-performance-camera-master-skill.md | Seedance 表演与镜头主技能说明 |

### 6.2 《证词之外》核心真源文件

| 路径 | 用途 |
| --- | --- |
| screenplay/zhengci-zhiwai-treatment.md | 项目 treatment / 概念整理 |
| screenplay/zhengci-zhiwai-screenplay.md | 主剧本 Markdown 版本 |
| screenplay/zhengci-zhiwai-storyboard-beats.md | 故事板节拍拆分 |
| screenplay/zhengci-zhiwai-shot-list.md | 当前 72 镜唯一顺序基准 |
| screenplay/zhengci-zhiwai-final-generation-list.md | 12 镜测试包与 72 镜批量生成顺序真源 |
| screenplay/zhengci-zhiwai-seedance-reference-map.md | 每个镜头推荐绑定哪些参考图 alias |
| screenplay/zhengci-zhiwai-storyboard.config.json | storyboard 配置和 fallback alias 映射 |

### 6.3 《证词之外》Prompt 文件

| 路径 | 用途 |
| --- | --- |
| screenplay/zhengci-zhiwai-storyboard-prompts.md | storyboard 页面与 JSON 读取的 prompt 源 |
| screenplay/zhengci-zhiwai-test-pack-storyboard-prompts.md | 12 镜测试包用的 12 宫格电影分镜提示词 |
| screenplay/zhengci-zhiwai-act1-video-prompts-shot-by-shot.md | 第一幕逐镜视频提示词 |
| screenplay/zhengci-zhiwai-act1-video-prompts.md | 第一幕 multi-shot 压缩版提示词 |
| screenplay/zhengci-zhiwai-act2-video-prompts-shot-by-shot.md | 第二幕逐镜视频提示词 |
| screenplay/zhengci-zhiwai-act2-video-prompts.md | 第二幕 multi-shot 压缩版提示词 |
| screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md | 第三幕逐镜视频提示词 |
| screenplay/zhengci-zhiwai-act3-video-prompts.md | 第三幕 multi-shot 压缩版提示词 |
| screenplay/zhengci-zhiwai-test-pack-video-prompts.md | 12 镜测试包视频提示词 |
| screenplay/zhengci-zhiwai-test-pack-storyboard-prompts.md | 12 镜测试包 storyboard 提示词 |

### 6.4 《证词之外》资产与补图文件

| 路径 | 用途 |
| --- | --- |
| screenplay/zhengci-zhiwai-asset-prompts.md | 当前项目主资产提示词总表 |
| screenplay/zhengci-zhiwai-asset-canvas.html | 资产看板，动态探测 assets 目录中哪些图已存在 |
| screenplay/zhengci-zhiwai-asset-batch-01.md | 第一批主资产生成批次 |
| screenplay/zhengci-zhiwai-asset-batch-02.md | 第二批主资产生成批次 |
| screenplay/zhengci-zhiwai-asset-batch-03.md | 第三批主资产生成批次 |
| screenplay/zhengci-zhiwai-asset-batch-supplement-01.md | 第一组补充直投包，偏开场与机制辅助 |
| screenplay/zhengci-zhiwai-asset-batch-supplement-02.md | 第二组补充直投包，偏设备间、露台与终场辅助 |
| screenplay/zhengci-zhiwai-asset-batch-supplement-03.md | Batch A 缺图直投包，聚焦第一幕权限链 |
| screenplay/zhengci-zhiwai-asset-batch-supplement-04.md | Batch B 缺图直投包，聚焦电梯与29楼异常空间 |
| screenplay/zhengci-zhiwai-asset-batch-supplement-05.md | Batch C 缺图直投包，聚焦终场物证与闪回闭环 |

### 6.5 《证词之外》流程与导航文件

| 路径 | 用途 |
| --- | --- |
| screenplay/zhengci-zhiwai-reference-driven-sop.md | 当前推荐执行流程 SOP |
| screenplay/zhengci-zhiwai-missing-assets.md | 当前 storyboard 缺失资产汇总 |
| screenplay/zhengci-zhiwai-missing-assets-task-board.md | 缺图任务看板，按 Batch A/B/C 排序 |
| screenplay/zhengci-zhiwai-next-steps.md | 当前最优先执行清单 |
| screenplay/zhengci-zhiwai-navigation.md | 《证词之外》相关文件单页导航 |
| screenplay/zhengci-zhiwai-scene-board-prompts.md | 场景板相关提示词集合 |
| screenplay/zhengci-zhiwai-identity-board-prompts.md | 角色身份板相关提示词集合 |
| screenplay/zhengci-zhiwai-seedance-test-batch.md | Seedance 测试批次说明 |

## 7. 其他项目与目录

| 路径 | 用途 |
| --- | --- |
| screenplay/打烊之后/ | 另一个项目的 screenplay 资料目录 |

## 8. 推荐阅读顺序

如果你是第一次接手这个工程，建议按下面顺序看：

1. README.md
2. screenplay/zhengci-zhiwai-navigation.md
3. screenplay/zhengci-zhiwai-next-steps.md
4. screenplay/zhengci-zhiwai-missing-assets-task-board.md
5. screenplay/zhengci-zhiwai-shot-list.md
6. outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html
