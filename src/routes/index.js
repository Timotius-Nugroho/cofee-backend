const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const invoiceRouter = require('../modules/invoice/invoice_routes')
const productRouter = require('../modules/product/product_routes')
const promoRouter = require('../modules/promo/promo_routes')

Route.use('/auth', authRouter)
Route.use('/invoice', invoiceRouter)
Route.use('/product', productRouter)
Route.use('/promo', promoRouter)

module.exports = Route
