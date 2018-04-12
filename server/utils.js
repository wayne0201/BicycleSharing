const utils = require("utility")

exports.md5pwd = function (pwd) {
  //增加密码复杂度
  const salt = 'Increase_the_complexity_of_the_password_0123456789'
  return utils.md5(utils.md5(pwd + salt))
}
