import React, {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme, Platform, StatusBar} from 'react-native';
import Color from './Color';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  const theme = {
    ...(isDark ? Color.dark : Color.light),
    isDark,
    statusBarStyle: isDark ? 'light-content' : 'dark-content',
    statusBarBackground: isDark ? Color.dark.primary : Color.light.white,
    toggleTheme: () => setIsDark(!isDark),
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(theme.statusBarBackground);
      StatusBar.setBarStyle(theme.statusBarStyle);
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);