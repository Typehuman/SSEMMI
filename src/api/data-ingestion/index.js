import { Router } from 'express'
import { token } from '../../services/passport'
import { dbGetAll, dbGetItem, dbPost, dbDelete, dbQueryTrusted } from '../../services/orbitdb'

const router = new Router()

// List on all sightings with token restrictions
router
    .route("/")
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
      console.info(req.user)
      res.send( dbPost(req.body, req.user) );
  });

router
  .route("/:id")
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
  .route("/trusted")
  // GET all data
  .get(token({ required: true }), (req, res) => {
      res.send( dbQueryTrusted() );
  })

export default router
