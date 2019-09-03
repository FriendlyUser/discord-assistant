
import { queryAllTasks } from '../util/queries'
import { TodoObj, ConfObj, HelpObj } from '../types/interfaces'
import { removeTask } from '../util/queries'
const { request } = require('graphql-request')
export const run = async (client: any, message: any) => { 
    const { port } = client.config
    const query = queryAllTasks()
    request(`http://localhost:${port}/graphql`, query)
    .then((query_all_tasks: { [x: string]: any; }) => {
        let todo_list = query_all_tasks.queryAllTasks
        todo_list.forEach( (todo: TodoObj) => {
            let {name="N/A", category="N/A", priority="N/A"} = todo
            // for blank whitespace, convert to N/A strings
            if ((category && !category.trim()) || category == '') category = "N/A"
            if ((priority && !priority.trim()) || priority == '') priority = "N/A"
            console.log(category, priority)
            message.channel.send({
                embed: {
                    color: 3447003,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: name,
                    url: "http://google.com",
                    description: `Start Date: ${todo.start_date} \t \t \t End Date: ${todo.end_date}`,
                    fields: [{
                            name: "Category",
                            value: `${category}`
                        },
                        {
                            name: "Priority",
                            value: `${priority}`
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
                Promise.all([
                    embedMessage.react('❌'),
                    embedMessage.react('✅')
                ])
                .catch(() => console.error('One of the emojis failed to react.'));

                const filter = (reaction: { emoji: { name: string; }; }, user: { id: any; }) => {
                    return reaction.emoji.name === '❌' && user.id === message.author.id;
                };
                // only two people can respond
                embedMessage.awaitReactions(filter, { max: 2, time: 30000, errors: ['time'] })
                .then((collected: { size: any; }) => {
                    console.log(`Response detected to delete: ${collected.size}`)
                })
                .catch((collected: { size: any; }) => {
                    console.log(`After a half minute, only ${collected.size} out of 4 reacted.`);
                    if (collected.size) {
                        const {id} = todo
                        const query = removeTask(id)
                        request(`http://localhost:${port}/graphql`, query)
                        .then((null_data: { [x: string]: any; }) => {
                            message.channel.send(JSON.stringify(null_data))
                        })
                    }
                });
            })
            .catch((error: any) => {
                console.log("invalid form body?")
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
