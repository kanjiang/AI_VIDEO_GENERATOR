# AI_VIDEO_GENERATOR

## Storyboard CLI

项目里现在有一个独立的故事板生成器，用来把当前视频工作流压成一个可浏览的故事板页面：

- 输入：shot list、reference map、逐镜视频 prompt、final generation list
- 输出：HTML 故事板 + JSON 清单
- 目的：把剧本分镜、资产绑定、视频提示词、视频生成和剪辑状态骨架放到一个面板里

### 默认运行

```bash
npm run build:storyboard
```

默认会读取 zhengci-zhiwai。

### 指定项目 slug

```bash
node screenplay/build_storyboard.js zhengci-zhiwai
```

也可以直接透传给 npm script：

```bash
npm run build:storyboard -- zhengci-zhiwai
```

也可以先看帮助：

```bash
node screenplay/build_storyboard.js --help
```

### 输出位置

生成结果会写到：

```text
outputs/projects/<project-slug>/storyboard/
```

其中包括：

- `<project-slug>.storyboard.html`：可直接打开浏览的故事板
- `<project-slug>.storyboard.json`：给后续工具或页面消费的结构化数据

### 当前能力

- 读取 72 镜 shot list 并按场次分组
- 合并 reference map 里的资产绑定
- 读取逐镜 prompt 文件并挂到每个 shot 卡片上
- 检查 assets 目录里是否已有对应图片
- 为视频生成与剪辑保留状态骨架
- 支持按 slug 自动发现逐镜 prompt 文件
- 支持用 slug 级 storyboard 配置兼容旧 alias 漂移

### slug 约定

默认情况下，CLI 会按下面的命名规则读取输入文件：

```text
screenplay/<slug>-shot-list.md
screenplay/<slug>-seedance-reference-map.md
screenplay/<slug>-final-generation-list.md
screenplay/<slug>-*-video-prompts-shot-by-shot.md
```

如果某个项目的文件名或 alias 兼容规则不同，可以增加一个可选配置文件：

```text
screenplay/<slug>-storyboard.config.json
```

当前 zhengci-zhiwai 已经把旧 alias 兼容映射移到了这个配置文件里，后续别的项目也可以按同样方式扩展，而不用继续改 CLI 主脚本。
