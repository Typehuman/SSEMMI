import IpfsHttpClient from 'ipfs-http-client'
import OrbitDb from 'orbit-db'
import { ec as EC } from 'elliptic'
import ObjectHash from 'object-hash'

// Initial ipfs setup
console.log("Connecting to IPFS HTTP client.... \n")
const ipfs = IpfsHttpClient({ host: '127.0.0.1', port: '5001' })

let db

// Once ipfs has been setup, the db will be started
export const dbService = async () => {
  try {
    console.log("Starting a database instance and configuration... \n")

    // Creates an instance of orbitdb
    const orbitdb = await OrbitDb.createInstance(ipfs, {
      directory: './orbitdb/'
    })

    // Allow write access
    const access = {
      write: ['*'],
      indexBy: 'ssemmi_id'
    }

    // Initialise the db
    db = await orbitdb.docs('ssemmi-api-ingestor', access)

    // //Add data into doc db
    // await db.put({spotter: "whalistic", total_spotted: 5})
    // await db.put({spotter: "orcawhat", total_spotted: 2})

    // Emit a log message upon synchronisation with another peer
    db.events.on('replicated', () => {
      console.log(`Database replicated. Check for new spotters.`)
    })

    //Load locally persisted db state from memory
    await db.load()

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
  const signDER = userKey.sign(dataHash).toDER()
  data['submitter_did'] = user.did
  //data['signature'] = signDER

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
