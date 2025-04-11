/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GetMes(clientAPI) {

    const fechaActual = new Date(); // Obtiene la fecha actual
    const mes = fechaActual.getMonth() + 1; // getMonth() es base 0; añade 1 para obtener el mes correcto
    const mesConDosDigitos = mes.toString().padStart(2, '0'); // Asegura dos dígitos
    return mesConDosDigitos;

}
