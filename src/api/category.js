import request from '@/utils/request'

// 查询分类列表
export function getCategoryList() {
    return request({
        url: '/category/getCategoryList',
        headers: {
          isToken: false
        },
        method: 'get'
    })
}

export function getCategoryNameById(categoryId) {
  return request({
      url: '/category/getCategoryNameById',
      headers: {
        isToken: false
      },
      method: 'post',
      params:{"categoryId":categoryId}
  })
}
