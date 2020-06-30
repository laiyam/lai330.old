/*We will be fetching data from an external API using fetch. All of the data we will be requesting will be in the JSON format*/
export function getJSON(url) {
  return fetch(url)
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

/*Below you will find a simple "Promisefied" version of the method to return the current location of the user.*/
export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};