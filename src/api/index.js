import { Router } from 'express'
import { dbGetAll, dbGetItem, dbPost, dbDelete, dbQueryTrusted } from '../services/orbitdb'
import { loadApi, conserveApi } from './ingestion/spotter-api'
import { csLoadSpreadsheet } from './ingestion/citizen-science-api'
import { omLoadSpreadsheet } from './ingestion/orca-map-api'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import dataIngestion from './data-ingestion'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */

/**
 *----- USER AND AUTHENTICATION ROUTING METHODS -----
 */

router.use('/users', user)
router.use('/auth', auth)
router.use('/password-resets', passwordReset)
router.use('/sightings', dataIngestion)

/**
 *----- LOADING DATA FROM API INTO DB METHODS -----
 */
// // Load data from CONSERVE.IO
// loadApi(conserveApi)

// // GOOGLE SHEETS DATA LOAD
// // Load data from ORCA MAP
// omLoadSpreadsheet()
//     .then( () => console.log("---------Preparing to load next Google Sheets data------- \n") )
//     .then( () => {
//         setTimeout( () => {
//             // Load data from CITIZEN SCIENCE after 5 seconds of loading the previous data
//             // as Google has a maximum request calls with the same API.
//             csLoadSpreadsheet()
//         }, 5000)
//     })

export default router
