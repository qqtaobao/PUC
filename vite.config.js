import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteImagemin from 'vite-plugin-imagemin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        viteImagemin({ // 配置各种类型的图片压缩
            gifsicle: { // gif压缩
                optimizationLevel: 7, // 压缩比例
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 20,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [{
                        name: 'removeViewBox',
                    },
                    {
                        name: 'removeEmptyAttrs',
                        active: false,
                    },
                ],
            },
        }),
        AutoImport({
            resolvers:[
              ElementPlusResolver(),
              IconsResolver({
                prefix: 'Icon'
              })
            ]
          }),
          Components({
            resolvers:[
              ElementPlusResolver(),
              IconsResolver({
                enabledCollections: ['ep']
              })
            ]
          }),
          Icons({
            autoInstall: true
          })
    ],
    resolve: {
        extensions: ['.vue', '.js', '.json', '.mjs'],
        alias: {
            '@': path.resolve(__dirname, './src'), //别名配置 在项目里可以使用 @ 表示 src 文件夹
        },
    },
    base: './', // 开发或生产环境服务的公共基础路径
    server: {
        open: true,
        port: 8080, // 指定开发服务器端口
        proxy: { // 开发环境服务器代理  详细文档 https://github.com/http-party/node-http-proxy#options
            "/admin": { // 匹配上了的路径则会被代理  可以使用正则'^/fallback/.*'
                target: "https://www.test.com", // 访问的服务器
                changeOrigin: true,
                ws: true, // 是否开启websockets代理
                cookieDomainRewrite: { // 重写cookie 的domain
                    "*": ""
                },
            }
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].${new Date().getTime()}.js`,
                chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
                assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
                compact: true,
                manualChunks: {
                    vue: ['vue', 'vue-router', 'pinia'],
                    echarts: ['echarts'],
                },
            },
        },
    },
})