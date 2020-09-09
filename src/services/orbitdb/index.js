import IpfsHttpClient from 'ipfs-http-client'
import OrbitDb from 'orbit-db'

// Initial ipfs setup
console.log("Connecting to IPFS HTTP client.... \n")
const ipfs = IpfsHttpClient({ host: '127.0.0.1', port: '5001' })

let db

//Once ipfs has been setup, the db will be started
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
      indexBy: 'spotter'
    }

    db = await orbitdb.docs('ssemmi-docs-db', access)
    await db.load()

    // //Add data into doc db
    // await db.put({spotter: "whalistic", total_spotted: 5})
    // await db.put({spotter: "orcawhat", total_spotted: 2})

    db.events.on('replicated', () => {
      console.log(`Database replicated. Check for new spotters.`)
    })

    console.log("Database setup succesful! \n")
    console.log(JSON.stringify(db.get('')) + "\n")

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

export var getAll = () => {
  return db.get('')
}

export var getItem = (data) => {
  return db.get(data)
}

export var post = (data) => {
  db.put(data)
  return getItem(data)
}

export var deleteAll = () => {
  return db.drop()
}
