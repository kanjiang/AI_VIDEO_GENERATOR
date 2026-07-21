import subprocess
import os
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BASE = r"c:\My workspace\AI_video_generator\dingyuxi-concert-qversion"
SFX_DIR = os.path.join(BASE, "assets", "sfx")

VIDEO = os.path.join(BASE, "小丁生日.mp4")
BGM = os.path.join(BASE, "Clay Music Box.mp3")
OUTPUT = os.path.join(BASE, "小丁生日_final.mp4")

VIDEO_DURATION_S = 83.4

SFX_TIMELINE = [
    # (filename, start_seconds, volume_db)
    ("SFX-01_clay_squish.wav",         1.0,   0),
    ("SFX-02_bell_ding.wav",           4.0,  -3),
    ("SFX-03_crowd_cheer.wav",         5.0, -12),
    ("SFX-04_music_box_mechanical.wav",14.0,  -6),
    ("SFX-05_blowing_candle.wav",     27.0,  -3),
    ("SFX-06_knife_cut.wav",          29.0,  -3),
    ("SFX-07_small_crowd_clapping.wav",29.5, -10),
    ("SFX-08_birthday_song_crowd.wav", 34.0, -10),
    ("SFX-09_stomp_hit.wav",          39.0,  -3),
    ("SFX-10_soft_crying.wav",        37.0,  -8),
    ("SFX-11_quick_footsteps.wav",    43.0,  -6),
    ("SFX-12_soft_impact.wav",        47.0,  -3),
    ("SFX-heartbeat.wav",            47.0,  -8),
    ("SFX-14_paper_rustling.wav",     54.0,  -6),
    ("SFX-15_ribbon_pull.wav",        57.0,  -3),
    ("SFX-16_small_group_laugh.wav",  58.0, -10),
    ("SFX-17_cartoon_trombone.wav",   60.0,  -3),
    ("SFX-18_crickets_night.wav",     61.0,  -8),
    ("SFX-19_footsteps_walking_away.wav", 65.0, -6),
    ("SFX-21_wind_chimes.wav",        78.0,  -3),
]

for sfx_name, _, _ in SFX_TIMELINE:
    p = os.path.join(SFX_DIR, sfx_name)
    if not os.path.exists(p):
        print(f"WARNING: missing {sfx_name}")

inputs = ["-i", VIDEO, "-i", BGM]
for sfx_name, _, _ in SFX_TIMELINE:
    inputs += ["-i", os.path.join(SFX_DIR, sfx_name)]

filter_parts = []

filter_parts.append(f"[1:a]atrim=0:{VIDEO_DURATION_S},asetpts=PTS-STARTPTS,volume=-3dB[bgm];")

for i, (sfx_name, start_s, vol_db) in enumerate(SFX_TIMELINE):
    input_idx = i + 2
    delay_ms = int(start_s * 1000)
    label = f"sfx{i}"
    vol_str = f"volume={vol_db}dB" if vol_db != 0 else "volume=0dB"
    filter_parts.append(
        f"[{input_idx}:a]adelay={delay_ms}|{delay_ms},apad=pad_dur=0,"
        f"{vol_str},atrim=0:{VIDEO_DURATION_S},asetpts=PTS-STARTPTS[{label}];"
    )

mix_inputs = "[bgm]" + "".join(f"[sfx{i}]" for i in range(len(SFX_TIMELINE)))
n_streams = 1 + len(SFX_TIMELINE)
filter_parts.append(
    f"{mix_inputs}amix=inputs={n_streams}:duration=first:dropout_transition=2,volume={n_streams * 0.7}dB[aout]"
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
    OUTPUT
]

print("=" * 60)
print("EDITING: mixing BGM + 20 SFX onto video")
print(f"Video: {VIDEO}")
print(f"BGM:   {BGM}")
print(f"SFX:   {len(SFX_TIMELINE)} tracks")
print(f"Output: {OUTPUT}")
print("=" * 60)

result = subprocess.run(cmd, capture_output=True, text=True)

if result.returncode == 0:
    out_size = os.path.getsize(OUTPUT) / (1024 * 1024)
    print(f"\nSUCCESS! Output: {OUTPUT}")
    print(f"Size: {out_size:.1f} MB")
else:
    print(f"\nERROR (exit code {result.returncode}):")
    for line in result.stderr.split("\n")[-30:]:
        print(line)
