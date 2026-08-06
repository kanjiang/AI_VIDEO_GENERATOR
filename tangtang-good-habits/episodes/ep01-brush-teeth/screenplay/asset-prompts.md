# Ep01 · 资产提示词（角色 + 道具）

《牙刷小英雄》**角色身份板** 与 **关键道具特写板** 生成提示词。每个 prompt 可以直接复制到 **Midjourney / 即梦 AI / Nano Banana / Runway / SeedDream** 等图像模型使用。

**姊妹文件**：场景板 prompts 见 [scene-prompts.md](./scene-prompts.md)。

**内容速览**：

- **一、糖糖 · 主角身份板**（IP 跨集通用）
- **二、牙刷警长 · 守护者身份板**
- **三、糖糖菌军团 · 反派身份板**
- **四、牙齿小方块 · 拟人化配角身份板**
- **五、生日蛋糕 · 关键道具特写板**（新增）
- **六、牙杯组合 · 关键道具特写板**（新增 · 跨集复用）
- **七、月亮夜灯 · 关键道具特写板**（新增 · Ep02 主角本体）
- **附录 · 字幕与特效交给后期处理**（不用图像生成）

## 使用建议

### 生成顺序（推荐）

1. **糖糖**（IP 跨集主角，最重要，先做）→ 通过后成为其他角色的"参考风格锚点"
2. **牙刷警长**（Ep01 主守护者）
3. **糖糖菌军团**（Ep01 反派 · Boss + 小兵）
4. **牙齿小方块**（Ep01 特色配角 · 4 种情绪状态）

### 迭代策略

- 每个角色**先跑 3-4 张**，选出最合适的 1 张作为"锁定版身份板"
- 后续做场景板、视频提示词时，把这张身份板作为**参考图**输入
- 糖糖的身份板会跨集使用 8+ 集，值得多迭代几次做到完美

### 模型选型建议

| 模型 | 适合角色 | 备注 |
| --- | --- | --- |
| 即梦 AI 3.0 | 全部 | 中文语义理解好，皮克斯风稳定 |
| Midjourney V6.1 | 糖糖、牙刷警长 | 皮克斯风表现最佳 |
| Nano Banana | 糖糖菌、牙齿方块 | Q 版怪兽拟人表现好 |
| Seedream 3.0 | 全部 | 一致性好，适合做参考图使用 |

### 参数建议

- 比例：**16:9**
- 风格提示词补充："**Pixar 3D animation style, character sheet, candy color palette, soft lighting**"（英文可直接加在 prompt 后）

---

## 一、糖糖 · 主角身份板（**IP 跨集通用 · 最高优先级**）

**糖糖角色身份板提示：**

创建一张艺术性的 16:9 角色身份板。

[主体]：一个 4 岁半的亚洲小女孩糖糖。3D 皮克斯风格造型（类似《月神 La Luna》里小男孩的头身比、《头脑特工队》Riley 小时候的圆润脸型）。圆脸，苹果肌明显，小麦白健康肤色，红润脸颊。大眼睛，棕色瞳孔，双眼皮，眼神天真明亮。小圆鼻子。**门牙有明显的两颗小方块**（未来刷牙特写会用到，是关键辨识特征）。头发是浅棕色齐耳短发，头顶两个小啾啾用**红色发圈**扎起来。身高比例是 3D 皮克斯"小英雄"造型的头身比 1:3，圆滚滚可爱，手脚是短短胖胖的婴儿肥造型。

[背景]：纯白色或柔和的米白色背景。无环境、无道具、无标志、无水印。

[设计方向]：不要创建标准的角色参考表。创建一张电影般的身份板，感觉像是皮克斯或梦工厂动画工作室的角色研究与艺术书布局的结合。布局应不对称、优雅且视觉上令人难忘，使用大片留白、多样化的图像比例和有意的不平衡。避免网格、蓝图设计、目录布局和重复的转场展示。

[重要布局规则]：不要重叠任何角色图像。每个视角必须有清晰的分离和呼吸空间。保持所有全身研究、轮廓和细节区的视觉区分。⚠️**所有人物视角必须为全身图（从头顶到脚底完整可见）**，禁止半身、膝盖以上或胸部以上的裁切。表情可读性通过全身景别下的脸部清晰度解决。

[主要构图]：放置一个**大型英雄全身视角**在画面偏左侧作为视觉锚点——糖糖穿着 **"生日装"**（粉黄条纹连衣裙 + 白色小圆领 + 头戴红色生日纸帽），咧嘴大笑露出门牙，眼睛眯成月牙，双手举起自然摆臂，姿态活泼快乐。围绕这个英雄视角，以干净的间距排列较小的辅助全身研究：

- **辅助 1**：糖糖穿 **"粉色小睡衣"**（粉色卡通图案睡衣，软棉质感），揉着眼睛打大哈欠的全身姿态
- **辅助 2**：糖糖穿 **"浅蓝色小睡衣"**（同款不同色）的全身正面姿态
- **辅助 3**：糖糖穿 **"生日装"** 的**背面**全身视角（露出后脑双啾啾发型）
- **辅助 4**：糖糖穿 **"生日装"** 的**侧面**全身视角，眼神直视观众挥手邀请的姿态
- **辅助 5**：糖糖穿 **"粉色小睡衣"** 的**蹲坐姿势**全身（准备睡觉前的坐床边动作）

[身份锁定]：在所有视角中保持严格的身份一致性：**相同的圆脸苹果肌、相同的棕色大眼、相同的浅棕色齐耳短发+红色发圈双啾啾、相同的门牙两颗小方块、相同的 3D 皮克斯圆润身体比例、相同的甜美天真表情基调、相同的糖果色调**。

[表情研究区]：右上角设置一个小型表情研究区（inset，不替代全身锚点），包含 4 个头肩微缩：**灿烂大笑**（眼睛眯月牙、露门牙）、**打哈欠揉眼**、**惊恐捂嘴**（眼睛瞪圆、眉毛上扬）、**泪汪汪委屈**（眼睛湿润、微微皱眉，不能真痛哭）。

