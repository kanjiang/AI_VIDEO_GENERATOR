# PRISMA — 场景与道具设计（Scene & Prop Design v1）

**用途**：锁定 MV 的所有场景（sets / environments）和 hero 道具的视觉规格，作为后续每个镜头生成时的**环境/道具参考图**。角色 signature 道具已在 `character-identity-boards.md` 中锁定，本文件不再重复。

**归档目录**：`assets/scene-boards/`  
**命名规则**：`prisma-scene-{name}-locked.png` / `prisma-prop-{name}-locked.png`

---

## 全局视觉锁（跨场景一致）

| 项 | 值 |
|---|---|
| 空间基调 | 极简电影棚（cinematic void studio），无自然背景 |
| 地面 | 高反射黑镜面（black mirror floor），可见五色光池倒影 |
| 顶部 | 隐藏顶灯阵，允许可见 LED 灯管做 practicals |
| 大气 | 全场轻雾 haze，禁可见光束（god rays） |
| 色系 | 五色 signature palette：`#1E4A8C 青花蓝 · #FF4D8D 桃红 · #F5F9FF 电光白 · #D4AF37 暹罗金 · #F4801A 藏红花橙` |
| 质感 | 真人实拍 K-pop MV 棚拍质感，ARRI Alexa 色彩科学，35mm 胶片颗粒，禁 3D 渲染、禁游戏引擎、禁 CG 过场感 |

---

## 场景 1 · Void Studio（黑场基础空间）

**用途**：整个 MV 的默认空间。Intro、Verse、Post-Chorus break 等大部分独立成员镜头都在此空间内，只是切换光池颜色。

**关键规格**：
- 尺寸感：无限深黑，无墙壁可见，只有地面反射
- 地面：高反射黑镜面（不是水，是抛光镜面），能清晰看到人物脚部倒影
- 顶部：完全黑，最多有一束下垂光柱（beam of light）
- 空气：细腻 haze，能看到光柱穿过雾气但不能形成 god rays

**图像生成 prompt（真人实拍风格）：**

```
Photorealistic 16:9 empty cinematic music video stage reference photo.
Infinite black void studio with polished black mirror floor showing subtle
reflections. No walls visible, only depth of pure black. Single soft
overhead spotlight from very high above creates a faint circular pool of
light on the floor at center frame. Thin atmospheric haze fills the space
but no visible light beams or god rays. Real photography, ARRI Alexa
color science, subtle 35mm film grain, high dynamic range but not HDR
look, cinematic negative space, K-pop music video empty stage aesthetic.
No people, no props, no logo, no watermark.

Negative: god rays, visible light shafts, illustration, anime, cartoon,
CG render, game engine, walls visible, colored lights (this is the
neutral base), fog machine visible, stage clutter.
```

**生成后归档**：`assets/scene-boards/prisma-scene-void-studio-locked.png`

---

## 场景 2 · Five Color Light Pools（五色光池阵列）

**用途**：每个成员的 solo 段落地面对应一个 signature 颜色光池。副歌时五色同时点亮。

**关键规格**：
- 每个光池是地面上直径约 3m 的圆形彩色光晕，边缘柔和渐弱
- 颜色顺序（面对镜头，画左→画右）：YEON 桃红 · MALI 金 · LAN 青花蓝（中前）· RANI 橙 · SKYE 白
- 中前 LAN 蓝色光池最大（约 4m），因为她是队长中心位
- 光池不是舞台圆盘（不是物理灯箱），是纯光影效果，看起来像光从上方投下
- 光池边缘可能有另一色 shadow bleed（如青蓝池外圈有一圈暗蓝）

**图像生成 prompt（顶视角）：**

