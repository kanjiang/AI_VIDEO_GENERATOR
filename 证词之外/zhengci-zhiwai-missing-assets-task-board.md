# 《证词之外》缺图任务看板

来源：screenplay/证词之外/zhengci-zhiwai-missing-assets.md

使用方式：

- 每补完一批图，重新运行 screenplay/build_video_prompts.js 与 screenplay/build_storyboard.js zhengci-zhiwai。
- 以 outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json 中的 assets 状态为准回填本看板。
- 批次排序优先保证剧情主线可跑，再补空间闭环，最后补闪回与终场收束。

## Batch A · 第一幕权限链

目标：先让开场电话、307 停摆空间、死者语音和音箱权限链完整可用。

直投包入口：screenplay/证词之外/zhengci-zhiwai-asset-batch-supplement-03.md

- [ ] UnknownCallerPhone · unknown_caller_phone.png · Shot 005, 007, 008, 014, 015, 022, 023
- [ ] Room307Entry · room_307_entry.png · Shot 011, 013, 017, 018, 031
- [ ] Room307Reverse · room_307_reverse.png · Shot 012
- [ ] StudyPhotoSet · study_photo_set.png · Shot 002
- [ ] ZhouYanPhoneCaseCue · zhou_yan_phone_case_cue.png · Shot 016

交付标准：

- storyboard 中 S0-S1 关键卡片不再缺缩略图。
- 005、015、017、022、023、031 六个镜头可直接进入视频测试。

## Batch B · 电梯与29楼异常空间

目标：补齐第二幕纵向移动、卡层惊吓、29楼入口和设备间阈值。

直投包入口：screenplay/证词之外/zhengci-zhiwai-asset-batch-supplement-04.md

- [ ] ElevatorCabin · elevator_cabin.png · Shot 032, 033, 034, 036, 037, 038, 039, 040, 041, 069
- [ ] ElevatorPanel29 · elevator_panel_29.png · Shot 032, 035, 036, 041, 068
- [ ] SecurityFlashlightGap · security_flashlight_gap.png · Shot 026, 028
- [ ] Floor29Wide · floor29_wide.png · Shot 042, 043
- [ ] DeviceRoomDoorCrack · device_room_door_crack.png · Shot 043
- [ ] DeviceRoomWide · device_room_wide.png · Shot 044, 050

交付标准：

- 第二幕从 026 到 050 的空间链条在 storyboard 页面中连续成立。
- 036、042、043、044、045、050 可直接做中段测试包。

## Batch C · 闪回闭环与终场物证

目标：补齐第三幕的黑化证据、闪回信息和结尾物证。

直投包入口：screenplay/证词之外/zhengci-zhiwai-asset-batch-supplement-05.md

- [ ] RecorderPenClose · recorder_pen_close.png · Shot 071, 072
- [ ] GroundShoesClose · ground_shoes_close.png · Shot 072
- [ ] AudioProfitDashboard · audio_profit_dashboard.png · Shot 065
- [ ] LockedRoomWide · locked_room_wide.png · Shot 066
- [ ] SecurityGuardShadow · security_guard_shadow.png · Shot 068

交付标准：

- 065-072 关键反转链条不再依赖文字理解，单看卡片也能读出因果。
- 071 与 072 终场证据镜头可独立作为结尾测试。

## 每批回归动作

1. 运行 node screenplay/build_video_prompts.js
2. 运行 node screenplay/build_storyboard.js zhengci-zhiwai
3. 检查 outputs/projects/zhengci-zhiwai/storyboard/zhengci-zhiwai.storyboard.json 中对应镜头的 assets 是否从 missing 变为 ready 或 partial
4. 同步检查 screenplay/证词之外/zhengci-zhiwai-asset-canvas.html 页面进度是否上升
