import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import express from './services/express'
import { dbService, getAll, getItem, post } from './services/orbitdb'

import api from './api/routes'

const app = express(apiRoot, api)
const server = http.createServer(app)
// dbService()

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

//Using the routes from API to handle endpoints
app.use("/", api)

export default app
