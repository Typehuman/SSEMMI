import IpfsHttpClient from 'ipfs-http-client'
import OrbitDb from 'orbit-db'

// export const dbService = async () => {
//   const ipfs = IpfsHttpClient({ host: '127.0.0.1', port: '5001' })
//   // Create orbitdb
//   const orbitdb = await OrbitDb.createInstance(ipfs)
//   const access = {
//     // Give write access to everyone
//     write: ['*'],
//   }
//   const db = await orbitdb.docs('ssemmi-docs-db', { indexBy: 'spotter' }, access)
//   await db.load()

//   db.events.on('replicated', () => {
//     console.log(`Database replicated. Check for new spotters.`)
//   })

//   //Add data into doc db
//   await db.put({spotter: "whalistic", total_spotted: 5})
//   await db.put({spotter: "orcawhat", total_spotted: 2})
//   await db.put({spotter: "whalify", total_spotted: 1})

//   //Query data from doc db
//   const moreThanTwo = db.query( (doc) => doc.total_spotted >= 2)

//   //Set const variable to hold all entries
//   const out = db.get('')

//   //Output all entries
//   console.log('ALL ENTRIES: '+ '\n'+ JSON.stringify(out) + '\n')
//   console.log('Spotters most whales spotted by: ' + JSON.stringify(moreThanTwo) + '\n')
//   console.log(db.address.toString())
// };

export const dbService = async () => {
  try {
    // Create IPFS instance
    const ipfs = IpfsHttpClient({ host: '127.0.0.1', port: '5001' })
    // Create orbitdb
    const orbitdb = await OrbitDb.createInstance(ipfs)
    const access = {
      // Give write access to everyone
      write: ['*'],
    }
    const db = await orbitdb.docs('ssemmi-docs-db', { indexBy: 'spotter' }, access)
    // const db = await orbitdb.open('/orbitdb/zdpuAu6TU7MXjoMU4Ny7wPgWTx4TZonxG5tfNwdBUppw7wfXB/ssemmi-docs-db')
    await db.load()

    //Add data into doc db
    await db.put({spotter: "whalistic", total_spotted: 5})
    await db.put({spotter: "orcawhat", total_spotted: 2})
    await db.put({spotter: "whalify", total_spotted: 1})

    db.events.on('replicated', () => {
      console.log(`Database replicated. Check for new spotters.`)
    })

    console.log(`database string: ${db.address.toString()}`)
    console.log(db.get(''))

    return resolve(db);

  } catch(err) {
    return err;
  }

}