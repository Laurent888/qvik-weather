import { Box, Text } from "@/src/components";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
  cityName: string;
  state?: string;
  country?: string;
};

const SuggestionItem = ({ cityName, state, country }: Props) => {
  return (
    <Box
      hasPadding
      alignItems="center"
      justifyContent="center"
      gap={4}
      style={styles.container}
    >
      <Text.Body>{cityName}</Text.Body>
      {state && <Text.Body>{state}</Text.Body>}
      {country && <Text.Body>{country}</Text.Body>}
    </Box>
  );
};

export default SuggestionItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
});
