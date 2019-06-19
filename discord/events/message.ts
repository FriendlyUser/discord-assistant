// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.

export default async (client: any, message: any) => {
    const {prefix} = client.config
    // Ignore all bots
    if (message.author.bot) return;
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(prefix) !== 0) return;
    let listcommands = ['addtask']
    let args: string[] = []
    let command = ''
    // check for commas, if so parse arguments for commas
    if (message.content.includes(',')) {
        // find the correct list command
        listcommands.forEach( (item, index) => {
          if(message.content.toLowerCase().includes(item)) {
            args = message.content
                  .slice(prefix.length + listcommands[index].length)
                  .split(',');
            command = listcommands[index]
          }
        })
      } else {
        // split by spaces
        args = message.content.slice(prefix.length).split(' ')
        command = args.shift().toLowerCase()
    }

    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command)

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return
    cmd.run(client, message, args)
}
