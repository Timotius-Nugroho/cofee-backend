const helper = require('../../helpers/wrapper')
const userModel = require('./user_model')
const { deleteImage } = require('../../helpers/delete_image')

module.exports = {
  getUserDataByid: async (req, res) => {
    try {
      const { id } = req.params
      const result = await userModel.geDataByCondition({ user_id: id })
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success Get User Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateUserData: async (req, res) => {
    try {
      const { id } = req.params
      const {
        userEmail,
        userPhone,
        userAddress,
        userDisplayName,
        userFirstName,
        userLastName,
        userBirthday,
        userGender
      } = req.body
      const checkUserData = await userModel.geDataByCondition({ user_id: id })
      const setData = {
        user_email: userEmail,
        user_phone: userPhone,
        user_address: userAddress,
        user_display_name: userDisplayName,
        user_first_name: userFirstName,
        user_last_name: userLastName,
        user_birthday: userBirthday,
        user_gender: userGender,
        user_image: req.file ? req.file.filename : checkUserData[0].user_image,
        user_updated_at: new Date(Date.now())
      }

      if (checkUserData.length > 0) {
        if (req.file) {
          deleteImage(`src/uploads/${checkUserData[0].user_image}`)
        }
        const result = await userModel.updateData(setData, { user_id: id })
        return helper.response(
          res,
          200,
          `Success Update Contact User By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteUserData: async (req, res) => {
    try {
      const id = req.params.id
      const checkUserData = await userModel.geDataByCondition({ user_id: id })
      if (checkUserData.length > 0) {
        deleteImage(`src/uploads/${checkUserData[0].user_image}`)
        const result = await userModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Sucess Delete User Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `User Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
