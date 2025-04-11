
export default function InventarioCampos(context) {
    var dialog = context.nativescript.uiDialogsModule;
    var sociedad = context.evaluateTargetPath("#Page:ConsultaInventario/#Control:fc_sociedad/#Value");
	var Prima1 = context.evaluateTargetPath("#Control:FC_librePrima");
	var Prima2 = context.evaluateTargetPath("#Control:FC_transPrima");
    var Mex1 = context.evaluateTargetPath("#Control:FC_transitoMex");
	var precio = context.evaluateTargetPath("#Control:FC_Precio");
    
    //dialog.alert("consultando inventario")
	
    switch (sociedad) {
        case "1000":
            Prima1.setVisible(true);
            Prima2.setVisible(true);
            break;
        case "6000":
            Mex1.setVisible(true);
            break;
        case "5000":
            Mex1.setVisible(true);
            break;    
        case "2000":
            viene.setVisible(true);
            precio.setVisible(true);
            break;    
        default:
            console.log("no hay sociedad");
            break;
    }
}
