<template>
  <div class="table-pagination">
    <el-pagination
      background
      :current-page.sync="curPage"
      :page-sizes="[25, 50, 100, 300]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="recordCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<style scoped lang="less">
.table-pagination {
  padding: 5px 0px 5px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  /deep/.el-pagination__sizes {
    float: right;
    margin-right: 6px;
  }
}
</style>
<script>
export default {
  props: {
    'curPage': {
      type: Number,
      default: 1
    },
    'recordCount': {
      type: Number,
      default: 0
    },
    'pageSize': {
      type: Number,
      default: 0
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleCurrentChange(index) {
      this.$message('' + index)
    },
    handleSizeChange(pageSize) {
      this.$message('' + pageSize)
    }
  }
}
</script>
