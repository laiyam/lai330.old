const weather = {};
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location h3");
const notificationElement = document.querySelector(".notification");
const humidityElement = document.querySelector(".humidity p");
const windElement = document.querySelector(".wind p");
const precipitationElement = document.querySelector(".precipitation p");
const heatIndexElement = document.querySelector(".heatIndex p");
const windChillElement = document.querySelector(".windChill p");
const visibilityElement = document.querySelector(".visibility p");

weather.temperature = {
    unit : "fahrenheit"
}

//check geolocation cookies
var x = getCookie("latitude");
var y = getCookie("longitude");
console.log(x);
console.log(y);
if (x != "" && y != "") {
  getWeather(x, y);
} else {
  if('geolocation' in navigator){
	  navigator.geolocation.getCurrentPosition(setPosition, showError);
  }else{
	  notificationElement.style.display = "block";
	  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
  }
}

//Read cookies
function getCookie(cPosition) {
var location = cPosition + "=";
console.log(location);
var decodedCookie = decodeURIComponent(document.cookie);
console.log(decodedCookie);
var ca = decodedCookie.split(';');
console.log(ca);
for(var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') {
	c = c.substring(1);
	console.log(c);
  }
  if (c.indexOf(location) == 0) {
	return c.substring(location.length, c.length);
	console.log(`c.substring(location.length, c.length)`);
  }
}
return "";
}

// Set geolocation cookies
function setPosition(position){
	var x = position.coords.latitude.toFixed(4);
	var y = position.coords.longitude.toFixed(4);
	console.log(x, y);
	setCookie("latitude", x, 1);
	setCookie("longitude", y, 1);
    getWeather(x, y);
}

function setCookie(cPosition, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cPosition + "=" + cvalue + "; " + expires + "; path-/";
	console.log(cPosition + "=" + cvalue + "; " + expires + "; path-/");
}


// Show error on geolocation service 
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}


//Greetings
var date = new Date();
var nowTime = date.toDateString();
var now = document.getElementsByClassName("todayTime");
 now[0].innerHTML = nowTime;
var hrs24 = date.getHours();
var hrs12 = (date.getHours())%12;
console.log(hrs24);
var mins = date.getMinutes();
console.log(mins);

var greet;
if (hrs24 < 12)
	greet = "Good Morning";
	else if (hrs24 >= 12 && hrs24 <= 17)
		greet = "Good Afternoon";
	else if (hrs24 >= 17 && hrs24 <= 24)
		greet = "Good Evening";



// Get API from weather.gov, it is not great but free and no key
function getWeather(latitude, longitude){
	let api = `https://api.weather.gov/points/${latitude},${longitude}`;
	//let api = `https://api.weather.gov/points/39.9744,-75.0314`;
	 console.log(api);
    
    fetch(api)
        .then(function(response){
			if (!response.ok) {
				throw Error("ERROR");
			}
            let urls = response.json();
			console.log(urls);
            return urls;
        })
        .then(function(urls){
			let observationStationsUrl = urls.properties.observationStations;
			//let observationStationsUrl = `https://api.weather.gov/gridpoints/PHI/53,76/stations`;
			console.log(observationStationsUrl);
			let forecastUrl = urls.properties.forecast;
			//let forecastUrl = `https://api.weather.gov/gridpoints/PHI/53,76/forecast`;
			console.log(forecastUrl);
			let forecastHourly = urls.properties.forecastHourly;
			//let forecastHourly = `https://api.weather.gov/gridpoints/PHI/53,76/forecast/hourly`;
			console.log(forecastHourly);
			let currLocation = greet+ " " +urls.properties.relativeLocation.properties.city;
			//let currLocation = greet+ ", Merchantville!";
			console.log(currLocation);
		
		//Get current weather information and forecast server urls
		getObservation(observationStationsUrl, currLocation);
		
		//Get Forecasts
		getForecast(forecastUrl);

		})

		.catch( err => {
			err.text().then( errorMessage => {
			  this.props.dispatch(displayTheError(errorMessage))
			})
		})
}

// Get current weather server url
function getObservation(observationStationsUrl, currLocation) {
	console.log(observationStationsUrl);
	fetch(observationStationsUrl)
		.then(function(response) {
			if (!response.ok) {
				throw Error("ERROR");
			}
			let stations = response.json();
			console.log(stations);
			return stations;
		})
		.then(function(stations) {
			let stationUrl = stations.observationStations[0]+"/observations/current";
			//let stationUrl = `https://api.weather.gov/stations/KPNE/observations/current`;
			console.log(stationUrl);

			getCurrent(stationUrl, currLocation);
			return stationUrl, currLocation;
		})
		.catch( err => {
			err.text().then( errorMessage => {
			  this.props.dispatch(displayTheError(errorMessage))
			})
		})
	
}

