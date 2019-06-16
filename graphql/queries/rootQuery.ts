const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql')

// const tasksGraphQLType =  require('../types/TaskType');
// const Tasks = require('../../models/tasks');
const queryTaskById = require('./queryTaskById')
const queryAllTasks = require('./queryAllTasks')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    queryTaskById,
    queryAllTasks
  }
})

module.exports = RootQuery
