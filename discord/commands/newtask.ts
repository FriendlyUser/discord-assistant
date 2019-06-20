
/**
 * Create a new task by prompting user for name, category and priority
 */
import { addTaskQuery } from '../util/queries'
const { request } = require('graphql-request')\
import { ConfObj, HelpObj } from '../types/interfaces'
export const run = async (client: any, message: any) => { 
    const { prefix, port } = client.config
    message.channel.send('Enter task seperated by: name, category and priority.')
    .then(() => {
      message.channel.awaitMessages((response: { content: String; }) => response.content.length > 0, {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
      .then((collected: { first: () => { content: any; }; }) => {
          // message.channel.send(`The collected message was: ${collected.first().content}`);
          let content = collected.first().content.slice(prefix.length).split(',');
          if (content.length < 2) {
            message.channel.send('Not enough arguments specified, try used a comma seperated list.')
            return
          }
          let start_date = new Date()
          let end_date = start_date
          end_date.setDate(end_date.getDate() + 7);
          const [name, category, priority] = content
          const query = addTaskQuery(name, start_date, end_date, category, priority)
          // localhost works because hosted on same server
          request(`http://localhost:${port}/graphql`, query)
          .then((data: any) => {
            // need helper function to convert json to parsable discord statements.
            message.reply(JSON.stringify(data))
            return
          })
          .catch((err: any) => {
            message.reply(JSON.stringify(err))
          })
        })
        .catch(() => {
          message.channel.send('There was no collected message that passed the filter within the time limit!');
        })
    })
}

export const conf: ConstObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["newtask", "newtasks"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "newtask",
  category: "TodoList",
  description: "Add new Task to Mongo Database, with prompted fields",
  usage: `newtask`,
  list_args: ["name", "category", "priority"],
};