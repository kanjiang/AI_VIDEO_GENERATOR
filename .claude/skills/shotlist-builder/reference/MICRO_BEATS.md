# Micro-Beats — Actor Performance Catalog

**Never leave a generic emotion in a prompt.** Every emotional direction must decompose into specific muscle movements, breath, eyes, and skin. This is the single biggest difference between a Seedance prompt that produces "AI video" and one that produces a performance.

## 1. The base rule

When the user (or the script) says "the character looks [generic emotion]" — stop. Decompose it. If you can't decompose it confidently, ask the user to choose a variant.

Example of the clarification you should offer when the user writes "surprised":

> *Which kind of surprise?*
> *(a) Light positive surprise — eyebrows lift, lips slightly part, pupils dilate for 0.3 sec, soft inhale through nose. No extra movement.*
> *(b) Shock surprise — sharp inhale through mouth, eyes wide, freezes in place, hand involuntarily lifts to chest.*
> *(c) Disbelief surprise — slow blink, head tilts slightly, lips press together, only one eyebrow lifts.*
> *(d) Surprise-with-joy — eyes light up (catchlight), smile builds gradually, shoulders relax.*
> *Which one fits?*

Same approach for "tense", "sad", "angry", "scared", "thoughtful", "in love" — every general adjective has 3–5 distinct physical realizations.

## 2. Catalog by emotion

### Anger / determination / rage

```
- 颊部咬肌（masseter）通过皮肤可见地搏动
- 颈部颈动脉脉搏可见
- 太阳穴血管浮起
- 鼻翼在重音词上扩张
- 瞳孔收缩（focus tightening）
- 眼角外缘收紧（genuine intensity，非廉价眯眼）
- 高潮时刻不眨眼
- 眉骨/鼻翼处微汗珠
```

### Anxiety / nervousness

```
- 一次喉结上下吞咽（visible swallow）
- 台词前一次短促浅吸气（短促鼻吸）
- 用舌头舔润干燥的下唇
- 下唇轻微内收
- 脸颊毛细血管充血泛红
- 关键词上瞳孔扩张
- ⚠️除非明确说明，否则不哭
```

### Sadness / vulnerability (without tears)

```
- 眼角外缘下垂
- 眼睛湿润带眼神光（wet with catchlight）——但⚠️不流、不淌、不闪烁泪光
- 眉头中央皱起（corrugator muscle）
- 嘴唇轻微颤抖
- 头部微微低垂
```

### Control / calm / superiority

```
- 平稳均匀的呼吸（与紧张的对手形成对比）
- 手指/手臂放松
- 缓慢均匀的眨眼（slow blink）
- 下颌微抬（chin lift）
- Duchenne微笑——眼角外侧出现细纹。⚠️逐渐建立，不是从已完成的状态开始
```

### Heaviness / weighed-down

```
- 双肩下沉（heavy shoulders）
- 头部微微下垂
- 深而缓慢的呼吸
- 声音比平时更低沉、更闷
- 回答时头部轻微侧倾（5–15°）
```

### Shock / freeze

```
- 镜头开始瞬间——身体冻结0.3-0.5秒，无任何移动
- 瞳孔在冻结瞬间扩张
- 嘴唇微微张开（lips part）但无声
- 一次延迟的、急促的鼻吸气在freeze结束后
- 眼睛锁定在触发源上——无眨眼、无视线偏移
```

### Suppressed emotion (the hardest — physical resistance)

```
- 他在试图忍住——每一块面部肌肉都在对抗涌上来的情绪
- 颧骨处咬肌慢慢收缩
- 喉结一次延迟的、用力的吞咽
- 眼睛逐渐湿润，眼眶积聚泪水使眼球开始泛光——但泪不落下
- 一次缓慢、深、控制的吸气——胸腔可见起伏
- 下颌微抖一次——立刻被收紧
```

### Surprise variants

**Light positive:**
```
- 眉毛轻微上扬
- 嘴唇微张
- 瞳孔扩张约0.3秒
- 一次柔和的鼻吸气
- 无其他多余动作
```

**Shock:**
```
- 急促的口吸气（sharp mouth inhale）
- 双眼睁大，瞳孔扩张
- 身体冻结在原地
- 一只手不自主抬至胸前
- 嘴唇微微张开但无声
```

**Disbelief:**
```
- 一次缓慢的眨眼
- 头部微微侧倾
- 嘴唇收紧
- 只有一侧眉毛抬起
- 视线锁定在触发源上
```

**Surprise + joy:**
```
- 眼睛点亮（catchlight强化）
- 笑容逐步建立——⚠️不是瞬间出现的完整笑容
- 双肩放松下沉
- 一次轻松的呼气
```

## 3. Emotional arc within a single shot

When emotion changes inside one continuous take, write it as a numbered sequence of beats with explicit muscle/breath/eye changes per beat:

```
①开始——[emotion A]——[specific muscular indicators]
②过渡——[trigger event]——[which muscles release / tense]
③下一阶段——[emotion B]——[new indicators]
④...
⑦结尾——[final emotion]——[final indicators]
```

Also state explicitly **what must remain visible on the face** through the arc (eyebrows, jaw, breath, eyes).

Tie each numbered beat to a corresponding camera phase (see CAMERA_EMOTION.md §2).

## 4. Dialogue and timing

Every spoken line gets:
- **Pre-line beat** (what happens before the first word): swallow, inhale, lip lick, posture shift
- **During the line**: which words are emphasized via nostrils, intonation, pupils
- **Post-line beat**: ~0.5 sec held breath before the next movement, then release

Example:
```
台词前：一次短促鼻吸气，喉结一次吞咽。
台词："Don't ask me again."——重音落在"again"，鼻翼在该词上扩张。
台词后：保持视线锁定在对手身上0.5秒——然后微微移开。
```

