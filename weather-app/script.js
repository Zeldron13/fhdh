const cityInput = document.querySelector("#cityInput");
const getWeatherBtn = document.querySelector("#getWeatherBtn");
const resultWeather = document.querySelector("#weatherResult");

getWeatherBtn.addEventListener("click", () => {
  getWeather();
});

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    resultWeather.innerHTML = "Введите город";
    return;
  }

  try {
    resultWeather.innerHTML = "Загрузка...";
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ru&format=json`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultWeather.textContent = "Город не найден";
      return;
    }

    const { latitude, longitude } = geoData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`;

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    showWeather(weatherData);
  } catch (error) {
    resultWeather.textContent = "Не удалось загрузить погоду";
    console.error(error);
  }
}

function showWeather(data) {
  resultWeather.innerHTML = "";

  const items = [
    { label: "Температура", value: data.current.temperature_2m },
    { label: "Ветер", value: data.current.wind_speed_10m },
    { label: "Влажность", value: data.current.relative_humidity_2m },
  ];
  items.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = `${item.label}: ${item.value}`;
    resultWeather.appendChild(div);
  });
}
