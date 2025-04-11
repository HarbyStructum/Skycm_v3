/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function getPernr(context) {
    let id = context.evaluateTargetPath("#Application/#ClientData/#Property:UserId");
    let pernr = context.evaluateTargetPath("#Control:fc_pernr");
    let sociedad = context.evaluateTargetPath("#Control:fc_sociedad");



    if (id) {
        var correo = id.toUpperCase();
        return context.read('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'VENDORINFO', [], `$filter=USRID eq '${correo}'`)
            .then((results) => {
                if (results && results.length > 0) {
                    let prod = results.getItem(0);
                    pernr.setValue(prod.PERNR);
                    sociedad.setValue(prod.VKORG == '2001' ? "2000" : prod.VKORG);
                                        
                    return prod.PERNR;
                } else {
                    return 0;
                }
            })
            .catch((error) => {
                console.error('Error during read: ', error);
                return 0;
            });
    } else {
        console.log("User ID is not defined");
        return 0;
    }
}
