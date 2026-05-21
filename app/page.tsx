import Link from "next/link";

import { ProviderConfigPanel } from "@/components/provider-config-panel";

const endpoints = [
    {
        name: "POST /api/projects/import",
        desc: "导入现有项目目录，识别 screenplay、shot list、reference map 和 generation list。",
    },
    {
        name: "GET /api/projects/[slug]/prompts",
        desc: "把 shot、reference map 和 generation list 组装成最小可提交 prompt bundles。",
    },
    {
        name: "GET /api/projects/demo",
        desc: "返回一个最小项目摘要，作为前端页面和状态流的占位数据。",
    },
    {
        name: "GET /api/health",
        desc: "快速确认 Web 工具壳和 API 路由已运行。",
    },
];

export default function HomePage() {
    return (
        <main>
            <section className="hero">
                <p className="eyebrow">AI Video Workflow</p>
                <h1>从剧本到视频任务的最小工具壳</h1>
                <p>
                    这不是直接成片平台，而是先把你当前仓库里已经成熟的 screenplay、shot list、reference map、prompt
                    和 generation list 接入一个统一入口。第一步先跑通导入、预览、任务创建和状态追踪。
                </p>
                <div className="chip-row">
                    <span className="chip">Next.js</span>
                    <span className="chip">TypeScript</span>
                    <span className="chip">Zod-ready</span>
                    <span className="chip">Provider-ready</span>
                </div>
                <p className="mono">
                    <Link href="/projects/zhengci-zhiwai">打开《证词之外》项目详情</Link>
                </p>
            </section>

            <section className="grid">
                <article className="card stack">
                    <h2>当前骨架</h2>
                    <p>
                        已经预留了 Web 入口、基础样式和最薄的 API 路由，下一步可以直接接 importer、prompt assembler 和
                        mock provider。
                    </p>
                    <div className="chip-row">
                        <span className="chip">项目导入</span>
                        <span className="chip">镜头状态</span>
                        <span className="chip">任务队列</span>
                    </div>
                </article>

                <article className="card stack">
                    <h2>首个目标</h2>
                    <p>
                        先让《证词之外》可以被导入成结构化项目，并在页面里看到镜头数、资产数、prompt 就绪状态和任务占位。
                    </p>
                    <p className="mono">推荐首个闭环：import → inspect → queue → poll</p>
                </article>
            </section>

            <section className="card stack" style={{ marginTop: 24 }}>
                <h3>已开放的最小接口</h3>
                <div className="grid">
                    {endpoints.map((endpoint) => (
                        <div className="endpoint" key={endpoint.name}>
                            <strong>{endpoint.name}</strong>
                            <span>{endpoint.desc}</span>
                        </div>
                    ))}
                </div>
            </section>

            <ProviderConfigPanel
                title="Provider 配置"
                description="当前 provider 抽象已经支持 mock 和通用 HTTP 提交器。这里直接显示每个引擎是否可用、缺哪些环境变量，以及根目录 .env.example 该怎么填。"
            />
        </main>
    );
}
