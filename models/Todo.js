const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = new Schema({
  task: String,
  status: {
    type: String,
    enum: ['pending', 'completed']
  }
}, { timestamps: true })

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