```
Photorealistic top-down aerial reference photo of a black cinematic music
video stage floor. Five circular pools of colored light arranged in a
pentagonal formation on a polished black mirror floor: a large central
prussian blue pool (largest, about 4m diameter, slightly forward),
flanked by a peach pink pool on the front-left, a saffron orange pool
on the front-right, a warm gold pool on the back-left, and an electric
white pool on the back-right. Each pool has soft feathered edges bleeding
into pure black surroundings. Thin haze softens the light. No people, no
props, no walls visible. Real photography, ARRI Alexa color, cinematic
studio quality, K-pop stage design aesthetic.

Negative: neon signs, disco dance floor, physical light panels visible
as objects, cartoon, illustration, CG render, god rays, visible fixtures.
```

**生成后归档**：`assets/scene-boards/prisma-scene-five-color-pools-locked.png`

---

## 场景 3 · V-Formation Chorus Stage（副歌集体舞台）

**用途**：Chorus 1 / Chorus 2 / Final Chorus 的核心舞台构图。这是全片主视觉锚点。

**关键规格**：
- 五色光池同时亮起，中央上方悬浮一个透明棱镜（见 Prop 1）
- 从棱镜投下五道对应颜色的光束，落到五个光池上
- 五道光束在雾气中隐约可见（薄雾里的光锥），但不是刺眼 god rays
- 空间感极深，五人 V 字站位占中景，背景完全黑
- 顶部微见 practicals 灯阵反射，营造舞台感但不喧宾夺主

**图像生成 prompt（正面宽景，无人物）：**

```
Photorealistic 16:9 wide reference photo of an empty K-pop music video
chorus stage. Cinematic void studio with polished black mirror floor.
Five circular colored light pools on the floor arranged in a V-formation:
a large prussian blue pool at center-front (main anchor position), peach
pink on the left-middle, electric white on the right-middle, warm gold
on the far-left back, saffron orange on the far-right back. A transparent
crystal prism floats about 3 meters above the center of the stage.
Five colored light beams descend from the prism into each colored pool —
beams are visible in thin haze but soft, not sharp god rays. Deep infinite
black background, no walls. Real photography, ARRI Alexa color science,
subtle 35mm film grain, cinematic depth, high-end K-pop stage aesthetic.
No people, no logo, no watermark.

Negative: god rays too sharp, physical stage equipment visible, walls,
crowd, audience, CG render, illustration, anime, cartoon, disco lights,
strobes, visible fixtures.
```

**生成后归档**：`assets/scene-boards/prisma-scene-v-formation-stage-locked.png`

---

## 场景 4 · Silver Reflective Corridor（银白反光走廊 · SKYE Rap Break）

**用途**：SKYE 的 rap break（1:56-2:14）单独空间。她从这里冲出画面，展现 solo center hype 段。

**关键规格**：
- 一条极长的走廊，两侧是银白色反光金属板墙面（brushed steel + mirror finish 混合）
- 走廊内部无家具无窗，纯视觉反光空间
- 灯光来自地面白色 LED 灯条 + 顶部隐藏灯，色温冷白偏银
- 走廊尽头有一个白色棱镜装置（呼应主概念）
- 反光在镜头运动时会形成 SKYE 的多重倒影

**图像生成 prompt（一点透视，无人物）：**

```
Photorealistic 16:9 reference photo of a long empty modern reflective
corridor for a K-pop music video rap segment. Both side walls are made
of alternating brushed silver metal panels and mirrored panels, floor is
polished light concrete or brushed metal, ceiling has hidden lights
casting cool white glow. LED strip lights run along the floor-wall joint
on both sides. The corridor extends into deep one-point perspective,
ending at a small transparent crystal prism on a low pedestal. Thin haze
softens the far end. Cool color temperature, silver-white palette, sharp
reflections. Real photography, ARRI Alexa, subtle film grain, cinematic
architectural reference. No people, no props other than the far prism,
no logo, no watermark.

Negative: warehouse feel, industrial pipes, dirty surfaces, colored
lights, disco, illustration, anime, CG render, game engine, visible
studio equipment.
```

