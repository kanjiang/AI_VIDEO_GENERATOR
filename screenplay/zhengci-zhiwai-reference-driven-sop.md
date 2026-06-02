# 《证词之外》参考图驱动生成 SOP

这份文档把当前仓库里已经存在的《证词之外》素材，收束成一套可直接执行的低抽卡工作流。

核心原则不是“直接写长视频提示词反复抽卡”，而是先把静态约束拆成三层，再进入视频生成：

`角色身份板 -> 黑白故事板表格 -> 场景图 -> 视频生成`

这样做的目标，是让视频阶段只负责动态执行，而不再同时重新猜角色、空间、镜头和灯光。

## 一、当前项目的源文件锚点

当前项目已经有足够完整的基础文件，不需要再从零搭流程。

### 文本与结构源

1. `screenplay/zhengci-zhiwai-screenplay.md`：主剧本
2. `screenplay/zhengci-zhiwai-storyboard-beats.md`：分镜节拍
3. `screenplay/zhengci-zhiwai-shot-list.md`：72 镜唯一顺序基准
4. `screenplay/zhengci-zhiwai-storyboard-prompts.md`：storyboard prompt 源
5. `screenplay/zhengci-zhiwai-storyboard.config.json`：storyboard 生成配置

### 资产与参考源

1. `screenplay/zhengci-zhiwai-seedance-reference-map.md`：逐镜参考图绑定
2. `screenplay/zhengci-zhiwai-asset-prompts.md`：资产生成提示词
3. `screenplay/zhengci-zhiwai-asset-canvas.html`：资产追踪画布
4. `screenplay/zhengci-zhiwai-missing-assets.md`：当前 storyboard 缺图汇总
5. `screenplay/zhengci-zhiwai-missing-assets-task-board.md`：按 Batch A/B/C 拆开的补图顺序
6. `screenplay/zhengci-zhiwai-asset-batch-supplement-03.md`：Batch A 直投包
7. `screenplay/zhengci-zhiwai-asset-batch-supplement-04.md`：Batch B 直投包
8. `screenplay/zhengci-zhiwai-asset-batch-supplement-05.md`：Batch C 直投包

### 生成执行源

1. `screenplay/zhengci-zhiwai-final-generation-list.md`：12 镜测试包与 72 镜批量顺序
2. `outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json`：当前故事板结构化输出
3. `outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.html`：当前故事板浏览页
4. `screenplay/build_video_prompts.js`：act prompt 与 storyboard prompt 同步生成脚本

## 二、这部片子的低抽卡执行逻辑

《证词之外》不是高密度动作片，它更依赖：

1. 角色伪装是否成立
2. 空间诱导是否可信
3. 镜头信息是否清晰地把观众一步步推入陷阱
4. 关键道具和空间是否跨镜稳定

因此这部片子的视频生成，不应该先跑视频，而应该先锁 3 类静态参考：

1. 人物身份
2. 镜头结构
3. 空间锚点

最后才进入视频生成。

## 三、第一层：角色身份板怎么接到当前项目

角色身份板的目标，是先锁定人物在全片中的稳定视觉身份，而不是生成单张好看人像。

当前项目里优先级最高的角色锚点是：

1. `LinShen`：林深，必须稳定维持“温和、可靠、理性、后期冷掉”的两层身份
2. `ZhouYan`：周妍，必须稳定维持“冷静、主动取证、被诱导但不是愚蠢”的状态
3. `LinWanConfined`：林晚，必须明确“活着但被控制”的状态锚点
4. `SecurityGuardShadow`：匿名保安，只需要轮廓与匿名压迫，不需要具象化人物设定

建议执行顺序：

1. 先做 `LinShen` 和 `ZhouYan` 的正式身份板。
2. 再做 `LinWanConfined` 的特殊状态身份板。
3. `SecurityGuardShadow` 只做轮廓型身份参考，不做复杂角色展示板。

对应模板入口：

1. `screenplay/character-identity-board-prompt-example.md`
2. `.claude/skills/storyboard-table-skill/SKILL.md` 中的角色身份板模式

执行要求：

1. 林深必须先锁“正常人外壳”，不能一开始就带明显反派气质。
2. 周妍必须锁“主动判断能力”，不能做成单纯受害者。
3. 林晚只需要提供足以支持录音、失联、软禁回收的状态统一性。
4. 保安只需要匿名压迫锚点，不要浪费抽卡次数在身份细化上。

## 四、第二层：场景图怎么接到当前项目

《证词之外》最容易在视频里抽卡失控的，不是角色脸，而是空间跳变。

当前项目最需要先锁的空间不是 72 个镜头，而是 6 个核心场景底板：

1. 书房：`StudyRoomWide` + `StudyDeskWide` + `StudyScreenWaveform`
2. 307 房间：`Room307Entry` + `Room307Reverse`
3. 电梯与 29 楼走廊：`ElevatorCabin` + `ElevatorPanel29` + `Floor29Wide`
4. 设备间：`DeviceRoomDoorCrack` + `DeviceRoomWide` + `DeviceScreenFiles`
5. 露台：`TerraceWide` + `WhitePhoneCall` + `RailingJointClose`
6. 地面落点 / 终场：`RecorderPenClose` + `GroundShoesClose`

建议执行顺序：

1. 先锁书房、307、露台这 3 个最高叙事压力空间。
2. 再锁电梯 / 29 楼走廊和设备间。
3. 最后补地面落点这种终场回收空间。

对应模板入口：

