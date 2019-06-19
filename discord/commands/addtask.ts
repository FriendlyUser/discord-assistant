
/**
 * Create a new task by prompting user for name, category and priority
 */
import { addTaskQuery } from '../util/queries'
const { request } = require('graphql-request')
exports.run = async (client: any, message: any, args: any) => { 
    const { prefix, port } = client.config
    let start_date = new Date()
    let end_date = start_date
    end_date.setDate(end_date.getDate() + 7);
    const [name="", category="other", priority="normal"] = args
    if(args.length < 1) {
        message.channel.send('Please Enter more Arguments')
        return
    }
    const query = addTaskQuery(name, start_date, end_date, category, priority)
    // localhost works because hosted on same server
    // this.logging.info(query)
    request(`http://localhost:${port}/graphql`, query)
    .then((data: any) => {
        // console.log(data)
        // need helper function to convert json to parsable discord statements.
        message.reply(JSON.stringify(data))
        return
    })
    .catch((err: any) => {
        message.reply(JSON.stringify(err))
    })
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["addtask", "addtasks"],
  permLevel: "Administrator"
};

exports.help = {
  name: "addtask",
  category: "TodoList",
  description: "Add new Task to DB, with comma seperated list",
  usage: `addtask <name>, <priority>, <category>`,
  list_args: ["name", "category", "priority"],
};