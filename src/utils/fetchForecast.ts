import axios, { AxiosResponse } from "axios";

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type CurrentWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
};

type DailyTemp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type DailyFeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

export type DailyForecast = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain?: number;
  snow?: number;
  uvi: number;
};

type OpenWeatherMapOneCallResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyForecast[];
};

export const fetchForecast = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const response: AxiosResponse<OpenWeatherMapOneCallResponse> =
    await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`
    );

  return response.data;
};

export const getWeatherIcon = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
