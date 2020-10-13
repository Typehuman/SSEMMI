import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export DataIngestion, { schema } from './model'

import { dbGetAll, dbGetItem, dbPost, dbDelete, dbQueryTrusted } from '../../services/orbitdb'

const router = new Router()
const { entry_id, data_source_name, data_source_entity, data_source_id, created, photo_url, no_sighted, latitude, longitude, data_source_witness, trusted, data_source_comments, ssemmi_data_added } = schema.tree

/**
 * @api {post} /ingestions Create data ingestion
 * @apiName CreateDataIngestion
 * @apiGroup DataIngestion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam entry_id Data ingestion's entry_id.
 * @apiParam data_source_name Data ingestion's data_source_name.
 * @apiParam data_source_entity Data ingestion's data_source_entity.
 * @apiParam data_source_id Data ingestion's data_source_id.
 * @apiParam created Data ingestion's created.
 * @apiParam photo_url Data ingestion's photo_url.
 * @apiParam no_sighted Data ingestion's no_sighted.
 * @apiParam latitude Data ingestion's latitude.
 * @apiParam longitude Data ingestion's longitude.
 * @apiParam data_source_witness Data ingestion's data_source_witness.
 * @apiParam trusted Data ingestion's trusted.
 * @apiParam data_source_comments Data ingestion's data_source_comments.
 * @apiParam ssemmi_data_added Data ingestion's ssemmi_data_added.
 * @apiSuccess {Object} dataIngestion Data ingestion's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data ingestion not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ entry_id, data_source_name, data_source_entity, data_source_id, created, photo_url, no_sighted, latitude, longitude, data_source_witness, trusted, data_source_comments, ssemmi_data_added }),
  create)

// List on all sightings with token restrictions
router
    .route("/sightings/")
    // GET all data
    .get(token({ required: true }), (req, res) => {
        res.send( dbGetAll() );
    })
    // POST data
    .post(token({ required: true }), (req, res) => {
      if (!req.body) {
          res.send('Invalid input 400');
          return;
      }
      res.send( dbPost(req.body) );
  });

router
  .route("/sightings/:id")
  // GET Specific data
  .get(token({ required: true }), (req, res) => {
      res.send( dbGetItem(req.params.id) );
  })
  // DELETE specific data
  .delete(token({ required: true }), (req, res) => {
      res.send( dbDelete(req.params.id) );
  })
// // PUT specific data
// .put((req, res) => {
//     res.send( dbPost(req.body) );
// });

// List sightings from trusted sources
router
  .route("/sightings/trusted")
  // GET all data
  .get(token({ required: true }), (req, res) => {
      res.send( dbQueryTrusted() );
  })

/**
 * @api {get} /ingestions Retrieve data ingestions
 * @apiName RetrieveDataIngestions
 * @apiGroup DataIngestion
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of data ingestions.
 * @apiSuccess {Object[]} rows List of data ingestions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /ingestions/:id Retrieve data ingestion
 * @apiName RetrieveDataIngestion
 * @apiGroup DataIngestion
 * @apiSuccess {Object} dataIngestion Data ingestion's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data ingestion not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /ingestions/:id Update data ingestion
 * @apiName UpdateDataIngestion
 * @apiGroup DataIngestion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam entry_id Data ingestion's entry_id.
 * @apiParam data_source_name Data ingestion's data_source_name.
 * @apiParam data_source_entity Data ingestion's data_source_entity.
 * @apiParam data_source_id Data ingestion's data_source_id.
 * @apiParam created Data ingestion's created.
 * @apiParam photo_url Data ingestion's photo_url.
 * @apiParam no_sighted Data ingestion's no_sighted.
 * @apiParam latitude Data ingestion's latitude.
 * @apiParam longitude Data ingestion's longitude.
 * @apiParam data_source_witness Data ingestion's data_source_witness.
 * @apiParam trusted Data ingestion's trusted.
 * @apiParam data_source_comments Data ingestion's data_source_comments.
 * @apiParam ssemmi_data_added Data ingestion's ssemmi_data_added.
 * @apiSuccess {Object} dataIngestion Data ingestion's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Data ingestion not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ entry_id, data_source_name, data_source_entity, data_source_id, created, photo_url, no_sighted, latitude, longitude, data_source_witness, trusted, data_source_comments, ssemmi_data_added }),
  update)

/**
 * @api {delete} /ingestions/:id Delete data ingestion
 * @apiName DeleteDataIngestion
 * @apiGroup DataIngestion
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Data ingestion not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
