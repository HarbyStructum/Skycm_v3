/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ResultInventario(context) {
	let target = context.evaluateTargetPath('#Page:Main/#ClientData/#Property:Inventario');
    //let searchString = context.searchString;
    let color = context.evaluateTargetPath('#Page:ConsultaInventario/#Control:fc_color/#Value').trimStart();
    color.toUpperCase();
    
    
    if(color){
    	let searchResult1 = target.filter(prod => { return prod.Color.includes(color)});
    	return searchResult1;
    }
    /*else if (searchString) {
        let searchResult = target.filter(prod => { return prod.Color.includes(searchString)});
        target = searchResult;
    }*/

    return '#Page:Main/#ClientData/#Property:Inventario';
    
}
