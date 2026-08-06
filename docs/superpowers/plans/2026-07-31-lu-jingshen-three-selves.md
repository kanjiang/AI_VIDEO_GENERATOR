# 陆景深 · 三重人格霸总短剧 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按已批准设计规格，落地竖屏短剧项目 `lu-jingshen-three-selves` 的故事圣经与第一集可拍剧本。

**Architecture:** 内容按本仓库短剧产能分层交付：`synopsis`（卖点与因果）→ `characters`（含三人格切换信号）→ `treatment`（40 集节拍）→ `episode-01-screenplay`（可拍正文）。竖屏节奏约束写入 `pacing-lock.md`，每份文稿交付前用检查清单对照设计规格验收。

**Tech Stack:** Markdown 故事文档；`screenwriter-skill`（methodology / style-rules / manga-drama-pacing）；设计规格 `docs/superpowers/specs/2026-07-31-lu-jingshen-three-selves-design.md`

## Global Constraints

- 赛道：现代都市霸总甜宠（甜里藏刀）；竖屏短剧约 40 集 × 60–90 秒
- 只借《Kill Me, Heal Me》多人格男主 + 治愈恋爱内核；不抄原作情节/人名/桥段顺序
- 人格数锁定 3：本尊陆景深 / 护卫「夜」/ 小女孩「小小」；女主沈星野（精神科实习医生）
- 绑定：撞破切换 → 夜威胁封口 → 女主入住成唯一知情者
- 真凶锁定：**陆母主使**；叔伯只负责继承战捅刀
- 视觉：现实世界始终成年男主身体；人格靠语气、微表情、小道具区分；小小不以儿童身体出镜于现实
- 单集：前 3 秒钩子；每 8–15 秒信息增量；集末留钩；核心对白 ≤ 6 句
- 工作标题：三个他，只许你知道
- 变更人名/标题前须回写设计规格；本计划默认使用规格内姓名

---

## File Structure

| 路径 | 职责 |
|------|------|
| `lu-jingshen-three-selves/README.md` | 项目一页纸：logline、锁定项、文件索引 |
| `lu-jingshen-three-selves/screenplay/pacing-lock.md` | 竖屏节奏与人格切换生产锁 |
| `lu-jingshen-three-selves/screenplay/synopsis.md` | 梗概（logline、controlling idea、起承转合） |
| `lu-jingshen-three-selves/screenplay/characters.md` | 人物圣经（含三人格 + 陆母 + 叔伯 + 联姻对象） |
| `lu-jingshen-three-selves/screenplay/treatment.md` | 40 集节拍大纲（每集 3–5 句，无大段对白） |
| `lu-jingshen-three-selves/screenplay/episode-01-screenplay.md` | 第 1 集可拍剧本（动作动词、可见可听） |

后续（本计划不强制）：`video-prompts.md`、`asset-prompts.md`、`bgm-composition.md`

---

### Task 1: Scaffold project + pacing lock

**Files:**
- Create: `lu-jingshen-three-selves/README.md`
- Create: `lu-jingshen-three-selves/screenplay/pacing-lock.md`
- Spec: `docs/superpowers/specs/2026-07-31-lu-jingshen-three-selves-design.md`

**Interfaces:**
- Consumes: 设计规格 §1–2、§4 单集节奏锁、§6 交付顺序
- Produces: 项目根与 `pacing-lock.md`（后续所有 screenplay 文件必须遵守的约束表）

- [ ] **Step 1: Create folders**

Run:

```bash
mkdir -p "lu-jingshen-three-selves/screenplay"
```

Expected: 目录存在且为空（除将写入的文件）。

- [ ] **Step 2: Write `README.md`**

内容必须包含：工作标题、logline（ verbatim 自规格 §1）、人格三人名单、真凶锁定「陆母主使」、文件索引表（指向 synopsis / characters / treatment / episode-01）。

- [ ] **Step 3: Write `pacing-lock.md`**

必须包含以下锁定表（可扩写说明，不可删行）：

