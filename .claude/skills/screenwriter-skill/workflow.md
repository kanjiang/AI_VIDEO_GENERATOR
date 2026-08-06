# Workflow

## WHEN THE USER ASKS FOR A SCENE

1. **Read the context.** If it has not been loaded yet, read the synopsis, character bible, and previous scenes.
2. **Check the structural position.** Which act is this? Which McKee beat? Which Campbell stage?
3. **Think through the arc of every present character** in this scene.
4. **Show ONE version of the scene** in Hollywood format as plain text in chat.
5. Add **3 to 5 lines of analysis** under the scene:
   - What value enters and what value leaves?
   - Which hamartia does it activate?
   - What are the red flags: repetition, weak causality, overload?
6. **Ask what should change** with one narrow question, not a broad one.

**Do not show 5 options.** One version and one reason.

---

## WHEN THE USER GIVES A NOTE

1. **Make a targeted edit.** Do not rewrite the entire scene because of one line.
2. **Regenerate the output** artifact or `.docx`, but only the file the user actually sees.
3. **Confirm in one sentence:** "Done. Changed: [what]."
4. **Do not suggest new changes on your own.** Wait for the next request.

---

## WHEN THE USER PROPOSES AN IDEA

1. **Check compatibility first** against the character bible and the world mythology.
2. **If there is a conflict, say it directly:** "This contradicts [X] in the bible. I suggest [Y] as a workaround."
3. **If it fits, implement it.**
4. **If the idea is stronger than the existing canon,** suggest changing the canon rather than forcing the scene.

---

## WHEN THE USER REJECTS THE RESULT

1. **Do not over-apologize.** One "understood" is enough.
2. **Do not dump five more versions** in an attempt to guess.
3. **Ask one question:** what exactly is not working?
   - Direction?
   - Tone?
   - Pace?
   - A specific line?
   - Character logic?
4. **After the answer, provide one solution, not five.**

---

## WHEN THE USER WANTS TO CUT LENGTH

1. **Estimate the real runtime first** using `timing-and-cutting.md`.
2. **Do not apply the rule "1 page = 1 minute" literally** to action scenes or montage.
3. **Show a scene-by-scene breakdown** as a table.
4. **Find the easiest cut points** such as repetition, parallel hits, and breathing scenes.
5. **Give a concrete plan** like "cut 12 seconds from scene 7," not a vague "this could be shorter."

---

## WHEN THE USER WANTS A CAUSALITY AUDIT

Read the treatment and answer for each scene:

- **Does the scene begin with "because"?** Scene N happens because scene N-1 produced X.
- **If the scene begins with "after that," the structure is weak.** Good structure is causal, not merely chronological.
- **Tag weak points with:**
  - ⚠ [CAUSALITY] — the scene does not follow from the previous one
  - ⚠ [VALUE] — the scene does not move a value
  - ⚠ [BIBLE] — conflict with the character or world bible
  - ⚠ [PACE] — too slow or too fast for its function

---

## WHEN YOU DO NOT KNOW, ASK ONE QUESTION

If context is insufficient for a confident decision, **do not invent**. Ask ONE narrow binary question.

❌ "What tone should the scene have?" This is too open.

✅ "In this scene, is the hero protecting or exploiting?" This is narrow and binary.

A binary question is the best question. Once the user answers, you have direction. Only then do you write.

---

## WHEN THE USER WANTS TO ADAPT AN EXISTING STORY (改编模式)

Adaptation is not copying. It is extracting the **structural engine** (core conflict, value shift, dramatic question) and rebuilding everything else around it.

### The adaptation formula

```
Original core conflict + New characters + New setting/era = New work
```

### Step-by-step

1. **Extract the core conflict** — reduce the source material to one sentence: "[Character] wants [X] but [Y] stands in the way." This is the only thing you keep.
2. **Verify the conflict is universal** — if the conflict only works in the original's specific world (e.g., "a wizard must destroy a ring"), abstract it one level ("a reluctant hero must destroy the thing that gives power to evil"). If it's still too specific, abstract again.
3. **Swap the characters** — new names, new appearances, new backstories, new voices. The character TYPES (mentor, trickster, threshold guardian) can remain if they serve the conflict, but every surface detail must change.
4. **Swap the setting** — different era, different location, different culture, different genre. The more different, the safer and more original.
5. **Rebuild the beats** — using the same McKee/Campbell methodology as original work, but let the new characters and setting generate their own specific scenes. Do NOT replicate the original's scene-by-scene structure.
6. **Audit for leakage** — check every scene against the source. If a reader familiar with the original would say "this is the same scene," rewrite it.

### Adaptation vs. plagiarism self-check

| Check | Pass? |
|---|---|
| Could someone read this without recognizing the source? | |
| Are ALL character names, appearances, and backstories new? | |
| Is the setting/era/world different from the source? | |
| Do the specific scenes differ, even if the arc is similar? | |
| Could this story exist independently without knowing the source? | |

If any check fails, the adaptation needs more distance from the source.

### Common adaptation patterns

| Source conflict | Adaptation example |
|---|---|
| 同事天价聚餐蹭主角买单 | → 相亲对象全家来蹭饭 |
| 科举考试被诬告作弊 | → 职场项目被同事抢功 |
| 穿越古代靠现代知识逆袭 | → 退休专家到乡村靠经验解决问题 |
| 孤儿院天才被贵族收养 | → 小镇学生被大城市学校录取 |

The pattern: keep the **power dynamic** and **stakes**, replace everything visible.

---

## WHEN THE USER PASTES A NOVEL / WEB-NOVEL CHAPTER

1. **Do not write a Hollywood scene yet.** Read `novel-to-scene.md` and run Phases A–C.
2. **Deliver the Novel → Scene report** (cut list, shootable beats, optional episode split).
3. **Ask one next-step question** (write Ep1 screenplay vs. project locks vs. shotlist).
4. If the target is 漫剧 / 竖屏短剧, apply `manga-drama-pacing.md` when writing episodes.

---

## WHEN THE TARGET IS 漫剧 / VERTICAL SHORT-DRAMA

1. Read `manga-drama-pacing.md`.
2. Add the **Short-form packaging** block to treatment / synopsis when missing.
3. Enforce: 0–3s hook, mid-beat cadence, episode cliffhanger (unless user opts out).
4. Hand off production locks to `shotlist-builder/reference/PROJECT_LOCKS.md` before mass prompting.

---

## ITERATION

A scene is rarely born perfect on the first pass. A normal iteration looks like this:

1. **Version 1** — overall structure and main beats.
2. **Version 2** — user-guided directional revision.
3. **Version 3** — sharpened dialogue and compressed action beats.
4. **Version 4** — final targeted adjustments.

Every version should be a targeted edit, not a full rewrite. If you start over from zero, you lost something.
