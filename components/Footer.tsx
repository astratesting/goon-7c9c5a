import Link from "next/link";
import Compass from "./Compass";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Compass size={28} />
              <span className="font-heading text-lg font-bold text-gradient">Goon</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed">
              Custom 3D printing for hobbyist makers. Describe it, sketch it, print it.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-sm text-muted hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-sm text-muted hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-sm text-muted hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="text-sm text-muted hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-sm text-muted hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/login" className="text-sm text-muted hover:text-white transition-colors">Get Started</Link></li>
              <li><Link href="/dashboard" className="text-sm text-muted hover:text-white transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted">Terms of Service</span></li>
              <li><span className="text-sm text-muted">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} Goon. All rights reserved.
          </p>
          <p className="text-xs text-muted/40">
            Built for makers, by makers.
          </p>
        </div>
      </div>
    </footer>
  );
}
