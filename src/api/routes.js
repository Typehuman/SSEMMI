import { Router } from 'express'
import { getAll, getItem, post } from '../services/orbitdb'

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

//ROUTING
//List-level routes
router
    .route("/spotter/")
    // GET all data
    .get((req, res) => {
        res.send( getAll() );
    })
    // POST data
    .post((req, res) => {
        res.send( post(req.body) );
    });

//Detail-level routes
router
    .route("/spotter/:spotter")
    // GET Specific data
    .get((req, res) => {
        res.send( getItem(req.params.spotter) );
    })
    // // PUT specific data
    // .put((req, res) => {
    //     res.send( post(req.body) );
    // });

export default router
