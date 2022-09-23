import axios from "axios"

const serverce = axios.create({
    baseURL: process.env.VUE_APP_SERVICE_URL,
    timeout: 5000
})
//请求拦截s
serverce.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
//响应拦截

const _showError = () => {
    this.$message.error('出现错误');
}

serverce.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return response.data.data
    }
    if (response.status === 401) {
        return
    }
    _showError()
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