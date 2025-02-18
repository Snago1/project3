import { useState, useEffect } from "react";
import "./index.css";

const KEY = "0aeadb9efb1f41ef9c9195031251802";

function App() {
  return (
    <div className="app">
      <div className="widget-container">
        <div className="weather-card-container">
          <h1 className="app-title">Weather Widget</h1>
          <div className="search-container">
            <input
              type="text"
              placeholder="Enter city name"
              className="search-input"
            />
          </div>
        </div>
        <div className="weather-card">
          <h2>Moscow, Russia</h2>
          <img src="" alt="icon" className="weather-icon" />
          <p className="temperature">11°C</p>
          <p className="condition">rainy</p>
          <div className="weather-details">
            <p>Humidity: 20%</p>
            <p>Wind: 22 km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
