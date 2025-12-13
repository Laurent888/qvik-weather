import { Box, Text, TextInput } from "@/src/components";
import {
  filterOutDuplicatesByCountryCode,
  GeocodingResponse,
  getGeocodingByCity,
} from "@/src/utils/geocoding";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DayForecastCard, { DailyForecast } from "./components/DayForecastCard";
import SuggestionItem from "./components/SuggestionItem";
import useFetchWeather from "./hooks/useFetchWeather";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const [city, setCity] = useState<string>("helsinki");
  const [suggestions, setSuggestions] = useState<GeocodingResponse>([]);

  const { fetchWeatherData, data, error } = useFetchWeather();

  // useEffect(() => {
  //   fetchWeatherData({ city: "madrid" });
  // }, []);

  const handleChangeCity = (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
    }
    const trimmedText = text.trim();
    setCity(trimmedText);
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
    console.log("suggestion", suggestion);
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: top, paddingHorizontal: 16 }}
    >
      <TextInput
        label="City"
        value={city}
        onChangeText={handleChangeCity}
        placeholder="Enter city"
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      {suggestions.length > 0 && (
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
      )}

      <Box>
        {error && (
          <Text.Body style={{ color: "red" }}>{error.message}</Text.Body>
        )}
      </Box>

      {/* Daily Forecast Cards */}
      {data && data.list && data.list.length > 0 && (
        <Box style={styles.forecastSection}>
          <Text.Header2 style={styles.sectionTitle}>
            7-Day Forecast
          </Text.Header2>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastCardsContainer}
          >
            {data.list.map((dayForecast: DailyForecast, index: number) => (
              <DayForecastCard key={index} forecast={dayForecast} />
            ))}
          </ScrollView>
        </Box>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  suggestionsContainer: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
    paddingRight: 16,
  },
});
