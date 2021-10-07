const graphql = require('graphql')
const { getFakeUsers, getFakeHobbies, getFakePosts } = require('../fakeData')
const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql

// store or temp DB
const usersData = getFakeUsers()
const hobbiesData = getFakeHobbies()
const postsData = getFakePosts()

// create types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User object description',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },
  }),
})

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby of a user',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent, _args) => {
        return usersData.find((user) => user.id === parent.userId)
      },
    },
  }),
})

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Blog Post of a user',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent, _args) => {
        return usersData.find((user) => user.id === parent.userId)
      },
    },
  }),
})

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
    hobby: {
      type: HobbyType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => {
        return hobbiesData.find((fakeHobby) => fakeHobby.id === args.id)
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => {
        return postsData.find((fakePost) => fakePost.id === args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
