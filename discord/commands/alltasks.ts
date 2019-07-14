
import { queryAllTasks } from '../util/queries'
import { TodoObj, ConfObj, HelpObj } from '../types/interfaces'
const { request } = require('graphql-request')
export const run = async (client: any, message: any) => { 
    const { port } = client.config
    const query = queryAllTasks()
    request(`http://localhost:${port}/graphql`, query)
    .then((query_all_tasks: { [x: string]: any; }) => {
        let todo_list = query_all_tasks.queryAllTasks
        todo_list.forEach( (todo: TodoObj) => {
            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: todo.name,
                    url: "http://google.com",
                    description: `Start Date: ${todo.start_date} \t \t \t End Date: ${todo.end_date}`,
                    fields: [{
                        name: "Category",
                        value: `${todo.category}`
                        },
                        {
                        name: "Priority",
                        value: `${todo.priority}`
                        },
                        {
                        name: "Id",
                        value: `${todo.id}`
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Example"
                    }
                }
            })
            .then((embedMessage: any) => {
                embedMessage.react('😄')
                .then((success: any) => {
                    console.log(success)
                })
                .catch((error: any) => {
                    console.log(error)
                })
            })
            .catch((error: any) => {
                console.log(error)
            })

        }) 
    })
}

export const conf: ConfObj = {
  enabled: true,
  aliases: ["alltasks", "alltask"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "alltasks",
  category: "TodoList",
  description: "Display All Tasks Using Discord Embeds",
  usage: "alltasks",
};
