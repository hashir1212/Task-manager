const express = require('express')
const app = express()
const Task = require('../models/Task')
const asyncWrapper = require('../middleware/asyncWrapper')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async(req, res) => {
    const AllTasks = await Task.find({})
    res.status(200).json({ AllTasks })
})
const getTasks = asyncWrapper(async(req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (task)
        return res.status(200).json({ task })
    next(createCustomError('Not Found', 404))
})

const addTasks = asyncWrapper(async(req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const updateTasks = asyncWrapper(async(req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    })
    if (task)
        return res.status(200).json({ task })
    next(createCustomError('Not Found', 404))
})

const deleteTasks = asyncWrapper(async(req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (task)
        return res.status(200).json({ task })
    next(createCustomError('Not Found', 404))
})

module.exports = {
    getAllTasks,
    getTasks,
    addTasks,
    updateTasks,
    deleteTasks
}