/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Rest_Cartera(context) {
    var dialog = context.nativescript.uiDialogsModule;
//	let pageProxy = context.getPageProxy('#Page:DetallePedido');
	
	var actionResult = context.getActionResult("ResultRest");
	var resultado = actionResult.data;
	//dialog.alert(JSON.stringify(resultado));
	//var error = resultado.T_Mensaje.TipoMsj;
	var errorTextoMensaje= resultado.texto_msj

     	var message = ` ¡${errorTextoMensaje}!`;
		return context.executeAction({
			"Name": "/Skycm_v3/Actions/Consultas/msj_InventarioNoExiste.action",
			"Properties": {
				"Message": message
			}
		});
	
}
