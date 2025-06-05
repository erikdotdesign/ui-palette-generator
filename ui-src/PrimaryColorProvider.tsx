import React, { useState, createContext, ReactElement } from 'react';
import { DEFAULT_PRIMARY_COLOR } from './constants';

interface PrimaryColorProviderProps {
  children: React.ReactNode;
}

interface PrimaryColorContextProps {
  primaryColor: string;
  setPrimaryColor: (primaryColor: string) => void;
}

const PrimaryColorContext = createContext<PrimaryColorContextProps>({
  primaryColor: DEFAULT_PRIMARY_COLOR,
  setPrimaryColor: () => {}
});

const PrimaryColorProvider = (props: PrimaryColorProviderProps): ReactElement => {
  const { children } = props;
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  return (
    <PrimaryColorContext.Provider value={{primaryColor, setPrimaryColor}}>
      { children }
    </PrimaryColorContext.Provider>
  )
};

export default PrimaryColorProvider;

export { PrimaryColorContext };