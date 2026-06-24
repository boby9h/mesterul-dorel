import {
  AirVent,
  Grid3x3,
  Hammer,
  Home,
  LayoutPanelTop,
  PaintRoller,
  Ruler,
  ShowerHead,
  Sparkles,
  Trees,
  WashingMachine,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Mapeaza numele iconului din datele de categorii la componenta Lucide. */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Wrench,
  Zap,
  PaintRoller,
  Grid3x3,
  Hammer,
  ShowerHead,
  WashingMachine,
  AirVent,
  Ruler,
  Home,
  Sparkles,
  Trees,
  LayoutPanelTop,
};

export function categoryIcon(name: string): LucideIcon {
  return CATEGORY_ICONS[name] ?? Wrench;
}
