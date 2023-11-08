import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Loading from "../components/Loading";
import { useWeatherContext } from "../context/useWeatherContext";

import {
  BsFillCloudRainFill,
  BsFillCloudsFill,
  BsSnow,
  BsSunFill,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";


const Home = () => {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchWeather, setSearchWeather] = useState("");
  const [weatherBG, setWeatherBG] = useState("bg-cloudy");
  const [weatherIcon, setWeatherIcon] = useState(
    <BsFillCloudsFill className="inline-flex text-lg mb-1 lg:text-3xl" />
  );
  const { searchHistory, dispatch } = useWeatherContext();
  const navigate = useNavigate();
  const todaysDate = new Date();

  const getWeather = async (latitude, longitude) => {
    try {
      const url = `/weather?lat=${latitude}&lon=${longitude}&APPID=${
        import.meta.env.VITE_APP_API_KEY
      }&units=metric`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setWeather(response.data);
        setBG(response.data.weather[0].main);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setBG = (weather) => {
    switch (weather) {
      case "Clouds":
        setWeatherBG("bg-cloudy");
        setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
        break;
      case "Clear":
        setWeatherBG("bg-sunny");
        setWeatherIcon(<BsSunFill className="weather-icon" />);
        break;
      case "Rain":
        setWeatherBG("bg-rainy");
        setWeatherIcon(<BsFillCloudRainFill className="weather-icon" />);
        break;
      case "Snow":
        setWeatherBG("bg-snowy");
        setWeatherIcon(<BsSnow className="weather-icon" />);
        break;
      default:
        setWeatherBG("bg-cloudy");
        setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
        break;
    }
  };

  const getCityWeather = async (city) => {
    try {
      const url = `/weather?q=${city}&APPID=${
        import.meta.env.VITE_APP_API_KEY
      }&units=metric`;
      const response = await axios.get(url);

      if (response.status === 200) {
        navigateToCity(response.data);
        dispatch({
          type: "SEARCH_CITY_WEATHER",
          payload: response.data,
        });
        navigate("/weather");
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        alert("Please check your internet connection");
      } else if (error.code === "ERR_BAD_REQUEST") {
        alert("Invalid City name, please enter a valid city name");
      }
    }
  };

  const searchCityWeather = () => {
    if (searchWeather.trim()) {
      getCityWeather(searchWeather);
      setSearchWeather("");
    } else {
      alert("Enter the name of a valid city");
    }
  };

  const navigateToCity = (city) => {
    dispatch({
      type: "SEARCH_CITY_WEATHER",
      payload: city,
    });
    navigate("/weather");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeather(latitude, longitude);
    });
  }, []);

  return (
    <div className={`bg bg-cover no-repeat min-h-screen`}>
      <div className="w-screen min-h-screen bg-gradient-to-r from-[#00000080] to-[#0000009c]">
        <header className="p-[1.5rem] xl:p-[2.5rem]">
          <h2 className="text-white text-xl lg:text-4xl font-bold">
            WeDa
          </h2>
        </header>
        <main>
          <section className="p-[1.5rem] pt-0  text-center lg:text-left">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="text-white lg:absolute bottom-10 left-5 xl:flex xl:p-[1rem] items-center gap-x-8">
                <h1 className="text-[3rem] font-bold lg:text-[5rem]">
                  {weather.main.temp}
                  <sup>o</sup>C
                </h1>
                <div className="mb-6 mt-4 xl:mb-0">
                  <h2 className="text-2xl xl:text-4xl font-bold">
                    {weather.name}
                  </h2>
                  <p className="text-lg font-semibold lg:text-xl">
                    {`${todaysDate.toLocaleTimeString()} - ${todaysDate.toDateString()}`}
                  </p>
                </div>
                <div>
                  {weatherIcon}
                  <p className="text-lg xl:text-xl font-bold">
                    {weather.weather[0].main}
                  </p>
                </div>
              </div>
            )}
          </section>
          <aside className="bg-[rgba(255,255,255,0.15)] text-white shadow-blue p-[1.5rem] lg:absolute right-0 top-0 lg:min-h-screen lg:w-[550px]">
            <div className="relative my-[2rem] lg:my-[3rem]">
              <input
                type="search"
                value={searchWeather}
                onChange={(e) => setSearchWeather(e.target.value)}
                className="text-black py-3 px-4 pr-[5.2rem] rounded-md font-medium w-full outline-none bxShadow"
              />
              <button
                type="button"
                onClick={searchCityWeather}
                className="bg-blue-600 hover:bg-blue-400 text-white py-2 px-4 rounded-md font-semibold absolute top-1 right-1"
              >
                Search
              </button>
            </div>
            {!isLoading && (
              <div>
                <div className="min-h-[150px] pb-2 max-h-[250px]">
                  <h2 className="text-lg lg:text-2xl font-semibold mb-2">
                    Your Previous Searches
                  </h2>
                  <div className="max-h-[180px] overflow-y-auto">
                    {searchHistory.length > 0 ? (
                      <ul>
                        {searchHistory.map((history) => (
                          <li
                            key={history.name}
                            className="font-semibold text-xl xl:text-2xl mb-3 w-[300px] flex items-center justify-between"
                          >
                            <button onClick={() => navigateToCity(history)}>
                              {history.name}
                            </button>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: "DELETE_SEARCH",
                                  payload: history,
                                })
                              }
                              className="w-[30px] h-[30px] bg-gray-300 text-black rounded-full shadow-xl flex items-center justify-center"
                            >
                              <AiOutlineClose className="inline-block text-lg" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="font-semibold xl:text-xl">
                        No searches yet
                      </p>
                    )}
                  </div>
                </div>
                <div className="border-t-2 py-[1.3rem] text-lg lg:text-xl font-semibold flex flex-col gap-[0.8rem] lg:gap-[1rem] lg:mb-8">
                  <h2 className="mb-2 text-xl lg:text-2xl">
                    Current Location Weather Details
                  </h2>
                  <p>
                    <span>Humidity</span> <span>{weather.main.humidity}%</span>
                  </p>
                  <p>
                    <span>Temperature</span>{" "}
                    <span>
                      {weather.main.temp}
                      <sup>o</sup>C
                    </span>
                  </p>
                  <p>
                    <span>Wind Speed</span>{" "}
                    <span>{weather.wind.speed} m/s</span>
                  </p>
                </div>
                <Link
                  to={"/savedlocations"}
                  className="block border-2 border-blue-600 w-[230px] text-center bg-white text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-md font-semibold text-lg"
                >
                  View Saved Locations
                </Link>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Home;
