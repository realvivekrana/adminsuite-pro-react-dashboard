import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Zap } from "lucide-react";

export function LandingFooter() {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-[#008060] flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-gray-900">Shopify Admin</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-5">
              A production-quality Shopify-inspired admin dashboard built with React, Tailwind CSS, and Framer Motion.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Github,   href: "https://github.com",   label: "GitHub"   },
                { icon: Twitter,  href: "https://twitter.com",  label: "Twitter"  },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="h-9 w-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#008060] hover:border-[#008060]/30 hover:bg-[#008060]/5 transition-all">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[["Features","#features"],["Pricing","#pricing"],["Dashboard","/dashboard"],["Sign in","/login"]].map(([l,h]) => (
                <li key={l}>
                  {h.startsWith("/") ? (
                    <Link to={h} className="text-sm text-gray-500 hover:text-[#008060] transition-colors">{l}</Link>
                  ) : (
                    <a href={h} className="text-sm text-gray-500 hover:text-[#008060] transition-colors">{l}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[["About","#about"],["Blog","#"],["Careers","#"],["Contact","#contact"]].map(([l,h]) => (
                <li key={l}><a href={h} className="text-sm text-gray-500 hover:text-[#008060] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[["Docs","#"],["API Reference","#"],["GitHub","https://github.com"],["Support","#"]].map(([l,h]) => (
                <li key={l}><a href={h} className="text-sm text-gray-500 hover:text-[#008060] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Shopify Admin Dashboard. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
