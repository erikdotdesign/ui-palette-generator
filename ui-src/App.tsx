import { useState } from 'react';
import Swatch from './Swatch';
import TextOnSwatch from './TextOnSwatch';
import { generateThemes } from './theme-generator';
import "./App.css";

const App = () => {
  const [primary, setPrimary] = useState("#6200ee");
  const [themes, setThemes] = useState<any>(null);

  const handleGeneratePreview = () => {
    const generated = generateThemes({primary});
    console.log(generated);
    setThemes(generated);
  };

  const handleApplyToFigma = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "generate-theme",
          primary,
        },
      },
      "*"
    );
  };

  // useEffect(() => {
  //   window.onmessage = (event) => {
  //     const { type, themes } = event.data.pluginMessage;
  //     if (type === "theme-preview") {
  //       setThemes(themes);
  //     }
  //   };
  // }, []);

  return (
    <div className="p-4 text-sm font-sans">
      <div className="mb-4">
        <label className="block mb-1 font-medium">Primary Color:</label>
        <input
          type="color"
          value={primary}
          onChange={(e) => setPrimary(e.target.value)}
          className="w-24 h-10 p-0 border rounded" />
      </div>

      <div className="flex justify-between items-center gap-2 mb-6">
        <button
          onClick={handleGeneratePreview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Preview Theme
        </button>

        {themes && (
          <button
            onClick={handleApplyToFigma}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Generate in Figma
          </button>
        )}
      </div>

      {themes &&
        ["light", "dark"].map((mode) => {
          const theme = themes[mode];
          return (
            <div key={mode} className="mb-8">
              <h2 className="text-lg font-bold mb-2 capitalize">{mode} Theme</h2>

              <h3 className="font-semibold mt-2">Palette</h3>
              <div className="flex flex-wrap gap-2">
                {
                  Object.entries(theme.palette).map(([k, v]) => (
                    <Swatch key={k} name={k} color={v} />
                  ))
                }
              </div>

              <h3 className="font-semibold mt-4">Background Swatches (z0–z8)</h3>
              <div className="flex flex-wrap gap-2">
                {
                  Object.entries(theme.background).sort(
                    ([a], [b]) => Number(a.slice(1)) - Number(b.slice(1)) // Sort z0 → z8
                  ).map(([k, v]) => (
                    <Swatch key={k} name={k} color={v} />
                  ))
                }
              </div>

              <h3 className="font-semibold mt-4">Hover / Focus States</h3>
              <div className="flex flex-wrap gap-2">
                {
                  Object.entries(theme.hoverFocus).map(([k, v]) => (
                    <Swatch key={k} name={k} color={v} />
                  ))
                }
              </div>

              <h3 className="font-semibold mt-4">Text on Colors</h3>
              <div className="flex flex-wrap gap-2">
                {
                  Object.entries(theme.textOnPalette)
                    .filter(([k]) => k.startsWith("text-base-on-"))
                    .map(([k, text]) => {
                      const key = k.replace("text-base-on-", "");
                      const bg = theme.palette[key];
                      return <TextOnSwatch key={k} bg={bg} text={text} label={key} />;
                    })
                }
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default App;