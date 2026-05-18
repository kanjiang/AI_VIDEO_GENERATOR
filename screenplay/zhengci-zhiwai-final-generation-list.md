# 《证词之外》最终视频生成清单

目录关系总览见：`file-relationship-map.md`

生成日期：2026-05-18
推荐方案：**逐镜版（shot-by-shot）**，共 36 条 prompt，预计成片素材总长约 **3.3 分钟**（后期加片头/字幕/留白/音频过渡补齐至 5 分钟）

---

## 一、资产文件清单（16 张图参）

生成视频前必须确认以下资产图全部就位：

| # | 文件名 | 类型 | 用途说明 |
|---|---|---|---|
| 1 | `lin_shen.png` | 角色 | 林深定妆照，所有林深镜头必引 |
| 2 | `chen_bo.png` | 角色 | 陈伯定妆照，S3-S6 镜头引用 |
| 3 | `lin_room_wide.png` | 场地 | 林深出租屋全景，S0 镜头引用 |
| 4 | `lin_room_desk.png` | 场地 | 出租屋桌面，S0 镜头引用 |
| 5 | `corridor_wide.png` | 场地 | 七楼走廊全景，S1/S5/S6 引用 |
| 6 | `corridor_307.png` | 场地 | 307 门口近景，S1/S5/S6 引用 |
| 7 | `room_307_entry.png` | 场地 | 307 室入口视角，S2 所有室内镜头引用 |
| 8 | `room_307_reverse.png` | 场地 | 307 室反角视角，S3-S5 室内镜头引用 |
| 9 | `recorder.png` | 道具 | 录音笔（口令错误状态） |
| 10 | `recorder_unlocked.png` | 道具 | 录音笔（LEFT 解锁状态） |
| 11 | `envelope_note.png` | 道具 | 匿名信封与纸条 |
| 12 | `speaker_off.png` | 道具 | 监听音箱（LED 关/沉默状态） |
| 13 | `speaker_on.png` | 道具 | 监听音箱（LED 亮/播放状态） |
| 14 | `sensor_box.png` | 道具 | 玄关顶角小黑盒 |
| 15 | `fire_alarm.png` | 道具 | 消防报警器 |
| 16 | `notice.png` | 道具 | 物业告示 |

---

## 二、逐镜生成顺序（推荐）

### 第一幕 Act 1（S0-S2）— 16 条

源文件：`screenplay/zhengci-zhiwai-act1-video-prompts-shot-by-shot.md`

| 序号 | Shot | 时长 | 场次 | 画面摘要 | 关键台词/声音 | 引用资产 |
|---|---|---|---|---|---|---|
| 1 | 001 | 6s | S0 | 纯黑场，破碎录音先声 | 林晚："哥……如果你听见这段……第七码……别信……" | 无（纯黑） |
| 2 | 002 | 6s | S0 | 手部特写，按重播键×3 | 录音断裂、白噪音 | lin_shen, recorder |
| 3 | 003 | 5s | S0 | 桌面俯拍，道具并置 | 环境静默 | lin_room_desk, envelope_note, recorder |
| 4 | 004 | 5s | S0 | 林深拿起录音笔和纸条出门 | 衣料摩擦声 | lin_shen, lin_room_wide, recorder, envelope_note |
| 5 | 005 | 5s | S1 | 七楼走廊全景，灯闪 | 灯电流声 | corridor_wide |
| 6 | 006 | 5s | S1 | 307 门口细节，封条/告示/报警器 | 无 | corridor_307, notice, fire_alarm |
| 7 | 007 | 7s | S1 | 纸条正反面+手指细节 | 纸条文字可见 | lin_shen, envelope_note, recorder |
| 8 | 008 | 4s | S1 | 旧铜钥匙开锁 | 咔哒一声 | lin_shen, corridor_307 |
| 9 | 009 | 4s | S1 | 顶角小黑盒触发 | 极轻嗒声 | sensor_box, lin_shen |
| 10 | 010 | 4s | S1 | 值夜室红灯亮起，手拿钥匙 | 对讲机电流 | chen_bo（仅手） |
| 11 | 011 | 6s | S2 | 307 室入口广角，音箱红灯 | 月光+底噪 | lin_shen, room_307_entry, speaker_on |
| 12 | 012 | 4s | S2 | "307 备份"标签特写 | 低频底噪 | speaker_on |
| 13 | 013 | 5s | S2 | 林深慢慢走近木桌 | 脚步+呼吸 | lin_shen, room_307_entry, speaker_on |
| 14 | 014 | 8s | S2 | 音箱发出真录音 | 林晚："哥，如果你听见这段……说明我已经死了。" | speaker_on, lin_shen |
| 15 | 015 | 5s | S2 | 录音笔口令界面亮起 | 林晚："第七码……不是数字。" | lin_shen, recorder |
| 16 | 016 | 4s | S2 | 门外钥匙声，林深猛回头 | 对讲机+钥匙轻撞 | lin_shen, room_307_entry, recorder |

---

### 第二幕 Act 2（S3-S4）— 12 条

源文件：`screenplay/zhengci-zhiwai-act2-video-prompts-shot-by-shot.md`

