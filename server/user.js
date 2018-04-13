const express = require("express")
const Router = express.Router()


const model = require("./model")
const Personal = model.getModel('personalUser')
const Enterprise = model.getModel('enterpriseUser')
const Order = model.getModel('order')
const Bicycle = model.getModel('bicycle')


const utils = require("./utils")
const _filer = { password: 0, __v: 0 };



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
            user_id: enterprise_id,
            enterprise: {
              enterprise_name,
              contacts
            },
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
            user_id: personal_id,
            personal: {
              lease_status,
              nickname
            },
            type
          }
        })
      })
    })
  }
})


Router.post('/login', function (req, res) {
  const { user_id, password, type } = req.body;
  if (type) {
    Enterprise.findOne({ enterprise_id: user_id }, _filer, function (err, doc) {
      if (!doc) {
        return res.json({
          code: 1,
          msg: "该企业用户不存在"
        })
      }
      Enterprise.findOne({ enterprise_id: user_id, password: utils.md5pwd(password) }, _filer, function (e, d) {
        if (!d) {
          return res.json({
            code: 1,
            msg: "密码不正确"
          })
        }
        const { enterprise_id, enterprise_name, contacts, type, _id } = d
        res.cookie('u_id', d._id)
        res.cookie('u_type', type)
        return res.json({
          code: 0,
          data: {
            user_id: enterprise_id,
            enterprise: {
              enterprise_name,
              contacts
            },
            type
          }
        })
      })
    })
  } else {
    Personal.findOne({ personal_id: user_id }, _filer, function (err, doc) {
      if (!doc) {
        return res.json({
          code: 1,
          msg: "该个人用户名不存在"
        })
      }
      Personal.findOne({ personal_id: user_id, password: utils.md5pwd(password) }, _filer, function (e, d) {
        if (!d) {
          return res.json({
            code: 1,
            msg: "密码不正确"
          })
        }
        const { personal_id, nickname, type, lease_status, _id } = d
        res.cookie('u_id', d._id)
        res.cookie('u_type', type)
        return res.json({
          code: 0,
          data: {
            user_id: personal_id,
            personal: {
              lease_status,
              nickname
            },
            type
          }
        })
      })
    })
  }
})
Router.post('/info', function (req, res) {
  const { u_id, u_type} = req.cookies;
  if (!u_id) {
    return res.json({
      code: 1
    });
  }
  if (u_type == 1){
    Enterprise.findOne({ _id: u_id }, _filer, function (err, doc) {
      if (err) {
        return res.json({
          code: 1,
          msg: "服务端出错了"
        });
      }
      if (doc) {
        const { enterprise_id, enterprise_name, contacts, type, _id } = doc
        return res.json({
          code: 0,
          data: {
            user_id: enterprise_id,
            enterprise: {
              enterprise_name,
              contacts
            },
            type
          }
        })
      }
    })
  } else {
    Personal.findOne({ _id: u_id }, _filer, function (err, doc) {
      if (err) {
        return res.json({
          code: 1,
          msg: "服务端出错了"
        });
      }
      if (doc) {
        const { personal_id, nickname, type, lease_status, _id } = doc
        return res.json({
          code: 0,
          data: {
            user_id: personal_id,
            personal: {
              lease_status,
              nickname
            },
            type
          }
        })
      }
    })
  }
})




module.exports = Router
