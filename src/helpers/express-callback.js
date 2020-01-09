export default function makeExpressCallabck (controller) {
    return (req, res) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: req.headers,
        payload: req.payload
        
      }
      controller(httpRequest)
      .then(({headers, statusCode ,data })=>{
        res
          .set(headers)
          .status(statusCode)
          .send(data)
      })
      .catch(e => res.status(500).json(e.message))
    }
  }