// https://github.com/Enterprise-JS/koa-typescript-starter
// convert to typescript later
const Koa = require('koa');

const mount = require('koa-mount');
const graphqlHTTP = require('koa-graphql');
const schema = require('./graphql/schema');

const initDB = require('./database');

// standard http for nodejs
// const https = require("https");
const { request } = require('graphql-request')
require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

initDB();

// koa app content
const app = new Koa();

app.listen(9000);

app.use(mount('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
})))

app.on('error', err => {
  log.error('server error', err)
});

// discord content for todo list
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
  // option 2 would be to ask for multiple content
  if(msg.content.includes("!addtask")) 
  {
    console.log(msg)
    var msg_info = msg.content
    // should have name, category and priority seperated by commas
    var data = msg_info.split(",");
    // have days via gitlab ci format w,m,h
    // hardcode for the first task
    let start_date = new Date()
    let end_date = start_date 
    end_date.setDate(end_date.getDate() + 7)
    console.log(data)
    let query = `
      mutation {
        addTask(name: "${data[1]}", start_date: "${formatDate(start_date)}", end_date: "${formatDate(end_date)}", category: "${data[2]}", priority: "${data[3]}") {
            id
            name
            start_date
            end_date
            category
            priority
        }
    }`
    console.log(query)
    request('http://localhost:9000/graphql', query)
    .then(data => {
      // console.log(data)
      // need helper function to convert json to parsable discord statements.
      msg.reply(JSON.stringify(data))
    })
    .catch(err => {
      msg.reply(JSON.stringify(err))
    })
    
  }
  if(msg.content === '!help') {
    msg.send("Help is out the way")
  }
  if(msg.content === '!tasks') {
    let query = `{
      queryAllTasks {
        name,
        id
      }
    }`
    request('http://localhost:9000/graphql', query)
    .then(data => {
      console.log(data)
      msg.reply(JSON.stringify(data))
    })
    .catch(err => {
      msg.reply(JSON.stringify(err))
    })
    
  }
  // try getting data from server
});

// get new token later
client.login(process.env.DISCORD_TOKEN)