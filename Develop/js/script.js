var momentEl = moment().format('MMMM Do YYYY, h:mm:ss a');
var today = document.querySelector("#currentDay");

today.innerHTML = (momentEl);

saveCity = function () {


  // var citySearchElement = document.getElementById("userinput1");
  var citySearch = "jacksonville"
  var apiKey = "5eb37a19973c9457201128f6d1d5ae80";
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;



  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
        });
      }
    });

};

getForecast = function () {
  var citySearch = "jacksonville"
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
  // var icon = data.

  var fahrenheit = Math.round(((parseFloat(data.main.temp) - 273.15) * 1.8) + 32);
  document.getElementById('location').innerHTML = data.name;
  document.getElementById('description').innerHTML = data.weather[0].description;
  document.getElementById('temp').innerHTML = fahrenheit + '&deg;' + " F";
  document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity + "%";
  document.getElementById('windspeed').innerHTML = "Wind Speed: " + data.wind.speed + "mph";
  document.getElementById('windspeed').innerHTML = "Wind Speed: " + data.wind.speed + "mph";
  
 };
  
 
 function getForecast1(data) {
  document.getElementById('tomorrow').innerHTML = Math.round(((parseFloat(data.list[5].main.temp) - 273.15) * 1.8) + 32);

  };




getForecast();
saveCity();