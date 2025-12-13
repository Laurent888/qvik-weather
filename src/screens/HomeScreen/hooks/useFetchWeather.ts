import { fetchForecast } from "@/src/utils/fetchForecast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useFetchWeather = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const { isFetching, isPending, isError, data, error, refetch } = useQuery({
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

  return {
    fetchWeatherData,
    data,
    error,
    isFetching,
    selectedCity,
  };
};

export default useFetchWeather;
