# Sound Design Techniques (音效设计技巧)

Creative sound editing techniques for AI video post-production. These are applied in CapCut/剪映 after AI footage is assembled on the timeline.

---

## 1. Strong Beat Cut-off (强音断奏法)

**Suitable for:** Music needs to end abruptly without sounding jarring — scene transitions, hard cuts, dramatic pauses.
**Difficulty:** Zero-basis
**Time:** ~1 min per cut point

### Problem it solves

Cutting music mid-phrase sounds unfinished and awkward. Adding a fade-out makes every ending feel soft and similar. The strong beat cut-off gives a clean, intentional stop.

### Steps

1. Locate the frame where music must stop (the hard cut point).
2. Cut the music track at that frame.
3. On a separate audio track, place a **short percussive SFX** aligned to the same frame:
   - Door slam / 关门声
   - Clap / 拍手声
   - Drum hit / 鼓点
   - Stamp / 跺脚声
   - Book drop / 书落声
4. The SFX onset masks the music cut, creating a rhythmic "period" at the end of the phrase.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| SFX duration | 0.3–1.0 sec | Short and sharp — avoid reverby SFX that bleed into the next scene |
| SFX volume relative to music | +3 to +6 dB above music peak | Must be clearly louder than the music at the cut point |
| Music fade before cut (optional) | 0.1–0.3 sec micro-fade | A tiny fade right before the cut softens the waveform tail, but is short enough to not feel like a "fade-out" |

### Tips

- Choose SFX that **match the scene content** — a door slam works if a door is visible; a clap works if a character's hands are in frame. This doubles as the "Physical Trigger" technique (§2).
- For comedy or fast-paced edits, stack 2 SFX (e.g., clap + whoosh) for extra punch.
- Avoid using the same SFX for every cut — rotate 3–4 variants to prevent listener fatigue.

### Prompt-level connection

If you know during prompt writing that a scene will end with a strong beat cut-off, include the physical action (door closing, hand clap, object drop) in the `【电影化动态描述】` so the AI generates matching visuals.

---

## 2. Physical Trigger (物理引导法)

**Suitable for:** Making music entrance feel diegetic — the music "comes from" a visible source in the scene.
**Difficulty:** Zero-basis
**Time:** ~2 min

### Problem it solves

Music that starts from silence feels arbitrary ("where did the soundtrack come from?"). Binding the music entrance to a physical on-screen action makes it feel natural and intentional.

### Steps

1. Identify a frame where a character performs an action that could logically trigger sound:
   - Puts on headphones / earbuds
   - Presses a button (radio, speaker, phone)
   - Opens a door / window (ambient music floods in)
   - Turns a car ignition (engine + radio)
   - Drops a needle on a record player
2. Place the music track start at the **exact frame** of the action (or 1–2 frames after for realism).
3. Optionally: ramp music volume from -∞ to target over 0.3–1.0 sec to simulate "fading in from a speaker."

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Music start offset from action | 0–2 frames (0–66ms at 30fps) | Tight sync feels intentional; >3 frames feels late |
| Volume ramp (if simulating speaker) | 0.3–1.0 sec fade-in | Skip the ramp if music should hit at full volume instantly (e.g., slamming a play button) |

### Tips

- This technique works in reverse too: character **removes** headphones → music **cuts** (combine with §1 Strong Beat Cut-off).
- For AI video: plan the trigger action at the prompt level. Add "角色戴上耳机" or "角色按下音箱开关" to the `【电影化动态描述】`.

### Prompt-level connection

**This technique spans prompt and post-production.** The trigger action must exist in the generated video. Add it during prompt writing:
```
动作：...③角色[戴上耳机/按下音响/推开窗户]——⚠️此动作用于后期物理引导法音乐入场，动作必须清晰可见。
```

---

## 3. SFX Beat Sync (音效卡点法)

**Suitable for:** Rhythm-driven edits — montages, product showcases, training sequences, travel vlogs.
**Difficulty:** Intermediate
**Time:** ~5–10 min per 15-sec segment

### Problem it solves

Visual cuts alone don't create rhythm. When SFX hits land exactly on music beats, the video feels "locked in" — every cut has weight and intention.

### Steps

