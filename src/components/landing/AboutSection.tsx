import { Zap, Shield, TrendingUp, Users, Code, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with React and Vite for blazing fast performance and instant hot module replacement.",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security with JWT authentication, role-based access control, and data encryption.",
  },
  {
    icon: TrendingUp,
    title: "Real-time Analytics",
    description: "Monitor your business metrics in real-time with beautiful charts and comprehensive dashboards.",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Complete user management system with roles, permissions, and activity tracking built-in.",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Clean, well-documented code with TypeScript support and modern development practices.",
  },
  {
    icon: Sparkles,
    title: "Modern UI/UX",
    description: "Beautiful, responsive design with dark mode support and smooth animations throughout.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            About <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">AdminSuite Pro</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AdminSuite Pro is a modern, feature-rich admin dashboard built with React, TypeScript, and Tailwind CSS. 
            Designed for developers and businesses who need a powerful, scalable solution for managing their applications.
          </p>
        </div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
              
              {/* Card */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl blur-xl opacity-50" />
          <div className="relative bg-card/50 backdrop-blur-sm border border-primary/30 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Built with Modern Technologies
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                React 18
              </span>
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                TypeScript
              </span>
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                Tailwind CSS
              </span>
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                Vite
              </span>
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                React Query
              </span>
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                Radix UI
              </span>
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors">
                Recharts
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
