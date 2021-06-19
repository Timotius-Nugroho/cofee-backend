const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const invoiceRouter = require('../modules/invoice/invoice_routes')
const productRouter = require('../modules/product/product_routes')

Route.use('/auth', authRouter)
Route.use('/invoice', invoiceRouter)

Route.use('/product', productRouter)

module.exports = Route
