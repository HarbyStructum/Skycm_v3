/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ErrorArchive_DecideWhichEditPage(context) {//Current binding's root is the errorArchiveEntity:
    // Current binding's root is the errorArchiveEntity:
    let errorArchiveEntity = context.currentPage.context.binding;
    // Get the affectedEntity object out of it
    let affectedEntity = errorArchiveEntity.AffectedEntity;
    console.log("Affected Entity Is:");
    console.log(affectedEntity);

    let id = affectedEntity["@odata.id"]; // e.g. SalesOrderHeaders(12345)
    let affectedEntityType = "Unknown Entity Set";

    if (id.indexOf("(") > 0) {
        // Extracting the entity set type from @odata.id e.g. SalesOrderHeaders
        var patt = /\/?(.+)\(/i;
        var result = id.match(patt);
        affectedEntityType = result[1];
    }

    console.log("Affected Entity Type Is:");
    console.log(affectedEntityType);

    switch (affectedEntityType) {
        case "HISTV":
            // Establecer el binding para la acción de borrado
            context.getPageProxy().setActionBinding(affectedEntity);
            // Ejecutar la acción de borrado
            return context.executeAction("/Skycm_v3/Actions/Visitas/BorraVisita.action");

        default:
            // Guardar el tipo de entidad no manejado para mostrar un toast
            context.getPageProxy().getClientData().AffectedEntityType = affectedEntityType;
            return context.executeAction("/Skycm_v3/Actions/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action");
    }

}
