import makeDb from '../db'
import makeUserRequestHandler from './users'
import makePartRequestHandler from './partRequests'
import makeInventoryItemsRequestHandler from './inventoryItems'
import makePartRequestItemHandler from './partRequestItems'

const database = makeDb();
const handleUsersRequest = makeUserRequestHandler({database})
const handlePartRequests = makePartRequestHandler({database})
const handleInventoryRequests = makeInventoryItemsRequestHandler({database})
const handlePartRequestItems =  makePartRequestItemHandler({database})

const endpoints = Object.freeze({
    handlePartRequests,
    handleUsersRequest,
    handleInventoryRequests,
    handlePartRequestItems
})

export default endpoints;
