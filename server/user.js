const express = require("express")
const utils = require("utility")

const model = require("./model")

const Router = express.Router()
const Personal = model.getModel('personalUser')
const Enterprise = model.getModel('enterpriseUser')
const Order = model.getModel('order')
const Bicycle = model.getModel('bicycle')






Router.get('/lll', function (req, res) {
  Bicycle.find({}, function (err, userdoc) {
    res.json({ code: 0, val: userdoc })
  })
})


function md5pwd(pwd) {
  //增加密码复杂度
  const salt = 'Increase_the_complexity_of_the_password_0123456789'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router