[轮廓研究区]：右下角设置一个小型黑色剪影研究区，展示 3 个糖糖的简化黑色轮廓，用于确认整体身形辨识度——一个站立、一个挥手、一个蹲下。

[细节研究区]：左下角设置一个小型细节研究区，特写呈现：糖糖的**头顶双啾啾发圈细节**、**门牙两颗小方块特写**、**红色发圈色卡**、**粉黄条纹连衣裙的条纹方向和圆领设计**、**粉色睡衣的卡通印花细节**。

[文本设计]：添加一个时尚的角色 ID 块，风格简约、大胆、艺术导向。仅使用：**"糖糖 · Tang Tang / 4.5 岁 · 幼儿园中班 / 主角 · 甜美天真爱糖糖 / 视觉标志：双啾啾 · 门牙小方块"**。仅在有帮助的地方使用小型手写风格标签（如"生日装 A"、"粉睡衣 B"、"蓝睡衣 C"）。允许使用细微的编辑箭头指向面部/服装细节。

[风格]：简约、电影感、高端、艺术书般、干净、富有表现力、适用于 AI 视频制作。3D 皮克斯动画渲染质感（次表面散射皮肤、柔和全局光照、Q 版比例）。糖果色系（暖粉 + 淡黄 + 白 + 淡蓝）。

[最终目标]：最终图像应感觉像一张艺术性的角色身份板，旨在帮助 AI 视频模型精确锁定糖糖的面部、发型、双啾啾、门牙、身体比例、3 套服装、以及情感表现范围——**这张身份板将跨集复用于《糖糖的小英雄》系列全 8 集**。

**负面约束**：no color drift across views, no anime style, no realistic child photograph, no half-body cropping, no bust shot, no waist-up shot, no overlapping figures, no grid layout, no blueprint chart, no adult proportions, no dark background, no lipstick or heavy makeup, no long hair, no big-eye anime style, no watercolor, no glossy poster look.

---

## 二、牙刷警长 · 守护者身份板

**牙刷警长角色身份板提示：**

创建一张艺术性的 16:9 角色身份板。

[主体]：一位**拟人化的儿童牙刷英雄"刷刷警长"**。本体是一把**宝石蓝色刷柄**的儿童牙刷，被赋予了英雄拟人化设计：刷柄顶部有两只圆亮的白色大眼睛（黑色瞳孔，眼神坚定友善），下方是一张自信微笑的小嘴。刷柄两侧长出**两只小白手套的手**（Q 版拳套感）。**刷毛**是他的胡子/下巴，可以像掸子一样挥舞。头顶戴着**一顶红色警帽**，帽檐前有一颗**金色五角星徽章**。整体是 3D 皮克斯拟人化风格（类似《汽水杯 Piper》里的道具拟人 + 《小黄人》的圆润体型），憨萌但有英雄气。

[背景]：纯白色或柔和的米白色背景。无环境、无道具、无标志、无水印。

[设计方向]：不要创建标准的角色参考表。创建一张电影般的身份板，感觉像是皮克斯短片"道具拟人英雄"研究图。布局应不对称、优雅、视觉上令人难忘，使用大片留白、多样化图像比例和有意的不平衡。避免网格、蓝图设计和重复的转场展示。

[重要布局规则]：不要重叠任何角色图像。每个视角必须有清晰的分离和呼吸空间。⚠️**所有人物视角必须为全身图（从警帽顶到刷柄底部完整可见）**，禁止半身或截断。

[主要构图]：放置一个**大型英雄全身视角**在画面偏左作为视觉锚点——刷刷警长正面站立姿态，红色警帽戴正，白手套双手叉腰，胸口挺出，刷毛胡子微微上翘，眼神炯炯有神，一副"交给我"的英雄气。围绕这个英雄视角，以干净的间距排列较小的辅助全身研究：

- **辅助 1**：刷刷警长**敬礼**全身姿态（右手抬到警帽边）
- **辅助 2**：刷刷警长**挥舞刷毛战斗**全身动作（刷柄斜出，刷毛横扫出动感线条）
- **辅助 3**：刷刷警长**失望叹气**全身姿态（Beat 2 被糖糖忽视时——两手垂下，警帽微微歪斜，肩膀塌陷，嘴角撇下）
- **辅助 4**：刷刷警长**骄傲敬礼**全身姿态（Beat 9-10 胜利时——挺胸、下巴微抬、警帽金星闪光）
- **辅助 5**：刷刷警长的**侧面**全身视角，展示刷柄的完整侧影和刷毛胡子的方向
- **辅助 6**：刷刷警长的**背面**全身视角，展示警帽后脑、白手套的手臂、蓝色刷柄的完整后侧

[身份锁定]：在所有视角中保持严格的身份一致性：**相同的宝石蓝刷柄、相同的红色警帽 + 金星徽章、相同的白手套、相同的白色刷毛胡子、相同的圆眼睛+黑瞳孔、相同的自信微笑、相同的 Q 版比例**。

[表情研究区]：右上角设置一个小表情研究区，包含 4 个头部微缩：**坚定英雄脸**、**敬礼式微笑**、**叹气失望脸**（眼睛半闭、嘴角撇下）、**骄傲挺胸脸**（下巴微抬、嘴角上扬）。

[轮廓研究区]：右下角设置一个小型黑色剪影研究区，展示 3 个刷刷警长的简化黑色轮廓——一个叉腰站立、一个挥刷战斗、一个敬礼——确认整体身形辨识度。

[细节研究区]：左下角设置一个小型细节研究区，特写呈现：**红色警帽 + 金色五角星徽章特写**、**白手套的手部造型**、**刷毛胡子的纹理与蓬松感**、**宝石蓝刷柄的质感（Q 版塑料玩具感，不能真实医疗牙刷感）**、**眼神的坚定光泽**。

