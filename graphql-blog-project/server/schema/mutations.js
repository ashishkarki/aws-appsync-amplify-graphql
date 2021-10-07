const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql')
const { UserType, PostType, HobbyType } = require('./data-types')

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        // id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve(_parent, args) {
        const newUser = { ...args }

        return newUser
      },
    },

    createPost: {
      type: PostType,
      args: {
        comment: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(_, args) {
        const newPost = { ...args }

        return newPost
      },
    },

    createHobby: {
      type: HobbyType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID },
      },
      resolve(_, args) {
        const newHobby = { ...args }

        return newHobby
      },
    },
  },
})

module.exports = Mutation
