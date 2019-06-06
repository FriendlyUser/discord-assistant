// const { GraphQLObjectType, GraphQLString, GraphQLList } =  require('graphql');
import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
// const tasksGraphQLType =  require('../types/taskType');
import tasksGraphQLType from '../types/taskType'
const Tasks = require('../../models/tasks');


module.exports = {
  type: tasksGraphQLType,
  args: { id: { type: GraphQLString }},
  resolve(parent: any, args: { id: any; }) {
    return Tasks.findById(args.id)
  }
};