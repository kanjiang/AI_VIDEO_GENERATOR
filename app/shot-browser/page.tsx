"use client";

import "./shot-browser.css";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { AssetFileInfo } from "@/shot-browser/scanner";
import type { GlobalSection, ParsedShot, ShotAssetMount } from "@/shot-browser/parser";

type ProjectData = {
  slug: string;
  displayName: string;
  screenplays: {
    label: string;
    relativePath: string;
    parsed: {
      fileTitle: string;
      usageNote: string;
      globalAssets: ShotAssetMount[];
      globalStyle: string;
      globalPreamble: string;
      globalSections: GlobalSection[];
      shots: ParsedShot[];
    };
  }[];
  assets: AssetFileInfo[];
};

type BrowserData = {
  projects: ProjectData[];
};

type GenerationStatus = "pending" | "generating" | "done" | "failed";

type ShotStatus = {
  status: GenerationStatus;
  note?: string;
};

function assetMatchesAlias(fileName: string, alias: string): boolean {
  const nFile = fileName.replace(/\.(png|jpg|jpeg|webp)$/i, "").replace(/[_\s\-]/g, "").toLowerCase();
  const nAlias = alias.replace(/[_\s\-]/g, "").toLowerCase();
  return nFile.includes(nAlias) || nAlias.includes(nFile);
}

function getStatusLabel(status: GenerationStatus): string {
  switch (status) {
    case "pending": return "待生成";
    case "generating": return "生成中";
    case "done": return "已完成";
    case "failed": return "失败";
  }
}

function getStatusClass(status: GenerationStatus): string {
  switch (status) {
    case "pending": return "sb-status--pending";
    case "generating": return "sb-status--generating";
    case "done": return "sb-status--done";
    case "failed": return "sb-status--failed";
  }
}

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  }, [text]);

  return (
    <button
      className={`sb-copy-btn ${copied ? "sb-copy-btn--copied" : ""}`}
      onClick={handleCopy}
      title="复制到剪贴板"
    >
      {copied ? "已复制" : (label ?? "复制")}
    </button>
  );
}

function AssetPreviewChip({
  alias,
  fileName,
  fileExists,
  projectSlug,
}: {
  alias: string;
  fileName: string;
  fileExists: boolean;
  projectSlug: string;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const chipRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPreview) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        chipRef.current && !chipRef.current.contains(e.target as Node) &&
        popoverRef.current && !popoverRef.current.contains(e.target as Node)
      ) {
        setShowPreview(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPreview]);

  const handleClick = useCallback(() => {
    if (!fileExists || !chipRef.current) return;
    const rect = chipRef.current.getBoundingClientRect();
    const popoverWidth = 340;
    let left = rect.left + rect.width / 2 - popoverWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - popoverWidth - 8));
    const spaceBelow = window.innerHeight - rect.bottom;
    const top = spaceBelow > 320 ? rect.bottom + 8 : rect.top - 320;
    setPopoverPos({ top: Math.max(8, top), left });
    setShowPreview((prev) => !prev);
    setImgError(false);
  }, [fileExists]);

  const imgSrc = fileExists
    ? `/api/shot-browser/assets/${encodeURIComponent(projectSlug)}/${encodeURIComponent(fileName)}`
    : "";

  const popover = showPreview && fileExists
    ? createPortal(
        <div
          ref={popoverRef}
          className="sb-asset-popover"
          style={{ top: popoverPos.top, left: popoverPos.left }}
        >
          <div className="sb-asset-popover__header">
            <strong>{alias}</strong>
            <span className="sb-asset-popover__file">{fileName}</span>
            <button className="sb-asset-popover__close" onClick={() => setShowPreview(false)}>
              &times;
            </button>
          </div>
          {!imgError ? (
            <img
              className="sb-asset-popover__img"
              src={imgSrc}
              alt={alias}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="sb-asset-popover__fallback">图片加载失败</div>
          )}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <span
        ref={chipRef}
        className={`sb-asset-chip ${fileExists ? "sb-asset-chip--ok" : "sb-asset-chip--missing"}`}
        onClick={handleClick}
        style={{ cursor: fileExists ? "pointer" : "default" }}
      >
        <span className="sb-asset-chip__dot" />
        {alias}
      </span>
      {popover}
    </>
  );
}

