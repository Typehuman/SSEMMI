import { Router } from 'express'
import { dbGetAll, dbGetItem, dbPost, dbDelete, dbQueryTrusted } from '../services/orbitdb'
import { loadApi, conserveApi } from './ingestion/spotter-api'
import { csLoadSpreadsheet } from './ingestion/citizen-science-api'

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
 *----- LOADING DATA FROM API INTO DB METHODS -----
 */
// // Load data from CONSERVE.IO
// loadApi(conserveApi)

// Load data from CITIZEN SCIENCE
csLoadSpreadsheet()

// Load data from ORCA MAP
// omLoadSpreadsheet()

/**
 *----- ROUTING METHODS -----
 */

/**
 * List level routes
 */

// List on all sightings
router
    .route("/sightings/")
    // GET all data
    .get((req, res) => {
        res.send( dbGetAll() );
    })
    // POST data
    .post((req, res) => {
        if (!req.body) {
            res.send('Invalid input 400');
            return;
        }
        res.send( dbPost(req.body) );
    });

// List sightings from trusted sources
router
    .route("/sightings/trusted")
    // GET all data
    .get((req, res) => {
        res.send( dbQueryTrusted() );
    })

/**
 * Detail level routes
 */
router
    .route("/sightings/:id")
    // GET Specific data
    .get((req, res) => {
        res.send( dbGetItem(req.params.id) );
    })
    // DELETE specific data
    .delete((req, res) => {
        res.send( dbDelete(req.params.id) );
    })
    // // PUT specific data
    // .put((req, res) => {
    //     res.send( dbPost(req.body) );
    // });

export default router
