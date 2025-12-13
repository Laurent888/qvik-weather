import React, { useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CollapsibleProps {
  /** The header component that will be shown and act as the toggle trigger */
  header: React.ReactNode;
  /** The content to show/hide when toggling */
  children: React.ReactNode;
  /** Whether the collapsible starts expanded */
  initiallyExpanded?: boolean;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Custom style for the container */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the content wrapper */
  contentStyle?: StyleProp<ViewStyle>;
  /** Callback when the expanded state changes */
  onToggle?: (expanded: boolean) => void;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  header,
  children,
  initiallyExpanded = false,
  duration = 300,
  style,
  contentStyle,
  onToggle,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(initiallyExpanded ? 1 : 0);

  const handlePress = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);

    animatedHeight.value = withTiming(newExpanded ? 1 : 0, {
      duration,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  };

  const handleContentLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height > 0 && height !== contentHeight) {
      setContentHeight(height);
    }
  };

  const animatedContentStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animatedHeight.value,
      [0, 1],
      [0, contentHeight]
    );

    const opacity = interpolate(animatedHeight.value, [0, 0.5, 1], [0, 0, 1]);

    return {
      height: contentHeight === 0 ? undefined : height,
      opacity,
      overflow: "hidden" as const,
    };
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <Pressable onPress={handlePress}>{header}</Pressable>

      <Animated.View style={[animatedContentStyle, contentStyle]}>
        <Animated.View
          style={styles.contentInner}
          onLayout={handleContentLayout}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default Collapsible;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  contentInner: {
    position: "absolute",
    width: "100%",
  },
});
