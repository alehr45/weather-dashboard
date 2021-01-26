var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=5eb37a19973c9457201128f6d1d5ae80" 
var citySearch = document.querySelector("userinput");


fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
        });

    
