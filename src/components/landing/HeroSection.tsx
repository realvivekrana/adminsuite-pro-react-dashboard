import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, ShoppingCart, Users, TrendingUp, Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const kpis = [
  { label: "Total Revenue",  value: "$128,430", change: "+18.2%", icon: TrendingUp,  color: "text-[#008060]",  bg: "bg-[#008060]/8"  },
  { label: "Total Orders",   value: "1,042",    change: "+12.5%", icon: ShoppingCart,color: "text-blue-600",   bg: "bg-blue-50"      },
  { label: "Customers",      value: "8,340",    change: "+9.1%",  icon: Users,       color: "text-violet-600", bg: "bg-violet-50"    },
  { label: "Avg. Order Val", value: "$123.25",  change: "+5.2%",  icon: BarChart3,   color: "text-amber-600",  bg: "bg-amber-50"     },
];

const badges = ["React + Vite", "Tailwind CSS", "Recharts", "Framer Motion", "Zustand"];

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008060]/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#008060]/8 border border-[#008060]/20 mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#008060] animate-pulse" />
            <span className="text-xs font-semibold text-[#008060]">Production-ready Admin Dashboard</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-[1.1] tracking-tight"
          >
            Welcome to{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-[#008060] to-emerald-500 bg-clip-text text-transparent">
                Admin Dashboard
              </span>
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="#008060" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
              </svg>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg sm:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            A Shopify-inspired admin panel with real-time analytics, order management,
            customer insights, and beautiful data visualization — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <Link to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008060] text-white text-sm font-semibold hover:bg-[#006e52] transition-all shadow-md shadow-[#008060]/20 hover:shadow-lg hover:shadow-[#008060]/25 hover:-translate-y-0.5 group">
              Get started free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-700 text-sm font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm hover:-translate-y-0.5">
              View live demo
            </Link>
          </motion.div>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-14"
          >
            {badges.map(b => (
              <span key={b} className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium border border-gray-200">
                {b}
              </span>
            ))}
          </motion.div>

          {/* KPI Cards preview */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            {kpis.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.07 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white border border-gray-100 rounded-xl p-4 text-left shadow-sm hover:shadow-md transition-all"
              >
                <div className={`h-8 w-8 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`h-4 w-4 ${k.color}`} />
                </div>
                <p className="text-lg font-bold text-gray-900">{k.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
                <span className="inline-block mt-1.5 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                  {k.change}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 text-sm text-gray-500"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              <span className="ml-1 font-medium text-gray-700">4.9/5</span>
            </div>
            <span className="hidden sm:block text-gray-300">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#008060]" />
              <span>No backend required</span>
            </div>
            <span className="hidden sm:block text-gray-300">·</span>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-[#008060]" />
              <span>Mobile-first design</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
