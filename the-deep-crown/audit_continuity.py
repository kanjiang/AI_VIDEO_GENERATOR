"""
同场延续审计：找出「上一镜头建立的场景/人群，下一镜头同场却漏挂/写空」的提示词对。

用法：python audit_continuity.py
"""

from __future__ import annotations

import os
import re

BASE = os.path.dirname(os.path.abspath(__file__))
SCREENPLAY = os.path.join(BASE, "screenplay")

FILES = [
    "video-prompts-act1.md",
    "video-prompts-act2a.md",
    "video-prompts-act2b.md",
    "video-prompts-act3.md",
]

LOCATION_HINTS = [
    "深海峡谷",
    "王座大殿",
    "玛伦居室",
    "仪式室",
    "圣卡德纳",
    "公司大堂",
    "研究楼层",
    "面试室",
    "企业餐厅",
    "主会议室",
    "B3走廊",
    "B3控制室",
    "B3水箱室",
    "服务器机房",
    "韦克斯勒办公室",
    "玛伦公寓",
    "海港码头夜",
    "城市天台",
    "海岸黎明",
    "装卸码头管道走廊",
    "公司一楼夜外",
]

CROWD_HINTS = [
    "议事人群",
    "会议观众",
    "被俘人鱼",
    "保安",
    "前台",
    "HR经理",
]

# 强同场标记（明确同一事件未散）
STRONG_SAME_SCENE = ["同场", "仍在进行", "同一批", "与上一视频同一"]

# 「接」可能只是剪辑衔接；若同时出现以下词，视为换场
HARD_CUT_MARKERS = ["黑屏后", "一周后", "数月后", "下一幕"]


def split_prompts(text: str) -> list[tuple[str, str]]:
    blocks = re.split(r"\n(?=# Prompt )", text)
    out = []
    for b in blocks:
        m = re.match(r"# (Prompt \S+)", b.strip())
        if m:
            body = re.split(r"\n## ", b)[0]
            out.append((m.group(1), body))
    return out


def get_mounts(block: str) -> set[str]:
    return set(re.findall(r"^@(\S+?)=", block, flags=re.MULTILINE))


def get_section(block: str, name: str) -> str:
    m = re.search(rf"【{name}】(.*?)(?=\n【|\n# |\Z)", block, flags=re.S)
    return m.group(1).strip() if m else ""


def location_mounts(mounts: set[str]) -> set[str]:
    return {m for m in mounts if any(h in m for h in LOCATION_HINTS)}


def crowd_mounts(mounts: set[str]) -> set[str]:
    return {m for m in mounts if any(h in m for h in CROWD_HINTS)}


def is_same_scene_continuation(curr: str) -> bool:
    head = get_section(curr, "首帧衔接")
    hard = get_section(curr, "挂载资源与音频硬约束")
    text = f"{head}\n{hard}"
    if any(k in text for k in HARD_CUT_MARKERS):
        return False
    return any(k in text for k in STRONG_SAME_SCENE)


def mentions_full_house_without_crowd(block: str) -> bool:
    mounts = get_mounts(block)
    crowds = crowd_mounts(mounts)
    text = block
    keywords = ["满座", "人群", "员工观众", "议事人群", "会议观众"]
    if any(k in text for k in keywords) and not crowds:
        # 空场显式声明不算问题
        if "几乎空" in text or "空荡" in text or "无人" in text or "人更少" in text:
            return False
        return True
    return False


def main() -> None:
    issues: list[str] = []
    all_prompts: list[tuple[str, str, str]] = []

    for fname in FILES:
        path = os.path.join(SCREENPLAY, fname)
        with open(path, encoding="utf-8") as f:
            text = f.read()
        for title, body in split_prompts(text):
            all_prompts.append((fname, title, body))

    print(f"共 {len(all_prompts)} 条提示词\n")

    # A) 单条：写了满座/人群却无人群挂载
    print("=" * 70)
    print("A. 满座/人群描写但无人群挂载")
    print("=" * 70)
    found_a = False
    for fname, title, body in all_prompts:
        if mentions_full_house_without_crowd(body):
            found_a = True
            print(f"❌ {fname} / {title}")
    if not found_a:
        print("无")

    # B) 相邻同场延续漏挂
    print(f"\n{'=' * 70}")
    print("B. 同场延续漏挂场景/人群")
    print("=" * 70)
    found_b = False
    for i in range(1, len(all_prompts)):
        pf, pt, pb = all_prompts[i - 1]
        cf, ct, cb = all_prompts[i]
        if pf != cf:
            continue
        if not is_same_scene_continuation(cb):
            continue

        prev_locs = location_mounts(get_mounts(pb))
        curr_locs = location_mounts(get_mounts(cb))
        prev_crowds = crowd_mounts(get_mounts(pb))
        curr_crowds = crowd_mounts(get_mounts(cb))
        dropped_locs = prev_locs - curr_locs
        dropped_crowds = prev_crowds - curr_crowds

        head = get_section(cb, "首帧衔接")
        # 若后段明确写空场/撤离，掉人群不算错
        empty_ok = any(k in head or k in cb for k in ["空荡", "无人", "已撤离", "清空", "几乎空"])

        if dropped_locs or (dropped_crowds and not empty_ok):
            found_b = True
            print(f"\n❌ {pt} → {ct}")
            if dropped_locs:
                print(f"   漏挂场景：{sorted(dropped_locs)}")
            if dropped_crowds and not empty_ok:
                print(f"   漏挂人群：{sorted(dropped_crowds)}")
            print(f"   首帧：{head[:140]}")

    if not found_b:
        print("无")

    print(f"\n完成。")


if __name__ == "__main__":
    main()
