import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const Swatch = ({ name, color, label }: { name: string; color: any; label?: string }) => {
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
        style={{ backgroundColor: color }} />
      <div 
        className="mt-1"
        style={{
          color: themes[theme].textStyles.base,
        }}>
        {label || name}
      </div>
    </div>
  );
};

export default Swatch;