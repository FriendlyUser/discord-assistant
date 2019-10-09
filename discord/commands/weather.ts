
/**
 * Create a new task by prompting user for name, category and priority
 */

import { HelpObj, ConfObj } from '../types/interfaces'
const fetch = require('node-fetch')

/**
 * @param client -- Discord Client
 * @param message --- message Object
 * @param args --- command line arguments, usually an array
 */
export const run = async (client: any, message: any, args: any): Promise<any> => { 
  const [city = 6174032, units="metric"] = args
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?id=${city}&units=${units}`
  const data = await fetch(`${baseUrl}&APPID=${process.env.WEATHER_APP_ID}`)
    .then((res: { json: () => void; }) => res.json())
    .then((body: any) => {
      message.channel.send(String(body))
      const { coord, weather, base, 
        main, wind, visibility,
        clouds, sys, timezone, 
        id, name 
      }: { coord: Object, weather: Array<Object>, 
        base: String, main: Object,
        wind: Object, clouds: Object, visibility: Number
        sys: Object, timezone: String,
        id: Number, name: String } = body
      console.log(weather[0])
      console.log(weather)
      const { main: weatherMain, description }: { main?: String, description?: String } = weather[0]
      const { temp_min, temp_max }: {temp_min?: Number, temp_max?: Number} = main
      const { sunrise }: { sunrise?: Number} = sys
      const { lon, lat }: { lon?: Number, lat?: Number } = coord
      const { speed, deg }: { speed?: Number, deg?: Number } = wind
      message.channel.send({
        embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: `${weatherMain}: ${description}`,
            url: baseUrl,
            description: `Location (${lon}, ${lat})`,
            fields: [{
                    name: "Temp Range",
                    value: `${temp_min} °C to ${temp_max} °C`
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
    })
    .catch((err: any) => {
      message.channel.send(String(err))
    })
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["weather"],
  permLevel: "Administrator"
}

export const help: HelpObj = {
  name: "weather",
  category: "Utility",
  description: "Grab the weather from open weather api",
  usage: `weather <city>`
}
