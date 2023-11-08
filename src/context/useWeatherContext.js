import { useContext } from "react";
import { WeatherStore } from "../context/WeatherContext";

export const useWeatherContext = () => {
  return useContext(WeatherStore);
};
