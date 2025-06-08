import { useState, useContext, useEffect } from 'react';
import Swatch from './Swatch';
import TextOnSwatch from './TextOnSwatch';
import PrimaryColorPicker from './PrimaryColorPicker';
import SecondaryColorTypeSelector from './SecondaryColorTypeSelector';
import { ThemeContext } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import SectionHead from './SectionHead';
import PaletteSwatches from './PaletteSwatches';
import BackgroundSwatches from './BackgroundSwatches';
import HoverSwatches from './HoverSwatches';
import TextOnPaletteSwatches from './TextOnPaletteSwatches';
import TextSwatches from './TextSwatches';
import "./App.css";

const App = () => {
  const { themes, theme } = useContext(ThemeContext);

  // const handleApplyToFigma = () => {
  //   parent.postMessage(
  //     {
  //       pluginMessage: {
  //         type: "generate-theme",
  //         primary,
  //       },
  //     },
  //     "*"
  //   );
  // };

  // useEffect(() => {
  //   window.onmessage = (event) => {
  //     const { type, themes } = event.data.pluginMessage;
  //     if (type === "theme-preview") {
  //       setThemes(themes);
  //     }
  //   };
  // }, []);

  return (
    <div 
      className="p-4 text-sm font-sans"
      style={{
        background: themes[theme].background.z0
      }}>
      <PrimaryColorPicker />
      <SecondaryColorTypeSelector />
      <ThemeToggle />
      <PaletteSwatches />
      <BackgroundSwatches />
      <TextSwatches />
      <HoverSwatches />
      <TextOnPaletteSwatches />
    </div>
  );
};

export default App;