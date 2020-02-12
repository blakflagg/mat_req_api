import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError,
    NoRecordError
} from '../../helpers/errors'
import makeHttpError from '../../helpers/http-error'
import makeHttpResult from '../../helpers/http-result'

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
    async function updatePartRequestItems(httpRequest) {
        const { payload: { id } } = httpRequest
        let updatePartRequestItem, partRequestItemId
        let result = []

        try {
            for (let item of httpRequest.body) {
                console.log(item)
                switch (item.op) {
                    case 'add':
                        updatePartRequestItem = {
                            ...item,
                            status: 'New',
                            item_type: 3
                        }
                        try {
                            result.push(partRequestItemDAL.add(updatePartRequestItem))
                        } catch (e) {
                            throw e;
                        }
                        break;
                    case 'remove':
                        try {
                            result.push(partRequestItemDAL.deleteById(item))
                        } catch (e) {
                            throw e;
                        }
                        break;
                    case 'update':
                        try {
                            result.push(partRequestItemDAL.updateById(item))
                        } catch (e) {
                            throw e;
                        }
                        break;
                    default: {
                        throw new Error('Unknown OP Code');
                    }
                }
            }
            await Promise.all(result);
            return makeHttpResult({ statusCode: 200, resultMessage: "Success" })

        } catch (e) {
            return makeHttpError({
                statusCode: 500,
                errorMessage: e.message
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
            if (err.name = "NoRecordError") {
                return makeHttpError({
                    statusCode: 404,
                    errorMessage: 'No Record Found'
                })
            }

            throw err
        }

    }
    function patchPathRouter(httpRequest) {
        return updatePartRequestItems(httpRequest)

    }

    function deletePathRouter(httpRequest) {
        return deletePartRequestItem(httpRequest)

    }
}