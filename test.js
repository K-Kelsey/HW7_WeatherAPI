// function Uvigradient() {
//     if (uvi <= 2) {
//         document.querySelector("#uvi").innerText = "Low";
//         element.classList.add('low')
//     } else if (uvi <= 4) {
//         document.querySelector("#uvi").innerText = "Moderate";
//         element.classList.add('moderate')
//     } else if (uvi <= 4) {
//         document.querySelector("#uvi").innerText = "High";
//         element.classList.add('high')
//     } else if (uvi <= 4) {
//         document.querySelector("#uvi").innerText = "Very High";
//         element.classList.add('veryHigh')
//     } else {
//         document.querySelector("#uvi").innerText = "Extreme";
//         element.classList.add('extreme')
//     }
// };

let currentWeather = {
    apiKey: "ca8891ac6c6760f9909e86ad86c9159d",
    // fetchWeather: function (city) {
    //     fetch(
    //         "https://api.openweathermap.org/data/2.5/weather?q=" +
    //         city +
    //         "&units=imperial&appid=" +
    //         this.apiKey
    //     )
    //         .then((response) => {
    //             if (!response.ok) {
    //                 alert("No weather found.");
    //                 throw new Error("No weather found.");
    //             }
    //             return response.json();
    //         })
            
    //         .then((currentdata) => {
    //             this.displayCurrentWeather(currentdata)
    //         })
    //         .then(() => weatherForecast.fetchWeather(city))
    //         .catch(error => console.log(error));
    // },

    oneCall: function (lat, lon) {

        fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${this.apiKey}`
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();

            })
            .then((city) => {
                this.oneCall(data.coord.lat, data.coord.lon)
                return city;
                
            })
            .then(maindata => {
                console.log(maindata, "onecall")
                return maindata;
            })
            .then((maindata) => this.displayCurrentWeather(maindata))
            .then((maindata) => this.displayWeatherForecast(maindata))
            .catch(error => console.log(error))
    },

    displayWeatherForecast: function (maindata) {

console.log(city);
        // console.log(data, "forecast");
        // const { name } = data.city.name;
        for (i = 0; i <= maindata.length; i++) {
            const { icon, description } = maindata.daily[i].weather[0];
            const { temp } = maindata.daily[i].temp.day;
            const { humidity, wind_speed, uvi } = maindata.daily[i];

            const days = $('#weather')



            days.empty()
            for (i = 0; i < maindata.length; i += 8) {

                days.append(` 
            <div class='days'>
            <h2>${maindata.daily[i].dt_txt}</h2>
            <h1 class="temp">${temp}</h1>
            <div class="flex">
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt=""/>
                <div class="description">${description}</div>
            </div>
            <div class="humidity">Humidity: ${humidity}%</div>
            <div class="wind">Wind speed: ${wind_speed}mph</div>
            <div class="uvi">UVI: ${uvi}</div>
            </div>
            `)
            }


            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
        }
    },



    displayCurrentWeather: function (data, maindata) {
        console.log(data, "current data")

        const { name } = data.name;
        const { icon, description } = data.weather[0];
        // const {  uvi, wind_speed } = data.main;
        console.log(data.current.uvi)

        document.querySelector("#city").innerText = "Weather in " + name;
        document.querySelector("#icon").src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png";
        document.querySelector("#description").innerText = data.current.weather[0].description;
        document.querySelector("#temp").innerText = data.current.temp + "°F";
        document.querySelector("#humidity").innerText = "Humidity: " + data.main.humidity + "%";
        document.querySelector("#wind").innerText = "Wind-speed: " + data.current.wind_speed + " mph";
        document.querySelector("#uvi").innerText = "UVI: " + data.current.uvi;
        document.querySelector("#weather").classList.remove("loading");

    },

    search: function () {
        this.oneCall(document.querySelector(".search-bar").value);
    }

};

document.querySelector(".search button").addEventListener("click", function () {
    oneCall.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            currentWeather.search();
        }
    });

currentWeather.oneCall("Seattle");

//<div class="uvi">UVI: ${data.current.uvi}</div>


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

