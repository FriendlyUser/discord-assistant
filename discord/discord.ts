/**
 * Discord.ts, used to connect to discord and main functionality for the discord bot is in here.
 * TODO Consider refactoring using the approach indicated by https://github.com/AnIdiotsGuide/guidebot/
 * and by https://anidiots.guide/first-bot/a-basic-command-handler
 */
const fs = require('fs')
const Enmap = require("enmap")
const Discord = require('discord.js')
const client = new Discord.Client()
const { request } = require('graphql-request')
const fetch = require('node-fetch')
import { logger } from './logger'
// import { port } from './config'

import config  from "./config"
client.config = config

const { port, prefix } = config

// eventually get rid of this class and use the tutorial approach
class DiscordBot {
  /**
   * @param logging kind of logger to use
   */
  logging: any;
    constructor () {
        // consider adding static function to dump messages to channel for debug purposes
        // read config if added
        // this._handle_messages()
        this.logging = logger
        fs.readdir("./discord/events/", (err: any, files: { forEach: (arg0: (file: string) => void) => void }) => {
          if (err) return console.error(err)
          files.forEach(async file => {
            // console.log(file)
            if (!file.endsWith(".ts") && !file.endsWith(".js")) return;
            const event = await require(`./events/${file}`)
            // console.log(event)
            let event_name = file.split(".")[0];
            client.on(event_name, event.bind(null, client))
          })
        })

        client.commands = new Enmap()
        client.aliases = new Enmap()

        fs.readdir("./discord/commands/", (err: any, files: { forEach: (arg0: (file: any) => void) => void }) => {
          if (err) return console.error(err)
          files.forEach(file => {
            if (!file.endsWith(".ts") && !file.endsWith(".js")) return
            let props = require(`./commands/${file}`)
            let commandName = file.split(".")[0]
            console.log(`Attempting to load command ${commandName}`)
            client.commands.set(commandName, props)
          });
        });
        // this._handle_messages()
        DiscordBot.login(process.env.DISCORD_TOKEN)
    }
    static chunk_string(str: string, length: number) {
      var _size = Math.ceil(str.length / length),
      _ret  = new Array(_size),
      _offset

      for (var _i=0; _i<_size; _i++) {
        _offset = _i * length;
        _ret[_i] = str.substring(_offset, _offset + length);
      }

      return _ret;
    }
    static login(token: string) {
        // if (this.bot) return log.general.error('Cannot login when already logged in')
        client.login(token)
        // paste stock prices and weather
    }
    static async get_fake_crypto_news() {
      // https://us-central1-openvpn-238104.cloudfunctions.net/function-2
      return fetch(config.fakeNewsURL)
      .then((res: { text: () => void; }) => res.text())
      .then((body: any) => { 
        return body
      })
    }
    _handle_messages () {
      client.on('message', 
        async (msg: { 
          author: any, content: any,
          reply: { (arg0: string): void; (arg0: string): void; (arg0: string): void; (arg0: string): void; },
          send: (arg0: string) => void; channel: { send: { (embed: Object): any; }, awaitMessages: any},
        }) => {
          if (msg.author.bot) return;
    // Ignore messages not starting with the prefix (in config.json)
    if (msg.content.indexOf(prefix) !== 0) return;
    let listcommands = ['addtask']
    let args: string[] = []
    let command = ''
    // check for commas, if so parse arguments for commas
    if (msg.content.includes(',')) {
        // find the correct list command
        listcommands.forEach( (item, index) => {
          if(msg.content.toLowerCase().includes(item)) {
            args = msg.content
                  .slice(prefix.length + listcommands[index].length)
                  .split(',');
            command = listcommands[index]
          }
        })
      } else {
        // split by spaces
        args = msg.content.slice(prefix.length).split(' ')
        command = args.shift().toLowerCase()
    }
        // try getting data from server

        if(command === 'removealltasks') 
        {
          // TODO export list of queries to text file
          let query = `mutation {
              removeAllTasks {
                id
              }
            }`
          request(`http://localhost:${port}/graphql`, query)
          .then((data: { [x: string]: any; }) => {
            msg.channel.send(JSON.stringify(data))
          })
        }
        if(command === 'fakenews') {
          let message = await Discord.get_fake_crypto_news()
          msg.channel.send(message)
        }
      })
    }
}
export default DiscordBot
