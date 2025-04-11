export default function getPernr(context) {
    let id = context.evaluateTargetPath("#Application/#ClientData/#Property:UserId");

    if (id) {
        var correo = id.toUpperCase();
        return context.read('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'VENDORINFO', [], `$filter=USRID eq '${correo}'`)
            .then((results) => {
                if (results && results.length > 0) {
                    let prod = results.getItem(0);
                    return prod.PERNR_SCP;
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
