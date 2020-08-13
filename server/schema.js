const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    quakes: [Quake]!
    quake(id: ID!): Quake
    # Queries for the current user
    me: User
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
    time: String
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
