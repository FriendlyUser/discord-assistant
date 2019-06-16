const Discord = require('discord.js');
const client = new Discord.Client();
const { request } = require('graphql-request')
import { logger } from './logger'

function formatDate(date: string | number | Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

class DiscordBot {
  logger: any;
    constructor () {
        // read config if added
        this.login(process.env.DISCORD_TOKEN)
        this._handle_messages()
        this.logger = logger
    }
    login(token: string) {
        // if (this.bot) return log.general.error('Cannot login when already logged in')
        client.login(token)
    }
    _handle_messages () {
      // discord content for todo list
      client.on('ready', () => {
          this.logger.info(`Logged in as ${client.user.tag}!`);
      });
      client.on('message', 
        (msg: { content: 
          string; reply: { (arg0: string): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; }; 
          send: (arg0: string) => void; channel: { send: { (arg0: string): void; (arg0: string): void; }; }; }) => {
        

        if (msg.content === 'ping') {
          msg.reply('pong')
        }
        // hardcoded prefix for now
        // list commands. commands that might have commas
        let listcommands = ['addtask']
        let prefix = '!'
        let args: string[] = []
        let command = ''

        // check for commas, if so parse arguments for commas
        if (msg.content.includes(',')) {
          listcommands.forEach( (item, index) => {
            if(msg.content.toLowerCase().includes(item)) {
              args = msg.content
                    .slice(prefix.length + listcommands[index].length)
                    .split(',');
              command = args.shift().toLowerCase();
            }
          })
        } else {
          // split by spaces
          args = msg.content.slice(prefix.length).split(' ');
          command = args.shift().toLowerCase();
        }
        // const args = msg.content.slice(prefix.length).split(' ');
        // option 2 would be to ask for multiple content
        if(command === 'addtask') 
        {
          let start_date = new Date()
          let end_date = start_date 
          end_date.setDate(end_date.getDate() + 7)
          if (args.length < 2) args[2] = 'normal'
          let query = `
            mutation {
              addTask(name: "${args[0]}", start_date: "${formatDate(start_date)}", end_date: "${formatDate(end_date)}", category: "${args[1]}", priority: "${args[2]}") {
                  id
                  name
                  start_date
                  end_date
                  category
                  priority
              }
          }`
          this.logger.info(query)
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
        if(command === 'help') {
          msg.send("Help is out the way")
        }
        if(command === 'tasks') {
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
            this.logger.info("Sending Query to Server")
            this.logger.debug(query)
            // get first key
            var keys = Object.keys(data);
            // access first object
            let todo_list = data[keys[0]]
            msg.channel.send("Getting Todo list data")
            let send_arr: any[] | string[] = []
            if (todo_list == []) {
              msg.channel.send("List is Empty")
            } 
            else {
              msg.channel.send("Testing Here")
              if(todo_list !== []) {
                todo_list.forEach(function (todo: { [x: string]: any; }, index: any) {
                  let item_keys = Object.keys(todo)
                  item_keys.forEach(function (data_item, index) {
                    // msg.channel.send(" --- " + data_item + todo[data_item])
                    if (todo[data_item]) send_arr.push(`:crossed_swords:    **${data_item}**: ${todo[data_item]}`)// msg.channel.send(`:crossed_swords:    **${data_item}**: ${todo[data_item]}`)
                    // convert timestamps to 
                  })
                  send_arr.push(`--------------------------------------`)
                  // msg.channel.send(`--------------------------------------`)
                })
                // msg.channel.send(send_arr.join('\n'))
              }
            }
          })
          .catch((err: any) => {
            this.logger.error(err)
          })
          
        }
        // try getting data from server
      });
    }
}
export default DiscordBot