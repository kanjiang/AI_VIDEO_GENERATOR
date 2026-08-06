### Task 2: Synopsis

**Files:**
- Create: `lu-jingshen-three-selves/screenplay/synopsis.md`
- Reference: `.claude/skills/screenwriter-skill/templates/synopsis.template.md`
- Spec: design §1–4

**Interfaces:**
- Consumes: pacing-lock；规格 logline、四幕弧、陆母主使
- Produces: 完整梗概字段（Logline / Controlling Idea / Genre / Runtime / Protagonists / Antagonist / Inciting / Crisis / Climax / Resolution / Theme / Setup Objects）

- [ ] **Step 1: Draft synopsis from template sections**

必填字段与取值约束：

| 字段 | 必须写到 |
|------|----------|
| Logline | 与规格 §1 一致（可极小润色，不改因果） |
| Controlling Idea | 形式：`生命变得 X，当主角做 Y，因为 Z` — 指向「整合人格 + 对抗陆母控制」 |
| Genre/Tone | 霸总甜宠；甜里藏刀；竖屏短剧 |
| Runtime | 40×60–90s |
| Protagonist | 沈星野为主视角；陆景深（三人格）为双主角结构需各写 Want/Need/Arc |
| Antagonist | **陆母**为主对手；叔伯/联姻对象为压力源 |
| Inciting | 沈星野撞破切换 + 夜威胁 |
| Crisis | 丑闻将爆时选边：保本尊面具 vs 保小小/夜/真相 |
| Climax | 继承战公开场，三人格与女主站队，揭陆母主使 |
| Resolution | HE：带着人格活；小小不怕黑；夜收刀；本尊公开承认她 |
| Setup Objects | 至少：发绳、袖扣、未掐灭的烟、天台灯/黑暗、保密协议或行李箱 |

- [ ] **Step 2: Voice / causality self-check**

朗读检查：去掉人名后，陆母目标是否清晰（控制完美继承人 + 掩盖施害）；沈星野主动因是否不仅是「被威胁留下」（需有主动杠杆：小小只听她）。

- [ ] **Step 3: Commit**

```bash
git add lu-jingshen-three-selves/screenplay/synopsis.md
git commit -m "$(cat <<'EOF'
docs: add synopsis for three-selves short drama

EOF
)"
```

---

