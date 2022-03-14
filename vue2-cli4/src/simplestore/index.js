/**
 * 简单的 store 模式
 */
const STORAGE_KEY = 'HABIS_TOKEN'
const store = {
  debug: true,
  token: null, // null表示没有登录，否则表示曾经登陆过，但是还要验证是否有效
  user: null, // 用户信息缓存
  setToken: function(token) {
    localStorage.setItem(STORAGE_KEY, token)
    this.token = token
  },
  getToken: function() {
    if (!this.token) {
      this.token = localStorage.getItem(STORAGE_KEY)
    }
    return this.token
  },
  clear: function() {
    this.token = null
    this.user = null
    localStorage.removeItem(STORAGE_KEY)
  }
}
export default store
