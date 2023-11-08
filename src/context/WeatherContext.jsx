import { createContext, useReducer } from "react";
import { defaultState, reducer } from "../utils/helpers";
import PropTypes from "prop-types";
export const WeatherStore = createContext({});

const WeatherContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <WeatherStore.Provider
      value={{
        dispatch,
        searchHistory: state.searchHistory,
        cityWeather: state.cityWeather,
        isModalOpen: state.isModalOpen,
        savedLocations: state.savedLocations,
      }}
    >
      {children}
    </WeatherStore.Provider>
  );
};

WeatherContext.propTypes = {
  children: PropTypes.element,
};

export default WeatherContext;
