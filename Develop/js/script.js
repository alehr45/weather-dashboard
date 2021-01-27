var momentEl = moment().format('MMMM Do YYYY, h:mm:ss a');
var today = document.querySelector("#currentDay");

today.innerHTML = (momentEl);

saveCity = function () {


  // var citySearchElement = document.getElementById("userinput1");
  var citySearch = "los angeles"
  var apiKey = "5eb37a19973c9457201128f6d1d5ae80";
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;



  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          getWeather(data);
        });
      }
    });

};

getForecast = function () {
  var citySearch = "los angeles"
  var apiKey = "5eb37a19973c9457201128f6d1d5ae80";
  var apiUrl2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + apiKey;


  fetch(apiUrl2)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          getForecast1(data);
        });
      }
    });



}

function getWeather(data) {
  var icon = document.querySelector(".icon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  var fahrenheit = Math.round(((parseFloat(data.main.temp) - 273.15) * 1.8) + 32);
  document.getElementById("icon").innerHTML = icon
  document.getElementById('location').innerHTML = data.name;
  document.getElementById('temp').innerHTML = fahrenheit + '&deg;' + " F";
  document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity + "%";
  document.getElementById('windspeed').innerHTML = "Wind Speed: " + data.wind.speed + "mph";
  document.getElementById('windspeed').innerHTML = "Wind Speed: " + data.wind.speed + "mph";


};


function getForecast1(data) {
  document.querySelector(".onedayicon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[4].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  document.getElementById('onedaydate').innerHTML = moment().add(1, 'days').format('dddd');
  document.getElementById('onedaytemp').innerHTML = "Temp: " + Math.round(((parseFloat(data.list[4].main.temp) - 273.15) * 1.8) + 32) + '&deg;';
  document.getElementById('onedayhumidity').innerHTML = "Humidity: " + data.list[5].main.humidity + "%";
  document.querySelector(".twodayicon").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.list[12].weather[0].icon + ".png' alt='Icon depicting current weather.'>";
  document.getElementById('twodaydate').innerHTML = moment().add(2, 'days').format('dddd');
  document.getElementById('twodaytemp').innerHTML = "Temp: " + Math.round(((parseFloat(data.list[12].main.temp) - 273.15) * 1.8) + 32) + '&deg;';
  document.getElementById('twodayhumidity').innerHTML = "Humidity: " + data.list[12].main.humidity + "%";

};




getForecast();
saveCity();