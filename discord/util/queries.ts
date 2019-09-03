import { formatDate } from './helper'
import { TodoObj } from '../types/interfaces'

export const addTaskQuery = (name: String, start_date: Date, end_date: Date, category: String, priority: String, url: String) => {
    return `mutation {
        addTask(name: "${name}", start_date: "${formatDate(start_date)}", end_date: "${formatDate(end_date)}", category: "${category}", priority: "${priority}", url: "${url}") {
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

export const removeTask = (id: string) => {
    return `mutation {
        removeTask(id: "${id}") {
            id name start_date end_date category priority
        }
    }`
}



// figure out how to update tasks later, implement later
export const updateTask = (obj: TodoObj) => {
    let update_values: string = ''
    Object.keys(obj).forEach( (key: string, index: number) => {
        // skip for null values on the object
        if (obj[key] !== '') 
            update_values += `${key}: ${obj[key]}`
    })
    return `mutation {
        updateTask(id: "${update_values}") {
            name 
            start_date 
            end_date 
            category 
            priority
        }
    }`
}