<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <div id="app">
    <!-- 添加key强制页面刷新 -->
    <router-view key="1" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
