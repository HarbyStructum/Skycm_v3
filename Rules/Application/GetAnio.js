/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetAnio(clientAPI) {

    const fechaActual = new Date(); // Obtiene la fecha actual
    const anio = fechaActual.getFullYear(); // Obtiene el año completo
    return anio.toString();
    
}
