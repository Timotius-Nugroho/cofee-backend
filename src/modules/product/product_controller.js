const helper = require('../../helpers/wrapper')
const productModel = require('./product_model')
const { deleteImage } = require('../../helpers/delete_image')

module.exports = {
  createProduct: async (req, res) => {
    try {
      const {
        productName,
        productPrice,
        productCategory,
        productSize,
        productDesc
      } = req.body

      const setData = {
        product_name: productName,
        product_price: productPrice,
        product_category: productCategory,
        product_size: productSize,
        product_desc: productDesc,
        product_image: req.file ? req.file.filename : ''
      }

      const result = await productModel.createData(setData)
      return helper.response(res, 200, 'Success Create Product', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllProduct: async (req, res) => {
    try {
      let { search, sort, limit, page } = req.query
      if (search === undefined) {
        search = ''
      }
      if (sort === undefined) {
        sort = 'product_price'
      }
      if (limit === undefined) {
        limit = '10'
      }
      if (page === undefined) {
        page = '1'
      }
      const totalData = await productModel.getDataCount()
      page = parseInt(page)
      limit = parseInt(limit)
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }

      const result = await productModel.getAllData(search, sort, limit, offset)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success Get All Data Product',
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getProductDataById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await productModel.geDataByCondition({ product_id: id })
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Success Get Product Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data Product Data By Id: ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateProductData: async (req, res) => {
    try {
      const { id } = req.params
      const {
        productName,
        productPrice,
        productCategory,
        productSize,
        productDesc
      } = req.body
      const checkProductData = await productModel.geDataByCondition({
        product_id: id
      })
      const setData = {
        product_name: productName,
        product_price: productPrice,
        product_category: productCategory,
        product_size: productSize,
        product_desc: productDesc,
        product_image: req.file
          ? req.file.filename
          : checkProductData[0].product_image,
        product_updated_at: new Date(Date.now())
      }
      if (checkProductData.length > 0) {
        if (req.file) {
          deleteImage(`src/uploads/${checkProductData[0].product_image}`)
        }
        const result = await productModel.updateData(setData, {
          product_id: id
        })
        return helper.response(
          res,
          200,
          `Success Update Product Data By Id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Product Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const checkProductData = await productModel.geDataByCondition({
        product_id: id
      })
      if (checkProductData.length > 0) {
        deleteImage(`src/uploads/${checkProductData[0].product_image}`)
        const result = await productModel.deleteData(id)
        return helper.response(
          res,
          200,
          `Success Delete Product Data By id: ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Product Data By Id ${id} Not Found`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
