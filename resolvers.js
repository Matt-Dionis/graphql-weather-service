module.exports = {
  Query: {
    weather: async (_, { coords }, { dataSources }) =>
      await dataSources.weatherAPI.getWeather(coords),
  },
  Weather: {
    __resolveReference: (reference, { dataSources }) => {
      return dataSources.weatherAPI.getWeather(reference.coords)
    },
  },
}
