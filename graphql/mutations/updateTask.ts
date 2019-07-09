import { GraphQLObjectType, GraphQLString } from 'graphql'
import taskTypeGraphQLType from './../types/taskType'
const Tasks = require('./../../models/tasks')

module.exports = {
    type: taskTypeGraphQLType,
    args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString},
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString },
        category: { type: GraphQLString },
        priority: { type: GraphQLString },
        url: { type: GraphQLString }
    },
    resolve(parent: any, args: { id: any, name: any; start_date: any; end_date: any; category: any; priority: any; url: any}) {
        return Tasks.findById(args.id)
            .then((task: { name: any; start_date: any; end_date: any; category: any; priority: any; url: any; save: () => void; }) => {
                task.name = args.name
                task.start_date = args.start_date
                task.end_date = args.end_date
                task.category = args.category
                task.priority = args.priority
                task.url = args.url

                return task.save()
            })
            .then((updatedTask: any) => updatedTask)
            .catch((err: any) => console.log(err))
    },
};