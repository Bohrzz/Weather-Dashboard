//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//var openWeatherUrl ="http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}";
//var oneCallWeather ="http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}";

const apiKey = "a14eccc4d63ea4e7bf015331fe0039af";
const cityEl = $("#city");
const dateEl = $("#date");
const temperatureEl = $("#temperature");
const humidityEl = $("#humidity");
const windEl = $("#wind");
const uvIndexEl = $("#uv-index");
const cityListEl = $("#city list");
const cityInput = $("#city-input");
const weatherIconEl = $("#weather-icon");

var pastCities = [];

var baseUrl = "https://api.openweathermap.org";
function compare(a, b) {
  const cityA = a.city.toUpperCase();
  const cityB = b.city.toUpperCase();

  var comparison = 0;
  if (cityA > cityB) {
    comparison = 1;
  } else if (cityA < cityB) {
    comparison = -1;
  }
  return comparison;
}

async function getUrlFromInput(city) {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();

  return { lat: data[0].lat, lon: data[0].lon };
}

function getUrlFromId(id) {
  if (id) {
    return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`;
  }
}

function weatherSearch(coordinates) {
  fetch(
    `${baseUrl}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      var city = response.name;
      var id = response.id;

      if (pastCities[0]) {
        pastCities = $.grep(pastCities, function (storedCity) {
          return id !== storedCity.id;
        });
      }
      pastCities.unshift({ city, id });
      storeCities();
      displayCities(pastCities);

      cityEl.text(response.name);
      var todaysDate = moment().format(" DD MMM YYYY");
      dateEl.text(todaysDate);

      temperatureEl.html(((response.main.temp - 273.15) * 1.8 + 32).toFixed(1));
      humidityEl.text(response.main.humidity);
      windEl.text((response.wind.speed * 2.237).toFixed(1));

      //   var lat = response.coord.lat;
      //   var lon = response.coord.lon;
      //   var coordinates = `http://api.openweathermap.org/data/2.5/`;
      fetch(
        `${baseUrl}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          console.log(response);
          var fiveDay = response.list;

          for (var i = 0; i <= 5; i++) {
            var currentDay = fiveDay[i];
            $(`#date-${i}`).text(moment.unix(currentDay.dt).format("L"));
            $(`#temp-${i}`).text(
              ((currentDay.main.temp - 273.15) * 1.8 + 32).toFixed(1)
            );
            $(`#humid-${i}`).text(currentDay.main.humidity);
          }
        });
    });
}

// change to fetch request

//var fiveDay = response.daily;

//   for (var i = 0; i <= 5; i++) {
//     var currDay = fiveDay[i].temp;
//     $(`day-${i} title`).text(moment.unix(currDay.dt).format("L"));
//     $(`day-${i} .fiveDay-img`)
//       .attr(
//         "src",
//         `http://api.openweathermap.org/img/wn/${current.temp}.png&appid=${apiKey}`
//       )
//       .attr("alt", currDay.weather[0].description);
//     $(`day-${i} .fiveDay-temp`).text(
//       ((currDay.temp.day )).toFixed(1)
//     );
//     $(`day-${i} .fiveDay-humid`).text(currDay.humidity);
//   }

function displayLastSearchedCity() {
  if (pastCities[0]) {
    var coordinates = getUrlFromId(pastCities[0].id);
    searchWeather(coordinates);
  } else {
    var coordinates = getUrlFromInput("Atlanta");
    searchWeather(coordinates);
  }
}

$("#search-bttn").on("click", async function (event) {
  event.preventDefault();
  var city = cityInput.val().trim();
  city = city.replace(" ", "%20");
  cityInput.val("");
  if (city) {
    const coordinates = await getUrlFromInput(city);
    console.log(coordinates);
    weatherSearch(coordinates);
  }
});

$(document).on("click", "button.city-btn", function (event) {
  event.preventDefault();
  var clickedCity = $(this).text();
  var foundCity = $.grep(pastCities, function (storedCity) {
    return clickedCity === storedCity.city;
  });
  let coordinates = getURLFromId(foundCity[0].id);
  weatherSearch(coordinates);
});

function displayCities(pastCities) {
  cityListEl.empty();
  pastCities.splice(5);
  var sortedCities = [...pastCities];
  sortedCities.sort(compare);
  sortedCities.forEach(function (location) {
    var cityDiv = $("<div>").addClass("col-12 city");
    var cityBtn = $("<button>")
      .addClass("btn btn-light city-btn")
      .text(location.city);
    cityDiv.append(cityBtn);
    cityListEl.append(cityDiv);
  });
}

function loadCities() {
  const storedCities = JSON.parse(localStorage.getItem("pastCities"));
  if (storedCities) {
    pastCities = storedCities;
  }
}

function storeCities() {
  localStorage.setItem("pastCities", JSON.stringify(pastCities));
}
function setUVIndexColor(uvi) {
  if (uvi < 3) {
    return "green";
  } else if (uvi >= 3 && uvi < 6) {
    return "yellow";
  } else if (uvi >= 6 && uvi < 8) {
    return "orange";
  } else if (uvi >= 8 && uvi < 11) {
    return "red";
  } else return "purple";
}

//fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}}`);

//function cityWeather(cityName){
// fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`)
//  .then(function(response){
//      console.log(response)
//      return response.json()
// })
// .then(function(data){
//     console.log(data)
//get lon and lat call another function for 5day forcast
// });
//    }

//cityWeather("atlanta")
