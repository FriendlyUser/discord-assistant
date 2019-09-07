const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  notice there is no ID. That's because Mongoose will assign
  an ID by default to all schemas
*/

const TaskSchema = new Schema({
  name: String,
  start_date: Date,
  end_date: Date,
  category: String,
  priority: String,
  price: Number,
});

module.exports = mongoose.model('Tasks', TaskSchema);
