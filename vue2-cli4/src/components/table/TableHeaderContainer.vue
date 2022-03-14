<template>
  <div class="table-main" :style="width?`width:${width}px;`:`width:100%;`">
    <div class="table-header">
      <div class="left"><i :class="iconName" class="myicon" style="font-size:16px" /><div class="lable">{{ label }}</div>
        <slot name="left" />
      </div>
      <div v-if="isNeedTool" class="right-container">
        <slot name="btnLeft" />
        <div v-show="isShowCheck" class="right" @click="CheckAll"><i class="h_selectedAll distance" /><span>全选</span></div>
        <div v-show="isShowCheck" class="right" @click="CheckResvers"><i class="h_invertSelect distance" /><span>反选</span></div>
        <div v-show="!isShowCheck" v-if="defaultButtonState||showChoose||showBtn.includes('showChoose')" class="right" @click="Choose(true)"><i class="h_selectedAllF distance" /><span>选择</span></div>
        <div v-show="isShowCheck" class="right" @click="Choose(false)"><i class="h_selected_all distance" /><span>取消选择</span></div>
        <div v-if="showAdd||showBtn.includes('showAdd')" class="right" @click="doJump('/sys/addNotice')"><i class="h_add distance" /><span>增加</span></div>
        <div v-if="showEdit||showBtn.includes('showEdit')" class="right" @click="doJumpEdit('/sys/editNotice')"><i class="h_edit distance" /><span>编辑</span></div>
        <div v-if="showWillCheck||showBtn.includes('showWillCheck')" class="right" @click="doJumpWillChoose('/engine/detail')"><i class="h_search distance" /><span>候选查看</span></div>
        <div v-if="defaultButtonState||showRefresh||showBtn.includes('showRefresh')" class="right" @click="Refresh"><i class="h_refresh distance" /><span>刷新</span></div>
        <div v-if="defaultButtonState||showExoprt||showBtn.includes('showExoprt')" class="right" @click="doExport"><i class="h_file_excel distance" /><span>Excel导出</span></div>
        <slot name="right" />
        <div v-if="defaultButtonState||showDeltel||showBtn.includes('showDeltel')" class="right del" @click="doDelete"><i class="h_delete distance" /><span>删除</span></div>
        <slot name="btnRight" />
      </div>
    </div>
    <div class="table-container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBtn: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultButtonState: {
      type: Boolean,
      default: true
    },
    showAdd: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    showWillCheck: {
      type: Boolean,
      default: false
    },
    showChoose: {
      type: Boolean,
      default: false
    },
    showExoprt: {
      type: Boolean,
      default: false
    },
    showDeltel: {
      type: Boolean,
      default: false
    },
    showRefresh: {
      type: Boolean,
      default: false
    },
    editNotifyId: {
      type: String,
      default: ''
    },
    isNeedTool: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String],
      default: 0
    },
    iconName: {
      type: String,
      default: 'h_table'
    },
    label: {
      type: String,
      default: '表格'
    }
  },
  data() {
    return {
      isShowCheck: false
    }
  },
  methods: {
    doExport() {
      this.$emit('canExport')
    },
    Choose(val) {
      this.isShowCheck = val
      this.$emit('isCheck', this.isShowCheck)
      if (!val) {
        this.$emit('cancelChoose')
      }
    },
    CheckAll() {
      this.$emit('CheckAll')
    },
    CheckResvers() {
      this.$emit('CheckResvers')
    },
    Refresh() {
      this.$emit('Refresh')
    },
    doDelete() {
      this.$emit('isDelete')
    },
    doJump(router) {
      // this.$router.push(router);
      const newHerf = this.$router.resolve({ path: router })
      window.open(newHerf.href, '_blank')
    },
    doJumpEdit(router) {
      if (this.isShowCheck) {
        this.$message({
          message: '仅可编辑首选通知通报',
          type: 'warning'
        })
      }
      if (this.editNotifyId !== '') {
        // this.$router.push({
        //   path: router,
        //   query: {
        //     ID: this.editNotifyId,
        //   },
        // });
        const newHerf = this.$router.resolve({
          path: router,
          query: {
            ID: this.editNotifyId
          }
        })
        window.open(newHerf.href, '_blank')
      } else {
        this.$message({
          message: '请选择需要编辑的通知通报',
          type: 'warning'
        })
        return
      }
    },
    doJumpWillChoose(router) {
      this.$emit('doJumpWillChoose', router, this.isShowCheck)
      //  if(this.isShowCheck){
      //   this.$message({
      //     message:"仅可查看首选的候选查看",
      //     type:"warning"
      //   })
      // }
      // if (this.editNotifyId !== "") {
      //   // this.$router.push({
      //   //   path: router+'/'+this.editNotifyId,
      //   // });
      //   let newHerf=this.$router.resolve({
      //      path:router+'/'+this.editNotifyId
      //    })
      //   window.open(newHerf.href,'_blank')
      // } else {
      //   this.$message({
      //     message: "请选择需要查看的候选项",
      //     type: "warning"
      //   });
      //   return
      // }
    }
  }
}
</script>

<style scoped lang='less'>
.table-main {
  margin: 0 auto;
  border-top: 1px solid #e1e7e9;
  // border-top: 0px;
  border-radius: 3px;
}
.table-header {
  width: 100%;
  height: 40px;
  font-size: 13px;
  padding-left: 12px;
  padding-right: 24px;
  line-height: 40px;
  position: relative;
  background-color: #f6f8f8;
  border-left: 1px solid #e1e7e9;
  border-right: 1px solid #e1e7e9;
  .left {
    display: flex;
    align-items: center;
    > div {
      margin-top: 2px;
    }
  }
  .right-container {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 8px;
  }
  .right {
    height: 24px;
    border: 1px solid #ff9016;
    line-height: 24px;
    padding: 0 8px 0 0;
    border-radius: 3px;
    color: #ff9016;
    margin-left: 8px;
    cursor: pointer;
    i{
      display: inline-block;
      font-size: 14px;
      width: 24px;
      height: 24px;
    }
    i::before{
      position: relative;
      top: -1px;
      display: inline-block;
      font-size: 14px;
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
    }
    span{
      position: relative;
      top: -4px;
      display: inline-block;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
    }
  }
  .right.del {
    border-color: rgba(235, 104, 84, 1);
    color: #eb6854;
  }
  .right.del:hover {
    color: #fff;
    background-color: #eb6854;
  }
  .right:hover {
    background-color: #ff9016;
    color: #fff;
  }
}
.myicon {
  margin-right: 10px;
  font-family: "hisignfont Bold", "hisignfont";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #808080;
}
.distance {
  margin-right: 0;
}
// .table-container{

// }
.common {
  font-style: normal;
  margin-left: 19px;
}
.lable {
  color: #494949;
}
</style>
