import { logger } from '../logger'

module.exports = async (client: any) => {
    logger.info(`Logged in as ${client.user.tag}!`);

    // client.user.setActivity(`${client.settings.get("default").prefix}help`, {type: "PLAYING"});
    client.user.setActivity(`Fun and help`, {type: "PLAYING"})
}