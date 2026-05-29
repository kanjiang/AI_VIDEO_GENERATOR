# 《证词之外》最终视频生成清单（当前版）

生成日期：2026-05-21
推荐方案：以逐镜版为主、合并版为辅。当前主执行结构为 72 个镜头，建议先做测试包，再按三幕顺序批量生成，最后在剪辑阶段压到约 5 分钟成片。

---

## 一、当前版源文件关系

1. 主剧本：screenplay/zhengci-zhiwai-screenplay.md
2. 分镜节拍：screenplay/zhengci-zhiwai-storyboard-beats.md
3. 总 shot list：screenplay/zhengci-zhiwai-shot-list.md
4. 第一幕逐镜：screenplay/zhengci-zhiwai-act1-video-prompts-shot-by-shot.md
5. 第二幕逐镜：screenplay/zhengci-zhiwai-act2-video-prompts-shot-by-shot.md
6. 第三幕逐镜：screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md
7. 第一幕合并版：screenplay/zhengci-zhiwai-act1-video-prompts.md
8. 第二幕合并版：screenplay/zhengci-zhiwai-act2-video-prompts.md
9. 第三幕合并版：screenplay/zhengci-zhiwai-act3-video-prompts.md
10. 资产图提示词：screenplay/zhengci-zhiwai-asset-prompts.md
11. 测试批次：screenplay/zhengci-zhiwai-seedance-test-batch.md

执行原则：
- 所有逐镜生成以 72 镜 shot list 为唯一顺序基准。
- 所有图参命名以 asset prompts 当前版为准，不再沿用旧版旧道具体系。
- 合并版只用于快速验证节奏，不替代逐镜版。

---

## 二、当前资产清单（20 张主资产）

| # | 文件名 | 类型 | 用途 |
| --- | --- | --- | --- |
| 1 | lin_shen.png | 角色 | 林深定妆照 |
| 2 | zhou_yan.png | 角色 | 周妍定妆照 |
| 3 | chen_bo.png | 角色 | 陈伯定妆照 |
| 4 | lin_wan_bound.png | 角色 | 林晚被控制状态 |
| 5 | study_room_wide.png | 场地 | 书房冷开场 |
| 6 | corridor_307_door.png | 场地 | 三楼 307 门口 |
| 7 | room_307_entry.png | 场地 | 307 室入口视角 |
| 8 | room_307_reverse.png | 场地 | 307 室反角视角 |
| 9 | fire_stair_wide.png | 场地 | 消防楼梯 |
| 10 | floor29_wide.png | 场地 | 二十九楼走廊 |
| 11 | device_room_wide.png | 场地 | 设备间全景 |
| 12 | terrace_wide.png | 场地 | 露台全景 |
| 13 | study_screen_waveform.png | 道具/UI | 开场与闪回音频编辑界面 |
| 14 | smart_speaker_idle.png | 道具 | 307 智能音箱待机（触摸屏熄灭） |
| 15 | smart_speaker_unlocked.png | 道具 | 307 智能音箱解锁后（触摸屏显示解锁状态） |
| 16 | wall_speaker_red.png | 道具 | 设备间墙面音箱红灯 |
| 17 | ceiling_speaker.png | 道具 | 天花板广播音箱 |
| 18 | device_screen_popup.png | 道具/UI | “林晚 语音复刻模型——生成完成” |
| 19 | hard_drive_rack.png | 道具 | 硬盘柜和存储系统 |
| 20 | white_phone_call.png | 道具 | 露台白色手机通话状态 |

二层补充图参规划：

第一优先：一旦测试包失败就立刻补
- StudyDeskWide：书房桌面与电脑、台灯、林深坐姿的组合构图，用于 001、005
- Room307PowerBox：307 玄关弱电箱绿灯近景，用于 008
- SmartSpeakerBlue：307 智能音箱待机蓝灯状态（触摸屏熄灭可见），用于 009
- SmartSpeakerRed：307 智能音箱进入口令输入前的红灯状态（触摸屏亮起数字口令界面），用于 018
- SmartSpeakerRedGreen：307 智能音箱红绿闪烁转绿状态（触摸屏显示口令校验中），用于 021
- DeviceScreenFiles：设备间文件列表界面，用于 038
- WhitePhoneCallBroken：露台白色手机摔裂后仍漏声的状态，用于 064-066
- RailingJointClose：露台护栏连接处近景，用于 056

