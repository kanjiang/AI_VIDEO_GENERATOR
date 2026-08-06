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

