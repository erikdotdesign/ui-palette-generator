import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, themes, setTheme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <label 
        className="block mb-1 text-sm font-medium"
        style={{
          color: themes[theme].textStyles.base
        }}>
        Theme
      </label>
      {
        Object.keys(themes).map((k, i) => (
          <input 
            type="radio" 
            id={k} 
            name="theme" 
            value={k}
            checked={k === theme}
            onChange={e => setTheme(e.target.value as any)} />
        ))
      }
    </div>
  );
};

export default ThemeToggle;