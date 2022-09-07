import axios from 'axios';
import localStorage from 'store';
import router from '../router';
const url = process.env.NODE_ENV === 'development' ? '/admin' : 'https://www.test.com';
const api = axios.create({
    baseURL: url,
    transformRequest: [
        function(data, headers) { //请求拦截 允许在向服务器发送前，修改请求数据
            if (data instanceof FormData) {
                return data;
            }
            if (headers['Content-Type'].indexOf('application/json') > -1) {
                return JSON.stringify(data);
            }
            let ret = '';
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
            }
            return ret;
        },
    ],
    headers: { // 修改请求头
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
});
api.interceptors.response.use((response) => { // 对接口响应进行拦截
    if (response.data == 401) { // 登入过期跳转到登录页
        localStorage.clearAll();
        router.push('/login');
    }
    return response;
}, (error) => {
    return Promise.resolve({ // 对接口错误进行处理
        data: {
            code: error.response.status,
            message: error.message,
            data: error.response.data
        }
    });
});
let token = localStorage.get('token')
if (token) { // 设置默认token 在刷新页面时设置
    api.defaults.headers.common['token'] = token;
}
export default api;