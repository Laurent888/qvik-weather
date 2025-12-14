import { Box, Toggle } from "@/src/components";
import { useTheme } from "@/src/theme/themeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const ThemeToggle = () => {
  const { colors, theme, setTheme } = useTheme();

  return (
    <Box
      direction="row"
      alignItems="center"
      gap={8}
      style={{ marginLeft: "auto" }}
    >
      <MaterialCommunityIcons
        name={theme === "dark" ? "weather-night" : "weather-sunny"}
        size={24}
        color={colors.iconColor}
      />
      <Toggle
        value={theme === "dark"}
        onValueChange={(isDark) => setTheme(isDark ? "dark" : "light")}
        accessibilityLabel={`Dark mode ${theme === "dark" ? "on" : "off"}`}
      />
    </Box>
  );
};

export default ThemeToggle;