function GlobalSectionItem({ section }: { section: GlobalSection }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="sb-global-section">
      <div className="sb-global-section__header">
        <span className="sb-global-section__label">{section.title}</span>
        <div className="sb-global-section__actions">
          <CopyButton text={section.body} label="复制" />
          <button
            className="sb-expand-toggle"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "收起" : "展开"}
          </button>
        </div>
      </div>
      {expanded && (
        <pre className="sb-prompt-text">{section.body}</pre>
      )}
    </div>
  );
}

function GlobalContextPanel({
  globalAssets,
  globalStyle,
  globalSections,
  globalText,
  projectAssets,
  projectSlug,
}: {
  globalAssets: ShotAssetMount[];
  globalStyle: string;
  globalSections: GlobalSection[];
  globalText: string;
  projectAssets: AssetFileInfo[];
  projectSlug: string;
}) {
  const [styleExpanded, setStyleExpanded] = useState(false);

  return (
    <div className="sb-global-panel">
      <div className="sb-global-panel__header">
        <div>
          <h3 className="sb-global-panel__title">全局上下文</h3>
          <span className="sb-global-panel__hint">
            每个 shot 生成前需要先挂载的全局资产和风格声明
          </span>
        </div>
        <CopyButton text={globalText} label="复制全局" />
      </div>

      {globalSections.map((section, i) => (
        <GlobalSectionItem key={`${section.title}-${i}`} section={section} />
      ))}

      {globalAssets.length > 0 && (
        <div className="sb-global-section">
          <span className="sb-global-section__label">全局挂载资产</span>
          <div className="sb-asset-chips">
            {globalAssets.map((a) => {
              const matched = projectAssets.find((f) => assetMatchesAlias(f.fileName, a.alias));
              return (
                <AssetPreviewChip
                  key={a.alias}
                  alias={a.alias}
                  fileName={matched?.fileName ?? ""}
                  fileExists={!!matched}
                  projectSlug={projectSlug}
                />
              );
            })}
          </div>
        </div>
      )}

      {globalStyle && (
        <div className="sb-global-section">
          <div className="sb-global-section__header">
            <span className="sb-global-section__label">全局风格声明</span>
            <div className="sb-global-section__actions">
              <CopyButton text={globalStyle} label="复制风格" />
              <button
                className="sb-expand-toggle"
                onClick={() => setStyleExpanded(!styleExpanded)}
              >
                {styleExpanded ? "收起" : "展开"}
              </button>
            </div>
          </div>
          {styleExpanded && (
            <pre className="sb-prompt-text">{globalStyle}</pre>
          )}
        </div>
      )}
    </div>
  );
}

