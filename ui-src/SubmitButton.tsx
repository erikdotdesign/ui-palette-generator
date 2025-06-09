import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const SubmitButton = () => {
  const { themes, theme } = useContext(ThemeContext);

  const handleGenerate = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "generate-theme",
          payload: {
            themes,
            theme
          }
        },
      },
      "*"
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full">
      <div 
        className="w-full relative p-4 text-center font-medium cursor-pointer"
        style={{
          background: themes[theme].palette.primary,
          color: themes[theme].textOnPalette.textBaseOnPrimary
        }}
        onClick={handleGenerate}>
        Add to document
        {/* <input
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
            color: themes[theme].text.base,
            background: themes[theme].background.z1,
          }}>
          { primaryColor }
        </label> */}
      </div>
    </div>
  );
};

export default SubmitButton;