第二优先：若空间连续性不稳再补
- Room307HalfMoved：半搬空307全景基底，用于 006-017
- Room307Table：307 茶几或木桌局部，用于 007
- Room307DoorDirection：307 室内朝门口方向构图，用于 024-025
- Room307Door：307 房门内侧与门框关系，用于 026、060
- FireStairDoor：消防铁门与楼梯间冷光，用于 027
- FireStairTop：楼梯顶部俯拍位，用于 029
- FireStairMid：楼梯转角背影位，用于 030
- Floor29Door：29 楼安全门近景，用于 031
- DeviceRoomDoorCrack：设备间虚掩门缝，用于 034
- DeviceToTerraceDoor：设备间朝露台铁门方向构图，用于 048

第三优先：若表演和道具细节不稳再补
- ZhouYanPhone：周妍手机聊天界面，用于 010、015
- ZhouYanPhoneCaseCue：周妍手机壳边角导线（与露台白色手机同花纹），用于 012
- LinShenHand：林深手部局部，用于 003、018、021
- StudyPaper：书桌纸面“307 / 访问权限 / 声纹阈值”，用于 004
- ZhouYanPhoneGallery：手机相册边角露出旧偷拍照片，用于 040
- LinWanVoice：仅声音设定参考，不要求画面出人，用于 022-024 的语音统一

---

## 三、测试优先顺序（先做这一批）

### 当前工作区就绪状态

已存在，可直接复用：
- lin_shen.png
- chen_bo.png
- room_307_entry.png
- study_room_wide 的旧近似替代：lin_room_wide.png

仍缺失，补齐后再跑当前 11 镜测试更稳：
- zhou_yan.png
- lin_wan_bound.png
- study_room_wide.png
- study_screen_waveform.png
- corridor_307_door.png
- smart_speaker_unlocked.png
- device_screen_popup.png
- terrace_wide.png
- white_phone_call.png

可作为旧版近似底图但不建议直接混用：
- corridor_307.png：可参考门口旧构图，但当前版应改成 corridor_307_door.png
- corridor_wide.png：仍可作为老公寓走廊气质参考，但当前测试包本轮不直接依赖
- room_307_reverse.png：仍可用于后续 307 反角镜头参考

结论：
- 先生成缺失的 9 张主资产，再跑 11 镜测试，性价比最高。
- 如果你只想立刻试跑一小批，目前最接近可跑的是 Shot 001；但它仍建议补出 study_room_wide.png，而不要继续沿用 lin_room_wide.png。

推荐生成顺序（最小可开测路径）：
1. study_room_wide.png：解锁 Shot 001 的正式测试底图。
2. study_screen_waveform.png：解锁 Shot 002，并把开场 callback 组完整闭合。
3. zhou_yan.png：解锁 Shot 052、057，并为后续大量镜头建立角色一致性。
4. smart_speaker_unlocked.png：解锁 Shot 021，是第一幕关键机制镜头。
5. device_screen_popup.png：解锁 Shot 043、072，并为终幕系统界面统一视觉基底。
6. terrace_wide.png：解锁 Shot 050、052、056、057 的空间基底，是第三幕测试核心。
7. white_phone_call.png：解锁 Shot 050，并为 064-066 的后续破裂手机状态提供母体。
8. lin_wan_bound.png：解锁 Shot 070，直接决定终极反转是否成立。
9. corridor_307_door.png：解锁 Shot 060，让“即时触发首段语音”的监控门口关系站住。

按这个顺序的最小分批建议：
- 第一批：study_room_wide.png、study_screen_waveform.png、zhou_yan.png、smart_speaker_unlocked.png
- 第二批：device_screen_popup.png、terrace_wide.png、white_phone_call.png
- 第三批：lin_wan_bound.png、corridor_307_door.png

每批完成后可立即验证的测试镜头：
- 第一批完成后：001、002、021
- 第二批完成后：043、050、052、056、057、072
- 第三批完成后：060、070

当前优先测试包以 screenplay/zhengci-zhiwai-seedance-test-batch.md 为准，共 11 镜：

| 批次序号 | Shot | 目标 |
| --- | --- | --- |
| 1 | 001 | 开场误导是否成立 |
| 2 | 002 | 波形 callback 是否清楚 |
| 3 | 021 | 智能音箱解锁是否可信 |
| 4 | 043 | 语音复刻模型弹窗是否击中反转 |
| 5 | 050 | 白色手机诱导是否成立 |
| 6 | 052 | 林深“像救人”的两层解读是否成立 |
| 7 | 056 | 护栏异响是否真实 |
| 8 | 057 | 坠落是否成立 |
| 9 | 060 | 即时触发机制是否讲清 |
| 10 | 070 | 林晚未死的监控反转是否成立 |
| 11 | 072 | 系统播报终幕是否够冷 |

