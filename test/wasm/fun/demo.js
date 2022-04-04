
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
