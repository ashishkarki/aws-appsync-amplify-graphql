const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')
// const typesSchema = require('./schema/types_schema')
let MONGO_ATLAS_URL = ''
try {
  MONGO_ATLAS_URL = require('./secrets')
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    MONGO_ATLAS_URL = process.env.MONGO_ATLAS_URL
  } else {
    throw new Error(`Error during require of MONGO_ATLAS_URL in app.js`)
  }
}

/// variables
const EXPRESS_PORT = process.env.PORT || 5000
/// end of variables

// cors
const cors = require('cors')

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

// enable cors for all origins
app.use(cors())

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
