const mongoose = require('mongoose')
const Admin = mongoose.mongo.Admin

const EXCLUDE_DBS='admin local config'.split(' ')

const MONGOOSE_OPTIONS={
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10,
  useCreateIndex: true,
  useFindAndModify: false,
}

class ConnectionPool {

  URL='mongodb://localhost/'

  constructor() {
    this.connections={}
    this.loadDatabases()
  }

  loadDatabases = () => {
    let connection = mongoose.createConnection('mongodb://localhost/admin', MONGOOSE_OPTIONS)
    connection.on('open', () => {
      // connection established
      new Admin(connection.db).listDatabases()
        .then(result => {
          let allDatabases = result.databases
          this.databases=allDatabases.map(d => d.name).filter(d => !EXCLUDE_DBS.includes(d))
          console.log(`Detected databases:${this.databases}`)
        })
    })
  }

  getConnection(name) {
    // console.log(`Getting connection to DB ${name} (existing ${Object.keys(this.connections)})`)
    if (EXCLUDE_DBS.includes(name)) {
      throw new Error(`Access to ${name} forbidden`)
    }
    if (!this.databases.includes(name)) {
      throw new Error(`Unknown database ${name}`)
    }
    if (!this.connections[name]) {
      console.log(`Creating connection to DB ${name}`)
      const conn=mongoose.createConnection(`${this.URL}${name}`, MONGOOSE_OPTIONS)
      this.connections[name]=conn
    }
    return this.connections[name]
  }
}

const connectionPool = new ConnectionPool()

module.exports={connectionPool}
