/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidarConsultaSociedad(clientAPI) {
    var sociedad = clientAPI.evaluateTargetPath("#Page:MenuConsultas/#Control:fc_sociedad/#Value")
    
    var pageProxy = clientAPI.getPageProxy();
    var dialog = clientAPI.nativescript.uiDialogsModule;
    var namePage = pageProxy._page.id;

    var raiz = "/Skycm_v3/Actions/Consultas/rest/";
    var RestCol = "";
    var RestPaises = "";
    
    switch (namePage) {
        case "ConsultaInventario":
            RestCol = raiz + "afs/Rest_Inventario.action";
            RestPaises = raiz + "paises/Rest_inventario_pais.action";
            break;
        case "ConsultaCartera":
            RestCol = raiz + "afs/Rest_Cartera.action"; 
            RestPaises = raiz + "paises/Rest_CarteraPaises.action";
            break;
        case "ConsultaPedido":
            RestCol = raiz + "afs/Rest_Pedidos.action";
            RestPaises = raiz + "paises/Rest_PedidoPaises.action";
            break;

    }
    
    if(sociedad == '1000' || sociedad == '2000' ){
    	//dialog.alert("colombia" + sociedad);
        //dialog.alert(namePage + " - Colombia - " + RestCol)
        return clientAPI.executeAction(RestCol)
    }else{
        //dialog.alert(namePage + " - Paises - " + RestPaises)
        //dialog.alert("paises" + sociedad);
        return clientAPI.executeAction(RestPaises)
    }

}
