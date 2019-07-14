// install pm2
const mongoose = require('mongoose')

const initDB = () => {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  mongoose.set('useFindAndModify', false);
  mongoose.connection.once('open', () => {
    console.log('connected to database')
  })
}

const closeDB = () => {
  mongoose.connection.close()
}

export {
  initDB,
  closeDB
}
