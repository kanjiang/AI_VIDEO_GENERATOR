---
name: video-render-quality
description: Eliminate plastic, flat, or CG-uncanny visual quality in AI video prompts by injecting engine-level rendering directives, ray tracing instructions, film stock simulation, material physics, and optical effects. Use whenever the user says the video looks plastic, fake, flat, CG-like, too clean, too smooth, lacks depth, needs better lighting, needs more realism, needs cinematic quality, needs film look, needs texture, or specifically asks for rendering quality enhancement, visual fidelity upgrade, engine-level instructions, ray tracing prompts, film simulation prompts, material texture prompts, or optical effect prompts.
---

# Video Render Quality Skill

This skill upgrades AI video prompts from "looks like CG" to "looks like a real camera filmed it" by adding structured rendering and optical quality directives.

The plastic look in AI video is rarely the model's fault. It is almost always a prompt problem: missing engine-level rendering cues, missing ray tracing instructions, missing film stock and lens characteristics, and missing physical material descriptions.

## Use This Skill When

- The user says the video output looks plastic, flat, fake, or too CG.
- The user wants more photorealistic lighting, materials, or depth.
- The user wants a specific rendering engine aesthetic (Unreal, Octane, Redshift, V-Ray).
- The user wants film stock or camera color science simulation.
- The user wants physically accurate materials, surfaces, or optical effects.
- The user is writing or revising video prompts and wants a visual quality pass.
- The user asks to "upgrade the render quality" or "make it more cinematic."

## Core Rule

The plastic look has three root causes. Fix them in this order:

1. **No rendering engine anchor.** The model has no frame of reference for what "realistic" means. Fix: add one engine-level directive that tells the model which rendering pipeline to simulate.
2. **No light physics.** Reflections, shadows, and global illumination are missing or faked. Fix: add ray tracing or path tracing directives.
3. **No surface truth.** Materials look like uniform colored surfaces instead of physical substances. Fix: add material physics and optical effect directives.

Do not stack every directive into one prompt. Pick the combination that matches the scene's needs.

## Workflow

1. Read the target video prompt and the surrounding scene context.
2. Identify the dominant visual problem: is it lighting, materials, surface detail, color science, or overall rendering quality?
3. Read [references/render-directives.md](references/render-directives.md) to select the appropriate directives.
4. Choose a **render profile** that matches the scene type and artistic intent.
5. Inject the selected directives into the prompt's style block or global style declaration, not scattered throughout the action description.
6. Give one revised version with the render quality directives integrated.

## Render Profile System

Each profile is a pre-built combination of directives optimized for a specific visual goal. Use one profile as a starting point, then adjust.

### Profile: Cinematic Realism (default for live-action style)

Best for: realistic human/animal subjects, indoor/outdoor drama, documentary feel.

- Engine: Unreal Engine 5.3 Lumen global illumination
- Geometry: Nanite virtual geometry, film-grade assets
- Ray tracing: ray-traced reflections + ray-traced soft shadows
- Film stock: Kodak Vision3 500T or ARRI Alexa color science
- Noise: light film grain
- Dynamic range: HDR, 10-bit color depth
- Sharpening: high sharpness, edge enhancement

### Profile: Hyperreal Materials

Best for: close-up product shots, armor/weapon detail, architectural interiors.

- Engine: Octane X render, spectral lighting
- Ray tracing: path tracing (full physical accuracy)
- Materials: subsurface scattering for skin, caustic light for glass/water
- Surfaces: pore-level detail, micro-displacement
- Sharpening: ultra-high sharpness
- Noise: clean, no noise

### Profile: Atmospheric Interiors

Best for: indoor scenes with mixed natural/artificial light, moody interiors.

- Engine: V-Ray 6 global illumination, physical camera
- Ray tracing: ray-traced reflections + path-traced ambient occlusion
- Film stock: Fuji Reala 500D or Sony Venice filter
- Dynamic range: HDR, 12-bit RAW
- Noise: light film grain
- Sharpening: medium, no edge harshness

### Profile: Game Engine Cinematic

Best for: fantasy, sci-fi, action sequences, open-world environments.

- Engine: Unreal Engine 5.3 Lumen + Nanite
- Style variant: Red Dead Redemption 2 style / Cyberpunk 2077 cutscene
- Ray tracing: ray-traced reflections + ray-traced shadows
- Dynamic range: HDR
- Sharpening: high
- Noise: clean

### Profile: Stylized Animation

Best for: 2D hand-drawn, 3D toon-shaded, Ghibli/Pixar style.

- 2D hand-drawn: watercolor background, pencil sketch texture
- 3D animation: cel-shading (三渲二), Ghibli texture, Pixar character render
- Noise: none or stylized paper grain
- Sharpening: soft, no sharpening
- Dynamic range: SDR standard

### Profile: Subsurface Realism (skin/organic)

Best for: character close-ups, creature detail, organic materials.

- Engine: Redshift RT, microsurface scattering
- Ray tracing: path tracing
- Materials: subsurface scattering, translucency, pore-level microgeometry
- Film stock: RED Komodo skin tone
- Sharpening: medium-high
- Noise: light grain

## Directive Placement Rules

- **Global style declaration**: place engine, film stock, dynamic range, and noise directives here. These apply to the entire video.
- **Per-shot style block**: place material, surface, and optical effect directives here when they apply to a specific shot or subject.
- **Never place render directives inside action descriptions.** Keep them in the style/quality block, separate from movement and performance.
- **Combine with existing style blocks.** If the prompt already has a `全局风格` or `【规格】` section, append render directives there.

## Integration with Other Skills

This skill adds a **rendering quality layer** on top of prompts generated by other skills:

- **shotlist-builder**: add render profile to the `【规格】` section or the STYLE_BLOCK
- **scene-board-skill**: add render directives to the lighting and atmosphere block
- **video-dialogue-punctuation**: no overlap — that skill handles dialogue delivery, this handles visual quality
- **reference-driven template**: add render directives to the `【规格】` line and the `【负面约束】` block

## What Not To Do

- Do not stack every directive into one prompt. Pick 3–5 directives that address the actual problem.
- Do not add game engine directives to a hand-drawn animation prompt.
- Do not add film grain to a scene that needs clinical cleanness.
- Do not override the user's existing style choices without asking.
- Do not place render directives inside dialogue or action beats.
- Do not treat this as a magic fix — if the reference images are weak, fix those first.

## Quick Selection Guide

Read [references/render-directives.md](references/render-directives.md) for the full directive catalog organized by category with Chinese and English prompt text.

## Output Rules

- When doing a quality pass on an existing prompt, only add/modify the style and quality sections.
- Preserve all existing action, dialogue, camera, and performance content unchanged.
- If the user asks for a specific look (e.g., "make it look like Black Myth Wukong"), select the matching render profile and explain which directives you chose and why.
- If the user's problem is unclear, ask one narrow question: "画面主要问题是光影太平还是材质太假？"
