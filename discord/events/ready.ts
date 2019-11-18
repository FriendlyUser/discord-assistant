import { logger } from '../logger'
import fetch from 'node-fetch'
import weather = require('../util/weather')
module.exports = async (client: any) => {
    logger.info(`Logged in as ${client.user.tag}!`)

    // client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
    client.user.setActivity(`Fun and help`, {type: "PLAYING"})
    // Get weather info and stock data
    const channel = client.channels.get("571860897887289410")
    const baseUrl = 'https://my-go-project.davidli012345.now.sh/api'
    const quotes = 'quotes=BB.TO,NEXCF,ABT.TO,AT.TO,ACB.TO,WMT.TO,CGC'
    fetch(`${baseUrl}/dsJSON.go?${quotes}`)
        .then((resp: { json: () => void; }) => {
            return resp.json()
        })
        .then((stocks: any) => {
            console.log(stocks)
            channel.send(`${stocks}`)
        })
        .catch((err: any) => {
            console.log(err)
        })
    fetch(`${baseUrl}/ds.go?${quotes}`)
        .then((resp: { text: () => void; }) => {
            return resp.text()
        })
        .then((stocks: any) => {
            console.log(stocks)
            channel.send(`\`\`\`${stocks}\`\`\``)
        })
        .catch((err: any) => {
            console.log(err)
        })
    // send weather data
    weather.getWeather(client, channel)
}
