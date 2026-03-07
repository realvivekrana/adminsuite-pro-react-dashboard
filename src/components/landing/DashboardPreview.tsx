import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardPreview() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
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
            See it in{" "}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              action
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the power and elegance of AdminSuite Pro dashboard
          </p>
        </motion.div>

        {/* Dashboard Preview with Floating Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          {/* Animated Glow Effect */}
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-primary via-blue-500 to-primary rounded-3xl blur-3xl opacity-20"
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Preview Container with Floating Animation */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative bg-card/30 backdrop-blur-sm border border-primary/30 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Browser Chrome */}
            <div className="bg-card/50 border-b border-border/50 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="h-3 w-3 rounded-full bg-green-500/60 hover:bg-green-500 transition-colors cursor-pointer" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background/50 rounded px-3 py-1.5 text-xs text-muted-foreground border border-border/30">
                  https://adminsuite.pro/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard Screenshot Placeholder */}
            <div className="aspect-video bg-gradient-to-br from-primary/10 via-background to-card/50 flex items-center justify-center p-8 relative overflow-hidden">
              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
              
              {/* Content */}
              <div className="relative text-center space-y-6 z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center justify-center h-24 w-24 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-sm"
                >
                  <svg className="h-12 w-12" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
                    <g stroke="#61dafb" strokeWidth="1" fill="none">
                      <ellipse rx="11" ry="4.2"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                  </svg>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">
                    Interactive Dashboard Preview
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Click below to explore the full dashboard experience with real-time analytics and data visualization
                  </p>
                  <Link to="/dashboard">
                    <Button size="lg" className="group bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300">
                      Open Dashboard
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
