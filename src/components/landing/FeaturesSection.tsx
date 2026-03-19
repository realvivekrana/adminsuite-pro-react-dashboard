import { BarChart3, Users, ShoppingCart, Shield, Smartphone, Zap, Package, Bell } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: BarChart3,    title: "Advanced Analytics",    desc: "Interactive charts with date range filters, revenue trends, and top product breakdowns.",       color: "text-blue-600",    bg: "bg-blue-50"    },
  { icon: ShoppingCart, title: "Order Management",      desc: "Full order lifecycle tracking with status timelines, payment badges, and detail drawers.",       color: "text-[#008060]",  bg: "bg-[#008060]/8"},
  { icon: Package,      title: "Product Catalog",       desc: "Grid and list views with search, category filters, stock badges, and add/edit modals.",          color: "text-violet-600",  bg: "bg-violet-50"  },
  { icon: Users,        title: "Customer Profiles",     desc: "Customer list with spending history charts, order history, and detailed profile drawers.",        color: "text-amber-600",   bg: "bg-amber-50"   },
  { icon: Bell,         title: "Smart Notifications",   desc: "Real-time notification panel with unread indicators, type icons, and mark-all-read support.",     color: "text-pink-600",    bg: "bg-pink-50"    },
  { icon: Smartphone,   title: "Mobile-First Design",   desc: "Every page is designed for 320px first — tables become cards, drawers slide in from the edge.",  color: "text-cyan-600",    bg: "bg-cyan-50"    },
  { icon: Zap,          title: "Framer Motion",         desc: "Smooth page transitions, card hover lifts, drawer animations, and skeleton loaders throughout.", color: "text-orange-600",  bg: "bg-orange-50"  },
  { icon: Shield,       title: "Auth & Route Guards",   desc: "JWT-style auth simulation with protected routes, persistent sessions, and login/register flows.", color: "text-indigo-600",  bg: "bg-indigo-50"  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#008060]/8 text-[#008060] text-xs font-semibold mb-4 border border-[#008060]/15">
            Everything included
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for real-world admin needs
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Every feature you'd expect from a production dashboard, built with clean code and modern patterns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
            >
              <div className={`h-10 w-10 rounded-xl ${f.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <f.icon className={`h-5 w-5 ${f.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
