//grabs the current weather data using the forecast api
let currentWeather = {
    apiKey: "ca8891ac6c6760f9909e86ad86c9159d",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
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
            .then((data) => {
                this.displayCurrentWeather(data)

            })
            .then(() => weatherForecast.fetchWeather(city))
            .catch(error => console.log(error));
    },
    uvIndex: function (lat, lon) {
        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${this.apiKey}`
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();

            })
            .then(data => {
                console.log(data)
                const { lat, lon } = data.coord;
                this.uvIndex(lat, lon)
            })
    },
    displayCurrentWeather: function (data) {
        console.log(data)
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector("#city").innerText = "Weather in " + name;
        document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector("#description").innerText = description;
        document.querySelector("#temp").innerText = temp + "°F";
        document.querySelector("#humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector("#wind").innerText = "Wind-speed: " + speed + " mph";
        document.querySelector("#weather").classList.remove("loading");

    },
    setSearchHistory: function (city) {
        // check for existing search history in LS
        // if null, search history is an empty array
        const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

        // check for city name in search history
        // if exists, do nothing; else add city name to search history array
        if (searchHistory.indexOf(city) === -1) {
            searchHistory.push(city)

            localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        }

    },

    loadHistoryButtons: function () {
        const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        if (searchHistory.length > 0) {
            const historyContainer = $('#history-buttons')

            for (let i = 0; i < searchHistory.length; i++) {
                historyContainer.append(`
                <button>${searchHistory[i]}</button>
                `)
            }
        }

    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

}
let weatherForecast = {
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
            .then((data) => this.displayWeatherForecast(data))
            .catch(error => console.log(error));
    },
    displayWeatherForecast: function (data) {


        console.log(data);
        const { name } = data.city.name;
        const { icon, description } = data.list[0].weather[0];
        const { temp, humidity } = data.list[0].main;
        const { speed } = data.list[0].wind;
        const days = $('#weather')



        days.empty()
        for (i = 0; i < data.list.length; i += 8) {

            days.append(` 
            <div class='days'>
            <h2>${data.list[i].dt_txt}</h2>
            <h1 class="temp">${data.list[i].main.temp}</h1>
            <div class="flex">
                <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" alt=""/>
                <div class="description">${data.list[i].weather[0].description}</div>
            </div>
            <div class="humidity">Humidity: ${data.list[i].main.humidity}%</div>
            <div class="wind">Wind speed: ${data.list[0].wind.speed}mph</div>
            </div>
            `)
        }


        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },

};

document.querySelector(".search button").addEventListener("click", function () {
    weatherForecast.search();
});

const savedCity = JSON.parse(localStorage.getItem("city")) || []
console.log(savedCity)
for (let i = 0; i < savedCity.length; i++) {
    $(`#search-bar`).val(savedCity[i])

}

function updateSearchBar(id, value) {

    var searchArray = JSON.parse(localStorage.getItem("city")) || [];

    searchArray[id] = value;

    localStorage.setItem('city', JSON.stringify(searchArray))
}

document.querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            var cityName = document.querySelector(".search-bar").value
            currentWeather.fetchWeather(cityName);
            currentWeather.setSearchHistory(cityName);
            // currentWeather.loadHistoryButtons()
        }
        updateSearchBar();
    });

document.getElementById('history-buttons')
    .addEventListener('click', function (event) {
        const cityName = event.target.innerText
        if (cityName) {
            currentWeather.fetchWeather(cityName);
        }
    });



currentWeather.loadHistoryButtons();
currentWeather.fetchWeather("Seattle");

