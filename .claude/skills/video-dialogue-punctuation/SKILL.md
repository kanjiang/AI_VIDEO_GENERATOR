---
name: video-dialogue-punctuation
description: Improve spoken Chinese dialogue in AI video prompts by adding punctuation, pauses, interruptions, breath rhythm, and speaking texture. Use whenever the user asks to make dialogue more natural, more emotional, more performable, more nuanced, more tense, more broken, more threatening, more restrained, or specifically asks to add punctuation for AI video delivery, Seedance prompts, spoken lines, whispered lines, broken speech, interrogation lines, or emotionally compressed dialogue.
---

# Video Dialogue Punctuation Skill

This skill refines Chinese dialogue for AI video generation.

Its job is not to rewrite the scene. Its job is to make spoken lines perform better by controlling pause, breath, interruption, hesitation, pressure, and release.

## Use This Skill When

- The user says the dialogue sounds flat, stiff, or too written.
- The user wants punctuation added so AI speech has better tone.
- The user wants lines to feel more restrained, more tense, more broken, more threatening, or more human.
- The user is writing Chinese video prompts for Seedance or similar models and wants spoken delivery to become more detailed.
- The user wants the same character's speaking pattern to stay consistent across multiple lines.
- The user wants a global pass over dialogue only, without rewriting the rest of the prompt.

## Core Rule

Punctuation is acting direction inside the line.

Do not add marks mechanically. Every comma, ellipsis, dash, and full stop must correspond to a playable beat.

Do not change plot facts, speaker intent, or hidden information unless the user explicitly asks for a rewrite.

## Workflow

1. Read the exact target line and the surrounding scene context.
2. Identify the dominant speaking state: restrained, hesitant, interrupted, probing, escalating, threatening, grieving, or emotionally blocked.
3. Identify the speaker's stable profile for this pass: cleaner stops, broken starts, trailing breath, pressure questions, or cold hard stops.
4. If the line is recorded, broadcast, or off-screen, identify the source texture before editing: near-field real voice, overhead fake system, damaged playback, or live human speech.
5. Keep the meaning stable. First change punctuation, pause structure, and line breaks. Only change wording if punctuation alone cannot produce the needed delivery.
6. Choose intensity before editing: light pass, medium pass, or heavy pass.
7. Give one revised version, not multiple options.
8. If the intended performance is unclear, ask one narrow binary question such as: "这句更像强忍着说，还是像突然失控地说？"

## Default Output Rules

- Prefer full-width Chinese punctuation.
- Keep spoken lines short enough to be acted in one breath group.
- Put punctuation inside quoted dialogue, not into camera or staging blocks unless the user asks.
- Preserve the project's existing line labels, image tags, and prompt structure.
- Prefer one dominant rhythm per line. Do not stack every punctuation mark into one sentence.
- Keep each character's punctuation habits internally consistent across the same scene.
- For global passes, normalize by speaker, not by sentence in isolation.
- For device or off-screen lines, keep punctuation consistent with source type: real near-field voices can breathe, fake systems should cut harder, damaged playback can break mid-thought.

## Intensity Levels

- Light pass: punctuation only
- Medium pass: punctuation plus clause split and breath grouping
- Heavy pass: punctuation plus minimal wording adjustment and one delivery note if needed

Default to the lightest pass that achieves the performance.

## Punctuation Intent Map

- `，` small breath, soft turn, controlled continuation
- `。` firm stop, emotional clamp, conclusion
- `……` swallowed thought, hesitation, fear, grief, trailing breath
- `——` interruption, self-correction, cut-off, sudden override
- `？` challenge, disbelief, probing, unstable certainty
- `！` burst only; use sparingly

Read [references/punctuation-patterns.md](references/punctuation-patterns.md) before editing dialogue lines.

## What Not To Do

- Do not make every line melodramatic.
- Do not spray ellipses everywhere.
- Do not turn all pauses into commas.
- Do not overuse exclamation marks.
- Do not rewrite surrounding narration unless asked.

## Editing Standard

For a single requested line, revise only that line.

For a prompt block, revise only the spoken dialogue and any directly tied delivery notes.

If the user asks for a global pass, normalize punctuation line by line and keep each character's speaking pattern internally consistent.

When doing a global pass, build a quick internal rule for each character, for example:

- Character A: more hard stops, fewer ellipses
- Character B: more trailing breath, softer starts
- Character C: pressure through short questions
