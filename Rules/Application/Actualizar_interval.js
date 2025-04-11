/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Actualizar_interval(context) {
	setInterval (function () {context.executeAction ('/Skycm_v3/Rules/Application/ValidarCambios.js');}, 150000);
}
