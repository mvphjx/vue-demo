<template>
  <div class="header-background">
    <div class="layout-header">
      <div class="left">
        <div class="layout-logo">
          <img src="../assets/top/logo.png" alt="">
        </div>
        <div class="title">{{ appName }}</div>
      </div>
      <div class="center">
        <div class="item" @click="goto('/')">
          <div><i class="h_home" /></div>
          首页
        </div>
        <div class="item" @click="goto('/user/list')">
          <div><i class="h_home" /></div>
          用户
        </div>
        <div class="item" @click="goto('/demo/mycomponents')">
          <div><i class="h_home" /></div>
          组件库
        </div>
        <div class="item" @click="logout()">
          <div><i class="h_home" /></div>
          登出
        </div>

      </div>
    </div>
    <div class="right-background" />
  </div>
</template>
<script>
import productConfig from '@/core/config'
import store from '@/simplestore'
import Moment from 'moment'
import { logout } from '@/api/user'

export default {
  components: {

  },
  data() {
    return {
      user: store.user,
      appName: productConfig.appName,
      dialogVisible: false,
      menuKey: ''
    }
  },
  computed: {

  },
  created() {
  }, updated() {
    this.$refs.popover.updatePopper()
  },
  methods: {
    logout() {
      logout().then(response => {
        store.clear()
        this.$router.push({ path: '/login',
          query: {
            redirect: 'dashboard'
          }})
      }).catch(() => {
        this.loading = false
      })
    },
    goto(command) {
      this.dialogVisible = false
      // this.$router.push(command);
      const newHerf = this.$router.resolve({ path: command })
      window.open(newHerf.href, '_self')
    },
    formatTime(value) {
      return Moment(value).format('YYYY-MM-DD HH:mm:ss')
    },
    showDialog(key) {
      if (this.menuKey === key) {
        this.dialogVisible = !this.dialogVisible
      } else {
        this.dialogVisible = true
      }
      this.menuKey = key
    },
    getClass: function(key) {
      if (this.dialogVisible && this.menuKey === key) {
        return 'active'
      } else {
        return ''
      }
    },
    doUpdatePsw() {
      this.$router.push('/updatePsw')
    }
  }
}
</script>
<style scoped lang="less">
.header-background{
  position: fixed;
  top:0;
  z-index: 999;
  margin: 0 -1px;
  width: 100%;
  height: 96px;
  background:url('../assets/top/bg-lan_u2.jpg') ;
  background-size:100% .990712rem /* 96/96.9 */;
}
.layout-header {
  // overflow: hidden;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;
  width: 1344px;
  height: 96px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  display: flex;
  justify-content: space-between;

}
.layout-header .left {
  width: 368px;
  color: #fff;
 background: url('../assets/top/header-left.png');
 background-size: 100% .990712rem;
  .layout-logo {
    width: 64Px;
    height: 64Px;
    // background: url("../assets/loginlogo.png");
    float: left;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
     img{
       width: 64Px;
       height: 64Px;
    }
  }

  .title {
    margin-left: 74px;
    font-weight: 700;
    height: 100%;
    font-size: 22px;
    line-height: 96px;
    font-family: "思源黑体 Bold", "思源黑体 Regular"," 思源黑体";
  }
}

.layout-header .center {
  height: 100%;
  width: 670px;
  font-size: 14px;
  color: #fff;
  display: flex;
  flex-wrap: nowrap;

  .active{
    background-image:url("~@/assets/img/menu_selected.png")
  }
  .item {
    cursor: pointer;
    flex: 1;
    // width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #DDEBFF;
    &:hover{
      background: rgba(252, 252, 252, 0.4);
    }
    i {
      font-size: 24px;
    }
  }

}

.layout-header .right {
  width: 328px;
  height: 100%;
  float: right;
  display: flex;
  flex-wrap: wrap;
  // justify-content: end;
  padding-left: 136px;
  align-items: center;
  // margin-right: 25px;
   background: url('../assets/top/header-right.png') no-repeat -44px 0px;
   background-size: 100% .990712rem;
  .user-avatar {
    img{
      width: 46px;
    }
  }
  .userinfo {
    padding: 0 18px 0 10px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    .username{
    font-family: '微软雅黑 Bold', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    }
    .h_expand_arrows::before{
      font-size: 14px;
      margin-left: 8px;
      cursor: pointer;
    }
  }

  .notice {
    cursor: pointer;
    img{
      width: 22px;
      height: 22px;
    }
  }

  .logout {
    padding: 8px;
    color: #fff;
    font-size: 16px;
    display: flex;
    margin-top:-7px ;
    margin-left: 18px;
    cursor: pointer;
  }
}
//TODO 不生效？ 写到了 element-ui.css中
::v-deep .user-info-popover {
  padding: 0px !important;

}
::v-deep .el-popover{
  z-index: 99999 !important;
}

.user-info-box {
  width: 371px;
  background-color: #fff;
  border-radius: 4px 4px 6px 6px;

  .header {
    height: 40px;
    padding: 0 20px 0 20px;
    background-color: #f2f7fd;
    border-radius: 4px 4px 0 0;

    span {
      font-size: 13px;
      line-height: 40px;
    }
  }

  .content {
    height: 100px;
    background-color: #d6e2f6;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 20px 0 20px;
    border-radius:0 0 4px 4px;

    .text {
      display: flex;
      justify-content: start;

      .item {
        margin: 0 20px 0 0;
      }
    }

    .tool {
      display: flex;
      justify-content: space-between;

      .item {
        color: #00a0e9;
        height: 31px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
          margin: 5px;
        }
      }
    }
  }

  .count {
    color: red;
  }

}
</style>
