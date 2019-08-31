const { ApolloServer } = require('apollo-server');
const isProd = (process.env.NODE_ENV == 'production')

class ApolloServerService {

  constructor({typeDefs, resolvers, dataSources}) {
    this.server = new ApolloServer({
      cors: {
        origin: true,       // <- allow request from all domains
        credentials: true   // <- enable CORS response for requests with credentials (cookies, http authentication)
      },
      typeDefs,
      resolvers,
      dataSources,
      context: async ({ req, connection }) => {
        // check connection for metadata
        if (connection) return connection.context;

        // check from req
        const token = req.headers.authorization || "";
        return { token };
      },
      playground: isProd ? false : {
        settings: {
          "editor.theme": "dark"
        }
      }
    })
  }

  start() {
    this.server.listen()
      .then(({ url }) => console.log(`🚀  Server ready at ${url}`))
  }
}

module.exports = ApolloServerService
