import { GraphQLObjectType, GraphQLString } from 'graphql'
import taskTypeGraphQLType from './../types/taskType'
const Tasks = require('./../../models/tasks');

module.exports = {
  type: taskTypeGraphQLType,
    args: {
        name: { type: GraphQLString},
        start_date: {type: GraphQLString},
        end_date: {type: GraphQLString},
        category: {type: GraphQLString},
        priority: {type: GraphQLString}
    },
    resolve(parent: any, args: { name: any; start_date: any; end_date: any; category: any; priority: any; }) {
        const newTasks = new Tasks({
            name: args.name,
            start_date: args.start_date,
            end_date: args.end_date,
            category: args.category,
            priority: args.priority
        })
        return newTasks.save()
    },
};