import { Box, Text, TextInput } from "@/src/components";
import { DailyForecast } from "@/src/utils/fetchForecast";
import {
  filterOutDuplicatesByCountryCode,
  GeocodingResponse,
  getGeocodingByCity,
} from "@/src/utils/geocoding";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DayForecastCard from "./components/DayForecastCard";
import SuggestionItem from "./components/SuggestionItem";
import TodayWeatherCard from "./components/TodayWeatherCard";
import useFetchWeather from "./hooks/useFetchWeather";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const [city, setCity] = useState<string>("helsinki");
  const [suggestions, setSuggestions] = useState<GeocodingResponse>([]);

  const { fetchWeatherData, data, error, selectedCity } = useFetchWeather();

  // useEffect(() => {
  //   fetchWeatherData({ city: "madrid" });
  // }, []);

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
      contentContainerStyle={{
        paddingTop: top + 16,
        paddingHorizontal: 16,
        paddingBottom: 32,
      }}
    >
      <Text.Header2 style={styles.searchTitle}>Search for a city</Text.Header2>
      <TextInput
        value={city}
        onChangeText={handleChangeCity}
        placeholder="Enter city"
        onSubmitEditing={handleSubmit}
        onClear={() => setCity("")}
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

      {/* Today's Weather */}
      {data &&
        data.current &&
        data.daily &&
        data.daily.length > 0 &&
        selectedCity && (
          <Box style={styles.todaySection}>
            <TodayWeatherCard
              cityName={selectedCity}
              current={data.current}
              todayForecast={data.daily[0]}
            />
          </Box>
        )}

      {/* Daily Forecast Cards */}
      {data && data.daily && data.daily.length > 0 && (
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
      )}
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
