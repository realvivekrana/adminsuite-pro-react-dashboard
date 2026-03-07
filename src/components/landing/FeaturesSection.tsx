import { BarChart3, Users, Activity, Shield, Smartphone, Plug } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics with beautiful charts and real-time data visualization for informed decision making.",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Complete user management system with roles, permissions, and activity tracking for seamless administration.",
  },
  {
    icon: Activity,
    title: "Real-time Data",
    description: "Monitor your business metrics in real-time with live updates and instant notifications for critical events.",
  },
  {
    icon: Shield,
    title: "Secure System",
    description: "Enterprise-grade security with JWT authentication, role-based access control, and data encryption.",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Fully responsive interface that works perfectly on desktop, tablet, and mobile devices.",
  },
  {
    icon: Plug,
    title: "API Integration",
    description: "Easy integration with third-party services and APIs. Connect your favorite tools seamlessly.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to streamline your workflow and boost productivity
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Glassmorphism Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              
              {/* Card with Glassmorphism */}
              <div className="relative bg-card/30 backdrop-blur-xl border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
