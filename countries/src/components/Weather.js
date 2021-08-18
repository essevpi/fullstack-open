import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

const Weather = ({ country }) => {
    const api_key=process.env.REACT_APP_WEATHER_API_KEY;
    const [ weatherData, setWeatherData ] = useState({});
    const [ hasWeather, setHasWeather ] = useState(false);

    const updateWeather = () => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name}&appid=${api_key}`)
            .then(response => {
                setWeatherData(response.data);
                setHasWeather(true);
            });
        
    }

    useEffect(updateWeather, []);
    
    return (
        <div>
            {hasWeather && <WeatherInfo weather={weatherData} />}           
        </div>
    );
}

export default Weather;