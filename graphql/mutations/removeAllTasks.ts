import { GraphQLObjectType, GraphQLString } from 'graphql'
import taskTypeGraphQLType from './../types/taskType'
const Tasks = require('./../../models/tasks');

module.exports = {
    type: taskTypeGraphQLType,
    args: {
        id: { type: GraphQLString}
    },
    resolve(parent: any, args: { id: any, name: any; start_date: any; end_date: any; category: any; priority: any; }) 
    {
        return Tasks.deleteMany({}).exec()
        .then((deletedTasks: any) => deletedTasks)
        .catch((err: any) => console.log(err))
    }
}