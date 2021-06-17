const helper = require('../../helpers/wrapper')

module.exports = {
  login: async (req, res) => {
    try {
      return helper.response(res, 200, 'hello')
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
