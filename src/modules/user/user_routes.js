const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const { authentication } = require('../../middleware/auth')

const {
  getUserDataByid,
  updateUserData,
  deleteUserImage
} = require('./user_controller')

Route.get('/:id', authentication, getUserDataByid)
Route.patch('/:id', authentication, uploads, updateUserData)
Route.patch('/delete-image/:id', authentication, deleteUserImage)

module.exports = Route
