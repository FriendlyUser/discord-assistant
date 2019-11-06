import { logger } from '../logger'
import fetch from 'node-fetch'
import {OpenWeather} from 'tsc-openweather'
module.exports = async (client: any) => {
    logger.info(`Logged in as ${client.user.tag}!`)

    // client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
    client.user.setActivity(`Fun and help`, {type: "PLAYING"})
    // Get weather info and stock data
    const channel = client.channels.get("571860897887289410")
    fetch('https://my-go-project.davidli012345.now.sh/api/json.go?quotes=BB.TO,NEXCF')
        .then((resp: { json: () => void; }) => {
            return resp.json()
        })
        .then((stocks: any) => {
            console.log(stocks)
            channel.send(stocks)
        })
        .catch((err: any) => {
            console.log(err)
        })
    fetch('https://my-go-project.davidli012345.now.sh/api/discordStock.go?quotes=BB.TO,NEXCF')
        .then((resp: { text: () => void; }) => {
            return resp.text()
        })
        .then((stocks: any) => {
            console.log(stocks)
            channel.send(stocks)
        })
        .catch((err: any) => {
            console.log(err)
        })
    // send weather data
    const Weather = new OpenWeather(process.env.WEATHER_APP_ID)
    Weather.getWeatherByCityId(6174032, (err: any, currentWeather: any) => {
    if (err) {
      console.log(err)
      channel.send(String(err))
    }
    else {
      const { coord, weather=[], base, 
        main, wind, visibility,
        clouds, sys, timezone, 
        id, name 
      }: { coord: Object, weather: Array<Object>, 
        base: String, main: Object,
        wind: Object, clouds: Object, visibility: Number
        sys: Object, timezone: String,
        id: Number, name: String } = currentWeather
      const { main: weatherMain, description }: { main?: String, description?: String } = weather[0]
      const { temp_min, temp_max }: {temp_min?: number, temp_max?: number} = main
      const { sunrise }: { sunrise?: Number} = sys
      const { lon, lat }: { lon?: Number, lat?: Number } = coord
      const { speed, deg }: { speed?: Number, deg?: Number } = wind
      channel.send({
        embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: `${weatherMain}: ${description}`,
            description: `Location (${lon}, ${lat})`,
            fields: [{
                    name: "Temp Range",
                    value: `${temp_min - 273.15} °C to ${temp_max - 273.15} °C`
                },
                {
                    name: "Visibility",
                    value: `${visibility}`
                },
                {
                    name: "Location",
                    value: `${name} -- ${id}`
                },
                {
                    name: "Sunrise",
                    value: `${sunrise}`
                }
            ],
            timestamp: `${sunrise}: ${timezone}`,
            footer: {
                icon_url: client.user.avatarURL,
                text: `Wind --- Speed: ${speed} -- Deg: ${deg}`
            }
          }
        })
      }
    })
    channel.send('Anime Out Logging In')
}