const { gql } = require('apollo-server')

module.exports = gql`
  extend type Query {
    weather(coords: [Float]): Weather
  }

  type Weather @key(fields: "coords") {
    summary: String
    temperature: Float
    coords: [Float]
  }
`
