import React, { createContext, useContext, useEffect, useState } from 'react';
import { lightColors } from '../../constants/lightColors.constant';
import { darkColors } from '../../constants/darkColors.constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Theme {
  dark: boolean;
  colors: Record<string, string>;
  setScheme: (scheme: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<Theme>({
  dark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider: React.FC<{}> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);  

  useEffect(() => {
    AsyncStorage.getItem('theme').then(theme => {
      setIsDark(theme === 'dark');
    });
  }, []);

  const setScheme = async (scheme: 'light' | 'dark') => {
    setIsDark(scheme === 'dark');
    await AsyncStorage.setItem('theme', scheme);
  };

  const defaultTheme: Theme = {
    dark: isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme,
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useScheme = (): Theme => useContext(ThemeContext);
