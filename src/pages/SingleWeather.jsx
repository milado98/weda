import {
  BsFillCloudRainFill,
  BsFillCloudsFill,
  BsSnow,
  BsSunFill,
  BsArrowLeft,
} from "react-icons/bs";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useWeatherContext } from "../context/useWeatherContext";

const SingleWeather = () => {
  const { cityWeather, dispatch, isModalOpen } = useWeatherContext();
  let todaysDate = new Date();
  let weatherIcon;
  let weatherBG;

  switch (cityWeather.weather[0].main) {
    case "Clouds":
      weatherBG = "bg-cloudy";
      weatherIcon = <BsFillCloudsFill className="weather-icon-city" />;
      break;
    case "Clear":
      weatherBG = "bg-sunny";
      weatherIcon = <BsSunFill className="weather-icon-city" />;
      break;
    case "Rain":
      weatherBG = "bg-rainy";
      weatherIcon = <BsFillCloudRainFill className="weather-icon-city" />;

      break;
    case "Snow":
      weatherBG = "bg-snowy";
      weatherIcon = <BsSnow className="weather-icon-city" />;
      break;
    default:
      weatherBG = "bg-cloudy";
      weatherIcon = <BsFillCloudsFill className="weather-icon-city" />;
      break;
  }

  const saveLocation = () => {
    dispatch({ type: "SAVE_LOCATION", payload: { ...cityWeather } });
  };

  return (
    <section className={`${weatherBG} bg-cover no-repeat min-h-screen`}>
      <div className="w-screen min-h-screen bg-gradient-to-r from-[#00000080] to-[#0000009c]   py-3 flex items-center justify-center">
        {isModalOpen && <Modal />}
        <div className=" mx-auto backdrop-blur-md text-white px-4 py-7 md:p-[4.5rem] bg-[rgba(184,182,182,0.15)] rounded-lg shadow-blue">
          <Link
            to={"/"}
            className="inline-block p-3 bg-gray-300 text-black border border-black rounded-full"
          >
            <BsArrowLeft className="text-2xl" />
          </Link>
          <div className="my-[2.3rem] flex flex-col md:flex-row-reverse md:justify-between justify-center items-center gap-[2rem]">
            <button
              onClick={saveLocation}
              className="w-[200px] border-none bg-blue-600 text-white rounded-md font-semibold text-lg py-3"
            >
              Save Location
            </button>
            <div className="mb-5 xl:mb-0">
              <h2 className="text-3xl lg:text-5xl font-bold mb-[0.8rem]">
                {`${cityWeather.name}, ${cityWeather.sys.country}`}
              </h2>
              <p className="text-lg font-medium lg:text-xl">
                {`${todaysDate.toLocaleTimeString()} - ${todaysDate.toDateString()}`}
              </p>
            </div>
          </div>
          <div className="md:flex items-center justify-center gap-x-5 md:my-[3rem]">
            <div className="px-4 flex items-center justify-between md:gap-x-6 md:border-r-2 md:pr-7">
              {weatherIcon}
              <div className="text-center">
                <h1 className="text-[2.5rem] leading-none mb-3 lg:mb-1 font-bold lg:text-[5.5rem]">
                  {cityWeather.main.temp}
                  <sup>o</sup>C
                </h1>
                <p className="text-xl lg:text-2xl font-semibold">
                  {cityWeather.weather[0].main}
                </p>
              </div>
            </div>
            <div>
              <ul className="weather-details my-[2rem] md:m-0 text-center grid grid-cols-3 justify-between gap-y-7 xl:gap-[2rem] gap-row-[1.5rem]">
                <li>
                  <h2>{cityWeather.main.temp_max}</h2>
                  <p>High</p>
                </li>
                <li>
                  <h2>{cityWeather.wind.speed}mph</h2>
                  <p>Wind</p>
                </li>
                <li>
                  <h2>{cityWeather.main.humidity}%</h2>
                  <p>Humidity</p>
                </li>
                <li>
                  <h2>{cityWeather.main.temp_min}</h2>
                  <p>Low</p>
                </li>
                <li>
                  <h2>{cityWeather.main.pressure}in</h2>
                  <p>Pressure</p>
                </li>
                <li>
                  <h2>41%</h2>
                  <p>Precipitation</p>
                </li>
              </ul>
            </div>
          </div>
          <Link
            to={"/savedlocations"}
            className="block border-2 border-blue-600 w-[230px] mx-auto text-center bg-white text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-md font-semibold text-lg"
          >
            View Saved Locations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingleWeather;
