# WebAssembly

## wasm简介 

一个可移植、体积小、加载快并且兼容 Web 的全新格式。
WebAssembly 有一套完整的语义，实际上 wasm 是体积小且加载快的二进制格式， 
其目标就是充分发挥硬件能力以达到原生执行效率。


## 业务场景

### 分类
- 计算密集型的场景，性能优化
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
- 主要使用 WebAssembly 计算，UI 使用 JavaScript/HTML。
- 整个代码库都用 WebAssembly。适合游戏场景，再议……

### wasm API
据说正在支持script module 引入。
目前只能通过 JavaScript 来加载和编译。基础的加载，只需要3步：
- 获取 .wasm 二进制文件，将它转换成类型数组或者 ArrayBuffer
- 将二进制数据编译成一个 WebAssembly.Module
- 使用 imports 实例化这个 WebAssembly.Module，获取 exports。

### wasm Demo