[文本设计]：添加一个时尚的角色 ID 块："**刷刷警长 · Brush Chief / 糖糖的口腔守护者 / 正义 · 憨萌 · 英雄气 / 视觉标志：红警帽金星 · 白手套 · 刷毛胡子**"。小型手写风格标签："警长敬礼式"、"叹气 Beat 2"、"骄傲 Beat 9"。

[风格]：简约、电影感、高端、艺术书般、干净、富有表现力。3D 皮克斯拟人化道具风格（Q 版塑料玩具质感 + 拟人五官 + 英雄符号）。糖果色系（宝石蓝 + 大红警帽 + 白手套 + 金色徽章）。

[最终目标]：最终图像应帮助 AI 视频模型精确锁定牙刷警长的**"儿童牙刷本体 + 拟人五官 + 英雄符号"** 三重设计——**这张身份板会跨集使用，Ep02 中他会以 1 秒彩蛋镜头出现，未来 Ep03 洗手集数也可能有互动**。

**负面约束**：no realistic medical toothbrush, no adult brand toothbrush design, no military hard face, no scary villain look, no anime style, no comic book style, no dark tones, no polished 2D illustration, no half-body crop, no logo, no watermark, no product advertisement layout.

---

## 三、糖糖菌军团 · 反派身份板

**糖糖菌军团角色身份板提示：**

创建一张艺术性的 16:9 角色身份板，展示**《牙刷小英雄》反派军团**——蛀牙菌军团的 Boss "糖糖菌" 和三种配色小兵。

[主体]：一群**圆滚滚软软的 Q 版拟人化小怪兽**——蛀牙菌军团。他们的核心造型是：**球体身躯**（约 60% 是身体，40% 是眼睛头部），一只巨大的圆眼睛（比脸大），咧到耳根的坏笑嘴巴，露两颗小尖牙（不能狰狞，要蠢萌），两只短短胖胖的小手手，两条短短胖胖的小腿。整体像**发光糖果玩具 + 小黄人 + 海底小纵队坏细菌**的混合，可爱蠢萌但不能真恐怖。

**Boss "糖糖菌"** 的差异化特征：
- 大小比小兵大约 1.5 倍
- 主体颜色：亮粉色 + 紫色斑点
- **头顶戴一顶小小的糖果色皇冠**（表示"糖派对之王"）
- 表情：兴奋、贪吃、傻里傻气的坏笑

**三种小兵配色**：
- A 型：紫色主体 + 粉色斑点
- B 型：黄绿色主体 + 橙色斑点
- C 型：粉色主体 + 白色斑点

[背景]：纯白色或柔和的米白色背景。无环境、无道具、无标志、无水印。

[设计方向]：不要创建标准的角色参考表。创建一张电影般的**反派军团艺术书**身份板——像皮克斯《海底小纵队》坏细菌配色研究、或《卑鄙的我》小黄人军团研究。布局不对称、留白、优雅。**反派整体调性必须蠢萌坏，不能真恐怖**（3-6 岁儿童受众第一原则）。

[重要布局规则]：不要重叠任何角色图像。每个视角必须有清晰的分离和呼吸空间。⚠️**所有人物视角必须为全身图**（从头顶皇冠到小脚底完整可见）。

[主要构图]：放置一个**大型英雄全身视角**在画面偏中作为视觉锚点——**糖糖菌 Boss** 双手举起一颗糖果块，咧嘴大笑露出两颗小尖牙，戴着小皇冠，一副"糖糖来啦！派对开始！"的兴奋姿态。围绕这个英雄视角，以干净的间距排列较小的辅助全身研究：

- **辅助 1**：糖糖菌 Boss 的 **"通宵派对版"** 全身——戴着**夜光荧光帽**（Beat 3 特殊装扮），激动欢呼
- **辅助 2**：糖糖菌 Boss **打嗝喷酸水**的动作全身——肚子鼓起来，嘴巴张成"呃！"形状，酸水弧线
- **辅助 3**：糖糖菌 Boss **惊慌**全身——大眼睛瞪得更圆、嘴巴张成 O 形、原地跳起（Beat 4 警长来时）
- **辅助 4**：糖糖菌 Boss **溃败哭喊逃跑**全身——抱头鼠窜、眼角挂泪、嘴巴喊"我们走啦"（不能真痛苦，要滑稽）
- **辅助 5**：三只小兵**并排全身**（A 紫粉 / B 黄绿橙 / C 粉白），身形完全相同只是配色不同
- **辅助 6**：糖糖菌 Boss 的**背面全身**（露出小皇冠后侧、圆滚滚屁股）
- **辅助 7**：糖糖菌 Boss 的**侧面全身**（展示他球体身躯的完整侧影）

[身份锁定]：在所有视角中保持严格的身份一致性：**相同的圆球身躯基础形态、相同的巨大单眼睛（比脸大）、相同的咧嘴坏笑露两小尖牙、相同的短小四肢、相同的糖果色调（不能出现暗色/血色/军色）、相同的蠢萌坏气质**。Boss 与小兵之间只在**尺寸大小 + 皇冠 + 主色**上有差异，基础造型完全一致。

[表情研究区]：右上角设置一个小表情研究区，包含 4 个 Boss 头部微缩：**兴奋狂欢脸**（大眼睛发光）、**通宵得意脸**（半闭眼傻笑）、**惊慌 O 形嘴脸**、**哭喊溃败脸**（眼角泪+张嘴）。

[轮廓研究区]：右下角设置一个小型黑色剪影研究区，展示 3 个糖糖菌的简化黑色轮廓——一个举糖狂欢、一个抱头鼠窜、一个打嗝鼓肚——确认圆滚滚身形辨识度。

[细节研究区]：左下角设置一个小型细节研究区，特写呈现：**小皇冠的糖果色设计**、**夜光荧光帽的荧光边**、**尖牙的可爱小尖角（不能獠牙）**、**三种小兵配色斑点图案**、**Q 版小手小脚的婴儿肥造型**。