1. `screenplay/scene-board-prompt-example.md`
2. `.claude/skills/scene-board-skill/SKILL.md`

执行要求：

1. 书房必须先看起来正常，再允许后期暴露隐藏界面。
2. 307 必须有“生活被中断”的空房间质感，而不是普通出租屋。
3. 电梯和 29 楼必须先锁空间连续性，不要让 15 层卡顿和 29 楼开门像两个地方。
4. 设备间必须可靠到足以支撑“声音工厂”概念。
5. 露台必须先锁危险结构和退路关系，否则 053-063 会频繁穿帮。

## 五、第三层：黑白故事板表格怎么接到当前项目

故事板表格的目标，是把“这一段怎么拍”先静态写清楚。

本项目不建议上来就给 72 镜全量做精修故事板，而应该先对测试包做重点锁定。

优先顺序直接采用当前 generation list 里的 12 镜测试包：

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

对应模板入口：

1. `.claude/skills/storyboard-table-skill/SKILL.md`
2. `screenplay/zhengci-zhiwai-storyboard-prompts.md`
3. `screenplay/zhengci-zhiwai-storyboard.config.json`

执行要求：

1. 先锁这 12 镜的镜头逻辑，再扩到整片。
2. 重点镜头只锁动作、构图、机位、灯光方向，不追求过细渲染。
3. 黑白手绘板的作用是减少视频阶段的镜头漂移，不是替代最终成片风格。

## 六、第四层：视频生成怎么接到当前项目

视频阶段不再负责重新定义角色、空间和镜头结构，只负责把已锁定内容变成运动镜头。

对应模板入口：

1. `screenplay/reference-driven-video-prompt-template.md`

输入顺序建议固定为：

1. 图 1：角色身份板
2. 图 2：故事板表格
3. 图 3：场景图

如果某镜头还需要关键道具参考，再把道具图追加在后面，不要把所有图一股脑塞满。

最稳的图像绑定逻辑，继续沿用当前 reference map：

1. 角色优先
2. 场景其次
3. 道具最后

## 七、按当前项目直接可执行的实际步骤

### 第一轮：先锁参考层，不做整片视频

1. 为 `LinShen`、`ZhouYan`、`LinWanConfined` 做角色身份板。
2. 为书房、307、露台做第一批场景图。
3. 为 12 镜测试包做黑白故事板表格。
4. 检查身份板、故事板、场景图之间是否互相冲突。

### 第二轮：只跑 12 镜测试包视频

严格按 `screenplay/zhengci-zhiwai-final-generation-list.md` 的 12 镜测试包顺序执行，不跳镜、不贪多。

重点检查：

1. 005 是否能立住冷开场切断点
2. 025 / 029 是否能让音箱机制可信
3. 036 是否能把 15 层卡顿拍出压迫
4. 053 是否把露台危险结构讲清楚
5. 060 / 063 是否让“救人假象 -> 松手反转”成立
6. 071 / 072 是否让录音笔和匿名收尾成立

### 第三轮：测试包通过后再批量扩片

扩片顺序继续沿用当前 generation list：

1. 批次 A：001-030
2. 批次 B：031-052
3. 批次 C：053-072

不要在测试包没站住之前直接整片批量生成。

### 第四轮：按缺图批次补资产

如果 storyboard 页面里 `assets` 仍然是 missing，不要随机补图，直接按缺图任务看板推进：

1. Batch A：先补 `UnknownCallerPhone`、`Room307Entry`、`Room307Reverse`、`StudyPhotoSet`、`ZhouYanPhoneCaseCue`
2. Batch B：再补 `ElevatorCabin`、`ElevatorPanel29`、`SecurityFlashlightGap`、`Floor29Wide`、`DeviceRoomDoorCrack`、`DeviceRoomWide`
3. Batch C：最后补 `RecorderPenClose`、`GroundShoesClose`、`AudioProfitDashboard`、`LockedRoomWide`、`SecurityGuardShadow`

对应执行入口：

1. Batch A 直投包：`screenplay/zhengci-zhiwai-asset-batch-supplement-03.md`
2. Batch B 直投包：`screenplay/zhengci-zhiwai-asset-batch-supplement-04.md`
3. Batch C 直投包：`screenplay/zhengci-zhiwai-asset-batch-supplement-05.md`

每补完一批，固定回归顺序：

1. 运行 `node screenplay/build_video_prompts.js`
2. 运行 `node screenplay/build_storyboard.js zhengci-zhiwai`
3. 检查 `outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json`
4. 再看 `screenplay/zhengci-zhiwai-asset-canvas.html` 的进度是否上升

## 八、出问题时应该回修哪一层

如果结果不稳定，不要先无限重抽视频，先判断问题属于哪一层：

1. 角色不稳：回修身份板
2. 镜头乱了：回修故事板表格
3. 背景跳变、方位错误、灯光飘：回修场景图
4. 动作节奏不对：再回视频提示词本身

这是当前项目最重要的执行纪律：

视频是最后一层，不是第一层。

## 九、当前项目最推荐的下一步

如果继续沿这套 SOP 往下做，最合理的顺序是：

1. 先补齐 `LinShen`、`ZhouYan`、`LinWanConfined` 的角色身份板。
2. 再补书房、307、露台三套场景图。
3. 再把 12 镜测试包逐镜转成正式故事板表格。
4. 最后用参考图驱动模板跑 12 镜测试包视频。

等这 12 镜通过，再推进整片 72 镜批量生成。
