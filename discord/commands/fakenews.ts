
/**
 * Create a new task by prompting user for name, category and priority
 */
import { ConfObj, HelpObj } from '../types/interfaces'
import DiscordBot from '../discord'
export const run = async (client: any, message: any) => { 
    let message_news = await DiscordBot.get_fake_crypto_news()
    message.channel.send(message_news)
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["fakenews", "fakenew"],
  permLevel: "Administrator"
};

export const help: HelpObj = {
  name: "fakenews",
  category: "News",
  description: "Generate a fake news title for Ethereum.",
  usage: `fakenews`,
};