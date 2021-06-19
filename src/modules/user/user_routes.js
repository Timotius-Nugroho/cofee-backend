const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const {
  getUserDataByid,
  updateUserData,
  updateUserImage,
  deleteUserData
} = require('./user_controller')

Route.get('/:id', authentication, getUserDataByid)
Route.patch('/:id', authentication, updateUserData)
Route.patch('/image/:id', authentication, uploads, updateUserImage)
Route.delete('/:id', authentication, deleteUserData)

module.exports = Route
