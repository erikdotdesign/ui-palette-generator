import { useState, useContext, useEffect } from 'react';
import Swatch from './Swatch';
import TextOnSwatch from './TextOnSwatch';
import PrimaryColorPicker from './PrimaryColorPicker';
import { ThemeContext } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import SectionHead from './SectionHead';
import PaletteSwatches from './PaletteSwatches';
import BackgroundSwatches from './BackgroundSwatches';
import "./App.css";

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