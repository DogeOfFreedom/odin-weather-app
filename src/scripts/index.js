import "../style.css";

const weatherForm = document.querySelector(".weather-form");
const weatherContent = document.querySelector(".weather-container");
const searchInput = document.querySelector("input");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeatherData = async () => {
  const searchTerm = searchInput.value;
  const key = "30bd2286b09543ebbbe233108241702";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${searchTerm}&days=7&aqi=no&alerts=no`;
  const response = await fetch(url, { mode: "cors" });
  const forecastData = (await response.json()).forecast.forecastday;

  forecastData.forEach((forcast) => {
    const date = new Date(forcast.date);
    const day = days[date.getDay()];
    const condition = forcast.day.condition.text;
    const conditionIconSrc = forcast.day.condition.icon;
    const maxTempCelcius = forcast.day.maxtemp_c;
    const minTempCelcius = forcast.day.mintemp_c;
    const humidity = forcast.day.avghumidity;

    const forecastDay = document.createElement("div");
    forecastDay.className = "forcast-day";
    const dayElement = document.createElement("h1");
    dayElement.textContent = day;
    const conditionElement = document.createElement("p");
    conditionElement.textContent = condition;
    const conditionIcon = document.createElement("img");
    conditionIcon.src = conditionIconSrc;
    const maxTempElement = document.createElement("p");
    maxTempElement.textContent = maxTempCelcius;
    const minTempElement = document.createElement("p");
    minTempElement.textContent = minTempCelcius;
    const humidityElement = document.createElement("p");
    humidityElement.textContent = humidity;

    forecastDay.appendChild(dayElement);
    forecastDay.appendChild(conditionElement);
    forecastDay.appendChild(conditionIcon);
    forecastDay.appendChild(maxTempElement);
    forecastDay.appendChild(minTempElement);
    forecastDay.appendChild(humidityElement);
    weatherContent.appendChild(forecastDay);
  });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});
