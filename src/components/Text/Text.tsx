import React from "react";
import { Text as RNText, StyleSheet, TextProps } from "react-native";
import { useTheme } from "@/src/theme/themeContext";

type CustomTextProps = TextProps & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

const Header1 = ({
  children,
  style,
  variant = "primary",
  ...props
}: CustomTextProps) => {
  const { colors } = useTheme();
  const textColor =
    variant === "primary" ? colors.textPrimary : colors.textSecondary;

  return (
    <RNText style={[styles.header1, { color: textColor }, style]} {...props}>
      {children}
    </RNText>
  );
};

const Header2 = ({
  children,
  style,
  variant = "primary",
  ...props
}: CustomTextProps) => {
  const { colors } = useTheme();
  const textColor =
    variant === "primary" ? colors.textPrimary : colors.textSecondary;

  return (
    <RNText style={[styles.header2, { color: textColor }, style]} {...props}>
      {children}
    </RNText>
  );
};

const Body = ({
  children,
  style,
  variant = "primary",
  ...props
}: CustomTextProps) => {
  const { colors } = useTheme();
  const textColor =
    variant === "primary" ? colors.textPrimary : colors.textSecondary;

  return (
    <RNText style={[styles.body, { color: textColor }, style]} {...props}>
      {children}
    </RNText>
  );
};

const Subtitle = ({
  children,
  style,
  variant = "primary",
  ...props
}: CustomTextProps) => {
  const { colors } = useTheme();
  const textColor =
    variant === "primary" ? colors.textPrimary : colors.textSecondary;

  return (
    <RNText style={[styles.subtitle, { color: textColor }, style]} {...props}>
      {children}
    </RNText>
  );
};

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
