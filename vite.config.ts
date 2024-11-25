import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//自动引入插件
import AutoImport from 'unplugin-auto-import/vite'

//@ts-ignore
import px2rem from 'postcss-plugin-px2rem'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3_default',
  plugins: [
    vue(), AutoImport({
      imports: ['vue', 'pinia'],
      dts: 'src/auto-import.d.ts'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        px2rem({
          rootValue: 192,  //换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
          unitPrecision: 5, //允许REM单位增长到的十进制数字，其实就是精度控制
          // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
          // propBlackList: [], // 黑名单
          // exclude:false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          // selectorBlackList: [], //要忽略并保留为px的选择器
          // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
          // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
          mediaQuery: false, //（布尔值）允许在媒体查询中转换px
          minPixelValue: 0  //设置要替换的最小像素值(3px会被转rem)。 默认 0

        })
      ]
    }
  },
  build: {
    target: 'es2015',
    outDir: 'dist', //指定打包输出路径
    assetsDir: 'assets', //指定静态资源存放路径
    cssCodeSplit: true, //css代码拆分，禁用则所有样式保存在一个css里面
    sourcemap: true, //是否构建source map文件
    //生产环境取消console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    //会打包出css js等文件夹，目录显得清晰
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 8086,
    host: '0.0.0.0',
    open: false, //是否自动在浏览器打开
    proxy: {
      '/x3xapi': {
        target: 'http://192.168.1.165:9036',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/x3xapi/, '')
      }
    }
  }
})
