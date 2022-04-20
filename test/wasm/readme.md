# WebAssembly

## wasm简介 

WebAssembly 有一套完整的语义，wasm 是体积小且加载快并且兼容Web的二进制格式， 
其目标就是充分发挥硬件能力以达到原生执行效率。

## 业务场景

### 分类
- 计算密集型的场景，执行效率优化
- 复用已有功能（C开发的图像处理）
- 功能复杂场景，加载速度优化
- 安全

### 场景示例
- 图片/视频编辑
- 特征处理（提取、对应）
- 图像识别
- 语音识别、处理
- 3D可视化、VR 和虚拟现实
- 企业软件功能性客户端（比如：数据库）
- 游戏

## 使用方式
- 计算方面使用 WebAssembly，UI使用JavaScript/HTML。
- 整个代码库都用 WebAssembly。例如游戏开发，再议……

### JavaScript API
据说正在支持script module 引入。
目前只能通过 JavaScript 来加载和编译。基础的加载，需要3步：
- 获取 .wasm 二进制文件，将它转换成类型数组或者 ArrayBuffer
- 将二进制数据编译成一个 WebAssembly.Module
- 使用 imports 实例化这个 WebAssembly.Module，获取 exports。

### Demo
下面是加载add.wasm（加法计算SDK）,在浏览器实现调用的例子。

```javascript

fetchAndInstantiate('add.wasm').then(function(instance) {
  console.log('4)执行add.wasm中定义好的 add方法')
  console.log(instance.exports.add(1, 2))  // "3"
})

function fetchAndInstantiate(url, importObject) {
  return fetch(url).then(response => {
      console.log('1)获取 add.wasm 二进制文件，将它转换ArrayBuffer')
      return response.arrayBuffer()
    }
  ).then(bytes => {
      console.log('2)将二进制数据编译成一个 WebAssembly.Module')
      return WebAssembly.instantiate(bytes, importObject)
    }
  ).then(results => {
      console.log('3)使用 imports 实例化这个 WebAssembly.Module，获取 exports')
      return results.instance
    }
  )
}

```
## 编写方式

### 从C/C++编译为WebAssembly

当你使用C/C++编写了代码后，你可以使用诸如Emscripten的工具把它编译为.wasm文件。让我们看看这是如何工作的。

https://developer.mozilla.org/zh-CN/docs/WebAssembly/C_to_wasm


### 从Rust编译为WebAssembly

https://www.rust-lang.org/zh-CN/what/wasm




##

参考资料

https://developer.mozilla.org/zh-CN/docs/WebAssembly

https://moqi.com.cn/blog/cv-frontend-webassembly/   
