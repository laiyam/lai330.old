const weather = {};
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind p");
const precipitationElement = document.querySelector(".precipitation p");
const heatIndexElement = document.querySelector(".heatIndex p");
const visibilityElement = document.querySelector(".visibility p");
const fcNameElement = document.querySelector(".forecastName p");
const fcTempElement = document.querySelector(".forecastTemperature p");
const fcWindElement = document.querySelector(".forecastWindSpeed p");
const fcShortElement = document.querySelector(".forecastShort p");



weather.temperature = {
    unit : "fahrenheit"
}
	
// Check if browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// Set coonkies and user location
function setPosition(position){
	let latitude = position.coords.latitude.toFixed(4);
    let longitude = position.coords.longitude.toFixed(4);
	document.cookie="latitude";
    document.cookie="longitude";
    
    getWeather(latitude, longitude);
	
}

// Show error on geolocation service 
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get API from weather.gov, it is not great but free and no key
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
		
		//Get current weather information and forecast server urls
		getObservation(observationStationsUrl, currLocation);
		//getforecast(forecastUrl);

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
			let stations = response.json();
			console.log(stations);
			return stations;
		})
		.then(function(stations) {
			let stationUrl = stations.observationStations[0]+"/observations/current";
			console.log(stationUrl);

			getCurrent(stationUrl, currLocation);
			return stationUrl, currLocation;
		})
	
}

//Get current weather temperature and icon from near station
function getCurrent(stationUrl, currLocation) {
	fetch(stationUrl)
        .then(function(response){
            let data = response.json();
			console.log(data);
            return data;
        })
        .then(function(data){
			console.log(data.properties.temperature.value);
			weather.temperature.value = Math.floor((data.properties.temperature.value) * 9/5 + 32);
			console.log(weather.temperature.value);
            weather.description = data.properties.textDescription;
			console.log(weather.description);
			weather.iconUrl = data.properties.icon.replace("medium", "large");
			console.log(weather.iconUrl);
			document.body.style.backgroundImage = `url(${weather.iconUrl})`;

			weather.windDegree = data.properties.windDirection.value;
			console.log(weather.windDegree);
			weather.windDirection = getWindDirection(weather.windDegree);
			console.log(weather.windDirection);
			weather.wind = "Wind: "+weather.windDirection+", "+((data.properties.windSpeed.value)/1.069).toFixed(2)+" mph";
			console.log(weather.wind);
			weather.precipitation = "Last Hour Precipitation: "+((data.properties.precipitationLastHour.value)/39.37).toFixed(2)+" in";
			console.log(weather.precipitation);
			weather.humidity = "Humidity: "+Math.floor(data.properties.relativeHumidity.value)+"%";
			console.log(weather.humidity);
			weather.heatIndex = "Heat Index: "+Math.floor((data.properties.heatIndex.value) * 9/5 + 32)+ "°F";
			console.log(weather.heatIndex);
            weather.visibility = "Visibility: "+((data.properties.visibility.value)/1609).toFixed(2)+" mi";
			console.log(weather.visibility);
            weather.city = currLocation;
			console.log(weather.city);
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
			weather.forecastWindSpeed = "Wind Speed: "+forecast.properties.periods[0].windSpeed;
			console.log(weather.forecastWindSpeed);
            weather.forecastShort = forecast.properties.periods[0].shortForecast;
			console.log(weather.forecastShort);
			weather.detailedForecast = forecast.properties.periods[0].detailedForecast;
			console.log(weather.detailedForecast);
		})
		
		.then(function(){
            displayToday();
    });

}

//Display today's forecast to html
function displayToday(){
    //fcNameElement.innerHTML = weather.forecastName;
    //fcTempElement.innerHTML = `${weather.forecastTemperature}°<span>F</span>`;
	//console.log(weather.forecastWindSpeed);
	//fcWindElement.innerHTML = `${weather.forecastWindSpeed}`;
	//fcShortElement.innerHTML = weather.forecastShort;
}

//Display next days forecast
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

//Display hourly forecast
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



// Display temperature and icon in html
function displayWeather(){
    iconElement.innerHTML = `<img src=${weather.iconUrl}>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
    descElement.innerHTML = weather.description;
	locationElement.innerHTML = `${weather.city}`;

	windElement.innerHTML = weather.wind;
	precipitationElement.innerHTML = weather.precipitation;
	humidityElement.innerHTML = weather.humidity;
	heatIndexElement.innerHTML = weather.heatIndex;
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