
/**
 * Create a new task by prompting user for name, category and priority
 */
const { request } = require('graphql-request')
import { ConfObj, HelpObj } from '../types/interfaces'
import { removeAllTasks } from '../util/queries'
export const run = async (client: any, message: any) => { 
    const { port } = client.config
    // TODO export list of queries to text file
    let query = removeAllTasks()
    request(`http://localhost:${port}/graphql`, query)
    .then((null_data: { [x: string]: any; }) => {
        message.channel.send(JSON.stringify(null_data))
    })
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["removealltasks", "removealltask"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "removealltasks",
  category: "News",
  description: "Remove all tasks in MongoDB.",
  usage: `removealltasks`,
};