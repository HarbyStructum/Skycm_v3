
export default function CerrarVisita(context) {

    let dialog = context.nativescript.uiDialogsModule;  

    let idVisita = context.evaluateTargetPath("#Page:DetalleVisitaActiva/#Control:FC_idvisitadetalle/#Value");
    let kunnr = context.evaluateTargetPath("#Page:DetalleVisitaActiva/#Control:fc_Kunnr/#Value");

    if (!idVisita || !kunnr) {
        return dialog.alert("Faltan datos clave para cerrar la visita.");
    }

    let sNewReadLink = `HISTV(ID_VISITA='${idVisita}',KUNNR='${kunnr}')`;

    return context.executeAction({
        "Name": "/Skycm_v3/Actions/Visitas/TerminarVisitaActiva.action",
        "Properties": {
            "Target": {
                "ReadLink": sNewReadLink
            }
        }
    });
}
