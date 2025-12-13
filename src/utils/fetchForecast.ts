import axios, { AxiosResponse } from "axios";

const FORECAST_DAYS = 7;

type Coord = {
  lon: number;
  lat: number;
};

type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
};

type Temperature = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type DailyForecast = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
};

type OpenWeatherMapForecastResponse = {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: DailyForecast[];
};

export const fetchForecast = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const response: AxiosResponse<OpenWeatherMapForecastResponse> =
    await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${FORECAST_DAYS}&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`
    );

  return response.data;
};

export const getWeatherIcon = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
