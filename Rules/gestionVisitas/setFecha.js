/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function setFecha(context) {
    let sectiontable = context.getPageProxy().getControl('SectionedTable0');
    let sectionCell = sectiontable.getSection("SectionObjectTable0");
    
    const fecha = new Date();
    const anio = fecha.getFullYear(); // Retorna el año completo
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    const fechaFormateada = `${anio}-${mes}-${dia}`;

    let qo = `$filter=FECHA eq '${fechaFormateada}'`;
    let pickspec = sectionCell.getTargetSpecifier();
    pickspec.setQueryOptions(qo);
    sectionCell.setTargetSpecifier(pickspec);

    sectionCell.redraw();
}
