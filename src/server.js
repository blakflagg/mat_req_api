import express from 'express'
import Cors from 'cors';
import bodyParser from 'body-parser'
import http from 'http'
import https from 'https'
import auth from './lib/auth'
import endpoints from './endpoints'
import makeCallback from './helpers/express-callback'


const app = express()
const server = {}

const PORT_HTTP = 8000
const PORT_HTTPS = 8001


app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use((error, request, response, next) => {
  if (error !== null) {
    return response.json({ "error": error.type })
  }
  return next();
})


app.get('/', (req, res) => res.send('Hello World'))
app.get('/users', auth.optional, makeCallback(endpoints.handleUsersRequest))
app.post('/login', auth.optional, makeCallback(endpoints.handleUsersRequest))
app.get('/partrequests', auth.required, makeCallback(endpoints.handlePartRequests))
app.post('/partrequest', auth.required, makeCallback(endpoints.handlePartRequests))
app.patch('/partrequest/:partRequestId', auth.required, makeCallback(endpoints.handlePartRequests))
app.delete('/partrequest/:partRequestId', auth.required, makeCallback(endpoints.handlePartRequests))
app.patch('/partrequestitem/:partRequestItemId', auth.required, makeCallback(endpoints.handlePartRequestItems))
app.delete('/partrequestitem/:partRequestItemId', auth.required, makeCallback(endpoints.handlePartRequestItems))
app.get('/inventoryitems', auth.required, makeCallback(endpoints.handleInventoryRequests))
app.post('/resetpassword', auth.required, makeCallback(endpoints.handleUsersRequest))

server.init = () => {
  http.createServer(app).listen(PORT_HTTP)
  https.createServer(app).listen(PORT_HTTPS)
  // getAdminToken()
}


export default server