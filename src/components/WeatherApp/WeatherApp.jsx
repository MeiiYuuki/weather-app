import React, { useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [temprature, setTemprature] = useState(0);
  const [location, setLocation] = useState("Location");
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  //   const apiKey = process.env.API_KEY;
  const apiKey = "57a6d0421bafba9bba2c0616a784d3f1";

  const handleSearch = async () => {
    const element = document.getElementsByClassName("city-input");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    console.log("data", data);

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWeatherIcon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n" ||
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n" ||
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWeatherIcon(cloud_icon);
    } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
      setWeatherIcon(drizzle_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n" ||
      data.weather[0].icon === "11d" ||
      data.weather[0].icon === "11n"
    ) {
      setWeatherIcon(rain_icon);
    } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
      setWeatherIcon(snow_icon);
    } else {
      setWeatherIcon(cloud_icon);
    }

    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemprature(data.main.temp);
    setLocation(data.name);
  };

  return (
    <div className="weather-container">
      <div className="top-bar">
        <input type="text" className="city-input" placeholder="Search" />
        <div className="search-icon" onClick={() => handleSearch()}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="" />
      </div>
      <div className="weather-temp">{temprature}&#176;c</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-speed">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
