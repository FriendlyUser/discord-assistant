import { GraphQLObjectType, GraphQLString } from 'graphql'
import taskTypeGraphQLType from './../types/taskType'
const Tasks = require('./../../models/tasks')

module.exports = {
    type: taskTypeGraphQLType,
    args: {
        id: { type: GraphQLString}
    },
    resolve(parent: any, args: { id: any, name: any; start_date: any; end_date: any; category: any; priority: any; url: any; }) 
    {
        console.log("Retarded args")
        console.log(args)
        return Tasks.findById(args.id)
        .then((task: { id: any, get: () => any; remove: () => void; }) =>  {
            console.log(task)
            console.log(task.id)
            if ( task && task.id == args.id) {
                task.remove()
            }
            else {
                // console.log(task.id)
                return task
            }
        })
        .then((deletedTask: any) => deletedTask)
        .catch((err: any) => console.log(err))
    }
}