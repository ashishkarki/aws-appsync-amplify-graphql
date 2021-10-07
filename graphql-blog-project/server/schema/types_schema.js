const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql')

// Scalar Types: string, int, float, boolean, ID
const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Person Type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    isMarried: { type: GraphQLBoolean },
    gpa: { type: GraphQLFloat },

    randomType1: {
      type: Person,
      resolve: (parent, _) => parent,
    },
  }),
})

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'some new root query',
  fields: {
    person: {
      type: Person,
      resolve: () => {
        const tempPerson = {
          name: 'Ash K',
          age: 35,
          isMarried: true,
          gpa: 3.5,
        }

        return tempPerson
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
