let weather = {
  apiKey: "ca8891ac6c6760f9909e86ad86c9159d",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data).catch(error => console.log(error)));
  },
  displayWeather: function (data) {
    console.log(data);
    const { name } = data.city.name;
    const { icon, description } = data.list[0].weather[0];
    const { temp, humidity } = data.list[0].main;
    const { speed } = data.list[0].wind;
    const days = document.getElementById('days')

    for (i = 0; i < days.length; i += 8) {

      // document.querySelector(".days").innerText = data.list[i].dt
      document.querySelector(".city").innerText = "Weather in " + data.city.name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
      document.querySelector(".description").innerText = data.list[i].weather[0].description;
      document.querySelector(".temp").innerText = data.list[i].main.temp + "°F";
      document.querySelector(".humidity").innerText = data.list[i].main.temp
      "Humidity: " + data.list[i].main.humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind-speed: " + data.list[0].wind.speed + " mph";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    }
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Seattle");

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city