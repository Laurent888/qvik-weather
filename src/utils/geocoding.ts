import axios, { AxiosResponse } from "axios";

export type GeocodingResponse = {
  name: string;
  local_names: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
}[];

export const getGeocodingByCity = async ({ city }: { city: string }) => {
  try {
    const response: AxiosResponse<GeocodingResponse> = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const filterOutDuplicatesByCountryCode = (
  geocoding: GeocodingResponse
) => {
  const seen = new Set<string>();
  const result: GeocodingResponse = [];

  for (const item of geocoding) {
    if (!seen.has(item.country)) {
      seen.add(item.country);
      result.push(item);
    }
  }

  return result;
};
