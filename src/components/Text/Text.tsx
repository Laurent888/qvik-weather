import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";

type CustomTextProps = TextProps & {
  children: React.ReactNode;
};

const Header1 = ({ children, style, ...props }: CustomTextProps) => (
  <RNText style={[styles.header1, style]} {...props}>
    {children}
  </RNText>
);

const Header2 = ({ children, style, ...props }: CustomTextProps) => (
  <RNText style={[styles.header2, style]} {...props}>
    {children}
  </RNText>
);

const Body = ({ children, style, ...props }: CustomTextProps) => (
  <RNText style={[styles.body, style]} {...props}>
    {children}
  </RNText>
);

const Subtitle = ({ children, style, ...props }: CustomTextProps) => (
  <RNText style={[styles.subtitle, style]} {...props}>
    {children}
  </RNText>
);

export const Text = {
  Header1,
  Header2,
  Body,
  Subtitle,
};

const styles = StyleSheet.create({
  header1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  header2: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
});
