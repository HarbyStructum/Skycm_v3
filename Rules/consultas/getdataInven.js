 /**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function getdataCliente(context) {
    var matnr = context.getPageProxy().evaluateTargetPath("#Control:fc_referencias/#SelectedValue");
    var invent = context.getPageProxy().evaluateTargetPath("#Control:fc_invent");

    return context.read('/Skycm_v3/Services/Online_skycm.service', 'INVENTARIO', [], `$filter=MATNR eq '${matnr}'`)
        .then((results) => {
            if (results && results.length > 0) {
                var prod = results.getItem(0);
                if (prod.PROVG) { 
                    invent.setValue(prod.PROVG);
                    invent.setVisible(true);
                }else{
                    invent.setVisible(false);
                    invent.setValue('')
                }
                return 1; // Indica éxito
            } else {
                console.log("No se encontraron datos para el cliente.");
                return 0; // Indica fallo o ausencia de datos
            }
        })
        .catch(error => {
            console.error("Error al leer la información del cliente:", error);
            return 0; // Manejo de errores
        });
}

