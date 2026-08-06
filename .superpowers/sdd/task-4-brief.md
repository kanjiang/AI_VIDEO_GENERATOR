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

