
import { queryAllTasks } from '../util/queries'
import { TodoObj, ConfObj, HelpObj } from '../types/interfaces'
const { request } = require('graphql-request')
import { logger } from '../logger'
import DiscordBot from '../discord'
export const run = async (client: any, message: any) => { 
    const { port } = client.config
    const query = queryAllTasks()
    request(`http://localhost:${port}/graphql`, query)
    .then((data: { [x: string]: any; }) => {
    logger.info("Sending Query to Server")
    logger.debug(query)
    // get first key
    var keys = Object.keys(data);
    // access first object
    let todo_list = data[keys[0]]
    message.channel.send("Getting Todo list data")
    let full_arr: any[] | string[] = []
    if (todo_list === []) {
        message.channel.send("List is Empty")
    } 
    else {
        if(todo_list !== []) {
        todo_list.forEach(function (todo: { [x: string]: any; }, index: any) {
            let item_keys = Object.keys(todo)
            item_keys.forEach(function (data_item, index) {
            // msg.channel.send(" --- " + data_item + todo[data_item])
            if (todo[data_item]) full_arr.push(`:crossed_swords:    **${data_item}**: ${todo[data_item]}`)// msg.channel.send(`:crossed_swords:    **${data_item}**: ${todo[data_item]}`)
            // convert timestamps to 
            })
            full_arr.push(`--------------------------------------`)
        })
        let big_string = full_arr.join('\n')
        let send_arr: any | string[] = DiscordBot.chunk_string(big_string, 1990)
        // TODO come up with better approach aka for loop or equivalent.
        send_arr.forEach( (small_string: string) => {
            message.channel.send(small_string)
        })
        }
    }
    })
    .catch((err: any) => {
        logger.error(err)
    })
}

export const conf: ConfObj = {
  enabled: true,
  aliases: ["tasks"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "tasks",
  category: "TodoList",
  description: "Display All Tasks Using Typical List",
  usage: "tasks",
};
