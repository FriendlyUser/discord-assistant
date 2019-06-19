import { formatDate } from './helper'

export const addTaskQuery = (name: String, start_date: Date, end_date: Date, category: String, priority: String ) => {
    return `
        mutation {
        addTask(name: "${name}", start_date: "${formatDate(start_date)}", end_date: "${formatDate(end_date)}", category: "${category}", priority: "${priority}") {
            id
            name
            start_date
            end_date
            category
            priority
        }
    }`
}

export const queryAllTasks = () => {
    return `{
        queryAllTasks {
          name,
          id,
          start_date,
          end_date,
          category,
          priority
        }
      }`
}