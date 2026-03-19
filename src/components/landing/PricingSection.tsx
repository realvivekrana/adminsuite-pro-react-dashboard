import { Link } from "react-router-dom";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter", price: "$29", period: "/mo",
    desc: "Perfect for small teams",
    features: ["Up to 10 users", "Basic analytics", "Order management", "Email support", "1 GB storage"],
    popular: false, cta: "Get started",
  },
  {
    name: "Pro", price: "$79", period: "/mo",
    desc: "Best for growing businesses",
    features: ["Up to 50 users", "Advanced analytics", "All pages & features", "Priority support", "10 GB storage", "Custom branding"],
    popular: true, cta: "Start free trial",
  },
  {
    name: "Enterprise", price: "$199", period: "/mo",
    desc: "For large organizations",
    features: ["Unlimited users", "Enterprise analytics", "24/7 phone support", "Unlimited storage", "Dedicated manager", "SLA guarantee"],
    popular: false, cta: "Contact sales",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#008060]/8 text-[#008060] text-xs font-semibold mb-4 border border-[#008060]/15">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-500 text-lg">No hidden fees. Cancel anytime.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative bg-white rounded-2xl p-7 border transition-all duration-200 ${
                plan.popular
                  ? "border-[#008060] shadow-lg shadow-[#008060]/10 ring-1 ring-[#008060]/20"
                  : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#008060] text-white text-xs font-semibold shadow-sm">
                    <Zap className="h-3 w-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-7">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-[#008060] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link to="/register"
                className={`block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.popular
                    ? "bg-[#008060] text-white hover:bg-[#006e52] shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