[文本设计]：添加一个艺术导向的角色 ID 块："**蛀牙菌军团 · Sugar Bugs Gang / Boss：糖糖菌 · Sugar King / 蠢萌坏 · 爱糖 · 通宵派对 / 视觉标志：圆球身 · 小皇冠 · 单大眼**"。小型手写风格标签："Boss"、"小兵 A/B/C"、"通宵版"、"溃败版"。

[风格]：简约、电影感、艺术书般、干净、富有表现力。3D 皮克斯风 Q 版怪兽拟人化（**保持糖果色玩具质感，绝不真恐怖**）。糖果色系（粉紫黄绿橙）。

[最终目标]：最终图像应帮助 AI 视频模型精确锁定糖糖菌军团的**"圆球身躯 + 单大眼 + 小尖牙 + 蠢萌坏气质"** 核心设计——**同时清晰传达 Boss 与小兵的差异化**，方便未来在多镜头视频中保持军团视觉一致性。

**负面约束**：no realistic bacteria, no gross slime texture, no dark scary colors, no fangs like horror monsters, no zombie look, no blood, no black shadow silhouette in main figure, no anime-style eyes, no realistic microscope look, no half-body crop, no adult horror aesthetic, no serious villain gravitas, no dead or exploded pose in defeat.

---

## 四、牙齿小方块 · 拟人化配角身份板

**牙齿小方块角色身份板提示：**

创建一张艺术性的 16:9 角色身份板，展示**《牙刷小英雄》拟人化牙齿角色**——牙齿小方块的四种情绪状态。

[主体]：**一颗拟人化的儿童乳门牙**，造型为**圆角白色小方块**（不要真实解剖学牙齿造型，要 Q 版可爱方块），一双圆亮的黑色大眼睛，一张会表情变化的小嘴巴。**尺寸迷你（像玩具骰子大小），比糖糖菌小一半**。整体是**3D 皮克斯风 Q 版拟人物品设计**（类似《汽水杯》道具拟人 + 《海底小纵队》拟人装备）。

[背景]：纯白色或柔和的米白色背景。无环境、无道具、无标志、无水印。

[设计方向]：不要创建标准的角色参考表。创建一张电影般的**"同一角色 · 4 种情绪状态"**艺术书身份板，展示牙齿从"闪亮健康 → 受伤 → 破损 → 康复"的完整情绪循环。布局优雅不对称，大片留白。

[重要布局规则]：不要重叠任何角色图像。每个视角必须有清晰的分离和呼吸空间。⚠️**所有视角必须为完整全身图**（从方块顶到方块底完整可见，包括小方块下方的"脚"— 如果有 Q 版小脚设计）。

[主要构图]：放置一个**大型英雄全身视角**在画面偏左作为视觉锚点——**状态 A · 默认闪亮笑容**：白色小方块，圆亮黑色大眼睛看着观众，露出一个自信可爱的小微笑，表面**闪着淡淡的光泽**，头顶冒出几颗**淡黄色小星星**（表示"健康闪亮"）。围绕这个英雄视角，以干净的间距排列较小的辅助全身研究：

- **辅助 1**：**状态 B · 泪汪汪受伤**——白色小方块，眼睛湿润变成 **T_T** 眼泪符号造型，嘴巴变成 **波浪线** 抿嘴表情，眼角挂着一颗大泪珠，头顶冒出漫画风"**哎哟！**"对话气泡
- **辅助 2**：**状态 C · 黑点受损**——白色小方块，眼神惊恐，嘴巴张开成"啊"，表面出现**深棕色小黑点**（配星形冲击波特效），头顶冒出红色警告惊叹号
- **辅助 3**：**状态 D · 恢复闪亮**——白色小方块，眼睛眯成月牙，露出满足的大笑容，表面**发光更强**，头顶冒出金色/淡蓝色**星星光效**和"**叮！**"清脆音符
- **辅助 4**：**"一整排 8 颗牙齿排列"**的**群像全景**（横向排列，展示 Ep01 里 8 颗牙齿站成一排的场景基础布局，每颗都是默认笑容）
- **辅助 5**：**背面全身**（露出方块后侧的完整立体感）
- **辅助 6**：**侧面全身**（展示 3D 方块的深度）

[身份锁定]：在所有视角中保持严格的身份一致性：**相同的圆角白色小方块基础造型、相同的圆亮黑色大眼睛、相同的 Q 版拟人风格、相同的迷你比例**。四种状态只在**表情 + 表面装饰**（无/眼泪/黑点/星光）上有差异。**"一整排 8 颗"** 视角里的每一颗都必须造型完全一致，只用位置区分。

[表情研究区]：右上角设置一个小表情研究区，包含 4 个方块头部微缩：**闪亮笑**、**T_T 泪**、**惊恐 O 嘴**、**满足月牙眼**。

[轮廓研究区]：右下角设置一个小型黑色剪影研究区，展示 3 个牙齿方块的简化黑色轮廓（一颗立着、一颗露出眼泪、一颗排成 8 颗排列的简化线稿）。

[细节研究区]：左下角设置一个小型细节研究区，特写呈现：**方块圆角的柔和处理**、**眼睛的 3D 高光**、**T_T 泪滴的漫画符号造型**、**表面黑点的星形冲击波特效**、**恢复时的星光音符设计**。

[文本设计]：添加一个艺术导向的角色 ID 块："**牙齿小方块 · Tooth Cubes / 糖糖的 8 颗小乳牙 / 天真 · 敏感 · 会哭会笑 / 视觉标志：圆角白方块 · 大黑眼 · 四种情绪状态**"。小型手写风格标签："A · 默认"、"B · 受伤"、"C · 黑点"、"D · 康复"。

[风格]：简约、电影感、艺术书般、干净、富有表现力。3D 皮克斯 Q 版拟人物品风格。糖果色系（纯白 + 金黄星光 + 淡蓝闪光 + 淡红对话气泡）。

