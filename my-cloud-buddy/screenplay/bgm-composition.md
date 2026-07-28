# 《我的专属云朵》BGM 配乐方案

## 项目概览

本片为 105 秒 Pixar 级治愈童年幻想动画。BGM 不进入 AI 视频生成提示词阶段，而是在后期统一生成并混音，避免分段视频自带配乐造成断裂。

核心音乐方向：温暖、童真、轻盈、会呼吸的魔法感。音乐像一朵会陪孩子玩的云，不能太宏大，也不能太商业广告化。

## 情绪弧线

```
音量/密度
  ▲
  │                         ╭──╮  P03 变形游戏
  │              ╭──╮ P02  ╭╯  ╰╮
  │     P01  ╭──╯  ╰──────╯     ╰──╮ P04
  │  ╭──────╯                         ╰──╮ P05
  │╭─╯                                     ╰──╮ P06
  │                                           ╰────╮╭── P07
  ┼──────────────────────────────────────────────────── 时间▶
  0     15     30     45     60     75     90     105s
  热     相遇   玩闹   洗车   雨中   入睡   重逢
```

```
BPM
  ▲
128│                 ╭──── P03 俏皮蒙太奇
118│          ╭──────╯╲
108│     ╭────╯        ╰── P04
 96│╭────╯               ╰── P05
 82│                         ╰── P06
 92│                              ╭── P07
  ┼──────────────────────────────────────── 时间▶
  0     15     30     45     60     75     90     105s
```

## 全局音乐身份

| 项目 | 参数 |
|---|---|
| 总时长 | 105 秒 |
| 主调 | C 大调为主，P06 临时转 A 小调/相对小调色彩，P07 回到 C 大调 |
| 基础 BPM | 104 BPM；P03 提升到 124-128 BPM；P06 降至 78-82 BPM；P07 回到 92 BPM |
| 拍号 | 4/4，P06 局部可带 6/8 摇篮曲摆动 |
| 核心音色 | Celesta / 音乐盒质感钢片琴，代表团团的“魔法云朵” |
| 辅助音色 | pizzicato strings、木琴/马林巴、长笛、单簧管、柔和弦乐垫、竖琴泛音、少量手铃 |
| 打击乐 | 轻木块、brush shaker、soft triangle、轻手鼓，全部低音量 |
| 情绪关键词 | 童真、轻盈、温暖、俏皮、陪伴、睡前安心 |
| 禁止 | 禁人声演唱、禁歌词、禁 EDM、禁 trap、禁 808 bass、禁摇滚吉他、禁厚重史诗鼓、禁过度交响化、禁恐怖悬疑音色 |

## 核心动机

### 主旋律 A（明亮版 · 小夏与团团主题）

BPM=104，4/4，C 大调

```
| 1 3 5 6 | 5 3 2 - |
| 1 3 5 1' | 6 5 3 - |
```

说明：8 小节循环感，前半句像孩子抬头看云，后半句落回温暖安全感。主奏 celesta，长笛在第二遍轻轻跟随高八度。

### 主旋律 B（俏皮变体 · 变形游戏/洗车）

BPM=124，4/4，C 大调

```
| 1 3 5 5 | 6 5 3 1 |
| 2 2 3 5 | 3 2 1 - |
```

说明：同一主题压缩节奏，加入 staccato 木琴与 pizzicato strings。每次团团变形可用上行滑音或竖琴 gliss 作为魔法转场。

### 主旋律 C（柔情版 · 云床/陪伴）

BPM=80，6/8，A 小调转 C 大调

```
| 6. 1 3 | 2 1 6. |
| 5. 6. 1 | 3 2 1 - |
```

说明：保留 A 主题的轮廓，但速度放慢，像摇篮曲。前半句带一点“团团也没有家”的温柔酸感，后半句回到 C 大调，表示陪伴落地。

### 主旋律 D（尾声版 · 第二天重逢）

BPM=92，4/4，C 大调

```
| 1 - 3 - | 5 - 6 - |
| 5 3 2 - | 1 - - - |
```

说明：用 celesta 单音开头，随后长笛和柔弦进入。最后一个 C 大调主和弦长尾，留下“童年想象还会继续”的余韵。

## 分段配乐设计

### P01 — 烈日 / 魔法初遇（0:00-0:15）

