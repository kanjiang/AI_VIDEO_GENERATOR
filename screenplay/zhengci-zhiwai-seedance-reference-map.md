# 《证词之外》Seedance 参考图对照表

用途：按镜号快速确认生成时应该把哪些角色、环境、道具以 `@image` 形式写进提示词正文。

使用规则：

1. `@image1`、`@image2` 的编号跟随你本次上传顺序变化
2. 括号里的名字保持稳定，例如 `LinShen`、`ChenBo`、`Room307Entry`
3. 角色放前面，场景放后面，道具最后；如果镜头是纯场景或纯道具，不要硬塞角色图
4. 只要最终提示词正文里已经写了对应的 `@image` 行，编号是否和本表一致不是最重要的，最重要的是角色/环境绑定正确

---

## 第一幕 Act 1

| Shot | 推荐写入的 @image |
| --- | --- |
| 001 | `@image1 (RecorderError)` + `@image2 (LinShen)` |
| 002 | `@image1 (LinShen)` + `@image2 (RecorderError)` |
| 003 | `@image1 (LinRoomDesk)` + `@image2 (EnvelopeNote)` + `@image3 (RecorderError)` |
| 004 | `@image1 (LinShen)` + `@image2 (LinRoomWide)` + `@image3 (RecorderError)` + `@image4 (EnvelopeNote)` |
| 005 | `@image1 (CorridorWide)` |
| 006 | `@image1 (Corridor307)` + `@image2 (Notice)` + `@image3 (FireAlarm)` |
| 007 | `@image1 (LinShen)` + `@image2 (EnvelopeNote)` + `@image3 (RecorderError)` |
| 008 | `@image1 (LinShen)` + `@image2 (Corridor307)` |
| 009 | `@image1 (SensorBox)` + `@image2 (LinShen)` |
| 010 | `@image1 (ChenBo)` |
| 011 | `@image1 (LinShen)` + `@image2 (Room307Entry)` + `@image3 (SpeakerOn)` |
| 012 | `@image1 (SpeakerOn)` |
| 013 | `@image1 (LinShen)` + `@image2 (Room307Entry)` + `@image3 (SpeakerOn)` |
| 014 | `@image1 (SpeakerOn)` + `@image2 (LinShen)` |
| 015 | `@image1 (LinShen)` + `@image2 (RecorderError)` |
| 016 | `@image1 (LinShen)` + `@image2 (Room307Entry)` + `@image3 (RecorderError)` |

---

## 第二幕 Act 2

| Shot | 推荐写入的 @image |
| --- | --- |
| 017 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (Room307Reverse)` + `@image4 (SpeakerOn)` |
| 018 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (Room307Reverse)` + `@image4 (SpeakerOn)` + `@image5 (RecorderError)` |
| 019 | `@image1 (SensorBox)` + `@image2 (Room307Reverse)` + `@image3 (LinShen)` |
| 020 | `@image1 (LinShen)` + `@image2 (Room307Reverse)` + `@image3 (ChenBo)` + `@image4 (RecorderError)` |
| 021 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (RecorderError)` + `@image4 (Room307Reverse)` |
| 022 | `@image1 (RecorderError)` |
| 023 | `@image1 (LinShen)` + `@image2 (RecorderError)` + `@image3 (ChenBo)` |
| 024 | `@image1 (RecorderUnlocked)` + `@image2 (LinShen)` |
| 025 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (RecorderUnlocked)` + `@image4 (Room307Reverse)` |
| 026 | `@image1 (LinShen)` + `@image2 (RecorderUnlocked)` + `@image3 (ChenBo)` |
| 027 | `@image1 (LinShen)` + `@image2 (SensorBox)` + `@image3 (SpeakerOff)` + `@image4 (Room307Reverse)` |
| 028 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (Room307Reverse)` + `@image4 (SpeakerOff)` + `@image5 (RecorderUnlocked)` |

---

## 第三幕 Act 3

| Shot | 推荐写入的 @image |
| --- | --- |
| 029 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (SpeakerOff)` + `@image4 (Room307Reverse)` |
| 030 | `@image1 (SpeakerOff)` + `@image2 (FireAlarm)` + `@image3 (Corridor307)` + `@image4 (LinShen)` |
| 031 | `@image1 (CorridorWide)` + `@image2 (Corridor307)` |
| 032 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (RecorderUnlocked)` + `@image4 (Corridor307)` |
| 033 | `@image1 (LinShen)` + `@image2 (ChenBo)` + `@image3 (RecorderUnlocked)` |
| 034 | `@image1 (LinShen)` + `@image2 (CorridorWide)` + `@image3 (ChenBo)` |
| 035 | `@image1 (RecorderUnlocked)` + `@image2 (LinShen)` |
| 036 | `@image1 (LinShen)` + `@image2 (CorridorWide)` + `@image3 (Corridor307)` |

---

## 最稳的 Seedance 写法

如果一个镜头里既有人物又有场景又有道具，推荐顺序是：

1. 角色
2. 场景
3. 道具

示例：

```text
@image1 (LinShen) — 参考 lin_shen.png。
@image2 (Room307Reverse) — 参考 room_307_reverse.png。
@image3 (RecorderError) — 参考 recorder.png。
```

不要为了保险把所有图都塞进去。镜头只锁定真正需要稳定的角色、环境和关键道具。
