# Project lock — Kiki, Ready Set Go!

This file is the cross-episode production lock for the preschool English-learning car series. It must be checked before any shotlist, storyboard, scene board, or Seedance prompt is written.

---

## Characters

### Kiki
- Identity one-liner: orange-red Q-version sport scooter; the brave, loud, mistake-friendly English learner.
- Body / vehicle shape: short, round, pumpkin-like gas tank; big round tires; compact front windshield; silver exhaust pipe.
- Default design: vibrant orange-red body, white side stripe with thin silver trim, gold iris headlights, black rubber mouth under the windshield.
- Series marker: hand-drawn red `K` sticker centered on the front windshield panel.
- Expression system: broad and readable; excitement uses enlarged gold pupils and upward mouth; mistakes use small pupils and tiny `o` mouth; pride uses crescent headlights and exhaust smoke.
- Voice / speech texture: high-energy young boy voice; fast; upward sentence endings; says wrong English without shame.
- Must match assets: `kiki-identity.png`.
- Drift bans: no realistic motorcycle texture, no brand logo, no missing `K` sticker, no cropped wheels, no color shift toward Bruno/Rosie red.

### Momo
- Identity one-liner: baby-blue mini hatchback; the shy learner who first whispers, then dares to speak.
- Body / vehicle shape: small rounded hatchback, large wheels, short antenna like a hair tuft.
- Default design: baby-blue body, white roof, light-brown iris headlights, slightly downturned grille-mouth.
- Series marker: small faded Sunshine Valley photo charm hanging from the right mirror.
- Expression system: smaller emotional range than Kiki; hesitation shows half-closed headlights and tiny mouth movement; success shows soft crescent headlights and warm tail-light glow.
- Voice / speech texture: soft young boy voice; slow; pauses before speaking; whispers before saying a full line.
- Must match assets: `momo-identity.png`.
- Drift bans: no saturated blue that competes with Kiki, no missing photo charm, no overly happy default mouth, no cropped antenna or wheels.

### Bruno
- Identity one-liner: rust-red Q-version flat-front truck; the warm elder who welcomes and stabilizes the children.
- Body / vehicle shape: larger than Kiki/Momo; rounded box cab; open wooden rail cargo bed; thick tires.
- Default design: warm rust-red body, cream roof, dark-brown iris headlights, wide horizontal grille-mouth.
- Series marker: small wooden-framed blackboard tied to the cargo bed rail; chalk text changes per episode.
- Expression system: controlled, warm, slow; minimal movement; approval is a soft headlight crescent and tiny grille lift.
- Voice / speech texture: mature male voice; slow, steady, warm.
- Must match assets: `bruno-identity.png`.
- Drift bans: no realistic heavy truck, no bright fire-engine red, no missing blackboard, no big comedic expressions.

### Rosie
- Identity one-liner: red mini double-decker bus; the local English guide and pronunciation helper.
- Body / vehicle shape: short, tall, round double-decker bus; lower passenger row + upper open viewing layer.
- Default design: British pillar-box red body, white roof, gold window frames, gold `ROSIE` lettering.
- Series marker: green iris headlights, gold-framed flip sign on the upper front deck; sign text changes per location.
- Expression system: gentle and teacherly; never slapstick; pronunciation uses clear mouth shapes and steady eye contact.
- Voice / speech texture: warm female voice; slow; British RP pronunciation; repeats target sentence normal / slow / natural.
- Must match assets: `rosie-identity.png`.
- Drift bans: no real London bus proportions, no missing upper sign, no route numbers, no advertising graphics, no eye color other than green.

### Pumpy
- Identity one-liner: guest gas-station attendant car for Ep 01.
- Body / vehicle shape: compact service utility car with a friendly middle-aged face.
- Default design: cream-and-green station colors; small gas-pump cap or nozzle-shaped hat.
- Must match assets: `pumpy-identity.png`.
- Drift bans: no human attendant, no generic gas station robot, no scary industrial nozzle.

---

## Scenes

### Global
- Aspect: 9:16 vertical.
- Style source: Pixar-grade preschool 3D animation; warm, bright, high-saturation but soft; large readable faces and silhouettes.
- Color card asset: `kiki-english-town-color-card.png` recommended before generating 3+ video prompts.
- Practical-light rule: only scene-embedded light sources, sky, signs, tunnel letters, station lamps, and dashboard/glow effects. No film softboxes or abstract studio lighting inside video prompts.

### Alphabet Tunnel
- Time of day / weather: warm morning, clear air.
- Key practical lights: glowing A-Z wall letters and vehicle headlights.
- Spatial anchors: tunnel mouth vertical center; Kiki and Momo exit toward camera; letters recede behind them.
- Palette notes: warm gray tunnel stone, rainbow letter lights, orange-red Kiki, baby-blue Momo.
- Matching assets: `alphabet-tunnel-scene.png`.

### English Town Entrance
- Time of day / weather: morning, clean sunny sky.
- Key practical lights: sky sunlight, glowing green road sign, Bruno blackboard chalk area.
- Spatial anchors: Bruno parked near circular town entrance; green lane leads toward Gas Station; town sign and fountain hints in background.
- Palette notes: warm gold + clean town pastels + green gas-station route.
- Matching assets: `english-town-entrance-scene.png`.

### Gas Station
- Time of day / weather: same morning as town entrance.
- Key practical lights: sky, pump display glow, green gas-station sign, glossy reflections on pump.
- Spatial anchors: green pump center; Pumpy near pump; Rosie near teaching side; Kiki pulls into pump lane; Momo waits slightly behind and to Kiki's side.
- Palette notes: bright gas-station green as episode visual anchor; white/cream architecture; avoid dirty industrial realism.
- Matching assets: `gas-station-exterior-scene.png`, `gas-pump-closeup-prop.png`.

### Follow-along card
- Visual rule: clean white card, large English target sentence, smaller Chinese support line.
- Text-safe rule: target sentence must stay in upper-middle vertical safe area; bottom 15-20% reserved for platform UI/subtitles.
- Matching assets: `follow-along-card-template.png`.

---

## Pacing

- Form: preschool vertical English-learning micro-episode.
- Unit length: 60-90 seconds; Ep 01 target 75 seconds.
- Prompt segment target: 10-15 seconds per generated clip, then edit together.
- Hook window: first 5-8 seconds after fixed opening must reveal the location and English problem.
- Mid beat cadence: a new visual beat every 5-8 seconds; no extended static instruction.
- Cliffhanger: required; each episode ends with a small next-stop visual.
- Genre lane: cute educational adventure, not drama or suspense.
- Emotion arc: curiosity → mistake → comic mess → correction → success → audience repeat.
- Vertical rules: `VERTICAL_SHORT.md` on.
- Composition lock: subjects stay vertical center or upper-center; lower frame reserved for bilingual subtitles and follow-along text.
- Dialogue budget: preschool repetition is allowed, but each 15s prompt should keep spoken lines short and clearly ordered.
- BGM rule: video-generation prompts must suppress BGM; music is designed in post.
