/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function BarcodeScanResult(context) {
    var dialog =context.nativescript.uiDialogsModule;
    
    function ejecutar(){
        context.executeAction('/Skycm_v3/Actions/Consultas/chek_referenciainventario.action');
    }
    
    var actionResult = context.getActionResult('BarcodeScanner');
    var scannedResult = actionResult.data;

    const splitString = scannedResult.split(";");
	let referencia = splitString[0].split("-")[0];
	let color = splitString[1];
    
    let Referencia = context.evaluateTargetPath("#Page:ConsultaInventario/#Control:fc_referencias");
    let colorcampo = context.evaluateTargetPath("#Page:ConsultaInventario/#Control:fc_color");
    Referencia.setValue(referencia);
    colorcampo.setValue(color)
    setTimeout(ejecutar, 1501);

}
