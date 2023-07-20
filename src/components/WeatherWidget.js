import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
`;

const WeatherForm = styled.form`
  margin-bottom: 10px;
`;

const WeatherTitle = styled.h2`
  margin: 0;
`;

const WeatherTemp = styled.p`
  font-size: 1.5em;
  margin: 0;
`;

const WeatherCondition = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

function WeatherWidget() {
  const [city, setCity] = useState('Atlanta');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = (city) => {
    setIsLoading(true);
    setError(null);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=db65b051b1ce560a620362330f5e0542`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          throw new Error(data.message);
        }
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const updateCity = () => {
    const newCity = prompt('Enter city name');
    if (newCity) {
      setCity(newCity);
    }
  };

  return (
    <WidgetContainer>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        weatherData && (
          <>
            <WeatherTitle>{city}</WeatherTitle>
            <WeatherTemp>{Math.round(weatherData.main.temp)}°F</WeatherTemp>
            {weatherData.weather.map((condition) => (
              <WeatherCondition key={condition.id}>
                <img
                  src={`http://openweathermap.org/img/w/${condition.icon}.png`}
                  alt={condition.description}
                />
                <span>{condition.description}</span>
              </WeatherCondition>
            ))}
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Wind: {weatherData.wind.speed} mph</div>
            <button onClick={updateCity}>Change city</button>
          </>
        )
      )}
    </WidgetContainer>
  );
}

export default WeatherWidget;
