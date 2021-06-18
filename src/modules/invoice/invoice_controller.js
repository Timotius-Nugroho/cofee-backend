const helper = require('../../helpers/wrapper')
const invoiceModel = require('./invoice_model')

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

      return helper.response(res, 200, 'Succes Create Invoice', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
