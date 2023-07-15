import { defineConfig } from 'vite'
// 本地引入
import VitePluginMetaEnv from './lib/main'
import { name, version } from './package.json'

// 增加环境变量
const metaEnv = {
    APP_VERSION: version,
    APP_NAME: name,
    APP_BUILD_TIME: new Date().toLocaleString()
}

export default defineConfig({
    build: {
        lib: {
            entry: './lib/main.ts',
            name: 'MetaEnv',
            fileName: 'meta-env'
        }
    },
    plugins: [VitePluginMetaEnv(metaEnv, 'import.meta.env')]
})
