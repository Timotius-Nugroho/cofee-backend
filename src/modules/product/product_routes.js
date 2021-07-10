const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')
const authMiddleware = require('../../middleware/auth')

const {
  createProduct,
  getAllProduct,
  getProductDataById,
  updateProductData,
  deleteProduct
} = require('./product_controller')

Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploads,
  createProduct
)
Route.get('/', authMiddleware.authentication, getAllProduct)
Route.get('/:id', authMiddleware.authentication, getProductDataById)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploads,
  updateProductData
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  deleteProduct
)

module.exports = Route
