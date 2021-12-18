# 列表数据检索组件

## 快速上手

###  基本介绍

* 打开文件导入
* 从剪切板导入
* 自动识别文件编码（uft-8、gbk）
* 自动识别文件分隔符（空格、逗号、Tab、|...可扩展delimitersToGuess）
* 自动识别表头(根据关键字识别，可扩展colNamesToGuess)
* 生成检索条件(返回WhereParam)
* 异常处理：异常信息会抛出，然后交由应用层处理。
  应用层应该具备处理全局异常的功能。


### 创建组件
new SearchInListCompoment(options)
* 参数：
    * {Object} options
        * {String} tableName


* 说明：

> 组件初始化，根据参数生成【对应库中的列】。
* 示例：

      new SearchInListCompoment({tableName: 'TP_CARD_VIEW'})



### Demo

> 运行SearchInList.html查看



## API

### getWhereParam
* 参数：无
* 说明：

> 获取检索条件。将用户选中数据转换为检索条件，返回。
* 示例：

      [{colName: 'PERSON_NUM', dataType: 0, values:["R123"]]

## 依赖说明

* 表格展示 luckysheet
* 界面表单渲染 Vue+ElementUI
* Excel解析 LuckyExcel
* CSV解析 Papa
