import React, { useState, createContext, ReactElement } from 'react';
import { DEFAULT_PRIMARY_COLOR } from './constants';

interface ThemeConfigProviderProps {
  children: React.ReactNode;
}

interface ThemeConfigContextProps {
  primaryColor: string;
  setPrimaryColor: (primaryColor: string) => void;
}

const ThemeConfigContext = createContext<ThemeConfigContextProps>({
  primaryColor: DEFAULT_PRIMARY_COLOR,
  setPrimaryColor: () => {}
});

const ThemeConfigProvider = (props: ThemeConfigProviderProps): ReactElement => {
  const { children } = props;
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  return (
    <ThemeConfigContext.Provider value={{primaryColor, setPrimaryColor}}>
      { children }
    </ThemeConfigContext.Provider>
  )
};

export default ThemeConfigProvider;

export { ThemeConfigContext };