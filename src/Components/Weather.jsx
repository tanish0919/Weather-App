import "./Weather.css";
import city from "../images/cityscape.png";
import clear from "../images/clear.png";
import cloud from "../images/cloud.png";
import drizzle from "../images/drizzle.png";
import humidity from "../images/humidity.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
import wind from "../images/wind.png";
import temp from "../images/clipart2896181.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ location }) => {
  const [cityData, setCityData] = useState("");
  let apiKey = "503649b2c3e06c5b02067d0adfb7331e";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
        );

        setCityData(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Display an alert if the status code is 404 (Not Found)
          return alert(`${location} is not a valid city. Enter a valid city`);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [location]);

  const [wicon, setWicon] = useState(cloud);
  // // console.log(wicon);
  useEffect(() => {
    if (cityData) {
      const weather = cityData.weather[0].icon;
      if (weather === "01d" || weather === "01n") {
        setWicon(clear);
      } else if (weather === "02d" || weather === "02n") {
        setWicon(cloud);
      } else if (weather === "03d" || weather === "03n") {
        setWicon(drizzle);
      } else if (weather === "04d" || weather === "04n") {
        setWicon(drizzle);
      } else if (weather === "09d" || weather === "09n") {
        setWicon(rain);
      } else if (weather === "10d" || weather === "10n") {
        setWicon(rain);
      } else if (weather === "13d" || weather === "13n") {
        setWicon(snow);
      } else {
        setWicon(cloud);
      }
    }
  }, [cityData]);

  return (
    <div className="main">
      {cityData && (
        <>
          <div className="city-name">
            <img src={city} alt="city icon" className="city-icon" />
            <h1>{cityData.name}</h1>
          </div>

          <div className="container2">
            <div className="city-name">
              <h1>{Math.floor(cityData.main.temp - 273)}&deg;C</h1>
            </div>
            <div className="container3">
              <img src={wicon} alt="weather icon" className="weather-icon" />
              <p className="weather-text ">{cityData.weather[0].main}</p>
            </div>
          </div>
          <div className="container4">
            <div className="container5">
              <img src={temp} alt="temp icon" className="temp-icon " />
              <div className="text">
                {Math.floor(cityData.main.temp_min - 273)} &deg;C -{" "}
                {Math.floor(cityData.main.temp_max - 273)} &deg;C
              </div>
            </div>
            <div className="container5">
              <img src={humidity} alt="humidity icon" className=" icon" />
              <div className="text">
                <div className="humidity-percentage">
                  {cityData.main.humidity}
                </div>
                <div className="text">Humdity</div>
              </div>
            </div>
            <div className="container5">
              <img src={wind} alt="wind icon" className=" icon" />
              <div className="text">{cityData.wind.speed} kmph</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Weather.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Weather;
