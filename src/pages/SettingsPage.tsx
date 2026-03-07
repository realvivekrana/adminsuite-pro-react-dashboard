import { Settings } from "lucide-react";

/** Placeholder Settings page */
export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences.</p>
      </div>
      <div className="glass-card rounded-xl p-16 text-center">
        <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Settings Panel</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Account preferences, notification settings, and integrations will be available here.
        </p>
      </div>
    </div>
  );
}
