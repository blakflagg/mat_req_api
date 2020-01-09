import makePartRequestItemDAL from './partRequestItemDAL'
import makePartRequestItemEndpointHandler from './partRequestItems-endpoint'

export default function makePartRequestItemHandler({ database }) {
    const partRequestItemDAL = makePartRequestItemDAL({ database })
    return makePartRequestItemEndpointHandler({ partRequestItemDAL })
}