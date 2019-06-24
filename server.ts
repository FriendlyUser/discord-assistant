// https://github.com/Enterprise-JS/koa-typescript-starter
// convert to typescript later

require('dotenv').config()

import * as Koa from "koa";
import * as mount from 'koa-mount'
import schema from './graphql/schema'
import { initDB } from './services/database'
import DiscordBot from './discord/discord'
import config from './discord/config'
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

// MiddleWare
app.on('error', err => {
  console.log('server error', err)
})

// TODO add logic to loop, add crypto news generator
// CREATE ADDING MORE COMMENTS, plotting functionality for crypto news
// add coursea, or edx course scrapping.
// const https = require('https');
// setInterval( function(){ 
//   var hour = new Date().getHours();
//   // changing 13 < 23 to a 1 and 23 cause why not, i got plenty of heroku time I'm not using
//   if ((hour >= 9 && hour < 16)) {
//      https.get(`127.0.0.1`);
//       https.get(`27.0.0.1:9000`);
//   }
// } , 27*1000*60); 

// maybe export discord as well in a different modules
if(process.env.NODE_ENV != 'testing')
{
  new DiscordBot()

  app.use(async ctx => 
    { ctx.body = '<h1>Graphql</h1> <p>Check at Graphql port 9000</p>' }
  )
  var hour = new Date().getHours();
  console.log(hour)
  setInterval( function() { 
    var hour = new Date().getHours();
    //console.log(hour)
    //   // changing 13 < 23 to a 1 and 23 cause why not, i got plenty of heroku time I'm not using
    if ((hour >= 0 && hour < 4 || hour >= 17 && hour <= 24)) {
          https.get(`https://dli-discord-assist.herokuapp.com/`);
          https.get(`https://dli-discord-assist.herokuapp.com/:${port}`);
    }
  } , 27*1000*60); 
}

export default server