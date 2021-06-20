const express = require('express')
const Route = express.Router()
const authRouter = require('../modules/auth/auth_routes')
const invoiceRouter = require('../modules/invoice/invoice_routes')
const productRouter = require('../modules/product/product_routes')
const promoRouter = require('../modules/promo/promo_routes')
const userRouter = require('../modules/user/user_routes')
const orderRouter = require('../modules/order/order_routes')
const chartRouter = require('../modules/chart/chart_routes')

Route.use('/auth', authRouter)
Route.use('/invoice', invoiceRouter)
Route.use('/product', productRouter)
Route.use('/promo', promoRouter)
Route.use('/user', userRouter)
Route.use('/order', orderRouter)
Route.use('/chart', chartRouter)

module.exports = Route
