"""
THE DEEP CROWN — 第一幕混音脚本（Prompt 01A–06，11 条 / 165 秒）

配乐方案：screenplay/bgm-composition.md

用法：
    pip install imageio-ffmpeg
    python mix_act1_opening.py            # 拼接 + 混音
    python mix_act1_opening.py --concat    # 只拼接 11 条片段
    python mix_act1_opening.py --mix       # 只混音（假设已有拼接文件）

素材目录：
    clips/            11 条 15 秒片段
    assets/bgm/       4 个情绪块 BGM
    assets/sfx/       59 个音效文件
"""

import argparse
import os
import subprocess
import sys
import tempfile

import imageio_ffmpeg

# Windows 控制台默认代码页非 UTF-8，中文提示会显示为乱码
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BASE = os.path.dirname(os.path.abspath(__file__))
SFX_DIR = os.path.join(BASE, "assets", "sfx")
BGM_DIR = os.path.join(BASE, "assets", "bgm")
CLIP_DIR = os.path.join(BASE, "clips")

# 11 条 15 秒片段，按叙事顺序
CLIPS = [
    "01A_边境巡逻.mp4",
    "01B_捕捉逃出.mp4",
    "02A_紧急议事.mp4",
    "02B_玛伦离席.mp4",
    "03A_残骸调查.mp4",
    "03B_赛宝质问.mp4",
    "04A_请战父拒.mp4",
    "04B_母亲伤口.mp4",
    "05A_代价警告.mp4",
    "05B_变形落地.mp4",
    "06_破水目送.mp4",
]

CONCAT_LIST = os.path.join(BASE, "_concat_list.txt")
SEQUENCE = os.path.join(BASE, "act1_full_165s.mp4")
OUTPUT = os.path.join(BASE, "act1_full_165s_final.mp4")

VIDEO_DURATION_S = 165

# 4 个情绪块 BGM：(文件名, 起始秒, 音量dB)
# 对白段若仍压人声，先在 DAW 里切 500Hz 以上，再动这里的值
BGM_BLOCKS = [
    ("block1_深渊与猎杀_00-30.wav",   0.0, -6),
    ("block2_王权与恐惧_30-60.wav",  30.0, -9),   # 6句对白，压更低
    ("block3_锁定与对抗_60-120.wav", 60.0, -9),   # 26句对白，压更低
    ("block4_代价与出发_120-165.wav", 120.0, -6),
]

# 水下低通滤波：02:30–02:35.5 整轨压到 800Hz，破水瞬间释放
UNDERWATER_START_S = 150.0
UNDERWATER_END_S = 155.5
UNDERWATER_CUTOFF_HZ = 800

