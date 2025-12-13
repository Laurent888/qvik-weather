import { Box, Text } from "@/src/components";
import React from "react";

const EmptyResult = ({ text }: { text: string }) => {
  return (
    <Box style={{ flex: 1 }} justifyContent="center" alignItems="center">
      <Text.Header2>{text}</Text.Header2>
    </Box>
  );
};

export default EmptyResult;
