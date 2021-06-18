const connection = require('../../config/mysql')

module.exports = {
  addInvoice: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO invoice SET ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  addOrder: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO orders SET ?', setData, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}
