const { GraphQLSchema } = require('graphql')

// Root query as starting point
const RootQuery = require('./root-query')

// Mutations

module.exports = new GraphQLSchema({
  query: RootQuery,
})
