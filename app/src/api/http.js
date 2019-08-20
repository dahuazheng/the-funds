import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import {CONFIG} from '../config'
import {optionsToHump, optionsToLine} from '../utils/common'
import {Toast} from "antd-mobile";
import {TOAST_DURATION} from "../utils/constants";

const axiosConfig = {
  baseURL: CONFIG.API_BASE_URL,
  transformRequest: [data => {
    if (!data) return data;
    return qs.stringify(optionsToLine(data));
  }], // 对data进行转换处理
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  timeout: 100000
};

let instance = axios.create(axiosConfig);

// 添加请求拦截器
instance.interceptors.request.use(config => {
  if (config.data && config.data.noLogin) {
    delete config.data.noLogin;
  } else {
    config.data = config.data ? config.data : {}
    config.data.openId = Cookies.get('OPENID')
    config.data.token = Cookies.get('TOKEN')
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(response => {
  console.log(response.data);
  let {data} = response.data

  // 用户请求需要登录的接口，跳转登录页
  if (response.data.status === -101) {
    Cookies.remove('OPENID')
    Cookies.remove('TOKEN')
    Cookies.remove('PAY_PASSWORD')
    Toast.info('请先登录', TOAST_DURATION, () => window.location.href = '/login')
  }

  // 对下划线转驼峰进行处理
  if (data) {
    const isArr = data instanceof Array
    if (isArr) {
      response.data.data = data.map(i => optionsToHump(i))
      return response.data;
    }
    response.data.data = optionsToHump(response.data.data);
  }
  return response.data;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;
