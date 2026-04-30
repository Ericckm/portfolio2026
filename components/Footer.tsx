export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          © {year} Erick Martins — Built with Next.js & Tailwind
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Ericckm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-amber transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/ericckm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-amber transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="mailto:ericckm@outlook.com.br"
            className="font-mono text-xs text-muted hover:text-amber transition-colors"
          >
            Email ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
