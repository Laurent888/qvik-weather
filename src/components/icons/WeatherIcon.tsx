import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Box from "../Box";
import { ColdIcon } from "./ColdIcon";
import { RainIcon } from "./RainIcon";
import { SunIcon } from "./SunIcon";

type WeatherIconProps = {
  weather: string;
  size?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

const WeatherIcon = ({
  weather,
  size = 24,
  color = "white",
  containerStyle,
}: WeatherIconProps) => {
  let icon;

  switch (weather) {
    case "Clear":
      icon = <SunIcon color={color} size={size} />;
      break;
    case "Rain":
      icon = <RainIcon color={color} size={size} />;
      break;
    case "Snow":
      icon = <ColdIcon color={color} size={size} />;
      break;
    case "Clouds":
      icon = (
        <MaterialCommunityIcons
          name="cloud-outline"
          color={color}
          size={size * 0.9}
        />
      );
      break;
    default:
      icon = null;
  }
  return <Box style={containerStyle}>{icon}</Box>;
};

export default WeatherIcon;
