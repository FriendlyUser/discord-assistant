
/**
 * Create a new task by prompting user for name, category and priority
 */
const { request } = require('graphql-request')
import { ConfObj, HelpObj } from '../types/interfaces'
import { removeTask } from '../util/queries'
export const run = async (client: any, message: any, args: any) => { 
    const { port } = client.config
    console.log(args)
    const [id=""] = args
    // TODO export list of queries to text file
    let query = removeTask(id)
    console.log(removeTask)
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
  name: "removetask",
  category: "Todo",
  description: "Remove a specified task",
  usage: `removetask <task id>`,
};