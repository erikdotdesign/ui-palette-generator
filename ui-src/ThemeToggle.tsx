import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, themes, setTheme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <label 
        className="block text-sm font-semibold mb-4"
        style={{
          color: themes[theme].textStyles.base
        }}>
        Theme
      </label>
      {
        Object.keys(themes).map((k) => (
          <div className="text-xs mb-2">
            <input 
              className="mr-2"
              type="radio" 
              key={k}
              id={k} 
              name="theme" 
              value={k}
              checked={k === theme}
              onChange={e => setTheme(e.target.value as any)} />
            <label 
              for={k}
              style={{
                color: themes[theme].textStyles.base,
              }}>
              {k}
            </label>
          </div>
        ))
      }
    </div>
  );
};

export default ThemeToggle;