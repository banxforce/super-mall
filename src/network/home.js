import {request} from '@/network/request'

/**
 * 首页数据获取
 */
export function getHomeMultiData() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}