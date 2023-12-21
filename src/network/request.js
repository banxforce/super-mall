import axios from 'axios'

/**封装axios框架，所有aqi都会使用这个模块
 *
 * @param config 传入的axios的config参数
 * @returns {Promise<axios.AxiosResponse<any>>} 返回请求完成后的promise对象
 */
export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:7888/api/hy66',
        timeout: 5000
    });

    // 2.axios的拦截器
    instance.interceptors.request.use( config => {
        return config
    }, error => {
        // console.log(error);
    })
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)
}