<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <div class="login100-form validate-form">
          <span class="login100-form-title p-b-49">登录</span>

          <div class="wrap-input100 validate-input m-b-23" data-validate="请输入用户名">
            <span class="label-input100">用户名</span>
            <input v-model="username" class="input100" type="text" placeholder="请输入用户名" autocomplete="off">
            <span class="focus-input100" data-symbol="&#xf206;" />
          </div>

          <div class="wrap-input100 validate-input" data-validate="请输入密码">
            <span class="label-input100">密码</span>
            <input v-model="password" class="input100" type="password" placeholder="请输入密码" @keyup.enter="doLogin()">
            <span class="focus-input100" data-symbol="&#xf190;" />
          </div>

          <div class="text-right p-t-8 p-b-31">
            <a href="javascript:">忘记密码？</a>
          </div>

          <div class="container-login100-form-btn">
            <div class="wrap-login100-form-btn">
              <div class="login100-form-bgbtn" />
              <button class="login100-form-btn" @click="doLogin">登 录</button>
            </div>
          </div>

          <div class="txt1 text-center p-t-54 p-b-20">
            <span>第三方登录</span>
          </div>

          <div class="flex-c-m">
            <a href="#" class="login100-social-item bg1">
              <i class="fa fa-facebook" />
            </a>

            <a href="#" class="login100-social-item bg2">
              <i class="fa fa-twitter" />
            </a>

            <a href="#" class="login100-social-item bg3">
              <i class="fa fa-google" />
            </a>
          </div>

          <div class="flex-col-c p-t-175">
            <a href="javascript:" class="txt2">{{ productConfig.appName }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import '../../public/login/vendor/bootstrap/css/bootstrap.min.css'
import '../../public/login/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import '../../public/login/fonts/iconic/css/material-design-iconic-font.min.css'
import '../../public/login/css/util.css'
import '../../public/login/css/main.css'
import productConfig from '@/core/config'
import store from '@/simplestore'
import { login, getInfo } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      productConfig,
      loading: false
    }
  },
  mounted() {
    const rem = window.innerHeight / 10
    document.documentElement.style.fontSize = rem + 'px'
    window.addEventListener('hashchange', (e) => {
      console.log(e.newURL)
    }, false)
  },
  methods: {
    doLogin() {
      const params = {
        'userName': this.username.trim(),
        'password': this.password.trim()
      }
      this.loading = true
      login(params).then(response => {
        store.setToken(1)
        // 加载用户信息
        getInfo().then((response) => {
          store.user = response.data
          let href = decodeURIComponent(window.location.href).split('=')
          if (!href[0].includes('?redirect') && href[0].includes('login')) {
            href = '/dashboard'
          } else if (href.length > 2) {
            href = href.splice(1, href.length - 1).join('')
          } else {
            href = href[1]
          }
          this.$router.push({ path: href })
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
      })
    }
  }

}
</script>

<style scoped>

</style>
