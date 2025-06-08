import { useContext } from 'react';
import Swatch from './Swatch';
import { ThemeContext } from './ThemeProvider';
import SectionHead from './SectionHead';

const HoverSwatches = () => {
  const { themes, theme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <SectionHead text="Palette hover" />
      <div className="grid grid-cols-3 gap-2">
        {
          Object.entries(themes[theme].paletteHover).map(([k, v]) => (
            <Swatch key={k} name={k} color={v} />
          ))
        }
      </div>
    </div>
  );
};

export default HoverSwatches;