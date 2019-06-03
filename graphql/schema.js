const { GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
// const tasksGraphQLType =  require('./types/taskType');
// const Tasks = require('../models/tasks');
const Mutations = require('./mutations');
const RootQuery = require('./queries/rootQuery');

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});