[最终目标]：最终图像应帮助 AI 视频模型精确锁定牙齿小方块的**"圆角白方块 + Q 版拟人五官 + 4 种情绪状态"** 完整设计，特别是**"闪亮 → 受伤 → 黑点 → 康复"** 的情绪循环变化，方便未来在 Ep01 的多镜头中保持牙齿角色的表现一致性。

**负面约束**：no realistic teeth anatomy, no dental xray look, no gross decay imagery, no scary broken teeth, no blood, no adult teeth, no anime style, no half-body crop, no dark tones, no medical illustration, no photograph reference, no serious educational chart aesthetic.

---

## 五、生日蛋糕 · 关键道具特写板

### 用途

- **Beat 1 埋雷**（S01 桌面全景 · S02 咬蛋糕 ECU 特写）
- 也是"Hook 视觉钩"—— 观众第一秒看到的糖分诱惑，为后续糖糖菌大军入侵埋伏笔
- 桌上散落的**糖果堆**是同框附赠道具，一起在这张板里锁定

### 提示词

```
A magical 3D character-turnaround style [prop identity board] featuring a cute Pixar-style [birthday cake and party candies prop showcase], designed like a professional product-and-styling reference sheet. Rendered in a cinematic 16:9 landscape frame with a clean off-white and soft cream background using very soft global illumination — no harsh shadows, no strong side lighting — creating an inviting candy-shop atmosphere. Pixar 3D CG animation aesthetic, hyper-clean toy-like sheen, candy pastel color palette (rose pink, cream white, strawberry red, golden yellow).

[Important layout rule]: Do not overlap any prop images. Each view must have clear separation and breathing space. All views must be full unclipped 3D renders.

[Main composition]: Place a large "hero angle" 3/4 front view of the [complete uncut birthday cake] slightly left-of-center as the visual anchor — a plump two-tier round birthday cake, bottom tier white cream frosting with pale pink polka dots, top tier soft rose-pink cream with cute wavy piping edges, crowned with three fresh red strawberries, scattered tiny golden star-shaped sugar sprinkles across the top, and one lit single pastel-blue birthday candle in the center with a warm tiny flame. The cake sits on a simple round cream-colored porcelain plate.

Around this hero angle, arrange smaller supporting views with clean spacing:

- Support view 1: **Top-down bird's-eye view of the complete cake** — showing the circular strawberry arrangement, sugar-star sprinkle distribution, and center candle position
- Support view 2: **Side profile view** — showing the two-tier layered structure, cream texture, drip detail
- Support view 3: **The "bitten cake" narrative state** — same cake but with one clean fork-shaped bite removed from the front edge (revealing pale pink sponge inside), a few cake crumbs scattered on the plate rim (state used in S02 for "Tangtang just took a bite")
- Support view 4: **The scattered candy pile group shot** — a small pile of party candies next to the cake: rainbow wrapped hard candies (red, yellow, green, blue wrappers), pink strawberry lollipops, golden foil-wrapped chocolate coins, and a few unwrapped colorful gummy bears — arranged casually as if just spilled from a candy bag
- Support view 5: **Individual candy detail row** — 5 individual candy specimens lined up neatly (1 wrapped hard candy, 1 lollipop, 1 chocolate coin, 1 gummy bear, 1 sugar-star sprinkle) for close-up reference
- Support view 6: **Party decoration accessories** — one cluster of pastel party balloons (pink/yellow/blue) tied with curly ribbon, one strand of triangular paper bunting, one small paper party hat — all in soft candy tones

[Identity lock]: In all views, maintain strict prop consistency: **identical cake proportions, identical strawberry-and-star topping pattern, identical two-tier candy-pastel color scheme, identical Pixar plush-plastic surface finish**. The candies must all share the same "chubby candy-shop toy" aesthetic — no realistic wrapper texture, all slightly rounded and glossy.

[Silhouette study zone]: Set up a small silhouette study area in the top-right, showing 3 simplified black outlines of the props (whole cake, bitten cake, candy pile).

[Detail research zone]: Set up a small close-up detail zone at the bottom-left featuring: **candle flame and wax drip detail**, **strawberry surface with tiny yellow seed dots**, **golden sugar-star sprinkle 3D shape**, **cream piping wave-edge close-up**, **individual candy wrapper twist end**.

[Text design]: Add an artistic prop ID block: "**Birthday Cake & Party Candies · Ep01 Beat 1 Hero Props / Sugar-World Trigger / Two-Tier Cream + Strawberry Star Sprinkles / State: complete → bitten / Accessory: candy pile · balloons · bunting**". Small handwritten-style labels: "A · complete", "B · bitten", "C · candy pile", "D · party accents".

[Style]: minimal, cinematic, art-book style, clean, expressive. Pixar 3D anthropomorphic-prop style. Candy pastel palette (rose pink + cream white + strawberry red + golden yellow star + pastel blue candle). Very soft appetizing lighting like a bakery window at afternoon.

[Final goal]: The final image should help AI video models precisely lock the birthday cake's **"two-tier cream + strawberry star sprinkles + single candle"** hero design, especially the **"complete → bitten"** narrative state variation, plus the scattered candy pile appearance, so that in Ep01 the S01 wide-shot table view and S02 close-up "biting the cake" moment maintain perfect prop continuity.
```

**负面约束**：no realistic wedding cake style, no photorealistic frosting, no fondant sculpting, no dark chocolate tones, no adult sophisticated decoration, no bakery photograph reference, no half-cut cake diagram, no candy branded packaging (unbranded generic wrappers only), no realistic bite marks with teeth impressions, no scary decay hints, no anime style, no flat 2D illustration.

---

## 六、牙杯组合 · 关键道具特写板（跨集复用）

### 用途

- **Beat 6 转折**（S14 糖糖抱起牙刷警长 ECU · S15 牙杯全组合中景）
- **Beat 8 教学**（S17-19 三步刷法演示时反复入镜）
- **Beat 10 结尾**（S24 牙杯回到桌上闪光收尾）
- **Ep02 彩蛋镜头**（睡前刷牙场景复用同一组道具）

