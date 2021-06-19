const express = require('express')
const Route = express.Router()
const uploads = require('../../middleware/uploads')

const {
  createProduct,
  getAllProduct,
  getProductDataById,
  updateProductData,
  deleteProduct
} = require('./product_controller')

Route.post('/', uploads, createProduct)
Route.get('/', getAllProduct)
Route.get('/:id', getProductDataById)
Route.patch('/:id', uploads, updateProductData)
Route.delete('/:id', deleteProduct)

module.exports = Route
