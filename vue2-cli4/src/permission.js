import router from '@/router'
import store from './simplestore'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/page'
import { getInfo } from '@/api/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// 登陆校验，拦截器
router.beforeEach(async(to, from, next) => {
  const hasLogin = store.getToken()
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  if (hasLogin) {
    if (to.path === '/login') {
      // 已经登陆，跳转到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 新开页签，再次缓存用户信息
      if (!store.user) {
        getInfo().then(function(req) {
          store.user = req.data
          next()
        }).catch(error => {
          console.warn('getInfo', error)
          store.clear()
          // 获取不到用户信息，token失效，跳转到登录页
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        })
      } else {
        next()
      }
    }
  } else {
    /* 没有登陆  */
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单
      next()
    } else {
      // 跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
