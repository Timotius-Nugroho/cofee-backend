const express = require('express')
const Route = express.Router()
const invoiceController = require('./invoice_controller')
// const authMiddleware = require('../../middleware/auth')

Route.post('/create', invoiceController.createInvoice)

module.exports = Route
