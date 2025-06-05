import chroma from "chroma-js";

export type ThemeType = "light" | "dark";

export interface ThemeOptions {
  primary: string;
}

export const generateThemes = ({ primary }: ThemeOptions) => ({
  light: generateTheme(primary, "light"),
  dark: generateTheme(primary, "dark"),
});

const generateTheme = (primary: string, type: ThemeType) => {
  const base = chroma(primary);
  const background = generateBackgrounds(base, type);
  const palette = generateCorePalette(base, type);
  const paletteHover = generatePaletteHover(palette, type);
  const textStyles = generateTextStyles(type);
  const textOnPalette = generateTextOnPalette(palette, type);

  return {
    palette,
    background,
    paletteHover,
    textStyles,
    textOnPalette,
  };
};

const ensureContrast = (
  color: chroma.Color,
  background: string,
  type: ThemeType,
  minContrast = 3.1
): string => {
  let adjusted = color;
  let contrast = chroma.contrast(adjusted, background);
  let attempts = 0;

  while (contrast < minContrast && attempts < 10) {
    const l = adjusted.get("hsl.l");
    // Darken for light theme, lighten for dark theme
    adjusted = adjusted.set("hsl.l", l + (type === "light" ? -0.05 : 0.05));
    contrast = chroma.contrast(adjusted, background);
    attempts++;
  }

  return adjusted.hex();
};

const generateUtilityColor = (
  hue: number,
  background: string,
  type: ThemeType,
  saturation = 1,
  lightness = 0.6
): string => {
  const baseColor = chroma.hsl(hue, saturation, lightness);
  return ensureContrast(baseColor, background, type);
};

const generateCorePalette = (base: chroma.Color, type: ThemeType) => {
  const hue = base.get("hsl.h");
  const z0Background = generateBackgrounds(base, type)["z0"];

  return {
    primary: base.hex(),
    secondary: base.set("hsl.h", (hue + 180) % 360).hex(),
    success: generateUtilityColor(120, z0Background, type, 0.6, 0.5), // green
    warn: generateUtilityColor(40, z0Background, type, 1, 0.6),       // yellow
    error: generateUtilityColor(0, z0Background, type, 0.8, 0.5),     // red
  };
};

const generatePaletteHover = (palette: Record<string, string>, type: ThemeType) => {
  const adjust = type === "light" ? darken : lighten;
  return Object.fromEntries(
    Object.entries(palette).flatMap(([key, value]) => [
      [key, adjust(value, 0.1)]
    ])
  );
};

const generateBackgrounds = (base: chroma.Color, type: ThemeType) => {
  const stops = Array.from({ length: 5 }, (_, i) => (5 - i) / 10);
  return stops.reduce((acc, stop, i) => {
    const color = type === "light"
      ? chroma.mix("#fff", base, stop)
      : chroma.mix("#000", base, stop);
    
    const label = `z${4 - i}`; // Invert the index
    acc[label] = color.hex();
    return acc;
  }, {} as Record<string, string>);
};

const generateTextStyles = (type: ThemeType) => {
  const base = type === "light" ? "#000" : "#fff";
  return {
    base,
    light: chroma(base).alpha(0.75).css(),
    lighter: chroma(base).alpha(0.5).css(),
    lightest: chroma(base).alpha(0.33).css(),
  };
};

const generateTextOnPalette = (palette: Record<string, string>, type: ThemeType) => {
  const lightText = "#fff";
  const darkText = "#000";

  return Object.fromEntries(
    Object.entries(palette).flatMap(([key, bg]) => {
      const lightContrast = chroma.contrast(bg, lightText);
      const darkContrast = chroma.contrast(bg, darkText);
      const best = lightContrast >= 3.1 ? lightText : darkContrast >= 3.1 ? darkText : lightContrast > darkContrast ? lightText : darkText;

      return [
        [`text-base-on-${key}`, best],
        [`text-light-on-${key}`, chroma(best).alpha(0.75).css()],
        [`text-lighter-on-${key}`, chroma(best).alpha(0.5).css()],
        [`text-lightest-on-${key}`, chroma(best).alpha(0.33).css()],
      ];
    })
  );
};

const darken = (hex: string, amount = 0.1) => chroma(hex).darken(amount * 10).hex();

const lighten = (hex: string, amount = 0.1) => chroma(hex).brighten(amount * 10).hex();