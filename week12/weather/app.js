// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const fcNameElement = document.querySelector(".forecastName p");
const fcTempElement = document.querySelector(".forecastTemperature p");
const fcWindElement = document.querySelector(".forecastWindSpeed p");
const fcShortElement = document.querySelector(".forecastShort p");


// App data
const weather = {};

weather.temperature = {
    unit : "fahrenheit"
}


/*function checkCookie() {
  var username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}*/
	
// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    //let latitude = position.coords.latitude.toFixed(4);
    //let longitude = position.coords.longitude.toFixed(4);
	let latitude = position.coords.latitude.toFixed(4);
    let longitude = position.coords.longitude.toFixed(4);
	document.cookie="latitude";
    document.cookie="longitude";
    
    getWeather(latitude, longitude);
	
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `https://api.weather.gov/points/${latitude},${longitude}`;
	 console.log(api);
    
    fetch(api)
        .then(function(response){
            let urls = response.json();
			console.log(urls);
            return urls;
        })
        .then(function(urls){
			let observationStationsUrl = urls.properties.observationStations;
			console.log(observationStationsUrl);
			let forecastUrl = urls.properties.forecast;
			console.log(forecastUrl);
			let forecastHourly = urls.properties.forecastHourly;
			console.log(forecastHourly);
			let currLocation = urls.properties.relativeLocation.properties.city+ ", "+urls.properties.relativeLocation.properties.state;
			console.log(currLocation);
			
			//return weather.observationStationsUrl;
            //weather.temperature.value = Math.floor(data.main.temp - KELVIN);;
            //weather.description = data.weather[0].description;
            //weather.iconId = data.weather[0].icon;
            //weather.city = data.name;
            //weather.country = data.sys.country;
        
		getObservation(observationStationsUrl, currLocation);
		getforecast(forecastUrl);
		//let currStation = stationUrl;
		//	console.log(stationUrl);
		
		//getDaysForecast(forecastUrl);
		//getHoursForecast(forecastHourly);
		})
	
        
}

function getObservation(observationStationsUrl, currLocation) {
	console.log(observationStationsUrl);
	fetch(observationStationsUrl)
		.then(function(response) {
			let stations = response.json();
			console.log(stations);
			return stations;
		})
		.then(function(stations) {
			let stationUrl = stations.observationStations[0]+"/observations/current";
			console.log(stationUrl);
			//const stationName = stations.properties.name;
			//console.log(stationName);
			
			getCurrent(stationUrl, currLocation);
			return stationUrl, currLocation;
		})
	
}

function getCurrent(stationUrl, currLocation) {
	fetch(stationUrl)
        .then(function(response){
            let data = response.json();
			console.log(data);
            return data;
        })
        .then(function(data){
			console.log(data.properties.temperature.value);
            //weather.temperature.value = ((data.properties.temperature.value) * 9/5 + 32).toFixed(1);
			weather.temperature.value = Math.floor((data.properties.temperature.value) * 9/5 + 32);
			console.log(weather.temperature.value);
            weather.description = data.properties.textDescription;
			console.log(weather.description);
            //weather.iconUrl = data.properties.icon;
			weather.iconUrl = data.properties.icon.replace("medium", "large");
			console.log(weather.iconUrl);
			//weather.altName = data.properties.presentWeather[1].weather;
			//console.log(weather.altName);
            weather.city = currLocation;
			console.log(weather.city);
            //weather.country = data.sys.country;
        })
	
	.then(function(){
            displayWeather();
    });
	
}


function getforecast(forecastUrl) {
	fetch(forecastUrl)
		.then(function(response) {
			let forecast = response.json();
			console.log(forecast);
			return forecast;
		})
		.then(function(forecast) {
			console.log(forecast.properties.periods[0].name);
			weather.forecastName = forecast.properties.periods[0].name;
			console.log(weather.forecastName);
			weather.forecastTemperature = forecast.properties.periods[0].temperature;
			console.log(weather.forecastTemperature);
			//weather.forecastIcon = forecast.properties.periods[0].icon;
			//console.log(weather.forecastIcon);
			weather.forecastWindSpeed = forecast.properties.periods[0].windSpeed;
			console.log(weather.forecastWindSpeed);
            weather.forecastShort = forecast.properties.periods[0].shortForecast;
			console.log(weather.forecastShort);
			weather.detailedForecast = forecast.properties.periods[0].detailedForecast;
			console.log(weather.detailedForecast);
		})
		
		.then(function(){
            displayToday();
    });
		
		
/*		data = this.responseText;
			localStorage.setItem("stgData", data);						//Storing data
			stgjsont = localStorage.getItem("stgData");					//Retrieving data
			obj = JSON.parse(stgjsont);
			console.log(obj);
		
				
//Display objects from array using methods
			msg = "<h2>" + greet + "<br>" + obj.observations[0].neighborhood + "</h2><h3>Temperture: " +
			obj.observations[0].imperial.temp + " &#8457<br>Humidity: " +
			obj.observations[0].humidity + " %<br>Wind Speed: " +
			document.getElementById("weather").innerHTML = msg;
			};
		};*/

}

function displayToday(){
    fcNameElement.innerHTML = weather.forecastName;
    fcTempElement.innerHTML = `${weather.forecastTemperature}°<span>F</span>`;
	console.log(weather.forecastWindSpeed);
	fcWindElement.innerHTML = `${weather.forecastWindSpeed}`;
    fcShortElement.innerHTML = weather.forecastShort;
}


function getDaysForecast(forecastUrl) {
	fetch(forecastUrl)
		.then(function(response) {
			let forecast = response.json();
			console.log(weather.forecast);
			return forecast;
		})
		.then(function() {
			
		})
}
	
function getHoursForecast(forecastHourly) {
	fetch(forecastHourly) 
		.then(function(response) {
			let forecastHourly = response.json();
			console.log(forecastHourly);
			return forecastHourly;
		})
		.then(function() {
			
		})
}



// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src=${weather.iconUrl}>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}`;
}


// F to C conversion
function fahrenheitToCelsius(temperature){
    //return ((temperature-32)*5/9);
	return (temperature-32)*5/9;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
	console.log(weather.temperature.value);
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "fahrenheit"){
		console.log(weather.temperature.unit);
        let celsius = fahrenheitToCelsius(weather.temperature.value);
        celsius = Math.floor(celsius);
		console.log(celsius);
        
        tempElement.innerHTML = `${celsius}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit"
    }
	
	

	
	
	
	
});

