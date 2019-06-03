// https://github.com/Enterprise-JS/koa-typescript-starter
// convert to typescript later
const Koa = require('koa');

const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');

const initDB = require('./database');

require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

initDB();

const app = new Koa();

app.listen(9000);

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})))

app.on('error', err => {
  log.error('server error', err)
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
  // try getting data from server
});

// get new token later
client.login(process.env.DISCORD_TOKEN)