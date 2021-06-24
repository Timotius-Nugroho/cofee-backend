const helper = require('../../helpers/wrapper')
const chartModel = require('./chart_model')

module.exports = {
  chartDaily: async (req, res) => {
    try {
      let result = []
      const { groubBy } = req.query
      if (groubBy === 'month') {
        result = await chartModel.getInvoiceByMonth()
      } else if (groubBy === 'week') {
        result = await chartModel.getInvoiceByWeek()
      } else {
        result = await chartModel.getInvoiceByDay()
      }

      return helper.response(res, 200, 'Success Get Income Data By Day', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
