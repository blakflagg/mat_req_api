import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError,
    NoRecordError
} from '../../helpers/errors'
import makeHttpError from '../../helpers/http-error'

export default function makePartRequestItemEndpointHandler({ partRequestItemDAL }) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'PATCH':
                return patchPathRouter(httpRequest)
            case 'DELETE':
                return deletePathRouter(httpRequest)
            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
        }
    }

    async function deletePartRequestItem(httpRequest) {
        const { payload: { id } } = httpRequest
        const { partRequestItemId } = httpRequest.params || {}

        try {
            const result = await partRequestItemDAL.deleteById({ userId: id, partRequestItemId })
            if (result) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify({ rows_affected: result })
                }
            }

        } catch (err) {
            if(err.name = "NoRecordError"){
                return makeHttpError({
                    statusCode: 404,
                    errorMessage: 'No Record Found'
                })
            }

            throw err
        }

    }
    function patchPathRouter(httpRequest) {
        //TODO: create a patch functionality
    }

    function deletePathRouter(httpRequest) {
        return deletePartRequestItem(httpRequest)

    }
}