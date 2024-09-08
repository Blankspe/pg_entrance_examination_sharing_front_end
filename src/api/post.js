import request from '@/utils/request'

export function getPost(){
    return request({
        url: 'getPosts',
        method: 'get',
        headers: {
          isToken: false
        }

    })
}

export function getPostByCategory(categoryId){
  return request({
      url: 'getPostsByCategory',
      method: 'post',
      headers: {
        isToken: false
      },
      params:{"categoryId":categoryId}

  })
}

export function likePost(postId,type){
  return request({
    url: 'like',
    method: 'post',
    headers: {
      isToken: false
    },
    params:{"postId":postId,"type":type}

  })
}

export function submitPost(title,userId,type,subjects,contents){
  return request({
    url: 'addPost',
    method: 'post',
    headers: {
      isToken:false
    },
    data:{
      'title':title,
      'userId':userId,
      'type':type,
      'subjects':subjects,
      'contents':contents
    }
  })
}