这是 Ep01 → Ep08 **跨集反复出现的锚点道具**，一定要锁死。

### 提示词

```
A magical 3D character-turnaround style [prop identity board] featuring a cute Pixar-style [child's toothbrush cup set with brush chief and toothpaste], designed like a professional product-and-styling reference sheet. Rendered in a cinematic 16:9 landscape frame with a clean off-white background using very soft global illumination — no harsh shadows, no strong side lighting — creating a clean bathroom-shelf display atmosphere. Pixar 3D CG animation aesthetic, hyper-clean toy-like sheen, fresh candy palette (mint green, sky blue, cream white, soft pink accent).

[Important layout rule]: Do not overlap any prop images. Each view must have clear separation and breathing space. All views must be full unclipped 3D renders showing the entire object from top to bottom.

[Main composition]: Place a large "hero angle" 3/4 front view of the [complete three-piece set assembled] slightly left-of-center as the visual anchor:

- A **plump round ceramic tooth-cup** — pure white body with a chubby rounded shape (like a friendly mug), gentle inward curve at the top rim, small painted sky-blue star on the front face, glossy porcelain finish, sitting flat on an invisible surface
- Standing upright inside the cup: **Brush Chief himself** — a Q-version anthropomorphic children's toothbrush character with a sky-blue plastic handle (chubby ergonomic child-grip shape), soft white nylon bristles at the top styled like a friendly mustache, a tiny red police-cap crest emblem visible near the handle top (his identity marker), pointing upward and slightly forward like a proud captain on duty
- Leaning gently against the outside of the cup at a 30° angle: **a mint-green children's toothpaste tube** — soft plush-plastic tube shape, mint green with white cap, a cute cartoon smile decal on the front and small text stripe "COOL MINT" (unbranded generic), slightly squeezed near the middle showing it's been used, cap closed

Around this hero assembled view, arrange smaller supporting views with clean spacing:

- Support view 1: **Individual tooth-cup study** — the empty ceramic cup alone, 3/4 view, showing star decal and inner emptiness (used in S22 finale when cup is placed back)
- Support view 2: **Individual Brush Chief study** — Brush Chief standing alone without cup, full body, showing his complete captain identity (already-locked from character board, reproduced here for prop-context reference)
- Support view 3: **Individual toothpaste tube study** — the mint tube alone, showing both front decal face and back reference face, cap open version and cap closed version
- Support view 4: **Top-down view of the assembled set** — showing how Brush Chief stands inside the cup from above, the toothpaste position relative to the cup
- Support view 5: **The "in-use state"** — Brush Chief being lifted out of the cup by an invisible small hand (Tangtang's grip position marker), toothpaste tube tipped horizontal being squeezed with a small pea-sized mint-green paste dollop emerging from the tip (Beat 8 teaching moment reference)
- Support view 6: **The "party finale state"** — the same set with Brush Chief back inside the cup radiating small gold star sparkles around him (S24 ending shot reference, sparkle effect visible)

[Identity lock]: In all views, maintain strict prop consistency: **identical ceramic cup proportions with sky-blue star, identical Brush Chief character design (already locked from character identity board — do not redesign), identical mint-green toothpaste tube with smile decal, identical scale relationship between the three pieces**. The set must always read as "toy-like child bathroom kit" — cheerful, safe, chubby-rounded, glossy candy-store finish. **Brush Chief's police-cap crest emblem must remain visible in every view where he appears.**

[Silhouette study zone]: Set up a small silhouette study area in the top-right, showing 3 simplified black outlines: assembled set (cup+brush+paste), cup alone, and brush chief alone.

[Detail research zone]: Set up a small close-up detail zone at the bottom-left featuring: **the sky-blue star decal on the cup**, **Brush Chief's mustache bristle texture close-up**, **the toothpaste tube's smile decal**, **the pea-sized paste dollop 3D shape**, **the ceramic cup's inner rim curve**.

[Text design]: Add an artistic prop ID block: "**Brush Chief's Bathroom Kit · Cross-Episode Anchor Prop / Ep01 Beat 6-8-10 · Ep02+ Reuse Guaranteed / Ceramic Cup + Brush Chief + Mint Toothpaste / State: standby → in-use → finale-sparkle**". Small handwritten-style labels: "A · assembled", "B · cup only", "C · brush only", "D · paste only", "E · in-use", "F · finale sparkle".

[Style]: minimal, cinematic, art-book style, clean, expressive. Pixar 3D anthropomorphic-prop style. Fresh candy palette (mint green + sky blue + cream white + white bristles + soft pink accent). Very soft even bathroom-shelf lighting.

[Final goal]: The final image should help AI video models precisely lock the child bathroom kit's **"ceramic cup + Brush Chief + mint toothpaste"** three-piece design and its **"standby → in-use → finale-sparkle"** narrative state variations, so that across Ep01 (Beats 6-10) and future episodes (Ep02+ bedtime scenes), the tooth-cup shelf props maintain perfect visual continuity as an IP anchor.
```

**负面约束**：no adult toothbrush aesthetic, no realistic dental products photography, no medical-grade sterile look, no branded product logos, no aggressive commercial packaging, no realistic ceramic photography, no chrome or metallic finish, no dark tones, no anime style, no half-body crop of Brush Chief, no toothpaste tube resembling ointment tube, no scary bristle textures.

---

## 七、月亮夜灯 · 关键道具特写板（Ep02 主角本体）

### 用途

- **Beat 2 引入**（S03 卧室日间广角远景左侧床头柜 · S05 睡前关灯瞬间的锚点）
- **卧室场景锚点**（Beat 2 / Beat 3 前段反复出现在画面里）
- **⚠️ Ep02 关键**：这盏月亮夜灯就是 **Ep02 睡眠精灵的物理载体**——精灵从这盏灯里发出光晕并"活过来"变成守护者
- **未来 Ep03-08 卧室戏也可能复用**（如 Ep05 讲眼睛保护，可能出现"关灯睡觉不能玩手机"，这盏灯会再次亮起）

