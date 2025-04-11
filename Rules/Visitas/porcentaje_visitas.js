/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default async function porcentaje_visitas(context) {
    const hoy = new Date();
    const mes = ("0" + (hoy.getMonth() + 1)).slice(-2);
    const anio = hoy.getFullYear();

    // Obtener visitas del mes y año actual
    const resultadosVisitas = await context.read('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'HISTV', [], `$filter=MES eq '${mes}' and ANO eq '${anio}'`);
    let clientesVisitados = resultadosVisitas.map(v => v.KUNNR);
    let clientesUnicos = [...new Set(clientesVisitados)];
    let numVisitas = clientesUnicos.length;

    // Obtener información total de clientes
    const resultadosClientes = await context.read('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'CLIENTEINFO', []);
    let totalClientes = resultadosClientes.map(v => v.KUNNR);
    let totalClientesUnicos = [...new Set(totalClientes)];
    let numTotalClientes = totalClientesUnicos.length;

    // Calcular el porcentaje
    let porcentaje = 0;
    if (numTotalClientes > 0) {
        porcentaje = Math.round((numVisitas / numTotalClientes) * 100); 
    }
    
    return porcentaje;
}





