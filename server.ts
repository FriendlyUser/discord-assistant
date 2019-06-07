// https://github.com/Enterprise-JS/koa-typescript-starter
// convert to typescript later
import * as Koa from "koa";
// import * as Router from "koa-router";
import * as mount from 'koa-mount'
import schema from './graphql/schema'
import initDB from './database'
import * as logger from 'koa-logger'

const graphqlHTTP = require('koa-graphql');
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
// MiddleWare
app.on('error', err => {
  console.log('server error', err)
});


function formatDate(date: string | number | Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

// maybe export discord as well in a different modules
if(process.env.NODE_ENV != 'testing')
{
// discord content for todo list
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', 
      (msg: { content: 
        string; reply: { (arg0: string): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; }; 
        send: (arg0: string) => void; channel: { send: { (arg0: string): void; (arg0: string): void; }; }; }) => {
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
    .then((data: any) => {
      // console.log(data)
      // need helper function to convert json to parsable discord statements.
      msg.reply(JSON.stringify(data))
    })
    .catch((err: any) => {
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
        id,
        start_date,
        end_date,
        category,
        priority
      }
    }`
    request('http://localhost:9000/graphql', query)
    .then((data: { [x: string]: any; }) => {

      // get first key
      var keys = Object.keys(data);
      // access first object
      console.log(keys)
      console.log(typeof(data))
      let data_cool = data[keys[0]]
      msg.channel.send("Getting Todo list data")
      // console.log(data)
      // msg.channel.send(JSON.stringify(data))
      // get each object of arrays
      let send_arr: any[] | string[] = []
      data_cool.forEach(function (todo: { [x: string]: any; }, index: any) {
        console.log(todo, index);
        // msg.channel.send(item)
        let item_keys = Object.keys(todo)
        item_keys.forEach(function (data_item, index) {
          // msg.channel.send(" --- " + data_item + todo[data_item])
          if (todo[data_item]) send_arr.push(`:crossed_swords:    **${data_item}**: ${todo[data_item]}`)// msg.channel.send(`:crossed_swords:    **${data_item}**: ${todo[data_item]}`)
          // convert timestamps to 
        })
        send_arr.push(`--------------------------------------`)
        // msg.channel.send(`--------------------------------------`)
      });

      msg.channel.send(send_arr.join('\n'))
      // let obj_keys = Object.keys(data[query_name])
      // console.log(query_name)
      // console.log(obj_keys)
      // for (const key of obj_keys) {
      //   console.log(key)
      // }

      // iterate across keys
    })
    .catch((err: any) => {
      msg.reply(JSON.stringify(err))
    })
    
  }
  // try getting data from server
});

// get new token later
client.login(process.env.DISCORD_TOKEN)

}

export default app