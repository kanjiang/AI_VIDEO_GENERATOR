import { listVideoProviderConfigStatus } from "@/server/providers/video/registry";

type ProviderConfigPanelProps = {
    title: string;
    description: string;
};

export function ProviderConfigPanel({ title, description }: ProviderConfigPanelProps) {
    const providers = listVideoProviderConfigStatus();

    return (
        <section className="card stack" style={{ marginTop: 24 }}>
            <div className="stack" style={{ gap: 6 }}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            <div className="provider-config-grid">
                {providers.map((provider) => (
                    <article className="provider-config-card" key={provider.name}>
                        <div className="provider-config-card__header">
                            <div className="stack" style={{ gap: 4 }}>
                                <strong>{provider.label}</strong>
                                <span>{provider.description}</span>
                            </div>
                            <span className={provider.isAvailable ? "provider-config-badge provider-config-badge--ready" : "provider-config-badge provider-config-badge--pending"}>
                                {provider.isAvailable ? "已就绪" : "待配置"}
                            </span>
                        </div>

                        {provider.endpointPreview ? <p className="mono">Submit URL: {provider.endpointPreview}</p> : null}

                        <div className="provider-config-meta">
                            <div className="stack" style={{ gap: 8 }}>
                                <span className="provider-config-meta__label">必填环境变量</span>
                                <div className="chip-row">
                                    {provider.requiredEnvVars.length > 0 ? provider.requiredEnvVars.map((envVar) => <span className="chip" key={envVar}>{envVar}</span>) : <span className="chip">无</span>}
                                </div>
                            </div>

                            <div className="stack" style={{ gap: 8 }}>
                                <span className="provider-config-meta__label">当前缺失</span>
                                <div className="chip-row">
                                    {provider.missingEnvVars.length > 0 ? provider.missingEnvVars.map((envVar) => <span className="chip chip--warn" key={envVar}>{envVar}</span>) : <span className="chip chip--ok">无</span>}
                                </div>
                            </div>

                            <div className="stack" style={{ gap: 8 }}>
                                <span className="provider-config-meta__label">可选环境变量</span>
                                <div className="chip-row">
                                    {provider.optionalEnvVars.length > 0 ? provider.optionalEnvVars.map((envVar) => <span className="chip chip--muted" key={envVar}>{envVar}</span>) : <span className="chip">无</span>}
                                </div>
                            </div>
                        </div>

                        <div className="stack" style={{ gap: 8 }}>
                            <span className="provider-config-meta__label">说明</span>
                            {provider.notes.map((note) => (
                                <p className="mono" key={note}>{note}</p>
                            ))}
                        </div>
                    </article>
                ))}
            </div>

            <p className="mono">根目录可放置 .env.local；示例变量已写入项目根目录的 .env.example。</p>
        </section>
    );
}
