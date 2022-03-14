import { login, logout, getInfo } from '@/api/user'
import { resetRouter } from '@/router'

const state = {
  name: ''
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password }).then(response => {
        // 加载用户信息
        return this.getInfo()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user getInfo
  getInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('请重新登陆！')
        }
        const { name } = data.realUserName
        commit('SET_NAME', name)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
