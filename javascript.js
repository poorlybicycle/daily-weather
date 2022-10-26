//api key
var APIKey = "e29ee6ce278c02dbe4f70b2ac2ff2385";
var button = document.getElementById("search-btn");
//can use querySelector(#search-Btn) - not specific by ID
var input = document.getElementById("city");

// //API call using city name:
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} 

// //stores current weather data url and variables
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// fetch(queryURL)

button.addEventListener("click", function(event) {
    var cityname = input.value;
    var APIurl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityname + "&limit=1&appid=e29ee6ce278c02dbe4f70b2ac2ff2385";
    event.preventDefault();
    console.log("message");
    console.log(input.value);
    fetch(APIurl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var latitude = data[0].lat;
                var longitude = data[0].lon;
                getWeather(latitude, longitude);
            })
        }
    })
});

function getWeather (latitude, longitude) {
    var APIurl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" +longitude + "&appid=e29ee6ce278c02dbe4f70b2ac2ff2385";
    fetch(APIurl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })
}