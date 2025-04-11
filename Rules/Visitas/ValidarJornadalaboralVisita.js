/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidarJornadalaboral(context) {
    let pernr_scp = context.evaluateTargetPath("#Application/#AppData/UserId");
    //var dialog = context.nativescript.uiDialogsModule;
    
	return context.count('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'WORKDAY', `$filter=ESTADO eq 'ACTIVO' and EMAIL_VEND eq '${pernr_scp}'`).then((count) => {
		context.getPageProxy().getClientData().EquipmentTotalCount = count;
		// If “Customers” Entity set is availale, then it return the total customers
		if(count > 0){
			//dialog.alert(pernr_scp)
            return true
		}else{
			return context.executeAction('/Skycm_v3/Actions/Visitas/msj_AdvertenciaVisitarCliente.action')
		}
	});
}
