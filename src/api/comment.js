import request from '@/utils/request'

export function getComments(postId){
    return request({
        url: '/getComments',
        method: 'post',
        params: {postId: postId}
    })
}

// 发送文章评论
export function sendComment(type,postId,rootId,toCommentId,content) {
    return request({
        url: '/addComment',
        method: 'post',
        data: {"postId":postId,"type":type,"rootId":rootId,"toCommentId":toCommentId,"content":content}
    })
}


export function getArticleComment(query) {
    return request({
        url: '/comment/commentList',
        method: 'get',
        headers: {
          isToken: false
        },
        params: query
    })
}


export function getLinkComment(query) {
    return request({
        url: '/comment/linkCommentList',
        method: 'get',
        params: query
    })
}