//Get current weather temperature and icon from near station
function getCurrent(stationUrl, currLocation) {
	fetch(stationUrl)
        .then(function(response){
			if (!response.ok) {
				throw Error("ERROR");
			}
            let data = response.json();
			console.log(data);
            return data;
        })
		
		.then(data => {
			console.log(data.properties.temperature.value);
			if (data.properties.temperature.value == null) {
				weather.temperature = "--";
			} else { weather.temperature.value = Math.floor((data.properties.temperature.value) * 9/5 + 32);}
			console.log(weather.temperature.value);
            weather.description = data.properties.textDescription;
			console.log(weather.description);
			weather.iconUrl = data.properties.icon.replace("medium", "large");
			console.log(weather.iconUrl);
			//Make a wall paper
			document.body.style.backgroundImage = `url(${weather.iconUrl})`;
			//document.body.style.background = "#FFF cover no-repeat center";
			//var bkImage = document.getElementsByClassName("bg-img");
			//document.bkImage.style.backgroundImage = `url(${weather.iconUrl})`;
			weather.windDegree = data.properties.windDirection.value;
			console.log(weather.windDegree);
			weather.windDirection = getWindDirection(weather.windDegree);
			console.log(weather.windDirection);
			weather.wind = "Wind: "+((data.properties.windSpeed.value)/1.069).toFixed(2)+" mph "+weather.windDirection;
			console.log(weather.wind);
			weather.precipitation = "Last Hour Precipitation: "+((data.properties.precipitationLastHour.value)/39.37).toFixed(2)+" in";
			console.log(weather.precipitation);
			if (data.properties.relativeHumidity.value == null) {
				weather.humidity = "Humidity: --";
			} else { weather.humidity = "Humidity: "+Math.floor(data.properties.relativeHumidity.value)+"%";}
			console.log(weather.humidity);
			if (data.properties.heatIndex.value == null) {
				weather.heatIndex = "Heat Index: --";
			} else { weather.heatIndex = "Heat Index: "+Math.floor((data.properties.heatIndex.value) * 9/5 + 32)+ "°F";}
			console.log(weather.heatIndex);
			if (data.properties.windChill.value == null) {
				weather.windChill = "Wind Chill: --";
			} else { weather.windChill = "Wind Chill: "+Math.floor((data.properties.windChill.value) * 9/5 + 32)+ "°F";}
			console.log(weather.windChill);
            weather.visibility = "Visibility: "+((data.properties.visibility.value)/1609).toFixed(2)+" mi";
			console.log(weather.visibility);
            weather.city = currLocation;
			console.log(weather.city);
		})

		.catch( err => {
			err.text().then( errorMessage => {
			  this.props.dispatch(displayTheError(errorMessage))
			})
		})
	
	//Call display function
	.then(function(){
        displayWeather();
    });
	
}

//Get wind direction
function getWindDirection(deg) {
	
		if (deg>11.25 && deg<33.75){
		  return "NNE";
		}else if (deg>33.75 && deg<56.25){
		  return "ENE";
		}else if (deg>56.25 && deg<78.75){
		  return "E";
		}else if (deg>78.75 && deg<101.25){
		  return "ESE";
		}else if (deg>101.25 && deg<123.75){
		  return "ESE";
		}else if (deg>123.75 && deg<146.25){
		  return "SE";
		}else if (deg>146.25 && deg<168.75){
		  return "SSE";
		}else if (deg>168.75 && deg<191.25){
		  return "S";
		}else if (deg>191.25 && deg<213.75){
		  return "SSW";
		}else if (deg>213.75 && deg<236.25){
		  return "SW";
		}else if (deg>236.25 && deg<258.75){
		  return "WSW";
		}else if (deg>258.75 && deg<281.25){
		  return "W";
		}else if (deg>281.25 && deg<303.75){
		  return "WNW";
		}else if (deg>303.75 && deg<326.25){
		  return "NW";
		}else if (deg>326.25 && deg<348.75){
		  return "NNW";
		}else{
		  return "N"; 
		}
	  
}

//Get today's forecast
function getForecast(forecastUrl) {
	fetch(forecastUrl) 
		.then(function(response) {
			if (!response.ok) {
				throw Error("ERROR");
			}
			let forecast = response.json();
			console.log(forecast);
			return forecast;
		})
		.then(forecast => {
			console.log(forecast.properties.periods);
			var html = forecast.properties.periods
				.map(period => {
					//console.log(period.detailedForecast);
					return `
					<div class="forecast">
						<div class="forecastDetails">
							<span>${period.detailedForecast}</span>
						</div>
						<div class="forecastName">
							<p>${period.name}</p>
						</div>
						<div class="forecastIcon">
							<img src=${period.icon} width="90%" height="90%">
						</div><br>
						<div class="forecastTemperature">
							<p>${period.temperature} °F</p>
						</div>
						<div class="forecastWindSpeed">
							<p>${period.windSpeed} ${period.windDirection}</p>
						</div>
						<div class="forecastShort">
							<p>${period.shortForecast}</p>
						</div>
					</div>`;
				})
				.join("");
				//console.log(html);
				document
					.querySelector("#periods")
					.insertAdjacentHTML("afterbegin", html);
		})
		.catch(error => {
			//error().then( errorMessage => {
				console.log(error);
			  	this.props.dispatch(displayTheError(errorMessage))
		})
	
}

// Display temperature and icon in html
function displayWeather(){
    iconElement.innerHTML = `<img src=${weather.iconUrl}>`;
    tempElement.innerHTML = `${weather.temperature.value}<span>°F</span>`;
	descElement.innerHTML = `${weather.description}`;
	console.log(`${weather.city}`);
	locationElement.innerHTML = `${weather.city}`;

	windElement.innerHTML = weather.wind;
	precipitationElement.innerHTML = weather.precipitation;
	humidityElement.innerHTML = weather.humidity;
	heatIndexElement.innerHTML = weather.heatIndex;
	windChillElement.innerHTML = weather.windChill;
	visibilityElement.innerHTML = weather.visibility;
}


// F to C conversion (for some reasons, some servers output temperature in celsius)
function fahrenheitToCelsius(temperature){
	return (temperature-32)*5/9;
}

// Onclick to switch between fahrenheit and celsius
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
