
/**
 * Create a new task by prompting user for name, category and priority
 */

import { HelpObj, ConfObj } from '../types/interfaces'
import weather = require('../util/weather')

/**
 * @param client -- Discord Client
 * @param message --- message Object
 * @param args --- command line arguments, usually an array
 */
export const run = async (client: any, message: any, args: any): Promise<any> => { 
  // update function to use arguments or something
  const [city = 6174032, units="metric"] = args
  weather.getWeather(client, message.channel)
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
