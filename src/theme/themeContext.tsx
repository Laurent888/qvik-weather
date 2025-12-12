import { createContext, useContext, useState } from "react";
import { colors } from "./colors";

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: Theme;
  colors: (typeof colors)[Theme];
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: colors.light,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

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
