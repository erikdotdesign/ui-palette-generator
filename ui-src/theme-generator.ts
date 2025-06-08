import chroma from "chroma-js";

export type ThemeType = "light" | "dark";

export type SecondaryColorType = "complimentary" | "split-compliment-left" | "split-compliment-right" | "analogous";

export interface ThemeOptions {
  primary: string;
  secondaryColorType: SecondaryColorType;
}

export const generateThemes = ({ primary, secondaryColorType }: ThemeOptions) => ({
  light: generateTheme(primary, secondaryColorType, "light"),
  dark: generateTheme(primary, secondaryColorType, "dark"),
});

const generateTheme = (primary: string, secondaryColorType: SecondaryColorType, type: ThemeType) => {
  const base = chroma(primary);
  const background = generateBackgrounds(base, type);
  const palette = generateCorePalette(base, secondaryColorType, type);
  const paletteHover = generatePaletteHover(palette, type);
  const text = generateTextStyles(type);
  const textOnPalette = generateTextOnPalette(palette, type);

  return {
    palette,
    background,
    paletteHover,
    text,
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

// Compliment (±180°)
const generateSecondaryComplimentary = (base: chroma.Color) => {
  const hue = base.get("hsl.h");
  const analogousHue = (hue + 180) % 360;
  return base.set("hsl.h", analogousHue).hex();
};

// Analogous (±30°)
const generateSecondaryAnalogous = (base: chroma.Color) => {
  const hue = base.get("hsl.h");
  const analogousHue = (hue + 30) % 360;
  return base.set("hsl.h", analogousHue).hex();
};

// Split Complementary
const generateSecondarySplitComplement = (base: chroma.Color, side: 'left' | 'right' = 'left') => {
  const hue = base.get("hsl.h");
  const offset = side === 'left' ? 150 : 210;
  const newHue = (hue + offset) % 360;
  return base.set("hsl.h", newHue).hex();
};

export const getSecondaryColor = (base: chroma.Color, secondaryColorType: SecondaryColorType) => {
  switch(secondaryColorType) {
    case 'analogous':
      return generateSecondaryAnalogous(base);
    case 'complimentary':
      return generateSecondaryComplimentary(base);
    case 'split-compliment-left':
      return generateSecondarySplitComplement(base, 'left');
    case 'split-compliment-right':
      return generateSecondarySplitComplement(base, 'right');
    default:
      return generateSecondaryAnalogous(base);
  }
}

const generateCorePalette = (base: chroma.Color, secondaryColorType: SecondaryColorType, type: ThemeType) => {
  const hue = base.get("hsl.h");
  const z0Background = generateBackgrounds(base, type)["z0"];

  return {
    primary: base.hex(),
    secondary: getSecondaryColor(base, secondaryColorType),
    success: generateUtilityColor(120, z0Background, type, 0.6, 0.5), // green
    warn: generateUtilityColor(40, z0Background, type, 1, 0.6),       // yellow
    error: generateUtilityColor(0, z0Background, type, 0.8, 0.5),     // red
    info: generateUtilityColor(210, z0Background, type, 0.6, 0.55),   // blue
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
  const stops = Array.from({ length: 6 }, (_, i) => (6 - i) / 10);
  return stops.reduce((acc, stop, i) => {
    const color = type === "light"
      ? chroma.mix("#fff", base, stop)
      : chroma.mix("#000", base, stop);
    
    const label = `z${5 - i}`;
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

const darken = (hex: string, amount = 0.1) => chroma.mix(hex, "#000", amount).hex();

const lighten = (hex: string, amount = 0.1) => chroma.mix(hex, "#fff", amount).hex();