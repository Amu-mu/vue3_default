// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///E:/su%20project/echart_storage/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/su%20project/echart_storage/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/su%20project/echart_storage/node_modules/unplugin-auto-import/dist/vite.js";
import px2rem from "file:///E:/su%20project/echart_storage/node_modules/postcss-plugin-px2rem/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/su%20project/echart_storage/vite.config.ts";
var vite_config_default = defineConfig({
  base: "/echartStorage",
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "pinia"],
      dts: "src/auto-import.d.ts"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    postcss: {
      plugins: [
        px2rem({
          rootValue: 192,
          //换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
          unitPrecision: 5,
          //允许REM单位增长到的十进制数字，其实就是精度控制
          // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
          // propBlackList: [], // 黑名单
          // exclude:false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          // selectorBlackList: [], //要忽略并保留为px的选择器
          // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
          // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
          mediaQuery: false,
          //（布尔值）允许在媒体查询中转换px
          minPixelValue: 0
          //设置要替换的最小像素值(3px会被转rem)。 默认 0
        })
      ]
    }
  },
  build: {
    target: "es2015",
    outDir: "dist",
    //指定打包输出路径
    assetsDir: "assets",
    //指定静态资源存放路径
    cssCodeSplit: true,
    //css代码拆分，禁用则所有样式保存在一个css里面
    sourcemap: true,
    //是否构建source map文件
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
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]"
      }
    }
  },
  server: {
    port: 8086,
    host: "0.0.0.0",
    open: false,
    //是否自动在浏览器打开
    proxy: {
      "/x3xapi": {
        target: "http://192.168.1.165:9036",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/x3xapi/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxzdSBwcm9qZWN0XFxcXGVjaGFydF9zdG9yYWdlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxzdSBwcm9qZWN0XFxcXGVjaGFydF9zdG9yYWdlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9zdSUyMHByb2plY3QvZWNoYXJ0X3N0b3JhZ2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuXG4vL1x1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVx1NjNEMlx1NEVGNlxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcblxuLy9AdHMtaWdub3JlXG5pbXBvcnQgcHgycmVtIGZyb20gJ3Bvc3Rjc3MtcGx1Z2luLXB4MnJlbSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGJhc2U6ICcvZWNoYXJ0U3RvcmFnZScsXG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSwgQXV0b0ltcG9ydCh7XG4gICAgICBpbXBvcnRzOiBbJ3Z1ZScsICdwaW5pYSddLFxuICAgICAgZHRzOiAnc3JjL2F1dG8taW1wb3J0LmQudHMnXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcHgycmVtKHtcbiAgICAgICAgICByb290VmFsdWU6IDE5MiwgIC8vXHU2MzYyXHU3Qjk3XHU1N0ZBXHU2NTcwXHVGRjBDIFx1OUVEOFx1OEJBNDEwMCAsXHU0RTVGXHU1QzMxXHU2NjJGMTQ0MHB4IFx1RkYwQ1x1OEZEOVx1NjgzN1x1NzY4NFx1OEJERFx1NjI4QVx1NjgzOVx1NjgwN1x1N0I3RVx1NzY4NFx1NUI1N1x1NEY1M1x1ODlDNFx1NUI5QVx1NEUzQTFyZW1cdTRFM0E1MHB4LFx1OEZEOVx1NjgzN1x1NUMzMVx1NTNFRlx1NEVFNVx1NEVDRVx1OEJCRVx1OEJBMVx1N0EzRlx1NEUwQVx1OTFDRlx1NTFGQVx1NTkxQVx1NUMxMVx1NEUyQXB4XHU3NkY0XHU2M0E1XHU1NzI4XHU0RUUzXHU3ODAxXHU0RTJEXHU1MTk5XHU1OTFBXHU1QzExcHhcdTRFODZcbiAgICAgICAgICB1bml0UHJlY2lzaW9uOiA1LCAvL1x1NTE0MVx1OEJCOFJFTVx1NTM1NVx1NEY0RFx1NTg5RVx1OTU3Rlx1NTIzMFx1NzY4NFx1NTM0MVx1OEZEQlx1NTIzNlx1NjU3MFx1NUI1N1x1RkYwQ1x1NTE3Nlx1NUI5RVx1NUMzMVx1NjYyRlx1N0NCRVx1NUVBNlx1NjNBN1x1NTIzNlxuICAgICAgICAgIC8vIHByb3BXaGl0ZUxpc3Q6IFtdLCAvLyBcdTlFRDhcdThCQTRcdTUwM0NcdTY2MkZcdTRFMDBcdTRFMkFcdTdBN0FcdTY1NzBcdTdFQzRcdUZGMENcdThGRDlcdTYxMEZcdTU0NzNcdTc3NDBcdTc5ODFcdTc1MjhcdTc2N0RcdTU0MERcdTUzNTVcdTVFNzZcdTU0MkZcdTc1MjhcdTYyNDBcdTY3MDlcdTVDNUVcdTYwMjdcdTMwMDJcbiAgICAgICAgICAvLyBwcm9wQmxhY2tMaXN0OiBbXSwgLy8gXHU5RUQxXHU1NDBEXHU1MzU1XG4gICAgICAgICAgLy8gZXhjbHVkZTpmYWxzZSwgIC8vXHU5RUQ4XHU4QkE0ZmFsc2VcdUZGMENcdTUzRUZcdTRFRTVcdUZGMDhyZWdcdUZGMDlcdTUyMjlcdTc1MjhcdTZCNjNcdTUyMTlcdTg4NjhcdThGQkVcdTVGMEZcdTYzOTJcdTk2NjRcdTY3RDBcdTRFOUJcdTY1ODdcdTRFRjZcdTU5MzlcdTc2ODRcdTY1QjlcdTZDRDVcdUZGMENcdTRGOEJcdTU5ODIvKG5vZGVfbW9kdWxlKS8gXHUzMDAyXHU1OTgyXHU2NzlDXHU2MEYzXHU2MjhBXHU1MjREXHU3QUVGVUlcdTY4NDZcdTY3QjZcdTUxODVcdTc2ODRweFx1NEU1Rlx1OEY2Q1x1NjM2Mlx1NjIxMHJlbVx1RkYwQ1x1OEJGN1x1NjI4QVx1NkI2NFx1NUM1RVx1NjAyN1x1OEJCRVx1NEUzQVx1OUVEOFx1OEJBNFx1NTAzQ1xuICAgICAgICAgIC8vIHNlbGVjdG9yQmxhY2tMaXN0OiBbXSwgLy9cdTg5ODFcdTVGRkRcdTc1NjVcdTVFNzZcdTRGRERcdTc1NTlcdTRFM0FweFx1NzY4NFx1OTAwOVx1NjJFOVx1NTY2OFxuICAgICAgICAgIC8vIGlnbm9yZUlkZW50aWZpZXI6IGZhbHNlLCAvL1x1RkYwOGJvb2xlYW4vc3RyaW5nXHVGRjA5XHU1RkZEXHU3NTY1XHU1MzU1XHU0RTJBXHU1QzVFXHU2MDI3XHU3Njg0XHU2NUI5XHU2Q0Q1XHVGRjBDXHU1NDJGXHU3NTI4aWdub3JlaWRlbnRpZmllclx1NTQwRVx1RkYwQ3JlcGxhY2VcdTVDMDZcdTgxRUFcdTUyQThcdThCQkVcdTdGNkVcdTRFM0F0cnVlXHUzMDAyXG4gICAgICAgICAgLy8gcmVwbGFjZTogdHJ1ZSwgLy8gXHVGRjA4XHU1RTAzXHU1QzE0XHU1MDNDXHVGRjA5XHU2NkZGXHU2MzYyXHU1MzA1XHU1NDJCUkVNXHU3Njg0XHU4OUM0XHU1MjE5XHVGRjBDXHU4MDBDXHU0RTBEXHU2NjJGXHU2REZCXHU1MkEwXHU1NkRFXHU5MDAwXHUzMDAyXG4gICAgICAgICAgbWVkaWFRdWVyeTogZmFsc2UsIC8vXHVGRjA4XHU1RTAzXHU1QzE0XHU1MDNDXHVGRjA5XHU1MTQxXHU4QkI4XHU1NzI4XHU1QTkyXHU0RjUzXHU2N0U1XHU4QkUyXHU0RTJEXHU4RjZDXHU2MzYycHhcbiAgICAgICAgICBtaW5QaXhlbFZhbHVlOiAwICAvL1x1OEJCRVx1N0Y2RVx1ODk4MVx1NjZGRlx1NjM2Mlx1NzY4NFx1NjcwMFx1NUMwRlx1NTBDRlx1N0QyMFx1NTAzQygzcHhcdTRGMUFcdTg4QUJcdThGNkNyZW0pXHUzMDAyIFx1OUVEOFx1OEJBNCAwXG5cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgICBvdXREaXI6ICdkaXN0JywgLy9cdTYzMDdcdTVCOUFcdTYyNTNcdTUzMDVcdThGOTNcdTUxRkFcdThERUZcdTVGODRcbiAgICBhc3NldHNEaXI6ICdhc3NldHMnLCAvL1x1NjMwN1x1NUI5QVx1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NUI1OFx1NjUzRVx1OERFRlx1NUY4NFxuICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSwgLy9jc3NcdTRFRTNcdTc4MDFcdTYyQzZcdTUyMDZcdUZGMENcdTc5ODFcdTc1MjhcdTUyMTlcdTYyNDBcdTY3MDlcdTY4MzdcdTVGMEZcdTRGRERcdTVCNThcdTU3MjhcdTRFMDBcdTRFMkFjc3NcdTkxQ0NcdTk3NjJcbiAgICBzb3VyY2VtYXA6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU2Nzg0XHU1RUZBc291cmNlIG1hcFx1NjU4N1x1NEVGNlxuICAgIC8vXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU1M0Q2XHU2RDg4Y29uc29sZVxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy9cdTRGMUFcdTYyNTNcdTUzMDVcdTUxRkFjc3MganNcdTdCNDlcdTY1ODdcdTRFRjZcdTU5MzlcdUZGMENcdTc2RUVcdTVGNTVcdTY2M0VcdTVGOTdcdTZFMDVcdTY2NzBcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdbZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJ1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogODA4NixcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgb3BlbjogZmFsc2UsIC8vXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU2MjUzXHU1RjAwXG4gICAgcHJveHk6IHtcbiAgICAgICcveDN4YXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTkyLjE2OC4xLjE2NTo5MDM2JyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwveDN4YXBpLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4USxTQUFTLGVBQWUsV0FBVztBQUVqVCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFHaEIsT0FBTyxnQkFBZ0I7QUFHdkIsT0FBTyxZQUFZO0FBVGtKLElBQU0sMkNBQTJDO0FBWXROLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUFHLFdBQVc7QUFBQSxNQUNoQixTQUFTLENBQUMsT0FBTyxPQUFPO0FBQUEsTUFDeEIsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxPQUFPO0FBQUEsVUFDTCxXQUFXO0FBQUE7QUFBQSxVQUNYLGVBQWU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBT2YsWUFBWTtBQUFBO0FBQUEsVUFDWixlQUFlO0FBQUE7QUFBQSxRQUVqQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBQ1gsY0FBYztBQUFBO0FBQUEsSUFDZCxXQUFXO0FBQUE7QUFBQTtBQUFBLElBRVgsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFdBQVc7QUFBQSxRQUNULFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxhQUFhLEVBQUU7QUFBQSxNQUNqRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
