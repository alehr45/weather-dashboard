


saveCity = function () {
  var citySearchElement = document.getElementById("userinput1");
  var citySearch = "Nashville"
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

function getWeather( e ) {
	var fahrenheit = Math.round(((parseFloat(e.main.temp)-273.15)*1.8)+32); 
	document.getElementById('description').innerHTML = e.weather[0].description;
	document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
	document.getElementById('location').innerHTML = e.name;
}


saveCity();