```markdown
# Pacing Lock — 三个他，只许你知道

## Format
- Aspect: 9:16 vertical
- Episode length: 60–90s
- Episode count target: 40

## Hard rules
1. First 3 seconds: switch OR conflict line OR threat object
2. Every 8–15s: info gain or mini-reversal
3. Episode end: open hook (no tidy HE until series finale)
4. Core dialogue ≤ 6 lines per episode
5. Reality casting: adult male body only for 陆景深/夜/小小
6. Alter tells: 袖扣整齐=本尊；领口松开/烟=夜；发绳+捏衣角=小小
7. Villain lock: 陆母 = childhood perpetrator; 叔伯 = inheritance rival only
```

- [ ] **Step 4: Acceptance check**

对照规格 §2 Premise locks：README + pacing-lock 是否全部覆盖。缺一项则补写，再进入 commit。

- [ ] **Step 5: Commit**

```bash
git add lu-jingshen-three-selves/README.md lu-jingshen-three-selves/screenplay/pacing-lock.md
git commit -m "$(cat <<'EOF'
docs: scaffold lu-jingshen-three-selves with pacing lock

EOF
)"
```

（若用户未授权 commit，跳过本步，仅保留未提交文件。）

---

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

### Task 3: Character bible

**Files:**
- Create: `lu-jingshen-three-selves/screenplay/characters.md`
- Reference: `.claude/skills/screenwriter-skill/templates/characters.template.md`
- Spec: design §3

**Interfaces:**
- Consumes: synopsis 中的 Want/Need；pacing-lock 切换信号
- Produces: 可被 treatment / Ep1 直接引用的人设块与例台词

- [ ] **Step 1: Write entries for all key cast**

每人至少包含：Basics / Appearance / Psychology (hamartia, want, need, fear) / Arc / Voice + 3 sample lines / Associated object。

必写角色：

1. 沈星野  
2. 陆景深（本尊）  
3. 夜  
4. 小小  
5. 陆母（主使真凶 — 表面慈爱、实则控制；童年「那一晚」主使）  
6. 叔伯竞争对手（姓名在本任务内命名一次并固定）  
7. 联姻对象 / 前女友（姓名在本任务内命名一次并固定）

- [ ] **Step 2: Alter recognition table**

在 `characters.md` 末尾增加表：

| 人格 | 视觉信号 | 称呼女主 | 禁做之事 |
|------|----------|----------|----------|
| 本尊 | 袖扣整齐、慢语、不笑 | 陆医生 / 你 | 不撒娇、不抽烟耍狠 |
| 夜 | 领口松开、前倾、烟 | 威胁式直呼或「你」 | 不对小小温柔到破功（可护但不黏） |
| 小小 | 发绳、捏衣角、软声 | 姐姐 | 不谈生意、不开杀戒台词 |

- [ ] **Step 3: Voice distinctness test**

从每人抽 1 句例台词，打乱后应能辨认说话者。若本尊与夜语气撞车，重写夜的短句/威胁节奏。

- [ ] **Step 4: Commit**

```bash
git add lu-jingshen-three-selves/screenplay/characters.md
git commit -m "$(cat <<'EOF'
docs: add character bible with alter tells

EOF
)"
```

---

### Task 4: Treatment — Act 1 (Ep1–10)

**Files:**
- Create: `lu-jingshen-three-selves/screenplay/treatment.md`（先写幕 1；后续任务追加）
- Spec: design §4 幕 1、§5 Ep1

**Interfaces:**
- Consumes: characters 姓名与切换信号；synopsis inciting
- Produces: `treatment.md` 中 `## 幕 1` 下 Ep1–Ep10 条目

- [ ] **Step 1: Open treatment.md with header**

```markdown
# Treatment — 三个他，只许你知道

格式：每集 3–5 句叙述，无大段对白。标注：钩子类型 / 出场人格 / 集末钩。

## 幕 1｜威胁同居（Ep1–10）
```

