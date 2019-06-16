// https://github.com/Enterprise-JS/koa-typescript-starter
// convert to typescript later
import * as Koa from "koa";
// import * as Router from "koa-router";
import * as mount from 'koa-mount'
import schema from './graphql/schema'
import { initDB } from './services/database'
import * as logger from 'koa-logger'

import DiscordBot from './discord/discord'
const graphqlHTTP = require('koa-graphql');
// standard http for nodejs
// const https = require("https");
require('dotenv').config()

initDB();

// koa app content
const app = new Koa();

var server = app.listen(9000);

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})))
// MiddleWare
app.on('error', err => {
  console.log('server error', err)
});

// maybe export discord as well in a different modules
if(process.env.NODE_ENV != 'testing')
{
  new DiscordBot()
}

export default server