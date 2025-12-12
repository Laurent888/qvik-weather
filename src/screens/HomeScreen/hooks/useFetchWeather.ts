import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchWeather = async ({ queryKey }: { queryKey: string[] }) => {
  const city = queryKey[1];
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`
  );

  return response.data;
};

const useFetchWeather = () => {
  const [city, setCity] = useState<string>("helsinki");

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["weather", city],
    queryFn: fetchWeather,
    enabled: false,
  });

  useEffect(() => {
    if (city !== "") {
      refetch();
    }
  }, [city]);

  const fetchWeatherData = async ({ city }: { city: string }) => {
    setCity(city);
  };

  return {
    fetchWeatherData,
    data,
    error,
  };
};

export default useFetchWeather;
