const express = require("express")
const Router = express.Router()

const model = require("./model")
const Personal = model.getModel('personalUser')
const Order = model.getModel('order')
const Bicycle = model.getModel('bicycle')

Router.post("/rentBicycle", function (req, res) {
  const { bicycle_id, user_id } = req.body
  Bicycle.findOne({ bicycle_id }, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: '服务端出错了!'
      })
    }
    if(!doc){
      return res.json({
        code: 1,
        msg: '查无此车!'
      })
    }
    if (doc.bicycle_status !== 0){
      return res.json({
        code: 1,
        msg: '此车故障或有人已租借!'
      })
    }
    Order.count({}, function (e, d) {
      if(e){
        return res.json({
          code: 1,
          msg: '服务端出错了!'
        })
      }
      let order_id = ("000000000000" + d + "0").slice(-14, -1)
      var orderModel = new Order({ order_id, personal_id: user_id, bicycle_id })
      orderModel.save(function (e, d) {
        if (e) {
          return res.json({
            code: 1,
            msg: "后端出错了!"
          })
        }
        Bicycle.updateOne({ bicycle_id: d.bicycle_id }, { $set: { bicycle_status: 1, personal_id: d.personal_id}}, function (e1, d1) {
          if (e1) {
            return res.json({
              code: 1,
              msg: "后端出错了!"
            })
          }
          Personal.updateOne({ personal_id: user_id }, { $set: { lease_status: true } }, function (e2, d1) {
            if (e2) {
              return res.json({
                code: 1,
                msg: "后端出错了!"
              })
            }
            return res.json({
              code: 0,
              data: {
                bicycle_id: d.bicycle_id,
                bicycle_pwd: doc.bicycle_pwd,
                order_id: d.order_id,
                order_status: d.order_status,
                create_time: d.create_time,
                lease_status: true
              }
            })
          })
        })
      })
    })
  })
})
Router.post('/getOrder', function (req, res) {
  const { user_id } = req.body
  Order.findOne({ personal_id: user_id, order_status: 1}, function (err, doc) {
    if(err){
      return res.json({
        code: 1,
        msg: "后端出错了!"
      })
    }
    Bicycle.findOne({ bicycle_id: doc.bicycle_id}, function (e, d) {
      if (err) {
        return res.json({
          code: 1,
          msg: "后端出错了!"
        })
      }
      return res.json({
        code:0,
        data: {
          bicycle_id: doc.bicycle_id,
          bicycle_pwd: d.bicycle_pwd,
          order_id: doc.order_id,
          order_status: doc.order_status,
          create_time: doc.create_time
        }
      })
    })
  })
})



module.exports = Router