function ShotCard({
  shot,
  globalAssets,
  globalText,
  projectAssets,
  projectSlug,
  shotStatus,
  onStatusChange,
  screenplayIndex,
}: {
  shot: ParsedShot;
  globalAssets: ShotAssetMount[];
  globalText: string;
  projectAssets: AssetFileInfo[];
  projectSlug: string;
  shotStatus: ShotStatus;
  onStatusChange: (status: GenerationStatus) => void;
  screenplayIndex: number;
}) {
  const allMounts = useMemo(() => {
    const seen = new Set<string>();
    const result: (ShotAssetMount & { fileExists: boolean; fileName: string })[] = [];
    for (const mount of shot.assetMounts) {
      if (seen.has(mount.alias)) continue;
      seen.add(mount.alias);
      const matched = projectAssets.find((a) => assetMatchesAlias(a.fileName, mount.alias));
      result.push({ ...mount, fileExists: !!matched, fileName: matched?.fileName ?? "" });
    }
    return result;
  }, [shot.assetMounts, projectAssets]);

  const [expanded, setExpanded] = useState(false);

  const statusOptions: GenerationStatus[] = ["pending", "generating", "done", "failed"];

  return (
    <article className="sb-shot-card" id={`shot-${screenplayIndex}-${shot.id}`}>
      <div className="sb-shot-card__header">
        <div className="sb-shot-card__title-row">
          <span className="sb-shot-id">#{shot.id}</span>
          <h3 className="sb-shot-title">{shot.title}</h3>
          {shot.timecode && <span className="sb-shot-timecode">{shot.timecode}</span>}
        </div>
        <div className="sb-shot-card__actions">
          <select
            className={`sb-status-select ${getStatusClass(shotStatus.status)}`}
            value={shotStatus.status}
            onChange={(e) => onStatusChange(e.target.value as GenerationStatus)}
          >
            {statusOptions.map((s) => (
              <option key={s} value={s}>{getStatusLabel(s)}</option>
            ))}
          </select>
          <CopyButton text={shot.fullPromptText} label="复制提示词" />
          {globalText && (
            <CopyButton text={globalText + "\n\n---\n\n" + shot.fullPromptText} label="含全局复制" />
          )}
        </div>
      </div>

      {allMounts.length > 0 && (
        <div className="sb-asset-row">
          <span className="sb-asset-row__label">挂载资产：</span>
          <div className="sb-asset-chips">
            {allMounts.map((m) => (
              <AssetPreviewChip
                key={m.alias}
                alias={m.alias}
                fileName={m.fileName}
                fileExists={m.fileExists}
                projectSlug={projectSlug}
              />
            ))}
          </div>
        </div>
      )}

      {Object.keys(shot.sections).length > 0 && (
        <div className="sb-section-pills">
          {Object.entries(shot.sections).map(([key, value]) => (
            <button
              key={key}
              className="sb-section-pill"
              onClick={() => {
                navigator.clipboard.writeText(value);
              }}
              title={`点击复制【${key}】内容`}
            >
              {key}
            </button>
          ))}
        </div>
      )}

      <div className="sb-prompt-area">
        <button className="sb-expand-toggle" onClick={() => setExpanded(!expanded)}>
          {expanded ? "收起完整提示词" : "展开完整提示词"}
        </button>
        {expanded && (
          <pre className="sb-prompt-text">{shot.fullPromptText}</pre>
        )}
      </div>
    </article>
  );
}

