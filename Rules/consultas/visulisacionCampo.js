/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function visualizacion(context) {
    var matnr = context.getPageProxy().evaluateTargetPath("#Page:ConsultaInventario/#Control:fc_invent/#Value");
    let control = context.getPageProxy().getControl("#Control:fc_title");

    if(matnr.length > 0){
        control.setVisible(true);
        return true;
    } else {
        control.setVisible(false);
        return false;
    }
}


