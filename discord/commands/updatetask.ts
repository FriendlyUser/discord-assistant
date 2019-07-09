
/**
 * Create a new task by prompting user for name, category and priority
 */
const { request } = require('graphql-request')
import { ConfObj, HelpObj } from '../types/interfaces'
import { updateTask } from '../util/queries'
export const run = async (client: any, message: any, args: any) => { 
    const { port } = client.config
    // TODO export list of queries to text file
    const {id} = args
    let query = updateTask(id)
    request(`http://localhost:${port}/graphql`, query)
    .then((null_data: { [x: string]: any; }) => {
        message.channel.send(JSON.stringify(null_data))
    })
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["removetask", "removeTask"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "updatetask",
  category: "Todo",
  description: "Remove a specified task",
  usage: `updatetask <task id>`,
};