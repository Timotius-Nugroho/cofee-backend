const express = require('express')
const Route = express.Router()
const authController = require('./auth_controller')

Route.post('/login', authController.login)

module.exports = Route
