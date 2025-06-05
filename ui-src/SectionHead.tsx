import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const SectionHead = ({ text }: { text: string }) => {
  const { themes, theme } = useContext(ThemeContext);

  return (
    <h3 
      className="font-semibold mb-4"
      style={{
        color: themes[theme].textStyles.base
      }}>
      { text }
    </h3>
  );
};

export default SectionHead;