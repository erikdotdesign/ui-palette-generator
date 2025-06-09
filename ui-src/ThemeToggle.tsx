import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import SectionHead from './SectionHead';

const ThemeToggle = () => {
  const { theme, themes, setTheme } = useContext(ThemeContext);

  return (
    <div className="mb-4">
      <SectionHead text="Theme" />
      <div className="grid grid-cols-2 gap-2">
        {
          Object.keys(themes).map((k) => (
            <>
              <input 
                className="mr-2 hidden"
                type="radio" 
                key={k}
                id={k} 
                name="theme" 
                value={k}
                checked={k === theme}
                onChange={e => setTheme(e.target.value as any)} />
              <label 
                className="w-full text-center p-3 rounded-lg cursor-pointer"
                htmlFor={k}
                style={{
                  color: k === theme ? themes[theme].textOnPalette.textBaseOnPrimary : themes[theme].text.base,
                  background: k === theme ? themes[theme].palette.primary : themes[theme].background.z1,
                  // boxShadow: `0 0 0 1px ${k === theme ? themes[theme].palette.primary : themes[theme].background.z3}`
                }}>
                {k}
              </label>
            </>
          ))
        }
      </div>
    </div>
  );
};

export default ThemeToggle;