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
  context: async ({ req }) => {
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");

    const usercheck = await store.users.map((user) => {
      if (email === user.email) {
        return user;
      }
    });

    let users = [];
    await usercheck.forEach((item) => {
      if (item) {
        users.push(item);
      }
    });

    const user = users && users[0] ? users[0] : null;

    return { user };
  },
  typeDefs,
  resolvers,
  dataSources: () => datasources,
});

server.listen().then(({ url }) => {
  console.log("Server running at ", url);
});
