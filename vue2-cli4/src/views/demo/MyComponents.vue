<template>
  <div>
    <span>跨项目业务组件库示例</span>
    <hr>
    <MyTitle />
    <hr>
    <MyCard
      img-src="https://raw.githubusercontent.com/mvphjx/MyComponent/main/docs/.vuepress/public/java.png"
      summary="剑指Java面试-Offer直通车  百度资深面试官授课"
    />
    <hr>
    <SearchInList ref="searchInList" table-name="TP_CARD_VIEW" />
    <input type="button" value="获取检索条件" @click="getWhereParam">
  </div>
</template>
<script>
export default {
  name: 'MyComponents',
  components: {},
  methods: {
    getWhereParam() {
      const param = this.$refs.searchInList.getWhereParam()
      this.$notify.success({
        title: '获取检索参数',
        message: JSON.stringify(param)
      })
    }
  }
}
</script>
