import React, { useState } from "react";

function Weather() {
  const [cityInput, setCityInput] = useState("");
  const [weatherData, setWeatherData] = useState({});

  const getWeather = async () => {
    try {
      const correctedCityName = cityInput.trim();
      const response = await fetch("http://localhost:4000/getWeather", {
        // Update the URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cities: correctedCityName }),
      });

      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }

      const data = await response.json();
      setWeatherData(data.weather);
      setCityInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city names (comma-separated)"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      <div>
        <h2>Weather Results:</h2>
        <ul>
          {Object.keys(weatherData).map((city) => (
            <li key={city}>
              {city}: {weatherData[city]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Weather;
