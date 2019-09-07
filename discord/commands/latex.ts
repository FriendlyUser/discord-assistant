import { HelpObj, ConfObj, TodoObj } from '../types/interfaces'
import { queryAllTasks } from '../util/queries'
const { request } = require('graphql-request')
export const run = async (client: any, message: any, args: any): Promise<any> => { 
    
  const { port } = client.config
  const query = queryAllTasks()
  let now = new Date();
  let start_time = `${now.getFullYear()}/${now.getMonth()}/${now.getDay()}` 
  let TexTable = `\`\`\`js
\\begin{table}
\\begin{tabular}{p{3cm} c c c c}`
  request(`http://localhost:${port}/graphql`, query)
  .then((query_all_tasks: { [x: string]: any; }) => {
      let todo_list = query_all_tasks.queryAllTasks
      TexTable += `Name & Category & Priority \\\\ \\hline`
      todo_list.forEach( (todo: TodoObj) => {
        let {name} = todo
        let parsed = name.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        TexTable += ` ${parsed} & ${todo.category} & ${todo.priority} \\\\ \\hline`
      })
      TexTable += `
      \\end{tabular}
      \\caption{\\textbf{Todo List ${start_time}}}
      \\end{table}
      `
      TexTable += '```'
      message.channel.send(TexTable)
  })
}
  
export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["latex", "tex"],
  permLevel: "Administrator"
}
  
export const help: HelpObj = {
  name: "latex",
  category: "Util",
  description: `Outputs an file that can be used in my latex notes`,
  usage: `latex csv|tex`,
}
