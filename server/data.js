const express = require("express")
const Router = express.Router()


const model = require("./model")
const Personal = model.getModel('personalUser')
const Enterprise = model.getModel('enterpriseUser')
const Order = model.getModel('order')
const Bicycle = model.getModel('bicycle')



Router.get('/personal', function (req, res) {
  Personal.find({}, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: err
      })
    }
    return res.json({
      code: 0,
      data: doc
    })
  })
})
Router.get('/enterprise', function (req, res) {
  Enterprise.find({}, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: err
      })
    }
    return res.json({
      code: 0,
      data: doc
    })
  })
})
Router.get('/order', function (req, res) {
  Order.find({}, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: err
      })
    }
    return res.json({
      code: 0,
      data: doc
    })
  })
})
Router.get('/bicycle', function (req, res) {
  Bicycle.find({}, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: err
      })
    }
    return res.json({
      code: 0,
      data: doc
    })
  })
})



module.exports = Router
