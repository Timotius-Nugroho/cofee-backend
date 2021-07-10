const express = require('express')
const Route = express.Router()
const invoiceController = require('./invoice_controller')
const authMiddleware = require('../../middleware/auth')

Route.get(
  '/pending',
  authMiddleware.authentication,
  invoiceController.getInvoicePending
)
Route.post(
  '/create',
  authMiddleware.authentication,
  invoiceController.createInvoice
)
Route.get(
  '/update-status/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  invoiceController.UpdateInvoiceStatus
)
Route.post('/midtrans-notification', invoiceController.postMidtransNotif)

module.exports = Route