**生成后归档**：`assets/scene-boards/prisma-scene-silver-corridor-locked.png`

---

## 场景 5 · Overhead Pentagon Light（顶视五角光图）

**用途**：分镜 026、048、064、076 的顶视镜头，五色光池在黑镜面上形成五边形/五芒星几何图案。

**关键规格**：
- 完全顶视（bird's eye），机位正上方
- 五色光池分布形成完美五角/五边形
- 中心可能有白色棱镜的顶部俯视
- 黑镜面反射让画面几何感更强

**图像生成 prompt（顶视）：**

```
Photorealistic 16:9 top-down bird's-eye reference photo of a K-pop music
video stage floor. Five circular pools of colored light on a polished
black mirror floor form a symmetrical pentagon: prussian blue at the
bottom-center-front, peach pink and warm gold on the left and left-back,
electric white and saffron orange on the right and right-back. Center
of the pentagon has a small circular white light and a hint of a
transparent crystal prism seen from above. Thin haze in the air. Perfect
top-down composition, black background beyond the pools. Real photography,
cinematic overhead stage design reference. No people, no watermark.

Negative: tilted angle, side view, walls in frame, illustration, anime,
CG render, disco floor, physical light fixtures visible.
```

**生成后归档**：`assets/scene-boards/prisma-scene-overhead-pentagon-locked.png`

---

## 场景 6 · White Prism Chamber（白色棱镜房间 · Outro Logo）

**用途**：Outro 尾段和 LOGO 落幕的空间。白色反光空间与黑色 void 形成对比。

**关键规格**：
- 纯白色高反射房间，四面墙+地板+天花板都是极简白色
- 中央有一个大棱镜装置（比 hero prism 更大，展台式）
- 白色空间里五道彩色光束仍从棱镜发出，只是最后收束回一束白光
- 极简、静谧、终局感

**图像生成 prompt：**

```
Photorealistic 16:9 reference photo of a minimalist all-white cinematic
prism chamber for a K-pop music video outro. Pure white walls, white
polished floor, white ceiling, seamless corners. Center of the room has
a large transparent crystal prism on a low white pedestal. A single beam
of pure white light enters from above through the ceiling and passes
through the prism, splitting into five faint colored beams (blue, pink,
white, gold, orange) that fade into the white walls. Thin haze softens
edges. Real photography, ARRI Alexa, high-key lighting but with real
shadows, art gallery aesthetic, minimal, quiet, final-frame feeling. No
people, no logo text, no watermark.

Negative: cluttered, colored walls, warm tones (must be cool white),
illustration, anime, CG render, gallery visitors, museum crowd.
```

**生成后归档**：`assets/scene-boards/prisma-scene-white-prism-chamber-locked.png`

---

## 道具 1 · Hero Prism（中央棱镜 · 全片核心 hero prop）

**用途**：整个 MV 的物理隐喻锚点。在多个镜头出现：Intro（001-002）、Post-Chorus break（028）、V-Formation Stage、Overhead pentagon、White prism chamber。

**关键规格**：
- 形状：光学四方棱镜（rectangular prism），高度约 30cm，宽度约 12cm，透明水晶/光学玻璃质感
- 表面：光滑无瑕，内部可见细微光学缺陷（微裂纹、气泡）用于制造折射感
- 悬浮或放置：多数镜头中悬浮在半空，个别镜头（Shot 028）落在黑镜面地板上
- 光效：单束白光穿过棱镜时，从棱镜另一端分裂出五束不同色光
- 不是实体舞台道具的 lo-fi 感，而是电影级光学玻璃

**图像生成 prompt：**

