import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "@/src/theme/themeContext";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
}

const TextInput = ({
  label,
  error,
  style,
  onFocus,
  onBlur,
  ...props
}: TextInputProps) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const themedStyles = {
    label: {
      color: colors.textSecondary,
    },
    input: {
      backgroundColor: colors.backgroundColor,
      color: colors.textPrimary,
    },
    inputFocused: {
      backgroundColor: colors.surfaceColor,
    },
  };

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, themedStyles.label]}>{label}</Text>}
      <RNTextInput
        style={[
          styles.input,
          themedStyles.input,
          isFocused && [styles.inputFocused, themedStyles.inputFocused],
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.textSecondary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#6366F1",
  },
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 4,
  },
});
