import {
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError,
    NoRecordError
} from '../../helpers/errors'
import makeHttpError from '../../helpers/http-error'
import moment from 'moment'

export default function makePartRequestEndpointHandler({ partRequestDAL }) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                return postPathRouter(httpRequest)
            case 'GET':
                return getPathRouter(httpRequest)
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

    async function addPartRequests(httpRequest) {
        const { payload: { id } } = httpRequest;
        const partRequest = httpRequest.body
        const partRequestItems = partRequest.hasOwnProperty('partRequestItems') ? partRequest.partRequestItems : null

        let required_date = partRequest.required_date
        let request_date = moment().format("M/D/YYYY h:mm:ss a")

        try {
            const result = await partRequestDAL.add({ userId: id, partRequestItems, ...partRequest, required_date, request_date })

            if (result) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify(result)
                }
            }
        } catch (err) {
            throw err;
        }
    }

    async function updatePartRequest(httpRequest) {
        const { payload: { id } } = httpRequest;
        const { partRequestId } = httpRequest.params || {}
        const updatedRequest = {}

        for (let props of httpRequest.body) {
            updatedRequest[props.propName] = props.value
        }

        try {
            const result = await partRequestDAL.updatePartRequest({ userId: id, partRequestId, updatedRequest })
            if (result) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify({records_affected: result})
                }
            }
        } catch (err) {

            throw err
        }
    }

    async function getPartRequestsByUserID(httpRequest) {
        const { payload: { id } } = httpRequest

        try {
            const results = await partRequestDAL.findByUserId({ userId: id })
            if (results) {
                return {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    statusCode: 200,
                    data: JSON.stringify(results)
                }
            }
        } catch (err) {
            throw err
        }

    }

    async function deletePartRequest(httpRequest) {
        const { payload: { id } } = httpRequest
        const { partRequestId } = httpRequest.params || {}

        try {
            const results = await partRequestDAL.deletePartRequest({ userId: id, partRequestId })
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: JSON.stringify({rows_affected : results})
            }           
        } catch (err) {
            throw err
        }
    }

    function getPathRouter(httpRequest) {
        switch (httpRequest.path) {
            case '/partrequests':
                return getPartRequestsByUserID(httpRequest)

        }
    }

    function postPathRouter(httpRequest) {
        switch (httpRequest.path) {
            case '/partrequest':
                return addPartRequests(httpRequest)

        }
    }

    function patchPathRouter(httpRequest) {
        return updatePartRequest(httpRequest)

    }

    function deletePathRouter(httpRequest) {
        return deletePartRequest(httpRequest)
    }
}