import React from "react";
import { AccessibilityRole, StyleProp, View, ViewStyle } from "react-native";

type FlexAlign = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type FlexJustify =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

interface BoxProps {
  children?: React.ReactNode;
  /** Adds default padding (16px) */
  hasPadding?: boolean;
  /** Align items along the cross axis */
  alignItems?: FlexAlign;
  /** Justify content along the main axis */
  justifyContent?: FlexJustify;
  /** Flex direction */
  direction?: FlexDirection;
  /** Flex grow/shrink value */
  flex?: number;
  /** Gap between children */
  gap?: number;
  /** Wrap flex items */
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  /** Background color */
  backgroundColor?: string;
  /** Border radius */
  borderRadius?: number;
  /** Custom style override */
  style?: StyleProp<ViewStyle>;
  /** Accessibility props */
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
}

const Box = ({
  children,
  hasPadding = false,
  alignItems,
  justifyContent,
  direction = "column",
  flex,
  gap,
  wrap,
  backgroundColor,
  borderRadius,
  style,
  accessible,
  accessibilityLabel,
  accessibilityRole,
}: BoxProps) => {
  const boxStyle: ViewStyle = {
    flexDirection: direction,
    ...(hasPadding && { padding: 16 }),
    ...(alignItems && { alignItems }),
    ...(justifyContent && { justifyContent }),
    ...(flex !== undefined && { flex }),
    ...(gap !== undefined && { gap }),
    ...(wrap && { flexWrap: wrap }),
    ...(backgroundColor && { backgroundColor }),
    ...(borderRadius !== undefined && { borderRadius }),
  };

  return (
    <View
      style={[boxStyle, style]}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
    >
      {children}
    </View>
  );
};

export default Box;
