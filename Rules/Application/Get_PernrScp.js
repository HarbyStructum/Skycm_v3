export default function Get_PernrScp(context) {
    var dialog = context.nativescript.uiDialogsModule;
    let clientData = context.evaluateTargetPathForAPI('#Page:GestionVisitas').getClientData();
    let id = context.evaluateTargetPath("#Application/#ClientData/#Property:UserId");

    if (id) {
        var pernr2 = id.toUpperCase();
        

        return context.read('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'VENDORINFO', [], `$filter=USRID eq '${pernr2}'`)
            .then((results) => {
                if (results && results.length > 0) {
                    let prod = results.getItem(0);
                    var pernr_scp = prod.PERNR_SCP;
                    //dialog.alert(pernr_scp);
                    return pernr_scp
                } else {
                    console.log("no se hizo la consulta");
                    return "n/a";
                }
            })
            .catch((error) => {
                console.error('Error during read: ', error);
                return "n/e";
            });
    } else {
        console.log("User ID is not defined");
        return 0;
    }
}
