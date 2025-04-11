/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function getdatecalendar(context) {

    let sectiontable = context.getPageProxy().getControl('SectionedTable0');
    let sectionCell = sectiontable.getSection("SectionObjectTable0");
    let fechaString = sectiontable.getSection('SectionCalendar0').getSelectedDate();

    //Convertir la cadena a un objeto Date
    const fecha = new Date(fechaString);

    // Extraer el año, mes y día
    const anio = fecha.getFullYear(); // 2024
    const mes = fecha.getMonth() + 1; // Mes es 0-index, por lo tanto, sumamos 1
    const dia = fecha.getDate(); // 23

    // Asegurar que el mes y el día tengan dos dígitos
    const mesFormateado = mes.toString().padStart(2, '0');
    const diaFormateado = dia.toString().padStart(2, '0');

    // Concatenar para obtener el formato deseado
    const fechaFormateada = `${anio}-${mesFormateado}-${diaFormateado}`;

    let qo = `$filter=FECHA eq '${fechaFormateada}'`;
    let pickspec = sectionCell.getTargetSpecifier();
    pickspec.setQueryOptions(qo);
    sectionCell.setTargetSpecifier(pickspec);

    sectionCell.redraw();

    console.log(fechaFormateada); // 2024-05-23
}
