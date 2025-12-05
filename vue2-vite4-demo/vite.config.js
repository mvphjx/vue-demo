import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'
import {resolve} from 'path'

export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        },
        extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    server: {
        port: 3001,
        open: true
    },
    build: {
        //是否打包源码
        sourcemap: false,
        //是否混淆
        minify: false,
        rollupOptions: {
            preserveEntrySignatures: 'strict',
            output: {
                // 保持模块结构，不使用 manualChunks
                preserveModules: true,
                // 文件命名规则
                entryFileNames: 'js/[name]-[hash].js',
                chunkFileNames: 'js/[name]-[hash].js',
                assetFileNames: '[ext]/[name]-[hash].[ext]'
            }
        }
    }
})
