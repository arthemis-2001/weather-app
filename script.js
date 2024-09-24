document
  .getElementById("location-input")
  .addEventListener("change", async () => {
    const location = document.getElementById("location-input").value;
    const weatherData = await getWeatherData(location);
    displayWeatherData(weatherData);
  });

const getWeatherData = async (location) => {
  if (!location) {
    return {};
  }

  const apiKey = "API_KEY"; // Replace with your actual API key
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`
  );
  const data = await response.json();
  return data;
};

function getBackgroundColor(temperature) {
  if (temperature < 0) {
    return "lightblue";
  } else if (temperature < 10) {
    return "lightgreen";
  } else if (temperature < 20) {
    return "lightyellow";
  } else if (temperature < 30) {
    return "lightsalmon";
  } else {
    return "lightcoral";
  }
}

const displayWeatherData = (data) => {
  const weatherDataElement = document.getElementById("weather-data");
  if (Object.keys(data).length === 0) {
    weatherDataElement.innerHTML =
      "Please enter a location to see the weather.";
  } else {
    const backgroundColor = getBackgroundColor(Math.floor(data.current.temp_c));
    weatherDataElement.style.backgroundColor = backgroundColor;

    weatherDataElement.innerHTML = `
            <h3>${data.location.name}</h3>
            <p>Temperature: ${Math.floor(data.current.temp_c)}°C</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Cloud coverage: ${data.current.cloud}%</p>
            <p>Wind Speed: ${data.current.wind_mph} m/h</p>
        `;
  }
};

window.onload = async () => {
  const weatherData = await getWeatherData();
  displayWeatherData(weatherData);
};
