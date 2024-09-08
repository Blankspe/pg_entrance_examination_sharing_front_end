import request from '@/utils/request'

export function getFileByPostId(postId) {
  return request({
    url: '/file/getFileByPostId',
    method: 'post',
    headers: {
      isToken: false
    },
    params: {"postId":postId}
  })
}
