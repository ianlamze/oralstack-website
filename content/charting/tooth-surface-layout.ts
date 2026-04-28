import type { Surface } from "./types";

export function getVerticalSurfaceKeys(tooth: number): {
  top: Extract<Surface, "B" | "L">;
  bottom: Extract<Surface, "B" | "L">;
} {
  const isMaxillary = tooth >= 11 && tooth <= 28;
  if (isMaxillary) return { top: "B", bottom: "L" };
  return { top: "L", bottom: "B" };
}

export function getHorizontalSurfaceKeys(tooth: number): {
  left: Extract<Surface, "M" | "D">;
  right: Extract<Surface, "M" | "D">;
} {
  const quadrant = Math.trunc(tooth / 10);
  if (quadrant === 1 || quadrant === 4) return { left: "D", right: "M" };
  return { left: "M", right: "D" };
}
