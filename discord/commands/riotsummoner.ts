
/**
 * Create a new task by prompting user for name, category and priority
 */
import { HelpObj, ConfObj } from '../types/interfaces'
import { Riot } from 'node-tft'
import { SummonerObj } from 'node-tft/dist/types'
export const run = async (client: any, message: any, args: any): Promise<any> => { 
  const [riotFunction = "", functionValue = "AnimeGrillPlayer"] = args
  const apiKey = process.env.RIOT_API_KEY ? process.env.RIOT_API_KEY : 'garbage value to fail sliently'
  const riot = new Riot()
  if(args.length < 2) {
    message.channel.send('Please Enter more Arguments and try again.')
    return
  }

  const createEmbed = (summonerObj: SummonerObj) => {
    return {
        embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: summonerObj.name,
            description: `Details for ${summonerObj.name}`,
            fields: [{
                    name: "Id",
                    value: `${summonerObj.id}`
                },
                {
                    name: "Account Id",
                    value: `${summonerObj.accountId}`
                },
                {
                    name: "Profile Icon Id",
                    value: `${summonerObj.profileIconId}`
                },
                {
                  name: "PuuId",
                  value: `${summonerObj.puuid}`
              }
            ],
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: `${summonerObj.summonerLevel}: ${summonerObj.revisionDate}`
            }
        }
    }
  }
  let summonerData = null
  switch (riotFunction) {
    case "account":
      summonerData  = await riot.getTftSummonerByAccount(functionValue)
      break
    case "id":
      summonerData  = await riot.getTftSummonerById(functionValue)
      break
    case "name":
      console.log('getting name')
      summonerData  = await riot.getTftSummonerByName(functionValue)
      break
    case "puuid":
      summonerData  = await riot.getTftSummonerByPuuid(functionValue)
      break
    default:
      message.channel.send('Call riot Function with the right riot function.')
  }
  await message.channel.send(createEmbed(summonerData))
}

export const conf: ConfObj = {
  enabled: true,
  guildOnly: true,
  aliases: ["tftsummoner", "summoner"],
  permLevel: "Administrator"
}

export const help: HelpObj = {
  name: "riotsummoner",
  category: "TFT",
  description: "Get Tft Summoner",
  usage: `addtask <name>, <url>, <category>, <priority`,
  list_args: ["summonerFunction", "summonerValue"],
}
