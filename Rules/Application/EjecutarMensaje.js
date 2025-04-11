
export default function EjecutarMensaje(context) {
    //var dialog = context.nativescript.uiDialogsModule;
    var pernr = context.evaluateTargetPath("#Application/#ClientData/#Property:UserId");
    var hoy = new Date();
    var horaactual = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

    

    return context.read('/Skycm_v3/Services/Dest_SkyCM_Productivo.service', 'HISTV', [], `$filter=ESTADO eq 'ACTIVA' and EMAIL_VEND eq '${pernr}'`).then((result) => {
        
        if (result && result.length > 0) {
            let datos = result.getItem(0);
            
            let hora = datos.HORA;
            var hora1 = horaactual.toString().split(":"), // campo hora_fin
                hora2 = hora.toString().split(":"), // campo hora_inicio
                t1 = new Date(),
                t2 = new Date();

            t1.setHours(hora1[0], hora1[1], hora1[2]);
            t2.setHours(hora2[0], hora2[1], hora2[2]);

            //Aquí hago la resta
            t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());

            //Imprimo el resultado
            var resultado = (t1.getHours() < 10 ? "0" + t1.getHours() : "" + t1.getHours()) + ":" + (t1.getMinutes() < 10 ? "0" + t1.getMinutes() :
                "" + t1.getMinutes()) + ":" + (t1.getSeconds() < 10 ? "0" + t1.getSeconds() : "" + t1.getSeconds());

            var Horas = parseInt(resultado.slice(0, 2))

            if (Horas > 0) {
                return context.executeAction('/Skycm_v3/Actions/Application/MsjSeguirVisita.action');
            } else {
                return true;
            }
        }

    })

}


