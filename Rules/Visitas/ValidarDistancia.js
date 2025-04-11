import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core";

export default function validardistancia(clientAPI) {
    let dialogs = clientAPI.nativescript.uiDialogsModule;
    let logger = clientAPI.getLogger();
    let distancia = '';

    console.log("Current Log Level: " + logger.getLevel());

    let lati = parseFloat(clientAPI.evaluateTargetPath('#Page:VisitaClienteConfirmar/#Control:fc_LatitudCliente/#Value'));
    let longi = parseFloat(clientAPI.evaluateTargetPath('#Page:VisitaClienteConfirmar/#Control:fc_longitudCliente/#Value'));

    return geolocation.isEnabled().then((enabled) => {
        if (!enabled) {
            return geolocation.enableLocationRequest();
        }
    }).then(() => {
        return geolocation.getCurrentLocation({
            desiredAccuracy: CoreTypes.Accuracy.high,
            updateDistance: 1,
            timeout: 11000
        });
    }).then((loc) => {
        if (loc) {
            clientAPI.executeAction('/Skycm_v3/Actions/Visitas/pro_calculando_distancia.action');

            let calculaDistancia = () => {
                let graRad = (grados) => (grados * Math.PI) / 180;

                // Conversión de coordenadas a radianes
                let lat1 = graRad(loc.latitude);
                let lon1 = graRad(loc.longitude);

                let lat2 = graRad(lati);
                let lon2 = graRad(longi);

                // Diferencias de latitud y longitud
                let dLat = lat2 - lat1;
                let dLon = lon2 - lon1;

                // Fórmula del Haversine
                let a = Math.sin(dLat / 2) ** 2 +
                        Math.cos(lat1) * Math.cos(lat2) *
                        Math.sin(dLon / 2) ** 2;

                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                let R = 6371000; // Radio de la Tierra en metros

                let distancia = R * c; // Distancia en metros

                return distancia.toFixed(2); // Retorna la distancia con dos decimales
            };

            distancia = calculaDistancia();
            console.log(`Distancia calculada: ${distancia} m`);

            if (distancia <= 10000) {
                // Permitir realizar check-in
                return clientAPI.executeAction('/Skycm_v3/Actions/Visitas/ProgressCrearVisita.action');
            } else {
                // Impedir realizar check-in y pedir justificación
                return dialogs.confirm({
                    title: "¡Ubicación Fuera de Rango!",
                    message: `Indique el motivo, distancia del cliente: (${distancia} m)`,
                    okButtonText: "Motivos ->"
                }).then((respuesta) => {
                    if (respuesta) {
                        return clientAPI.executeAction('/Skycm_v3/Actions/Visitas/nav_justificacionGeo.action');
                    }
                });
            }
        }
    }).catch((error) => {
        console.error('Error:', error);
        logger.log('Error: ' + error.message, 'ERROR');
    });
}

