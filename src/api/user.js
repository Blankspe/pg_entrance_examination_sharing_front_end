import request from '@/utils/request'

// 登录
export function userLogin(phone,password) {
    return request({
        url: '/login',
        method: 'post',
        headers: {
            isToken: false
          },
        data: {'phone':phone,'password':password}
    })
}

export function userRegister(username,nickName,email,password) {
    return request({
        url: '/user/register',
        method: 'post',
        headers: {
            isToken :false
        },
        data: {"username":username,"nickName":nickName,"email":email,"password":password}
    })
}


export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function getUserInfo(userId) {
    return request ({
        url: '/user/getUserInfo',
        method: 'post',
        params: {"userId":userId}
    })
}


export function savaUserInfo(userinfo) {
    return request({
        url: '/user/update',
        method: 'post',
        data: userinfo
    })
}

