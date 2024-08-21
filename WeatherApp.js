import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '2a0f65d48fb294cd0fae9cb6232f5b64';

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('City not found. Please try again.');
    }
  };

  const getLocationWeather = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        setWeather(response.data);
        setError('');
      } catch (error) {
        setError('Unable to fetch weather data.');
      }
    });
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
