const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql')
const { UserModel, PostModel, HobbyModel } = require('../model')
const { UserType, PostType, HobbyType } = require('./data-types')

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        profession: { type: GraphQLString },
      },
      resolve(_parent, args) {
        const newUser = new UserModel({ ...args })

        // save to mongoDB
        newUser.save()

        return newUser
      },
    },

    createPost: {
      type: PostType,
      args: {
        comment: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const newPost = new PostModel({ ...args })

        newPost.save()

        return newPost
      },
    },

    createHobby: {
      type: HobbyType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const newHobby = new HobbyModel({ ...args })

        newHobby.save()

        return newHobby
      },
    },
  },
})

module.exports = Mutation
