import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core";

export default function Geo(clientAPI) {
	var lati,longi;
	lati = clientAPI.evaluateTargetPath('#Control:fc_latitud');
	longi = clientAPI.evaluateTargetPath('#Control:fc_longitud');
    
    var logger = clientAPI.getLogger();
    console.log("ingrese a la georreferenciacion");
    console.log("Current Log Level: " + logger.getLevel());

    return geolocation.enableLocationRequest().then(() => {
        geolocation.getCurrentLocation({
            desiredAccuracy: CoreTypes.Accuracy.high,
            maximumAge: 5000,
            timeout: 20000,
        })
        .then((currentLocation) => {
            console.log('My current latitude: ', currentLocation.latitude);
            console.log('My current longitude: ', currentLocation.longitude);
            var lt = currentLocation.latitude;
            var lg = currentLocation.longitude
			lati.setValue(lt.toString());
			longi.setValue(lg.toString()); // Added longitude for more completeness
        })
        .catch((error) => {
            console.error('Error getting location: ', error);
        });
    })
    .catch((error) => {
        console.error('Error enabling location request: ', error);
    });
}

