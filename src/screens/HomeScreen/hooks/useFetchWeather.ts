import { fetchForecast } from "@/src/utils/fetchForecast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useFetchWeather = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["weather", coordinates],
    queryFn: async () => {
      if (coordinates == null) {
        return null;
      }
      console.log("Start fetching forecast for coordinates", coordinates);
      const result = await fetchForecast({
        lat: coordinates.lat,
        lon: coordinates.lon,
      });
      console.log("Result", JSON.stringify(result, null, 2));
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
    setCoordinates({ lat, lon });
  };

  return {
    fetchWeatherData,
    data,
    error,
  };
};

export default useFetchWeather;
