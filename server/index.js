const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const QuakeAPI = require("./datasources/quake");
const resolvers = require("./resolvers");
const UserAPI = require("./datasources/user");
const { createStore } = require("./utils");

const store = createStore();

const datasources = {
  quakeAPI: new QuakeAPI(),
  userAPI: new UserAPI({ store }),
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => datasources,
});

server.listen().then(({ url }) => {
  console.log("Server running at ", url);
});
