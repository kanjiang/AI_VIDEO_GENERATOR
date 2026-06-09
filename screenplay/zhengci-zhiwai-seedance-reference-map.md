# 《证词之外》Seedance 参考图对照表（2026-06-08 15秒定长版）

用途：按镜号快速确认生成时应该把哪些角色、环境、道具以 @image 形式写进提示词正文。

使用规则：

1. 角色优先，场景其次，道具最后；如果镜头是纯空间或纯道具，不要硬塞人物。
2. 旧版消防楼梯、陈伯具象身份、终幕监控绑椅体系全部作废，不再写入任何镜头。
3. 未列镜头优先复用同场相邻镜头，不要跨段乱借完全不同空间。
4. 同一资产别名必须稳定，文件名以当前资产提示词文件为准。

## 当前常用别名

| Alias | 文件 | 用途 |
| --- | --- | --- |
| LinShen | lin_shen.png | 林深角色定妆 |
| ZhouYan | zhou_yan.png | 周妍角色定妆 |
| LinWanConfined | lin_wan_bound.png | 林晚被软禁/受控状态 |
| SecurityGuardShadow | security_guard_shadow.png | 匿名保安轮廓参考 |
| StudyRoomWide | study_room_wide.png | 书房全景 |
| StudyDeskWide | study_desk_wide.png | 书房桌面组合视角 |
| StudyScreenWaveform | study_screen_waveform.png | 书房隐藏声纹编辑界面 |
| StudyPhotoSet | study_photo_set.png | 书桌兄妹合照与耳机 |
| UnknownCallerPhone | unknown_caller_phone.png | 未知来电与语音界面 |
| Room307Entry | room_307_entry.png | 307入口视角 |
| Room307Reverse | room_307_reverse.png | 307反角视角 |
| ZhouYanPhoneCaseCue | zhou_yan_phone_case_cue.png | 周妍手机壳导线 |
| SmartSpeakerIdle | smart_speaker_idle.png | 音箱待机蓝灯 |
| SmartSpeakerRed | smart_speaker_red.png | 音箱口令输入前红灯 |
| SmartSpeakerRedGreen | smart_speaker_red_green.png | 音箱口令校验中 |
| SmartSpeakerUnlocked | smart_speaker_unlocked.png | 音箱解锁成功 |
| SecurityFlashlightGap | security_flashlight_gap.png | 门缝手电与门外压迫 |
| ElevatorCabin | elevator_cabin.png | 电梯轿厢空间 |
| ElevatorPanel29 | elevator_panel_29.png | 电梯楼层与停层面板 |
| Floor29Wide | floor29_wide.png | 29楼走廊全景 |
| DeviceRoomDoorCrack | device_room_door_crack.png | 设备间门缝冷光 |
| DeviceRoomWide | device_room_wide.png | 设备间全景 |
| DeviceScreenFiles | device_screen_files.png | 采样文件列表界面 |
| WallSpeakerRed | wall_speaker_red.png | 墙面广播音箱红灯 |
| TerraceWide | terrace_wide.png | 露台全景 |
| WhitePhoneCall | white_phone_call.png | 露台白色手机通话状态 |
| RailingJointClose | railing_joint_close.png | 护栏连接处特写 |
| AudioProfitDashboard | audio_profit_dashboard.png | 收益后台界面 |
| LockedRoomWide | locked_room_wide.png | 林晚被软禁房间 |
| RecorderPenClose | recorder_pen_close.png | 微型录音笔近景 |
| GroundShoesClose | ground_shoes_close.png | 黑色制式皮鞋近景 |

## Shot 绑定

| Shot | 推荐写入的 @image |
| --- | --- |
| 001 | @image1 (LinShen) + @image2 (StudyRoomWide) |
| 002 | @image1 (StudyScreenWaveform) + @image2 (StudyDeskWide) + @image3 (StudyPhotoSet) |
| 003 | @image1 (LinShen) + @image2 (UnknownCallerPhone) + @image3 (StudyPhotoSet) |
| 004 | @image1 (LinShen) + @image2 (UnknownCallerPhone) + @image3 (StudyDeskWide) |
| 005 |  |
| 006 | @image1 (Room307Entry) + @image2 (ZhouYan) |
| 007 | @image1 (ZhouYan) + @image2 (LinShen) + @image3 (Room307Entry) |
| 008 | @image1 (ZhouYan) |
| 009 | @image1 (DeviceRoomDoorCrack) + @image2 (ZhouYan) |
| 010 | @image1 (ZhouYan) + @image2 (UnknownCallerPhone) |
| 011 | @image1 (LinShen) + @image2 (SmartSpeakerIdle) |
| 012 | @image1 (SecurityFlashlightGap) |
| 013 | @image1 (SecurityFlashlightGap) + @image2 (ZhouYan) |
| 014 | @image1 (SmartSpeakerUnlocked) + @image2 (ZhouYan) |
| 015 | @image1 (ElevatorCabin) + @image2 (ElevatorPanel29) |
| 016 | @image1 (ZhouYan) + @image2 (ElevatorCabin) |
| 017 | @image1 (LinShen) + @image2 (ElevatorCabin) |
| 018 | @image1 (Floor29Wide) + @image2 (DeviceRoomDoorCrack) |
| 019 | @image1 (DeviceRoomWide) + @image2 (DeviceScreenFiles) |
| 020 | @image1 (ZhouYan) + @image2 (ElevatorPanel29) + @image3 (DeviceScreenFiles) |
| 021 | @image1 (WallSpeakerRed) + @image2 (ZhouYan) + @image3 (LinShen) |
| 022 | @image1 (TerraceWide) + @image2 (WhitePhoneCall) |
| 023 | @image1 (ZhouYan) + @image2 (WhitePhoneCall) + @image3 (TerraceWide) |
| 024 | @image1 (RailingJointClose) + @image2 (LinShen) + @image3 (ZhouYan) |
| 025 | @image1 (LinShen) + @image2 (ZhouYan) + @image3 (TerraceWide) |
| 026 | @image1 (LinShen) + @image2 (TerraceWide) |
| 027 | @image1 (LinShen) + @image2 (ZhouYan) |
| 028 | @image1 (LinShen) + @image2 (ZhouYan) |
| 029 | @image1 (LinShen) + @image2 (AudioProfitDashboard) + @image3 (LinWanConfined) + @image4 (LockedRoomWide) |
| 030 | @image1 (StudyScreenWaveform) + @image2 (RailingJointClose) + @image3 (SecurityGuardShadow) |
| 031 | @image1 (LinShen) + @image2 (SmartSpeakerUnlocked) + @image3 (ElevatorCabin) |
| 032 | @image1 (GroundShoesClose) + @image2 (RecorderPenClose) |

## 最稳的 Seedance 写法

如果一个镜头里既有人物又有场景又有道具，顺序保持：

1. 角色
2. 场景
3. 道具

示例：

@image1 (LinShen)
@image2 (TerraceWide)
@image3 (WhitePhoneCall)

不要为了保险把所有图都塞进去。镜头只锁真正需要稳定的角色、环境和关键道具。
