/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GenerarIdProspecto(clientAPI) {
    function generateUUID() {
        let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    let randomUUID = generateUUID();
    
    return 'PROS-' + randomUUID;
}
