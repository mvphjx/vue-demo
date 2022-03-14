import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/dologin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/common/info/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout/do',
    method: 'get'
  })
}
// 修改用户密码
export function updatePassword({ confirmpass, newpass, oldpass }) {
  return request({
    url: '/user/mgr/modifypass',
    method: 'post',
    params: {
      confirmpass,
      newpass,
      oldpass
    }
  })
}
