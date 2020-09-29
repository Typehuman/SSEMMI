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
//const conserveApi = 'https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-01-01&end=2020-09-18&species=Orcinus%20orca'
const conserveApi = 'https://maplify.com/waseak/php/search-all-sightings.php?&BBOX=-180,0,180,90&start=2020-09-18&species=Orcinus%20orca'

// Retreive data from the URL
const loadApi = async (api) => {
    request(api, (err, resp, body) => {
        if (!err) {
            // Parsing the JSON from the data, parameters are 'count' and 'results'
            var jsonData = JSON.parse(body)
            var count = 1

            // Iterate over the sightings data to fill DB
            for (var i = 0; i < jsonData.results.length; i++ ) {
                // Retreive only 'results' as it contains the sighting data
                // var fullEntry = jsonData.results[i]

                // Mapping relevant fields from the data into the ssemmi db
                var source_input = {
                    "ssemmi_id": count,
                    "data_source_name": "Spotter-API",
                    "data_source_entity": "Conserve.io",
                    "data_source_id": jsonData.results[i].id,
                    "created": jsonData.results[i].created,
                    "photo_url": jsonData.results[i].photo_url,
                    "no_sighted": jsonData.results[i].number_sighted,
                    "latitude": jsonData.results[i].latitude,
                    "longitude": jsonData.results[i].longitude,
                    "data_source_witness": jsonData.results[i].usernm,
                    "trusted": jsonData.results[i].trusted
                }

                // Wrap in a try catch to put into the db
                try {
                    console.log(`Adding data to the DB....`)
                    //dbPost(fullEntry)
                    console.log(`Entry count: ${count}\n`)
                    console.log(source_input)
                    console.log(`SSEMMI ID ${source_input.ssemmi_id} successfully added to the db \n`)
                    count+= 1
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
