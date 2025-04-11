/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function visibilidad_inventario(clientAPI) {

    var sociedad = clientAPI.evaluateTargetPath("#Control:fc_sociedad/#Value")
	
	switch (sociedad) {
        case "1000":
            return 'Transito :$(N,{Userdet2})'
            break; 
        case "2000":
            return ''
            break;
        case "6000":
            return 'Transito :$(N,{Userdet1})'
            break;

    }
    

}
