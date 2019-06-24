/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/

import { noWhiteSpace } from '../util/helper'
import { ConfObj, HelpObj } from '../types/interfaces'
export const run = async (client: any, message: any, args: any) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = client.commands
    const {prefix} = client.config
    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long: number, str: { length: number; }) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${prefix}help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p: { help: { category: number; name: number; }; }, c: { help: { category: number; name: number; }; }) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( (c: any) => {
      const cat = c.help.category
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    })
    message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      const {name, description, usage, list_args} = command.help
      const {aliases} = command.conf
      let help_msg = noWhiteSpace`= ${name} =
      \n${description}
      \nusage:: ${usage} ${list_args !== undefined ? `\npromptArgs:: ${list_args.join(", ")}` : ''}
      \naliases:: ${aliases.join(", ")}\n= ${name} =`
      message.channel.send(help_msg, {code:"asciidoc"})
    }
  }
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

export const help: HelpObj = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};