## 5. Listeners in bokeh

If the focal character is in focus and others are blurred — **they are not static**. Write:
- Where their head and gaze are pointed
- Micro-movements of shoulders and head
- Reaction to key moments (even in bokeh)
- Clear timing offset (e.g., "Roko turns his head first; 0.4 sec later, Rein; another 0.4 sec, Jax")

Three characters never sync perfectly — always stagger by 0.3–0.5 sec.

## 6. Forbidden in performance

- ❌ "Just stands there talking" — there is always a micro-movement
- ❌ Cartoony grimaces / over-mugging
- ❌ "Eyes to the ceiling" for thinking — name a specific gaze direction
- ❌ Tears by default — only if the script explicitly calls for them
- ❌ Perfect synchronization across multiple characters — always stagger timing
- ❌ Generic "looks tense" / "looks happy" — always decompose into muscles, breath, eyes

## 7. The anti-AI test

Before delivering any prompt, read the performance section and ask:
> *Could this come from an AI prompt template? Or does it read like notes from a director who watched the actor rehearse?*

If it reads templated, rewrite. The micro-beats should feel like they came from a specific performance, not a checklist.

---

## 8. Facial emotion three-stage progression（面部情绪三段递进法）

来源吸收：LibTV「情绪控制 Skill」思路（不绑定平台 UI）。  
公式：**情绪三段递进 + 有活人感的人物参考图** — 眼、眉、鼻、嘴、面部肌肉**同时**演戏，禁止只写「她哭了」。

长对白 / 30s 情绪弧另见：`../seedance-2/references/PERFORMANCE_EIGHT_DIM.md`（八维 + 台词时间轴）与 `../seedance-2/references/AU_FACS.md`（AU 校准）。§8 三段 ≈ 八维里的「保护层失效」短版。

### 8.1 何时用

- 复杂情绪特写（隐忍哭、破防、崩溃、同台词不同情绪）
- 用户说：微表情、五官拆解、情绪递进、害怕的哭/开心的哭…
- 单镜时长够写 ①②③（通常 ≥8–15s 或拆成多段）

### 8.2 写法模板（每段必填五官）

```
①[阶段名]（[起]-[止]秒）：
眉：…；眼：…；鼻：…；嘴：…；面部肌肉/皮肤：…；呼吸/下颌：…
②[阶段名]（…）：
…
③[阶段名]（…）：
…
⚠️五官同步递进，禁止只有眼泪没有眉眼鼻嘴变化；禁止跳过②直接从平静到嚎哭。
```

### 8.3 范例：女生隐忍的哭泣（三阶）

| 阶段 | 眉 | 眼 | 鼻/嘴 | 其他 |
|------|----|----|-------|------|
| **① 隐忍蓄泪** | 眉心收拢 | 眼周泛红，泪珠悬于眼底不落 | 唇线抿紧 | 下颌微紧，呼吸变浅 |
| **② 压抑破防** | 眉心更紧 | 低头闭眼或半闭，泪珠滑落 | 鼻翼微动，吸气受阻 | 肩微塌 |
| **③ 失态痛哭** | 眉峰抖动 | 双眼胀红 | 嘴部失控抽动 | 面部肌肉抽搐，呼吸断续 |

### 8.4 同台词、不同哭（「我错了」）

先定情绪标签，再套三段；台词口型一致，**五官路径不同**：

| 情绪 | ① 蓄 | ② 转 | ③ 爆 |
|------|------|------|------|
| **害怕的哭** | 瞳孔放大、眉心上吊、呼吸短促 | 声线发颤、下唇抖、泪急 | 躲闪视线、缩颈、泣不成声 |
| **开心的哭** | 眼角挤出笑纹、泪光亮 | 又笑又吸鼻、颊上提 | 破涕为笑或笑中落泪，肩松 |
| **失望的哭** | 目光失焦向下、眉外梢下垂 | 长叹、泪慢、嘴角塌 | 无声流泪或一声短抽，动作少 |

禁止用「哭得更厉害」代替阶段差异。

### 8.5 活人感人物图（质感门）

三段法在「蜡像脸 / 磨皮脸」上会失效。角色参考与特写 prompt 追加：

```
皮肤有细微毛孔与真实纹理，禁过度磨皮、禁美颜塑料脸、禁蜡像感；
人景光影一致，面部受环境色影响；细微血色与瑕疵可保留。
```

静帧/平台「人像质感调节」类工具可作补救；本仓库原则写入 prompt + `video-render-quality` 肤色/微表面指令。  
角色一致性仍走 identity 全身图；**情绪特写优先用带真实皮肤的锁定脸**。

### 8.6 与目录其他节关系

| 节 | 用途 |
|----|------|
| §1–2 情绪目录 | 选「哪一种」情绪物理现实 |
| **§8 三段递进** | 同一情绪在时间内如何升级 |
| `video-dialogue-punctuation` | 台词气口；与面部阶段对齐 |
| `EMOTION_ARC_EDIT` | 剪辑层蓄力静默爆发；可与面部 ①②③ 同拍点 |

### 8.7 LibTV 可视化调节（可选）

若用户在 LibTV 等平台用「情绪调节」点选微表情：仍把最终选定的微表情**写回** Seedance 中文 prompt 的 ①②③，避免平台内状态无法迁移到本仓库分镜 HTML。

### 8.8 单段微表情词库（可复制）

常用「坏笑 / 含泪凝望 / 咬牙隐忍」等**单帧级**五官句，见 [MICRO_EXPRESSION_LIBRARY.md](MICRO_EXPRESSION_LIBRARY.md)（上篇）。  
长对白按句换条目并分段生成；升级型哭泣仍用本节 ①②③。
