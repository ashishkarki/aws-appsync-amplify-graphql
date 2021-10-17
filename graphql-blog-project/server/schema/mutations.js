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
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString },
      },
      resolve: (_parent, args) => {
        const updatedUser = UserModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              ...args,
            },
          },
          {
            new: true,
          },
        )

        return updatedUser
      },
    },

    updatePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: GraphQLString },
        // userId: { type: GraphQLID },
      },
      resolve: (_parent, args) => {
        const updatedPost = PostModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              ...args,
            },
          },
          {
            new: true,
          },
        )

        return updatedPost
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

    updateHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        // userId: { type: GraphQLID },
      },
      resolve: (_parent, args) => {
        const updatedHobby = HobbyModel.findByIdAndUpdate(
          args.id,
          {
            $set: {
              ...args,
            },
          },
          {
            new: true,
          },
        )

        return updatedHobby
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
