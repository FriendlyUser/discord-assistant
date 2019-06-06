// install pm2
const mongoose = require('mongoose');

const initDB = () => {

  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('connected to database');
  });

}

export default initDB;