/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function OnWillUpdate(clientAPI) {
   /* return clientAPI.executeAction('/Skycm_v3/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {*/
            return clientAPI.executeAction('/Skycm_v3/Actions/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
       /* } else {
            return Promise.reject('User Deferred');
        }
    });*/
}