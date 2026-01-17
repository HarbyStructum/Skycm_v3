/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValiadarjornadaLaboral(context) {

    let pernr_scp = context.evaluateTargetPath("#Application/#AppData/UserId");
	let fecha = context.evaluateTargetPath("#Page:Main/#Control:FC_fechaini/#Value");
    //var dialog = context.nativescript.uiDialogsModule;
    
	return context.count('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'WORKDAY', `$filter=ESTADO eq 'ACTIVO' and EMAIL_VEND eq '${pernr_scp}' and FECHA eq '${fecha}'`).then((count) => {
		context.getPageProxy().getClientData().EquipmentTotalCount = count;
		// If “Customers” Entity set is availale, then it return the total customers
		if(count > 0){
			//dialog.alert(pernr_scp)
			return context.executeAction('/Skycm_v3/Actions/JornadaLaboral/msj_JornadaLaboralActiva.action')
		}else{
			return true
		}
	});
    
}
