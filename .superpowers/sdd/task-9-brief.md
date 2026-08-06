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
