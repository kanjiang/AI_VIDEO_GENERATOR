# SFX Sourcing & Audio Mixing

## SFX timeline table format

The SFX timeline is a numbered list in the `bgm-composition.md` file:

```markdown
| 编号 | 音效名称 | 时间点 | 来源建议 |
|------|----------|--------|----------|
| SFX-01 | [描述性名称] | [MM:SS] | [来源] |
| SFX-02 | … | … | … |
```

Each entry also needs a **technical spec** for the mixing script:

```python
SFX_TIMELINE = [
    # (filename, start_seconds, volume_db)
    ("SFX-01_descriptive_name.wav", 1.0, 0),
    ("SFX-02_another_effect.wav",   4.0, -3),
]
```

### Volume offset guidelines

| SFX type | Typical volume offset | Reason |
|---|---|---|
| Foley (footsteps, cloth, impact) | 0 to -3 dB | Close and present |
| Ambient (crowd, night sounds) | -8 to -12 dB | Background texture |
| Comedic accent (trombone, boing) | -3 to 0 dB | Needs to cut through |
| Emotional (crying, sighing) | -6 to -8 dB | Present but not overwhelming |
| Voice/speech | -3 to 0 dB | Must be intelligible |

## SFX sourcing workflow

### Free sources (no login required for download)

| Source | URL | Best for | Format |
|---|---|---|---|
| **Mixkit** | mixkit.co/free-sound-effects/ | General Foley, UI, nature | WAV |
| **Pixabay Audio** | pixabay.com/sound-effects/ | Ambient, nature, crowds | MP3 |
| **BBC Sound Effects** | sound-effects.bbcrewind.co.uk | High-quality Foley, nature | WAV |

### Mixkit download pattern

Mixkit URLs follow a predictable pattern. To download:

```powershell
Invoke-WebRequest -Uri "https://assets.mixkit.co/active_storage/sfx/[ID]/[ID]-preview.mp3" `
    -OutFile "SFX-01_name.wav"
```

Search strategy:
1. Go to `mixkit.co/free-sound-effects/`
2. Search by English keyword (e.g., "clay squish", "music box", "wind chimes")
3. Note the SFX ID from the page URL or audio element
4. Download using the pattern above

### Naming convention

```
SFX-[NN]_[english_description].wav
```

Examples: `SFX-01_clay_squish.wav`, `SFX-12_soft_impact.wav`, `SFX-21_wind_chimes.wav`

### Sounds that require external generation

Some sounds cannot be sourced from free libraries:
- **Human speech/voice lines** (e.g., "小丁不哭", "晚安") → Use AI TTS (Azure TTS, 通义听悟) or record
- **Specific branded sounds** → Record or commission
- **Very niche Foley** → Record with phone microphone + blanket (DIY studio)

## ffmpeg mixing script template

The following Python script mixes BGM + multiple SFX tracks onto a video file. It uses `imageio-ffmpeg` to locate the ffmpeg binary (install with `pip install imageio-ffmpeg`).

```python
import subprocess
import os
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BASE = r"[PROJECT_DIR]"
SFX_DIR = os.path.join(BASE, "assets", "sfx")

VIDEO = os.path.join(BASE, "[VIDEO_FILENAME]")
BGM = os.path.join(BASE, "[BGM_FILENAME]")
OUTPUT = os.path.join(BASE, "[OUTPUT_FILENAME]")

VIDEO_DURATION_S = 0  # set to actual video duration

SFX_TIMELINE = [
    # (filename, start_seconds, volume_db)
    # populate from the scoring plan
]

# --- Validation ---
for sfx_name, _, _ in SFX_TIMELINE:
    p = os.path.join(SFX_DIR, sfx_name)
    if not os.path.exists(p):
        print(f"WARNING: missing {sfx_name}")

# --- Build ffmpeg command ---
inputs = ["-i", VIDEO, "-i", BGM]
for sfx_name, _, _ in SFX_TIMELINE:
    inputs += ["-i", os.path.join(SFX_DIR, sfx_name)]

filter_parts = []

# BGM: trim to video length, apply volume
filter_parts.append(
    f"[1:a]atrim=0:{VIDEO_DURATION_S},asetpts=PTS-STARTPTS,volume=-3dB[bgm];"
)

# SFX: delay to correct timestamp, apply volume
for i, (sfx_name, start_s, vol_db) in enumerate(SFX_TIMELINE):
    input_idx = i + 2
    delay_ms = int(start_s * 1000)
    label = f"sfx{i}"
    vol_str = f"volume={vol_db}dB" if vol_db != 0 else "volume=0dB"
    filter_parts.append(
        f"[{input_idx}:a]adelay={delay_ms}|{delay_ms},apad=pad_dur=0,"
        f"{vol_str},atrim=0:{VIDEO_DURATION_S},asetpts=PTS-STARTPTS[{label}];"
    )

# Mix all streams
mix_inputs = "[bgm]" + "".join(f"[sfx{i}]" for i in range(len(SFX_TIMELINE)))
n_streams = 1 + len(SFX_TIMELINE)
filter_parts.append(
    f"{mix_inputs}amix=inputs={n_streams}:duration=first"
    f":dropout_transition=2,volume={n_streams * 0.7}dB[aout]"
)

filter_complex = "\n".join(filter_parts)

cmd = [
    FFMPEG,
    *inputs,
    "-filter_complex", filter_complex,
    "-map", "0:v",
    "-map", "[aout]",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    "-y",
    OUTPUT,
]

print(f"MIXING: BGM + {len(SFX_TIMELINE)} SFX → {OUTPUT}")
result = subprocess.run(cmd, capture_output=True, text=True)

if result.returncode == 0:
    size_mb = os.path.getsize(OUTPUT) / (1024 * 1024)
    print(f"SUCCESS: {OUTPUT} ({size_mb:.1f} MB)")
else:
    print(f"ERROR (exit {result.returncode}):")
    for line in result.stderr.split("\n")[-30:]:
        print(line)
```

### Script customization checklist

When generating this script for a specific project, replace:

| Placeholder | Description |
|---|---|
| `[PROJECT_DIR]` | Absolute path to the project folder |
| `[VIDEO_FILENAME]` | Source video filename |
| `[BGM_FILENAME]` | Generated BGM filename |
| `[OUTPUT_FILENAME]` | Output video filename (typically `[原名]_final.mp4`) |
| `VIDEO_DURATION_S` | Actual video duration in seconds |
| `SFX_TIMELINE` | Populated from the bgm-composition.md SFX table |

### Common ffmpeg issues

| Problem | Cause | Fix |
|---|---|---|
| `No such filter: amix` | ffmpeg built without libavfilter | Use imageio-ffmpeg (includes full build) |
| Audio out of sync | `adelay` uses milliseconds | Multiply seconds × 1000 |
| Output silent | Too many amix inputs dilute volume | Increase final `volume` value: `n_streams * 0.7` dB |
| Video re-encoded (slow) | Missing `-c:v copy` | Always copy video stream |
| PowerShell `&&` error | `&&` not valid in PS | Use `;` or `Set-Location` + separate command |
