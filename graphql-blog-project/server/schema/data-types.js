const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql')

const { usersData, hobbiesData, postsData } = require('../fakeData')

// create types
const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User object description',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: { type: GraphQLString },

    posts: {
      type: new GraphQLList(PostType),
      resolve: (parent, _args) => {
        return postsData.filter((post) => post.userId === parent.id)
      },
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve: (parent, _args) => {
        return hobbiesData.filter((hobby) => hobby.userId === parent.id)
      },
    },
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

module.exports = {
  UserType,
  HobbyType,
  PostType,
}
