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

