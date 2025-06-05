import { useContext } from 'react';
import TextOnSwatch from './TextOnSwatch';
import { ThemeContext } from './ThemeProvider';
import SectionHead from './SectionHead';
import "./App.css";

const TextOnPaletteSwatches = () => {
  const { themes, theme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <SectionHead text="Text on palette" />
      <div className="grid grid-cols-3 gap-2">
        {
          Object.entries(themes[theme].textOnPalette)
            .filter(([k]) => k.startsWith("text-base-on-"))
            .map(([k, text]) => {
              const key = k.replace("text-base-on-", "");
              const bg = themes[theme].palette[key];
              return <TextOnSwatch key={k} bg={bg} text={text} label={key} />;
            })
        }
      </div>
    </div>
  );
};

export default TextOnPaletteSwatches;