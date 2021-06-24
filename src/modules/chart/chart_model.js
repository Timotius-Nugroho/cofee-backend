const connection = require('../../config/mysql')

module.exports = {
  getInvoiceByDay: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT DAY(invoice_created_at) AS DAY, SUM(invoice_subtotal) AS Total FROM invoice GROUP BY DAY(invoice_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getInvoiceByWeek: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT DAYNAME(invoice_created_at) AS day_name, SUM(invoice_subtotal) AS total_invoice FROM invoice WHERE  WEEK(invoice_created_at) = WEEK(NOW()) GROUP BY DAYNAME(invoice_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  getInvoiceByMonth: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT MONTHNAME(invoice_created_at) AS month, SUM(invoice_subtotal) AS Total FROM invoice GROUP BY MONTH(invoice_created_at)',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
