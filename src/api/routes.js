import { Router } from 'express'
import { dbGetAll, dbGetItem, dbPost, dbDeleteAll } from '../services/orbitdb'
import request from 'request'

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

const conserveApi = 'https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-01-01&end=2020-06-12&species=Orcinus%20orca'
const loadApi = async (api) => {
    request(api, (err, resp, body) => {
        if (!err) {
            console.log(JSON.parse(body).results)
        }
    })
}

loadApi(conserveApi)

//---ROUTING---
//List-level routes
router
    .route("/spotter/")
    // GET all data
    .get((req, res) => {
        res.send( dbGetAll() );
    })
    // POST data
    .post((req, res) => {
        res.send( dbPost(req.body) );
    });

//Detail-level routes
router
    .route("/spotter/:spotter")
    // GET Specific data
    .get((req, res) => {
        res.send( dbGetItem(req.params.spotter) );
    })
    // DELETE specific data
    .delete((req, res) => {
        res.send( dbDeleteAll(req.params.spotter) );
    })
    // // PUT specific data
    // .put((req, res) => {
    //     res.send( dbPost(req.body) );
    // });

export default router
