import { HelpObj, ConfObj } from '../types/interfaces'
// https://stock-data-api.now.sh/api/echo.go?quotes=AAPL,BB,GOOG,MSFT
export const run = async (client: any, message: any, args: any): Promise<any> => { 
    const { stockURL } = client.config
    let args_nospace = args.toString().replace(/\s/g, '')
    let endpoint: string = `${stockURL}api/echo.go?quotes=${args_nospace}`
    return fetch(endpoint)
      .then((res: { text: () => void; }) => res.text())
      .then((body: any) => { 
        message.channel.send(body, {code:"js"})
      })
  }
  
  export const conf: ConfObj = {
    enabled: true,
    guildOnly: true,
    aliases: ["getstock", "getstocks"],
    permLevel: "Administrator"
  }
  
  export const help: HelpObj = {
    name: "getstock",
    category: "News",
    description: `Get list of quotes with comma seperated list, 
        entries that don't exist won't return values`,
    usage: `getstock <quote1>, <quote2>, ... <quoten>`,
}