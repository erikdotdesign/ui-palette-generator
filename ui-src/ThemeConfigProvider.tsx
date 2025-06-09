import React, { useState, createContext, ReactElement, useEffect } from 'react';
import { SecondaryColorType } from './themeGenerator';
import { DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR_TYPE, STORAGE_KEY_PRIMARY_COLOR, STORAGE_KEY_SECONDARY_COLOR_TYPE } from './constants';

interface ThemeConfigProviderProps {
  children: React.ReactNode;
}

interface ThemeConfigContextProps {
  primaryColor: string;
  setPrimaryColor: (primaryColor: string) => void;
  secondaryColorType: SecondaryColorType;
  setSecondaryColorType: (secondaryColorType: SecondaryColorType) => void;
}

const ThemeConfigContext = createContext<ThemeConfigContextProps>({
  primaryColor: DEFAULT_PRIMARY_COLOR,
  setPrimaryColor: () => {},
  secondaryColorType: DEFAULT_SECONDARY_COLOR_TYPE,
  setSecondaryColorType: () => {}
});

const ThemeConfigProvider = (props: ThemeConfigProviderProps): ReactElement => {
  const { children } = props;
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [secondaryColorType, setSecondaryColorType] = useState<SecondaryColorType>(DEFAULT_SECONDARY_COLOR_TYPE);

  useEffect(() => {
    parent.postMessage({
      pluginMessage: { type: "save-storage", key: STORAGE_KEY_PRIMARY_COLOR, value: primaryColor },
    }, "*");
  }, [primaryColor]);

  useEffect(() => {
    parent.postMessage({
      pluginMessage: { type: "save-storage", key: STORAGE_KEY_SECONDARY_COLOR_TYPE, value: secondaryColorType },
    }, "*");
  }, [secondaryColorType]);

  return (
    <ThemeConfigContext.Provider value={{
      primaryColor, 
      setPrimaryColor,
      secondaryColorType,
      setSecondaryColorType
    }}>
      { children }
    </ThemeConfigContext.Provider>
  )
};

export default ThemeConfigProvider;

export { ThemeConfigContext };