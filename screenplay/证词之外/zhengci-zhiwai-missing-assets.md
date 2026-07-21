# 《证词之外》Storyboard 缺失资产清单

生成依据：outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json

口径说明：

- 本清单只统计当前 storyboard 72 镜实际引用、但文件尚不存在的图像资产。
- 当前状态为 18 / 43 图像资产已存在；以下 16 个 alias 仍会阻塞对应镜头的 storyboard 卡片缩略图与后续视频生成。
- 如需刷新本表，先运行 screenplay/build_video_prompts.js，再运行 screenplay/build_storyboard.js zhengci-zhiwai，然后按最新 JSON 重算。

## 高优先级

| Alias | 文件名 | 关联镜头 | 原因 |
| --- | --- | --- | --- |
| UnknownCallerPhone | unknown_caller_phone.png | 005, 007, 008, 014, 015, 022, 023 | 贯穿开场电话、死者语音与权限交接，是第一幕最频繁缺失的关键道具 |
| ElevatorCabin | elevator_cabin.png | 032, 033, 034, 036, 037, 038, 039, 040, 041, 069 | 覆盖电梯整段压迫戏，也是闪回闭环所需空间 |
| ElevatorPanel29 | elevator_panel_29.png | 032, 035, 036, 041, 068 | 负责29楼路径、电梯卡层与预设陷阱回收 |
| Room307Entry | room_307_entry.png | 011, 013, 017, 018, 031 | 307定场、周妍独处、音箱待机和离开307都依赖它 |
| RecorderPenClose | recorder_pen_close.png | 071, 072 | 终场物证，决定最后真相是否能落地 |

## 其余待补资产

| Alias | 文件名 | 关联镜头 |
| --- | --- | --- |
| StudyPhotoSet | study_photo_set.png | 002 |
| ZhouYanPhoneCaseCue | zhou_yan_phone_case_cue.png | 016 |
| SecurityFlashlightGap | security_flashlight_gap.png | 026, 028 |
| Floor29Wide | floor29_wide.png | 042, 043 |
| DeviceRoomDoorCrack | device_room_door_crack.png | 043 |
| DeviceRoomWide | device_room_wide.png | 044, 050 |
| AudioProfitDashboard | audio_profit_dashboard.png | 065 |
| LockedRoomWide | locked_room_wide.png | 066 |
| SecurityGuardShadow | security_guard_shadow.png | 068 |
| GroundShoesClose | ground_shoes_close.png | 072 |
| Room307Reverse | room_307_reverse.png | 012 |

## 建议补图顺序

1. 先补 UnknownCallerPhone、Room307Entry，把第一幕主线与人物权限链补齐。
2. 再补 ElevatorCabin、ElevatorPanel29，打通第二幕整段纵向移动与卡层惊吓。
3. 最后补 RecorderPenClose、GroundShoesClose、AudioProfitDashboard、LockedRoomWide、SecurityGuardShadow，收尾第三幕反转和闪回闭环。
