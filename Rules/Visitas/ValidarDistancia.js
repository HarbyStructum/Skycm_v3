import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core";

export default function validardistancia(clientAPI) {
    let dialogs = clientAPI.nativescript.uiDialogsModule;
    let logger = clientAPI.getLogger();

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
        if (loc && loc.latitude && loc.longitude) {
            clientAPI.executeAction('/Skycm_v3/Actions/Visitas/pro_calculando_distancia.action');

            // Debug: imprimir coordenadas actuales y del cliente
            console.log(`Ubicación actual: (${loc.latitude}, ${loc.longitude})`);
            console.log(`Ubicación cliente: (${lati}, ${longi})`);

            let calculaDistancia = () => {
                let graRad = (grados) => (grados * Math.PI) / 180;

                let lat1 = graRad(loc.latitude);
                let lon1 = graRad(loc.longitude);
                let lat2 = graRad(lati);
                let lon2 = graRad(longi);

                let dLat = lat2 - lat1;
                let dLon = lon2 - lon1;

                let a = Math.sin(dLat / 2) ** 2 +
                        Math.cos(lat1) * Math.cos(lat2) *
                        Math.sin(dLon / 2) ** 2;

                let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                let R = 6371000; // Radio de la Tierra en metros

                return R * c; // Retorna en metros
            };

            let distanciaNum = calculaDistancia();
            let distancia = distanciaNum.toFixed(2);

            console.log(`Distancia calculada: ${distancia} m`);

            if (distanciaNum <= 10000) {
                return clientAPI.executeAction('/Skycm_v3/Actions/Visitas/CreateVisita.action');
            } else {
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