1. Import your music track and identify the **beat grid** (CapCut's "Beat" marker feature or manual waveform reading).
2. Mark each beat you want to sync (not every beat — pick the strong beats, typically 1 and 3 in 4/4 time).
3. Record or source short percussive SFX:
   - Different intensities: soft tap, medium knock, hard slam
   - Different timbres: metallic, wood, fabric, skin
4. Place each SFX on a separate audio track, aligned to the marked beat.
5. Adjust SFX volume:
   - Strong beats → louder SFX
   - Weak beats → softer SFX or no SFX (let the music carry it)

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| SFX-to-beat alignment tolerance | ±1 frame (±33ms at 30fps) | Human perception notices >50ms offset |
| SFX volume (strong beat) | -6 to -3 dB relative to music | Should punch through, not overpower |
| SFX volume (weak beat) | -12 to -9 dB relative to music | Subtle rhythmic texture |
| Safety track level | -12 dB | Record a backup track 12dB quieter to rescue clipped takes |

### Tips

- **Record multiple intensities** of the same SFX (light tap, medium, hard) — this gives you dynamics without needing different sounds.
- Enable "Safety Track" (安全音轨) on your mic if available — it records a second track at -12 dB as insurance against peaking.
- Not every beat needs an SFX. A pattern of "hit, skip, hit, hit, skip" creates more interesting rhythm than hitting every beat.

---

## 4. SFX Match Splice (音效匹配法)

**Suitable for:** Transitions between scenes, amplifying visual impact, creative scene bridging.
**Difficulty:** Intermediate
**Time:** ~2 min per splice

### Problem it solves

Hard visual cuts between scenes can feel disconnected when the audio doesn't bridge. Splicing two **timbrally similar** SFX creates an audio match cut — the sound carries the audience across the visual jump.

### Steps

1. Identify the cut point between two scenes.
2. Find two SFX that share a timbral quality but belong to different contexts:
   - Firecracker → explosion
   - Faucet drip → rainfall
   - Bicycle chain rattle → mechanical grinding
   - Typing → rain on tin roof
   - Heartbeat → bass drum
   - Lighter flick → campfire crackle
3. Place SFX-A in the tail of Scene A (last 0.5–1.5 sec).
4. Place SFX-B at the head of Scene B (first 0.5–1.5 sec).
5. Overlap them by 2–4 frames at the cut point with a short crossfade.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| SFX-A tail duration | 0.5–1.5 sec before cut | Enough for the audience to register the sound |
| SFX-B head duration | 0.5–1.5 sec after cut | Establishes the new scene's audio identity |
| Crossfade overlap | 2–4 frames (66–133ms) | Longer crossfade for similar timbres; shorter for contrast |

### Tips

- The more timbrally similar the two SFX, the smoother the transition. Audiences won't consciously notice the switch.
- This pairs excellently with the **Close-up Transition Chain** (§10.4 in `CAMERA_EMOTION.md`) — visual shape-match + audio timbre-match = seamless bridge.
- Build a personal SFX-pair library organized by timbre family (metal, water, organic, mechanical).

### Prompt-level connection

If planning an SFX match splice, the `【尾帧转场】` in the prompt can reference the sound source:
```
【尾帧转场】本视频最后1秒：[SFX-A 的物理来源在画面中可见——水龙头滴水特写]。
⚠️下一视频首帧：[雨滴打在窗户上的特写]——后期用音效匹配法将水滴声→雨声。
```

---

## 5. Environment Replace / J-Cut (环境代替法 / J-Cut)

**Suitable for:** Scene transitions that need to feel organic, especially nature/travel/mood shifts.
**Difficulty:** Zero-basis
**Time:** ~3 min per transition

### Problem it solves

Cutting directly from a music-driven scene to a quiet scene feels abrupt. Fading music to silence, then starting the new scene, creates a dead gap. The J-Cut lets the **new scene's environment audio arrive before the visual cut**, so the audience's ears lead them into the next scene.

### Steps

1. On the timeline, identify the transition point between Scene A and Scene B.
2. Scene A's music track: apply a **volume fade-out** starting 2–4 seconds before the cut point.
3. Scene B's environment audio (wind, water, birds, city hum, rain): place it on a separate track starting **1–3 seconds before the visual cut** — the environment sound is heard while Scene A's visuals are still on screen.
4. At the visual cut point, Scene B's image appears — but the audience already "hears" the new scene.
5. Optionally: hold 1–2 seconds of Scene B as an **empty shot** (空镜头 — no characters, just environment) before introducing characters.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Music fade-out duration | 2–4 sec | Gradual enough to feel natural, not noticeable as a "fade" |
| Environment audio pre-roll | 1–3 sec before visual cut | The "J" shape — audio arrives before video |
| Environment audio volume ramp | Start at -18 dB, reach target by visual cut | Gentle enough that the audience feels "something changed" without knowing why |
| Post-cut empty shot duration | 1–2 sec | Gives the audience time to absorb the new space before action begins |

### Tips

- The stronger the contrast between scenes (indoor→outdoor, city→nature, day→night), the longer the environment pre-roll should be — give the audience more time to adjust.
- **Layer 2–3 environment sounds** for realism: wind + distant birds + rustling leaves, rather than a single "nature" loop.
- Reverse J-Cut (L-Cut): keep Scene A's audio running 1–2 sec into Scene B's visuals — useful when a character's dialogue needs to finish while the camera has already moved to the listener's reaction.

### Prompt-level connection

For AI video, the `【尾帧转场】` section can plan for J-Cut:
```
【尾帧转场】本视频最后3秒：音乐渐弱，环境音[描述目标场景的主要环境音——流水声/风声/雨声]渐入。
画面：当前场景正常推进，⚠️不做视觉转场。
⚠️后期J-Cut：目标场景环境音在本段末尾提前1-3秒出现。
```

---

## 6. Beat-Aligned Music Trim (重音切断法)

**Suitable for:** Making music end naturally at any arbitrary point — the song "feels" like it finished there all along.
**Difficulty:** Intermediate
**Time:** ~3–5 min per edit

### Problem it solves

§1 masks a music cut with an external SFX. This technique is different: it **restructures the song itself** so the ending sounds musically natural — no external SFX needed.

### Steps

1. Identify the frame where music must stop (the "target cut point").
2. Locate the song's **original outro / ending section** — the part where the song naturally winds down.
3. Cut the outro from the main song and set it aside.
4. Go back to the target cut point. Find the nearest **beat accent** (strong beat) just before or at the cut point.
5. Zoom into the audio waveform. Cut precisely at the beat accent.
6. Place the outro section immediately after the cut. **Align the waveform peaks** of the outro's first beat with the cut point.
7. Apply a **short fade-out** (渐出) on the end of the first segment and a **short fade-in** (渐入) on the start of the outro segment — typically 0.05–0.2 sec each.
8. Play back and verify: the song should sound like it reached a natural ending at the target point.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Waveform zoom level | Max zoom — individual peaks visible | Alignment must be peak-to-peak accurate |
| Fade-in / fade-out duration | 0.05–0.2 sec | Just enough to prevent click/pop at the splice; too long and the splice becomes audible |
| Beat accent tolerance | ±1 beat from target cut point | Adjust the video cut ±0.5 sec to land on a clean beat if needed |

### Tips

- This works best with songs that have a clear outro section (instrument fade, final chord, drum fill ending).
- If the song has no distinct outro, use the last 2–4 bars before the final chord and crossfade.
- Combine with §1 (Strong Beat Cut-off) as a fallback: if the waveform splice isn't clean enough, add a subtle SFX hit at the join point as insurance.

### Key principle

> Always cut at a **beat accent** (waveform peak), never in a trough or mid-phrase. Accents mask the splice.

---

## 7. Transition SFX Stack (过渡音效叠加法)

**Suitable for:** Creating a professional, cinematic music ending with layered transition sounds — trailers, dramatic pauses, scene shifts.
**Difficulty:** Intermediate
**Time:** ~3 min per transition point

### Problem it solves

A single SFX hit (§1) gives a clean cut but sounds thin. A 4-layer transition SFX stack creates a **full, cinematic ending** with build-up, impact, and decay — the same technique used in movie trailers.

### The 4 SFX layers

| Layer | Type | Role | Timing |
|---|---|---|---|
| 1 | **Riser (上升音)** | Builds tension before the cut — a rising pitch or volume sweep | Starts 1–3 sec before the cut point, peaks at cut |
| 2 | **Drone (氛围音)** | Sustained low-frequency bed that adds weight | Starts with or slightly before the riser, sustains through the cut |
| 3 | **Hit (重音)** | The impact — a percussive slam at the exact cut point | Aligned precisely to the cut frame |
| 4 | **Downer (低沉尾音)** | Decays after the hit — a descending tone or reverb tail | Starts at the cut point, fades out over 1–3 sec |

### Steps

1. Find the cut point where music must stop.
2. Cut the music and find the nearest beat accent (same as §6).
3. Layer the 4 SFX on separate audio tracks:
   - **Track A (Riser):** Place so it crescendos into the cut point.
   - **Track B (Drone):** Place so it underlays the riser and sustains briefly past the cut.
   - **Track C (Hit):** Align its peak exactly to the cut frame.
   - **Track D (Downer):** Starts at the cut frame, trails off into the next scene or silence.
4. Align Hit's waveform peak with the cut point — this is the anchor.
5. Adjust relative volumes so the Hit is loudest, Riser and Downer are supporting, Drone is subtle.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Riser duration | 1–3 sec | Shorter for quick cuts, longer for dramatic pauses |
| Hit duration | 0.1–0.5 sec | Sharp and clean |
| Downer duration | 1–3 sec | Match to the silence/new scene opening duration |
| Drone volume | -12 to -6 dB below Hit | Felt more than heard |
| Hit volume | +3 to +6 dB above music at cut | Must be the dominant element |

### Tips

- You don't need all 4 layers every time. **Hit + Downer** is the minimum for a cinematic feel. Add Riser for build-up. Add Drone for gravity.
- Many free SFX packs include "Trailer Transition" bundles with pre-matched Riser/Hit/Downer sets.
- Rotate SFX sets across different cut points — using the same transition sound twice in one video sounds repetitive.

---

## 8. Stem Editing (分轨剪辑法)

**Suitable for:** Precise music control — ending music cleanly, matching emotion to scenes, creating dynamic builds and drops.
**Difficulty:** Advanced
**Time:** ~10–15 min setup, then fast per edit

### Problem it solves

A full mixed song is a single blob — you can't remove the drums without removing everything else. **Stems** (分轨) are the individual instrument tracks (guitar, drums, bass, vocals, etc.) that make up a song. With stems, you can surgically control which instruments play at any moment.

### Where to get stems

- **曲多多 (Qududuo):** Licensed music platform with downloadable stems for commercial use.
- **AI stem separation tools:** Services like LALAL.AI, Moises, or Demucs can split any mixed song into approximate stems (quality varies).
- **Stock music libraries:** Many premium libraries include stem downloads.

### Steps — Clean ending via stems

1. Import all stems (guitar, drums, bass, vocals, etc.) onto separate tracks in CapCut/your editor.
2. Align all stems to the same start point (they must play in sync).
3. Find the target cut point.
4. Identify which stem has the **strongest waveform** (highest amplitude) at that point — this is usually drums or bass.
5. Cut **all** stems at the target point.
6. **Mute/hide** the dominant stems (drums, bass) after the cut point.
7. Let the remaining quieter stems (guitar, pad, ambient texture) continue for 1–3 more seconds, then fade them out.
8. Result: the music feels like it naturally wound down, because the "energy" instruments stopped while the "texture" instruments lingered.

### Steps — Emotional layering (情绪分层)

This is the most powerful use of stems for AI video. Map instrument layers to emotional intensity:

| Emotion level | Active stems | Use case |
|---|---|---|
| **Calm / opening** | Solo guitar or piano | Intro scenes, quiet moments, establishing shots |
| **Building** | + light percussion (shaker, hi-hat) | Character enters, mild tension, walking scenes |
| **Energized** | + full drums + bass | Arrival, action, discovery, excitement |
| **Climax** | + vocals + strings/synth + everything | Climactic moments, hero shots, emotional peaks |
| **Wind-down** | Remove drums → remove bass → solo instrument | Closing, reflection, aftermath |

### Steps — Emotional layering workflow

1. Lay out all stems on the timeline.
2. Mark the emotional arc of the video on the timeline (calm → build → climax → wind-down).
3. At each transition point:
   - **Adding energy:** Unmute the next stem layer 0.5–1 sec before the visual beat, with a 0.3 sec volume fade-in.
   - **Removing energy:** Mute a stem layer at a beat accent, with a 0.1–0.3 sec fade-out.
4. Verify: the music should feel like a live band that's "reacting" to the story.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Stem fade-in (adding layer) | 0.3–1.0 sec | Gentle enough to not sound like a "track start" |
| Stem fade-out (removing layer) | 0.1–0.3 sec | Quick at beat accents; longer at phrase ends |
| Layer change lead time | 0.5–1 sec before visual beat | Music shifts slightly before the picture — the ear leads the eye |

### Tips

- **Layer changes at phrase boundaries** sound most natural. Don't add drums in the middle of a guitar phrase — wait for the next bar.
- For AI video 15-second segments: a typical segment can handle 1–2 stem layer changes at most. More feels chaotic.
- The "ear leads the eye" rule: add a stem layer 0.5–1 sec **before** the visual change, so the audience feels the energy shift coming.

---

## 9. Music Extension (音乐延长法)

**Suitable for:** A song is too short for your video; you need to loop or extend it without audible repetition.
**Difficulty:** Intermediate
**Time:** ~3–5 min per extension

### Problem it solves

Your chosen song is 1:49 but the video is 2:30. Simple looping creates an obvious "restart." Beat-aligned extension makes the song feel naturally longer.

### Steps

1. Identify the section you want to repeat (typically the verse or pre-chorus — NOT the most recognizable chorus, which would sound obviously repeated).
2. Find two **beat accents** in this section:
   - **Point A:** The start of the section you'll copy.
   - **Point B:** The end of the section you'll copy.
3. Cut at Point A. Copy the segment A→B.
4. Go to the position where you need more time. Find a beat accent at this insertion point.
5. Cut at the insertion point. Insert the copied segment.
6. Zoom into the waveform and align the peaks at both splice points (entry and exit of the inserted segment).
7. Apply 0.05–0.2 sec fade-in/fade-out at each splice to eliminate clicks.
8. Play back — the extension should be seamless.

### Parameters

| Parameter | Value | Notes |
|---|---|---|
| Minimum loop segment length | 4 bars (typically 4–8 sec) | Shorter loops are more likely to sound repetitive |
| Splice fade duration | 0.05–0.2 sec | Peak-to-peak alignment reduces the need for long fades |
| Max repetitions before noticeable | 2 | After 2 repeats of the same segment, listeners start noticing |

### Tips

- **Choose the least distinctive section** to loop — a simple verse or instrumental bridge. Looping the chorus is immediately obvious.
- For shortening music, the same principle applies in reverse: find the beat accent, cut out the unwanted section, align waveforms.
- **Adobe Audition shortcut:** Import → Right-click → Remix → Enable Remix → Set target duration. AU auto-analyzes the song and generates splice points. Export the result. This automates the entire process but requires AU.

---

## Recording best practices (录音避坑指南)

### Separate voice and environment

Always record dialogue/narration and environment sound on **separate tracks** or in **separate takes**:

| Track | Noise reduction setting | Purpose |
|---|---|---|
| Voice / dialogue | Strong noise reduction (强降噪) | Clean vocal isolation |
| Environment / ambience | Weak noise reduction (弱降噪) | Preserve natural room tone, wind, background life |

Mixing separate clean tracks in post gives full control. A single mixed recording locks you into whatever balance was captured.

### Safety track

Enable "Safety Track" (安全音轨) on your mic/recorder — it records a duplicate track at **-12 dB** below the main track. If the main track clips or peaks during a loud moment, the safety track preserves a clean copy.

### SFX collection habit

Record a variety of intensities (soft / medium / hard) for every percussive sound you capture. A library of 10 sounds × 3 intensities gives you 30 options for beat sync work.

---

## Technique combination guide (技巧组合指南)

These techniques are most powerful in combination:

| Combination | Effect |
|---|---|
| Physical Trigger (§2) + Strong Beat Cut-off (§1) | Music enters with an action, exits with a percussive hit — clean bookends |
| SFX Match Splice (§4) + Close-up Transition Chain (CAMERA_EMOTION §10.4) | Audio timbre match + visual shape match = double-layered seamless transition |
| Environment Replace (§5) + SFX Match Splice (§4) | Environment sound pre-rolls AND bridges via timbre match — ultra-smooth scene change |
| SFX Beat Sync (§3) + Quick Cut (editing-techniques §2) | Rapid visual cuts locked to SFX hits on music beats — maximum rhythm impact |
| Strong Beat Cut-off (§1) + Flash Cut (editing-techniques §3) | Flash visual sequence ends with a percussive slam — dramatic punctuation |
| Beat-Aligned Trim (§6) + Transition SFX Stack (§7) | Song waveform-spliced to its own outro, then layered with Riser/Hit/Downer for cinematic weight |
| Stem Emotional Layering (§8) + Environment Replace (§5) | Stems thin out (drums → guitar only) as environment audio fades in — double-layer energy decrease for scene transitions |
| Stem Emotional Layering (§8) + Physical Trigger (§2) | Character action triggers a new stem layer — e.g., starting a car engine unmutes drums + bass |
| Music Extension (§9) + Beat-Aligned Trim (§6) | Extend the song for the full video, then trim naturally at the final scene — full lifecycle music control |
