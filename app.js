var express = require('express');
var app = express();
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

// OrbitDB uses Pubsub which is an experimental feature
// and need to be turned on manually. 
// Note that these options need to be passed to IPFS in 
// all examples in this document even if not specfied so.
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  },
}

// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

ipfs.on('ready', async () => {
  const orbitdb = new OrbitDB(ipfs)
  const db = await orbitdb.keyvalue('first-database')
  console.log(db.address.toString())
  // /orbitdb/Qmd8TmZrWASypEp4Er9tgWP4kCNQnW4ncSnvjvyHQ3EVSU/first-database
})



app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});