import { useContext } from 'react';
import Swatch from './Swatch';
import { ThemeContext } from './ThemeProvider';
import SectionHead from './SectionHead';

const BackgroundSwatches = () => {
  const { themes, theme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <SectionHead text="Background" />
      <div className="grid grid-cols-3 gap-2">
        {
          Object.entries(themes[theme].background).sort(
            ([a], [b]) => Number(a.slice(1)) - Number(b.slice(1)) // Sort z0 → z5
          ).map(([k, v]) => (
            <Swatch key={k} name={k} color={v} />
          ))
        }
      </div>
    </div>
  );
};

export default BackgroundSwatches;