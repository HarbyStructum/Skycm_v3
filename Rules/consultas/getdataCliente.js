/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function getdataCliente(context) {
    var kunnr = context.getValue()[0].ReturnValue;
    var sociedad = context.getPageProxy().evaluateTargetPath("#Control:fc_sociedad");
    var pernr = context.getPageProxy().evaluateTargetPath("#Control:FC_PERNR");
    //alert("si se llamo la regla")
    return context.read('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'CLIENTEINFO', [], `$filter=KUNNR eq '${kunnr}'`)
        .then((results) => {
            if (results && results.length > 0) {
                var prod = results.getItem(0);
                sociedad.setValue(prod.BUKRS);
                pernr.setValue(prod.PERNR);
                //alert("si se hace la consulta")
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