### 提示词

```
A magical 3D character-turnaround style [prop identity board] featuring a cute Pixar-style [crescent moon night-light for a child's bedroom], designed like a professional product-and-styling reference sheet. Rendered in a cinematic 16:9 landscape frame with a clean off-white background using very soft global illumination — no harsh shadows, no strong side lighting — creating a peaceful nursery-shelf display atmosphere. Pixar 3D CG animation aesthetic, hyper-clean toy-like sheen, gentle dream palette (soft yellow, warm ivory, pale blue accent).

[Important layout rule]: Do not overlap any prop images. Each view must have clear separation and breathing space. All views must be full unclipped 3D renders.

[Main composition]: Place a large "hero angle" 3/4 front view of the [complete crescent moon night-light in "on" state] slightly left-of-center as the visual anchor:

A **plump chubby crescent moon** shape, rounded like an inflated cushion (not a thin sharp crescent — a friendly fat crescent), soft warm ivory-white body with a subtle inner glow, with a **cute Q-version sleeping face** on the front curve — closed eyes as gentle upside-down "U" arcs (peaceful sleeping expression), long soft eyelashes, small serene smile mouth, a tiny pink blush dot on each cheek. The moon sits on a small cream-colored round base (invisible LED module). Around the moon glows a **very soft warm yellow halo** (about 15cm radius aura) — the light comes gently from within, casting a subtle warm gradient into the surrounding off-white space.

Around this hero angle, arrange smaller supporting views with clean spacing:

- Support view 1: **State A · OFF state** — same crescent moon design but light turned off: no halo, no inner glow, closed sleeping face still visible but eyes look "resting", body tone slightly cooler ivory (used in S03 daytime bedroom shot)
- Support view 2: **State B · ON warm glow** — the default warm yellow glow state (used in S04 bedtime shot, also the default state for scenes)
- Support view 3: **State C · Ep02 "awakening" state (foreshadowing)** — same crescent moon but eyes now **half-open** revealing large sparkly starry black-pupil eyes, mouth curves into a gentle awake smile, halo intensifies with a few small pale-blue stars floating outward (this is the moment the Sleep Fairy emerges — reserved for Ep02 opening)
- Support view 4: **Side profile view** — showing the 3D depth of the crescent shape, the base module, and how the halo wraps around the object
- Support view 5: **Top-down view** — showing the moon's silhouette from above, revealing the plush cushion-like thickness
- Support view 6: **Back view** — showing the flat back side and the tiny cable/base detail (functional prop element)

[Identity lock]: In all views, maintain strict prop consistency: **identical chubby crescent proportions (fat friendly moon, not thin sharp crescent), identical sleeping-face design with U-arc eyes and tiny smile, identical cream-white base module, identical warm yellow halo color when lit**. The three states differ ONLY in: **glow intensity + eye openness + accent star particles** — the underlying moon shape and face design must NEVER change. **This is a cross-episode IP anchor prop — Ep02 will animate it into the Sleep Fairy character, so the "awake half-open eyes" state must feel like the same character just waking up, not a different design.**

[Silhouette study zone]: Set up a small silhouette study area in the top-right, showing 3 simplified black outlines: crescent front, crescent side, crescent from above.

[Detail research zone]: Set up a small close-up detail zone at the bottom-left featuring: **the sleeping U-arc eye and long eyelash close-up**, **the small mouth curve**, **the cheek blush dot**, **the halo gradient falloff pattern (soft warm-yellow to transparent)**, **the base module texture**, **Ep02 awakening state's half-open sparkly eye detail (reference for future episode)**.

[Text design]: Add an artistic prop ID block: "**Crescent Moon Nightlight · Bedroom Anchor Prop / Ep01 Beat 2-3 & Ep02 Main Guardian Vessel / Chubby Crescent + Sleeping Face + Warm Glow / State: off → on → awakening**". Small handwritten-style labels: "A · off", "B · on", "C · awakening (Ep02 preview)", "D · side", "E · top", "F · back".

[Style]: minimal, cinematic, art-book style, clean, expressive. Pixar 3D anthropomorphic-prop style — the moon feels like a beloved plush toy that quietly protects the room. Dream palette (soft warm yellow glow + ivory white body + pale blue Ep02 accent stars + pink cheek blush). Very soft dreamy nursery lighting.

[Final goal]: The final image should help AI video models precisely lock the crescent moon night-light's **"chubby crescent + sleeping face + warm yellow halo"** hero design, especially the **"off → on → awakening"** state progression, so that in Ep01 the bedroom scenes maintain perfect prop continuity, AND in Ep02 the transition from "sleeping moon night-light" to "awakening Sleep Fairy" reads as the same beloved character coming to life.
```

**负面约束**：no realistic moon photograph, no thin sharp crescent shape, no astronomical accuracy, no scary night-sky darkness, no glowing horror aesthetic, no adult minimalist lamp design, no medical LED look, no cold blue-white light color, no anime style, no half-crop, no branded product references, no complicated mechanical base, no wire/cable visible in the main hero angle.

---

## 附录 · 字幕与特效交给后期处理（不用图像生成）

以下元素不建议用图像模型生成，请在剪辑阶段（CapCut / Adobe AE / Premiere）用**字幕层 + 特效层**制作，成本更低、可精准控制时长和位置：

