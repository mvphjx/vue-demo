<template>
  <div class="footer">
    <span>Copyright © 2022- {{ year }}</span>
    <img src="../assets/footer/u714.png" alt="" class="left"><span> 版权所有:2022- {{ year }}</span><img src="../assets/footer/u714.png" alt="" class="right">
    <span> 公司总部地址：北京丰台</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style >
br{
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
.footer {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1344px;
  margin: 0 auto ;
  margin-top: -2px;
  text-align: center;
  /* padding: 10px 0 20px; */
  font-size: 12px;
  color: #9ea7b4;

}
.footer span{
  font-size: 12px;
  height: 12px;
  line-height: 12px;
}
.footer .left{
  position: absolute;
  left: 0%;
  top: 50%;
  transform: translateY(-50%);

}
.footer .right{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

}
</style>
