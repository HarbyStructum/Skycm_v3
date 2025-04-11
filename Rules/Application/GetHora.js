/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetHora(clientAPI) {
    let currentTime = new Date();
    return currentTime.toTimeString().split(' ')[0]; // Retorna solo la hora, minuto y segundo
}
