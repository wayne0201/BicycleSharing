const express = require('express')


const model = require("./model")
const userRouter = require("./user")

const app = express()
const server = require("http").Server(app)

app.get('/', function (req, res) {
  res.send("<h1>hello world</h1>")
})


app.use('/user', userRouter)

//后台端口9000
server.listen(9000, function (params) {
  console.log("Node app start at port 9000")
})