| 层 | 内容 |
|---|---|
| 过渡 | 全片从环境热噪中进入，前 2 秒不急着上旋律，只用轻微高频 shimmer 表现刺眼阳光。 |
| 音乐 | 0-8s：木琴单音稀疏点出 C 大调 1、3、5，音量 p；8-10s 冰棍掉落后短暂停顿。10s 团团出现，celesta 第一次演奏主旋律 A 的前 2 小节，音量 pp→mp。 |
| 节奏 | 起始 96 BPM，10s 后渐入 104 BPM。 |
| 音效 | 热浪 shimmer、蝉鸣底噪、冰棍滴落、冰棍掉地小“啪”、团团睁眼魔法叮声。 |
| 情绪 | “热到快哭时，世界忽然递来一小片阴影。” |
| 技法 | 10s 团团睁眼前 0.5 秒音乐抽空，只保留环境音，然后 celesta 进入。 |

### P02 — 遮阳 + 取名（0:15-0:30）

| 层 | 内容 |
|---|---|
| 过渡 | 延续 P01 的 celesta 尾音，加入柔和竖琴泛音。 |
| 音乐 | 主旋律 A 完整出现。celesta 主奏，长笛在 0:23 左右跟入，pizzicato strings 轻轻做 1-5-1 的跳音支撑。 |
| 节奏 | 104 BPM，轻快但不抢对白。 |
| 音效 | 团团展开“噗——”、云絮轻气流、小夏触摸云朵的软棉挤压声、小夏跑步脚步。 |
| 情绪 | “她第一次知道，幻想可以有名字，也可以跟着自己跑。” |
| 技法 | 小夏说“我叫你团团好不好”时，音乐做一次上行 1-3-5-1' 小亮点；团团开心膨胀时 triangle 轻点。 |

### P03 — 变形游戏（0:30-0:45）

| 层 | 内容 |
|---|---|
| 过渡 | P02 的主题尾音直接被木琴接住，进入快节奏蒙太奇。 |
| 音乐 | 主旋律 B 俏皮变体。木琴 + pizzicato strings 主导，加入短促单簧管回答句。每种变形对应一次音色变化：小狗=短笛跳音，小车=木块+轻喇叭感单簧管，兔子=上行竖琴 gliss，恐龙=低音 bassoon 做搞笑“假凶猛”。 |
| 节奏 | 124-128 BPM，四段小循环，每 4 秒一个小落点。 |
| 音效 | 云朵变形“噗噗噗”、云狗软绵“汪”、云车“嘟嘟”、兔子弹跳 boing、恐龙软吼“呜噗”。 |
| 情绪 | “孩子的想象力开始失控，但失控得很可爱。” |
| 技法 | 每次变形前 0.2 秒做短促吸气式 reverse chime，变形完成时给轻木块/triangle 点。 |

### P04 — 洗车（0:45-1:00）

| 层 | 内容 |
|---|---|
| 过渡 | P03 高能结束后，节奏不完全停，保留 pizzicato 的喜剧步伐。 |
| 音乐 | 主旋律 B 降低密度，BPM 回到 112。团团“瞄准”车顶时加入短促弦乐 pizzicato 三连音，雨水落下后长笛演奏明亮上行句。 |
| 节奏 | 112 BPM，带一点“解决问题”的轻快节奏。 |
| 音效 | 海绵擦车、水桶水声、第一滴水“啪嗒”、雨水打车顶、车身变亮 sparkle。 |
| 情绪 | “她发现团团不只是朋友，还是童年里最万能的小帮手。” |
| 技法 | 10s 正式下雨时音乐短暂停顿 0.25s，让雨声先出现，再由木琴和长笛接回节奏。 |

### P05 — 挡雨（1:00-1:15）

| 层 | 内容 |
|---|---|
| 过渡 | 洗车水声自然过渡为雨声，BGM 由明亮 C 大调转成更柔软的 F 大调色彩。 |
| 音乐 | 主旋律 A 的慢一点版本，celesta + 柔和弦乐垫。雨中不使用太多打击乐，保留空间给雨声和对白。 |
| 节奏 | 96 BPM，轻摇摆。 |
| 音效 | 中雨环境、雨点被团团吸收的“噗噗”、脚步踩水、小男孩惊讶轻呼、团团延伸小云的柔软 whoosh。 |
| 情绪 | “专属并不自私，真正的好朋友会把温柔分给别人一点。” |
| 技法 | 小夏说“这是我的专属云朵”时，音乐做一个可爱的骄傲上行；团团帮小男孩挡雨时，主旋律用长笛轻柔复现，音量 mp。 |

