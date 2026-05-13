# Screenwriter Skill — Quick Start

A general-purpose screenwriting skill. It is not tied to any specific story. It works in Claude, Cowork, or Claude Code as a skill folder.

---

## WHAT IS INSIDE

- **`SKILL.md`** — the main skill description, read first.
- **`methodology.md`** — McKee + Campbell + Aristotle.
- **`style-rules.md`** — Hollywood-format writing rules.
- **`workflow.md`** — how to work with the user.
- **`timing-and-cutting.md`** — screen-time estimation and cutting strategy.
- **`templates/`** — blank templates for the user's story.
- **`tools/`** — `.docx` generators for screenplay, bilingual script, and treatment.

---

## HOW TO START

### Step 1. Install

Copy the `screenwriter-skill/` folder wherever it is convenient: inside a Claude Code project, as a user skill in Cowork (`~/.claude/skills/screenwriter/`), or simply next to your working files.

### Step 2. Tell Claude

> "Load the screenwriter skill and let's begin."

Claude will read `SKILL.md`, the methodology, the writing rules, and the workflow.

### Step 3. Bring the material

One of these options:

**A. You already have a synopsis, treatment, or draft scenes.**
Send the files. Claude will read them and ask where to begin.

**B. You only have an idea.**
Describe it in one or two paragraphs. Claude will ask questions, help shape the synopsis, then the treatment, then the scenes.

**C. You only have a title and a genre.**
Fill in `templates/synopsis.template.md` and `templates/characters.template.md`. After that, proceed iteratively.

### Step 4. Work scene by scene

Standard loop:
1. You ask for a scene based on the treatment.
2. Claude gives ONE version and one reason it works.
3. You give notes.
4. Claude makes a targeted revision.
5. When the scene is final, export it to `.docx` with `tools/build_screenplay.js`.

---

## EXPORT TOOLS

### Screenplay (Hollywood format)
```bash
cp tools/build_screenplay.js my_scene.js
# open my_scene.js and fill the `screenplay` array with slug/action/character/dial/trans
NODE_PATH=/usr/local/lib/node_modules_global/lib/node_modules node my_scene.js
# outputs screenplay.docx
```

### Bilingual (dialogue + translation)
```bash
cp tools/build_bilingual.js my_bilingual.js
# fill it using ...dialB("Main lang", "Translation")
node my_bilingual.js
# outputs screenplay-bilingual.docx
```

### Treatment
```bash
cp tools/build_treatment.js my_treatment.js
# fill it using scene("Title", "Body", "[optional] audit-tag")
node my_treatment.js
# outputs treatment.docx
```

---

## COMMON SKILL REQUESTS

| Request | What Claude does |
|---|---|
| "Write scene 5" | Reads the treatment and writes one version with one reason |
| "This doesn't work" | Asks one narrow binary question and writes a new version |
| "Make it bilingual" | Uses `tools/build_bilingual.js` |
| "Audit the causality" | Walks the treatment with ⚠ tags |
| "How many minutes will this run?" | Estimates by scene type, see `timing-and-cutting.md` |
| "Get it down to X minutes" | Gives a concrete cut plan with numbers |
| "Make character Y sound distinct from X" | Compares dialogue and suggests differences |

---

## THREE THINGS CLAUDE SHOULD NOT DO

1. **Do not write 5 options** — give ONE and a reason.
2. **Do not "improve" nearby lines** — change only what was requested.
3. **Do not describe emotions abstractly** — use action verbs.

If Claude breaks these rules, say: "One version, not five" or "Change only X."

---

## CUSTOMIZING THE SKILL

If you write many films in one genre, fork this skill and add:

- **`reference-films.md`** — a list of reference films with scene analysis.
- **`my-style.md`** — your personal style preferences, for example: "I dislike flashbacks" or "I always end on silence."
- **`recurring-tropes.md`** — your recurring techniques or motifs.

That turns the skill into your own tool rather than a generic one.
