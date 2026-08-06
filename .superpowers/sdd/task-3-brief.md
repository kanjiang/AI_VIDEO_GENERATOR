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

