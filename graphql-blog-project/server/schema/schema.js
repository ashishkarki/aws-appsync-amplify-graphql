const { GraphQLSchema } = require('graphql')

// Root query as starting point
const RootQuery = require('./root-query')
const Mutation = require('./mutations')

// Mutations

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
