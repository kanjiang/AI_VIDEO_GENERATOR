import Link from "next/link";
import { notFound } from "next/navigation";

import { assembleProjectPrompts } from "@/server/prompts/assembler";

type ProjectPromptsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPromptsPage({ params }: ProjectPromptsPageProps) {
  const { slug } = await params;

  try {
    const prompts = await assembleProjectPrompts(process.cwd(), slug);

    return (
      <main>
        <section className="hero">
          <p className="eyebrow">Prompt Workspace</p>
          <h1>{slug} prompts</h1>
          <p>这里展示当前项目所有已组装的 shot 级 prompt，可直接用于检查、复制和后续映射到具体 provider 请求体。</p>
          <div className="chip-row">
            <span className="chip">Prompt 数 {prompts.bundles.length}</span>
            <span className="chip">风格 {prompts.providerStyle}</span>
          </div>
          <p className="mono">
            <Link href={`/projects/${slug}`}>返回项目详情</Link>
          </p>
        </section>

        <section className="card stack" style={{ marginTop: 24 }}>
          <h2>全部 Shot Prompts</h2>
          <div className="prompt-workspace">
            {prompts.bundles.map((bundle) => (
              <article className="prompt-card" key={bundle.shotId}>
                <div className="prompt-card__header">
                  <div className="stack" style={{ gap: 6 }}>
                    <strong>{bundle.title}</strong>
                    <span>
                      {bundle.summary} · {bundle.duration}
                    </span>
                  </div>
                  <span className="chip">{bundle.sceneNo}</span>
                </div>
                <p className="mono">参考图：{bundle.imageBindings.join(" / ") || "无"}</p>
                <pre className="prompt-preview">{bundle.promptText}</pre>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  } catch {
    notFound();
  }
}
