/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidarCambios(context) {
    var xhr = new XMLHttpRequest();
	var file = "https://www.google.com/";
	var randomNum = Math.round(Math.random() * 10000);
	var dialog = context.nativescript.uiDialogsModule;

	xhr.open('HEAD', file + "?rand=" + randomNum, true);
	xhr.send();
	xhr.addEventListener("readystatechange", processRequest, false);

	function processRequest(e) {
		
		var provider = context.getODataProvider('/Skycm_v3/Services/Dest_SkyCM_Productivo.service');
		if (xhr.readyState == 4) {
			if (xhr.status >= 200 && xhr.status < 304) {
				
				if (provider.isRequestQueueEmpty() == false) {
					return context.executeAction('/Skycm_v3/Actions/Service/SyncStartedMessage.action');
					
				} else {
				  //dialog.alert("No hay cambios pendientes");
				}

			} else {
                //dialog.alert("No tienes conexion a internet!");
			}
		}
	}
}
