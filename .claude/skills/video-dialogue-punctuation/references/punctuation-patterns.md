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

## Prompt-Level Guidance

When editing AI video prompts:

- Revise dialogue first.
- Then add only minimal delivery notes if punctuation alone is not enough.
- Keep delivery notes physical and playable: `压低声音`, `停半拍`, `几乎没出声`, `后半句更轻`.
- Do not turn every line into a stage performance note.
- If the scene mixes true and false voice sources, normalize punctuation by source as well as by speaker.

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
