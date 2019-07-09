import { formatDate } from './helper'

export const addTaskQuery = (name: String, start_date: Date, end_date: Date, category: String, priority: String, url: String) => {
    return `mutation {
        addTask(name: "${name}", start_date: "${formatDate(start_date)}", end_date: "${formatDate(end_date)}", category: "${category}", priority: "${priority}" url: "${url}") {
            id
            name
            start_date
            end_date
            category
            priority
            url
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

export const removeAllTasks = () => {
    return `mutation {
        removeAllTasks {
            id
        }
    }`
}

export const removeTask = (id: any) => {
    return `mutation {
        removeTask(id: "${id}") {
            id name start_date end_date category priority
        }
    }`
}



// figure out how to update tasks later, implement later
export const updateTask = (id: any) => {
    return `mutation {
        updateTask(id: "${id}") {
            name 
            start_date 
            end_date 
            category 
            priority
        }
    }`
}