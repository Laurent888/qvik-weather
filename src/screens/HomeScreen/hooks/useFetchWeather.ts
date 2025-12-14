import { fetchForecast } from "@/src/utils/fetchForecast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useFetchWeather = () => {
  const queryClient = useQueryClient();

  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ["weather", coordinates],
    queryFn: async () => {
      if (coordinates == null) {
        return null;
      }

      const result = await fetchForecast({
        lat: coordinates.lat,
        lon: coordinates.lon,
      });
      return result;
    },
    enabled: false,
  });

  useEffect(() => {
    if (coordinates != null) {
      refetch();
    }
  }, [coordinates]);

  const fetchWeatherData = async ({
    city,
    lat,
    lon,
  }: {
    city: string;
    lat: number;
    lon: number;
  }) => {
    setSelectedCity(city);
    setCoordinates({ lat, lon });
  };

  // Add this function to clear the data
  const resetWeatherData = () => {
    setSelectedCity(null);
    setCoordinates(null);
    queryClient.setQueryData(["weather", coordinates], null);
  };

  return {
    resetWeatherData,
    fetchWeatherData,
    data,
    error,
    isFetching,
    selectedCity,
  };
};

export default useFetchWeather;
