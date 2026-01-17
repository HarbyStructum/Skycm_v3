/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
/*export default function GenerarIDJornada(clientAPI) {

    function generateUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    let randomUUID = generateUUID();
    
    return 'Jor-' + randomUUID;
}*/


export default function GenerarIDJornada(clientAPI) {

    function generateUUID() {
        let cryptoObj = (typeof crypto !== "undefined") ? crypto : null;

        if (cryptoObj && cryptoObj.getRandomValues) {
            // Método más seguro con crypto
            let buffer = new Uint8Array(16);
            cryptoObj.getRandomValues(buffer);

            // Ajustar bits para cumplir estándar UUID v4
            buffer[6] = (buffer[6] & 0x0f) | 0x40;
            buffer[8] = (buffer[8] & 0x3f) | 0x80;

            return [...buffer].map((b, i) => {
                let s = b.toString(16).padStart(2, "0");
                // Insertar guiones en posiciones estándar
                return (i === 4 || i === 6 || i === 8 || i === 10) ? "-" + s : s;
            }).join("");
        } else {
            // Fallback si no hay crypto disponible
            let d = new Date().getTime();
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        }
    }

    return generateUUID();
}