- [ ] **Step 2: Write Ep1–10 beats**

约束：
- Ep1 必须贴合规格 §5 钩子草案（天台小小→夜；医院威胁；入住；镜子怯意）
- Ep2–10：女主入住磨合；小小黏；本尊否认；**叔伯开始盯上女主**在幕末出现
- 每集标注出场人格（可多个人格同集切换）
- 每集集末钩非闭环

- [ ] **Step 3: Act 1 acceptance**

检查清单（全部 Yes 才过）：
- [ ] 有明确入住成立点  
- [ ] 三人格均在幕 1 内露过面  
- [ ] 陆母至少露面或施压一次（可电话/安排）  
- [ ] 叔伯线在 Ep8–10 启动盯梢  
- [ ] 无现实世界儿童身体出镜  

- [ ] **Step 4: Commit**

```bash
git add lu-jingshen-three-selves/screenplay/treatment.md
git commit -m "$(cat <<'EOF'
docs: add act1 treatment beats ep1-10

EOF
)"
```

---

### Task 5: Treatment — Act 2 (Ep11–20)

**Files:**
- Modify: `lu-jingshen-three-selves/screenplay/treatment.md`
- Spec: design §4 幕 2

**Interfaces:**
- Consumes: Act 1 末叔伯盯梢；characters 联姻对象名
- Produces: `## 幕 2｜依赖与心动（Ep11–20）`

- [ ] **Step 1: Append Ep11–20**

必须覆盖：女主「认人」能力升级；本尊为她破例；**联姻对象入场**；至少一次公开场合险些切换失败。

- [ ] **Step 2: Acceptance**

- [ ] 甜点与刀子交替（非连续 5 集纯甜）  
- [ ] 联姻对象与陆母有利益勾连暗示  
- [ ] 集末钩升级到「公开暴露风险」  

- [ ] **Step 3: Commit**

```bash
git add lu-jingshen-three-selves/screenplay/treatment.md
git commit -m "$(cat <<'EOF'
docs: add act2 treatment beats ep11-20

EOF
)"
```

---

### Task 6: Treatment — Act 3 (Ep21–30)

**Files:**
- Modify: `lu-jingshen-three-selves/screenplay/treatment.md`
- Spec: design §4 幕 3；陆母主使

**Interfaces:**
- Consumes: Act 2 公开暴露风险；陆母人设
- Produces: `## 幕 3｜信任崩塌（Ep21–30）`

- [ ] **Step 1: Append Ep21–30**

必须覆盖：丑闻将爆；夜过激护主；女主选边；**童年真相一角露出且指向陆母主使**（可未全盘托出，但观众/女主方向明确）。

- [ ] **Step 2: Acceptance**

- [ ] 不把童年施害嫁祸叔伯  
- [ ] 女主危机两难写清（面具 vs 真相）  
- [ ] 小小恐惧与「那一晚」物件/黑暗有回扣  

- [ ] **Step 3: Commit**

```bash
git add lu-jingshen-three-selves/screenplay/treatment.md
git commit -m "$(cat <<'EOF'
docs: add act3 treatment beats ep21-30

EOF
)"
```

---

### Task 7: Treatment — Act 4 (Ep31–40)

**Files:**
- Modify: `lu-jingshen-three-selves/screenplay/treatment.md`
- Spec: design §4 幕 4

**Interfaces:**
- Consumes: Act 3 陆母主使线索；synopsis climax/resolution
- Produces: 完整 40 集 treatment

- [ ] **Step 1: Append Ep31–40**

必须覆盖：三人格与女主同一战线；继承战打脸；揭陆母；HE 收束（小小不怕黑；夜收刀；本尊公开承认她）。**仅系列终局允许圆满收束。**

- [ ] **Step 2: Full-series scan**

- [ ] 恰好覆盖 Ep1–Ep40（无跳号）  
- [ ] 陆母主使在高潮被叙事证实  
- [ ] 叔伯功能止于继承对手  
- [ ] 无第 4 常驻人格  

