const helper = require('../../helpers/wrapper')
const invoiceModel = require('./invoice_model')
const midtransClient = require('midtrans-client')

module.exports = {
  createInvoice: async (req, res) => {
    try {
      // console.log(req.body)
      const {
        userId,
        invoicePromoCode,
        invoiceSubtotal,
        paymentMethod,
        orders
      } = req.body

      const invoiceData = {
        user_id: userId,
        invoice_number: `CS-${Math.floor(Math.random() * 100000 + 1)}`,
        invoice_promo_code: invoicePromoCode,
        invoice_subtotal: invoiceSubtotal,
        payment_method: paymentMethod,
        order_status: 'pending'
      }
      const result = await invoiceModel.addInvoice(invoiceData)

      for (const order of orders) {
        await invoiceModel.addOrder({
          user_id: userId,
          invoice_id: result.insertId,
          product_id: order.productId,
          size: order.size,
          qty: order.qty,
          total_price: order.totalPrice
        })
      }

      // midtrans
      if (paymentMethod === 'Midtrans') {
        const newResult = await invoiceModel.createMidtransTrans({
          invoiceId: result.insertId,
          subTotal: invoiceSubtotal
        })
        return helper.response(res, 200, 'Succes Create Invoice', newResult)
      } else {
        return helper.response(res, 200, 'Succes Create Invoice', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  getInvoicePending: async (req, res) => {
    try {
      let { limit, page } = req.query
      page = parseInt(page) || 1
      limit = parseInt(limit) || 10

      const totalData = await invoiceModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const invoices = await invoiceModel.getAllInvoice(limit, offset)
      let userName = []
      for (const invoice of invoices) {
        userName = await invoiceModel.getUserName(invoice.user_id)
        invoice.user_name =
          userName.length > 0 ? userName[0].user_first_name : 'none'

        invoice.list_order = await invoiceModel.getOrdersByInvoiceId(
          invoice.invoice_id
        )
      }

      // console.log(invoices)
      return helper.response(
        res,
        200,
        'Succes Get Invoice with Pending Status',
        invoices,
        pageInfo
      )
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  UpdateInvoiceStatus: async (req, res) => {
    try {
      const { id } = req.params

      const checkInvoice = await invoiceModel.getInvoiceById(id)
      if (checkInvoice.length === 0) {
        return helper.response(res, 404, `Invoice ID = ${id} not found !`)
      }

      const result = await invoiceModel.updateDataInvoice(
        { order_status: 'done' },
        id
      )
      return helper.response(res, 200, 'Succes Update invoice Status', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  postMidtransNotif: async (req, res) => {
    try {
      // console.log(req.body)

      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-vjEJqGa3Jq0x9DtGLX-WcsTA',
        clientKey: 'SB-Mid-client-fRU8uSNEVuGcFfR8'
      })
      snap.transaction
        .notification(req.body)
        .then((statusResponse) => {
          const orderId = statusResponse.order_id
          const transactionStatus = statusResponse.transaction_status
          const fraudStatus = statusResponse.fraud_status
          // console.log(grossAmount)

          const updateStatus = async () => {
            await invoiceModel.updateDataInvoice(
              {
                midtrans_status: transactionStatus
              },
              orderId
            )
            return helper.response(
              res,
              200,
              `Invoice Id ${transactionStatus} !`
            )
          }

          console.log(
            `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
          )

          // Sample transactionStatus handling logic

          if (transactionStatus === 'capture') {
            updateStatus()
            if (fraudStatus === 'challenge') {
              // TODO set transaction status on your databaase to 'challenge'
              updateStatus()
            } else if (fraudStatus === 'accept') {
              updateStatus()
            }
          } else if (transactionStatus === 'settlement') {
            // TODO set transaction status on your databaase to 'success'
            updateStatus()
          } else if (transactionStatus === 'deny') {
            // TODO you can ignore 'deny', because most of the time it allows payment retries
            // and later can become success
            updateStatus()
          } else if (
            transactionStatus === 'cancel' ||
            transactionStatus === 'expire'
          ) {
            // TODO set transaction status on your databaase to 'failure'
            updateStatus()
          } else if (transactionStatus === 'pending') {
            // TODO set transaction status on your databaase to 'pending' / waiting payment
            updateStatus()
          }
        })
        .catch((err) => {
          console.log('Midtrans error', err)
          return helper.response(
            res,
            parseInt(err.ApiResponse.status_code),
            err.ApiResponse.status_message,
            null
          )
        })
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
