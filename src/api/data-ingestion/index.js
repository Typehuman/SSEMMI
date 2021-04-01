import { Router } from 'express'
import { token } from '../../services/passport'
import { dbGetAll, dbGetItem, dbPost, dbDelete, dbQueryTrusted } from '../../services/orbitdb'

const router = new Router()

// List on all sightings with token restrictions
router
  .route("/")
  /**
   * @api {get} /sightings Retrieve current sightings
   * @apiName RetrieveSightings
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} List of sightings.
   */
  .get(token({ required: true }), (req, res) => {
      res.send( dbGetAll() );
  })
  /**
   * @api {post} /sightings Contribute sightings
   * @apiName PostSightings
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} Entry of sighting.
   * @apiError 400 Invalid input.
   */
  .post(token({ required: true }), (req, res) => {
    if (!req.body) {
        res.send('Invalid input 400');
        return;
    }
    console.info(req.user)
    res.send( dbPost(req.body, req.user) );
});

router
  .route("/:id")
  /**
   * @api {get} /sightings/:id Retrieve specific sightings
   * @apiName RetrieveSpecificSighting
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} Sighting based on id.
   */
  .get(token({ required: true }), (req, res) => {
      res.send( dbGetItem(req.params.id) );
  })
  /**
   * @api {delete} /sightings/:id Delete specific sightings
   * @apiName DeleteSpecificSighting
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} 200 Deleted sighting entry.
   */
  .delete(token({ required: true }), (req, res) => {
      res.send( dbDelete(req.params.id) );
  })
// // PUT specific data
// .put((req, res) => {
//     res.send( dbPost(req.body) );
// });

// List sightings from trusted sources
router
  .route("/trusted")
  /**
   * @api {get} /sightings/trusted Retrieve sightings marked as trusted
   * @apiName RetrieveTrustedSighting
   * @apiGroup Sightings
   * @apiPermission user
   * @apiParam {String} access_token User access_token.
   * @apiSuccess {Object} Sightings with trusted source.
   */
  .get(token({ required: true }), (req, res) => {
      res.send( dbQueryTrusted() );
  })

export default router
