import QuakesController from '../controllers/QuakesController.js';
import { getJSON, getLocation } from '../js/utilities.js';

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-06-26&endtime=2019-06-27';

const json = getJSON(baseUrl).then(data => console.log(data));

getLocation().then(data => {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    const position = {
        lat: latitude,
        lon: longitude
    }
    console.log(position);
    const quakesController = new QuakesController("#quakeList", position);
    console.log(quakesController);
    quakesController.init();
    quakesController.getQuakesByRadius(500);
});