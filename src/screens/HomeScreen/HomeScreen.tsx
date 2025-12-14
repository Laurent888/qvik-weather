import { Box, Text, TextInput } from "@/src/components";
import { useTheme } from "@/src/theme/themeContext";
import { DailyForecast } from "@/src/utils/fetchForecast";
import {
  filterOutDuplicatesByCountryCode,
  GeocodingResponse,
  getGeocodingByCity,
} from "@/src/utils/geocoding";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DayForecastCard from "./components/DayForecastCard";
import SuggestionItem from "./components/SuggestionItem";
import ThemeToggle from "./components/ThemeToggle";
import TodayWeatherCard from "./components/TodayWeatherCard";
import useFetchWeather from "./hooks/useFetchWeather";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { colors, theme } = useTheme();

  const [city, setCity] = useState<string>("");
  const [suggestions, setSuggestions] = useState<GeocodingResponse>([]);

  const { fetchWeatherData, data, error, selectedCity, isFetching } =
    useFetchWeather();

  const handleChangeCity = (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
    }

    setCity(text);
  };

  const handleSubmit = async () => {
    const trimmedText = city.trim();
    if (trimmedText === "") {
      return;
    }
    const geocoding = await getGeocodingByCity({ city: trimmedText });
    if (geocoding) {
      const filteredGeocoding = filterOutDuplicatesByCountryCode(geocoding);
      setSuggestions(filteredGeocoding);
    }
  };

  const handleSelectSuggestion = (suggestion: GeocodingResponse[0]) => {
    if (suggestion == null) {
      return;
    }

    fetchWeatherData({
      city: suggestion.name,
      lat: suggestion.lat,
      lon: suggestion.lon,
    });
    setSuggestions([]);
  };

  const renderContent = () => {
    if (suggestions.length > 0) {
      return (
        <Box style={styles.suggestionsContainer}>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={`${suggestion.name}-${suggestion.country}`}
              cityName={suggestion.name}
              state={suggestion.state}
              country={suggestion.country}
              onPress={() => handleSelectSuggestion(suggestion)}
            />
          ))}
        </Box>
      );
    }

    if (isFetching) {
      return (
        <Box
          justifyContent="center"
          alignItems="center"
          flex={1}
          style={{ paddingVertical: 50 }}
        >
          <ActivityIndicator size="large" color={colors.iconColor} />
        </Box>
      );
    }

    if (data != null && selectedCity != null) {
      return (
        <Animated.View entering={FadeIn}>
          {/* Today's Weather */}
          <Box style={styles.todaySection}>
            <TodayWeatherCard
              cityName={selectedCity}
              current={data.current}
              todayForecast={data.daily[0]}
            />
          </Box>

          {/* Daily Forecast Cards */}
          <Box style={styles.forecastSection}>
            <Text.Header2 style={styles.sectionTitle}>
              7-Day Forecast
            </Text.Header2>
            <Box style={styles.forecastCardsContainer}>
              {data.daily.map((dayForecast: DailyForecast, index: number) => (
                <DayForecastCard key={index} forecast={dayForecast} />
              ))}
            </Box>
          </Box>
        </Animated.View>
      );
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
      contentContainerStyle={{
        paddingTop: top + 16,
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <ThemeToggle />

      <Text.Header2 style={styles.searchTitle}>Search for a city</Text.Header2>
      <TextInput
        value={city}
        onChangeText={handleChangeCity}
        placeholder="Search country, region or city"
        onSubmitEditing={handleSubmit}
        onClear={() => {
          setCity("");
          setSuggestions([]);
        }}
        returnKeyType="search"
      />

      <Box>
        {error && (
          <Text.Body style={{ color: "red" }}>{error.message}</Text.Body>
        )}
      </Box>

      {renderContent()}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchTitle: {
    marginBottom: 16,
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  todaySection: {
    marginTop: 24,
  },
  forecastSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  forecastCardsContainer: {
    gap: 12,
  },
});
