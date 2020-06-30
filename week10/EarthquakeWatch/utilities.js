
// getJSON function
function getJSON("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-06-22&endtime=2020-06-23") {
    return fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-06-22&endtime=2020-06-23")
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}


// Receive a certain radius of our current location
const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};

// Export the utilities
export function getJSON(url) { ...
    export const getLocation = function(options){ ...