# Chinese Dialogue Punctuation Patterns

Use this file when refining spoken Chinese lines for AI video prompts.

## Principle

The line must sound speakable before it looks elegant.

Prefer rhythm over decoration.

## Fast Selection Guide

### Restrained truth

Use for lines spoken with pressure held down.

- Best marks: `，` `。`
- Optional: one `……`

Example:

- Flat: `这屋里的声音都不干净`
- Revised: `这屋里的声音，都不干净。`

### Hesitation or fear

Use when the speaker is holding back, testing the next word, or struggling to finish.

- Best marks: `……` `，`
- Avoid too many hard stops

Example:

- Flat: `哥如果你听见这段说明我已经死了`
- Revised: `哥，如果你听见这段……说明我已经死了。`

### Sudden interruption or correction

Use when the speaker cuts themselves off, is cut off by emotion, or changes direction mid-line.

- Best marks: `——`
- Follow with a shorter second clause

Example:

- Flat: `不是她说的至少不全是`
- Revised: `不是她说的——至少，不全是。`

### Probing or verbal pressure

Use when a character is testing, pressing, or baiting the other person.

- Best marks: `？` `，` `。`
- Often better with one short sentence followed by one harder stop

Example:

- Flat: `名单还拷给谁了`
- Revised: `名单，还拷给谁了？`

### Threat through calmness

Use for low-volume danger. Usually fewer marks, harder stops.

- Best marks: `，` `。`
- Avoid `！`

Example:

- Flat: `先给我`
- Revised: `听见了吧。先给我。`

### Fake broadcast or system injection

Use when the line is machine-triggered, overhead, repeated, or emotionally false.

- Best marks: `。`
- Keep clauses harder and cleaner
- Avoid decorative ellipses unless the playback is actually damaged

Example:

- Flat: `哥把录音笔交给陈伯相信他`
- Revised: `哥。把录音笔交给陈伯。相信他。`

### Memory-key or clue line

Use when a short line lands like a remembered key, password, or buried instruction.

- Best marks: `……` plus one hard stop
- First half can arrive from memory or noise; second half should land clearly

Example:

- Flat: `第七码不是数字`
- Revised: `第七码……不是数字。`

### Theme line under pressure

Use when a character says the core meaning aloud but must not sound like a slogan.

- Best marks: one brief `……` plus a hard stop
- Add a delivery note only if needed: short pause in the middle, hard ending

Example:

- Flat: `你们太相信声音能代替人了`
- Revised: `你们太相信……声音能代替人了。`

### Emotional collapse held back

Use when the speaker is close to breaking but still suppressing it.

- Best marks: `……` `。`
- One broken clause is usually enough

Example:

- Flat: `我不是不怕`
- Revised: `我不是不怕……我是不敢停。`

## Line Surgery Rules

### 1. One pause, one reason

If you add a comma or ellipsis, be able to name the beat:

- breath
- doubt
- memory hit
- pressure shift
- emotional clamp

If you cannot name the beat, remove the mark.

### 2. Ellipsis means missing force, not decoration

Use `……` when the character cannot or will not finish cleanly.

Do not use it for every soft line.

### 3. Dash means collision

Use `——` for interruption, override, self-correction, or a thought getting cut by urgency.

It should feel sharper than `，` and more sudden than `……`.

### 4. Full stop can make a line colder

Sometimes the most emotional choice is fewer marks and a hard stop.

Example:

- Weaker: `你别再说了……`
- Colder: `你别再说了。`

### 5. Question marks reshape power

`？` can turn a flat statement into pressure, disbelief, or trap-setting.

Example:

- Flat: `你还是来了`
- Revised: `你还是来了？`

Use carefully. Some lines lose menace if they become too visibly inquisitive.

## Seedance 2.0 Punctuation Controls

These punctuation marks act as direct performance directives in Seedance 2.0. They control volume, speed, and delivery beyond what normal Chinese punctuation achieves.

### 圆括号（内容）— Whisper / breathy / lowered volume

Seedance reads content inside `（）` at reduced volume with a breathy, near-whisper quality. Use for inner monologue leaking out, muttered asides, or physically weakened speech.

- `"我当然相信你。（骗子。）"` — "骗子" is almost inaudible, like a thought escaping
- `"没事，我很好。（才怪。）"` — the parenthetical lands as a bitter whisper

Rules:
- Place parenthetical content where the speaker would naturally lower their voice
- Works best for 1–4 characters inside the brackets
- Do not overuse — if every line has a parenthetical aside, the effect flattens

### 星号 \*内容\* — Emphasis / slowed / weighted

Seedance reads content between `*` marks slower, heavier, and with slightly lowered volume. Use for the word that carries the emotional or informational weight of the sentence.

- `"我说的是*现在*。"` — "现在" is delivered with deliberate force
- `"这不是*你的*决定。"` — "你的" gets pressed harder than the surrounding words

Rules:
- One emphasis per sentence maximum
- Pick the word that changes meaning if stressed differently
- Star-emphasis sounds deliberate, not loud — it slows the delivery, it does not raise volume

### 方括号【内容】— Silent action directive

Seedance does NOT read content inside `【】` aloud. Instead it executes the instruction as a performance action. Use for pauses, breaths, sighs, or any non-verbal beat.

