import { OpenWeather } from "tsc-openweather";

module weather {
  export function getWeather(client: { user: { username: any; avatarURL: any; }; }, channel: { send: { (arg0: string): void; (arg0: { embed: { color: number; author: { name: any; icon_url: any; }; title: string; description: string; fields: { name: string; value: string; }[]; timestamp: string; footer: { icon_url: any; text: string; }; }; }): void; (arg0: string): void; }; }) {
    const Weather = new OpenWeather(process.env.WEATHER_APP_ID)
    // export to utility function
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
}

export = weather