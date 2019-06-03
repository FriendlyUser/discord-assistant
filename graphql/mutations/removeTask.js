const { GraphQLObjectType, GraphQLString } = require('graphql');
const taskTypeGraphQLType = require('./../types/taskType');
const Tasks = require('./../../models/tasks');

module.exports = {
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
};