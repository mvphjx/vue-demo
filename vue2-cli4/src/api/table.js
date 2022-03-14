import request from '@/utils/request'

/**
 * 读取服务器配置
 * @param tableName
 * @returns {*}
 */
export function config(tableName) {
  return request({
    url: '/common/tableconfig/data?tableName=' + tableName,
    method: 'get'
  })
}

/**
 * 列表查询
 * @param data
 * @returns {*}
 */
export function query(data) {
  return request({
    url: '/common/tablequery/query',
    method: 'post',
    data
  })
}
