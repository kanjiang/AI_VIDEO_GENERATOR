# 《证词之外》参考图驱动生成 SOP

这份文档现在只承担一个角色：把《证词之外》当前仍在使用的真源文件、执行顺序和排障方法压成一页可操作摘要。

重要边界：

1. 这不是程序配置文件，不会被脚本直接读取。
2. 这也不是剧情真源，剧情、镜号、生成顺序和图参绑定仍以真源文件为准。
3. 当这份 SOP 与真源冲突时，永远以真源优先。

当前工作流已经更新为：

`三视图角色参考板 -> 场景锚点图 -> 12 宫格电影分镜 -> 视频生成`

目标很明确：把角色、空间、镜头节奏这些静态约束先锁住，再让视频阶段只负责“动起来”，而不是重新猜设定。

## 一、当前真源文件锚点

### 文本与结构真源

1. `screenplay/zhengci-zhiwai-screenplay.md`：主剧本
2. `screenplay/zhengci-zhiwai-storyboard-beats.md`：分镜节拍
3. `screenplay/zhengci-zhiwai-shot-list.md`：72 镜唯一顺序基准
4. `screenplay/zhengci-zhiwai-final-generation-list.md`：当前生成顺序与测试包真源
5. `screenplay/zhengci-zhiwai-seedance-reference-map.md`：逐镜参考图 alias 绑定

### Prompt 与生成真源

1. `screenplay/build_video_prompts.js`：同步生成 act video prompts 与 storyboard prompt 的脚本
2. `screenplay/zhengci-zhiwai-storyboard-prompts.md`：storyboard 页面与 JSON 使用的 prompt 源
3. `screenplay/zhengci-zhiwai-test-pack-storyboard-prompts.md`：12 镜测试包用的 12 宫格电影分镜提示词
4. `screenplay/reference-driven-video-prompt-template.md`：参考图驱动视频提示词模板
5. `screenplay/zhengci-zhiwai-storyboard.config.json`：storyboard 配置与 fallback alias 映射

### 资产与追踪真源

1. `screenplay/zhengci-zhiwai-asset-prompts.md`：主资产生成提示词
2. `screenplay/zhengci-zhiwai-asset-canvas.html`：资产看板与进度追踪
3. `screenplay/zhengci-zhiwai-missing-assets.md`：当前 storyboard 缺图汇总
4. `screenplay/zhengci-zhiwai-missing-assets-task-board.md`：缺图批次看板
5. `screenplay/zhengci-zhiwai-asset-batch-supplement-03.md`：Batch A 直投包
6. `screenplay/zhengci-zhiwai-asset-batch-supplement-04.md`：Batch B 直投包
7. `screenplay/zhengci-zhiwai-asset-batch-supplement-05.md`：Batch C 直投包

### 输出与回归入口

1. `outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html`：当前故事板浏览页
2. `outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json`：当前故事板结构化输出
3. `screenplay/zhengci-zhiwai-navigation.md`：项目导航页
4. `screenplay/zhengci-zhiwai-next-steps.md`：当前最优先执行清单

## 二、当前有效的低抽卡逻辑

《证词之外》真正容易抽卡失控的，不是单个好看镜头，而是四件事：

1. 林深的伪装是否稳定成立
2. 周妍和林晚的状态是否跨镜一致
3. 307、电梯、设备间、露台这些空间是否保持连续
4. 关键道具与结构点是否在剧情节点上稳定回收

因此当前项目的执行顺序不应该是“先写长视频提示词再反复抽”。

当前正确顺序是：

1. 先锁主角色的三视图角色参考板
2. 再锁核心场景锚点图
3. 再把关键测试镜头写成 12 宫格电影分镜页
4. 最后才进入视频生成与测试包回归

## 三、第一层：三视图角色参考板

当前项目的人物资产已经不再默认走“角色身份板”口径，而是三视图角色参考板。

当前角色锚点优先级：

1. `LinShen`：林深，必须同时稳定“温和可靠外壳”和“冷静控制欲内层”
2. `ZhouYan`：周妍，必须稳定“冷静、审慎、带一点酷感、能主动判断”
3. `LinWanConfined`：林晚，必须稳定“活着、被控制、疲惫但清醒”
4. `SecurityGuardShadow`：匿名执行者，只需匿名轮廓压迫，不需人格细化

当前主入口：

1. `screenplay/zhengci-zhiwai-asset-prompts.md`
2. `screenplay/zhengci-zhiwai-asset-batch-01.md`
3. `screenplay/zhengci-zhiwai-asset-batch-03.md`
4. `screenplay/zhengci-zhiwai-asset-canvas.html`

执行要求：

1. 统一使用 16:9 三视图角色参考板
2. 一张图里清晰分开正面、侧面、背面三视图
3. 纯白或柔和米白背景，不带环境、无关道具、水印和海报排版
4. 三视图等比例、不重叠、不裁切、不遮挡四肢
5. 三视图统一采用中性站姿，优先锁脸型、发型、身体比例、肩线和服装轮廓
6. 如果角色状态特殊，例如林晚的受控疲惫状态，只允许体态和神情变化，不改写身份和服装逻辑

## 四、第二层：场景锚点图

当前最关键的不是补 72 个镜头的所有背景，而是先锁那些一旦漂移就会让剧情失效的空间。

当前优先空间：

