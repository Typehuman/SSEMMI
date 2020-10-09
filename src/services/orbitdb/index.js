import IpfsHttpClient from 'ipfs-http-client'
import OrbitDb from 'orbit-db'

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
      directory: '../../../orbitdb/'
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
    console.log("Database setup succesful! \n")

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
export const dbPost = (data) => {
  db.put(data, { pin: true })
  return true
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
