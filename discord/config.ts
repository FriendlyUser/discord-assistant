let server_port = process.env.PORT || 9000

export default {
    prefix: "!",
    port: server_port,
    token: process.env.DISCORD_TOKEN,
    mongoURI: process.env.MONGO_URI
}
module.exports = {

    // Development Environment
  
    development: {
      database: {
        host: '127.0.0.1',
        login: 'dev',
        password: 'dev'
      }
    },
  
    // Production Environment
  
    production: {
      database: {
        host: '127.0.0.1',
        login: 'prod',
        password: 'prod'
      }
    }
  };