const express = require("express")
const model = require("./model")
const utils = require("./utils")

const Router = express.Router()

const Personal = model.getModel('personalUser')
const Enterprise = model.getModel('enterpriseUser')
const Order = model.getModel('order')
const Bicycle = model.getModel('bicycle')


Router.post('/register', function (req, res) {
  const params = req.body;
  if (params.type) {
    const { enterprise_id, enterprise_name, password, contacts, type } = params
    Enterprise.findOne({ enterprise_id }, function (err, doc) {
      if (doc) {
        return res.json({
          code: 1,
          msg: "该企业账号已注册"
        })
      }
      const enterpriseModel = new Enterprise({ enterprise_id, enterprise_name, contacts, type, password: utils.md5pwd(password)})
      enterpriseModel.save(function (e, d) {
        if (e) {
          return res.json({
            code: 1,
            msg: "后端出错了"
          })
        }
        const { enterprise_id, enterprise_name, contacts, type, _id} = d
        res.cookie('u_id', _id)
        res.cookie('u_type', type)
        return res.json({
          code: 0,
          data: {
            enterprise_id,
            enterprise_name,
            contacts,
            type
          }
        })
      })
    })
  } else {
    const { personal_id, nickname, password, type } = params
    Personal.findOne({ personal_id }, function (err, doc) {
      if (doc) {
        return res.json({
          code: 1,
          msg: "该个人账号已注册"
        })
      }
      const personalModel = new Personal({ personal_id, nickname, type, password: utils.md5pwd(password) })
      personalModel.save(function (e, d) {
        if (e) {
          return res.json({
            code: 1,
            msg: "后端出错了"
          })
        }
        const { personal_id, nickname, type, lease_status, _id } = d
        res.cookie('u_id', _id)
        res.cookie('u_type', type)
        return res.json({
          code: 0,
          data: {
            personal_id,
            lease_status,
            nickname,
            type
          }
        })
      })
    })
  }
})


module.exports = Router
