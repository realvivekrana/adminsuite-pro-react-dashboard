import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  index?: number;
  prefix?: string;
  suffix?: string;
}

export function StatsCard({
  title, value, change, changeType, icon: Icon,
  iconColor = "text-[#008060]", iconBg = "bg-[#008060]/10",
  index = 0,
}: StatsCardProps) {
  const isPositive = changeType === "positive";
  const isNegative = changeType === "negative";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-card border border-border rounded-xl p-5 hover:border-[#008060]/30 hover:shadow-md hover:shadow-[#008060]/5 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110", iconBg)}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          isPositive && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          isNegative && "bg-red-500/10 text-red-600 dark:text-red-400",
          !isPositive && !isNegative && "bg-secondary text-muted-foreground"
        )}>
          {isPositive && <TrendingUp className="h-3 w-3" />}
          {isNegative && <TrendingDown className="h-3 w-3" />}
          {change}
        </div>
      </div>
      <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{title}</p>
    </motion.div>
  );
}
