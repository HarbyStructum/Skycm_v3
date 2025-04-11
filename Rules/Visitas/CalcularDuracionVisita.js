/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CalcularDuracionVisita(context) {

    // Obtener los valores de las horas de inicio y fin
    var HoraInicio = context.evaluateTargetPath('#Page:DetalleVisitaActiva/#Control:Fc_horainicio/#Value');
    var HoraFin = context.evaluateTargetPath('#Page:DetalleVisitaActiva/#Control:fc_horafin/#Value');

    // Convertir las horas de inicio y fin en minutos
    let parteIni = HoraInicio.split(":");
    let minutosInicio = parseInt(parteIni[0], 10) * 60 + parseInt(parteIni[1], 10);

    let parteFin = HoraFin.split(":");
    let minutosFin = parseInt(parteFin[0], 10) * 60 + parseInt(parteFin[1], 10);
    
    // Calcular la diferencia en minutos
    let diferencia = minutosFin - minutosInicio;

    // Ajustar si la diferencia es negativa (cruce de medianoche)
    if (diferencia < 0) {
        diferencia += 24 * 60;
    }

    // Convertir la diferencia de nuevo a HH:mm:ss
    const horas = Math.floor(diferencia / 60);
    const minutos = diferencia % 60;

    var result = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:00`;

    console.log(result);
    
    return result;
}



