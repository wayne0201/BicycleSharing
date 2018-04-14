const express = require("express")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const utils = require("../build/utils")
const model = require("./model")
const userRouter = require("./user")
const bicycleRouter = require("./bicycle")
const getData = require("./data")

const app = express()
const server = require("http").Server(app)

app.get('/', function (req, res) {
  res.send("<h1>hello world</h1>")
})

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/user', userRouter)
app.use('/bicycle', bicycleRouter)
app.use('/data', getData)

let host = utils.getIPAdress()
//后台端口9000
server.listen(9000, function () {
  console.log(`Node app start at port ${host}:9000`)
})