### P06 — 云床（1:15-1:30）

| 层 | 内容 |
|---|---|
| 过渡 | 雨声逐渐淡出，进入黄昏虫鸣。BGM 从 F 大调悬停音转入 A 小调柔情版。 |
| 音乐 | 主旋律 C。celesta 单音 + 柔弦长音 + 竖琴泛音。10s 小夏扑进云床时加入一次极轻的 harp gliss；13s 开始音乐降至 pp，像摇篮曲。 |
| 节奏 | 80 BPM，6/8 摇篮曲摆动。 |
| 音效 | 小夏打哈欠、团团变床的软云拉伸、小夏陷入云床“噗”、低频轻呼噜、微风、夜虫。 |
| 情绪 | “玩了一天以后，最好的朋友变成最软的家。” |
| 技法 | “你有家吗？”后留下 0.7 秒几乎静默，只保留虫鸣和一个未解决的柔弦音；小夏邀请团团住窗外后，和弦从 A 小调转回 C 大调。 |

### P07 — 尾声·彩蛋（1:30-1:45）

| 层 | 内容 |
|---|---|
| 过渡 | P06 的摇篮曲尾音淡入清晨鸟鸣，celesta 单音重新点亮。 |
| 音乐 | 主旋律 D 尾声版。0-6s 只有 celesta；6s 团团探出窗外时加入长笛高八度；10s 小夏摸团团后弦乐垫进入，最后 5 秒回到主旋律 A 的前半句，形成完整呼应。 |
| 节奏 | 92 BPM，节奏轻但有“新的一天”的推进感。 |
| 音效 | 清晨鸟鸣、窗帘拉开、赤脚跑地板、团团偷看的小叮声、团团吃阳光的柔和 shimmer。 |
| 情绪 | “原来昨天不是梦，它真的在窗外等她。” |
| 技法 | 结尾字幕出现时，BGM 保留最后一个 Cmaj9 和弦，长尾 3-4 秒自然衰减。 |

## AI 音乐生成提示词

### Suno / Udio Full Track Prompt（推荐先生成整曲）

```text
[Instrumental] [Music Box] [Celesta] [Whimsical Pixar Animation Score]

A 105-second warm celesta theme for a Pixar-style children's animation about a little Chinese girl and her personal magic cloud friend.

Style: celesta music-box melody + pizzicato strings + soft marimba + flute + clarinet + gentle harp glissandi + warm soft string pad. Inspired by Joe Hisaishi's childlike warmth and Alexandre Desplat's delicate whimsy, but smaller and more intimate. Light, airy, magical, playful, tender. No vocals, no lyrics, no EDM, no trap beat, no 808 bass, no rock guitar, no epic drums, no aggressive percussion, no horror tones.

Structure:
[Intro 0:00-0:15] Hot summer stillness, sparse marimba notes, shimmer heat texture, celesta magic motif enters at 0:10 when the cloud appears. C major, BPM 96 to 104.
[Warm Friendship 0:15-0:30] Full main theme on celesta with flute doubling, gentle pizzicato strings, cozy and bright. BPM 104.
[Playful Montage 0:30-0:45] Faster playful variation, marimba and pizzicato strings, short clarinet replies, cute transformation accents, light comedic energy. BPM 126.
[Helpful Comedy 0:45-1:00] Keep playful rhythm but lighter, water-sparkle harp accents, cheerful problem-solving mood. BPM 112.
[Rainy Tenderness 1:00-1:15] Softer rain-day version, celesta + warm string pad, less percussion, gentle and caring. BPM 96.
[Lullaby 1:15-1:30] Slow 6/8 lullaby, celesta solo with soft strings and harp harmonics, A minor color resolving back to C major, sleepy and emotional. BPM 80.
[Morning Reunion 1:30-1:45] Return to bright C major theme, celesta then flute then soft strings, hopeful new-day ending, final long Cmaj9 chord with natural fade. BPM 92.

Mood: childlike, warm, magical, cloud-light, playful, tender, bedtime-safe, hopeful
```

### 可灵音乐中文提示词

