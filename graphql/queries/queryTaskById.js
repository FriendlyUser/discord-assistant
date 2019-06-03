const { GraphQLObjectType, GraphQLString, GraphQLList } =  require('graphql');
const tasksGraphQLType =  require('../types/taskType');
const Tasks = require('../../models/tasks');


module.exports = {
  type: tasksGraphQLType,
  args: { id: { type: GraphQLString }},
  resolve(parent, args) {
    return Tasks.findById(args.id)
  }
};