const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const {
  getUserDataByid,
  updateUserData,
  deleteUserData
} = require('./user_controller')

Route.get('/:id', authentication, getUserDataByid)
Route.patch('/:id', authentication, uploads, updateUserData)
Route.delete('/:id', authentication, deleteUserData)

module.exports = Route
