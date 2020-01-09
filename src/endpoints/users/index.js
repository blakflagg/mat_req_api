import makeUserDAL from './userDAL';
import makeUsersEndpointHandler from './users-endpoint';

export default function makeUserRequestHandler({database}){

const userDAL = makeUserDAL({database});
return makeUsersEndpointHandler( { userDAL });

}
