module.exports = {
  Query: {
    quakes: (_, __, { dataSources }) => dataSources.quakeAPI.getAllQuakes(),
  },
};
