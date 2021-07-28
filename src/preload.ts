import { detectAndSetTheme } from "@/feature/theme-select";

detectAndSetTheme();

window.matchMedia("(prefers-color-scheme: dark)")
.addEventListener(
  "change",
  detectAndSetTheme
);