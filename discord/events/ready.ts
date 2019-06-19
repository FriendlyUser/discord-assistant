import { logger } from '../logger'

export default (client: any) => {
    logger.info(`Logged in as ${client.user.tag}!`);

    // client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
    client.user.setActivity(`Fun and help`, {type: "PLAYING"})
}