
import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core";
export default function Geo(clientAPI){
	var logger = clientAPI.getLogger();
	
	console.log("Current Log Level: " + logger.getLevel());
	
	if(!geolocation.isEnabled()){
		geolocation.enableLocationRequest();
	}
	return geolocation.getCurrentLocation(
		{
			desiredAccuracy: CoreTypes.Accuracy.high,
			updateDistance: 5,
			timeout: 11000
		}
		).then(function(loc){
			if(loc){
				console.log(loc);
				console.log('\nCurrent Location: (' + loc.latitude + ',' + loc.longitude + ')');
				logger.log(loc.toString());
				
				var locMessage = loc.longitude;
				logger.log('Current Location: ' +locMessage, 'INFO');
				var result = loc.longitude.toString();
				return result;
			}
		}, function(e){
			logger.log(e.message,'ERROR');
		});
}