import re
import sys
from pathlib import Path

plan_path = Path(sys.argv[1])
n = int(sys.argv[2])
out_path = Path(sys.argv[3]) if len(sys.argv) > 3 else Path(f".superpowers/sdd/task-{n}-brief.md")

plan = plan_path.read_text(encoding="utf-8")
lines = plan.splitlines(True)
out = []
intask = False
infence = False
for line in lines:
    if line.startswith("```"):
        infence = not infence
    if not infence and re.match(r"^#+[ \t]+Task[ \t]+[0-9]+", line):
        m = re.match(r"^#+[ \t]+Task[ \t]+(\d+)", line)
        intask = bool(m and int(m.group(1)) == n)
    if intask:
        out.append(line)

if not out:
    raise SystemExit(f"task {n} not found in {plan_path}")

out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text("".join(out), encoding="utf-8")
print(f"wrote {out_path.resolve()}: {len(out)} lines")
