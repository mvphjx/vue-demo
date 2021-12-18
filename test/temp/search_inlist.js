/**
 * 全局依赖声明，脚手架中可以通过import实现
 */
var luckyExcel = window.LuckyExcel;
var papaCSV =window.Papa ;
var luckySheet = window.luckysheet;
var Vue = window.Vue;//以及elmUI库
/**
 * SearchInList组件
 * 主要职责如下:
 * 导入文件
 * 从剪切板导入
 * 自动识别文件编码
 * 自动识别文件分隔符
 * 自动识别表头
 * ...
 *
 * @type {SearchInListCompomentClass}
 * @throws 异常信息会抛出，然后交由应用层处理。应用层应该具备处理全局异常的功能。
 */
const SearchInListCompoment = function () {
    var supportColsConfig = {
        "TP_CARD_VIEW": [{
            value: 'PERSON_NUM',
            label: '人员编号'
        }, {
            value: 'CARD_NUM',
            label: '卡片号码'
        }, {
            value: 'MIS_PERSON_NUM',
            label: 'MIS人员编号'
        }]
    };
    var tableName;
    var searchInListVue;
    /**
     * 构造器
     * @param setting{tableName,...}
     * @constructor
     */
    var SearchInListCompomentClass = function (setting) {
        this.config = setting;
        tableName = setting.tableName.toUpperCase();
        if (!supportColsConfig[tableName]) {
            console.log("当前列表不支持列表中检索", tableName);
            return;
        }
        init.call(this);
        window.searchInListVue = searchInListVue;
    };
    SearchInListCompomentClass.prototype = { //这里定义 暴露给外界调用的 接口/方法
        getWhereParam: function () {
            return searchInListVue.getWhereParam();
        }
    };
    return SearchInListCompomentClass;

    /**
     * 私有方法
     */
    function init() {
        searchInListVue = new Vue({
            el: "#SearchInListApp",
            data: {
                tableName: "",
                count: 0,//总记录数
                fileTemp: null,//本地文件缓存
                copyTemp: null,//本地粘贴数据缓存
                loading:false,//加载中标识
                splitCharCode: ",",
                splitCharDiy: "",
                splitCharCodes: [
                    {
                        value: ',',
                        label: '逗号'
                    },
                    {
                        value: ' ',
                        label: '空格'
                    },
                    {
                        value: '\t',
                        label: 'Tab'
                    },
                    {
                        value: '-1',
                        label: '自定义'
                    }
                ],
                searchCol: "",
                colOptions: [],
                headerRow: null,//首行设置为表头
                sheetOptions: {
                    container: 'luckysheet',
                    lang: 'zh',
                    showinfobar: false,
                    showtoolbar: false,
                    showsheetbar: false,
                    showstatisticBar: false,
                    showstatisticBarConfig: {
                        zoom: true,
                    },
                    cellRightClickConfig: {
                        copy: true, // 复制
                        copyAs: false, // 复制为
                        paste: true, // 粘贴
                        insertRow: true, // 插入行
                        insertColumn: true, // 插入列
                        deleteRow: true, // 删除选中行
                        deleteColumn: true, // 删除选中列
                        deleteCell: true, // 删除单元格
                        hideRow: false, // 隐藏选中行和显示选中行
                        hideColumn: false, // 隐藏选中列和显示选中列
                        rowHeight: false, // 行高
                        columnWidth: false, // 列宽
                        clear: false, // 清除内容
                        matrix: false, // 矩阵操作选区
                        sort: false, // 排序选区
                        filter: false, // 筛选选区
                        chart: false, // 图表生成
                        image: false, // 插入图片
                        link: false, // 插入链接
                        data: false, // 数据验证
                        cellFormat: false // 设置单元格格式
                    }, data: [{
                        "name": "Sheet1",
                        "color": "",
                        "status": "1",
                        "order": "0",
                        "data": [],
                        "config": {},
                        "index": 0
                    }]
                },
                csvOptions: {
                    delimiter: "",	// 分隔符,不填自动判断
                    newline: "",	// 换行符,不填自动判断
                    delimitersToGuess: [',', '\t', '|', ';', ' ', papaCSV.RECORD_SEP, papaCSV.UNIT_SEP],//支持的分隔符
                },
                sheetLastUpdateTime: null,
                rowLimit:1000,
                colNamesToGuess: ["ID"]
            },
            methods: {
                setHeaderRow() {//更新表头 样式
                    if (this.headerRow) {
                        luckySheet.frozenFirstRow();
                        //var length =luckysheet.getSheetData()[0].length;
                        for (let i = 0; i < 10; i++) {
                            luckySheet.setCellValue(0, i, {fc: "#ff0000", bl: 1})
                        }
                    } else {
                        luckySheet.cancelFrozen()
                        for (let i = 0; i < 10; i++) {
                            luckySheet.setCellValue(0, i, {fc: "#000", bl: 0})
                        }
                    }
                },
                async copyData() {
                    const text = await navigator.clipboard.readText();
                    console.log('Pasted content: ', text);
                    this.parseCSV(text)
                },
                openFile() {
                    var _this = this;
                    var fileInputId = "in_list_file_input_id";
                    var $file = $("#" + fileInputId);
                    if ($file.length === 0) {
                        $("body").append('<input id="' + fileInputId + '" type="file" multiple accept="*" style="display:none;">');
                        $file = $("#" + fileInputId);
                        //完成选择文件
                        $file.change(function (evt) {
                            var files = evt.target.files;
                            if (files == null || files.length === 0) {
                                return;
                            }

                            let file = files[0];
                            _this.parseFile(file);
                        });
                    }
                    //点击文件，打开选择文件对话框
                    $file.click();
                },
                /**
                 * 手动重新执行文本分隔
                 */
                reSpliteTetxFile() {
                    var splitChar = this.splitCharCode;
                    if (splitChar === "-1") {
                        splitChar = this.splitCharDiy;
                    }
                    if (this.fileTemp) {
                        this.parseFile(this.fileTemp, splitChar)
                    } else if (this.copyTemp) {
                        this.parseCSV(this.copyTemp, splitChar)
                    } else {
                        alert("请先导入数据")
                    }
                },
                /**
                 * 文件解析
                 * @param file
                 * @param delimiter 分隔符，不传可自动判断
                 * @param charset 字符集，缺省为
                 */
                parseFile(file, delimiter, charset) {
                    console.time("parseFile");
                    this.fileTemp = file;
                    this.copyTemp = null;
                    this.headerRow = null;
                    var _this = this;
                    let name = file.name;
                    let suffixArr = name.split("."), suffix = suffixArr[suffixArr.length - 1];
                    if (suffix === "xlsx") {
                        console.timeLog("parseFile", "Excel");
                        luckyExcel.transformExcelToLucky(file, function (exportJson) {
                            if (exportJson.sheets == null || exportJson.sheets.length === 0) {
                                alert("xlsx解析失败");
                                return;
                            }
                            _this.loadSheet(exportJson.sheets);
                        });
                    } else if (suffix === "txt" || suffix === "csv") {
                        console.timeLog("parseFile", "csv");
                        getText(file, charset).then(text => {
                            _this.parseCSV(text, delimiter);
                        })
                    } else {
                        console.timeEnd("parseFile");
                        throw "目前支持xlsx、txt、csv。如果是xls文件需要转换为xlsx；或者打开文件进行复制，使用【粘贴数据】。";
                    }
                    console.timeEnd("parseFile");

                    async function getText(file, charset) {
                        if (charset) {
                            return await readAsText(file, charset)
                        } else {//自动判断编码
                            let str = await readAsText(file, "utf-8");
                            if (str.indexOf("�") !== -1) {
                                return await readAsText(file, "GBK")
                            } else {
                                return str
                            }
                        }
                    }

                    function readAsText(file, charset) {
                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.readAsText(file, charset)
                            reader.onload = function (evt) {
                                resolve(evt.target.result);
                            };
                        });
                    }

                },
                parseCSV(str, delimiter) {
                    console.time("parseCSV");
                    this.fileTemp = null;
                    this.copyTemp = str;
                    this.headerRow = null;
                    var _this = this;
                    var options = Object.assign({}, this.csvOptions, {
                        delimiter: delimiter || "",	// 分隔符,不填自动判断
                        complete: function (results) {
                            var sheets = buildSheets(results.data)
                            console.timeEnd("parseCSV");
                            _this.loadSheet(sheets);
                        }
                    });
                    papaCSV.parse(str, options);

                    /**
                     * 构造sheet 单元格数据
                     * @param data 行列的二维数组
                     * @returns 单元格的一维数组
                     */
                    function buildSheets(data) {
                        var celldata = [];
                        var sheets = [{
                            "name": "Sheet1",
                            "color": "",
                            "status": "1",
                            "order": "0",
                            "data": [],
                            "celldata": celldata,
                            "config": {},
                            "index": 0
                        }];
                        if (data) {
                            for (let index in data) {
                                let row = data[index];
                                if (Object.prototype.toString.call(row) === '[object Array]') {
                                    for (let cindex in row) {
                                        celldata.push({
                                            "r": index,
                                            "c": cindex,
                                            "v": {
                                                "ct": {//单元格值格式
                                                    "fa": "General",
                                                    "t": "s"
                                                },
                                                "fs": 10,//字体大小
                                                "ff": "Arial",//字体
                                                "tb": 0,//文本换行
                                                "v": row[cindex],
                                                "qp": 1
                                            }
                                        })
                                    }
                                } else {
                                    console.error("buildSheets格式错误")
                                }
                            }
                        }
                        return sheets;
                    }
                },
                /**
                 * 更新Excel
                 * @param sheets  Excel数据
                 */
                loadSheet(sheets) {
                    console.time("loadSheet");
                    var sheetOptions = Object.assign({}, this.sheetOptions, {
                        data: sheets, hook: {
                            updated: (operate) => {
                                if (operate.type == "delRC") {
                                    this.updateData();
                                }
                            },
                            rowTitleCellRenderBefore: (options) => {

                            },
                            workbookCreateAfter: (json) => {
                                this.loading=false;
                                this.updateData();
                            }
                        }
                    });
                    if (sheetOptions) {
                        var sheet = sheetOptions && sheetOptions.data && sheetOptions.data[0];
                        var count = sheet && sheet.celldata && sheet.celldata.length;
                        var lastCell = null;
                        console.log("导入单元格数量", count);
                        if (count) {
                            lastCell = sheet.celldata[count - 1];
                            var rowCount = sheet.celldata[count - 1].r;
                            if (rowCount > this.rowLimit) {
                                throw "记录数过多，超过" + this.rowLimit;
                            }
                            if (count > 100 * 100) {
                                //大量单元格加载,增加加载提示
                                this.loading = true;
                                this.$forceUpdate();
                            }
                        }
                    }
                    /**
                     * 改成异步延时加载。
                     * GUI渲染线程与JS引擎线程是互斥的，所以如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞。。。
                     */
                    setTimeout(function (){
                        luckySheet.destroy();
                        luckySheet.create(sheetOptions);
                        console.timeEnd("loadSheet");
                    },30);
                },
                /**
                 * 获取查询条件
                 */
                getWhereParam() {
                    if(!this.searchCol){
                        throw "请选择查询列";
                    }
                    var selectJson = luckySheet.getRangeJson();
                    var count = selectJson.length;
                    var cols = Object.keys(selectJson[0]).length;
                    if (cols > 1 || count < this.count) {
                        throw "请点击表头选中一列数据";
                    }
                    var values = [];
                    var where = [{
                        "colName": this.searchCol,
                        "dataType": 0,
                        "values": values
                    }];
                    //过滤表头、空行
                    let gridColKey = Object.keys(selectJson[0])[0]
                    for (let index in selectJson) {
                        if (index == 0 && this.headerRow) {
                            continue;
                        }
                        let rowData = selectJson[index];
                        if (rowData[gridColKey]) {
                            values.push(rowData[gridColKey])
                        }
                    }
                    return where;

                },
                clean() {
                    this.headerRow = null;
                    this.loadSheet();
                },
                deleteRow() {
                    var range = luckySheet.getRange();
                    var rowRange = range[0].row;
                    luckySheet.deleteRow(rowRange[0], rowRange[1]);
                    this.updateData();
                },
                updateData() {//数据变化后，更新总数、表头配置
                    var time = new Date().getTime();
                    //避免循环更新，引起死循环
                    if (this.sheetLastUpdateTime && (time - this.sheetLastUpdateTime < 1000)) {
                        return
                    } else {
                        this.sheetLastUpdateTime = time
                    }
                    var count = 0;
                    var data = luckySheet.getSheetData();
                    //过滤空行
                    for (let index in data) {
                        let exist = false
                        let rowData = data[index];
                        if (index == 0) {
                            if (this.headerRow !== false) {
                                this.detectHeader(rowData);
                                this.setHeaderRow();
                            }
                        }
                        for (let key in rowData) {
                            if (rowData[key] !== null) {
                                exist = true;
                                break;
                            }
                        }
                        if (exist) {
                            count++;
                        }
                    }
                    this.count = count;
                },
                detectHeader(rowData) {//自动判断是否存在表头
                    if (!rowData) {
                        return;
                    }
                    this.headerRow = false;
                    var line = "";
                    for (let key in rowData) {
                        if (rowData[key] !== null) {
                            line = line + "," + rowData[key].v + ",";
                        }
                    }
                    console.log("header line", line)
                    //根据列关键字判断 是否是表头
                    for (let key in this.colNamesToGuess) {
                        if (line.indexOf("," + this.colNamesToGuess[key] + ",") > -1) {
                            this.headerRow = true;
                            break;
                        }
                    }
                }
            },
            mounted() {
                this.tableName = tableName;
                this.colOptions = supportColsConfig[tableName]
                //让用户手动选择
                //this.searchCol = this.colOptions[0].value;
                this.loadSheet()
            },
            computed: {}
        });
    }

}();
export {
    SearchInListCompoment
}
