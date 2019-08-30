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

const mongdbService = new MongodbConnectionService({
  uris: 'mongodb://localhost:27017/test_db'
})

mongdbService.start()
  .then(() => apolloService.start())
