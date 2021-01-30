var cities = [];
var citySearchEl = document.querySelector("#city");
var momentEl = moment().format('MMMM Do YYYY, h:mm:ss a');
var today = document.querySelector("#currentDay");
var submitEl = document.querySelector(".submit");
today.innerHTML = (momentEl);

var formSumbitHandler = function (event) {
  event.preventDefault();
  var city = citySearchEl.value.trim();
  if (city) {
    pullAPI2(city);
    pullAPI(city);
    pullAPI2(city);
    citySearchEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

pullAPI = function (city) {
  var apiKey = "5eb37a19973c9457201128f6d1d5ae80";
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey; "&exclude=hourly,daily&appid=5eb37a19973c9457201128f6d1d5ae80"
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          oneDayForecast(data);
        });
      }
    });

};

function defaultCity() {
  let city = "Honolulu";
  pullAPI2(city);
  pullAPI(city);
  pullAPI2(city);

  cityName = "";
}

pullAPI2 = function (city) {
  var apiKey = "5eb37a19973c9457201128f6d1d5ae80";
  var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  fetch(apiUrl2)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          fiveDayForecast(data);
          getUV(data);
        });
      }
    });
};

function getUV(data) {
  var lat = data.city.coord.lat;
  var long = data.city.coord.lon;
  var apiKey = "5eb37a19973c9457201128f6d1d5ae80";
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=hourly,daily&appid=" + apiKey;
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          document.getElementById('uvindex').innerHTML = "UV Index: " + Math.floor(data.current.uvi);
          if (data.current.uvi < 2) document.getElementById("uvindex").style.backgroundColor = "lightyellow";
          else if (data.current.uvi < 4) document.getElementById("uvindex").style.backgroundColor = "yellow";
          else if (data.current.uvi < 6) document.getElementById("uvindex").style.backgroundColor = "orange";
          else if (data.current.uvi < 8) document.getElementById("uvindex").style.backgroundColor = "red";
          else if (data.current.uvi < 10) document.getElementById("uvindex").style.backgroundColor = "darkred";
        });
      }
    });
};

function oneDayForecast(data) {
  var icon = document.querySelector(".icon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  var fahrenheit = Math.round(((parseFloat(data.main.temp) - 273.15) * 1.8) + 32);
  document.getElementById("icon").innerHTML = icon
  document.getElementById('location').innerHTML = data.name;
  document.getElementById('temp').innerHTML = fahrenheit + '&deg;' + " F";
  document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity + "%";
  document.getElementById('windspeed').innerHTML = "Wind Speed: " + data.wind.speed + "mph";


};

function fiveDayForecast(data) {
  document.querySelector(".onedayicon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  document.getElementById('onedaydate').innerHTML = moment().add(1, 'days').format('dddd');
  document.getElementById('onedaytemp').innerHTML = "Temp: " + Math.round(((parseFloat(data.list[4].main.temp) - 273.15) * 1.8) + 32) + '&deg;';
  document.getElementById('onedayhumidity').innerHTML = "Humidity: " + data.list[5].main.humidity + "%";
  document.querySelector(".twodayicon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  document.getElementById('twodaydate').innerHTML = moment().add(2, 'days').format('dddd');
  document.getElementById('twodaytemp').innerHTML = "Temp: " + Math.round(((parseFloat(data.list[12].main.temp) - 273.15) * 1.8) + 32) + '&deg;';
  document.getElementById('twodayhumidity').innerHTML = "Humidity: " + data.list[12].main.humidity + "%";
  document.querySelector(".threedayicon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[20].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  document.getElementById('threedaydate').innerHTML = moment().add(3, 'days').format('dddd');
  document.getElementById('threedaytemp').innerHTML = "Temp: " + Math.round(((parseFloat(data.list[20].main.temp) - 273.15) * 1.8) + 32) + '&deg;';
  document.getElementById('threedayhumidity').innerHTML = "Humidity: " + data.list[20].main.humidity + "%";
  document.querySelector(".fourdayicon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[28].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  document.getElementById('fourdaydate').innerHTML = moment().add(4, 'days').format('dddd');
  document.getElementById('fourdaytemp').innerHTML = "Temp: " + Math.round(((parseFloat(data.list[28].main.temp) - 273.15) * 1.8) + 32) + '&deg;';
  document.getElementById('fourdayhumidity').innerHTML = "Humidity: " + data.list[28].main.humidity + "%";
  document.querySelector(".fivedayicon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[33].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  document.getElementById('fivedaydate').innerHTML = moment().add(5, 'days').format('dddd');
  document.getElementById('fivedaytemp').innerHTML = "Temp: " + Math.round(((parseFloat(data.list[33].main.temp) - 273.15) * 1.8) + 32) + '&deg;';
  document.getElementById('fivedayhumidity').innerHTML = "Humidity: " + data.list[33].main.humidity + "%";
};


defaultCity();


submitEl.addEventListener("click", formSumbitHandler);