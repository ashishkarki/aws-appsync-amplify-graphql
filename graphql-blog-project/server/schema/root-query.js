const graphql = require('graphql')
const { UserType, HobbyType, PostType } = require('./data-types')

const { GraphQLID, GraphQLObjectType, GraphQLList } = graphql

// temp store
const { usersData, hobbiesData, postsData } = require('../fakeData')

// Root Query: query to get the structure/schema
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'root query',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => {
        return usersData.find((fakeUser) => fakeUser.id === args.id)
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (_parent, _args) => {
        return usersData
      },
    },

    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => {
        return hobbiesData.find((fakeHobby) => fakeHobby.id === args.id)
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve: () => {
        return hobbiesData
      },
    },

    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => {
        return postsData.find((fakePost) => fakePost.id === args.id)
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: () => {
        return postsData
      },
    },
  },
})

module.exports = RootQuery
