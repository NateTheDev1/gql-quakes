const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const QuakeAPI = require("./datasources/quake");
const resolvers = require("./resolvers");

const datasources = {
  quakeAPI: new QuakeAPI(),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => datasources,
});

server.listen().then(({ url }) => {
  console.log("Server running at ", url);
});
