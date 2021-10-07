const express = require('express')
const { graphqlHTTP } = require('express-graphql')

/// variables
const EXPRESS_PORT = 5000
/// end of variables

const schema = require('./schema/schema')
const typesSchema = require('./schema/types_schema')

const app = express()

// endpoints
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: typesSchema,
  }),
)

app.listen(EXPRESS_PORT, () => {
  console.log(`App started in port: ${EXPRESS_PORT}`)
})