```text
纯器乐，105秒，治愈系 Pixar 童年幻想动画配乐。

核心音色：钢片琴/音乐盒音色作为主旋律，搭配拨奏弦乐、轻木琴、长笛、单簧管、竖琴滑音、柔和弦乐铺底。整体像一朵会陪孩子玩的云，轻盈、温暖、童真、柔软。

结构：
0:00-0:15 炎热夏日，音乐稀疏，热浪感，高频轻微闪烁，0:10 云朵出现时钢片琴魔法主题进入。
0:15-0:30 遮阳与取名，C大调主旋律完整出现，温暖明亮。
0:30-0:45 变形游戏，BPM提升到126，木琴和拨奏弦乐做俏皮节奏，配合小狗、小车、兔子、恐龙的可爱变化。
0:45-1:00 洗车喜剧，节奏轻快但不吵，雨水落下时加入竖琴水光滑音。
1:00-1:15 雨天挡雨，音乐变柔和，雨声空间感，钢片琴和柔弦保留温柔陪伴感。
1:15-1:30 黄昏云床，转为80BPM摇篮曲，6/8摆动，A小调色彩慢慢回到C大调。
1:30-1:45 清晨重逢，回到C大调，钢片琴、长笛、柔弦逐层进入，最后一个温暖长和弦自然收束。

禁止：人声、歌词、EDM、电子舞曲、trap、808低音、摇滚吉他、厚重史诗鼓、恐怖悬疑音色、过度交响化。
情绪关键词：童真、温暖、魔法感、俏皮、陪伴、睡前安心、希望。
```

## 分段生成备选方案

当整曲时间点不够准确时，分 4 段生成并后期交叉淡入淡出：

1. `BGM-01_meeting_theme.wav`（0:00-0:30）：热浪到相遇，C 大调，96→104 BPM，celesta + flute。
2. `BGM-02_playful_cloud.wav`（0:30-1:00）：变形游戏 + 洗车，C 大调，126→112 BPM，marimba + pizzicato + clarinet。
3. `BGM-03_rain_lullaby.wav`（1:00-1:30）：雨天温柔 + 云床，F 大调转 A 小调再回 C，96→80 BPM，celesta + soft strings + harp。
4. `BGM-04_morning_reunion.wav`（1:30-1:45）：清晨重逢，C 大调，92 BPM，celesta + flute + warm strings。

## SFX 时间线

| 编号 | 音效名称 | 时间点 | 混音音量 | 来源建议 |
|---|---|---:|---:|---|
| SFX-01 | summer_cicadas_heat_hum | 0:00 | -12 dB | Pixabay / BBC：cicadas, summer ambience |
| SFX-02 | popsicle_drip | 0:06 | -3 dB | DIY：水滴落小碟 |
| SFX-03 | popsicle_drop_soft | 0:09 | -2 dB | Mixkit：soft object drop |
| SFX-04 | magic_cloud_eye_ping | 0:11 | -4 dB | Mixkit：soft chime / bell |
| SFX-05 | cloud_expand_soft_whoosh | 0:16 | -3 dB | 自制：呼气 + 布料摩擦，或 AI SFX |
| SFX-06 | cloud_touch_squish | 0:27 | -3 dB | DIY：揉棉花/海绵近录 |
| SFX-07 | child_running_footsteps | 0:29 | -4 dB | Mixkit：child footsteps / small footsteps |
| SFX-08 | cloud_transform_puffs | 0:31 | -2 dB | AI SFX：soft airy puff sequence |
| SFX-09 | cloud_puppy_soft_bark | 0:34 | -3 dB | AI SFX：cute airy puppy bark |
| SFX-10 | cloud_car_toot | 0:39 | -4 dB | Mixkit/AI：tiny toy horn |
| SFX-11 | bunny_boing | 0:42 | -3 dB | Mixkit：cartoon boing, very soft |
| SFX-12 | dino_soft_roar_puff | 0:44 | -2 dB | AI SFX：cute soft roar + air puff |
| SFX-13 | sponge_car_wipe | 0:46 | -3 dB | BBC/Mixkit：sponge wiping |
| SFX-14 | first_raindrop_on_car | 0:54 | -2 dB | DIY：water drop on metal/plastic |
| SFX-15 | rain_on_car_roof | 0:55 | -6 dB | Pixabay：rain on car |
| SFX-16 | sparkle_clean_car | 0:58 | -5 dB | Mixkit：soft sparkle chime |
| SFX-17 | steady_rain_ambience | 1:00 | -10 dB | Pixabay/BBC：steady rain street |
| SFX-18 | cloud_absorb_raindrops | 1:03 | -5 dB | AI SFX：soft wet puff / sponge absorb |
| SFX-19 | umbrella_flip_background | 1:06 | -8 dB | Mixkit：umbrella/wind cloth flap |
| SFX-20 | comic_book_page | 1:08 | -4 dB | DIY：page flip |
| SFX-21 | small_boy_wow | 1:10 | -6 dB | 可由配音或 TTS 生成，极短远场 |
| SFX-22 | evening_crickets_wind | 1:15 | -12 dB | Pixabay：evening crickets, light breeze |
| SFX-23 | child_yawn | 1:17 | -5 dB | 配音录制或 TTS |
| SFX-24 | cloud_bed_morph | 1:22 | -4 dB | AI SFX：large soft cloud stretch |
| SFX-25 | cloud_bed_plop | 1:25 | -3 dB | DIY：pillow impact + breath |
| SFX-26 | cloud_purr | 1:27 | -8 dB | AI SFX：soft low purr, airy |
| SFX-27 | morning_birds_roomtone | 1:30 | -12 dB | Pixabay：morning birds |
| SFX-28 | curtain_open | 1:35 | -4 dB | Mixkit/BBC：curtain slide |
| SFX-29 | cloud_peek_chime | 1:37 | -4 dB | soft celesta/bell one-shot |
| SFX-30 | child_barefoot_run | 1:42 | -5 dB | DIY/Mixkit：small barefoot steps |

