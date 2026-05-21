export type MarkdownTable = {
  headers: string[];
  rows: string[][];
  startLine: number;
};

function isTableLine(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isDividerRow(line: string) {
  return /^\|(?:\s*:?[-]{3,}:?\s*\|)+$/.test(line.trim());
}

function splitRow(line: string) {
  return line
    .trim()
    .slice(1, -1)
    .split("|")
    .map((cell) => sanitizeCell(cell));
}

export function sanitizeCell(cell: string) {
  return cell.replace(/`/g, "").replace(/\*\*/g, "").trim();
}

export function parseMarkdownTables(content: string): MarkdownTable[] {
  const lines = content.split(/\r?\n/);
  const tables: MarkdownTable[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const current = lines[index] ?? "";
    const next = lines[index + 1] ?? "";

    if (!isTableLine(current) || !isDividerRow(next)) {
      continue;
    }

    const headers = splitRow(current);
    const rows: string[][] = [];
    let cursor = index + 2;

    while (cursor < lines.length && isTableLine(lines[cursor] ?? "")) {
      rows.push(splitRow(lines[cursor] ?? ""));
      cursor += 1;
    }

    tables.push({ headers, rows, startLine: index + 1 });
    index = cursor - 1;
  }

  return tables;
}
