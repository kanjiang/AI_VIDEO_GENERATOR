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

## ITERATION

A scene is rarely born perfect on the first pass. A normal iteration looks like this:

1. **Version 1** — overall structure and main beats.
2. **Version 2** — user-guided directional revision.
3. **Version 3** — sharpened dialogue and compressed action beats.
4. **Version 4** — final targeted adjustments.

Every version should be a targeted edit, not a full rewrite. If you start over from zero, you lost something.
