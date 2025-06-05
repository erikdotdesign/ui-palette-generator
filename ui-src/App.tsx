import { useState, useContext, useEffect } from 'react';
import Swatch from './Swatch';
import TextOnSwatch from './TextOnSwatch';
import PrimaryColorPicker from './PrimaryColorPicker';
import { ThemeContext } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import "./App.css";

const App = () => {
  const { themes, theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(themes);
  }, [themes]);

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
      <ThemeToggle />

      {/* <div className="flex justify-between items-center gap-2 mb-6">
        {themes && (
          <button
            onClick={handleApplyToFigma}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Generate in Figma
          </button>
        )}
      </div> */}

      <div className="mb-8">
        <h3 
          className="font-semibold mt-2"
          style={{
            color: themes[theme].textStyles.base
          }}>
          Palette
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {
            Object.entries(themes[theme].palette).map(([k, v]) => (
              <Swatch key={k} name={k} color={v} />
            ))
          }
        </div>

        <h3 
          className="font-semibold mt-4"
          style={{
            color: themes[theme].textStyles.base
          }}>
          Background Swatches (z0–z5)
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {
            Object.entries(themes[theme].background).sort(
              ([a], [b]) => Number(a.slice(1)) - Number(b.slice(1)) // Sort z0 → z8
            ).map(([k, v]) => (
              <Swatch key={k} name={k} color={v} />
            ))
          }
        </div>

        <h3 
          className="font-semibold mt-4"
          style={{
            color: themes[theme].textStyles.base
          }}>
          Hover States
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {
            Object.entries(themes[theme].paletteHover).map(([k, v]) => (
              <Swatch key={k} name={k} color={v} />
            ))
          }
        </div>

        <h3 
          className="font-semibold mt-4"
          style={{
            color: themes[theme].textStyles.base
          }}>
          Text on Colors
        </h3>
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
    </div>
  );
};

export default App;