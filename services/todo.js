const Todo = require("../models/Todo")

async function getTodos() {
  const todos = await Todo.find({})

  return todos
}

async function createTodo({ task, status = 'pending' }) {
  try {
    const todo = await Todo.create({ task, status })

    return { success: true, _id: todo._id }
  } catch(error) {
    return { success: false }
  }
}

module.exports = {
  getTodos,
  createTodo
}