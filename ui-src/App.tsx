import { useContext } from 'react';
import PrimaryColorPicker from './PrimaryColorPicker';
import SecondaryColorTypeSelector from './SecondaryColorTypeSelector';
import { ThemeContext } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import PaletteSwatches from './PaletteSwatches';
import BackgroundSwatches from './BackgroundSwatches';
import HoverSwatches from './HoverSwatches';
import TextOnPaletteSwatches from './TextOnPaletteSwatches';
import TextSwatches from './TextSwatches';
import SubmitButton from './SubmitButton';
import "./App.css";

const App = () => {
  const { themes, theme } = useContext(ThemeContext);

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