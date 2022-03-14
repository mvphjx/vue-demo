<template>
  <div class="table">
    <TableSearch
      :column-catlogs="columnCatlogs"
      :search-columns="searchColumns"
      :search-templates="searchTemplates"
      @query="query"
    />
    <TableBody :table-body-config="tableBodyConfig" @query="query" />
    <TablePagination
      :page-size="pageSize"
      :cur-page="curPage"
      :record-count="recordCount"
      @query="query"
    />
  </div>
</template>

<script>
import TableSearch from '@/components/table/TableSearch'
import TableBody from '@/components/table/TableBody'
import TablePagination from '@/components/table/TablePagination'
import { config, query } from '@/api/table'

export default {
  name: 'Index',
  components: {
    TableBody,
    TableSearch,
    TablePagination
  },
  props: {
    tableName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      columnCatlogs: [],
      searchColumns: [],
      searchTemplates: [],
      dispColumns: [],
      rowStyles: [],
      lineStyles: [],
      freezeColumns: [],
      intervalTime: null,
      curPage: 1,
      recordCount: 0,
      pageSize: 50,
      tableData: []
    }
  },
  computed: {
    tableBodyConfig() {
      return {
        columnCatlogs: this.columnCatlogs,
        dispColumns: this.dispColumns,
        rowStyles: this.rowStyles,
        lineStyles: this.lineStyles,
        freezeColumns: this.freezeColumns,
        intervalTime: this.intervalTime,
        tableData: this.tableData,
        recordCount: this.recordCount
      }
    }
  },
  created() {
    console.log('列表初始化', this.tableName)
    this.loading = true
    config(this.tableName).then(response => {
      this.loading = false
      this.columnCatlogs = response.data.columnCatlogs
      this.searchColumns = response.data.searchColumns
      this.dispColumns = response.data.dispColumns
      this.rowStyles = response.data.rowStyles
      this.lineStyles = response.data.lineStyles
      this.freezeColumns = response.data.freezeColumns
      this.pageSize = response.data.pageSize
      this.intervalTime = response.data.intervalTime
      this.searchTemplates = response.data.searchTemplates
      console.log('列表初始化配置读取成功', response)
    }).catch(() => {
      this.loading = false
    })
  },
  methods: {
    query(params) {
      const data = {}
      console.log('列表检索', this.tableName)
      query(data).then(response => {
        this.loading = false
        this.recordCount = response.data.recordCount
        this.tableData = response.data.data
      }).catch(() => {
        this.loading = false
      })
    }

  }
}
</script>

<style scoped>
</style>
