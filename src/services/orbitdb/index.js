import IpfsHttpClient from 'ipfs-http-client'
import OrbitDb from 'orbit-db'

export const dbService = async () => {
  const ipfs = IpfsHttpClient({ host: '127.0.0.1', port: '5001' })
  // Create orbitdb
  const orbitdb = await OrbitDb.createInstance(ipfs)
  const db = await orbitdb.keyvalue('first-database')
  console.log(db.address.toString())
};
