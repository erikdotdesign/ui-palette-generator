import { useContext } from 'react';
import { ThemeConfigContext } from './ThemeConfigProvider';
import { ThemeContext } from './ThemeProvider';
import SectionHead from './SectionHead';

const PrimaryColorPicker = () => {
  const { primaryColor, setPrimaryColor } = useContext(ThemeConfigContext);
  const { themes, theme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <SectionHead text="Primary Color" />
      <div className="flex relative">
        <input
          id="primaryColor"
          type="color"
          value={primaryColor}
          onChange={e => setPrimaryColor(e.target.value)}
          className="invisible absolute left-2 top-2 w-16 h-8 border-none p-0 bg-transparent rounded-lg" />
        <div
          className="absolute left-2 top-2 w-9 h-9 rounded pointer-events-none"
          style={{
            background: themes[theme].palette.primary,
          }} />
        <label 
          htmlFor="primaryColor"
          className="text-sm w-full h-full pl-14 p-4 rounded-lg cursor-pointer"
          style={{
            color: themes[theme].textStyles.base,
            background: themes[theme].background.z1,
          }}>
          { primaryColor }
        </label>
      </div>
    </div>
  );
};

export default PrimaryColorPicker;