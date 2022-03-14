<template>
  <div class="layout">
    <Header />
    <div class="content-box">
      <div class="content-body">
        <!-- 添加key强制刷新页面 -->
        <!--        <router-view v-slot="{ Component }" key="2" />-->
        <router-view v-slot="{ Component }" key="2">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: rgba(237, 245, 248, 1);
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.content-body{
  width: 1344px;
  padding-top: 96px;
  margin: 0 auto 12px;
}
</style>

