const user = {
  'status': 'ok',
  'loginLocalTime': 1567689595600,
  'loginSvrTime': 1567689693982,
  'ctxId': 1567243876336,
  'lastOpTime': 1567689693982,
  'userName': 'll007',
  'unitCode': '100000000000',
  'unitCodeName': '公安部',
  'userDataPath': '/',
  'ticket1': 'swtkhCNnkJv4mzhYfxhDrg==',
  'ticked2': 'rvM9g86pE9LfrKHpSMJKSg==',
  'userId': 69,
  'realUserName': 'XXX',
  'sessionId': 'da47b64ee41444a38a12270fcaa58b00',
  'clientIP': '127.0.0.1',
  'clientMac': null,
  'clientServiceNum': 'P2N9XXS1',
  'clientSiteNum': null,
  'clientType': 0,
  'clientModuleName': 'WEB',
  'clientComputerName': null,
  'st': null,
  'dataAccessLevel': '/',
  'loginLocTime': 1567689595600
}

module.exports = [
  // user login
  {
    url: '/login/dologin',
    type: 'post',
    response: config => {
      console.log('dologin', config)
      return {
        status: 'ok',
        data: {}
      }
    }
  },
  // get user info
  {
    url: '/common/info/user',
    type: 'get',
    response: () => {
      return {
        status: 'ok',
        data: user
      }
    }
  },
  // user logout
  {
    url: '/logout/do',
    type: 'get',
    response: () => {
      return {
        status: 'ok',
        data: 'success'
      }
    }
  }
]
