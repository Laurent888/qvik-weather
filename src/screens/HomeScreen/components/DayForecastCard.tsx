import { Box, Text } from "@/src/components";
import Collapsible from "@/src/components/Collapsible";
import WeatherIcon from "@/src/components/icons/WeatherIcon";
import { useTheme } from "@/src/theme/themeContext";
import { DailyForecast } from "@/src/utils/fetchForecast";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

type DayForecastCardProps = {
  forecast: DailyForecast;
};

const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

const formatDay = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  }
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  }

  return dayjs.unix(timestamp).format("dddd");
};

const DayForecastCard = ({ forecast }: DayForecastCardProps) => {
  const { colors, theme } = useTheme();

  const [expanded, setExpanded] = useState(false);

  const dayName = formatDay(forecast.dt);
  const dayTemp = kelvinToCelsius(forecast.temp.day);
  const minTemp = kelvinToCelsius(forecast.temp.min);
  const maxTemp = kelvinToCelsius(forecast.temp.max);
  const rainChance = Math.round(forecast.pop * 100);
  const rainAmount = forecast.rain ? `${forecast.rain.toFixed(1)}mm` : null;

  const cardBackground =
    theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.03)";

  const accentColor = "#3B82F6";

  return (
    <Pressable onPress={() => setExpanded(!expanded)}>
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
        <Box direction="row" alignItems="center" justifyContent="space-between">
          {/* Day Label */}
          <Box style={styles.dayContainer}>
            <Text.Body style={[styles.dayLabel, { color: colors.textPrimary }]}>
              {dayName}
            </Text.Body>
            <Text.Subtitle style={{ color: colors.textSecondary }}>
              {dayjs.unix(forecast.dt).format("MMM D")}
            </Text.Subtitle>
          </Box>

          {/* Weather Icon and Temperature */}
          <Box
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={styles.iconContainer}
          >
            <WeatherIcon
              weather={forecast.weather[0]?.main ?? "Clear"}
              size={50}
              color={colors.iconColor}
            />

            <Text.Header2 style={[{ color: colors.textSecondary }]}>
              {dayTemp}°
            </Text.Header2>
          </Box>

          {/* Rain Info */}
          <Box alignItems="flex-start" style={styles.rainContainer}>
            <Box direction="row" alignItems="center" gap={4}>
              <Text.Body style={styles.rainIcon}>💧</Text.Body>
              <Text.Subtitle
                style={[styles.rainChance, { color: accentColor }]}
              >
                {rainChance}%
              </Text.Subtitle>
            </Box>
            {rainAmount && (
              <Text.Subtitle
                style={[styles.rainAmount, { color: colors.textSecondary }]}
              >
                {rainAmount}
              </Text.Subtitle>
            )}
          </Box>
        </Box>

        {/* Temperature min max */}
        <Collapsible expanded={expanded}>
          <Box
            direction="row"
            alignItems="baseline"
            gap={12}
            flex={1}
            style={{ paddingTop: 32 }}
          >
            <Box direction="row" alignItems="baseline" gap={2}>
              <Text.Header2 variant="secondary" style={[styles.maxTemp]}>
                Max: {maxTemp}°
              </Text.Header2>
            </Box>
            <Box direction="row" alignItems="baseline" gap={2}>
              <Text.Header2 variant="secondary" style={styles.maxTemp}>
                Min: {minTemp}°
              </Text.Header2>
            </Box>
          </Box>
        </Collapsible>
      </Box>
    </Pressable>
  );
};

export default DayForecastCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  dayContainer: {
    width: "28%",
  },
  dayLabel: {
    letterSpacing: 0.5,
    fontWeight: "600",
  },
  iconContainer: { gap: 12 },
  weatherIcon: {
    width: 65,
    height: 65,
  },
  tempLabel: {
    fontSize: 11,
    fontWeight: "500",
  },
  maxTemp: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  minTemp: {
    fontSize: 14,
    fontWeight: "500",
  },
  rainContainer: {
    minWidth: 50,
  },
  rainIcon: {
    fontSize: 12,
  },
  rainChance: {
    fontSize: 13,
    fontWeight: "600",
  },
  rainAmount: {
    fontSize: 11,
    marginTop: 2,
  },
});
