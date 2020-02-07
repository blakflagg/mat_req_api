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
        let updateRequestItem
        let result = null

        for (let item of httpRequest.body) {

            switch (item.op) {
                case 'add':
                    updatePartRequestItem = {
                        part_request_link: item.part_request_link,
                        rec_id: item.rec_id,
                        item_desc: item.item_desc,
                        qty: item.qty,
                        status: 'NEW'
                    }
                    try {

                        result = await partRequestItemDAL.add(updatePartRequestItem)
                        if (result) {
                            return makeHttpResult({ statusCode: 200, resultMessage: "Records Added" })
                        }
                    } catch (error) {
                        return makeHttpError()
                    }
                    break;
                case 'remove':
                    console.log('remove' + items.request_item_id)
                    break;
                case 'update':
                    console.log('update' + items.request_item_id)
                    break;
            }
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