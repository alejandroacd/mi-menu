"use client";

import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function SwitchMode() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (isDark: boolean) => {
    setTheme(isDark ? "light" : "dark");
  };
  return (
    <div className="flex items-center mx-5">
      <SunMoon className={`mr-2`} />
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        onCheckedChange={() => handleThemeChange(theme === "dark")}
        aria-label="Toggle theme"
      />
    </div>
  );
}
