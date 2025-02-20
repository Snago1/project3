import { useState, useEffect } from "react";
import "./index.css";

const KEY = "0aeadb9efb1f41ef9c9195031251802";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (err) => {
        console.error("Geolocation error", err.message);
        setError("Failed to get your location");
      }
    );
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    console.log(signal);
    if (!city.trim() && !coords) {
      setWeatherData(null);
      setError(null);
      return;
    }
    async function getData() {
      setLoading(true);
      try {
        const querry = city.trim()
          ? city
          : `${coords.latitude}, ${coords.longitude}`;

        const res = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${querry}`,
          { signal }
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
    return () => {
      controller.abort();
    };
  }, [city, coords]);

  return (
    <div className="app">
      <TimerComponent />
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
function TimerComponent() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      // Устанавливаем таймер, если он включён
      timer = setInterval(() => {
        console.log("Timer running:", count);
        setCount((prev) => prev + 1);
      }, 1000);
    }

    // Функция очистки таймера
    return () => {
      if (timer) {
        console.log("Cleaning up the timer");
        clearInterval(timer);
      }
    };
  }, [isRunning]); // Таймер обновляется при изменении isRunning

  return (
    <div>
      <h1>Timer: {count}</h1>
      <button onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Stop Timer" : "Start Timer"}
      </button>
      <button onClick={() => setCount(0)} disabled={isRunning}>
        Reset Timer
      </button>
    </div>
  );
}
export default App;
