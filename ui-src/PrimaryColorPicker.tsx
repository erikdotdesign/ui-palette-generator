import { useContext } from 'react';
import { PrimaryColorContext } from './PrimaryColorProvider';
import { ThemeContext } from './ThemeProvider';

const PrimaryColorPicker = () => {
  const { primaryColor, setPrimaryColor } = useContext(PrimaryColorContext);
  const { themes, theme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <label 
        className="block mb-1 text-sm font-medium"
        style={{
          color: themes[theme].textStyles.base
        }}>
        Primary Color
      </label>
      <input
        type="color"
        value={primaryColor}
        onChange={e => setPrimaryColor(e.target.value)}
        className="w-16 h-8 border-none p-0 bg-transparent cursor-pointer" />
    </div>
  );
};

export default PrimaryColorPicker;