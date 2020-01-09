import makePartRequestDAL from './partRequestDAL'
import makePartRequestEndpointHandler from './partRequests-endpoint'

export default function makePartRequestHandler({database}){

const partRequestDAL = makePartRequestDAL({database})
return  makePartRequestEndpointHandler( { partRequestDAL })

}