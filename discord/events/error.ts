import { logger } from '../logger'

module.exports =  async (client: { logger: { log: (arg0: string, arg1: string) => void; }; }, error: any) => {
    // client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
    logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error")
};