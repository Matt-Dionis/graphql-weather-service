const request = require('request')
const { RESTDataSource } = require('apollo-datasource-rest')

class WeatherAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseUrl = 'https://api.darksky.net/forecast/'
    this.darkSkyApiKey = process.env.DARK_SKY_API_KEY
    this.urlParams = '?units=us&exclude=minutely,hourly,daily,flags'
  }

  getWeather(coords) {
    return new Promise((resolve, reject) => {
      request(
        `${this.baseUrl}${this.darkSkyApiKey}/${coords[0]},${coords[1]}${
          this.urlParams
        }`,
        (error, response, body) => {
          if (error) {
            reject(error)
          }
          const data = JSON.parse(body)
          const { summary, temperature } = data.currently
          resolve({
            coords,
            summary,
            temperature,
          })
        },
      )
    })
  }
}

module.exports = WeatherAPI
