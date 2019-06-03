const { GraphQLObjectType, GraphQLString } = require('graphql');
const taskTypeGraphQLType = require('./../types/taskType');
const Tasks = require('./../../models/tasks');

module.exports = {
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
};