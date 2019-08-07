import axios from 'axios'
import http from './http'
import config from './config'
import Cookies from 'js-cookie'

class User {
  // 获取个人信息
  static getUserInfo() {
    return http.get('/user/myinfo').then(res => {
      if (res.status !== 1) return
      const userInfo = {
        userId: res.data.user_id || '',
        email: res.data.email || '',
        phonePrefix: res.data.phone_prefix || '',
        phoneNo: res.data.phone_no || '',
        regTime: res.data.res_time || '',
        balance: res.data.balance || '--',
        integral: res.data.integral || '--',
        warehouse: res.data.warehouse || '--',
        recommendCode: res.data.recommend_code || '',
        recommendCount: res.data.recommend_count || '--',
        authentication: res.data.authentication,
        isF: res.data.is_f,
        isFTime: res.data.is_f_time
      }
      return userInfo
    })
  }

  // 判断是否已登录
  static isOnline() {
    return !!Cookies.get('TOKEN') && !!Cookies.get('OPENID')
  }
  /**
   * 获取图形验证码
   **/
  // static getCaptchaPng() {
  //   return Promise.resolve(config.baseURL + '/captchapng/png')
  // }

  static getCaptchaPng() {
    return axios
      .post(config.baseURL + '/captchapng/png', null, { responseType: 'blob' })
      .then(res => {
        return res.data
      })
  }

  /**
   * 发送邮箱验证码
   *
   * @required imgcode string 图形验证码
   * @required email string 邮箱
   * type string 图形验证码 （reg|findpassword|setpaypassword|withdraw）
   **/
  static sendMailCode(options) {
    options.noLogin = true
    return http.post('/user/sendmailcode', options)
  }

  /**
   * 发送手机验证码
   *
   * @required imgcode string 图形验证码
   * @required prefix string 国家码
   * @required phone string 图形验证码
   * type string 图形验证码 （reg|findpassword）
   **/
  static sendSmsCode(options) {
    options.noLogin = true
    return http.post('/user/sendsmscode', options)
  }

  /**
   * 用户注册
   *
   * phonePrefix string 手机号前缀
   * @required userName string 用户名
   * @required code string 邮箱验证码
   * @required password string 密码
   * @required passwordConfirm string 密码
   * recommend_code string 推荐码
   **/
  static register(options) {
    options.noLogin = true
    return http.post('/user/reg', options)
  }

  /**
   * 用户登录
   *
   * @required userName string 手机号或邮箱地址
   * @required password string 密码
   * phonePrefix string 手机号前缀（当输入账号为手机时）
   **/
  static login(options) {
    options.noLogin = true
    return http.post('/user/reg', options)
  }

  /**
   * 绑定手机号
   *
   * @required prefix number 国际码
   * @required phone string 手机号
   * @required string 手机验证码
   **/
  static bindPhone(options) {
    return http.post('/user/bindphone', options)
  }

  /**
   * 校验验证码（找回密码）
   *
   * @required userName string 手机号或邮箱地址
   * @required code string 验证码
   * @required type string 当前模块类型
   * phonePrefix string 手机号前缀（当输入账号为手机时）
   **/
  static checkCode(options) {
    options.noLogin = true
    return http.post('/user/checkcode', options)
  }

  /**
   * 修改登录密码(用户界面)
   *
   * @required password string 密码
   * @required passwordConfirm string 确认密码
   * @required verifyToken string 验证token
   **/
  static editPassword(options) {
    options.noLogin = true
    return http.post('/user/editpassword', options)
  }

  /**
   * 找回登录密码(登陆页面)
   *
   * @required userName string 手机号或邮箱地址
   * @required code string 验证码
   * @required password_confirm string 确认密码
   * @required password string 密码
   * phonePrefix string 手机号前缀（当输入账号为手机时）
   **/
  static findPassword(options) {
    options.noLogin = true
    return http.post('/user/findpassword', options)
  }

  /**
   * 检测手机用户是否存在
   *
   * @required phonePrefix string 国际码
   * @required phoneNo string 号
   **/
  static phoneExist(options) {
    options.noLogin = true
    return http.post('/user/phoneexist', options)
  }

  /**
   * 检测邮箱用户是否存在
   *
   * @required email string 国际码
   **/
  static emailExist(options) {
    options.noLogin = true
    return http.post('/user/emailexist', options)
  }

  /**
   * 通过邮箱设置支付密码
   *
   * @required payPassword string 支付密码
   * @required payPasswordConfirm string 确认支付密码
   * @required verifyToken string 验证token
   **/
  static setPayPasswordForEmail(options) {
    return http.post('/user/setpaypasswordforemail', options)
  }

  /**
   * 获取支付TOKEN
   *
   * @required payPassword string 支付密码
   **/
  static getPayToken(options) {
    return http.post('/user/getpaytoken', options)
  }
}

export default User
