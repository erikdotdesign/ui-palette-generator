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
  const hoverFocus = generateHoverFocus(palette, type);
  const textStyles = generateTextStyles(type);
  const textOnPalette = generateTextOnPalette(palette, type);

  return {
    palette,
    background,
    hoverFocus,
    textStyles,
    textOnPalette,
  };
};

const generateCorePalette = (base: chroma.Color, type: ThemeType) => {
  const hue = base.get("hsl.h");
  return {
    primary: base.hex(),
    secondary: base.set("hsl.h", (hue + 180) % 360).hex(),
    success: chroma.hsl(120, 0.6, type === "light" ? 0.4 : 0.6).hex(),
    warn: chroma.hsl(40, 0.8, type === "light" ? 0.5 : 0.6).hex(),
    error: chroma.hsl(0, 0.8, type === "light" ? 0.4 : 0.6).hex(),
    info: chroma.hsl(210, 0.6, type === "light" ? 0.5 : 0.6).hex(),
  };
};

const generateHoverFocus = (palette: Record<string, string>, type: ThemeType) => {
  const adjust = type === "light" ? darken : lighten;
  return Object.fromEntries(
    Object.entries(palette).flatMap(([key, value]) => [
      [`${key}-hover`, adjust(value, 0.1)],
      [`${key}-focus`, adjust(value, 0.1)],
    ])
  );
};

const generateBackgrounds = (base: chroma.Color, type: ThemeType) => {
  const stops = Array.from({ length: 9 }, (_, i) => (9 - i) / 10);
  return stops.reduce((acc, stop, i) => {
    const color = type === "light"
      ? chroma.mix("#fff", base, stop)
      : chroma.mix("#000", base, stop);
    
    const label = `z${8 - i}`; // Invert the index
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