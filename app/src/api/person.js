import http from "./http";

class PersonApi {
  /**
   * 获取个人详细信息
   *
   * appType string app客户端种类，0为ios，1为安卓，用于获取最新客户端下载地址
   **/
  static getUserInfo(options = {}) {
    return http.post('/user/myinfo', options)
  }

  /**
   * 我的特价额度
   **/
  static getSpecial(options = {}) {
    return http.post('/user/myspecial', options)
  }

  /**
   * 我的特价额度明细
   *
   * @required productId string 商品ID
   * status string 0锁定，1可用，2提现锁定，3已失效
   * day string today|yestoday
   **/
  static getSpecialDetail(options = {}) {
    return http.post('/user/myspeciallist', options)
  }

  /**
   * 我的钱包地址
   *
   * @required type string 钱包地址类型 USDT|ZBX
   **/
  static getWalletAddress(options = {}) {
    return http.post('/user/mywallet', options)
  }

  /**
   * 提交认证资料
   *
   * @required country string 国家
   * @required cardType string 证件类型
   * @required firstName string 名字（选中中国时为全名）
   * @required lastName string 姓式（选中中国时可以不提交）
   * @required cardId string 证件号码
   **/
  static getWalletAddress(options = {}) {
    return http.post('/user/mywallet', options)
  }

  /**
   * 上传认证图片
   *
   * @required image file 图片文件
   * @required type string 1为正面，2为背面，3为手持证件照
   **/
  static uploadPhoto(options = {}) {
    return http.post('/user/uploadphoto', options)
  }

  /**
   * 我的认证资料
   **/
  static getAuthInfo(options = {}) {
    return http.post('/user/authenticationinfo', options)
  }

  /**
   * 提交认证审核
   **/
  static submitAuthentication(options = {}) {
    return http.post('/user/authenticationsubmit', options)
  }

  /**
   * 提币申请初始化
   *
   * @required type string 提币类型 usdt|inp
   **/
  static cashInit(options = {}) {
    return http.post('/user/cashini', options)
  }

  /**
   * 提交提币申请
   *
   * @required code string 邮箱验证码
   * @required amount string 提币数量
   * @required walletTo string 提入的钱包地址
   * @required type string 提币类型 USDT|INP
   **/
  static submitCash(options = {}) {
    return http.post('/user/cash', options)
  }

  /**
   * 我的提币申请
   *
   * @required type string 提币类型 USDT|INP
   **/
  static getCashList(options = {}) {
    return http.post('/user/cashlist', options)
  }

  /**
   * 获取站内还是站外提币及手续费比例
   *
   * @required address string 钱包地址
   **/
  static getCashList(options = {}) {
    return http.post('/user/walletforaddress', options)
  }

  /**
   * 购买会员
   *
   * @required payToken string 支付TOKEN
   * month number 购买月数，缺省为1个月
   **/
  static buyVip(options = {}) {
    return http.post('/user/buyvip', options)
  }

  /**
   * 会员信息
   **/
  static getVipInfo(options = {}) {
    return http.post('/user/vipinfo', options)
  }
}

export default PersonApi
