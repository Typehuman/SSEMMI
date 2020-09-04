import IpfsHttpClient from 'ipfs-http-client'
import OrbitDb from 'orbit-db'

export const dbService = async () => {
  const ipfs = IpfsHttpClient({ host: '127.0.0.1', port: '5001' })
  // Create orbitdb
  const orbitdb = await OrbitDb.createInstance(ipfs)
  const db = await orbitdb.keyvalue('first-database')

  //Test to add and retreive a KV
  db.put('twenty', '20').then( () => {
    console.log(db.get('twenty'))
    // 20
  })

  //Adding mock KV data
  await db.put('one', '1')
  await db.put('two', '2')
  await db.put('three', '3')

  //Set const variable to hold all entries
  const out = db.all

  //Test updating a KV data by using a 'put' alias called 'set'
  await db.set('three', 'thr33')

  //Output all entries
  console.log(out)
  console.log(db.address.toString())
};
