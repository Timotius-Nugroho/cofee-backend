const helper = require('../../helpers/wrapper')
const userModel = require('../user/user_model')
const orderModel = require('./order_model')

module.exports = {
  getAllOrderByUserId: async (req, res) => {
    try {
      const id = req.params.id
      const checkUserData = await userModel.geDataByCondition({ user_id: id })
      if (checkUserData.length > 0) {
        const result = await orderModel.getAllData(id)
        return helper.response(
          res,
          200,
          `Success Get All Order Data By User_id: ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `User_id: ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteOrderDataById: async (req, res) => {
    try {
      const { id } = req.params
      const checkUserData = await userModel.geDataByCondition({ user_id: id })
      if (checkUserData.length > 0) {
        await orderModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Success Delete Order Data By Id: ${id}`
        )
      } else {
        return helper.response(res, 404, `order_id: ${id} Not Found`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
