import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { colors } from "./colors";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  colors: (typeof colors)[Theme];
  setTheme: (theme: Theme) => void;
};

const THEME_STORAGE_KEY = "@qvik-weather/theme";

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: colors.light,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  const colorScheme = useColorScheme();

  // Load saved theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setThemeState(savedTheme);
      } else {
        // Fall back to system color scheme if no saved theme
        setThemeState(colorScheme === "dark" ? "dark" : "light");
      }
      setIsLoaded(true);
    };
    loadTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme if system preference changes and no saved theme exists
  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const checkAndUpdateTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme == null) {
        setThemeState(colorScheme === "dark" ? "dark" : "light");
      }
    };
    checkAndUpdateTheme();
  }, [colorScheme, isLoaded]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const value: ThemeContextType = {
    theme,
    colors: colors[theme],
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
