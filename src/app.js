import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import express from './services/express'
import { dbService, getAll, getItem, post } from './services/orbitdb'

import api from './api/routes'

const app = express(apiRoot, api)
const server = http.createServer(app)
dbService()

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

//ROUTING
app.route("/spotter/")
  // GET all data
  .get((req, res) => {
    res.send( getAll() );
  })
  // POST data
  .post((req, res) => {
    res.send( post(req.body) );
  });
  // GET Specific data
app.route("/spotter/:spotter")
  .get((req, res) => {
    res.send( getItem(req.params.spotter) );
  })
  // // PUT specific data
  // .put((req, res) => {
  //   res.send( post(req.body) );
  // });

export default app