- [ ] **Step 3: Commit**

```bash
git add lu-jingshen-three-selves/screenplay/treatment.md
git commit -m "$(cat <<'EOF'
docs: complete 40-ep treatment through act4

EOF
)"
```

---

### Task 8: Episode 1 screenplay

**Files:**
- Create: `lu-jingshen-three-selves/screenplay/episode-01-screenplay.md`
- Reference: `.claude/skills/screenwriter-skill/style-rules.md`、`manga-drama-pacing.md`
- Spec: design §5；treatment Ep1

**Interfaces:**
- Consumes: treatment Ep1；characters 切换信号与例台词气质
- Produces: 可直接进入分镜/video-prompts 的 Ep1 正文

- [ ] **Step 1: Write Ep1 in screenplay form**

规则：
- 仅动作动词与可拍内容；无内心独白形容词堆砌
- 目标时长 60–90 秒（短段落、快切）
- 结构对齐规格 §5：天台小小 → 夜 → 闪回医院威胁 → 入住 → 本尊质问 → 镜子怯意 → 黑屏标题
- 核心对白 ≤ 6 句
- 人格切换须有可见信号（发绳 / 烟 / 袖扣）

- [ ] **Step 2: Attach 3–5 line analysis**（screenwriter workflow）

写在剧本后：
1. 价值进出（威胁→契约同居）  
2. 激活的 hamartia（本尊压抑 / 夜暴力控制 / 女主用专业硬刚）  
3. Red flags 自检（重复、弱因果、过载）  

- [ ] **Step 3: Manga-drama checklist**

- [ ] 前 3 秒有钩  
- [ ] 中段有信息增量  
- [ ] 集末开放钩  
- [ ] ≤ 6 句核心对白  
- [ ] 小小未以儿童身体出现于现实  

- [ ] **Step 4: Commit**

```bash
git add lu-jingshen-three-selves/screenplay/episode-01-screenplay.md
git commit -m "$(cat <<'EOF'
docs: add episode 01 shootable screenplay

EOF
)"
```

---

### Task 9: Spec alignment pass + handoff note

**Files:**
- Modify: `lu-jingshen-three-selves/README.md`（更新「已完成文件」状态）
- Read-only check: design spec + all screenplay files

**Interfaces:**
- Consumes: Tasks 1–8 产出
- Produces: README 完成度勾选；给用户的「下一步可选：video-prompts / asset-prompts」说明（写在 README 末尾，不新建计划外大文件）

- [ ] **Step 1: Spec coverage matrix**

在 README 增加：

| 规格章节 | 落地文件 |
|----------|----------|
| §1 Logline | synopsis.md |
| §3 Characters | characters.md |
| §4 Arc | treatment.md |
| §5 Ep1 | episode-01-screenplay.md |
| 陆母主使 | characters + treatment 幕3–4 |
| pacing | pacing-lock.md |

全部能指到文件后勾选完成。

- [ ] **Step 2: Final commit**

```bash
git add lu-jingshen-three-selves/README.md
git commit -m "$(cat <<'EOF'
docs: mark three-selves story bible complete through ep1

EOF
)"
```

---

## Self-Review (plan author)

1. **Spec coverage:** §1–6 均有对应 Task；真凶 β 写入 Global Constraints + Task 3/6/7；Ep1 在 Task 4+8；交付物 2–5 对应 Task 2/3/4–7/8。`video-prompts` 留作计划外可选，与规格「后续按需」一致。  
2. **Placeholders:** 无 TBD；叔伯/联姻对象姓名在 Task 3 内命名并固定。  
3. **Consistency:** 文件夹名、人格名、女主名与规格一致；commit 步骤注明「用户未授权则跳过」。

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-31-lu-jingshen-three-selves.md`. Two execution options:

**1. Subagent-Driven (recommended)** — 每个 Task 派一个新子代理，Task 间人工/父代理验收  

**2. Inline Execution** — 本会话按 `executing-plans` 连续执行，设检查点  

Which approach?
