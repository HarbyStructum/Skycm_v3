/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function searchCustom(clientAPI) {
    var dialog = clientAPI.nativescript.uiDialogsModule;
    let pernr = clientAPI.evaluateTargetPath("#Page:MenuConsultas/#Control:fc_pernr/#Value")
    
    // Obtener el texto de búsqueda
    let searchString = clientAPI.searchString || ''; 
    
    // Crear el constructor de consulta
    let qob = clientAPI.dataQueryBuilder();
    
    // Establecer el código predeterminado - por ejemplo, mostrar solo registros activos
    let defaultFilter = `PERNR eq '${pernr}'`;
    
    if (!searchString) {
        // Si no hay texto de búsqueda, aplicar solo el filtro predeterminado
        qob.filter(defaultFilter);
        return qob;
    }
    
    // Convertir el texto de búsqueda a mayúsculas
    let upperCaseSearch = searchString.toUpperCase();
    
    // Filtro para buscar registros del vendedor
    // Asumiendo que hay un campo 'Vendedor' en tus datos
    let vendedorSearch = qob.filterTerm(`contains(MATNR, '${upperCaseSearch}')`);
    
    // Combinar el filtro predeterminado con la búsqueda del vendedor
    qob.filter().and(defaultFilter, vendedorSearch);

     
    //dialog.alert({qob})
    
    return qob;
}
