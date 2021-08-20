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

showCurrentTime();
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
