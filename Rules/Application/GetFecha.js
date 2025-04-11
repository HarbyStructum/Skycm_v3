/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetFecha(clientAPI) {
    
    let currentDate = new Date();
    return currentDate.toISOString().split('T')[0]; // Retorna la fecha en formato YYYY-MM-DD

}
