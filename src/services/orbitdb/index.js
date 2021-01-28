import Ipfs from 'ipfs'
import OrbitDb from 'orbit-db'
import { ec, ec as EC } from 'elliptic'
import ObjectHash from 'object-hash'

// Initial ipfs setup
console.log("Starting up IPFS js Node.... \n")

// optional settings for the ipfs instance
const ipfsOptions = {
  EXPERIMENTAL: {
      pubsub: true
  },
  // sets up a our node as a "circuit relay", which means that others will be able to "hop" through our node to connect to our peers, and our node will hop over others to do the same.
  relay: { enabled: true, hop: { enabled: true, active: true } },
  repo: './data/ipfs'
}

// Create IPFS instance
const initIPFSInstance = async () => {
  return await Ipfs.create(ipfsOptions);
};

let db

// Once ipfs has been setup, the db will be started
export const dbService = async () => {
  try {
    console.log("Starting a database instance and configuration... \n")

    const ipfs = await initIPFSInstance();

    // Creates an instance of orbitdb
    const orbitdb = await OrbitDb.createInstance(ipfs, {
      directory: './data/orbitdb/'
    })

    // Allow write access
    const access = {
      write: ['*'],
      indexBy: 'ssemmi_id',
      accessController: {
        type: 'orbitdb'
      }
    }

    // Initialise the db
    db = await orbitdb.docs('ssemmi-api-ingestor', access)

    // Emit a log message upon synchronisation with another peer
    db.events.on('write', (address, entry, heads) => {
      console.log(`${address} Database to write. entry: ${entry}.`)
    })

    // Emit a error message upon error handling if something happens during the creation of the IPFS node.
    db.events.on('error', (error) => {
      console.log(`Database creation error: \n ${error}.`)
    })

    //Load locally persisted db state from memory
    await db.load()

    console.info(`The location of the database is ${db.address.toString()}`)
    
    // Log message upon successful db setup
    console.log("Database setup successful! \n")

  } catch (e) {
    // Log errors
    console.error(e)
    process.exit(1)
  }
}

// DB actions

// Retreive all entries in the db
export const dbGetAll = () => {
  return db.get('')
}

// Retreive specific entry from the db
export const dbGetItem = (data) => {
  return db.get(data)
}

// Post an entry into the db
export const dbPost = (data, user) => {
  // The accepted format of data payload for ssemmi
  const ssemmi_format = [
    'ssemmi_id',
    'entry_id',
    'data_source_name',
    'data_source_entity',
    'data_source_id',
    'created',
    'photo_url',
    'no_sighted',
    'latitude',
    'longitude',
    'data_source_witness',
    'trusted',
    'data_source_comments',
    'ssemmi_date_added'
  ]

  const dataKeys = Object.keys(data)

  // Remove unsupported fields from the payload
  dataKeys.forEach( key => {
      if (ssemmi_format.indexOf(key) === -1) {
        delete data[key]
      }
  })

  if (data.length === 0) {
    return false
  }
  // Regenerate the EC key and sign the object
  const curve = new EC('secp256k1')
  const userKey = curve.keyFromPrivate(user.pKey, 'hex')
  const dataHash = ObjectHash(data)
  const signDER = userKey.sign(dataHash)
  const sigHex = {r: signDER.r.toJSON(), s: signDER.s.toJSON()}
  data['submitter_did'] = user.did
  data['signature'] = sigHex

  return db.put(data)

}

// Removes the db locally
export const dbDelete = (data) => {
  return db.del(data)
}

// Query the db for trusted sources from conserve.io API
export const dbQueryTrusted = () => {
  const res = db.query((data) =>
    data.trusted == 1
  )
  return res
}