## 混音技术建议

- 对白优先级最高。BGM 全片平均建议 -18 LUFS 左右，台词出现时 duck 到 -22 LUFS。
- SFX 与对白重叠时，SFX 保持在 -6 到 -10 dB，不抢女童声。
- P03 可稍微提高打击乐和 SFX，但避免“卡通综艺音效”过度。
- P06 云床段需要最大的动态留白，音乐宁可少，不要堆满。
- P07 结尾字幕处 BGM 可稍微抬高 1-2 dB，作为最终情绪收束。

## 混音脚本时间线草案

```python
VIDEO_DURATION_S = 105

SFX_TIMELINE = [
    ("SFX-01_summer_cicadas_heat_hum.wav", 0.0, -12),
    ("SFX-02_popsicle_drip.wav", 6.0, -3),
    ("SFX-03_popsicle_drop_soft.wav", 9.0, -2),
    ("SFX-04_magic_cloud_eye_ping.wav", 11.0, -4),
    ("SFX-05_cloud_expand_soft_whoosh.wav", 16.0, -3),
    ("SFX-06_cloud_touch_squish.wav", 27.0, -3),
    ("SFX-07_child_running_footsteps.wav", 29.0, -4),
    ("SFX-08_cloud_transform_puffs.wav", 31.0, -2),
    ("SFX-09_cloud_puppy_soft_bark.wav", 34.0, -3),
    ("SFX-10_cloud_car_toot.wav", 39.0, -4),
    ("SFX-11_bunny_boing.wav", 42.0, -3),
    ("SFX-12_dino_soft_roar_puff.wav", 44.0, -2),
    ("SFX-13_sponge_car_wipe.wav", 46.0, -3),
    ("SFX-14_first_raindrop_on_car.wav", 54.0, -2),
    ("SFX-15_rain_on_car_roof.wav", 55.0, -6),
    ("SFX-16_sparkle_clean_car.wav", 58.0, -5),
    ("SFX-17_steady_rain_ambience.wav", 60.0, -10),
    ("SFX-18_cloud_absorb_raindrops.wav", 63.0, -5),
    ("SFX-19_umbrella_flip_background.wav", 66.0, -8),
    ("SFX-20_comic_book_page.wav", 68.0, -4),
    ("SFX-21_small_boy_wow.wav", 70.0, -6),
    ("SFX-22_evening_crickets_wind.wav", 75.0, -12),
    ("SFX-23_child_yawn.wav", 77.0, -5),
    ("SFX-24_cloud_bed_morph.wav", 82.0, -4),
    ("SFX-25_cloud_bed_plop.wav", 85.0, -3),
    ("SFX-26_cloud_purr.wav", 87.0, -8),
    ("SFX-27_morning_birds_roomtone.wav", 90.0, -12),
    ("SFX-28_curtain_open.wav", 95.0, -4),
    ("SFX-29_cloud_peek_chime.wav", 97.0, -4),
    ("SFX-30_child_barefoot_run.wav", 102.0, -5),
]
```

