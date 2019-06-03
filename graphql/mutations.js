const { GraphQLObjectType, GraphQLString } = require('graphql');
const taskTypeGraphQLType =  require('./taskType');
const Tasks = require('./../models/tasks');

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTasks: {
        type: taskTypeGraphQLType,
        args: {
            name: { type: GraphQLString},
            start_date: {type: GraphQLString},
            end_date: {type: GraphQLString},
            category: {type: GraphQLString},
            priority: {type: GraphQLString}
        },
        resolve(parent, args) {
            const newTasks = new Tasks({
                name: args.name,
                start_date: args.start_date,
                end_date: args.end_date,
                category: args.category,
                priority: args.priority
            })
            return newTasks.save()
        },
    },
    updateTask: {
        type: taskTypeGraphQLType,
        args: {
            id: { type: GraphQLString },
            name: { type: GraphQLString},
            start_date: { type: GraphQLString },
            end_date: { type: GraphQLString },
            category: { type: GraphQLString },
            priority: { type: GraphQLString }
        },
        resolve(parent, args) {
            return Tasks.findById(args.id)
                .then(task => {
                    task.name = args.name
                    task.start_date = args.start_date
                    task.end_date = args.end_date
                    task.category = args.category
                    task.priority = args.priority

                    return task.save()
                })
                .then(updatedTask => updatedTask)
                .catch(err => console.log(err))
        },
    },
    removeTask: {
        type: taskTypeGraphQLType,
        args: {
            id: { type: GraphQLString}
        },
        resolve(parent, args)
        {
            return Tasks.findOneAndDelete(args.id).exec()
            .then(task => task.remove())
            .then(deletedTask => deletedTask)
            .catch(err => console.log(err))
        }
    }
  }
})

module.exports = Mutation;