```
Photorealistic 16:9 hero product-style reference photo of a single
optical glass rectangular prism for a music video. Transparent high-clarity
crystal prism, about 30cm tall and 12cm wide, sharp edges, perfectly
polished surfaces. Floats slightly above a polished black mirror floor
in a dark cinematic void studio. A single beam of pure white light enters
from the top of the prism and exits the bottom as five faint colored
light beams: prussian blue, peach pink, electric white, warm gold,
saffron orange. Inside the prism, subtle internal refraction lines and
tiny optical imperfections catch the light. Thin haze in the air. Real
photography, macro-lens sharpness on the prism, cinematic depth, shot on
ARRI Alexa. No people, no logo, no watermark.

Negative: cartoon prism, illustration, anime, cheap plastic prism,
disco ball, chandelier, jewelry, CG render, game engine, rainbow
gradient (this should be five distinct beams, not a rainbow).
```

**生成后归档**：`assets/scene-boards/prisma-prop-hero-prism-locked.png`

---

## 道具补充（角色 signature 道具复用清单）

以下已在 `character-identity-boards.md` 内锁定，本文件不重复生成：

| 道具 | 归属成员 | 出现镜头 |
|---|---|---|
| 折扇（青花蓝丝制，深蓝底金线） | LAN | 016, 017, 019, 023, 031, 032, 044, 075, 080 |
| 长袖韩服上襦（桃红丝缎，喇叭袖 25cm） | YEON | 004-010, 023, 043, 081 |
| 反戴白色棒球帽 | SKYE | 036, 039, 049-057, 082 |
| Chada 低发饰（金色，≤7cm） | MALI | 033, 034, 046, 058-064, 083 |
| 6 片金色尖指甲片 | MALI | 034, 058, 059 |
| 长橙金渐变面纱（3m） | RANI | 011, 012, 015, 025, 047, 067, 070, 084 |
| Tikka 额饰（金链+水滴红宝石） | RANI | 011-015, 025, 047, 067-070 |
| 脚铃 ghungroo | RANI | 014, 068 |

---

## 场景使用矩阵（哪个镜头用哪个场景/道具）

| 分镜 # | 场景 | Hero Prop |
|---|---|---|
| 001-003 | Void Studio + LAN blue pool | Prism 特写 |
| 004-020 | Void Studio + 单色光池切换 | — |
| 021-027 | **V-Formation Stage** | Prism 悬空 |
| 028-030 | Void Studio 局部特写 | Prism 落地 |
| 031-035 | Void Studio + 蓝/金光池 | — |
| 036-040 | **Silver Corridor** | 走廊尽头远端 Prism |
| 041 | Void Studio + Prism 光线吸入 | Prism 中心镜头 |
| 042-049 | **V-Formation Stage** | Prism 悬空 |
| 050-057 | **Silver Corridor** | 走廊 SKYE solo |
| 058-064 | Void Studio + 金光池扩大 | — |
| 065 | 场景过渡（金→橙） | — |
| 066-070 | Void Studio + 橙绿光池 | — |
| 071-076 | **V-Formation Stage**（最亮版本） | Prism 全片最亮 |
| 077-079 | V-Formation → White Prism 吞没 | Prism 中心融白 |
| 080-085 | **White Prism Chamber**（渐入） | Prism 越来越亮 |
| 086 | White Prism Chamber 特写 | Prism 极近 |
| 087 | 黑底 LOGO 落幕 | — |

---

## 下一步生成建议

**先跑 4 张最关键的场景图**（本轮做）：
1. `prisma-prop-hero-prism-locked.png` — hero prop，跨场景复用最多
2. `prisma-scene-void-studio-locked.png` — 基础环境，全片默认背景
3. `prisma-scene-v-formation-stage-locked.png` — 副歌主视觉，全片最重要单张
4. `prisma-scene-silver-corridor-locked.png` — SKYE rap break 专属

**次要 3 张**（后续按需补）：
5. `prisma-scene-five-color-pools-locked.png` — 顶视配合镜头 021/048
6. `prisma-scene-overhead-pentagon-locked.png` — 分镜 026/048/064/076 顶视
7. `prisma-scene-white-prism-chamber-locked.png` — outro 白色房间
