import { useState, useEffect } from "react";
import "./index.css";

const KEY = "0aeadb9efb1f41ef9c9195031251802";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}`
        );
        const data = await res.json();
        if (data.error) {
          setError(data.error.message);
          setWeatherData(null);
          return;
        }
        setWeatherData(data);
        setError(null);
      } catch {
        setError("Failed to fetch weather data");
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [city]);
  console.log(weatherData);

  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather Widget</h1>
          <div
            className="search-container"
            onChange={(e) => setCity(e.target.value)}
          >
            <input
              type="text"
              value={city}
              placeholder="Enter city name"
              className="search-input"
            />
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          weatherData && (
            <div className="weather-card">
              <h2>
                {`${weatherData?.location.name}, ${weatherData?.location.country}`}
              </h2>
              <img
                src={`https:${weatherData?.current.condition.icon}`}
                alt="icon"
                className="weather-icon"
              />
              <p className="temperature">
                {Math.round(weatherData?.current.temp_c)}°C
              </p>
              <p className="condition">{weatherData?.current.condition.text}</p>
              <div className="weather-details">
                <p>Humidity: {Math.round(weatherData?.current.humidity)}%</p>
                <p>Wind: {Math.round(weatherData?.current.wind_kph)} km/h</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
