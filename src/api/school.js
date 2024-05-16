import request from '@/utils/request'

export function getSchools(){
    return request({
        url: 'getSchools',
        method: 'get',
        headers: {
            isToken: false
        }
    })
}