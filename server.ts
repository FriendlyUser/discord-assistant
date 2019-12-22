// https://github.com/Enterprise-JS/koa-typescript-starter
// convert to typescript later

require('dotenv').config()

import * as Koa from "koa";
import * as mount from 'koa-mount'
import schema from './graphql/schema'
import { initDB } from './services/database'
import DiscordBot from './discord/discord'
import config from './discord/config'
import puppeter from './services/api/puppeter'
const { port } = config
const https = require("https")

const graphqlHTTP = require('koa-graphql');
// standard http for nodejs
// const https = require("https");

initDB();

// koa app content
const app = new Koa();

let server = app.listen(port);

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})))

app.use(puppeter.routes())

app.on('error', err => {
  console.log('server error', err)
})

if(process.env.NODE_ENV != 'testing')
{
  let bot = new DiscordBot()

  app.use(async ctx => 
    { ctx.body = '<h1>Graphql</h1> <p>Check at Graphql port 9000</p>' }
  )
  setInterval(() => { 
    var hour = new Date().getHours()
    //   // changing 13 < 23 to a 1 and 23 cause why not, i got plenty of heroku time I'm not using
    if ((hour >= 0 && hour < 4 || hour >= 17 && hour <= 24)) {
          https.get(`https://dli-discord-assist.herokuapp.com/`)
          https.get(`https://dli-discord-assist.herokuapp.com/:${port}`)
          var currDate = new Date()
          // only post on monday to friday
          // TODO make it only for days the market is open
          if(currDate.getDate() > 0 && currDate.getDate() < 6) {
            DiscordBot.postStocks()
          }
          // run function to check if messages should be posted about stock prices
    }
  } , 27*1000*60)
}

export default server