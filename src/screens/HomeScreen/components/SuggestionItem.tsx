import { Box, Text } from "@/src/components";
import { useTheme } from "@/src/theme/themeContext";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  cityName: string;
  state?: string;
  country?: string;
  onPress: () => void;
};

const SuggestionItem = ({ cityName, state, country, onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
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
    </Pressable>
  );
};

export default SuggestionItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderRadius: 8,
  },
});
