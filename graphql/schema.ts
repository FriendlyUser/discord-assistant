// const { GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'
// const tasksGraphQLType =  require('./types/taskType');
// const Tasks = require('../models/tasks');
const Mutations = require('./mutations')
const RootQuery = require('./queries/rootQuery')

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})
