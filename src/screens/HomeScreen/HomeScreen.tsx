import { Box, Text, TextInput } from "@/src/components";
import {
  filterOutDuplicatesByCountryCode,
  GeocodingResponse,
  getGeocodingByCity,
} from "@/src/utils/geocoding";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SuggestionItem from "./components/SuggestionItem";
import useFetchWeather from "./hooks/useFetchWeather";

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const [city, setCity] = useState<string>("helsinki");
  const [suggestions, setSuggestions] = useState<GeocodingResponse>([]);

  const { fetchWeatherData, data, error } = useFetchWeather();

  useEffect(() => {
    fetchWeatherData({ city: "madrid" });
  }, []);

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
              key={suggestion.name}
              cityName={suggestion.name}
              state={suggestion.state}
              country={suggestion.country}
            />
          ))}
        </Box>
      )}

      <Box>
        {error && (
          <Text.Body style={{ color: "red" }}>{error.message}</Text.Body>
        )}
      </Box>
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
});