Available directives:
- `【停顿】` — pause (about 0.5–1 second silence)
- `【长停顿】` — extended pause (about 1.5–2 seconds)
- `【呼吸】` — audible breath intake
- `【叹气】` — audible sigh
- `【吞咽】` — swallow sound

Example:
- `"我知道。【停顿】但我还是来了。"` — clean silence between the two clauses
- `"【呼吸】好。我说。"` — breath before speaking, creating weight

Rules:
- Place directives where a real actor would physically do the action
- `【停顿】` is cleaner than `……` — use `……` for trailing hesitation, `【停顿】` for deliberate silence
- Can combine: `"我不是不怕……【停顿】我是不敢停。"`
- Do not stack multiple directives in a row

### Combination patterns

These four Seedance controls can layer with standard punctuation for precise delivery:

| Intent | Pattern | Example |
|--------|---------|---------|
| Hesitate then whisper aside | `……` + `（）` | `"我觉得……（算了。）"` |
| Deliberate pause then emphasize | `【停顿】` + `*` | `"你听好。【停顿】这是*最后*一次。"` |
| Trail off with breath | `……` + `【呼吸】` | `"如果当时我没走……【呼吸】"` |
| Whispered emphasis | `（*内容*）` | `"（*不可能*。）"` |
| Calm threat with pause | `。` + `【停顿】` | `"听见了吧。【停顿】先给我。"` |

## Seedance 2.0 Lip-Sync Tips

When dialogue requires visible mouth movement (画内角色说话):

1. **Mouth must be visible** — mid-shot (50mm) and close-up (85mm+) get the best lip-sync results. Wide shots rarely align.
2. **Normal speaking speed** — don't write rapid-fire dialogue for lip-sync shots. Add `语速偏慢` in the prompt if the character is calm or exhausted.
3. **Keep lines under 15 seconds** — Seedance lip-sync is most stable within a single 15-second prompt. Split longer speeches across prompts.
4. **Speed annotations** — add `语速偏慢` or `语速较快` directly in the dialogue delivery notes when needed.

## Prompt-Level Guidance

When editing AI video prompts:

- Revise dialogue first.
- Then add only minimal delivery notes if punctuation alone is not enough.
- Keep delivery notes physical and playable: `压低声音`, `停半拍`, `几乎没出声`, `后半句更轻`.
- Do not turn every line into a stage performance note.
- If the scene mixes true and false voice sources, normalize punctuation by source as well as by speaker.

### Dialogue text wrapping with `{}`

In Seedance 2.0 prompts, wrap each character's spoken text in curly braces `{}` to help the model precisely identify what to read aloud:

```
角色A（清冷少女音）转过头说{你怎么来了？}【停顿 0.5s】
角色B（浑厚男声）放下杯子回应{我刚好路过。}
```

Rules:
- `{}` contains ONLY spoken words — action/gesture goes outside
- Keep each `{}` block ≤15 Chinese characters
- Add `【停顿 0.5s-1s】` between different speakers to prevent voice crossover
- All Seedance punctuation controls (`……` `（）` `*` `【指令】`) work inside `{}`

Example with combined controls:
```
角色A 低头看着地面说{我不是不怕……【停顿】我是*不敢*停。}【停顿 0.8s】
角色B 走过来轻声说{（没事的。）我在这里。}
```

### Multi-speaker limit

A single 15-second Seedance prompt must have **at most 2 speaking characters** with 2-4 lines total. Three or more speakers cause voice crossover. Split 3-person scenes into multiple prompts.

## Intensity Ladder

### Light pass

Use when the line already works and only needs cleaner delivery.

- change punctuation only
- no wording change
- no new delivery note

Example:

- Before: `你还是来了`
- After: `你还是来了。`

### Medium pass

Use when the line needs clearer breath groups or emotional contour.

- punctuation plus clause split
- still preserve wording as much as possible

Example:

- Before: `哥如果你听见这段说明我已经死了`
- After: `哥，如果你听见这段……说明我已经死了。`

### Heavy pass

Use only when punctuation alone cannot produce the intended performance.

- punctuation
- small wording adjustment
- at most one short delivery note

Example:

- Before: `名单还拷给谁了`
- After: `名单，还拷给谁了？` 配合短 delivery note: `后半句更轻，但更硬`

## Good Global Patterns

### Calm manipulator

- fewer marks
- more periods
- occasional comma before pressure word

Example:

- `听见了吧。先给我。`

### Traumatized but controlled speaker

- commas plus rare ellipsis
- broken start, firm end

Example:

- `哥，如果你听见这段……说明我已经死了。`

### Panicked witness

- shorter clauses
- interruption or restart
- more unstable question rhythm

Example:

- `不是，等一下——你刚才听见了吗？`

### Controlled interrogator

- short clauses
- pressure through spacing and hard stops
- rare ellipsis

Example:

- `你听见了。对吧？`

## Speaker Consistency Check

Before finishing a block, check:

1. Does each character sound like the same person across all lines?
2. Is one character using far more ellipses or question marks than their role supports?
3. Are pauses tied to beats, or just scattered for flavor?
4. Could the actor read each line aloud in one clear intention?

## Bad Patterns

- `哥，，，你听我说！！！`
- `我……我……我……不知道……`
- `你还是来了！？！？`
- adding ellipses to every emotional line

## Minimal Revision Strategy

Always try this order:

1. punctuation only
2. punctuation plus clause split
3. punctuation plus one or two word substitutions

Do not jump to full rewrites unless the user asks.
