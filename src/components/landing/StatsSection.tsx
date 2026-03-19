import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Users, Package } from "lucide-react";

const stats = [
  { icon: TrendingUp,   value: "$1.28M",  label: "Revenue tracked",    sub: "Across all orders",      color: "text-[#008060]",  bg: "bg-[#008060]/8"  },
  { icon: ShoppingCart, value: "9,420",   label: "Orders processed",   sub: "This year",              color: "text-blue-600",   bg: "bg-blue-50"      },
  { icon: Users,        value: "3,890",   label: "Active customers",   sub: "And growing",            color: "text-violet-600", bg: "bg-violet-50"    },
  { icon: Package,      value: "120+",    label: "Products managed",   sub: "Across all categories",  color: "text-amber-600",  bg: "bg-amber-50"     },
];

export function StatsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="text-center"
            >
              <div className={`h-12 w-12 rounded-2xl ${s.bg} flex items-center justify-center mx-auto mb-4`}>
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{s.value}</p>
              <p className="text-sm font-semibold text-gray-700">{s.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
