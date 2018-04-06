const express = require('express')

const utils = require("../build/utils")
const model = require("./model")
const userRouter = require("./user")

const app = express()
const server = require("http").Server(app)

app.get('/', function (req, res) {
  res.send("<h1>hello world</h1>")
})


app.use('/user', userRouter)

let host = utils.getIPAdress()
//后台端口9000
server.listen(9000, function () {
  console.log(`Node app start at port ${host}:9000`)
})
