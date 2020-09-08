import IpfsHttpClient from 'ipfs-http-client'
import OrbitDb from 'orbit-db'

export const dbService = async () => {
  const ipfs = IpfsHttpClient({ host: '127.0.0.1', port: '5001' })
  // Create orbitdb
  const orbitdb = await OrbitDb.createInstance(ipfs)
  const db = await orbitdb.docs('ssemmi-docs-db', { indexBy: 'spotter' })

  //Test to add and retreive a docs
  await db.put({spotter: "whalistic", total_spotted: 5})
  await db.put({spotter: "orcawhat", total_spotted: 2})
  await db.put({spotter: "whalify", total_spotted: 1})

  const moreThanTwo = db.query( (doc) => doc.total_spotted >= 2)

  //Set const variable to hold all entries
  const out = db.get('')

  //Output all entries
  console.log('ALL ENTRIES: '+ '\n'+ out + '\n')
  console.log('Spotters most whales spotted by: ' + moreThanTwo + '\n')
  console.log(db.address.toString())
};
