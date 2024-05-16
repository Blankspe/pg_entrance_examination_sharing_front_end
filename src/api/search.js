import request from '@/utils/request'

export function postSearch(mohupost){
    return request({
        url: '/search/postSearch',
        method: 'post',
        headers: {
          isToken: false
        },
        data:{"vaguePost":mohupost}
        
    })
}