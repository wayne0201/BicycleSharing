const express = require("express")
const model = require("./model")
const utils = require("./utils")

const Router = express.Router()
const Personal = model.getModel('personalUser')
const Enterprise = model.getModel('enterpriseUser')
const Order = model.getModel('order')
const Bicycle = model.getModel('bicycle')





module.exports = Router
