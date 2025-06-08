import { useContext } from 'react';
import TextOnSwatch from './TextOnSwatch';
import { ThemeContext } from './ThemeProvider';
import SectionHead from './SectionHead';

const TextSwatches = () => {
  const { themes, theme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <SectionHead text="Text" />
      <div className="grid grid-cols-3 gap-2">
        {
          Object.entries(themes[theme].text)
            .map(([k, text]) => {
              return <TextOnSwatch showContrast={false} key={k} bg={themes[theme].background.z0} text={text} label={k} />;
            })
        }
      </div>
    </div>
  );
};

export default TextSwatches;