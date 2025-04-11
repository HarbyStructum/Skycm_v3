/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CalcularDuracionJornada(clientAPI) {
    // Obtener las horas de inicio y fin
    let ini = clientAPI.evaluateTargetPath("#Page:DetalleJornadaLaboral/#Control:FCHORAINIDETALLE/#Value");
    let finis = clientAPI.evaluateTargetPath("#Page:DetalleJornadaLaboral/#Control:FC_HORAFINJOR/#Value");

    // Convertir las horas a objetos Date
    let horaInicio = ini.split(":");
    let horaFin = finis.split(":");
    let t1 = new Date();
    let t2 = new Date();

    t1.setHours(horaInicio[0], horaInicio[1], horaInicio[2]);
    t2.setHours(horaFin[0], horaFin[1], horaFin[2]);

    // Calcular la diferencia en milisegundos
    let diferencia = t2 - t1;

    // Convertir la diferencia en horas, minutos y segundos
    let horas = Math.floor(diferencia / (1000 * 60 * 60));
    let minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    let segundos = Math.floor((diferencia / 1000) % 60);

    // Formatear el resultado a hh:mm:ss
    let resultado = (horas < 10 ? "0" + horas : horas) + ":" + (minutos < 10 ? "0" + minutos : minutos) + ":" + (segundos < 10 ? "0" + segundos : segundos);
    console.log("esta es la duracion de la jornada: ", resultado)
    return resultado;
}
