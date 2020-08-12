const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    quakes: [Quake]!
    quake(id: ID!): Quake
    # Queries for the current user
    me: User
  }

  type Mutation {
    saveRecord(recordId: [ID!]): 
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
  }


`;

module.exports = typeDefs;
