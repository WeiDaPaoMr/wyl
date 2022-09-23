import axios from "axios"

import store from "../store/index"

const serverce = axios.create({
    baseURL: process.env.VUE_APP_SERVICE_URL,
    timeout: 5000
})

const errormessage = {
    1000: "用户名或者密码发生错误",
    2000: "XXX发生错误",
    3000: ''
}
//请求拦截s
serverce.interceptors.request.use(function (config) {
    const token = store.getters.token
    if (token) config.headers.authorization = "Bearer" + token
    return config;
}, function (error) {
    return Promise.reject(error);
});
//响应拦截

const _showError = (errorcode, message) => {
    let titlt
    titlt = errormessage[errorcode] || message || "发生未知错误"
    this.$message.error(title);
}

serverce.interceptors.response.use(function (response) {
    if (response.status < 400) {
        return response.data.data
    }
    if (response.status === 401) {
        return
    }
    _showError(response.data.code, response.data.message)
}, function (error) {
    return Promise.reject(error);
});


const request = (options) => {
    options.method = options.method || "get"
    if (options.method.toLowerCase() == "get") {
        options.params = options.data || options.params
        delete options.data
    }

    serverce.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
    serverce(options)
}


export default serverce