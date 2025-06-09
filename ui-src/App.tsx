import { useContext, useEffect } from 'react';
import PrimaryColorPicker from './PrimaryColorPicker';
import SecondaryColorTypeSelector from './SecondaryColorTypeSelector';
import { ThemeContext } from './ThemeProvider';
import { ThemeConfigContext } from './ThemeConfigProvider';
import ThemeToggle from './ThemeToggle';
import PaletteSwatches from './PaletteSwatches';
import BackgroundSwatches from './BackgroundSwatches';
import HoverSwatches from './HoverSwatches';
import TextOnPaletteSwatches from './TextOnPaletteSwatches';
import TextSwatches from './TextSwatches';
import SubmitButton from './SubmitButton';
import { STORAGE_KEY_PRIMARY_COLOR, STORAGE_KEY_SECONDARY_COLOR_TYPE, STORAGE_KEY_DEFAULT_THEME } from './constants';
import "./App.css";

const App = () => {
  const { themes, theme, setTheme } = useContext(ThemeContext);
  const { setPrimaryColor, setSecondaryColorType } = useContext(ThemeConfigContext);

  // load cached values
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "load-storage", key: STORAGE_KEY_PRIMARY_COLOR } }, "*");
    parent.postMessage({ pluginMessage: { type: "load-storage", key: STORAGE_KEY_SECONDARY_COLOR_TYPE } }, "*");
    parent.postMessage({ pluginMessage: { type: "load-storage", key: STORAGE_KEY_DEFAULT_THEME } }, "*");

    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (msg.type === "storage-loaded") {
        if (msg.key === STORAGE_KEY_PRIMARY_COLOR && msg.value) setPrimaryColor(msg.value);
        if (msg.key === STORAGE_KEY_SECONDARY_COLOR_TYPE && msg.value) setSecondaryColorType(msg.value);
        if (msg.key === STORAGE_KEY_DEFAULT_THEME && msg.value) setTheme(msg.value);
      }
    };
  }, []);

  return (
    <div 
      className="p-4 text-sm font-sans relative mb-10"
      style={{
        background: themes[theme].background.z0
      }}>
      <PrimaryColorPicker />
      <SecondaryColorTypeSelector />
      <ThemeToggle />
      <PaletteSwatches />
      <HoverSwatches />
      <BackgroundSwatches />
      <TextSwatches />
      <TextOnPaletteSwatches />
      <SubmitButton />
    </div>
  );
};

export default App;