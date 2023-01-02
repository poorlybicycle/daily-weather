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
    var APIurl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=e29ee6ce278c02dbe4f70b2ac2ff2385";
    event.preventDefault();
    console.log("message");
    console.log(input.value);
    fetch(APIurl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                renderCurrentWeather(data)
                var historyOfCities = [];
                if(localStorage.getItem("history")) {
                    historyOfCities = JSON.parse(localStorage.getItem("history"))
                }
    
                historyOfCities.push(data.name);

                localStorage.setItem("history", JSON.stringify(historyOfCities))
                var latitude = data.coord.lat;
                var longitude = data.coord.lon;
                getWeather(latitude, longitude);
            })
        }
    })
});

function renderCurrentWeather(weatherObject) {
    console.log(weatherObject)
    document.getElementById("citydisplay").textContent = weatherObject.name
    document.getElementById("temp").textContent = `Temperature: ${weatherObject.main.temp} °F`
}

function getWeather (latitude, longitude) {
    var APIurl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" +longitude + "&units=imperial&appid=e29ee6ce278c02dbe4f70b2ac2ff2385";
    fetch(APIurl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                renderForecastWeather(data.list)
            })
        }
    })
}

function renderForecastWeather(arrayOfWeatherObjects) {
    document.getElementById("forecast").innerHTML = ""
    for(i=0; i< arrayOfWeatherObjects.length; i++) {
        if(arrayOfWeatherObjects[i].dt_txt.includes("12:00:00")) {
            var newH3 = document.createElement("h3");
            //this is hard to read, but it just splits your string into an array and then we get the
            // first part of the string instead of the whole chunk
            newH3.textContent = arrayOfWeatherObjects[i].dt_txt.split(" ")[0];

            var newDiv = document.createElement("div");
            newDiv.setAttribute("class", "border");

            newDiv.innerHTML = `
            <h3>Temp: ${arrayOfWeatherObjects[i].main.temp} </h3>`

            newDiv.append(newH3)
            
            document.getElementById("forecast").appendChild(newDiv)
        }
    }
}

//make a function that grabs the array that we have in local storage (see localStorage.getItem)
//then in your "previous" div from the HTML (the ID previous) (document.getElementById)
//create buttons for each one of the cities retrieved in local storage (for loop and creating elements)
//then once you make your new function, run it when the page loads