const mongoose = require("mongoose")
const DB_URL = "mongodb://127.0.0.1:27017/share"

//连接数据库
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log("mongodb is running")
})

const model = {
  personalUser: {
    personal_id:{
      type: String,
      require: true
    },
    password:{
      type: String,
      require: true
    },
    type:{
      type: Number,
      default: 0
    },
    nickname:{
      type: String
    },
    lease_status: {
      type: Boolean,
      default: false
    }
  },
  enterpriseUser: {
    enterprise_id:{
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    type: {
      type: Number,
      default: 1
    },
    enterprise_name: {
      type: String,
      require: true
    },
    contacts: {
      type: String,
      require: true
    }
  },
  order: {
    order_id: {
      type: String,
      require: true
    },
    personal_id: {
      type: String,
      require: true
    },
    bicycle_id: {
      type: String,
      require: true
    },
    order_status: {
      type: String,
      default: 0
    },
    create_time: {
      type: Number,
      default: new Date().getTime()
    },
    end_time: {
      type: Number
    }
  },
  bicycle: {
    bicycle_id: {
      type: String,
      require: true
    },
    personal_id: {
      type: String
    },
    enterprise_id: {
      type: String,
      require: true
    },
    bicycle_pwd: {
      type: String,
      require: true
    },
    bicycle_status: {
      type: Number,
      default: 1
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
