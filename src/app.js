import http from 'http'
import { env, mongo, port, ip, apiRoot } from './config'
import mongoose from './services/mongoose'
import express from './services/express'
import api from './api'
import { dbService, getAll, getItem, post } from './services/orbitdb'

import api from './api/routes'

const app = express(apiRoot, api)
const server = http.createServer(app)

//Using the routes from API to handle endpoints
app.use("/", api)

if (mongo.uri) {
  mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

// dbService()

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
})

export default app
