import { logger } from '../logger'

export default async (client: { logger: { log: (arg0: string, arg1: string) => void; }; }, error: any) => {
    // client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
    logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error")
};