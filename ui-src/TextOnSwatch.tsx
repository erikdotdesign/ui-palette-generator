import { useContext } from 'react';
import chroma from "chroma-js";
import { ThemeContext } from './ThemeProvider';

const TextOnSwatch = ({
  bg,
  text,
  label,
}: {
  bg: string;
  text: any;
  label: string;
}) => {
  const contrast = chroma.contrast(bg, text).toFixed(2);
  const isPass = parseFloat(contrast) >= 3.1;
  const { themes, theme } = useContext(ThemeContext);

  return (
    <div 
      className="relative text-center text-xs p-2 rounded-lg"
      style={{
        background: themes[theme].background.z1,
        // boxShadow: `0 0 0 1px ${themes[theme].background.z2}`
      }}>
      <div
        className="w-full h-16 rounded flex items-center justify-center text-sm"
        style={{ backgroundColor: bg, color: text }}
        title={`Contrast: ${contrast}`}>
        Aa
      </div>
      <div 
        className="mt-1"
        style={{
          color: themes[theme].textStyles.base
        }}>
        {label}
      </div>
      <div
        className="absolute top-2 right-2 px-1 text-[10px] rounded-bl"
        style={{
          background: isPass ? themes[theme].palette.success : themes[theme].palette.error,
          color: isPass ? themes[theme].textOnPalette[`text-base-on-success`] : themes[theme].textOnPalette[`text-base-on-error`]
        }}>
        {contrast}
      </div>
    </div>
  );
};

export default TextOnSwatch;