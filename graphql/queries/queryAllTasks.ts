import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import tasksGraphQLType from '../types/taskType'
const Tasks = require('../../models/tasks');

module.exports = {
  type: new GraphQLList(tasksGraphQLType),
  args: {},
  resolve() {
    return Tasks.find({})
  }
};