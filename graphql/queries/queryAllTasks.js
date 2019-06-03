const { GraphQLObjectType, GraphQLString, GraphQLList } =  require('graphql');
const tasksGraphQLType =  require('../types/taskType');
const Tasks = require('../../models/tasks');

module.exports = {
  type: new GraphQLList(tasksGraphQLType),
  args: {},
  resolve() {
    return Tasks.find({})
  }
};