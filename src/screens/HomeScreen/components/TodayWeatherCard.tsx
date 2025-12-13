import { Box, Text } from "@/src/components";
import WeatherIcon from "@/src/components/icons/WeatherIcon";
import { useTheme } from "@/src/theme/themeContext";
import { DailyForecast } from "@/src/utils/fetchForecast";
import React from "react";
import { StyleSheet } from "react-native";

type CurrentWeather = {
  temp: number;
  weather: {
    main: string;
    description: string;
  }[];
};

type TodayWeatherCardProps = {
  cityName: string;
  current: CurrentWeather;
  todayForecast: DailyForecast;
};

const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

const TodayWeatherCard = ({
  cityName,
  current,
  todayForecast,
}: TodayWeatherCardProps) => {
  const { colors, theme } = useTheme();

  const weatherDescription = current.weather[0]?.description ?? "";
  const currentTemp = kelvinToCelsius(current.temp);
  const minTemp = kelvinToCelsius(todayForecast.temp.min);
  const maxTemp = kelvinToCelsius(todayForecast.temp.max);

  const cardBackground =
    theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.03)";

  const accentColor = "#3B82F6";

  return (
    <Box
      style={[
        styles.card,
        {
          backgroundColor: cardBackground,
          borderColor:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(0, 0, 0, 0.06)",
        },
      ]}
    >
      {/* City Name */}
      <Text.Header2 style={[styles.cityName, { color: colors.textPrimary }]}>
        {cityName}
      </Text.Header2>

      {/* Main Content Row */}
      <Box direction="row" alignItems="center" justifyContent="space-between">
        {/* Temperature Section */}
        <Box alignItems="flex-start">
          <Text.Header1
            style={[styles.temperature, { color: colors.textPrimary }]}
          >
            {currentTemp}°
          </Text.Header1>
          <Text.Body
            style={[styles.description, { color: colors.textSecondary }]}
          >
            {weatherDescription.charAt(0).toUpperCase() +
              weatherDescription.slice(1)}
          </Text.Body>
        </Box>

        {/* Weather Icon */}
        <Box style={styles.iconContainer}>
          <WeatherIcon
            weather={current.weather[0]?.main ?? "Clear"}
            size={80}
            color={colors.iconColor}
          />
        </Box>
      </Box>

      {/* Min/Max Temperature */}
      <Box direction="row" gap={16} style={styles.minMaxContainer}>
        <Box direction="row" alignItems="center" gap={6}>
          <Text.Subtitle style={[styles.tempLabel, { color: accentColor }]}>
            H
          </Text.Subtitle>
          <Text.Body style={[styles.tempValue, { color: colors.textPrimary }]}>
            {maxTemp}°
          </Text.Body>
        </Box>
        <Box direction="row" alignItems="center" gap={6}>
          <Text.Subtitle
            style={[styles.tempLabel, { color: colors.textSecondary }]}
          >
            L
          </Text.Subtitle>
          <Text.Body
            style={[styles.tempValue, { color: colors.textSecondary }]}
          >
            {minTemp}°
          </Text.Body>
        </Box>
      </Box>
    </Box>
  );
};

export default TodayWeatherCard;

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
  },
  cityName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  temperature: {
    fontSize: 72,
    fontWeight: "200",
    lineHeight: 80,
    letterSpacing: -2,
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  minMaxContainer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  tempLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  tempValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});
