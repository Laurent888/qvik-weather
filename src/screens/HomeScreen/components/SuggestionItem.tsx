import { Box, Text } from "@/src/components";
import { useTheme } from "@/src/theme/themeContext";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  cityName: string;
  state?: string;
  country?: string;
};

const SuggestionItem = ({ cityName, state, country }: Props) => {
  const { colors } = useTheme();

  return (
    <Box
      hasPadding
      alignItems="center"
      justifyContent="center"
      gap={4}
      style={[styles.container, { backgroundColor: colors.surfaceColor }]}
    >
      <Text.Body>{cityName}</Text.Body>
      {state && <Text.Body variant="secondary">{state}</Text.Body>}
      {country && <Text.Body variant="secondary">{country}</Text.Body>}
    </Box>
  );
};

export default SuggestionItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderRadius: 8,
  },
});