1. 书房：`StudyRoomWide` + `StudyDeskWide` + `StudyScreenWaveform`
2. 307 房间：`Room307Entry` + `Room307Reverse`
3. 电梯与 29 楼：`ElevatorCabin` + `ElevatorPanel29` + `Floor29Wide`
4. 设备间：`DeviceRoomDoorCrack` + `DeviceRoomWide` + `DeviceScreenFiles`
5. 露台：`TerraceWide` + `WhitePhoneCall` + `RailingJointClose`
6. 地面终场：`RecorderPenClose` + `GroundShoesClose`

当前主入口：

1. `screenplay/zhengci-zhiwai-asset-prompts.md`
2. `screenplay/scene-board-prompt-example.md`
3. `.claude/skills/scene-board-skill/SKILL.md`

执行要求：

1. 书房必须先成立为普通夜间加班空间，不能提前剧透幕后黑产
2. 307 必须有“生活被中断”的停摆感，而不是普通出租屋
3. 电梯与 29 楼必须连成同一条空间链路，不能拍成两个系统
4. 设备间必须像真实长期运行的人声采样机房，而不是赛博实验室
5. 露台必须把退路、护栏外侧白色手机和围栏薄弱点讲清，否则 053-063 会频繁穿帮

## 五、第三层：12 宫格电影分镜

这一层现在也已经升级，不再只是“单帧故事板提示”，而是 12 宫格电影分镜页。

当前测试包主入口：

1. `screenplay/zhengci-zhiwai-test-pack-storyboard-prompts.md`

当前测试包仍然锁这 12 镜：

1. 005：未知来电
2. 015：找我哥语音
3. 025：音箱口令加载
4. 029：解锁成功
5. 036：电梯停在 15 层
6. 045：采样文件列表
7. 047：墙面音箱假求救
8. 053：露台定场
9. 060：瞬间翻坠
10. 063：缓慢松手
11. 071：录音笔自动回放
12. 072：黑鞋收尾

当前分镜写法要求：

1. 一条提示对应一整页 16:9、12 宫格分镜页，而不是一帧插画
2. 默认按 1-3 建立、4-6 推进、7-9 转折或加压、10-12 落点与余波
3. 黑白、粗糙铅笔线条、最小细节、强轮廓可读性、未完成草图感
4. 重点是镜头推进、动作势能、空间关系和情绪落点，不是精修画面

## 六、第四层：视频生成

视频阶段现在仍然是最后一层，不负责重新定义角色、空间和镜头结构。

当前视频层入口：

1. `screenplay/reference-driven-video-prompt-template.md`
2. `screenplay/zhengci-zhiwai-test-pack-video-prompts.md`
3. `screenplay/zhengci-zhiwai-act1-video-prompts-shot-by-shot.md`
4. `screenplay/zhengci-zhiwai-act2-video-prompts-shot-by-shot.md`
5. `screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md`
6. `screenplay/zhengci-zhiwai-act1-video-prompts.md`
7. `screenplay/zhengci-zhiwai-act2-video-prompts.md`
8. `screenplay/zhengci-zhiwai-act3-video-prompts.md`

当前输入顺序建议：

1. 图 1：三视图角色参考板
2. 图 2：12 宫格电影分镜页
3. 图 3：场景锚点图
4. 如果某镜头强依赖关键道具，再把道具图追加在后面

## 七、当前真正建议执行的步骤

这部分以当前 `zhengci-zhiwai-next-steps.md` 为准，不再使用旧的理想化顺序。

### 第一轮：先补当前缺图瓶颈

先按缺图看板推进，而不是先从整套角色板或整套视频开跑。

当前顺序固定为：

1. Batch A：`screenplay/zhengci-zhiwai-asset-batch-supplement-03.md`
2. Batch B：`screenplay/zhengci-zhiwai-asset-batch-supplement-04.md`
3. Batch C：`screenplay/zhengci-zhiwai-asset-batch-supplement-05.md`

当前第一优先仍是 Batch A，目标是优先打通第一幕权限链与 307 停摆空间。

### 第二轮：每补完一批都要固定回归

回归顺序固定为：

1. 运行 `node screenplay/build_video_prompts.js`
2. 运行 `node screenplay/build_storyboard.js zhengci-zhiwai`
3. 检查 `outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json`
4. 回看 `outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html`
5. 再看 `screenplay/zhengci-zhiwai-asset-canvas.html` 的进度是否上升

### 第三轮：缺图缓解后再跑 12 镜测试包

当前判断标准：

1. 如果 005、015、017、022、023、031 这些第一幕镜头还因缺图读不清，就继续补 Batch A
2. 如果第一幕基础空间和关键道具已经站住，再转 12 镜测试包视频

### 第四轮：测试包通过后再扩到整片

整片扩展顺序仍然沿用 generation list：

1. 批次 A：001-030
2. 批次 B：031-052
3. 批次 C：053-072

不要在 12 镜测试包没站住之前直接整片批量生成。

## 八、出问题时回修哪一层

如果结果不稳定，不要先无限重抽视频，先判断问题属于哪一层：

1. 人脸、服装、身材不稳：回修三视图角色参考板
2. 空间方位错、背景跳变、灯光飘：回修场景锚点图
3. 动作推进不清、镜头节奏不对：回修 12 宫格电影分镜
4. 静态都正确但动态表演仍然不成立：再回视频提示词本身

## 九、当前最推荐的下一步

如果完全按当前状态往下推进，最合理的顺序是：

1. 先补 Batch A 缺图
2. 立刻回归 storyboard 与 asset canvas
3. 再决定继续 Batch B，还是先跑 12 镜测试包
4. 等测试包通过后，再扩到整片 72 镜

这就是当前《证词之外》的有效执行纪律：

视频仍然是最后一层，不是第一层。