export default function ShotBrowserPage() {
  const [data, setData] = useState<BrowserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [selectedScreenplay, setSelectedScreenplay] = useState<number>(0);
  const [shotStatuses, setShotStatuses] = useState<Record<string, ShotStatus>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<GenerationStatus | "all">("all");

  useEffect(() => {
    fetch("/api/shot-browser")
      .then((res) => res.json())
      .then((json: BrowserData) => {
        setData(json);
        if (json.projects.length > 0) {
          setSelectedProject(json.projects[0].slug);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const currentProject = useMemo(
    () => data?.projects.find((p) => p.slug === selectedProject) ?? null,
    [data, selectedProject],
  );

  const currentScreenplay = useMemo(
    () => currentProject?.screenplays[selectedScreenplay] ?? null,
    [currentProject, selectedScreenplay],
  );

  const filteredShots = useMemo(() => {
    if (!currentScreenplay) return [];
    let shots = currentScreenplay.parsed.shots;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      shots = shots.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.fullPromptText.toLowerCase().includes(q) ||
          s.assetMounts.some((m) => m.alias.toLowerCase().includes(q)),
      );
    }

    if (filterStatus !== "all") {
      shots = shots.filter((s) => {
        const key = `${selectedProject}::${selectedScreenplay}::${s.id}`;
        const status = shotStatuses[key]?.status ?? "pending";
        return status === filterStatus;
      });
    }

    return shots;
  }, [currentScreenplay, searchQuery, filterStatus, selectedProject, selectedScreenplay, shotStatuses]);

  const statusSummary = useMemo(() => {
    if (!currentScreenplay) return { pending: 0, generating: 0, done: 0, failed: 0, total: 0 };
    const summary = { pending: 0, generating: 0, done: 0, failed: 0, total: 0 };
    for (const shot of currentScreenplay.parsed.shots) {
      const key = `${selectedProject}::${selectedScreenplay}::${shot.id}`;
      const status = shotStatuses[key]?.status ?? "pending";
      summary[status]++;
      summary.total++;
    }
    return summary;
  }, [currentScreenplay, selectedProject, selectedScreenplay, shotStatuses]);

  const assetSummary = useMemo(() => {
    if (!currentScreenplay || !currentProject) return { total: 0, found: 0, missing: 0 };
    const allAliases = new Set<string>();
    for (const shot of currentScreenplay.parsed.shots) {
      for (const m of shot.assetMounts) allAliases.add(m.alias);
    }
    for (const m of currentScreenplay.parsed.globalAssets) allAliases.add(m.alias);

    let found = 0;
    let missing = 0;
    for (const alias of allAliases) {
      if (currentProject.assets.some((a) => assetMatchesAlias(a.fileName, alias))) {
        found++;
      } else {
        missing++;
      }
    }
    return { total: allAliases.size, found, missing };
  }, [currentScreenplay, currentProject]);

  const handleStatusChange = useCallback(
    (shotId: string, status: GenerationStatus) => {
      const key = `${selectedProject}::${selectedScreenplay}::${shotId}`;
      setShotStatuses((prev) => ({ ...prev, [key]: { status } }));
    },
    [selectedProject, selectedScreenplay],
  );

  const globalPreamble = currentScreenplay?.parsed.globalPreamble ?? "";
  const globalStyle = currentScreenplay?.parsed.globalStyle ?? "";

  const globalText = useMemo(() => {
    if (!currentScreenplay) return "";
    const parts: string[] = [];
    if (globalPreamble) {
      parts.push(globalPreamble);
    } else {
      const { globalAssets } = currentScreenplay.parsed;
      if (globalAssets.length > 0) {
        parts.push(globalAssets.map((a) => `@${a.alias}=${a.alias}`).join("\n"));
      }
      if (globalStyle) {
        parts.push("全局风格：\n" + globalStyle);
      }
    }
    return parts.join("\n\n");
  }, [currentScreenplay, globalPreamble, globalStyle]);

  const handleCopyAllPrompts = useCallback(() => {
    if (!currentScreenplay) return;
    const shotTexts = currentScreenplay.parsed.shots
      .map((s) => s.fullPromptText)
      .join("\n\n---\n\n");
    const fullText = globalText ? globalText + "\n\n---\n\n" + shotTexts : shotTexts;
    navigator.clipboard.writeText(fullText);
  }, [currentScreenplay, globalText]);

  if (loading) {
    return (
      <main className="sb-main">
        <div className="sb-loading">
          <div className="sb-loading__spinner" />
          <span className="sb-loading__text">加载项目数据...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="sb-main">
        <div className="sb-loading">
          <h2 style={{ color: "var(--sb-red)", margin: 0 }}>加载失败</h2>
          <span className="sb-loading__text">{error}</span>
        </div>
      </main>
    );
  }

  if (!data || data.projects.length === 0) {
    return (
      <main className="sb-main">
        <div className="sb-loading">
          <h2 style={{ margin: 0 }}>没有找到项目</h2>
          <span className="sb-loading__text">工作区中没有发现包含 video-prompts 的项目。</span>
        </div>
      </main>
    );
  }

  return (
    <main className="sb-main">
      <div className="sb-layout">
        <aside className="sb-sidebar">
          <div className="sb-sidebar__brand">
            <div className="sb-sidebar__brand-icon">S</div>
            <div className="sb-sidebar__brand-text">
              <span className="sb-sidebar__brand-name">Shot Browser</span>
              <span className="sb-sidebar__brand-sub">Prompt Studio</span>
            </div>
          </div>

          <div className="sb-sidebar__section">
            <span className="sb-sidebar__label">项目</span>
            <div className="sb-project-list">
              {data.projects.map((p) => (
                <button
                  key={p.slug}
                  className={`sb-project-btn ${selectedProject === p.slug ? "sb-project-btn--active" : ""}`}
                  onClick={() => {
                    setSelectedProject(p.slug);
                    setSelectedScreenplay(0);
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                >
                  <strong>{p.displayName}</strong>
                  <span>{p.screenplays.length} 个剧本 · {p.assets.length} 个资产</span>
                </button>
              ))}
            </div>
          </div>

          {currentProject && currentProject.screenplays.length > 1 && (
            <div className="sb-sidebar__section">
              <span className="sb-sidebar__label">剧本 / 集</span>
              <div className="sb-screenplay-list">
                {currentProject.screenplays.map((sp, i) => (
                  <button
                    key={sp.relativePath}
                    className={`sb-screenplay-btn ${selectedScreenplay === i ? "sb-screenplay-btn--active" : ""}`}
                    onClick={() => {
                      setSelectedScreenplay(i);
                      setSearchQuery("");
                      setFilterStatus("all");
                    }}
                  >
                    <span>{sp.label}</span>
                    <span className="sb-screenplay-btn__count">{sp.parsed.shots.length} shots</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        <div className="sb-content">
          {currentScreenplay && (
            <>
              <div className="sb-header-bar">
                <div className="sb-header-bar__left">
                  <h1 className="sb-header-bar__title">
                    {currentProject?.displayName}
                  </h1>
                  <span className="sb-header-bar__subtitle">
                    {currentScreenplay.label}
                  </span>
                </div>
                <Link href="/" className="sb-back-link">返回首页</Link>
              </div>

              <div className="sb-toolbar">
                <div className="sb-stats-row">
                  <div className="sb-stat">
                    <span className="sb-stat__value">{statusSummary.total}</span>
                    <span className="sb-stat__label">总 shots</span>
                  </div>
                  <div className="sb-stat sb-stat--ok">
                    <span className="sb-stat__value">{assetSummary.found}</span>
                    <span className="sb-stat__label">资产就绪</span>
                  </div>
                  <div className="sb-stat sb-stat--warn">
                    <span className="sb-stat__value">{assetSummary.missing}</span>
                    <span className="sb-stat__label">资产缺失</span>
                  </div>
                  <div className="sb-stat sb-stat--done">
                    <span className="sb-stat__value">{statusSummary.done}</span>
                    <span className="sb-stat__label">已完成</span>
                  </div>
                </div>

                <div className="sb-filter-row">
                  <input
                    className="sb-search"
                    type="text"
                    placeholder="搜索 shot 标题、ID 或资产名..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="sb-filter-chips">
                    {(["all", "pending", "generating", "done", "failed"] as const).map((s) => (
                      <button
                        key={s}
                        className={`sb-filter-chip ${filterStatus === s ? "sb-filter-chip--active" : ""}`}
                        onClick={() => setFilterStatus(s)}
                      >
                        {s === "all" ? "全部" : getStatusLabel(s)}
                        {s !== "all" && (
                          <span className="sb-filter-chip__count">{statusSummary[s]}</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <button className="sb-copy-all-btn" onClick={handleCopyAllPrompts}>
                    复制全部提示词
                  </button>
                </div>
              </div>

              {(globalText || globalPreamble) && (
                <GlobalContextPanel
                  globalAssets={currentScreenplay.parsed.globalAssets}
                  globalStyle={globalStyle}
                  globalSections={currentScreenplay.parsed.globalSections}
                  globalText={globalText}
                  projectAssets={currentProject?.assets ?? []}
                  projectSlug={selectedProject}
                />
              )}

              <div className="sb-shot-list">
                {filteredShots.map((shot) => {
                  const key = `${selectedProject}::${selectedScreenplay}::${shot.id}`;
                  return (
                    <ShotCard
                      key={shot.id}
                      shot={shot}
                      globalAssets={currentScreenplay.parsed.globalAssets}
                      globalText={globalText}
                      projectAssets={currentProject?.assets ?? []}
                      projectSlug={selectedProject}
                      shotStatus={shotStatuses[key] ?? { status: "pending" }}
                      onStatusChange={(s) => handleStatusChange(shot.id, s)}
                      screenplayIndex={selectedScreenplay}
                    />
                  );
                })}
                {filteredShots.length === 0 && (
                  <p className="sb-empty">没有匹配的 shot。</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
