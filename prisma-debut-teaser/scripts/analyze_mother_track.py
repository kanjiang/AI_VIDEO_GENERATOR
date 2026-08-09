"""
PRISMA mother track structure analyzer.

Reads the Suno-generated MP3, computes an RMS energy envelope,
and proposes likely section boundaries (intro / verse / chorus / rap / bridge).

Output: a table of time markers + a text-art energy curve.
"""

import subprocess
import numpy as np
from pathlib import Path

FFMPEG = r"C:\Users\kanjiang\AppData\Local\Packages\PythonSoftwareFoundation.Python.3.11_qbz5n2kfra8p0\LocalCache\local-packages\Python311\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe"
INPUT = r"c:\My workspace\AI_video_generator\prisma-debut-teaser\assets\audio\PRISMA-mother-v3.mp3"

# --- Decode MP3 to raw PCM (8kHz mono) via ffmpeg pipe ---
cmd = [FFMPEG, "-i", INPUT, "-f", "s16le", "-ac", "1", "-ar", "8000", "-loglevel", "error", "-"]
raw = subprocess.check_output(cmd)
samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
sr = 8000
duration = len(samples) / sr
print(f"Duration: {duration:.2f}s  ({int(duration//60)}:{duration%60:05.2f})")
print(f"Samples: {len(samples)}  SR: {sr}Hz")
print()

# --- RMS envelope with 250ms window ---
window_ms = 250
window = sr * window_ms // 1000  # 2000 samples
n_windows = len(samples) // window
rms = np.array([
    float(np.sqrt(np.mean(samples[i*window:(i+1)*window]**2)))
    for i in range(n_windows)
])
rms_db = 20 * np.log10(rms + 1e-10)

# --- Smooth: 2-second moving average ---
kernel_size = int(2000 / window_ms)  # 2s / 250ms = 8 windows
kernel = np.ones(kernel_size) / kernel_size
rms_smooth = np.convolve(rms_db, kernel, mode="same")

# --- Detect boundaries via novelty (local peaks of |derivative|) ---
diff = np.abs(np.diff(rms_smooth))
# Suppress super-fine changes: only jumps > 3dB across a 2s window
diff_smoothed = np.convolve(diff, np.ones(4)/4, mode="same")

# Find peaks above the 92nd percentile, with minimum 4s spacing
threshold = np.percentile(diff_smoothed, 92)
peaks = []
min_gap_windows = int(4000 / window_ms)  # 16 windows
i = 1
while i < len(diff_smoothed) - 1:
    if (diff_smoothed[i] > threshold
        and diff_smoothed[i] >= diff_smoothed[i-1]
        and diff_smoothed[i] >= diff_smoothed[i+1]):
        peaks.append(i)
        i += min_gap_windows
    else:
        i += 1

boundaries = [p * window_ms / 1000 for p in peaks]

# --- Categorize each 5s bucket into LOUD / MEDIUM / QUIET ---
low_thresh = np.percentile(rms_smooth, 30)
high_thresh = np.percentile(rms_smooth, 65)

def label(db_val):
    if db_val > high_thresh:
        return "LOUD"
    elif db_val < low_thresh:
        return "quiet"
    return "med"

# --- Print detected boundaries ---
print("=" * 60)
print("DETECTED SECTION BOUNDARIES (energy change points)")
print("=" * 60)
print(f"Total: {len(boundaries)} boundaries found")
print()
print(f"{'#':>3} | {'Time':>8} | {'MM:SS':>7} | Δ(dB)")
print("-" * 50)
for i, t in enumerate(boundaries, 1):
    idx = int(t * 1000 / window_ms)
    if idx > 0 and idx < len(rms_smooth):
        delta = rms_smooth[idx] - rms_smooth[max(0, idx - kernel_size)]
        direction = "↑ energy up  " if delta > 0 else "↓ energy down"
        mm = int(t // 60)
        ss = t % 60
        print(f"{i:>3} | {t:>7.2f}s | {mm:>2}:{ss:>05.2f} | {delta:>+5.1f}  {direction}")

# --- Print energy curve (2-second buckets) ---
print()
print("=" * 60)
print("ENERGY CURVE (2s buckets)")
print("=" * 60)
print(f"LOUD threshold: {high_thresh:.1f} dB   quiet threshold: {low_thresh:.1f} dB")
print()
print(f"{'Time':>7}  {'MM:SS':>6}  {'dB':>6}  Bar")
print("-" * 60)
bucket = int(2000 / window_ms)  # 2s buckets
max_bar = 40
db_min = rms_smooth.min()
db_max = rms_smooth.max()
db_range = db_max - db_min if db_max > db_min else 1
for i in range(0, n_windows, bucket):
    t = i * window_ms / 1000
    db = rms_smooth[min(i, len(rms_smooth)-1)]
    bar_len = int((db - db_min) / db_range * max_bar)
    bar = "█" * bar_len + "·" * (max_bar - bar_len)
    lbl = label(db)
    marker = "  <-- BOUNDARY" if any(abs(t - b) < 1 for b in boundaries) else ""
    mm = int(t // 60)
    ss = t % 60
    print(f"{t:>6.1f}s  {mm:>2}:{ss:>05.2f}  {db:>6.1f}  {bar} {lbl:>5}{marker}")

print()
print("=" * 60)
print("PROPOSED SECTION MAPPING (heuristic — needs your confirmation)")
print("=" * 60)
print()
print("Based on energy curve, likely structure:")
print(f"  Intro:      0:00 → {boundaries[0]:.1f}s   (quiet start)")
prev = 0
for i, b in enumerate(boundaries):
    if i == 0: continue
    prev = boundaries[i-1] if i > 0 else 0
    print(f"  Segment {i}: {prev:.1f}s → {b:.1f}s")
if boundaries:
    print(f"  Outro:      {boundaries[-1]:.1f}s → {duration:.1f}s")
