import Compass from "./Compass";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Compass size={24} />
            <span className="font-heading text-lg font-bold text-gradient">
              Goon
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted/60">
            &copy; 2026 Goon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
