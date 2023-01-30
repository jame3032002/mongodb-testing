const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const Todo = require('../models/Todo')
const { getTodos, createTodo } = require('./todo')
const { mockTodos } = require('./__mock__/database')

async function initDefaultData() {
  await Promise.all([
    Todo.create(mockTodos),
  ])
}

let mongod = null

beforeAll(async () => {
  // jest.setTimeout(15000)
  // mongod = await MongoMemoryServer.create({
  //   instance: {
  //     launchTimeout: 100000
  //   },
  //   binary: {
  //     version: '6.0.2',
  //     arch: "x64",
  //     platform: "linux"
  //   }
  // })
  mongod = await MongoMemoryServer.create()
  const dbUrl = mongod.getUri()
  await mongoose.connect(dbUrl)
  await initDefaultData()
})

afterAll(async () => {
  if(mongod) {
    await mongoose.connection.close()
    await mongod.stop()
  }
})

describe('getTodos function', () => {
  it('Should return todos length equal 1', async () => {
    const todos = await getTodos()

    expect(todos).toMatchObject(mockTodos)
    expect(todos.length).toEqual(1)
  })
})

describe('createTodo function', () => {
  it('Should return success', async () => {
    const task = 'Test MongoDB'
    const todo = await createTodo({ task })

    expect(todo.success).toEqual(true)
    expect(todo._id).not.toBe(undefined)
  })

  it('Should have todos length equal 2', async () => {
    const todos = await getTodos()

    expect(todos.length).toEqual(2)
  })
})
