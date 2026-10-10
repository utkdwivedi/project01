import Link from "next/link";

const pipeline = [
  { n: "01", name: "Install", command: "npm ci", detail: "Reproducible dependencies" },
  { n: "02", name: "Lint", command: "npm run lint", detail: "Catch common mistakes" },
  { n: "03", name: "Typecheck", command: "npm run typecheck", detail: "Validate TypeScript" },
  { n: "04", name: "Build", command: "npm run build", detail: "Create production output" }
];

const capabilities = [
  { n: "01", title: "Continuous integration", text: "Run the same quality gates on every pull request before it reaches main.", tag: "GitHub Actions" },
  { n: "02", title: "Repeatable runtime", text: "A multi-stage image keeps build tools out of production and runs as a non-root user.", tag: "Docker" },
  { n: "03", title: "Visible health", text: "An HTTP endpoint gives Docker Compose a real signal for container health.", tag: "Health checks" }
];

export default function Home() {
  return (
    <main className="shell">
      <nav className="topbar" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Project01 home">
          <span className="mark">P<span>01</span></span>
          <span>PROJECT<span className="wordmark-muted"> / DELIVERY</span></span>
        </Link>
        <div className="nav-meta"><span className="nav-dot" /> ENGINEERING PREVIEW</div>
      </nav>
      <section className="hero">
        <p className="eyebrow"><span className="eyebrow-line" /> DELIVERY SYSTEMS / 001</p>
        <h1>Small app.<br /><span>Real delivery</span><br />workflow.</h1>
        <div className="hero-bottom">
          <p className="hero-copy">A practical foundation for shipping software with repeatable checks, a containerized runtime, and health signals you can verify.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/api/health">Inspect health endpoint <span aria-hidden="true">↗</span></a>
            <a className="button button-quiet" href="https://github.com/utkdwivedi/project01" target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <section className="status-strip" aria-label="Project details">
        <div><span className="label">CURRENT PHASE</span><span className="value"><span className="status-dot" /> Foundation setup</span></div>
        <div><span className="label">APPLICATION</span><span className="value">Next.js / TypeScript</span></div>
        <div><span className="label">RUNTIME TARGET</span><span className="value">Docker / Node.js 22</span></div>
        <div><span className="label">DEPLOYMENT</span><span className="value value-muted">Not configured yet</span></div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div><p className="eyebrow">01 / THE DELIVERY PATH</p><h2>From commit to build.</h2></div>
          <p className="section-aside">The same checks run locally and in CI.</p>
        </div>
        <div className="pipeline">
          {pipeline.map((step, index) => (
            <article className="pipeline-step" key={step.n}>
              <div className="step-top"><span className="step-number">{step.n}</span><span className="step-arrow" aria-hidden="true">{index === pipeline.length - 1 ? "↗" : "→"}</span></div>
              <h3>{step.name}</h3><code>{step.command}</code><p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section capabilities-section">
        <div className="section-heading">
          <div><p className="eyebrow">02 / BUILT INTO THE BASELINE</p><h2>Operational by design.</h2></div>
          <p className="section-aside">No deployment claims. Just clear, verifiable engineering.</p>
        </div>
        <div className="capabilities">
          {capabilities.map((item) => (
            <article className="capability" key={item.n}>
              <div className="capability-number">{item.n}</div>
              <div className="capability-content"><h3>{item.title}</h3><p>{item.text}</p><span className="tag">{item.tag}</span></div>
              <span className="capability-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>
      <footer className="footer">
        <Link className="wordmark" href="/"><span className="mark">P<span>01</span></span><span>PROJECT<span className="wordmark-muted"> / DELIVERY</span></span></Link>
        <p>Built to make the path from code to runtime visible.</p>
        <span className="footer-meta">FOUNDATION / 2026</span>
      </footer>
    </main>
  );
}
