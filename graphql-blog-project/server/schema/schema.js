const { GraphQLSchema } = require('graphql')

// Root query as starting point
const RootQuery = require('./root-query')

// Mutations
const Mutation = require('./mutations')

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
