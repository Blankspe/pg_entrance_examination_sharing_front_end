import request from '@/utils/request'

// 查询文章列表
export function professionList() {
    return request({
        url: '/profession/getAllProfession',
        method: 'post',
        headers: {
          isToken: false
        }
    })
}
export function getProfessionByName(name) {
  return request({
    url: '/profession/getProfessionByName',
    method: 'post',
    headers: {
      isToken: false
    },
    params:{"name":name}
  })
}