| 类型 | 具体内容 | 出现节拍 | 建议工具 |
| --- | --- | --- | --- |
| **教学字幕动画** | "上下刷 ⬆️⬇️" / "里外刷 ⬅️➡️" / "每颗都要 ①-⑧" 三步大箭头 | S17-19（Beat 8）| AE 文字层 + 箭头 shape 层 |
| **计时沙漏动画** | 2 分钟沙漏，分屏中央倒计时 | S20（Beat 8）| AE 内建 shape 动画 或 免费 Lottie 素材 |
| **主题结尾字幕** | "早晚刷刷刷，笑容闪闪亮！" 逐字弹入 + 抖动 | S24（Beat 10）| CapCut 内建卡拉 OK 字幕 |
| **对话气泡** | "哎哟！" / T_T 泪滴 / 惊叹号 | 多镜（Beat 3-5）| CapCut 贴纸库 或 手工 SVG |
| **门牙十字星光**（叮！）| 恢复闪亮的四芒星 + 光晕 | S22（Beat 9）| AE Optical Flares 或 光效叠加素材 |
| **糖果菌溃败泡泡**（碎裂特效）| 糖糖菌被冲走时的粉色泡泡卷 | S18-19（Beat 8）| AE Trapcode Particular 或 泡泡素材叠加 |
| **酸雨弧线** | 糖糖菌喷酸的紫色弧线特效 | S13（Beat 5）| AE shape 动画 或 Motion Bro 预设 |

**总原则**：**图像模型只生成"静态锚点"（角色、场景、关键道具），动态元素和字幕全部交给剪辑软件**。这样每一层都在最擅长的工具里制作，性价比最高。

---

## 生成完成后建议

### 检查清单

拿到每张身份板后，逐项确认：

**糖糖身份板**
- [ ] 3 套服装（生日装 A、粉睡衣 B、蓝睡衣 C）都清晰可见
- [ ] 双啾啾发型在每个视角都一致
- [ ] 门牙两颗小方块清晰可见
- [ ] 4 种表情（大笑/哈欠/惊恐/泪汪汪）都有
- [ ] 全身视角，没有半身裁切

**牙刷警长身份板**
- [ ] 红警帽金星徽章清晰
- [ ] 白手套 + 刷毛胡子造型明确
- [ ] 4 种情绪（英雄/敬礼/叹气/骄傲）都表现
- [ ] 蓝色刷柄的糖果玩具质感（不是真实医疗牙刷）

**糖糖菌军团身份板**
- [ ] Boss 皇冠 + 3 种小兵配色都出现
- [ ] 通宵版夜光荧光帽有单独视角
- [ ] 4 种情绪（狂欢/得意/惊慌/溃败）都有
- [ ] 蠢萌坏气质，不真恐怖

**牙齿小方块身份板**
- [ ] 4 种状态（默认/T_T 受伤/黑点/康复）都完整
- [ ] "一整排 8 颗"视角存在（Ep01 排列场景基础）
- [ ] 圆角白方块基础造型稳定

**生日蛋糕道具板**
- [ ] 双层奶油 + 3 颗草莓 + 星星糖粒 + 单支蜡烛清晰
- [ ] "完整版" vs "被咬版"两种状态都有
- [ ] 糖果堆（彩色包装糖 + 棒棒糖 + 巧克力币 + 熊糖）5 种以上样品
- [ ] 派对装饰（气球 + 彩带 + 小帽）配套出现

**牙杯组合道具板**
- [ ] 三件套（陶瓷杯 + 牙刷警长 + 薄荷牙膏）比例关系锁定
- [ ] 蓝色星星贴花在牙杯上清晰
- [ ] 牙刷警长的红警帽徽章在所有出现视角都可见（不能变形）
- [ ] "组合待机 / 使用中 / 结尾闪光"三态都有
- [ ] 薄荷牙膏的可爱笑脸贴花清晰

**月亮夜灯道具板**
- [ ] 圆胖月牙造型（不是细尖月牙）
- [ ] 睡眠脸（U 形眼 + 小嘴 + 腮红）完整
- [ ] "灯灭 / 灯亮暖黄晕 / Ep02 觉醒睁眼"三态都有
- [ ] 觉醒态的星星粒子是淡蓝色（区分 Ep01 vs Ep02）
- [ ] 从侧面/背面看依然是同一造型（不是贴图片）

### 通过后的下一步

- 每张锚点资产选出 **1 张锁定版**，按类型入库：

  **角色身份板 → `tangtang-good-habits/assets/identity-boards/`**
  - `tangtang-identity-board-locked.png`（跨集通用！）
  - `brush-chief-identity-board-locked.png`
  - `sugar-bugs-identity-board-locked.png`
  - `tooth-cubes-identity-board-locked.png`

  **道具板 → `tangtang-good-habits/episodes/ep01-brush-teeth/assets/props/`**
  - `prop-birthday-cake-locked.png`（Ep01 专属）
  - `prop-brush-cup-set-locked.png`（跨集通用 · 复制一份到 IP 层）
  - `prop-moon-nightlight-locked.png`（跨集通用 · 复制一份到 IP 层）

- 后续 Ep01 场景板 + Seedance 视频提示词生成时，把 **角色板 + 场景板 + 道具板** 一起作为**参考图输入**（Midjourney 的 `--cref` / 即梦的角色参考 / Seedance 的 reference image）
- **牙杯组合板 + 月亮夜灯板** 属于跨集 IP 资产，建议在 `tangtang-good-habits/ip-bible/` 目录也放一份副本，Ep02+ 直接引用

### 特别提醒

- 糖糖身份板是**最重要的**，会跨集使用 8+ 集。**值得多迭代 2-3 轮**，把最完美的一张锁定
- 如果单张身份板难以同时展示 3 套服装，可以**分成"糖糖 · 生日装板"和"糖糖 · 睡衣板"两张**，牺牲一点跨集统一性换取每套服装的细节
- **牙杯组合板生成时**，如果模型难以在同一张图里保证牙刷警长完全一致（因为他自己就是一个复杂角色），可以在 prompt 里把牙刷警长部分简化，然后在后期用**参考图输入**（把 `brush-chief-identity-board-locked.png` 一起送进模型）来强制统一
- **月亮夜灯板的"觉醒态（Ep02 预留）"** 是关键伏笔——如果这次生成能一次锁定"睡眠 → 觉醒"的过渡感，Ep02 睡眠精灵的形象就基本免费获得了
- Ep02 启动时，只需要新增生成"睡眠精灵"和"熬夜怪"两张身份板，其他资产全部复用
