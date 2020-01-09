
import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} from '../../helpers/errors';
import makeHttpError from '../../helpers/http-error';

export default function makeInventoryItemsEndpointHandler({ inventoryItemsDAL }){
    return async function handle(httpRequest){
        switch(httpRequest.method){
            case 'GET':
                return getAllInventoryItems(httpRequest) ;
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
        }
    }

    async function getAllInventoryItems(httpRequest){

        try{
            const results = await inventoryItemsDAL.findAll();
            if(results){
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify(results)
                }
            }
        }catch(e){

            return makeHttpError({
                statusCode: 500,
                errorMessage: e.message
            })
        }
    }
}