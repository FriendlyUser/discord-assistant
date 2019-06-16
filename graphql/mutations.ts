import { GraphQLObjectType, GraphQLString } from 'graphql'
import taskTypeGraphQLType from './types/taskType'
const addTask = require('./mutations/addTask')
const updateTask = require('./mutations/updateTask')
const removeTask = require('./mutations/removeTask')
const removeAllTasks = require('./mutations/removeAllTasks')
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask,
    updateTask,
    removeTask,
    removeAllTasks
  }
})

module.exports = Mutation
