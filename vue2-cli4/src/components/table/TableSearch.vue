<template>
  <div class="table-search">
    <div class="config-tool-bar">
      <el-popover
        placement="bottom-start"
        trigger="click"
      >
        <ul class="el-dropdown-menu el-popper">
          <li v-for="(item, index) in searchTemplates" :key="index" class="el-dropdown-menu__item">
            <i class="el-icon-delete" />
            <span>{{ item.name }}</span>
          </li>
        </ul>
        <el-link slot="reference">快速检索<i class="el-icon-view el-icon--right" /></el-link>
      </el-popover>
      <el-link icon="el-icon-edit">自定义检索</el-link>
      <el-link icon="el-icon-edit">配置</el-link>
      <el-link icon="el-icon-edit">隐藏检索项</el-link>
    </div>
    <hr>
    <div class="search-items">
      <div
        v-for="(item, index) in searchItems"
        :key="index"
        class="search-item"
      >
        <span class="item-title">{{ item.colDispName }}</span>
        <el-dropdown trigger="click" @command="changeOper">
          <div class="item-operation">
            <div class="choose-current">
              <i :class="getOpersClass(item.oper)" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(oper) in opers" :key="oper.code" :command="oper.code+','+index">
                <i :class="oper.class" />
                {{ oper.text }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </div>
        </el-dropdown>
        <div class="item-control">
          <div
            v-if="item.dataType==storageDataType.UNKNOWN||item.dataType==storageDataType.STRING||item.dataType==storageDataType.NUMBER"
          >
            <el-input v-model="item.values[0]" size="mini" />
          </div>
          <div v-if="item.dataType==storageDataType.DATE||item.dataType==storageDataType.DATETIME">
            <el-date-picker
              v-model="item.values[0]"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              size="mini"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tool-bar">
      <el-button type="primary" size="small" @click="query">检索</el-button>
      <el-button size="small" @click="clear">清空</el-button>
      <el-button size="small" @click="saveToFastQuery">保存为快速检索</el-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.hide {
  display: none;
}

.table-search {
  padding-top: 20px;

  .config-tool-bar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 30px;
    margin-right: 20px;

    .el-button--small, .el-button--small.is-round {
      padding: 5px 4px;
    }

    .el-link.el-link--default {
      margin: 7px;
    }

    div:hover p {
      display: block;
    }
  }

  .search-items {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;

    .search-item {
      width: 23%;
      height: 32px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 5px;

      .item-title {
        width: 100px;
        word-break: break-word;
        line-height: 16px;
        text-align: right;
        padding-right: 5px;
      }

      .item-operation {
        width: 26px;
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        background-color: rgba(245, 247, 250, 1);
        border-color: rgba(214, 222, 224, 1);
        border-radius: 3px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        .choose-current {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .item-control {
        width: calc(100% - 100px - 26px);

        //定制日期输入框
        .el-input__inner {
          width: unset;

          /deep/ .el-range-separator {
            width: 20px;
          }

          /deep/ .el-input__icon {
            display: none;
          }
        }
      }
    }
  }

  .tool-bar {
    margin-left: 100px;

  }
}

</style>
<script>
const storageDataType = {
  UNKNOWN: 0,
  NUMBER: 1,
  STRING: 2,
  DATE: 3,
  TIME: 4,
  DATETIME: 5,
  BOOL: 6,
  BINARY: 7,
  BIT: 8
}
export default {
  props: {
    columnCatlogs: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchColumns: {
      type: Array,
      default: () => {
        return []
      }
    },
    searchTemplates: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      storageDataType,
      'opers': [
        { 'code': 'eq', text: '等于', class: 'fa fa-check' },
        { 'code': 'neq', text: '不等于', class: 'fa fa-close' },
        { 'code': 'gt', text: '大于', class: 'fa fa-angle-right' },
        { 'code': 'lt', text: '小于', class: 'fa fa-angle-left' },
        { 'code': 'like', text: '匹配', class: 'fa check-square-o' },
        { 'code': 'notl', text: '不匹配', class: 'fa ban' },
        { 'code': 'null', text: '为空', class: 'fa square-o' },
        { 'code': 'notn', text: '非空', class: 'fa square' },
        { 'code': 'btwn', text: '范围之内', class: 'fa circle' },
        { 'code': 'notb', text: '范围之外', class: 'fa circle-o' }],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      searchItems: []
    }
  },
  computed: {

  },
  watch: {
    columnCatlogs() {
      console.log('watch')
      this.searchItems = this.getSearchItems()
    }
  },
  methods: {
    getOpersClass(code) {
      for (const model of this.opers) {
        if (model.code === code) {
          return model.class
        }
      }
      return ''
    },
    changeOper(code) {
      const operCode = code.split(',')[0]
      const index = parseInt(code.split(',')[1])
      this.searchItems[index].oper = operCode
    },
    getParams() {
      console.log(this.searchItems)
    },
    query() {
      this.getParams()
      console.log('submit!')
    },
    saveToFastQuery() {

    },
    clear() {

    },
    /**
     * 转为页面需要的格式
     * @returns {*[]}
     */
    getSearchItems() {
      const _searchItems = []
      const _columnCatlogMap = {}
      for (const columnCatlog of this.columnCatlogs) {
        _columnCatlogMap[columnCatlog.columnName] = columnCatlog
      }
      for (const searchColumn of this.searchColumns) {
        const columnCatlog = _columnCatlogMap[searchColumn.colName] || {}
        const _searchItem = {
          'colName': searchColumn.colName,
          'dataType': columnCatlog.dataType,
          'oper': searchColumn.oper || 'in',
          'values': ['', ''],
          'colDispName': columnCatlog.colDispName || searchColumn.colName,
          'codeTableName': columnCatlog.codeTableName
        }
        _searchItems.push(_searchItem)
      }
      return _searchItems
    }
  }
}
</script>
