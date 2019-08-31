const ApolloServerService = require('./services/ApolloServerService');
const MongodbConnectionService = require('./services/MongodbConnectionService');

const LaunchAPI = require('./graphql/datasources/launch');

const apolloService = new ApolloServerService({
  typeDefs: require('./graphql/schema'),
  resolvers: require('./graphql/resolvers'),
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    // userAPI: new UserAPI({ store }),
  })
})
const {DB_URI} = require('./config')
const mongdbService = new MongodbConnectionService({
  uri: DB_URI
})

mongdbService.start()
  .then(() => apolloService.start())
