import React, { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { generateThemes, ThemeOptions, ThemeType } from './themeGenerator';
import { DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR_TYPE, DEFAULT_THEME, STORAGE_KEY_DEFAULT_THEME } from './constants';
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
  themes: generateThemes({
    primary: DEFAULT_PRIMARY_COLOR,
    secondaryColorType: DEFAULT_SECONDARY_COLOR_TYPE
  }),
  theme: DEFAULT_THEME,
  setThemes: () => {},
  setTheme: () => {}
});

const ThemeProvider = (props: ThemeProviderProps): ReactElement => {
  const { children } = props;
  const { primaryColor, secondaryColorType } = useContext(ThemeConfigContext);
  const [theme, setTheme] = useState<ThemeType>(DEFAULT_THEME);
  const [themes, setThemes] = useState<any>(generateThemes({
    primary: DEFAULT_PRIMARY_COLOR,
    secondaryColorType: DEFAULT_SECONDARY_COLOR_TYPE
  }));

  useEffect(() => {
    setThemes(generateThemes({
      primary: primaryColor,
      secondaryColorType: secondaryColorType
    }));
  }, [primaryColor, secondaryColorType]);

  useEffect(() => {
    parent.postMessage({
      pluginMessage: { type: "save-storage", key: STORAGE_KEY_DEFAULT_THEME, value: theme },
    }, "*");
  }, [theme]);

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