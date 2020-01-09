import makeInventoryDAL from './inventoryItemsDAL';
import makeInventoryEndpointHandler from './inventoryItems-endpoint';

export default function makeInventoryItemsRequestHandler({database}){
    const inventoryItemsDAL = makeInventoryDAL({database});
    return makeInventoryEndpointHandler({inventoryItemsDAL});
}