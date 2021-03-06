const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    quakes(pageSize: Int, after: String): QuakeConnection!
    quake(id: ID!): Quake
    users: [User]
    # Queries for the current user
    me: User
  }

  type QuakeConnection {
    cursor: String!
    hasMore: Boolean!
    quakes: [Quake]!
  }

  type Mutation {
    # if false, saving record failed
    saveRecord(recordId: ID!): RecordUdpdateResponse

    # if false, deleting record failed
    deleteRecord(recordId: ID!): RecordUdpdateResponse

    login(email: String): String
  }

  type RecordUdpdateResponse {
    success: Boolean!
    message: String
    records: [Quake]
  }

  type Quake {
    id: ID!
    location: String
    magnitude: Float
    when: String
    cursor: String
  }

  type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    records: [Quake]
  }
`;

module.exports = typeDefs;
