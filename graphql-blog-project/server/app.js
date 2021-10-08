const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')
// const typesSchema = require('./schema/types_schema')
const { MONGO_ATLAS_URL } = require('./secrets')

/// variables
const EXPRESS_PORT = 5000
/// end of variables

// create the express app
const app = express()

// connect to MongoDb Atlas
mongoose.connect(MONGO_ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
  console.log('connected to mongo')
})

// endpoints
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  }),
)

app.listen(EXPRESS_PORT, () => {
  console.log(`App started in port: ${EXPRESS_PORT}`)
})
