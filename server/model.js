const mongoose = require("mongoose")
const DB_URL = "mongodb://127.0.0.1:27017/share"

//连接数据库
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log("mongodb is running")
})

const model = {
  user: {
    user: {
      type: String,
      require: true
    },
    pwd: {
      type: String,
      require: true
    }
  },
  bicycle: {
    bicycleid: {
      type: String,
      require: true,
    }
  }
}

Object.keys(model).forEach(m => {
  mongoose.model(m, new mongoose.Schema(model[m]))
})

module.exports = {
  getModel: function (name) {
    return mongoose.model(name);
  }
}
