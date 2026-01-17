/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function Rule_Rest_Inventario(context) {

	var actionResult = context.getActionResult("ResultRest");
	var resultado = actionResult.data;
	let clientData = context.evaluateTargetPathForAPI('#Page:Main').getClientData();
	var dialog = context.nativescript.uiDialogsModule;
	//	var listpickerRef= context.evaluateTargetPath('#Page:Inventario/#Control:FC_List_Referencia/#SelectedValue');
	var referencia = resultado?.Referencia;
	var sociedad = context.evaluateTargetPath('#Page:ConsultaInventario/#Control:fc_sociedad/#Value');
	var listpick = context.evaluateTargetPath("#Page:ConsultaInventario/#Control:fc_referencias/#SelectedValue");
	//	if(referencia == listpickerRef && resultado.length>0){
	var error = resultado.T_Mensaje.TipoMsj
	var errorTextoMensaje = resultado.T_Mensaje.TextoMsj
	var listpickerOrden = context.evaluateTargetPath('#Page:ConsultaInventario/#Control:Fc_ordenar/#SelectedValue'); //LINO
	//let color = context.evaluateTargetPath('#Page:ConsultaInventario/#Control:fc_color/#Value').trimStart();
	//color.toUpperCase();
	var Listado = resultado?.T_Detalle;
	clientData.ListadoDes = resultado.T_Detalle;

	clientData.Referencia = referencia;

	if (!Listado) {
		dialog.alert({
			title: 'Atención!',
			message: `La referencia (${listpick}) no se encuentra asignada a su portafolio`,
			okButtonText: 'OK',
			cancelable: true,
		})

	} else {

		if (resultado && error != "E") {
			if (sociedad == '2000') {
				Listado.forEach(function (item) {
					if (item.Userdet5 < 1) {
						item.Userdet5 = ''
					} else {
						item.Userdet5 = 'VIENE'
					}
				})
			}

			/*if (sociedad != '2000') {
				Listado.forEach(function (item) {
					if (item.CantDisponible < 1) {
						item.status = 'Agotado';
					} else {
						item.status = '';
					}
				})
			}*/

			switch (listpickerOrden) {
				case "Color":
					clientData.Inventario = Listado.sort(GetSortOrder("Color"));
					return context.executeAction('/Skycm_v3/Actions/Consultas/nav_NavToInvColor.action');
					break;

				case "Disponibilidad":
					clientData.Inventario = Listado.sort(SortNumeros("CantDisponible"));
					return context.executeAction('/Skycm_v3/Actions/Consultas/nav_NavToInvDispo.action');
					break;

				case "Predeterminado":
					clientData.Inventario = Listado;
					//dialog.alert("ESTE ES EL INVENTARIO : ", Listado)
					return context.executeAction('/Skycm_v3/Actions/Consultas/nav_NavToInvenDesordenado.action');
					break;

				default:
					clientData.Inventario = Listado;
					return context.executeAction('/Skycm_v3/Actions/Consultas/nav_NavToInvenDesordenado.action');
			}

		} else {

			var message = ` ¡${errorTextoMensaje}!`;
			return context.executeAction({
				"Name": "/Skycm_v3/Actions/Consultas/msj_InventarioNoExiste.action",
				"Properties": {
					"Message": message
				}
			});

		}
	}

	function GetSortOrder(prop) {
		return function (a, b) {
			if (a[prop] > b[prop]) {
				return 1;
			} else if (a[prop] < b[prop]) {
				return -1;
			}
			return 0;
		}
	}

	function SortNumeros(prop) {
		return function (a, b) {
			return b[prop] - a[prop];
		}
	}

}
