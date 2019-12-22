import { logger } from '../logger'
import fetch from 'node-fetch'
import weather = require('../util/weather')
import DiscordBot from '../discord'
module.exports = async (client: any) => {
    logger.info(`Logged in as ${client.user.tag}!`)
    // client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
    client.user.setActivity(`Fun and help`, {type: "PLAYING"})
    // Get weather info and stock data
    const {stockChannel: discordChannel} = client.config
    const channel = client.channels.get(discordChannel)
    await DiscordBot.postStocks()
    // send weather data
    weather.getWeather(client, channel)
}
