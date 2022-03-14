<template>
  <div class="list-page">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>用户</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-title">
      <div class="table-icon">
        <i class="h_filesTypeAF" />
      </div>
      <div class="content">
        <span>用户管理</span>
      </div>
    </div>
    <Table :table-name="tableName" />
  </div>
</template>
<style scoped lang="less">
.list-page {
  max-width: 1345px;
  margin: 0px auto;
  background-color: rgba(255, 255, 255, 1);
  margin-top: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(214, 222, 224, 1);
  border-radius: 5px;
}

.breadcrumb {
  height: 42px;
  background-color: rgba(248, 248, 248, 1);
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 16px;

  span {
    font-size: 15px;
  }
}

.table-title {
  height: 46px;
  float: left;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .table-icon {
    height: 34px;
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      color: #00a0e9;
      font-size: 26px;
    }
  }

  .content {
    span {
      color: rgb(22, 71, 119);
      font-size: 18px;
      font-weight: 700;
      text-align: left;
    }
  }

}

</style>
<script>
import Table from '@/components/table'

export default {
  components: {
    Table
  },
  data() {
    return {
      tableName: 'TP_CARD_VIEW'
    }
  }
}
</script>
