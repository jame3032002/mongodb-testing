const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { getTodos, createTodo } = require('./services/todo')
const app = express()

const PORT = 2000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/api/todos', async (req, res) => {
  const todos = await getTodos()

  return res.json(todos)
})

app.post('/api/todo', async (req, res) => {
  const { task } = req.body

  if(!task || task.trim() === '') {
    return res.status(400).json({ success: false, message: 'Bad request' })
  }

  const todo = await createTodo({ task })

  return res.json(todo)
})

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})

mongoose.set("strictQuery", true);
mongoose.connect(`mongodb://kajame:111111@localhost:27017/example`)
const db = mongoose.connection

db.on('error', () => {
  console.log(`mongoose connection failed`)
})

db.once('open', () => {
  console.log(`mongoose connected`)
})