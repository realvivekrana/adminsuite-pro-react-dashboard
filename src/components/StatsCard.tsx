import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  index?: number;
}

/** Animated stats card for the dashboard */
export function StatsCard({ title, value, change, changeType, icon: Icon, index = 0 }: StatsCardProps) {
  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  }[changeType];

  return (
    <div
      className="glass-card rounded-xl p-6 hover:shadow-md transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold tracking-tight text-card-foreground animate-counter" style={{ animationDelay: `${index * 100 + 200}ms` }}>
          {value}
        </p>
        <p className={`text-sm font-medium ${changeColor}`}>{change}</p>
      </div>
    </div>
  );
}
