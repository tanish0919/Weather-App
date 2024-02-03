import "./Forecast.css";
import clear from "../images/clear.png";
import cloud from "../images/cloud.png";
import drizzle from "../images/drizzle.png";
// import humidity from "../images/humidity.png";
import rain from "../images/rain.png";
import snow from "../images/snow.png";
// import wind from "../images/wind.png";
// import temp from "../images/clipart2896181.png";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

const Forecast = ({ location }) => {
  const [cityData, setCityData] = useState("");
  let apiKey = "503649b2c3e06c5b02067d0adfb7331e";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`
        );

        setCityData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location]);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (cityData && cityData.list) {
      let newData = [];
      let previousDate = cityData.list[0].dt_txt.split(" ")[0];
      cityData.list.forEach((key) => {
        if (key.dt_txt.split(" ")[0] !== previousDate) {
          newData.push(key);
          previousDate = key.dt_txt.split(" ")[0];
        }
      });

      setData(newData);
    }
  }, [cityData]);
  // data.shift();

  console.log(data);

  return (
    <div className="forecast">
      <div className="container2-1">
        {data.map((item) => {
          let wicon;
          const weather = item.weather[0].icon;

          if (weather === "01d" || weather === "01n") {
            wicon = clear;
          } else if (weather === "02d" || weather === "02n") {
            wicon = cloud;
          } else if (weather === "03d" || weather === "03n") {
            wicon = drizzle;
          } else if (weather === "04d" || weather === "04n") {
            wicon = drizzle;
          } else if (weather === "09d" || weather === "09n") {
            wicon = rain;
          } else if (weather === "10d" || weather === "10n") {
            wicon = rain;
          } else if (weather === "13d" || weather === "13n") {
            wicon = snow;
          } else {
            wicon = cloud;
          }

          return (
            <div key={item.dt} className="container2-2">
              <img src={wicon} alt="weather icon" className="icons" />

              <p className="text1">{item.dt_txt.split(" ")[0]}</p>
              <p className="text1">{item.weather[0].main}</p>
              <p className="text1">
                {Math.floor(item.main.temp_min - 273)} &deg;C -{" "}
                {Math.floor(item.main.temp_max - 273)} &deg;C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Forecast.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Forecast;
