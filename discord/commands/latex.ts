import { HelpObj, ConfObj } from '../types/interfaces'
// https://stock-data-api.now.sh/api/echo.go?quotes=AAPL,BB,GOOG,MSFT
export const run = async (client: any, message: any, args: any): Promise<any> => { 
    const { stockURL } = client.config
    let args_nospace = args.toString().replace(/\s/g, '')
    let endpoint: string = `${stockURL}api/echo.go?quotes=${args_nospace}`
    // export all tasks as a latex object or csv to dump into latex
    return fetch(endpoint)
      .then((res: { text: () => void; }) => res.text())
      .then((body: any) => { 
        message.channel.send(body, {code:"js"})
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