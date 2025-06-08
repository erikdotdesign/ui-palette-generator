import { useContext } from 'react';
import chroma from "chroma-js";
import { ThemeContext } from './ThemeProvider';

const TextOnSwatch = ({
  bg,
  text,
  label,
  showContrast = true
}: {
  bg: string;
  text: any;
  label: string;
  showContrast?: boolean;
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
        className="w-full h-16 rounded flex items-center justify-center text-sm font-medium"
        style={{ backgroundColor: bg, color: text }}>
        Aa
      </div>
      <div 
        className="mt-1 font-medium"
        style={{
          color: themes[theme].text.base
        }}>
        {label}
      </div>
      <div 
        className="mt-1 font-mono"
        style={{
          color: themes[theme].text.lighter,
        }}>
        {text}
      </div>
      {
        showContrast
        ? <div
            className="absolute top-2 right-2 px-1 text-[10px] rounded-bl"
            style={{
              background: isPass ? themes[theme].palette.success : themes[theme].palette.error,
              color: isPass ? themes[theme].textOnPalette[`text-base-on-success`] : themes[theme].textOnPalette[`text-base-on-error`]
            }}>
            {contrast}
          </div>
        : null
      }
    </div>
  );
};

export default TextOnSwatch;