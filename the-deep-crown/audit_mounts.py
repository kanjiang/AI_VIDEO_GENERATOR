"""
挂载资源审计：找出「画面描述里出现了某个实体，但 @挂载资源 里没有它」的提示词。

用法：python audit_mounts.py
"""

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

# 实体 -> (匹配关键词, 应挂载的资源名)
# 关键词命中画面描述即视为该实体出现在画面中
ENTITIES = [
    # 角色
    (["玛伦"], "玛伦人类/玛伦人鱼"),
    (["赛宝"], "赛宝"),
    (["涅柔斯"], "涅柔斯"),
    (["守仪者"], "守仪者"),
    (["韦克斯勒", "Wexler"], "韦克斯勒"),
    (["乔纳斯", "Jonas"], "乔纳斯"),
    (["斥候1", "斥候2", "斥候们", "三名人鱼斥候", "斥候3", "斥候"], "斥候"),
    (["被俘人鱼", "被俘者", "人鱼挣扎", "活体标本"], "被俘人鱼"),
    (["长老"], "议会长老"),
    (["议事人群", "议员"], "议事人群"),
    (["会议观众"], "会议观众"),
    (["前台"], "前台"),
    (["HR"], "HR经理"),
    (["保安", "警卫"], "保安"),
    (["女孩"], "女孩"),
    # 场景
    (["深海峡谷", "峡谷", "峡脊"], "深海峡谷"),
    (["王座大殿", "大殿"], "王座大殿"),
    (["玛伦居室", "居室"], "玛伦居室"),
    (["仪式室"], "仪式室"),
    (["圣卡德纳", "码头", "储物"], "圣卡德纳/海港码头"),
    (["公司大堂", "大堂"], "公司大堂"),
    (["研究楼层", "开放办公", "工位"], "研究楼层"),
    (["B3走廊"], "B3走廊"),
    (["B3控制室", "控制室"], "B3控制室"),
    (["B3水箱室", "水箱"], "B3水箱室"),
    (["服务器机房", "机房", "机柜"], "服务器机房"),
    (["韦克斯勒办公室", "海景办公室"], "韦克斯勒办公室"),
    (["玛伦公寓", "公寓"], "玛伦公寓"),
    (["城市天台", "天台", "HVAC"], "城市天台"),
    (["海岸黎明", "海岸"], "海岸黎明"),
    (["餐厅"], "企业餐厅"),
    # 道具
    (["坠饰"], "贝壳坠饰发光/熄灭"),
    (["探测器"], "深海探测器"),
    (["手表"], "手表"),
    (["门禁卡", "拿起门禁", "刷卡", "偷来的卡"], "门禁卡"),
    (["王冠"], "黑珊瑚王冠"),
    (["公司标志", "企业标识", "AD Logo"], "公司标志"),
    (["笔记本"], "笔记本"),
    (["船体碎片", "碎片"], "船体碎片"),
]


# 场景类资产名——用于检查「这条提示词有没有挂任何场景」
LOCATIONS = {
    "深海峡谷",
    "王座大殿",
    "玛伦居室",
    "仪式室",
    "圣卡德纳",
    "公司大堂",
    "研究楼层",
    "B3走廊",
    "B3控制室",
    "B3水箱室",
    "服务器机房",
    "韦克斯勒办公室",
    "玛伦公寓",
    "海港码头夜",
    "城市天台",
    "海岸黎明",
    "面试室",
    "企业餐厅",
    "主会议室",
    "装卸码头管道走廊",
    "公司一楼夜外",
}


def split_prompts(text):
    """按 '# Prompt' 切分，返回 [(标题, 正文)]。文末索引等 '## ' 段落不计入。"""
    blocks = re.split(r"\n(?=# Prompt )", text)
    out = []
    for b in blocks:
        m = re.match(r"# (Prompt \S+)", b.strip())
        if m:
            body = re.split(r"\n## ", b)[0]
            out.append((m.group(1), body))
    return out


def get_mounts(block):
    """提取 @xxx=xxx 挂载行里的资源名。"""
    return set(re.findall(r"^@(\S+?)=", block, flags=re.MULTILINE))


def get_visual_text(block):
    """
    只保留描述本视频画面的文本。剔除：
    - 挂载行与硬约束行（会重复资源名）
    - 下一视频预告（描述的是下一条）
    - 负面约束
    - 【音画同步】里的语气指导与英文台词（只留说话者标签，台词内容提到的人名不等于出画面）
    """
    keep = []
    in_sync = False
    for line in block.split("\n"):
        s = line.strip()
        if s.startswith("【"):
            in_sync = s.startswith("【音画同步")
        if s.startswith("【首帧衔接】"):
            continue
        if s.startswith("@"):
            continue
        if s.startswith("【挂载资源"):
            continue
        if s.startswith("⚠️下一视频") or s.startswith("⚠️下一幕"):
            continue
        if s.startswith("【负面约束"):
            continue
        if in_sync and not s.startswith("【"):
            speaker = s.split("：")[0]
            if "画外" in speaker or "V.O." in speaker:
                continue
            keep.append(speaker)
            continue
        keep.append(line)
    return "\n".join(keep)


IGNORE_BY_PROMPT = {
    # 只在台词/作战说明中被提到，不作为画面实体出现。
    "Prompt 04A": {"圣卡德纳"},
    "Prompt 12": {"活体标本", "峡脊"},
    "Prompt 16": {"Wexler"},
    "Prompt 18B": {"玛伦"},
    "Prompt 21": {"Wexler"},
    "Prompt 22": {"Wexler"},
    "Prompt 24": {"赛宝"},
    "Prompt 27B": {"水箱"},
}


def main():
    total_gaps = 0
    for fname in FILES:
        path = os.path.join(SCREENPLAY, fname)
        with open(path, encoding="utf-8") as f:
            text = f.read()

        print(f"\n{'=' * 70}\n{fname}\n{'=' * 70}")
        for title, block in split_prompts(text):
            mounts = get_mounts(block)
            mounts_joined = " ".join(mounts)
            visual = get_visual_text(block)

            gaps = []
            for keywords, asset in ENTITIES:
                hit = next((k for k in keywords if k in visual), None)
                if not hit:
                    continue
                if hit in IGNORE_BY_PROMPT.get(title, set()):
                    continue
                # 已挂载判定：资源名任一候选出现在挂载名里，或关键词本身出现在挂载名里
                candidates = [c for c in asset.split("/")]
                mounted = any(c in mounts_joined for c in candidates) or any(
                    k in mounts_joined for k in keywords
                )
                if not mounted:
                    gaps.append((hit, asset))

            no_loc = not (mounts & LOCATIONS)

            if gaps or no_loc:
                total_gaps += len(gaps)
                print(f"\n  {title}")
                print(f"    已挂载: {sorted(mounts)}")
                for hit, asset in gaps:
                    print(f"    ❌ 画面出现「{hit}」→ 缺挂载 [{asset}]")
                if no_loc:
                    print("    ⚠️ 未挂载任何场景资产——生成时房间由 AI 自行编造")

    print(f"\n\n合计疑似缺挂载: {total_gaps} 处")


if __name__ == "__main__":
    main()
