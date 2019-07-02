const { ApolloServer } = require('apollo-server')
const { buildFederatedSchema } = require('@apollo/federation')
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const WeatherAPI = require('./datasources/weather')

require('dotenv').config()

const server = new ApolloServer({
  dataSources: () => {
    return {
      weatherAPI: new WeatherAPI(),
    }
  },
  schema: buildFederatedSchema([
    {
      resolvers,
      typeDefs,
    },
  ]),
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
