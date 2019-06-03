const { GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');
const tasksGraphQLType =  require('./taskType');
const Tasks = require('../models/tasks');
const Mutations = require('./mutations');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: tasksGraphQLType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        return Tasks.findById(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});