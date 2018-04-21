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
      var orderModel = new Order({ order_id, personal_id: user_id, bicycle_id, create_time: new Date().getTime()})
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
            Order.find({ personal_id: user_id }, { _id: 0, __v: 0 }, function (err4, doc4) {
              if (err4) {
                return res.json({
                  code: 1,
                  msg: err4
                })
              }
              if (doc4.length < 5) {
                return res.json({
                  code: 0,
                  order: {
                    data: doc4,
                    next: 0
                  },
                  data: {
                    bicycle_id: d.bicycle_id,
                    bicycle_pwd: doc.bicycle_pwd,
                    order_id: d.order_id,
                    order_status: d.order_status,
                    create_time: d.create_time,
                    lease_status: true
                  }
                })
              }
              return res.json({
                code: 0,
                order: {
                  data: doc4,
                  next: 1
                },
                data: {
                  bicycle_id: d.bicycle_id,
                  bicycle_pwd: doc.bicycle_pwd,
                  order_id: d.order_id,
                  order_status: d.order_status,
                  create_time: d.create_time,
                  lease_status: true
                }
              })
            }).sort({ 'create_time': -1 }).skip(0).limit(5).exec()
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

Router.post('/returnBicycle', function (req, res) {
  const { bicycle_id, order_id, personal_id} = req.body
  Bicycle.updateOne({ bicycle_id }, { $set: { bicycle_status: 0}}, function (err1, doc1) {
    if(err1){
      return res.json({
        code: 1,
        msg: "后端出错了!"
      })
    }
    Personal.updateOne({ personal_id }, { $set: { lease_status: false}}, function (err2, doc2) {
      if (err2) {
        return res.json({
          code: 1,
          msg: "后端出错了!"
        })
      }
      let end_time = new Date().getTime()
      Order.updateOne({ order_id }, { $set: { order_status: 0, end_time } }, function (err3, doc3) {
        if (err3) {
          return res.json({
            code: 1,
            msg: "后端出错了!"
          })
        }
        Order.find({ personal_id }, { _id: 0, __v: 0 }, function (err4, doc4) {
          if (err4) {
            return res.json({
              code: 1,
              msg: err4
            })
          }
          if (doc4.length < 5) {
            return res.json({
              code: 0,
              data: {
                data: doc4,
                next: 0
              },
              lease_status: false,
              end_time,
            })
          }
          return res.json({
            code: 0,
            data: {
              data: doc4,
              next: 1
            },
            lease_status: false,
            end_time
          })
        }).sort({ 'create_time': -1 }).skip(0).limit(5).exec()
      })
    })
  })
})
Router.post('/warning', function (req, res) {
  const { bicycle_id, order_id, personal_id, warning_content } = req.body
  Bicycle.updateOne({ bicycle_id }, { $set: { bicycle_status: 2, warning_content } }, function (err1, doc1) {
    if (err1) {
      return res.json({
        code: 1,
        msg: "后端出错了!"
      })
    }
    Personal.updateOne({ personal_id }, { $set: { lease_status: false } }, function (err2, doc2) {
      if (err2) {
        return res.json({
          code: 1,
          msg: "后端出错了!"
        })
      }
      let end_time = new Date().getTime()
      Order.updateOne({ order_id }, { $set: { order_status: 2, end_time, warning_content} }, function (err3, doc3) {
        if (err3) {
          return res.json({
            code: 1,
            msg: "后端出错了!"
          })
        }
        Order.find({ personal_id }, { _id: 0, __v: 0 }, function (err4, doc4) {
          if (err4) {
            return res.json({
              code: 1,
              msg: err4
            })
          }
          if (doc4.length < 5) {
            return res.json({
              code: 0,
              data: {
                data: doc4,
                next: 0
              },
              lease_status: false,
              end_time,
            })
          }
          return res.json({
            code: 0,
            data: {
              data: doc4,
              next: 1
            },
            lease_status: false,
            end_time
          })
        }).sort({ 'create_time': -1 }).skip(0).limit(5).exec()
      })
    })
  })
})

Router.post('/order', function (req, res) {
  let { personal_id, size, page} = req.body
  size = parseInt(size) || 5
  page = parseInt(page) || 1
  Order.find({ personal_id }, { _id: 0, __v: 0 }, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: err
      })
    }
    if(doc.length < size) {
      return res.json({
        code: 0,
        data: doc,
        next: 0
      })
    }
    return res.json({
      code: 0,
      data: doc,
      next: 1
    })
  }).sort({ 'create_time': -1 }).skip((page-1) * size).limit(size).exec()
})

Router.post('/list', function (req, res) {
  let { enterprise_id, size, page } = req.body
  size = parseInt(size) || 10
  page = parseInt(page) || 1
  Bicycle.find({ '$or': [{ enterprise_id, bicycle_status: 0 }, { enterprise_id, bicycle_status: 1 }]}, function (e, d) {
    if (e) {
      return res.json({
        code: 1,
        msg: e
      })
    }
    if (d.length < size) {
      return res.json({
        code: 0,
        data: d,
        next: 0
      })
    }
    return res.json({
      code: 0,
      data: d,
      next: 1
    })
  }).sort({ 'bicycle_id': -1 }).skip((page - 1) * size).limit(size).exec()
})

Router.post('/faultList', function (req, res) {
  let { enterprise_id, size, page } = req.body
  size = parseInt(size) || 10
  page = parseInt(page) || 1
  Bicycle.find({ enterprise_id, bicycle_status: 2 }, function (e, d) {
    if (e) {
      return res.json({
        code: 1,
        msg: e
      })
    }
    if (d.length < size) {
      return res.json({
        code: 0,
        data: d,
        next: 0
      })
    }
    return res.json({
      code: 0,
      data: d,
      next: 1
    })
  }).sort({ 'bicycle_id': -1 }).skip((page - 1) * size).limit(size).exec()
})

Router.post('/detail', function (req, res) {
  let { bicycle_id } = req.body
  Bicycle.findOne({ bicycle_id }, { _id: 0, __v: 0 }, function (e, d) {
    if (e) {
      return res.json({
        code: 1,
        msg: e
      })
    }
    Order.count({ bicycle_id },function (err, doc) {
      if (err) {
        return res.json({
          code: 1,
          msg: err
        })
      }
      res.json({
        code: 0,
        data: {
          count: doc,
          ...d._doc
        }
      })
    })

  })
})




module.exports = Router