# (文件名, 起始秒, 音量dB) —— 与 bgm-composition.md 的 SFX 表一一对应
SFX_TIMELINE = [
    # ① 深渊与猎杀 00:00–00:30
    ("SFX-01_deep_ocean_drone.wav",       0.0,  -10),
    ("SFX-02_underwater_current.wav",     1.5,  -12),
    ("SFX-03_tail_swoosh.wav",            5.2,   -4),
    ("SFX-03_tail_swoosh.wav",            6.4,   -4),
    ("SFX-03_tail_swoosh.wav",            7.6,   -4),
    ("SFX-04_shell_clack.wav",            8.0,   -6),
    ("SFX-05_servo_motor.wav",           10.8,   -5),
    ("SFX-06_sub_bass_rumble.wav",       12.0,   -3),
    ("SFX-07_hydraulic_arm.wav",         14.2,   -2),
    ("SFX-08_net_launch.wav",            15.0,    0),
    ("SFX-09_bubble_burst.wav",          17.2,   -3),
    ("SFX-10_metal_scrape.wav",          19.6,   -1),
    ("SFX-11_water_rush.wav",            21.2,   -2),
    ("SFX-12_scale_tear_dry.wav",        23.5,   -1),
    ("SFX-13_mech_light_descend.wav",    26.2,   -8),
    # ② 王权与恐惧 00:30–01:00
    ("SFX-14_hall_ambience.wav",         30.0,  -11),
    ("SFX-15_crowd_murmur.wav",          30.5,  -13),
    ("SFX-16_crowd_murmur_far.wav",      45.0,  -15),
    ("SFX-17_swallow_close.wav",         49.2,   -7),
    ("SFX-18_water_movement.wav",        54.0,   -9),
    ("SFX-19_tail_swoosh_heavy.wav",     56.5,   -4),
    ("SFX-19_tail_swoosh_heavy.wav",     57.8,   -4),
    ("SFX-19_tail_swoosh_heavy.wav",     59.0,   -4),
    ("SFX-20_tunnel_reverb_tail.wav",    59.5,   -8),
    # ③ 锁定与对抗 01:00–02:00
    ("SFX-21_metal_debris.wav",          60.0,   -3),
    ("SFX-22_hologram_hum.wav",          61.5,   -9),
    ("SFX-23_metal_scrape_light.wav",    63.4,   -5),
    ("SFX-24_ui_swipe.wav",              65.5,   -7),
    ("SFX-24_ui_swipe.wav",              67.2,   -7),
    ("SFX-24_ui_swipe.wav",              69.0,   -7),
    ("SFX-25_small_metal_clink.wav",     66.0,   -6),
    ("SFX-26_ui_confirm_low.wav",        71.2,   -4),
    ("SFX-27_water_door.wav",            75.2,   -6),
    ("SFX-29_bandage_fabric.wav",        77.0,   -8),
    ("SFX-28_hologram_off.wav",          81.5,   -5),
    ("SFX-30_tail_swoosh_soft.wav",      89.0,   -7),
    ("SFX-31_large_hall_ambience.wav",   90.0,  -10),
    ("SFX-32_tail_swoosh.wav",           90.5,   -5),
    ("SFX-33_stone_shift.wav",           96.5,   -7),
    ("SFX-34_knuckle_clench.wav",        99.5,   -8),
    ("SFX-35_coral_crown_clack.wav",    108.0,   -9),
    ("SFX-36_hand_face_fabric.wav",     110.5,   -8),
    ("SFX-37_tail_turn.wav",            117.5,   -5),
    ("SFX-38_empty_hall_tail.wav",      119.0,   -7),
    # ④ 代价与出发 02:00–02:45
    ("SFX-39_energy_column_pulse.wav",  120.0,   -6),  # 铺底至 150s，本段节拍器
    ("SFX-40_chamber_reverb.wav",       120.0,  -11),
    ("SFX-42_energy_rise.wav",          126.0,   -5),
    ("SFX-41_pendant_full_pulse.wav",   127.0,   -2),  # 音色倒计时基准音
    ("SFX-44_energy_surge.wav",         135.0,   -3),
    ("SFX-43_bone_restructure.wav",     135.5,   -1),
    ("SFX-46_pain_breath.wav",          137.5,   -6),  # 气息，非叫声
    ("SFX-45_gill_close.wav",           139.0,   -4),
    ("SFX-47_first_human_breath.wav",   143.0,   -3),
    ("SFX-48_bare_foot_step.wav",       146.0,   -5),
    ("SFX-49_body_sway_cloth.wav",      146.5,   -8),
    ("SFX-48_bare_foot_step.wav",       147.5,   -5),
    ("SFX-52_underwater_low.wav",       150.0,  -10),
    ("SFX-50_water_kick_clumsy.wav",    150.5,   -5),
    ("SFX-50_water_kick_clumsy.wav",    151.8,   -5),
    ("SFX-51_water_kick_rhythmic.wav",  153.0,   -4),
    ("SFX-51_water_kick_rhythmic.wav",  154.0,   -4),
    ("SFX-53_surface_break.wav",        155.5,    0),  # 全轨最响
    ("SFX-54_air_cough.wav",            156.2,   -2),
    ("SFX-55_distant_waves.wav",        157.0,   -8),
    ("SFX-56_morning_wind.wav",         158.0,  -11),
    ("SFX-57_underwater_muffled.wav",   160.0,   -9),
    ("SFX-59_distant_waves_surface.wav", 161.0,  -9),
    ("SFX-58_sable_descend.wav",        163.0,  -10),
]


def run(cmd, label):
    print(f"[{label}] running...")
    result = subprocess.run(cmd, capture_output=True, text=True, errors="replace")
    if result.returncode != 0:
        print(f"[{label}] ERROR (exit {result.returncode}):")
        for line in result.stderr.strip().split("\n")[-30:]:
            print("   ", line)
        return False
    return True


def concat_clips():
    """无损拼接 11 条 15 秒片段为一条 165 秒序列。"""
    missing = [c for c in CLIPS if not os.path.exists(os.path.join(CLIP_DIR, c))]
    if missing:
        print(f"缺少 {len(missing)}/{len(CLIPS)} 个片段文件，无法拼接：")
        for m in missing:
            print("   ", os.path.join(CLIP_DIR, m))
        return False

    with open(CONCAT_LIST, "w", encoding="utf-8") as f:
        for clip in CLIPS:
            path = os.path.join(CLIP_DIR, clip).replace("\\", "/")
            f.write(f"file '{path}'\n")

    cmd = [
        FFMPEG,
        "-f", "concat",
        "-safe", "0",
        "-i", CONCAT_LIST,
        "-c", "copy",
        "-y", SEQUENCE,
    ]
    ok = run(cmd, "CONCAT")
    if os.path.exists(CONCAT_LIST):
        os.remove(CONCAT_LIST)
    if ok:
        print(f"[CONCAT] OK → {SEQUENCE}")
    return ok


