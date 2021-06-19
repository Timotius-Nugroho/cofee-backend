const express = require('express')
const Route = express.Router()
const invoiceController = require('./invoice_controller')
// const authMiddleware = require('../../middleware/auth')

Route.get('/pending', invoiceController.getInvoicePending)
Route.post('/create', invoiceController.createInvoice)
Route.patch('/update-status/:id', invoiceController.UpdateInvoiceStatus)

module.exports = Route
