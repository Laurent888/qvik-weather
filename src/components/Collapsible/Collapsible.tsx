import React, { useEffect, useState } from "react";
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
  /** The content to show/hide when toggling */
  children: React.ReactNode;
  /** Controlled expanded state (makes component controlled when provided) */
  expanded?: boolean;
  /** Whether the collapsible starts expanded (used when uncontrolled) */
  initiallyExpanded?: boolean;
  /** Duration of the animation in milliseconds */
  duration?: number;
  /** Minimum height when collapsed (defaults to 0) */
  minHeight?: number;
  /** Custom style for the container */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the content wrapper */
  contentStyle?: StyleProp<ViewStyle>;
  /** Callback when the expanded state changes */
  onToggle?: (expanded: boolean) => void;
}

const Collapsible = ({
  children,
  expanded: controlledExpanded,
  initiallyExpanded = false,
  duration = 300,
  minHeight = 0,
  style,
  contentStyle,
  onToggle,
}: CollapsibleProps) => {
  const isControlled = controlledExpanded !== undefined;
  const [internalExpanded, setInternalExpanded] = useState(initiallyExpanded);
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(initiallyExpanded ? 1 : 0);

  // Sync animation when controlled expanded prop changes
  useEffect(() => {
    animatedHeight.value = withTiming(expanded ? 1 : 0, {
      duration,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [expanded, duration, animatedHeight]);

  const handlePress = () => {
    const newExpanded = !expanded;

    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }

    onToggle?.(newExpanded);
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
      [minHeight, contentHeight]
    );

    const opacity = interpolate(animatedHeight.value, [0, 0.5, 1], [0, 0, 1]);

    return {
      height: contentHeight === 0 ? undefined : height,
      opacity: minHeight > 0 ? 1 : opacity,
      overflow: "hidden" as const,
    };
  });

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.container, style]}>
        <Animated.View style={[animatedContentStyle, contentStyle]}>
          <Animated.View
            style={styles.contentInner}
            onLayout={handleContentLayout}
          >
            {children}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
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
