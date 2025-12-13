import { Text } from "@/src/components";
import { useTheme } from "@/src/theme/themeContext";
import { getWeatherIcon } from "@/src/utils/fetchForecast";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export type DailyForecast = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  visibility: number;
  pop: number;
  rain?: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

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

  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const DayForecastCard = ({ forecast }: DayForecastCardProps) => {
  const { colors, theme } = useTheme();

  const iconUrl = getWeatherIcon(forecast.weather[0]?.icon || "01d");
  const dayName = formatDay(forecast.dt);
  const minTemp = kelvinToCelsius(forecast.main.temp_min);
  const maxTemp = kelvinToCelsius(forecast.main.temp_max);
  const rainChance = Math.round(forecast.pop * 100);
  const rainAmount = forecast.rain ? `${forecast.rain.toFixed(1)}mm` : null;

  const cardBackground =
    theme === "dark" ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.03)";

  const accentColor = "#3B82F6";

  return (
    <View
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
      {/* Day Label */}
      <Text.Subtitle style={[styles.dayLabel, { color: colors.textSecondary }]}>
        {dayName}
      </Text.Subtitle>

      {/* Weather Icon */}
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: iconUrl }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
      </View>

      {/* Temperature */}
      <View style={styles.tempContainer}>
        <Text.Header2 style={[styles.maxTemp, { color: colors.textPrimary }]}>
          {maxTemp}°
        </Text.Header2>
        <Text.Body style={[styles.minTemp, { color: colors.textSecondary }]}>
          {minTemp}°
        </Text.Body>
      </View>

      {/* Rain Info */}
      <View style={styles.rainContainer}>
        <View style={styles.rainRow}>
          <Text.Body style={[styles.rainIcon]}>💧</Text.Body>
          <Text.Subtitle style={[styles.rainChance, { color: accentColor }]}>
            {rainChance}%
          </Text.Subtitle>
        </View>
        {rainAmount && (
          <Text.Subtitle
            style={[styles.rainAmount, { color: colors.textSecondary }]}
          >
            {rainAmount}
          </Text.Subtitle>
        )}
      </View>
    </View>
  );
};

export default DayForecastCard;

const styles = StyleSheet.create({
  card: {
    width: 90,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  dayLabel: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherIcon: {
    width: 52,
    height: 52,
  },
  tempContainer: {
    alignItems: "center",
    gap: 2,
  },
  maxTemp: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 26,
  },
  minTemp: {
    fontSize: 14,
    fontWeight: "500",
  },
  rainContainer: {
    alignItems: "center",
    marginTop: 4,
  },
  rainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
