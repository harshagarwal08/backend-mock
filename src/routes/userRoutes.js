const controller = require('../controllers/userControllers')

const express = require('express')

const Router = express.Router()

Router.route('/').post(controller.createUser).get(controller.getUsers)
Router.route('/:userId').get(controller.getUser).delete(controller.deleteUser)
Router.route('/:userId/tasks').get(controller.getTasks).post(controller.createTask)
Router.route('/:userId/tasks/:taskId').get(controller.getTask).delete(controller.deleteTask).patch(controller.editTask)

module.exports = Router