建议：
- 测试包全部通过后，再进入整幕批量生成。
- 若测试包里 050 / 052 / 056 / 057 任何一镜失效，先不要批量做第三幕。

---

## 四、整片批量生成顺序（72 镜）

### 批次 A：第一幕上半（001-013）
源文件：screenplay/zhengci-zhiwai-act1-video-prompts-shot-by-shot.md
内容：书房冷开场、307 回访、弱电前提、死者来信
目的：先锁人物、书房、307 室、智能音箱待机状态

### 批次 B：第一幕下半（014-025）
源文件：screenplay/zhengci-zhiwai-act1-video-prompts-shot-by-shot.md
内容：林深赶到、保全语音、数字口令解锁、指向二十九楼设备间
目的：锁定林深前期好人姿态与“在音箱触摸屏输入双段口令且后半截被遮挡”的私密性

### 批次 C：第二幕上半（026-035）
源文件：screenplay/zhengci-zhiwai-act2-video-prompts-shot-by-shot.md
内容：离开307、消防楼梯、二十九楼走廊、设备间门缝诱导
目的：锁定三楼到二十九楼的空间连续性

### 批次 D：第二幕下半（036-048）
源文件：screenplay/zhengci-zhiwai-act2-video-prompts-shot-by-shot.md
内容：设备间全景、硬盘柜、文件列表、弹窗、转向露台
目的：锁定声音工厂质感和真假声源分层

### 批次 E：第三幕上半（049-056）
源文件：screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md
内容：露台危险空间、白色手机、伪保护、退路消失、护栏异响
目的：锁定露台诱导链条是否真实可信

### 批次 F：第三幕中段（057-063）
源文件：screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md
内容：坠落、五段闪回、回到坠落视角
目的：锁定反转信息的命中顺序与闪回密度

### 批次 G：第三幕收尾（064-072）
源文件：screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md
内容：物证清除、陈伯接回现实线、控制室、林晚未死、系统播报
目的：锁定最终冷结尾和“样本化”主题

---

## 五、合并版使用时机

如果模型状态不稳定、想先看段落节奏，可按以下顺序跑合并版：

| 幕 | 文件 | 建议用途 |
| --- | --- | --- |
| 第一幕 | screenplay/zhengci-zhiwai-act1-video-prompts.md | 先看开场误导、307 回访、音箱解锁节奏 |
| 第二幕 | screenplay/zhengci-zhiwai-act2-video-prompts.md | 先看楼层迁移、设备间信息落地 |
| 第三幕 | screenplay/zhengci-zhiwai-act3-video-prompts.md | 先看露台诱导、闪回、终幕冷收尾 |

合并版只用于：
- 快速测试风格和空间
- 检查信息密度是否过载
- 检查角色脸和灯光是否稳定

合并版不用于：
- 最终镜头级交付
- 精确控制闪回落点
- 精确控制露台动作安全逻辑

---

## 六、关键一致性检查

### 角色一致性
- 林深前半程必须像帮助者，不允许过早显露操控欲
- 周妍必须是主动追真相的人，不拍成被拖着走
- 陈伯前半程尽量延后暴露，终场才完整接回现实线
- 林晚终场必须是“还活着但被持续采样”，不是尸体感

### 道具一致性
- 307 智能音箱分待机蓝灯（触摸屏熄灭）、口令输入红灯（触摸屏亮起）、解锁绿灯（触摸屏显示解锁）三种状态
- 设备间弹窗文案固定为“林晚 语音复刻模型——生成完成”
- 露台白色手机始终是通话诱导声源，不要变成录像界面
- 硬盘柜与控制界面必须统一成真实工业软件感

### 空间一致性
- 307 所在楼层必须始终保持为三楼，禁止错误楼层漂移
- 去二十九楼的路线必须经消防楼梯
- 露台铁门、护栏、维修箱和白色手机的位置关系必须固定
- 控制室要延续设备间的现实工业感，不要科幻化

---

## 七、通过标准

进入整片批量前，至少满足以下条件：
- [ ] 11 镜测试包已通过
- [ ] 林深、周妍、陈伯、林晚四张角色资产已稳定
- [ ] 307、消防楼梯、29 楼走廊、设备间、露台五个主场景已锁定
- [ ] 智能音箱、设备弹窗、白色手机、监控屏四组关键道具已稳定
- [ ] 第三幕 050 / 052 / 056 / 057 / 070 / 072 的因果链已经成立

达到以上条件后，再开始整片 72 镜批量生成。
