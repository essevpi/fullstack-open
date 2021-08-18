const WeatherInfo = ({ weather }) => {
    return (
        <div>
            <h4>Weather</h4>
            <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt="Weather icon" 
                width="64" />
            <p>{weather.weather[0].main}</p>
            <p>Temperature: {Math.floor(weather.main.temp - 273.15)} C°</p>
        </div>
    );
}

export default WeatherInfo;