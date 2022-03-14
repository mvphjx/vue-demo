const Mock = require('mockjs')
const { param2Obj } = require('./utils')
const user = require('./module/user')
const table = require('./module/table')
const mocks = [
  ...table, ...user
]

function XHR2ExpressReqWrap(respond) {
  return function(options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url)
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

/**
 * 初始化 模拟接口，根据参数对指定url进行模拟
 * @param filterStr 白名单 条件表达式
 */
function initMocks(...filterStr) {
  for (const i of mocks) {
    if (match(filterStr, i.url)) {
      console.log(i.url)
      Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
      Mock.setup({
        timeout: '100-300'
      })
    }
  }
}

/**
 * 是否匹配URL
 * @param filterStr
 * @param url
 * @returns {boolean}
 */
function match(filterStrs, url) {
  if (!filterStrs) {
    return true
  }
  var result = false
  for (const filterStr of filterStrs) {
    if (filterStr === '*') {
      result = true
    }
    const _filterStr = filterStr.replace('*', '')
    if (filterStr.endsWith('*') && filterStr.startsWith('*')) {
      result = url.includes(_filterStr)
    } else if (filterStr.endsWith('*')) {
      result = url.startsWith(_filterStr)
    } else if (filterStr.startsWith('*')) {
      result = url.endsWith(_filterStr)
    } else {
      result = url === filterStr
    }
    if (result) {
      break
    }
  }
  return result
}

export default initMocks
