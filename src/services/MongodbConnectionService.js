const mongoose = require('mongoose')

class MongodbConnectionService {

  /**
   *
   * @param {{uris: String, options: {[String]: Any}}} param0
   */
  constructor({ uris, options = {} }) {
    this.uris = uris;
    this.options = options

    mongoose.connection.once('connected', () => console.log('Connection with mongodb establish.'))
    mongoose.connection.on('error', console.error)
  }

  async start() {
    return await mongoose.connect(this.uris, { useNewUrlParser: true, ...this.options })
  }

}

module.exports = MongodbConnectionService
