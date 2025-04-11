
export default function filterinventario(context) {
    let search = context.searchString;
    let qoB = context.dataQueryBuilder();
    let pernr = context.evaluateTargetPath("#Page:MenuConsultas/#Control:fc_pernr/#Value");
    // Filtro por defecto para el campo PERNR
    let pernrFilter = qoB.filterTerm(`PERNR eq '${pernr}'`);

    if (search && search != '') {

        let upperCaseSearch = search.toUpperCase();
        // Filtro dinámico para el campo MATNR utilizando contains y mayúsculas
        let matnrFilter = qoB.filterTerm(`MATNR eq '${upperCaseSearch}'`);
        
        let defaultSearch = qoB.mdkSearch(upperCaseSearch);
        
        // Combinamos los filtros con OR para MATNR y el defaultSearch, y agregamos el filtro PERNR con AND
        qoB.filter().and(pernrFilter).and(qoB.or(matnrFilter, defaultSearch));
    } else {
        // Si no hay búsqueda, simplemente aplicamos el filtro por defecto de PERNR
        qoB.filter(pernrFilter);
    }

    return qoB;
}

