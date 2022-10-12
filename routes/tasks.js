const express = require('express')
const Router = express.Router()
const {
    getAllTasks,
    getTasks,
    addTasks,
    updateTasks,
    deleteTasks
} = require('../controllers/tasks')

Router.route('/').get(getAllTasks).post(addTasks)
Router.route('/:id').patch(updateTasks).delete(deleteTasks).get(getTasks)

module.exports = Router