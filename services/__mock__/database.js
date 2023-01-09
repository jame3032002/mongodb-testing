const mongoose = require('mongoose')

const mockTodos = [
  {
    "_id" : mongoose.Types.ObjectId("63baf3d18f8a71f2531cca60"),
    "task" : "test",
    "status" : "pending",
    "createdAt" : new Date("2023-01-08T23:48:17.103+07:00"),
    "updatedAt" : new Date("2023-01-08T23:48:17.103+07:00"),
    "__v" : 0
  }
]

module.exports = {
  mockTodos
}
