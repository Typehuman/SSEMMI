import { Router } from 'express'
import { dbGetAll, dbGetItem, dbPost, dbDelete, dbQueryTrusted } from '../services/orbitdb'
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




 /**
 *----- DATA TO DB LOADING METHODS -----
 */

/**
 * conserveApi is the URL to retreive data from Conserve.IO app
 * The BBOX parameter on the URL indicates the location
 * and the start/end parameter marks the date of sighting, with 7 days range as default
 * species parameter specifies the types of whales, but in our case it should be 'Orcinus orca'
 */
// Specify the URL
const conserveApi = 'https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-01-01&end=2020-09-18&species=Orcinus%20orca'

// Retreive data from the URL
const loadApi = async (api) => {
    request(api, (err, resp, body) => {
        if (!err) {
            // Parsing the JSON from the data, parameters are 'count' and 'results'
            var jsonData = JSON.parse(body)

            // Iterate over the sightings data to fill DB
            for (var i = 0; i < jsonData.results.length; i++ ) {
                // Retreive only 'results' as it contains the sighting data
                var fullEntry = jsonData.results[i]
                var id = jsonData.results[i].id
                var user = jsonData.results[i].usernm
                var numSights = jsonData.results[i].number_sighted

                // Wrap in a try catch to put into the db
                try {
                    console.log(`${i+1}. ID ${id}: ${user} sighted ${numSights}`)
                    console.log(`Adding data to the DB....`)
                    dbPost(fullEntry)
                    console.log(`${id} successfully added to the db \n`)
                } catch (error) {
                    console.log(error);
                }
            }
        }
    })
}

// Invoke method to load data into DB before performing requests on routes
loadApi(conserveApi)


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
