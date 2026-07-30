---
name: post-production
description: Post-production recipes for AI-generated video — text effects, editing transitions, subtitle fixes, color grading, audio repair, and export settings in CapCut (剪映). Use whenever the user asks about editing AI video after generation, adding text effects, title animations, transition effects in the editor, fixing subtitles, fixing pronunciation in post, color grading generated footage, or exporting final video. This skill covers everything AFTER the AI model outputs video, BEFORE final delivery.
---

# Post-Production Skill

This skill covers everything that happens **after** the AI video model (Seedance, Kling, etc.) outputs raw footage and **before** final delivery. It is the downstream companion to the prompt-writing skills (`shotlist-builder`, `video-render-quality`, `style-extractor`, etc.).

Default tool: **CapCut / 剪映** (mobile + desktop). Recipes use CapCut-native features only — no plugins, no external assets unless noted.

## When to use

Trigger when the user asks about:
- Adding text effects, title animations, or kinetic typography to AI video
- Editing transitions between AI video clips (dissolve, wipe, flash — things NOT handled at the prompt level)
- Fixing subtitles after homophone substitution (see polyphonic character workflow in `PROMPT_PATTERNS.md`)
- Color grading or color correction on generated footage
- Sound design — SFX placement, music entrance/exit, beat sync, audio transitions (J-Cut, SFX match splice), stem editing, music extension
- QA / troubleshooting — fixing axis crossing (越轴), unintentional jump cuts, SFX rhythm mismatch in AI-generated footage
- Audio repair — replacing misread dialogue, syncing replacement audio
- Export settings for different platforms (Douyin, Bilibili, YouTube, etc.)
- Any "how do I do X in CapCut/剪映" question related to AI video post-processing

Do NOT use when:
- The user is writing prompts for AI generation — use `shotlist-builder` or `video-render-quality`
- The user is planning transitions at the prompt level — use `【尾帧转场】` in `PROMPT_PATTERNS.md`
- The user is working on scene/character/storyboard assets — use the appropriate pre-production skill

## Scope boundary with prompt-level skills

| Task | Handled by | NOT this skill |
|---|---|---|
| Transition planned in the prompt (`【尾帧转场】`) | `shotlist-builder` / `PROMPT_PATTERNS.md` | |
| Transition applied in the editor (dissolve, wipe) | **This skill** | |
| Dialogue pronunciation fixed via pinyin annotation | `PROMPT_PATTERNS.md` polyphonic section | |
| Dialogue pronunciation fixed by replacing audio in post | **This skill** | |
| Style defined for generation (`STYLE_BLOCK`) | `shotlist-builder` / `style-extractor` | |
| Color grading applied after generation | **This skill** | |

## Reference files

- [reference/text-effects.md](reference/text-effects.md) — 5 text effect recipes (scan glow, gradient color, glitch, staggered layout, flash transition)
- [reference/editing-techniques.md](reference/editing-techniques.md) — 7 core editing techniques (jump cut, quick cut, flash cut, superimposition, interrupted cut, parallel montage, cross-cutting) with CapCut操作 and parameter tables
- [reference/sound-design.md](reference/sound-design.md) — 9 sound design & music editing techniques (strong beat cut-off, physical trigger, SFX beat sync, SFX match splice, environment replace / J-Cut, beat-aligned trim, transition SFX stack, stem editing, music extension) + recording best practices and combination guide
- [reference/ai-footage-qa.md](reference/ai-footage-qa.md) — AI footage QA checklist: 3-step mandatory check (axis crossing, jump cut, SFX mismatch) with diagnosis methods, post-fix recipes, and prompt-level prevention rules
- Future: `reference/editing-transitions.md` — editor transition catalog
- Future: `reference/color-grading.md` — color grading workflows for AI footage
- Future: `reference/audio-repair.md` — dialogue replacement, audio sync, SFX layering
- Future: `reference/export-settings.md` — platform-specific export presets

## Core principles

1. **AI footage is the starting material, not the final product.** Post-production adds polish, fixes errors, and creates effects that AI models cannot generate natively (kinetic text, precise transitions, audio repair).

2. **Fix at the source when possible.** If a problem CAN be fixed by improving the prompt or reference image, do that first. Post-production fixes are for things that are impossible or impractical to control at generation time.

3. **Recipes are tool-specific.** Unlike prompt-writing skills (which are model-agnostic text), post-production recipes reference specific buttons, menus, and parameter values in CapCut/剪映. When the UI changes, recipes need updating.

4. **Every recipe specifies the minimum parameters needed.** Font size, animation duration, opacity percentage, keyframe positions — not vague "adjust to taste" but concrete starting values that work.

## How to use recipes

Each recipe in the reference files follows this structure:

```
### [Effect Name]

**Suitable for:** [use cases]
**Difficulty:** [zero-basis / intermediate / advanced]
**Time:** [estimated minutes to execute]

#### Steps
1. [Exact button/menu path]
2. [Parameter with specific value]
3. [Keyframe instruction with timing]
...

#### Parameters
| Parameter | Value | Notes |
|---|---|---|

#### Tips
- [Optimization hints]
- [Common mistakes to avoid]

#### Combinations
- [How this effect pairs with others]
```

## Integration with the production pipeline

The full pipeline from script to final video:

```
Script → Storyboard → Scene Board → Video Prompts → AI Generation → BGM SCORING → POST-PRODUCTION → Final Delivery
         ↑ screenwriter   ↑ scene-board    ↑ shotlist-builder         ↑ bgm-scoring   ↑ THIS SKILL
           skill            skill             + video-render-quality
                                              + style-extractor
```

**Audio handoff rule:** Video prompts from `shotlist-builder` already forbid BGM at generation (`无背景音乐`). Post receives **clean clips** (dialogue + ambient/SFX only). Scored music and designed SFX stems come from `bgm-scoring` — do not ask Seedance to regenerate music, and do not treat missing BGM in the raw clip as a defect.

Post-production receives:
- Raw AI-generated video clips (15s segments from Seedance)
- The shotlist/prompt document (for reference — what each clip should contain)
- Audio assets (dialogue reference audio, SFX, music)
- Subtitle text (original dialogue from the script)

Post-production delivers:
- Assembled timeline with all clips in sequence
- Text effects and titles applied
- Transitions between clips
- Color grading applied
- Audio mixed (dialogue + SFX + music)
- Subtitles corrected and synced
- Exported final video for target platform
