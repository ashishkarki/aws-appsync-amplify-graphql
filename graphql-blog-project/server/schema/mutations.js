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
    removeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        const removedUser = UserModel.findByIdAndDelete(args.id).exec()

        if (!removedUser) {
          throw new Error(`User with id: ${args.id} not found!!`)
        } else {
          return removedUser
        }
      },
    },

    removePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_, args) => {
        const removedPost = PostModel.findByIdAndDelete(args.id).exec()

        if (!removedPost) {
          throw new Error(`Post with id: ${args.id} not found!!`)
        }

        return removedPost
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

    removeHobby: {
      type: HobbyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, args) => {
        const removedHobby = await HobbyModel.findByIdAndDelete(args.id).exec()

        if (!removedHobby) {
          throw new Error(`Hobby with id: ${args.id} not found!!`)
        }

        return removedHobby
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
