function showCurrentTime() {
  let now = new Date();
  let daysIndex = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthsIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = daysIndex[now.getDay()];
  let month = monthsIndex[now.getMonth()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let date = now.getDate();
  let year = now.getFullYear();
  let fullHour = `${hour}:${minute}`;
  let fullDate = `${month} ${date}`;
  let currentDay = document.querySelector("#day-status #day");
  let currentDate = document.querySelector("#day-status #date");
  let currentHour = document.querySelector("#day-status #hour");
  currentDay.innerHTML = day;
  currentDate.innerHTML = `${fullDate}, ${year}`;
  currentHour.innerHTML = fullHour;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let latandlon = `lat=${latitude}&lon=${longitude}`;
  let apiKey = "23422500afd990f6bd64b60f46cf509a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${latandlon}&appid=${apiKey}&units=${unit}
`;
  axios.get(apiUrl).then(showWeatherSearchedData);
}

function getSearchCity(event) {
  event.preventDefault();
  let userSearchedCity = document.querySelector("input#search-input").value;
  let apiKey = "23422500afd990f6bd64b60f46cf509a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userSearchedCity}&appid=${apiKey}&units=${unit}`;
  axios(apiUrl).then(showWeatherSearchedData);
}

function getForecastDayApiUrl(coordinates) {
  let lon = coordinates.lon;
  let lat = coordinates.lat;
  let apiKey = "23422500afd990f6bd64b60f46cf509a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric
`;
  axios(apiUrl).then(displayForecastDays);
}

function showWeatherSearchedData(response) {
  let city = response.data.name;
  let country = response.data.sys.country;
  currentTemperture = Math.round(response.data.main.temp);
  let humidity = `Humidity: ${response.data.main.humidity}%`;
  let wind = `Wind: ${response.data.wind.speed} m/s`;
  let weather = response.data.weather[0].description;
  weather = weather.charAt(0).toUpperCase() + weather.slice(1);
  let icon = response.data.weather[0].icon;

  let defaultCity = document.querySelector("#current-city");
  let defaultCountry = document.querySelector("#current-country");
  let defaultTemperature = document.querySelector("#temperature");
  let defaultHumidity = document.querySelector("#humidity");
  let defaultWind = document.querySelector("#wind");
  let defaultWeather = document.querySelector("#status");
  let defaultIcon = document.querySelector("#defaultIcon");

  defaultCity.innerHTML = city;
  defaultCountry.innerHTML = country;
  defaultTemperature.innerHTML = currentTemperture;
  defaultHumidity.innerHTML = humidity;
  defaultWind.innerHTML = wind;
  defaultWeather.innerHTML = weather;
  defaultIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  defaultIcon.setAttribute("alt", weather);
  getForecastDayApiUrl(response.data.coord);
}

function navigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperature = currentTemperture;
  document.querySelector("#temperature").innerHTML = temperature;
  celsius.classList.add("active-temp");
  fahrenheit.classList.remove("active-temp");
}

function convertToFahrenheit() {
  let temperature = currentTemperture;
  temperature = Math.round((temperature * 9) / 5 + 32);
  document.querySelector("#temperature").innerHTML = temperature;
  celsius.classList.remove("active-temp");
  fahrenheit.classList.add("active-temp");
}

function formatDateForecast(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecastDays(response) {
  let forecast = response.data.daily;
  let forecastDaysElement = document.querySelector("#next-days");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (element, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `
<div id="forecast-day" class="col-2 box-weather">
  <div id="day" class="day">${formatDateForecast(element.dt)}</div>
  <div id="low-high-degree">
    <span class="low-degree">${Math.round(element.temp.min)}°/</span
    ><span class="high-degree">${Math.round(element.temp.max)}°</span>
  </div>
  <div id="icon-day">
    <img
    class="weathericone"
      src="https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png"
      alt="partly_cloudy"
    />
  </div>
  <div id="humidity-day" class="humidity-status">${element.humidity}%</div>
  <div id="status-day" class="humidity-status">
    ${element.weather[0].description}
  </div>
</div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  console.log(forecastHTML);
  forecastDaysElement.innerHTML = forecastHTML;
}

function displayForecastHour() {
  let forecastHours = document.querySelector("#next-hours");
  let hours = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
  let forecastHTML = `<div class="row">`;

  hours.forEach(function (hours) {
    forecastHTML =
      forecastHTML +
      `
<div id="first-hours" class="col box-weather">
<div id="low-hours-degree" class="hours">${hours}</div>
<div id="high-hours-degree" class="high-degree">22°</div>
<div id="icon-hours">
<img src="weathericones/rain_s_cloudy.png" alt="rain_s_cloudy" />
</div>
<div id="humidity-hours" class="humidity-status">22%</div>
<div id="status-hours" class="humidity-status">Rainy</div>
</div>
     `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastHours.innerHTML = forecastHTML;
}

navigator.geolocation.getCurrentPosition(showPosition);

let currentTemperture;
let searchedCity = document.querySelector("form#search-form");
searchedCity.addEventListener("submit", getSearchCity);

let currentCityWeather = document.querySelector("button#button-addon2");
currentCityWeather.addEventListener("click", navigation);

let celsius = document.querySelector("a#celsius-link");
let fahrenheit = document.querySelector("a#fahrenheit-link");
celsius.addEventListener("click", convertToCelsius);
fahrenheit.addEventListener("click", convertToFahrenheit);

displayForecastHour();
showCurrentTime();
