<template>
  <div>
    <h2>工作台</h2>
    <div>
      <h3 style="cursor: pointer" @click="goto('https://fontawesome.dashgame.com/')">Font Awesome</h3>
      <ul class="fa-ul">
        <li><i class="fa-li fa fa-check-square"/>List icons</li>
        <li><i class="fa-li fa fa-check-square"/>can be used</li>
        <li><i class="fa-li fa fa-spinner fa-spin"/>as bullets</li>
        <li><i class="fa-li fa fa-square"/>in lists</li>
        <li><i class="fa-li fa fa-check"/>check</li>
        <li><i class="fa-li fa fa-check"/></li>
      </ul>
      <div>
        <div class="div-i"><i class="fa fa-check"/></div>
      </div>
    </div>

  </div>

</template>
<style>
.div-i {
  width: 30px;
  height: 30px;
  color: red;
}

</style>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  mounted() {

  },
  methods: {
    goto(url) {
      window.open(url, '_blank')
    }
  }

}
</script>
<style scoped lang="less">

</style>
