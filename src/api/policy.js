import request from '@/utils/request'

export function getPolicyInfo(){
    return request({
        url: 'getPolicyInfo',
        method: 'get',
        headers: {
            isToken: false
        }
    })
}