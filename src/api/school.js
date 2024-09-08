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
export function getSchoolByInfo(diqu,shuxing,leixing,xingzhi){
  return request({
    url: 'getSchoolByInfo',
    method: 'post',
    headers: {
      isToken: false
    },
    data:{'diqu':diqu,'shuxing':shuxing,'leixing':leixing,'xingzhi':xingzhi}
  })
}
