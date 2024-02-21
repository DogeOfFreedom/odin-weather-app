import "../style.css";

const weatherForm = document.querySelector(".weather-form");
const forecastContent = document.querySelector(".forecast-container");
const searchInput = document.querySelector("input");
const loader = document.querySelector(".loader");
const errMsg = document.querySelector(".err-msg");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const populateWeatherData = (forecastData) => {
  forecastData.forEach((forcast) => {
    const dateObj = new Date(forcast.date);
    const date = forcast.date.split("-").slice(1);
    const dayName = days[dateObj.getDay()];
    const condition = forcast.day.condition.text;
    const conditionIconSrc = forcast.day.condition.icon;
    const maxTempCelcius = forcast.day.maxtemp_c;
    const minTempCelcius = forcast.day.mintemp_c;
    const humidity = forcast.day.avghumidity;

    const forecastDay = document.createElement("div");
    forecastDay.className = "forecast-day";
    const dayElement = document.createElement("h1");
    dayElement.textContent = `${dayName} ${months[date[0] - 1]} ${date[1]}`;
    const conditionIcon = document.createElement("img");
    conditionIcon.src = conditionIconSrc;
    const conditionElement = document.createElement("p");
    conditionElement.textContent = condition;
    const maxTempElement = document.createElement("p");
    maxTempElement.innerHTML = `Max Temperature: ${maxTempCelcius} &#8451`;
    const minTempElement = document.createElement("p");
    minTempElement.innerHTML = `Min Temperature: ${minTempCelcius} &#8451`;
    const humidityElement = document.createElement("p");
    humidityElement.textContent = `Humidity: ${humidity}%`;

    forecastDay.appendChild(dayElement);
    forecastDay.appendChild(conditionIcon);
    forecastDay.appendChild(conditionElement);
    forecastDay.appendChild(maxTempElement);
    forecastDay.appendChild(minTempElement);
    forecastDay.appendChild(humidityElement);
    forecastContent.appendChild(forecastDay);
  });
};

const getWeatherData = async () => {
  const searchTerm = searchInput.value;
  const key = "30bd2286b09543ebbbe233108241702";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${searchTerm}&days=7&aqi=no&alerts=no`;
  const response = await fetch(url, { mode: "cors" });

  if (response.status !== 200) {
    errMsg.textContent = "Country is invalid";
  } else {
    const forecastData = (await response.json()).forecast.forecastday;
    populateWeatherData(forecastData);
  }

  // remove loader
  loader.classList.add("hidden");
};

const input = document.querySelector("#country");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const countryRegex = /^[a-zA-Z ]*$/;

  if (input.validity.valueMissing) {
    errMsg.textContent = "Country cannot be empty";
  } else if (!countryRegex.test(input.value)) {
    errMsg.textContent = "Country cannot contain numbers or special characters";
  } else {
    errMsg.textContent = "";

    // clean up previous data
    forecastContent.innerHTML = "";

    // show loader
    loader.classList.remove("hidden");

    getWeatherData();
  }
});
