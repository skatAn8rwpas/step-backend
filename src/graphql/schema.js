const { gql } = require('apollo-server');




const typeDefs = gql`

type Subscription {
  postAdded: Post
}

type Query {
  launches: [Launch]!
  launch(id: ID!): Launch
  books: [Book]!
  posts: [Post]!
  # Queries for the current user
  me: User
}

type Mutation {
  # if false, booking trips failed -- check errors
  bookTrips(launchIds: [ID]!): TripUpdateResponse!

  # if false, cancellation failed -- check errors
  cancelTrip(launchId: ID!): TripUpdateResponse!

  login(email: String): String # login token

  addPost(authorId: ID, title: String, body: String): Post
}

type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}

# This "Book" type can be used in other type declarations.
type Book {
  title: String
  author: String
}

type Launch {
  id: ID!
  site: String
  mission: Mission
  rocket: Rocket
  isBooked: Boolean!
}

type Rocket {
  id: ID!
  name: String
  type: String
}

type User {
  id: ID!
  email: String!
  name: Name!
  password: String!
  trips: [Launch]!
}

type Name {
  first: String!
  last: String!
}

type Mission {
  name: String
  missionPatch(size: PatchSize): String
}

type Post {
  id: ID!
  authorId: ID!
  title: String!
  body: String!
}

enum PatchSize {
  SMALL
  LARGE
}
`;

module.exports = typeDefs;