def mix_audio():
    """把 4 个 BGM 情绪块与 SFX 混到 165 秒序列上，并施加水下滤波。"""
    if not os.path.exists(SEQUENCE):
        print(f"找不到序列文件：{SEQUENCE}\n先运行 --concat。")
        return False

    bgm_available = []
    for name, start_s, vol_db in BGM_BLOCKS:
        if os.path.exists(os.path.join(BGM_DIR, name)):
            bgm_available.append((name, start_s, vol_db))
        else:
            print(f"WARNING: 缺少 BGM 块，已跳过 → {name} @ {start_s}s")
    if not bgm_available:
        print("没有任何 BGM 块可用，中止。")
        return False

    sfx_available = []
    for name, start_s, vol_db in SFX_TIMELINE:
        if os.path.exists(os.path.join(SFX_DIR, name)):
            sfx_available.append((name, start_s, vol_db))
        else:
            print(f"WARNING: 缺少音效，已跳过 → {name} @ {start_s}s")

    tracks = bgm_available + sfx_available
    inputs = ["-i", SEQUENCE]
    for name, _, _ in bgm_available:
        inputs += ["-i", os.path.join(BGM_DIR, name)]
    for name, _, _ in sfx_available:
        inputs += ["-i", os.path.join(SFX_DIR, name)]

    parts = []
    for i, (_, start_s, vol_db) in enumerate(tracks):
        delay_ms = int(start_s * 1000)
        label = f"a{i}"
        stage = f"[{i + 1}:a]"
        if delay_ms > 0:
            stage += f"adelay={delay_ms}|{delay_ms},"
        stage += (
            f"volume={vol_db}dB,atrim=0:{VIDEO_DURATION_S},"
            f"asetpts=PTS-STARTPTS[{label}];"
        )
        parts.append(stage)

    mix_labels = "".join(f"[a{i}]" for i in range(len(tracks)))
    # normalize=0 保留各输入原始电平，避免 amix 按输入数平均衰减
    # duration=longest + apad/atrim 显式锁定长度，避免音轨短于视频导致成片被截断
    parts.append(
        f"{mix_labels}amix=inputs={len(tracks)}:duration=longest"
        f":dropout_transition=0:normalize=0,"
        f"apad,atrim=0:{VIDEO_DURATION_S},asetpts=PTS-STARTPTS[mixed];"
    )
    # 水下低通：150.0–155.5s 压到 800Hz，破水瞬间释放
    parts.append(
        f"[mixed]lowpass=f={UNDERWATER_CUTOFF_HZ}"
        f":enable='between(t,{UNDERWATER_START_S},{UNDERWATER_END_S})'[aout]"
    )

    # 滤镜图较长，写入脚本文件避免命令行长度限制
    fd, filter_path = tempfile.mkstemp(suffix=".txt", text=True)
    with os.fdopen(fd, "w", encoding="utf-8") as f:
        f.write("\n".join(parts))

    cmd = [
        FFMPEG,
        *inputs,
        "-filter_complex_script", filter_path,
        "-map", "0:v",
        "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        "-y", OUTPUT,
    ]

    print(f"[MIX] {len(bgm_available)} BGM 块 + {len(sfx_available)} SFX → {OUTPUT}")
    try:
        if not run(cmd, "MIX"):
            return False
    finally:
        os.remove(filter_path)

    size_mb = os.path.getsize(OUTPUT) / (1024 * 1024)
    print(f"[MIX] OK → {OUTPUT} ({size_mb:.1f} MB)")
    return True


def main():
    parser = argparse.ArgumentParser(description="THE DEEP CROWN 第一幕 165 秒混音")
    parser.add_argument("--concat", action="store_true", help="只拼接 11 条片段")
    parser.add_argument("--mix", action="store_true", help="只混音")
    args = parser.parse_args()

    do_concat = args.concat or not args.mix
    do_mix = args.mix or not args.concat

    if do_concat and not concat_clips():
        sys.exit(1)
    if do_mix and not mix_audio():
        sys.exit(1)


if __name__ == "__main__":
    main()
