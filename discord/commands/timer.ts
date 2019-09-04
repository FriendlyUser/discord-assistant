
/**
 * Create a new task by prompting user for name, category and priority
 */
import { ConfObj, HelpObj } from '../types/interfaces'
export const run = async (client: any, message: any, args: any) => { 
  if(args.length < 1) {
    message.channel.send('Please Enter more Arguments and try again.')
    return
  }
  let now = new Date();
  let start_time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
  const [time] = args
  if (isNaN(time)) {
    // if this was production, I would have a prompt to ask again, but its not
    message.channel.send('Please enter numeric values for timer next time.')
    return
  }

  setTimeout(function() {

    now = new Date();
    let end_time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    // message.reply(`Timer has finished! Start Time: ${start_time} End Time: ${end_time}`);
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: `Timer Notification ${now.getMonth()}/${now.getDay()}`,
        url: 'https://friendlyuser.github.io/discord-assistant-bot/',
        description: `Timer has finished! Ran for ${time} seconds`,
        fields: [{
                name: "Time",
                value: `${time} seconds`
            },
            {
                name: "Start Time",
                value: `${start_time}`
            },
            {
                name: "End Time",
                value: `${end_time}`
            }
        ],
        timestamp: new Date(),
        footer: {
            icon_url: client.user.avatarURL,
            text: "Made by assistant Bot"
        }
      }
    })

  }, time * 1000);
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["timer", "time"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "timer",
  category: "Util",
  description: "Add Basic Timer Using Timeout in Seconds",
  usage: `timer <SECODNDS>`
};