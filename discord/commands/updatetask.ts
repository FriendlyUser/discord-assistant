
/**
 * Create a new task by prompting user for name, category and priority
 */
const { request } = require('graphql-request')
import { ConfObj, HelpObj, TodoObj } from '../types/interfaces'
import { updateTask } from '../util/queries'
export const run = async (client: any, message: any, args: any) => { 
    const { port } = client.config
    // TODO export list of queries to text file
    const [id, name, category="", priority="", start_date="", end_date="", url=""] = args
    // get data for current task and then display message allowing user to update said task
    // or have remove on embeds propogate and delete the task
    let updated_todo : TodoObj = {id, name, category, priority, start_date, end_date, url}
    let query = updateTask(updated_todo)
    request(`http://localhost:${port}/graphql`, query)
    .then((null_data: { [x: string]: any; }) => {
        message.channel.send(JSON.stringify(null_data))
    })
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["updatetask", "updateTask"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "updatetask",
  category: "Todo",
  description: "Remove a specified task",
  usage: `updatetask <task id>`,
};