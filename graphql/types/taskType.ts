const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString } = graphql

const TaskType = new GraphQLObjectType({
  name: 'Tasks',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    start_date: { type: GraphQLString },
    end_date: { type: GraphQLString },
    category: { type: GraphQLString },
    priority: { type: GraphQLString }
  })
})

export default TaskType