| 序号 | Shot | 时长 | 场次 | 画面摘要 | 关键台词/声音 | 引用资产 |
|---|---|---|---|---|---|---|
| 17 | 017 | 6s | S3 | 陈伯占住门框 | 陈伯："你还是来了。" | lin_shen, chen_bo, room_307_reverse, speaker_on |
| 18 | 018 | 8s | S3 | 录音来源试探对话 | 林深："这屋里，为什么会有她的录音？" / 陈伯："这屋里的声音，都不干净。" | lin_shen, chen_bo, room_307_reverse, speaker_on, recorder |
| 19 | 019 | 4s | S3 | 顶角黑盒再闪，播音孔启动 | "嘶"的机械提示 | sensor_box, room_307_reverse, lin_shen |
| 20 | 020 | 7s | S3 | 假录音从头顶压下来 | 假声："哥。把录音笔交给陈伯。相信他。" | lin_shen, room_307_reverse, chen_bo, recorder |
| 21 | 021 | 6s | S3 | 陈伯索取录音笔 | 陈伯："听见了吧。先给我。" | lin_shen, chen_bo, recorder, room_307_reverse |
| 22 | 022 | 4s | S4 | 错误口令屏幕特写 | 红字"口令错误" | recorder |
| 23 | 023 | 5s | S4 | 想到不是数字而是方向 | 无台词 | lin_shen, recorder, chen_bo |
| 24 | 024 | 5s | S4 | 输入 L-E-F-T 解锁 | 按键声+解锁提示音 | recorder_unlocked, lin_shen |
| 25 | 025 | **10s** | S4 | 隐藏录音落地真相 | 林晚："哥，这栋楼一直在偷录住户的声音。" / "他们把人说过的话拆开，再拼成这个人自己。样本和名单，都在这支录音笔里。" / **"陈伯要是来拿，别给。"** | lin_shen, chen_bo, recorder_unlocked, room_307_reverse |
| 26 | 026 | 7s | S4 | 左手私人记忆击中林深 | 林晚："小时候停电，你嘴上说不怕。睡着前，还是一定要攥着我的左手。" / "因为你右手一紧张，就会……"（断） | lin_shen, recorder_unlocked, chen_bo |
| 27 | 027 | **8s** | S4 | 假声重复+林深推理闭环 | 假声重复 / 林深："它只会放这一句。" **"你们要的，不是录音笔。""是里面的东西。"** | lin_shen, sensor_box, speaker_off, room_307_reverse |
| 28 | 028 | 6s | S4 | 陈伯第一次进门 | 陈伯："名单，还拷给谁了？" | lin_shen, chen_bo, room_307_reverse, speaker_off, recorder_unlocked |

---

### 第三幕 Act 3（S5-S6）— 8 条

源文件：`screenplay/zhengci-zhiwai-act3-video-prompts-shot-by-shot.md`

| 序号 | Shot | 时长 | 场次 | 画面摘要 | 关键台词/声音 | 引用资产 |
|---|---|---|---|---|---|---|
| 29 | 029 | 4s | S5 | 抄起音箱冲向门口 | 脚步+扑空声 | lin_shen, chen_bo, speaker_off, room_307_reverse |
| 30 | 030 | 5s | S5 | 音箱砸爆消防报警器 | "嘭"+警铃炸响 | speaker_off, fire_alarm, corridor_307, lin_shen |
| 31 | 031 | 6s | S5 | 走廊灯全亮，住户涌出 | 警铃+脚步+询问声 | corridor_wide, corridor_307 |
| 32 | 032 | 5s | S6 | 林深退到门口，陈伯不敢追 | 警铃持续 | lin_shen, chen_bo, recorder_unlocked, corridor_307 |
| 33 | 033 | 6s | S6 | **主题句落地** | 林深："你们太相信……声音能代替人了。" | lin_shen, chen_bo, recorder_unlocked |
| 34 | 034 | 6s | S6 | 朝真正的人走过去 | 人群声渐近 | lin_shen, corridor_wide, chen_bo |
| 35 | 035 | 5s | S6 | LEFT 停在屏幕上 | 警铃下的呼吸 | recorder_unlocked, lin_shen |
| 36 | 036 | 7s | S6 | 307 留在身后，朝亮处走去 | 人群声+走廊回响 | lin_shen, corridor_wide, corridor_307 |

---

## 三、生成优先级

先跑以下 7 个关键镜头验证角色/空间/道具一致性，通过后再批量生成全部 36 条：

| 优先级 | Shot | 验证目标 |
|---|---|---|
| ★★★ | 005 | 走廊空间基底 |
| ★★★ | 011 | 307 室空间基底 |
| ★★★ | 020 | 真/假声音方向感 + 双人构图 |
| ★★★ | 024 | LEFT 解锁核心道具 |
| ★★★ | 030 | 高潮动作镜头 |
| ★★★ | 033 | 主题句 + 角色演技 |
| ★★★ | 036 | 尾镜头 + 远景构图 |

---

## 四、合并版（备选）

如需快速原型或模型支持多镜头生成，可用以下 14 条 × 15 秒：

| 幕 | 源文件 | Prompt 编号 |
|---|---|---|
| 第一幕 | `zhengci-zhiwai-act1-video-prompts.md` | P01–P06 |
| 第二幕 | `zhengci-zhiwai-act2-video-prompts.md` | P01–P05 |
| 第三幕 | `zhengci-zhiwai-act3-video-prompts.md` | P01–P03 |

---

## 五、后期补齐时长说明

| 项目 | 建议时长 |
|---|---|
| 片头（黑场+项目名） | 3–5s |
| 场次间过渡黑场/留白 | 5×2s = 10s |
| 主题句后停顿 | 2–3s |
| 尾镜头拉长/缓慢黑场 | 5–8s |
| 片尾字幕"第七码。" | 5–8s |
| 音频混音/呼吸留白 | 分散约 30s |
| **合计可补** | **~60–70s** |

36 条素材 ≈ 200s + 后期补齐 ≈ 60s = **~260s (4.3 min)**，接近 5 分钟目标。
