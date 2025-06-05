import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { generateThemes, ThemeOptions, ThemeType } from './theme-generator';
import { DEFAULT_PRIMARY_COLOR, DEFAULT_THEME } from './constants';
import { ThemeConfigContext } from './ThemeConfigProvider';

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextProps {
  themes: any;
  theme: ThemeType;
  setThemes: (themes: ThemeOptions) => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  themes: generateThemes({primary: DEFAULT_PRIMARY_COLOR}),
  theme: DEFAULT_THEME,
  setThemes: () => {},
  setTheme: () => {}
});

const ThemeProvider = (props: ThemeProviderProps): ReactElement => {
  const { children } = props;
  const { primaryColor } = useContext(ThemeConfigContext);
  const [theme, setTheme] = useState<ThemeType>(DEFAULT_THEME);
  const [themes, setThemes] = useState<any>(generateThemes({primary: DEFAULT_PRIMARY_COLOR}));

  useEffect(() => {
    setThemes(generateThemes({primary: primaryColor}));
  }, [primaryColor]);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      themes,
      setThemes
    }}>
      { children }
    </ThemeContext.Provider>
  )
};

export default ThemeProvider;

export { ThemeContext };