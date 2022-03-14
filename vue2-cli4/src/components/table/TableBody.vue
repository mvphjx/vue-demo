<template>
  <div class="table-body">
    <div class="tool">
      <div>
        <span class="title">检索结果</span>
        <span class="title-sub">共找到 <span class="count">{{ recordCount }}</span> 条符合的记录</span>
      </div>
      <div class="tool-bar">
        <el-button v-if="!selectMode" type="warning" size="small" plain icon="el-icon-check" @click="switchMode">选择</el-button>
        <el-button v-if="selectMode" type="warning" size="small" plain icon="el-icon-check" @click="selectAll">全选</el-button>
        <el-button v-if="selectMode" type="warning" size="small" plain icon="el-icon-check" @click="selectInvert">反选</el-button>
        <el-button v-if="selectMode" type="warning" size="small" plain icon="el-icon-check" @click="switchMode">取消选择</el-button>
        <el-button type="warning" size="small" plain icon="el-icon-refresh" @click="refresh">刷新</el-button>
        <el-button type="warning" size="small" plain icon="el-icon-download">导出</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="selectMode"
        type="selection"
        width="45"
      />
      <el-table-column
        v-for="(item, index) in dispItems"
        :key="index"
        sortable
        :prop="item.colName"
        :label="item.colDispName"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">{{ scope.row[item.colName] }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="less">
.table-body {
  padding: 16px 16px 0 16px;
}

.container {
  .box {
    width: 50px;
    height: 50px;
    background-color: #fff;
  }
}

.tool {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(214, 222, 224, 1);
  border-radius: 5px;
  background-color: rgba(246, 248, 248, 1);
  height: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: 700;
    color: #494949;
    line-height: 40px;
    margin: 0 20px 0 20px;
  }

  .title-sub {
    color: #494949;
    line-height: 40px;

    .count {
      margin: 0 5px 0 5px;
      color: red;
    }
  }

  .tool-bar {
    padding-right: 20px;

    .el-button--small, .el-button--small.is-round {
      padding: 6px 5px;
    }
  }

}

.header-config {
  float: right;
}
</style>
<script>
export default {
  props: {
    tableBodyConfig: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      multipleSelection: [],
      selectMode: false
    }
  },
  computed: {
    recordCount: function() {
      return this.tableBodyConfig.recordCount
    },
    tableData: function() {
      const _tableData = []
      for (const rowData of this.tableBodyConfig.tableData) {
        const _rowData = {}
        for (const key in rowData) {
          const item = rowData[key]
          _rowData[key] = item.text || item.value
        }
        _tableData.push(_rowData)
      }
      return _tableData
    },
    /**
     * 转为页面需要的格式
     * @returns {*[]}
     */
    dispItems: function() {
      const _dispItems = []
      const _columnCatlogMap = {}
      for (const columnCatlog of this.tableBodyConfig.columnCatlogs) {
        _columnCatlogMap[columnCatlog.columnName] = columnCatlog
      }
      for (const dispColumn of this.tableBodyConfig.dispColumns) {
        const columnCatlog = _columnCatlogMap[dispColumn.name] || {}
        const _dispItem = {
          'colName': dispColumn.name,
          'dataType': columnCatlog.dataType,
          'colDispName': columnCatlog.colDispName,
          'codeTableName': columnCatlog.codeTableName
        }
        _dispItems.push(_dispItem)
      }
      return _dispItems
    }

  },
  methods: {
    refresh() {
      this.$emit('query')
    },
    switchMode() {
      this.selectMode = !this.selectMode
    },
    selectAll() {
      this.$refs.multipleTable.toggleAllSelection()
    },
    selectInvert() {
      this.tableData.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    renderHeader(createElement, { column, $index }) {
      const label = column.label
      const lastIndex = this.selectMode ? this.tableBodyConfig.dispColumns.length : (this.tableBodyConfig.dispColumns.length - 1)
      const isLast = $index === lastIndex
      let button = ''
      if (isLast) {
        button = '<i class="el-icon-s-tools" @click="headerConfig"></i>'
      }
      return (
        <span>
          {label}
          <div domPropsInnerHTML={button} class='header-config'></div>
        </span>
      )
    }
  }
}
</script>
